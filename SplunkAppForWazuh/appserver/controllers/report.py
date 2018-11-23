#
# Wazuh app - Manager backend
# Copyright (C) 2018 Wazuh, Inc.
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# Find more information about this on the LICENSE file.
#
import os
import sys
import json
# from splunk import AuthorizationFailed as AuthorizationFailed
from splunk.clilib import cli_common as cli
import splunk.appserver.mrsparkle.controllers as controllers
import splunk.appserver.mrsparkle.lib.util as util
from splunk.appserver.mrsparkle.lib.util import make_splunkhome_path
from splunk.appserver.mrsparkle.lib.decorators import expose_page
from log import log
import base64
from fpdf import FPDF
#from PIL import Image

class report(controllers.BaseController):
    def __init__(self):
        self.logger = log()
        try:
            #self.path = os.path.dirname(os.path.abspath(__file__))
            self.pdf = FPDF('P', 'mm', 'A4')
            self.path = '/opt/splunk/etc/apps/SplunkAppForWazuh/appserver/static/'
            controllers.BaseController.__init__(self)
        except Exception as e:
            self.logger.error("Error in report module constructor: %s" % (e))
        
    @expose_page(must_login=False, methods=['POST'])
    def generate(self, **kwargs):
        try:
            self.logger.info("Start generating report %s " % kwargs['array[0][element]'])
            self.pdf.add_page()
            self.pdf.set_font('Arial', 'B', 16)
            self.pdf.cell(40, 10, 'Hello World!')
            self.pdf.output(self.path+'tuto1.pdf', 'F')
            # imgdata = base64.b64decode(kwargs['array[0][element]'])
            with open(self.path+'sample.png', 'wb') as f:
                f.write(base64.decodestring(kwargs['array[0][element]'].split(',')[1].encode()))
            # outputStream.close(self.path)+"salida.pdf",kwargs)
            parsed_data = json.dumps({'data': 'success'})
        except Exception as e:
            self.logger.error("Error generating report: %s" % (e))
            return json.dumps({"error":str(e)})
        return parsed_data

    # Returns a list with all PDF files in the bin directory
    @expose_page(must_login=False, methods=['GET'])
    def reports(self, **kwargs):
        try:
            self.logger.info("Returning list of PDF files")
            #pdf_files = [f for f in os.listdir(self.path) if os.path.isfile(os.path.join(self.path, f))]
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
            return json.dumps({"error":str(e)})
        return parsed_data

    # Deletes a report from disk
    @expose_page(must_login=False, methods=['GET'])
    def remove(self, **kwargs):
        try:
            if not 'name' in kwargs:
                raise Exception('Missing filename')
            self.logger.info("Removing report %s" % kwargs['name'])
            filename = kwargs['name']
            os.remove(self.path+filename)
            parsed_data = json.dumps({"data": "Deleted file"})
        except Exception as e:
            self.logger.error("Error deleting PDF file: %s" % (e))
            return json.dumps({"error":str(e)})
        return parsed_data