import logging
import os
import sys
import json
import requests
# from splunk import AuthorizationFailed as AuthorizationFailed
import splunk.appserver.mrsparkle.controllers as controllers
import splunk.appserver.mrsparkle.lib.util as util
from splunk.appserver.mrsparkle.lib.util import make_splunkhome_path
from splunk.appserver.mrsparkle.lib.decorators import expose_page
_APPNAME = 'wazuh'
def setup_logger(level):
    """
    Setup a logger for the REST handler.
    """
    logger = logging.getLogger('splunk.appserver.%s.controllers.manager' % _APPNAME)
    logger.propagate = False  # Prevent the log messages from being duplicated in the python.log file
    logger.setLevel(level)
    file_handler = logging.handlers.RotatingFileHandler(make_splunkhome_path(['var', 'log', 'splunk', 'manager.log']), maxBytes=25000000, backupCount=5)
    formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s')
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)
    return logger
logger = setup_logger(logging.DEBUG)
class manager(controllers.BaseController):
    # /custom/wazuh/manager/status
    @expose_page(must_login=False, methods=['GET'])
    def status(self, **kwargs):
        opt_username = 'foo'
        opt_password = 'bar'
        opt_base_url = 'http://192.168.0.130:55000'
        auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
        verify = False
        request = requests.get(opt_base_url + '/manager/status', auth=auth, verify=verify)
        manager_status = json.loads(request.text)['data']
        data = {}
        for key in manager_status:
            data['manager-status_' + key.lower()] = manager_status[key]
        data = [data]
        result = json.dumps(data)
        return result
        
    # /custom/wazuh/manager/info
    @expose_page(must_login=False, methods=['GET'])
    def info(self, **kwargs):
        opt_username = 'foo'
        opt_password = 'bar'
        opt_base_url = 'http://192.168.0.130:55000'
        auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
        verify = False
        request = requests.get(opt_base_url + '/manager/info', auth=auth, verify=verify)
        manager_info = json.loads(request.text)['data']
        data = {}
        for key in manager_info:
            data['manager-info_' + key.lower()] = manager_info[key]
        data = [data]
        result = json.dumps(data)
        return result

    # /custom/wazuh/manager/logs
    @expose_page(must_login=False, methods=['GET'])
    def logs(self, **kwargs):
        opt_username = 'foo'
        opt_password = 'bar'
        opt_base_url = 'http://192.168.0.130:55000'
        auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
        verify = False
        request = requests.get(opt_base_url + '/manager/logs', auth=auth, verify=verify)
        manager_logs = json.loads(request.text)['data']['items']
        result = json.dumps(manager_logs)
        return result

    # /custom/wazuh/manager/rules
    @expose_page(must_login=False, methods=['GET'])
    def rules(self, **kwargs):
        opt_username = 'foo'
        opt_password = 'bar'
        opt_base_url = 'http://192.168.0.130:55000'
        auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
        verify = False
        
        request = requests.get(opt_base_url + '/rules?limit=1', auth=auth, verify=verify)
        rules_qty = json.loads(request.text)["data"]["totalItems"]

        request = requests.get(opt_base_url + '/rules?offset=0&limit=' + str(rules_qty), auth=auth, verify=verify)
        rules = json.loads(request.text)["data"]["items"]
        # result = json.loads(rules)
        results = []
        for row in rules:
            data = {}
            for key in row:
                if isinstance(row[key], dict):
                    for detail in row[key]:
                        data[key + "-" + detail] = row[key][detail]
                elif isinstance(row[key], list):
                    count = 0
                    for detail in row[key]:
                        data[str(key) + "-" + str(count)] = detail
                        count += 1
                else:
                    data[key] = row[key]
            # data = json.dumps(data)
            results.append(data)
        return json.dumps(results)

     # /custom/wazuh/manager/decoders
    @expose_page(must_login=False, methods=['GET'])
    def decoders(self, **kwargs):
        opt_username = 'foo'
        opt_password = 'bar'
        opt_base_url = 'http://192.168.0.130:55000'
        auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
        verify = False
        request = requests.get(opt_base_url + '/decoders?limit=1', auth=auth, verify=verify)
        decoders_qty = json.loads(request.text)["data"]["totalItems"]
        request = requests.get(opt_base_url + '/decoders?offset=0&limit=' + str(decoders_qty), auth=auth, verify=verify)
        decoders = json.loads(request.text)["data"]["items"]
        results = []
        for row in decoders:
            data = {}
            for key in row:
                if isinstance(row[key], dict):
                    for detail in row[key]:
                        data[key + "-" + detail] = row[key][detail]
                elif isinstance(row[key], list):
                    count = 0
                    for detail in row[key]:
                        data[str(key) + "-" + str(count)] = detail
                        count += 1
                else:
                    data[key] = row[key]
            results.append(data)
        return json.dumps(results)