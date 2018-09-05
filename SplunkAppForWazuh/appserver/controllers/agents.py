#
# Wazuh app - Agents backend
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


class agents(controllers.BaseController):
    def __init__(self):
        self.logger = log()
        try:
            controllers.BaseController.__init__(self)
            self.db = database()
            self.session = requests.Session()
            self.session.trust_env = False
        except Exception as e:
            self.logger.error("Error in agent module constructor: %s" % (e))

    # /custom/SplunkAppForWazuh/agents/summary

    @expose_page(must_login=False, methods=['GET'])
    def summary(self, **kwargs):
        try:
            if 'id' not in kwargs:
                raise Exception({'error': 'Missing ID.'})
            id = kwargs['id']
            api = self.db.get(id)[0]
            opt_base_url = api['url']
            opt_base_port = api['portapi']
            opt_username = api['userapi']
            opt_password = api['passapi']
            url = opt_base_url + ":" + opt_base_port
            auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
            verify = False
            request = requests.get(
                url + '/agents/summary', auth=auth, verify=verify)
            agent_summary = json.loads(request.text)['data']
            data = {}
            for key in agent_summary:
                data['agent_summary_' + key.lower().replace(' ', '')
                     ] = agent_summary[key]
            data = [data]
            result = json.dumps(data)
        except Exception as e:
            self.logger.error("Error in agents_uniq endpoint: %s" % (e))
        return result

    # /custom/SplunkAppForWazuh/agents/uniq
    @expose_page(must_login=False, methods=['GET'])
    def agents_uniq(self, **kwargs):
        try:
            if 'id' not in kwargs:
                raise Exception({'error': 'Missing ID.'})
            id = kwargs['id']
            api = self.db.get(id)[0]
            opt_base_url = api['url']
            opt_base_port = api['portapi']
            opt_username = api['userapi']
            opt_password = api['passapi']
            url = opt_base_url + ":" + opt_base_port
            auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
            verify = False
            request = requests.get(
                url + '/agents?limit=1', auth=auth, verify=verify)
            agents_qty = json.loads(request.text)["data"]["totalItems"]
            request = requests.get(url + '/agents?select=version,os.name,os.platform,os.version&offset=0&limit=' + str(
                agents_qty), auth=auth, verify=verify).json()
        except Exception as e:
            self.logger.error("Error in agents_uniq endpoint: %s" % (e))
            return json.dumps({"error": str(e)})
        return json.dumps(request)
