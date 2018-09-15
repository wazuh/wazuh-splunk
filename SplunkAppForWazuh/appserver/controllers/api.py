#
# Wazuh app - api backend
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
import requests
import re
# from splunk import AuthorizationFailed as AuthorizationFailed
import splunk.appserver.mrsparkle.controllers as controllers
import splunk.appserver.mrsparkle.lib.util as util
from splunk.appserver.mrsparkle.lib.util import make_splunkhome_path
from splunk.appserver.mrsparkle.lib.decorators import expose_page
from db import database
from log import log


class api(controllers.BaseController):

    def __init__(self):
        self.logger = log()
        try:
            controllers.BaseController.__init__(self)
            self.db = database()
            self.session = requests.Session()
            self.session.trust_env = False
        except Exception as e:
            self.logger.error("Error in API module constructor: %s" % (e))

    # /custom/SplunkAppForWazuh/api/node
    @expose_page(must_login=False, methods=['GET'])
    def request(self, **kwargs):
        try:
            if 'id' not in kwargs or 'endpoint' not in kwargs:
                return json.dumps({'error': 'Missing ID or endpoint.'})
            the_id = kwargs['id']
            api = self.db.get(the_id)
            opt_username = api[0]["userapi"]
            opt_password = api[0]["passapi"]
            opt_base_url = api[0]["url"]
            opt_base_port = api[0]["portapi"]
            opt_endpoint = kwargs["endpoint"]
            del kwargs['id']
            del kwargs['endpoint']
            url = opt_base_url + ":" + opt_base_port
            auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
            verify = False
            request = self.session.get(
                url + opt_endpoint, params=kwargs, auth=auth, verify=verify).json()
            result = json.dumps(request)

        except Exception as e:
            self.logger.error("Error making API request: %s" % (e))
            return json.dumps({'error': str(e)})
        return result
