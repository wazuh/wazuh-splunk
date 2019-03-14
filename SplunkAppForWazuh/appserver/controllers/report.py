# -*- coding: utf-8 -*-
"""
Wazuh app - Report generation backend.

Copyright (C) 2015-2019 Wazuh, Inc.

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

Find more information about this on the LICENSE file.
"""
import os
import time
import jsonbak
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
        try:
            self.path = '/opt/splunk/etc/apps/SplunkAppForWazuh/appserver/static/'
            controllers.BaseController.__init__(self)
        except Exception as e:
            self.logger.error("Error in report module constructor: %s" % (e))

    def save_images(self, images):
        i = 0
        images_saved = []
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
            images_saved.append(image)
            i += 1
        return images_saved

    def delete_images(self, images):
        for img in images:
            os.remove(img['path'])

    @expose_page(must_login=False, methods=['POST'])
    def generate(self, **kwargs):
        """Generate PDF report.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            pdf = PDF('P', 'mm', 'A4')
            metrics_exists = False
            first_page = True
            self.logger.info("Start generating report ")
            json_acceptable_string = kwargs['data']
            data = jsonbak.loads(json_acceptable_string)
            #Replace "'" in images
            clean_images = jsonbak.dumps(data['images'])
            clean_images.replace("'", "\"")
            data['images'] = jsonbak.loads(clean_images)
            today = datetime.datetime.now().strftime('%Y.%m.%d %H:%M')
            report_id = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
            #Get filters and other information
            filters = data['queryFilters']
            pdf_name = data['pdfName']
            time_range = data['timeRange']
            section_title = data['sectionTitle']
            metrics = data['metrics']
            tables = data['tableResults']
            if metrics:
                metrics = jsonbak.loads(metrics)
            agent_data = data['isAgents']
            #Save the images
            saved_images = self.save_images(data['images'])
            parsed_data = jsonbak.dumps({'data': 'success'})
            # Add title and filters 
            pdf.alias_nb_pages()
            pdf.add_page()
            pdf.ln(20)
            #Color WazuhBlue
            pdf.set_text_color(93, 188, 210)
            # Title Arial Bold 20
            pdf.set_font('Arial', '', 25)
            pdf.cell(0,0, section_title + ' report' , 0, 0, 'L')
            #Date
            pdf.set_font('Arial', '', 12)
            pdf.cell(0,0, today , 0, 0, 'R')
            #Filters and search time range
            if pdf_name != 'agents-inventory': # If the name of the PDF file is agents-inventory does not print  date range or filters either 
                pdf.ln(7)
                pdf.set_fill_color(93, 188, 210)
                pdf.set_text_color(255,255,255)
                pdf.set_font('Arial', '', 10)
                pdf.cell(0, 5, ' Search time range: ' + time_range , 0, 0, 'L', 1)
                pdf.ln(5)
                pdf.cell(0, 5, ' Filters:' + filters , 0, 0, 'L', 1)
            #Check if is agent, print agent info
            if agent_data and agent_data != 'inventory':
                self.print_agent_info(agent_data, pdf)
            #Check metrics and print if exist
            if len(metrics) > 0:
                pdf.set_text_color(255,255,255)
                metrics_exists = True
                w = 5
                line_width = 0
                total_width = 190
                pdf.ln(10)
                pdf.set_font('Arial', '', 8)
                for key in metrics.keys():
                    text = (str(key) +': '+ str(metrics[key]))
                    text_w = pdf.get_string_width(text) + w
                    line_width = line_width + text_w
                    if line_width >= total_width:
                        pdf.cell((total_width - (line_width - text_w)), 4, '', 0, 0, 'L', 1)#Fill rest of the width                                                                 
                        pdf.ln(4)
                        line_width = text_w
                    pdf.cell(text_w, 4, text, 0, 0, 'L', 1)
                if line_width < total_width:
                    pdf.cell((total_width - line_width), 4, '', 0, 0, 'L', 1)#Fill rest of the width in the last row
            # Add visualizations
            if saved_images:
                # Default sizes and margins values
                x = 30
                y = 10
                y_img = 80
                w = 100
                h = 50
                x_img = 50
                # Count images for page break
                count = 0
                n_images = len(saved_images)
                # Set top margin checking if metrics exist
                pdf.set_text_color(93, 188, 210)
                pdf.set_font('Arial', '', 14)
                if metrics_exists:
                    y_img = y_img + 10
                if agent_data:
                    y_img = y_img + 20
                pdf.ln(10)
                #Sort images by width size
                images = sorted(saved_images, key=itemgetter('width'))
                #Insert images
                for img in images:
                    #Change width and heigh
                    if img['width'] == -1:
                        w = 0
                        h = 0
                        x_img = 80
                    elif img['width'] <= 550:
                        w = 118
                        h = 65
                        x_img = 40
                    else:
                        w = 189
                        h = 55
                        x_img = 12     
                    #Insert image
                    pdf.cell(x , y, img['title'], 0, 1)
                    pdf.image(img['path'], x_img, y_img, w,h)
                    pdf.ln(75)
                    y_img = y_img + 85
                    count = count + 1
                    n_images = n_images - 1
                    if count == 2 and n_images >= 1 and first_page:
                        pdf.add_page()
                        pdf.ln(15)
                        y_img = 45
                        count = 0
                        first_page = False
                    if count == 3 and n_images >= 1:
                        pdf.add_page()
                        pdf.ln(15)
                        y_img = 45
                        count = 0
            #Add tables
            if self.tables_have_info(tables): #Check if any table has information, if not, prevent break page and not iterate in empties tables
                if pdf_name != 'agents-inventory': # If the name of the PDF file is agents-inventory does not add page
                    pdf.add_page()
                    pdf.ln(20)
                rows_count = 12 # Set row_count with 12 for the agent information size
                table_keys = tables.keys()
                for key in table_keys:
                    if tables[key]:#Check if this table has information, if it has, process it
                        table_title = key
                        pdf.ln(10)
                        #Table title
                        pdf.set_text_color(93, 188, 210)
                        pdf.set_font('Arial', '', 14)
                        if rows_count > 60:
                            pdf.add_page()
                            pdf.ln(12)
                            rows_count = 0
                        pdf.cell(0 , 5, table_title, 0, 1, 'L')
                        rows_count = rows_count + 5
                        pdf.ln()
                        #Table content
                        pdf.set_font('Arial', '', 8)
                        pdf.set_fill_color(93, 188, 210)
                        pdf.set_text_color(255,255,255)
                        sizes_field = self.calculate_table_width(pdf, tables[key])
                        count = 0
                        for field in tables[key]['fields']:
                            if rows_count > 60:
                                pdf.add_page()
                                pdf.ln(12)
                                rows_count = 0
                            if field != 'sparkline':
                                width = sizes_field[count]
                                pdf.cell(width, 4, str(field), 0, 0, 'L', 1)
                                count = count + 1
                        pdf.ln()
                        pdf.set_text_color(93, 188, 210)
                        for row in tables[key]['rows']:
                            count = 0
                            if rows_count > 55:
                                pdf.add_page()
                                pdf.ln(12)
                                rows_count = 0
                            rows_count = rows_count + 1
                            for value in row:
                                if not isinstance(value, list):
                                    width = sizes_field[count]
                                    pdf.cell(width, 4, str(value), 0, 0, 'L', 0)
                                    count = count + 1
                            pdf.ln()
            #Save pdf
            pdf.output(self.path+'wazuh-'+pdf_name+'-'+report_id+'.pdf', 'F')
            #Delete the images
            self.delete_images(saved_images)
        except Exception as e:
            self.logger.error("Error generating report: %s" % (e))
            return jsonbak.dumps({"error": str(e)})
        return parsed_data

    #Check if tables are not empties
    def tables_have_info(self, tables):
        for key in tables.keys():
            if tables[key]:
                return True
        return False

    #Calculates the width of the fields
    def calculate_table_width(self, pdf, table):
        sizes = {}
        total_width = 0
        fields = table['fields']
        for field in fields:
            if field != 'sparkline':
                width = pdf.get_string_width(field) + 1
                sizes[field] = width
        for row in table['rows']:
            count = 0
            for value in row:
                if not isinstance(value, list):
                    key = fields[count]
                    prev_width = sizes[key]
                    if value: # Check for possible undefined elements
                        width = pdf.get_string_width(value) + 1
                    else:
                         width = 1
                    if width > prev_width:
                        sizes[key] = width
                count = count + 1
        # This code block resize the table for fill all the width
        for key in sizes.keys():
            if sizes[key]: # Check for possible undefined elements
                total_width = total_width + sizes[key]
            else:
                total_width = total_width + 0
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
        pdf.set_text_color(93, 188, 210)
        for key in sorted_fields:
            pdf.cell(fields[key], 4, str(agent_info[key]), 0, 0, 'L', 0)
        #Print the rest of the agent information
        pdf.ln(5)
        pdf.set_text_color(169, 169, 169)
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

            parsed_data = jsonbak.dumps({'data': pdf_files})
        except Exception as e:
            self.logger.error("Error getting PDF files: %s" % (e))
            return jsonbak.dumps({"error": str(e)})
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
            parsed_data = jsonbak.dumps({"data": "Deleted file"})
        except Exception as e:
            self.logger.error("Error deleting PDF file: %s" % (e))
            return jsonbak.dumps({"error": str(e)})
        return parsed_data
