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
import json
import datetime
import splunk.appserver.mrsparkle.controllers as controllers
from splunk.appserver.mrsparkle.lib.decorators import expose_page
from log import log
import base64
from fpdf import FPDF


class PDF(FPDF):
    def header(self):
        # Logo
        self.image('/opt/splunk/etc/apps/SplunkAppForWazuh/appserver/static/css/images/wazuh/png/logo.png', 10, 10, 40)
        self.set_font('Times', '', 11)
        self.set_text_color(58, 162, 242)
        #Contact info
        self.cell(150) #Move to the right
        self.cell(0, 5, 'info@wazuh.com')
        self.ln() #Break line
        self.cell(150) #Move to the right
        self.cell(0, 5, 'https://wazuh.com')

    # Page footer
    def footer(self):
        # Position at 1.5 cm from bottom
        self.set_y(-15)
        self.set_text_color(58, 162, 242)
        self.set_font('Arial', 'IB', 8)
        # Page number
        self.cell(0, 10, 'Page ' + str(self.page_no()) + '/{nb}', 0, 0, 'C')

class report(controllers.BaseController):
    """Report class.

    Handle reporting methods
    """

    def __init__(self):
        """Constructor."""
        self.logger = log()
        self.images = {}
        self.html = ""
        try:
            self.pdf = PDF('P', 'mm', 'A4')
            self.path = '/opt/splunk/etc/apps/SplunkAppForWazuh/appserver/static/'
            controllers.BaseController.__init__(self)
        except Exception as e:
            self.logger.error("Error in report module constructor: %s" % (e))

    def save_images(self, images):
        i = 0
        while i in range(0, len(images['array'])):
            f = open(self.path+'sample'+str(i)+'.png', 'wb')
            title = str(images['array'][i]['title'])
            path = str(self.path+'sample'+str(i)+'.png')
            f.write(base64.decodestring(
                images['array'][i]['element'].split(',')[1].encode()))
            f.close()
            self.images[title] = path
            i += 1

    def delete_images(self):
        for title, path in self.images.iteritems():
            os.remove(path)

    @expose_page(must_login=False, methods=['POST'])
    def generate(self, **kwargs):
        """Generate PDF report.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            self.logger.info("Start generating report ")
            json_acceptable_string = kwargs['data'].replace("'", "\"")
            images = json.loads(json_acceptable_string)
            report_id = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
            self.logger.info("Size of array: %s" % (len(images['array'])))
            #Get filters 
            self.filters = images['array'][0]['filters']
            #Save the images
            self.save_images(images)
            parsed_data = json.dumps({'data': 'success'})
            #
            #""" % (title, image_path,)

            # Add title and filters 
            self.pdf.alias_nb_pages()
            self.pdf.add_page()
            self.pdf.ln(20)
            #Color WazuhBlue
            self.pdf.set_text_color(58, 162, 242)
            #Arial Bold 20
            self.pdf.set_font('Arial', 'I', 25)
            self.pdf.cell(0,0, 'Security events report')
            #Break line
            self.pdf.ln(10)
            self.pdf.set_font('Arial', '', 15)
            self.pdf.cell(0,0, self.filters)
            # Add visualizations
            x = 30
            y = 10
            y_img = 80
            w = 150
            h = 75
            count = 0
            self.pdf.set_font('Times', 'IU', 12)
            self.pdf.ln(20)
            for title, image_path in self.images.iteritems():
                self.pdf.cell(x , y, title, 0, 1)
                self.pdf.image(image_path, x, y_img, w, h)
                self.pdf.ln(90)
                y_img = y_img + 100
                count = count + 1
                if count == 2:
                    self.pdf.add_page()
                    self.pdf.ln(20)
                    y_img = 50
                    count = 0
            #Save pdf
            self.pdf.output(self.path+'tuto1'+report_id+'.pdf', 'F')
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
                        file['date'] = os.path.getmtime(self.path+f)
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
