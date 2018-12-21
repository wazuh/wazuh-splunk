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
        self.copyright = unicode('Copyright © 2018 Wazuh, Inc.', 'utf-8')
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
        while i in range(0, len(images['images'])):
            path = str(self.path+str(images['images'][i]['id'])+'.png')
            f = open(path, 'wb')
            title = str(images['images'][i]['title'])
            width = images['images'][i]['width']
            height = images['images'][i]['height']
            f.write(base64.decodestring(
                images['images'][i]['element'].split(',')[1].encode()))
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
            json_acceptable_string = kwargs['data'].replace("'", "\"")
            data = json.loads(json_acceptable_string)
            today = datetime.datetime.now().strftime('%Y.%m.%d %H:%M')
            report_id = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
            self.logger.info("Size of array: %s" % (len(data['images'])))
            #Get filters and other information
            self.filters = data['queryFilters']
            self.pdf_name = data['pdfName']
            self.time_range = data['timeRange']
            self.section_title = data['sectionTitle']
            self.metrics = data['metrics']
            self.metrics = json.loads(self.metrics)
            #Save the images
            self.save_images(data)
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
            #Check metrics and print if exist
            if len(self.metrics) > 0:
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
            x = 30
            y = 10
            y_img = 80
            w = 150
            h = 75
            count = 0
            n_images = len(self.images)
            self.pdf.set_text_color(93, 188, 210)
            self.pdf.set_font('Arial', '', 14)
            if self.metrics_exists:
                pass
                y_img = y_img + 10
                self.pdf.ln(10)
            else:
                self.pdf.ln(5)
            #Sort images by width size
            images = sorted(self.images, key=itemgetter('width'))
            for img in images:
                self.pdf.cell(x , y, img['title'], 0, 1)
                self.pdf.image(img['path'], x, y_img, w, h)
                self.pdf.ln(90)
                y_img = y_img + 100
                count = count + 1
                n_images = n_images - 1
                if count == 2 and n_images >= 1:
                    self.pdf.add_page()
                    self.pdf.ln(20)
                    y_img = 50
                    count = 0
            #Save pdf
            self.pdf.output(self.path+'wazuh-'+self.pdf_name+'-'+report_id+'.pdf', 'F')
            #Delete the images
            self.delete_images()
        except Exception as e:
            self.logger.error("Error generating report: %s" % (e))
            return json.dumps({"error": str(e)})
        return parsed_data

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
