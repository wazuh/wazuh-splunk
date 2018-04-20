import logging
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
_APPNAME = 'wazuh'
def setup_logger(level):
    """
    Setup a logger for the REST handler.
    """
    logger = logging.getLogger('splunk.appserver.%s.controllers.agents' % _APPNAME)
    logger.propagate = False  # Prevent the log messages from being duplicated in the python.log file
    logger.setLevel(level)
    file_handler = logging.handlers.RotatingFileHandler(make_splunkhome_path(['var', 'log', 'splunk', 'agents.log']), maxBytes=25000000, backupCount=5)
    formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s')
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)
    return logger
logger = setup_logger(logging.DEBUG)
class agents(controllers.BaseController):

    # /custom/wazuh/agents/filescontent?id=idgroup&filename=agent.conf
    @expose_page(must_login=False, methods=['GET'])
    def filescontent(self,**kwargs):
        group_id = kwargs['id']
        filename = kwargs['filename']
        opt_username = kwargs["user"]
        opt_password = kwargs["pass"]
        opt_base_url = kwargs["ip"]
        opt_base_port = kwargs["port"]
        url = "http://" + opt_base_url + ":" + opt_base_port
        auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
        verify = False
        request = requests.get(url + '/agents/groups/' + group_id + '/files/' + filename, auth=auth, verify=verify)
        files = json.loads(request.text)
        # files = json.dumps(files)
        return json.dumps([{'data':files}], sort_keys=True,indent=4, separators=(',', ': '))

    # /custom/wazuh/agents/files?id=idgroup
    @expose_page(must_login=False, methods=['GET'])
    def files(self,**kwargs):
        group_id = kwargs["id"]
        opt_username = kwargs["user"]
        opt_password = kwargs["pass"]
        opt_base_url = kwargs["ip"]
        opt_base_port = kwargs["port"]
        limit = kwargs["length"]
        offset = kwargs["start"]
        search_value = kwargs['search[value]'] if kwargs['search[value]'] != "" else '""'
        sorting_column = kwargs["order[0][column]"]
        direction = kwargs['order[0][dir]']
        sort_chain = ""
        if sorting_column == "0":
          if direction == 'asc':
            sort_chain = '+filename'
          if direction == 'desc':
            sort_chain = '-filename'
        elif sorting_column == "1":
          if direction == 'asc':
            sort_chain = '+hash'
          if direction == 'desc':
            sort_chain = '-hash'
        url = "http://" + opt_base_url + ":" + opt_base_port
        auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
        verify = False
        request = requests.get(url + '/agents/groups/' + group_id + '/files?limit=' + limit + '&offset='+offset + '&search='+search_value+'&sort='+sort_chain, auth=auth, verify=verify).json()
        result = json.dumps(request)
        return result

    # /custom/wazuh/agents/groups/:id
    @expose_page(must_login=False, methods=['GET'])
    def check_agents_groups(self,**kwargs):
        group_id = kwargs["id"]
        opt_username = kwargs["user"]
        opt_password = kwargs["pass"]
        opt_base_url = kwargs["ip"]
        opt_base_port = kwargs["port"]
        url = "http://" + opt_base_url + ":" + opt_base_port
        auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
        verify = False
        request = requests.get(url + '/agents/groups/' + group_id  + '?limit=1', auth=auth, verify=verify).json()
        result = json.dumps(request)
        return result

    # /custom/wazuh/agents/groups/:id
    @expose_page(must_login=False, methods=['GET'])
    def groups(self,**kwargs):
        group_id = kwargs["id"]
        opt_username = kwargs["user"]
        opt_password = kwargs["pass"]
        opt_base_url = kwargs["ip"]
        opt_base_port = kwargs["port"]
        limit =  kwargs['length'] if kwargs['length'] != "" else '""'
        offset = kwargs['offset'] if kwargs['offset'] != "" else '""'
        search_value = kwargs['search[value]'] if kwargs['search[value]'] != "" else '""'
        sorting_column = kwargs["order[0][column]"] if kwargs["order[0][column]"] != "" else '""'
        direction = kwargs['order[0][dir]'] if kwargs['order[0][dir]'] != "" else '""'
        sort_chain = ""
        if sorting_column == "0":
          if direction == 'asc':
            sort_chain = '+id'
          if direction == 'desc':
            sort_chain = '-id'
        elif sorting_column == "1":
          if direction == 'asc':
            sort_chain = '+name'
          if direction == 'desc':
            sort_chain = '-name'
        elif sorting_column == "2":
          if direction == 'asc':
            sort_chain = '+ip'
          if direction == 'desc':
            sort_chain = '-ip'
        elif sorting_column == "3":
          if direction == 'asc':
            sort_chain = '+last_keepalive'
          if direction == 'desc':
            sort_chain = '-last_keepalive'
        url = "http://" + opt_base_url + ":" + opt_base_port
        auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
        verify = False
        request = requests.get(url + '/agents/groups/' + group_id  + '?limit=' + limit + '&offset='+offset + '&search='+search_value+'&sort='+sort_chain, auth=auth, verify=verify).json()
        result = json.dumps(request)
        return result

    # /custom/wazuh/agents/summary
    @expose_page(must_login=False, methods=['GET'])
    def summary(self, **kwargs):
        opt_username = kwargs["user"]
        opt_password = kwargs["pass"]
        opt_base_url = kwargs["ip"]
        opt_base_port = kwargs["port"]
        url = "http://" + opt_base_url + ":" + opt_base_port
        auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
        verify = False
        request = requests.get(url + '/agents/summary', auth=auth, verify=verify)
        agent_summary = json.loads(request.text)['data']
        data = {}
        for key in agent_summary:
            data['agent_summary_' + key.lower().replace(' ', '')] = agent_summary[key]
        data = [data]
        result = json.dumps(data)
        return result

    @expose_page(must_login=False, methods=['GET'])
    def agents_info(self, **kwargs):
        opt_username = kwargs["user"]
        opt_password = kwargs["pass"]
        opt_base_url = kwargs["ip"]
        opt_base_port = kwargs["port"]
        url = "http://" + opt_base_url + ":" + opt_base_port
        auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
        verify = False
        request = requests.get(url + '/agents?limit=0', auth=auth, verify=verify)
        agents_qty = json.loads(request.text)["data"]["totalItems"]
        request = requests.get(url + '/agents?offset=0&limit=' + str(agents_qty), auth=auth, verify=verify)
        agents = json.loads(request.text)["data"]["items"]
        results = []
        for agent in agents:
            data = {}
            for attribute, value in agent.iteritems():
                if attribute == 'os':
                    for key,val in agent['os'].iteritems():
                        data['os-'+key] = val
                else:
                    data[attribute] = value 
            
            request = requests.get(url + '/rootcheck/' + agent["id"] + '/last_scan', auth=auth, verify=verify)
            rootcheck_lastscan = json.loads(request.text)["data"]["start"]

            request = requests.get(url + '/syscheck/' + agent["id"] + '/last_scan', auth=auth, verify=verify)
            syscheck_lastscan = json.loads(request.text)["data"]["start"]

            data["last_rootcheck"] = rootcheck_lastscan
            data["last_syscheck"] = syscheck_lastscan
            
            results.append(data)
        return json.dumps(results)
        
    # /custom/wazuh/agents/agentschecks
    @expose_page(must_login=False, methods=['GET'])
    def agents_checks(self, **kwargs):
        opt_username = kwargs["user"]
        opt_password = kwargs["pass"]
        opt_base_url = kwargs["ip"]
        opt_base_port = kwargs["port"]
        url = "http://" + opt_base_url + ":" + opt_base_port
        auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
        verify = False
        request = requests.get(url + '/agents?limit=0', auth=auth, verify=verify)
        agents_qty = json.loads(request.text)["data"]["totalItems"]
        request = requests.get(url + '/agents?offset=0&limit=' + str(agents_qty), auth=auth, verify=verify)
        agents = json.loads(request.text)["data"]["items"]
        results = []
        for agent in agents:
            data = {}
            for attribute, value in agent.iteritems():
                if attribute == 'os':
                    for key,val in agent['os'].iteritems():
                        data['os-'+key] = val
                else:
                    data[attribute] = value 
            
            request = requests.get(url + '/rootcheck/' + agent["id"] + '/last_scan', auth=auth, verify=verify)
            rootcheck_lastscan = json.loads(request.text)["data"]["start"]

            request = requests.get(url + '/syscheck/' + agent["id"] + '/last_scan', auth=auth, verify=verify)
            syscheck_lastscan = json.loads(request.text)["data"]["start"]

            data["last_rootcheck"] = rootcheck_lastscan
            data["last_syscheck"] = syscheck_lastscan

            results.append(data)
        return json.dumps(results)
    
    # /custom/wazuh/agents/agentschecks
    @expose_page(must_login=False, methods=['GET'])
    def agents(self, **kwargs):
        opt_username = kwargs["user"]
        opt_password = kwargs["pass"]
        opt_base_url = kwargs["ip"]
        opt_base_port = kwargs["port"]
        url = "http://" + opt_base_url + ":" + opt_base_port
        auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
        verify = False
        request = requests.get(url + '/agents?limit=0', auth=auth, verify=verify)
        agents_qty = json.loads(request.text)["data"]["totalItems"]
        request = requests.get(url + '/agents?offset=0&limit=' + str(agents_qty), auth=auth, verify=verify)
        agents = json.loads(request.text)["data"]["items"]
        results = []
        for agent in agents:
            data = {}
            for attribute, value in agent.iteritems():
                if attribute == 'os':
                    for key,val in agent['os'].iteritems():
                        data['os-'+key] = val
                else:
                    data[attribute] = value 
            
            request = requests.get(url + '/rootcheck/' + agent["id"] + '/last_scan', auth=auth, verify=verify)
            rootcheck_lastscan = json.loads(request.text)["data"]["start"]

            request = requests.get(url + '/syscheck/' + agent["id"] + '/last_scan', auth=auth, verify=verify)
            syscheck_lastscan = json.loads(request.text)["data"]["start"]

            data["last_rootcheck"] = rootcheck_lastscan
            data["last_syscheck"] = syscheck_lastscan
            
            results.append(data)
        return json.dumps(results)