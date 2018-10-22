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
from db import database
from log import log

def diff_keys_dic_update_api(kwargs_dic):
    try:
        diff = []
        kwargs_dic_keys = kwargs_dic.keys()
        dic_keys = ['id', 'url', 'portapi', 'userapi', 'passapi']
        for key in dic_keys:
            if key not in kwargs_dic_keys:
                diff.append(key)
        return str(', '.join(diff))
    except Exception as e:
        return "Error comparing diccionaries"

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

    # /custom/SplunkAppForWazuh/manager/node
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
            self.logger.error("Cannot connect to API : %s" % (e))
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
            return json.dumps({'error':str(e)})
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
            record = kwargs
            keys_list = ['url', 'portapi', 'userapi', 'passapi']
            if set(record.keys()) == set(keys_list):
                record['id'] = str(uuid.uuid4())
                result = self.db.insert(record)
                parsed_data = json.dumps({'result': record['id']})
            else: 
                return json.dumps({'error': 'Invalid number of arguments'})
        except Exception as e:
            self.logger.error({'error': str(e)})
            return json.dumps({'error': str(e)})
        return parsed_data

    @expose_page(must_login=False, methods=['POST'])
    def remove_api(self, **kwargs):
        try:
            api_id = kwargs
            if 'id' not in api_id:
                return json.dumps({'error': 'Missing ID'})
            self.db.remove(api_id['id'])
            parsed_data = json.dumps({'data': 'success'})
        except Exception as e:
            self.logger.error("Error in remove_api endpoint: %s" % (e))
            return json.dumps({'error': str(e)})
        return parsed_data

    @expose_page(must_login=False, methods=['POST'])
    def update_api(self, **kwargs):
        try:
            entry = kwargs
            keys_list = ['id', 'url', 'portapi', 'userapi', 'passapi', 'filterName', 'filterType', 'managerName']
            if set(entry.keys()) == set(keys_list):
                self.db.update(entry)
                parsed_data = json.dumps({'data': 'success'})
            else:
                missing_params = diff_keys_dic_update_api(entry)
                raise Exception("Invalid arguments, missing params : %s" % str(missing_params))     
        except Exception as e:
            self.logger.error("Error in update_api endpoint: %s" % (e))
            return json.dumps({"error":str(e)})
            #return '{"error":' + missing_params + '}'
        return parsed_data

    @expose_page(must_login=False, methods=['GET'])
    def get_log_lines(self, **kwargs):
        try:
            lines = self.logger.get_last_log_lines(20)
            parsed_data = json.dumps({'logs': lines})
        except Exception as e:
            self.logger.error("Get_log_lines endpoint: %s" % (e))
            return json.dumps({"error": str(e)})
        return parsed_data