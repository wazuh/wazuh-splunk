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
from fpdf import FPDF, HTMLMixin


class ReportPDF(FPDF, HTMLMixin):
    """Report PDF class.

    For use in report class
    """

    pass

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
            self.pdf = ReportPDF()
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
            os.remove(img)

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
            self.pdf.add_page()
            report_id = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
            self.logger.error("Size of array: %s" % (len(images['array'])))
            #Save the images
            self.save_images(images)
            parsed_data = json.dumps({'data': 'success'})
            #Formating html
            self.html = self.html + """
            <center>
	            <img src="%scss/images/wazuh/png/logo.png" width="160" height="40">
            </center>
            """ % (self.path,)
            for title, image_path in self.images.iteritems():
                self.html = self.html + """
                <div>
                    <span>%s</span>
                    <center>
                        <img src="%s" width="400" height="140">
                    </center>
                </div>
                """ % (title, image_path,)
            self.pdf.write_html(self.html)
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
