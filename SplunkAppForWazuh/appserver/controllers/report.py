# -*- coding: utf-8 -*-
"""
Wazuh app - Report generation backend.

Copyright (C) 2018 Wazuh, Inc.

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

Find more information about this on the LICENSE file.
"""
import os
import time
import json
import datetime
from operator import itemgetter
import splunk.appserver.mrsparkle.controllers as controllers
from splunk.appserver.mrsparkle.lib.decorators import expose_page
from log import log
import base64
from fpdf import FPDF


class PDF(FPDF):
    def header(self):
        # Logo
        self.image('/opt/splunk/etc/apps/SplunkAppForWazuh/appserver/static/css/images/wazuh/png/logo.png', 10, 10, 40)
        self.set_font('Arial', '', 11)
        self.set_text_color(93, 188, 210)
        #Contact info
        self.cell(150) #Move to the right
        self.cell(0, 5, 'info@wazuh.com')
        self.ln() #Break line
        self.cell(150) #Move to the right
        self.cell(0, 5, 'https://wazuh.com')

    # Page footer
    def footer(self):
        # Position at 1.5 cm from bottom
        self.year = datetime.datetime.now().strftime('%Y')
        self.copyright = unicode('Copyright © ' + self.year + ' Wazuh, Inc.', 'utf-8')
        self.set_y(-15)
        self.set_text_color(93, 188, 210)
        self.set_font('Arial', 'B', 8)
        # Page number
        self.cell(100, 10, self.copyright, 0, 0, 'L')
        self.cell(0, 10, 'Page ' + str(self.page_no()) + ' of {nb}', 0, 0, 'R')
        


class report(controllers.BaseController):
    """Report class.

    Handle reporting methods
    """

    def __init__(self):
        """Constructor."""
        self.logger = log()
        self.images = []
        try:
            self.path = '/opt/splunk/etc/apps/SplunkAppForWazuh/appserver/static/'
            controllers.BaseController.__init__(self)
        except Exception as e:
            self.logger.error("Error in report module constructor: %s" % (e))

    def save_images(self, images):
        i = 0
        while i in range(0, len(images)):
            path = str(self.path+str(images[i]['id'])+'.png')
            f = open(path, 'wb')
            title = str(images[i]['title'])
            width = images[i]['width']
            height = images[i]['height']
            f.write(base64.decodestring(
                images[i]['element'].split(',')[1].encode()))
            f.close()
            image = {'title': title, 'path': path, 'width': width, 'height': height}
            self.images.append(image)
            i += 1

    def delete_images(self):
        for img in self.images:
            os.remove(img['path'])
        self.images = []

    @expose_page(must_login=False, methods=['POST'])
    def generate(self, **kwargs):
        """Generate PDF report.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            self.pdf = PDF('P', 'mm', 'A4')
            self.metrics_exists = False
            self.logger.info("Start generating report ")
            json_acceptable_string = kwargs['data']
            data = json.loads(json_acceptable_string)
            #Replace "'" in images
            self.clean_images = json.dumps(data['images'])
            self.clean_images.replace("'", "\"")
            data['images'] = json.loads(self.clean_images)
            today = datetime.datetime.now().strftime('%Y.%m.%d %H:%M')
            report_id = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
            self.logger.info("Size of array: %s" % (len(data['images'])))
            #Get filters and other information
            self.filters = data['queryFilters']
            self.pdf_name = data['pdfName']
            self.time_range = data['timeRange']
            self.section_title = data['sectionTitle']
            self.metrics = data['metrics']
            self.tables = data['tableResults']
            self.metrics = json.loads(self.metrics)
            self.agent_data = data['isAgents']
            #Save the images
            self.save_images(data['images'])
            parsed_data = json.dumps({'data': 'success'})
            # Add title and filters 
            self.pdf.alias_nb_pages()
            self.pdf.add_page()
            self.pdf.ln(20)
            #Color WazuhBlue
            self.pdf.set_text_color(93, 188, 210)
            # Title Arial Bold 20
            self.pdf.set_font('Arial', '', 25)
            self.pdf.cell(0,0, self.section_title + ' report' , 0, 0, 'L')
            #Date
            self.pdf.set_font('Arial', '', 12)
            self.pdf.cell(0,0, today , 0, 0, 'R')
            #Filters and search time range
            self.pdf.ln(7)
            self.pdf.set_fill_color(93, 188, 210)
            self.pdf.set_text_color(255,255,255)
            self.pdf.set_font('Arial', '', 10)
            self.pdf.cell(0, 5, ' Search time range: ' + self.time_range , 0, 0, 'L', 1)
            self.pdf.ln(5)
            self.pdf.cell(0, 5, ' Filters:' + self.filters , 0, 0, 'L', 1)
            #Check if is agent, print agent info
            if self.agent_data:
                self.print_agent_info(self.agent_data, self.pdf)
            #Check metrics and print if exist
            if len(self.metrics) > 0:
                self.pdf.set_text_color(255,255,255)
                self.metrics_exists = True
                w = 5
                line_width = 0
                total_width = 190
                self.pdf.ln(10)
                self.pdf.set_font('Arial', '', 8)
                for key in self.metrics.keys():
                    text = (str(key) +': '+ str(self.metrics[key]))
                    text_w = self.pdf.get_string_width(text) + w
                    line_width = line_width + text_w
                    if line_width >= total_width:
                        self.pdf.cell((total_width - (line_width - text_w)), 4, '', 0, 0, 'L', 1)#Fill rest of the width
                        self.pdf.ln(4)
                        line_width = text_w
                    self.pdf.cell(text_w, 4, text, 0, 0, 'L', 1)
                if line_width < total_width:
                    self.pdf.cell((total_width - line_width), 4, '', 0, 0, 'L', 1)#Fill rest of the width in the last row
            # Add visualizations
            # Default sizes and margins values
            x = 30
            y = 10
            y_img = 80
            w = 100
            h = 50
            x_img = 50
            # Count images for page break
            count = 0
            n_images = len(self.images)
            # Set top margin checking if metrics exist
            self.pdf.set_text_color(93, 188, 210)
            self.pdf.set_font('Arial', '', 14)
            if self.metrics_exists:
                y_img = y_img + 10
            if self.agent_data:
                y_img = y_img + 20
            self.pdf.ln(10)
            #Sort images by width size
            images = sorted(self.images, key=itemgetter('width'))
            #Insert images
            for img in images:
                #Change width and heigh
                if img['width'] >= 420 and img['width'] <= 430 or img['width'] >= 580 and img['width'] <= 590:
                    w = 118
                    h = 62
                    x_img = 48
                elif img['width'] >= 705 and img['width'] <= 725:
                    w = 145
                    h = 65
                    x_img = 26                
                elif img['width'] >= 895 and img['width'] <= 910 or img['width'] >= 1080 and img['width'] <= 1100 or img['width'] >= 1300 and img['width'] <= 1400:
                    w = 162
                    h = 72
                    x_img = 26
                elif img['width'] >= 1800 and img['width'] <= 1900:
                    w = 190
                    h = 90
                    x_img = 10     
                #Insert image
                self.pdf.cell(x , y, img['title'], 0, 1)
                self.pdf.image(img['path'], x_img, y_img, w, h)
                self.pdf.ln(80)
                y_img = y_img + 90
                count = count + 1
                n_images = n_images - 1
                if count == 2 and n_images >= 1:
                    self.pdf.add_page()
                    self.pdf.ln(20)
                    y_img = 50
                    count = 0
            #Add tables
            if self.tables:
                self.pdf.add_page()
                self.pdf.ln(20)
                rows_count = 0
                self.table_keys = self.tables.keys()
                for key in self.table_keys:
                    table_title = key
                    if rows_count >= 50:
                        self.pdf.add_page()
                        self.pdf.ln(20)
                        rows_count = 0
                    rows_count = rows_count + len(self.tables[key]['rows']) + 5 
                    self.pdf.ln(10)
                    #Table title
                    self.pdf.set_text_color(93, 188, 210)
                    self.pdf.set_font('Arial', '', 14)
                    self.pdf.cell(0 , 5, table_title, 0, 1, 'L')
                    self.pdf.ln()
                    #Table content
                    self.pdf.set_font('Arial', '', 8)
                    self.pdf.set_fill_color(93, 188, 210)
                    self.pdf.set_text_color(255,255,255)
                    sizes_field = self.calculate_table_width(self.tables[key])
                    count = 0
                    for field in self.tables[key]['fields']:
                        if field != 'sparkline':
                            width = sizes_field[count]
                            self.pdf.cell(width, 4, str(field), 0, 0, 'L', 1)
                            count = count + 1
                    self.pdf.ln()
                    self.pdf.set_text_color(93, 188, 210)
                    for row in self.tables[key]['rows']:
                        count = 0
                        for value in row:
                            if not isinstance(value, list):
                                width = sizes_field[count]
                                self.pdf.cell(width, 4, str(value), 0, 0, 'L', 0)
                                count = count + 1
                        self.pdf.ln()
            #Save pdf
            self.pdf.output(self.path+'wazuh-'+self.pdf_name+'-'+report_id+'.pdf', 'F')
            #Delete the images
            self.delete_images()
        except Exception as e:
            self.logger.error("Error generating report: %s" % (e))
            return json.dumps({"error": str(e)})
        return parsed_data

    #Calculates the width of the fields
    def calculate_table_width(self, table):
        sizes = {}
        total_width = 0
        fields = table['fields']
        for field in fields:
            if field != 'sparkline':
                width = self.pdf.get_string_width(field) + 1
                sizes[field] = width
        for row in table['rows']:
            count = 0
            for value in row:
                if not isinstance(value, list):
                    key = fields[count]
                    prev_width = sizes[key]
                    width = self.pdf.get_string_width(value) + 1
                    if width > prev_width:
                        sizes[key] = width
                count = count + 1
        # This code block resize the table for fill all the width
        for key in sizes.keys():
            total_width = total_width + sizes[key]
        if total_width < 190:
            diff = 190 - total_width
            keys_num = len(sizes.keys())
            diff = diff / keys_num
            for key in sizes.keys(): # Sum the proporcional width difference to the fields
                sizes[key] = sizes[key] + diff
        return self.sort_table_sizes(table['fields'], sizes)
    
    #Print agent info
    def print_agent_info(self, agent_info, pdf):
        pdf.ln(10)
        sorted_fields = ('ID', 'Name', 'IP', 'Version', 'Manager', 'OS')
        fields = {'ID':0, 'Name':0, 'IP':0, 'Version':0, 'Manager':0, 'OS':0}
        total_width = 0
        for key in fields.keys():
            #Calculate width
            width = pdf.get_string_width(agent_info[key])
            if pdf.get_string_width(agent_info[key]) > width:
                width = pdf.get_string_width(agent_info[key])
            width = width + 2
            total_width = total_width + width
            fields[key] = width
        #Calculate the rest of the width to fill the row
        diff = 0
        if total_width < 190:
            diff = 190 - total_width
            keys_num = len(fields.keys())
            diff = diff / keys_num
        for key in fields.keys():
            fields[key] = fields[key] + diff
        #Set color and print th
        pdf.set_font('Arial', '', 8)
        pdf.set_fill_color(93, 188, 210)
        pdf.set_text_color(255,255,255)
        for key in sorted_fields:
            pdf.cell(fields[key], 4, str(key), 0, 0, 'L', 1)
        pdf.ln()
        #Change text color and print tr
        self.pdf.set_text_color(93, 188, 210)
        for key in sorted_fields:
            pdf.cell(fields[key], 4, str(agent_info[key]), 0, 0, 'L', 0)
        #Print the rest of the agent information
        pdf.ln(5)
        self.pdf.set_text_color(169, 169, 169)
        pdf.cell(0,6, "Registration date: " + str(agent_info['dateAdd']), 0, 0, 'L', 0)
        pdf.ln()
        pdf.cell(0,6, "Last keep alive: " + str(agent_info['lastKeepAlive']), 0, 0, 'L', 0)
        pdf.ln()
        pdf.cell(0,6, "Groups: " + str(agent_info['group']), 0, 0, 'L', 0)
        pdf.ln(2)

    #Sorts the width of the fields
    def sort_table_sizes(self, fields, sizes):
        sorted_sizes = []
        for key in fields:
            if key != 'sparkline':
                sorted_sizes.append(sizes[key])
        return sorted_sizes
    
    # Returns a list with all PDF files in the bin directory
    @expose_page(must_login=False, methods=['GET'])
    def reports(self, **kwargs):
        """Get the list of reports.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            pdf_files = []
            for f in os.listdir(self.path):
                if os.path.isfile(os.path.join(self.path, f)):
                    filename, file_extension = os.path.splitext(self.path+f)
                    if file_extension == '.pdf':
                        file = {}
                        file['size'] = os.path.getsize(self.path+f)
                        file['name'] = f
                        file['date'] = time.strftime('%Y.%m.%d %H:%M', time.gmtime(os.path.getmtime(self.path+f)))
                        pdf_files.append(file)

            parsed_data = json.dumps({'data': pdf_files})
        except Exception as e:
            self.logger.error("Error getting PDF files: %s" % (e))
            return json.dumps({"error": str(e)})
        return parsed_data

    # Deletes a report from disk
    @expose_page(must_login=False, methods=['GET'])
    def remove(self, **kwargs):
        """Remove a report by name.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            if 'name' not in kwargs:
                raise Exception('Missing filename')
            filename = kwargs['name']
            os.remove(self.path+filename)
            self.logger.info("Removed report %s" % kwargs['name'])
            parsed_data = json.dumps({"data": "Deleted file"})
        except Exception as e:
            self.logger.error("Error deleting PDF file: %s" % (e))
            return json.dumps({"error": str(e)})
        return parsed_data
