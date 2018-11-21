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
from pyPdf import PdfFileWriter

class report(controllers.BaseController):
    def __init__(self):
        self.logger = log()
        try:
            #self.path = os.path.dirname(os.path.abspath(__file__))
            self.path = '/opt/splunk/etc/apps/SplunkAppForWazuh/bin/'
            controllers.BaseController.__init__(self)
        except Exception as e:
            self.logger.error("Error in report module constructor: %s" % (e))

    @expose_page(must_login=False, methods=['POST'])
    def generate(self, **kwargs):
        try:
            self.logger.info("Start generating report")
            #self.logger.info("Arguments received: "+str(kwargs))
            self.logger.info("Path file: "+str(self.path))

            output = PdfFileWriter()
            outputStream = file(str(self.path)+"salida.pdf", "wb")
            output.write(outputStream)
            outputStream.close()
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
            pdf_files = [f for f in os.listdir(self.path) if os.path.isfile(os.path.join(self.path, f))]
            parsed_data = json.dumps({'data': pdf_files})
        except Exception as e:
            self.logger.error("Error getting PDF files: %s" % (e))
            return json.dumps({"error":str(e)})
        return parsed_data