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
import requests
import uuid
# from splunk import AuthorizationFailed as AuthorizationFailed
from splunk.clilib import cli_common as cli
import splunk.appserver.mrsparkle.controllers as controllers
import splunk.appserver.mrsparkle.lib.util as util
from splunk.appserver.mrsparkle.lib.util import make_splunkhome_path
from splunk.appserver.mrsparkle.lib.decorators import expose_page
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "."))
from db import database
from log import log


class manager(controllers.BaseController):
    def __init__(self):
        self.logger = log()
        try:
            controllers.BaseController.__init__(self)
            self.db = database()
            self.session = requests.Session()
            self.session.trust_env = False
        except Exception as e:
            self.logger.error("Error in manager module constructor: %s" % (e))

    @expose_page(must_login=False, methods=['GET'])
    def check_connection(self, **kwargs):
        try:
            opt_username = kwargs["user"]
            opt_password = kwargs["pass"]
            opt_base_url = kwargs["ip"]
            opt_base_port = kwargs["port"]
            url = opt_base_url + ":" + opt_base_port
            auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
            verify = False
            request_cluster = self.session.get(
                url + '/version', auth=auth, timeout=8, verify=verify).json()
            del kwargs['pass']
            result = json.dumps(request_cluster)
        except Exception as e:
            return json.dumps({"status": "400", "error": str(e)})
        return result

    @expose_page(must_login=False, methods=['GET'])
    def polling_state(self, **kwargs):
        try:
            app = cli.getConfStanza(
                'inputs', 'script:///opt/splunk/etc/apps/SplunkAppForWazuh/bin/get_agents_status.py')
            disabled = app.get('disabled')
            polling_dict = {}
            polling_dict['disabled'] = disabled
            data_temp = json.dumps(polling_dict)
        except Exception as e:
            return json.dumps("{error:"+str(e)+"}")
        return data_temp

    @expose_page(must_login=False, methods=['GET'])
    def get_api(self, **kwargs):
        try:
            if 'id' not in kwargs:
                return json.dumps({'error': 'Missing ID.'})
            id = kwargs['id']
            data_temp = self.db.get(id)
            parsed_data = json.dumps(data_temp)
        except Exception as e:
            self.logger.error("Error in get_apis endpoint: %s" % (e))
            return json.dumps({'error': str(e)})
        return parsed_data

    @expose_page(must_login=False, methods=['GET'])
    def get_apis(self, **kwargs):
        try:
            data_temp = self.db.all()
            result = json.dumps(data_temp)
        except Exception as e:
            self.logger.error(json.dumps({"error": str(e)}))
            return json.dumps({"error": str(e)})
        return result

    @expose_page(must_login=False, methods=['POST'])
    def add_api(self, **kwargs):
        try:
            if 'payload[url]' not in kwargs or 'payload[portapi]' not in kwargs or 'payload[userapi]' not in kwargs or 'payload[passapi]' not in kwargs:
                return json.dumps({'error': 'Invalid number of arguments'})
            record = {}
            record['id'] = str(uuid.uuid4())
            record['url'] = kwargs['payload[url]']
            record['portapi'] = kwargs['payload[portapi]']
            record['userapi'] = kwargs['payload[userapi]']
            record['passapi'] = kwargs['payload[passapi]']
            result = self.db.insert(record)
            parsed_data = json.dumps({'result': record['id']})
        except Exception as e:
            self.logger.error({'error': str(e)})
            return json.dumps({'error': str(e)})
        return parsed_data

    @expose_page(must_login=False, methods=['POST'])
    def remove_api(self, **kwargs):
        try:
            if 'id[id]' not in kwargs:
                return json.dumps({'error': 'Missing ID'})
            self.db.remove(str(kwargs['id[id]']))
            parsed_data = json.dumps({'data': 'success'})
        except Exception as e:
            self.logger.error("Error in remove_api endpoint: %s" % (e))
            return json.dumps({'error': str(e)})
        return parsed_data

    @expose_page(must_login=False, methods=['POST'])
    def update_api(self, **kwargs):
        try:
            if 'newRegister[id]' not in kwargs or 'newRegister[url]' not in kwargs or 'newRegister[portapi]' not in kwargs or 'newRegister[userapi]' not in kwargs or 'newRegister[passapi]' not in kwargs:
                raise Exception("Invalid arguments : %s" % (kwargs))
            # building a new object
            entry = {}
            entry['id'] = kwargs['newRegister[id]']
            entry['url'] = kwargs['newRegister[url]']
            entry['portapi'] = kwargs['newRegister[portapi]']
            entry['userapi'] = kwargs['newRegister[userapi]']
            entry['passapi'] = kwargs['newRegister[passapi]']
            entry['managerName'] = kwargs['newRegister[managerName]']
            entry['filterName'] = kwargs['newRegister[filterName]']
            entry['filterType'] = kwargs['newRegister[filterType]']
            self.db.update(entry)
            parsed_data = json.dumps({'data': 'success'})
        except Exception as e:
            self.logger.error("Error in update_api endpoint: %s" % (e))
            return json.dumps("{error:"+str(e)+"}")
        return parsed_data

    @expose_page(must_login=False, methods=['GET'])
    def get_log_lines(self, **kwargs):
        try:
            # lines = self.logger.get_last_log_lines(20)
            parsed_data = json.dumps({'logs': ['a line']})
        except Exception as e:
            self.logger.error("Get_log_lines endpoint: %s" % (e))
            return json.dumps({"error": str(e)})
        return parsed_data
