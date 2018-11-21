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
import splunk.appserver.mrsparkle.controllers as controllers
from splunk.appserver.mrsparkle.lib.decorators import expose_page
from log import log

class report(controllers.BaseController):
    def __init__(self):
        self.logger = log()
        try:
            controllers.BaseController.__init__(self)
        except Exception as e:
            self.logger.error("Error in report module constructor: %s" % (e))

    @expose_page(must_login=False, methods=['POST'])
    def generate(self, **kwargs):
        try:
            self.logger.error("Start generating report")
            parsed_data = json.dumps({'data': 'success'})
        except Exception as e:
            self.logger.error("Error generating report: %s" % (e))
            return json.dumps({"error":str(e)})
        return parsed_data
