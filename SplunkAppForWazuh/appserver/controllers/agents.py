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

    # /custom/SplunkAppForWazuh/agents/info/:id
    @expose_page(must_login=False, methods=['GET'])
    def group_configuration(self,**kwargs):
        group_id = kwargs['id']
        opt_username = kwargs["user"]
        opt_password = kwargs["pass"]
        opt_base_url = kwargs["ip"]
        opt_base_port = kwargs["port"]
        url = opt_base_url + ":" + opt_base_port
        auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
        verify = False
        request = requests.get(url + '/agents/groups/' + str(group_id) + '/configuration', auth=auth, verify=verify)
        files = json.loads(request.text)['data']
        result = json.dumps(files)
        return result

    # /custom/SplunkAppForWazuh/agents/info/:id
    @expose_page(must_login=False, methods=['GET'])
    def info(self,**kwargs):
        agent_id = kwargs['id']
        opt_username = kwargs["user"]
        opt_password = kwargs["pass"]
        opt_base_url = kwargs["ip"]
        opt_base_port = kwargs["port"]
        url = opt_base_url + ":" + opt_base_port
        auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
        verify = False
        request = requests.get(url + '/agents/' + str(agent_id), auth=auth, verify=verify)
        files = json.loads(request.text)['data']
        result = json.dumps(files)
        return result

    # /custom/SplunkAppForWazuh/agents/filescontent?id=idgroup&filename=agent.conf
    @expose_page(must_login=False, methods=['GET'])
    def filescontent(self,**kwargs):
        group_id = kwargs['id']
        filename = kwargs['filename']
        opt_username = kwargs["user"]
        opt_password = kwargs["pass"]
        opt_base_url = kwargs["ip"]
        opt_base_port = kwargs["port"]
        url = opt_base_url + ":" + opt_base_port
        auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
        verify = False
        request = requests.get(url + '/agents/groups/' + group_id + '/files/' + filename, auth=auth, verify=verify)
        files = json.loads(request.text)
        # files = json.dumps(files)
        return json.dumps([{'data':files}], sort_keys=True,indent=4, separators=(',', ': '))

    # /custom/SplunkAppForWazuh/agents/files?id=idgroup
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
        url = opt_base_url + ":" + opt_base_port
        auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
        verify = False
        request = requests.get(url + '/agents/groups/' + group_id + '/files?limit=' + limit + '&offset='+offset + '&search='+search_value+'&sort='+sort_chain, auth=auth, verify=verify).json()
        result = json.dumps(request)
        return result

    # /custom/SplunkAppForWazuh/agents/groups/:id
    @expose_page(must_login=False, methods=['GET'])
    def check_agents_groups(self,**kwargs):
        group_id = kwargs["id"]
        opt_username = kwargs["user"]
        opt_password = kwargs["pass"]
        opt_base_url = kwargs["ip"]
        opt_base_port = kwargs["port"]
        url = opt_base_url + ":" + opt_base_port
        auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
        verify = False
        request = requests.get(url + '/agents/groups/' + group_id  + '?limit=1', auth=auth, verify=verify).json()
        result = json.dumps(request)
        return result

    # /custom/SplunkAppForWazuh/agents/versions
    @expose_page(must_login=False, methods=['GET'])
    def versions(self,**kwargs):
      try:
        opt_username = kwargs["user"]
        opt_password = kwargs["pass"]
        opt_base_url = kwargs["ip"]
        opt_base_port = kwargs["port"]
        url = opt_base_url + ":" + opt_base_port
        auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
        verify = False
        request_number = requests.get(url + '/agents?limit=0', auth=auth, verify=verify)
        agents_qty = json.loads(request_number.text)["data"]["totalItems"]
        request = requests.get(url + '/agents?offset=0&select=version&limit=' + str(agents_qty), auth=auth, verify=verify).json()
        result = json.dumps(request)
      except Exception as e:
        return json.dumps({"error":str(e)})
      return result

    # # /custom/SplunkAppForWazuh/agents/platforms
    @expose_page(must_login=False, methods=['GET'])
    def platforms(self,**kwargs):
      try:
        opt_username = kwargs["user"]
        opt_password = kwargs["pass"]
        opt_base_url = kwargs["ip"]
        opt_base_port = kwargs["port"]
        url = opt_base_url + ":" + opt_base_port
        auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
        verify = False
        request_number = requests.get(url + '/agents?limit=0', auth=auth, verify=verify)
        agents_qty = json.loads(request_number.text)["data"]["totalItems"]
        request = requests.get(url + '/agents?offset=0&select=os.platform&limit=' + str(agents_qty), auth=auth, verify=verify).json()
        result = json.dumps(request)
      except Exception as e:
        return json.dumps({"error":str(e)})
      return result

    # /custom/SplunkAppForWazuh/agents/groups/:id
    @expose_page(must_login=False, methods=['GET'])
    def groups(self,**kwargs):
        group_id = kwargs["id"]
        opt_username = kwargs["user"]
        opt_password = kwargs["pass"]
        opt_base_url = kwargs["ip"]
        opt_base_port = kwargs["port"]
        limit =  kwargs['length'] if kwargs['length'] != "" else 10
        offset = kwargs['start'] if kwargs['start'] != "" else 0
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
            sort_chain = '+lastKeepAlive'
          if direction == 'desc':
            sort_chain = '-lastKeepAlive'
        url = opt_base_url + ":" + opt_base_port
        auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
        verify = False
        request = requests.get(url + '/agents/groups/' + group_id + '?limit=' + limit + '&offset='+offset + '&search='+search_value , auth=auth, verify=verify).json()
        result = json.dumps(request)
        return result

    # /custom/SplunkAppForWazuh/agents/summary
    @expose_page(must_login=False, methods=['GET'])
    def summary(self, **kwargs):
        opt_username = kwargs["user"]
        opt_password = kwargs["pass"]
        opt_base_url = kwargs["ip"]
        opt_base_port = kwargs["port"]
        url = opt_base_url + ":" + opt_base_port
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

    # /custom/SplunkAppForWazuh/agents/agentschecks
    @expose_page(must_login=False, methods=['GET'])
    def agents_checks(self, **kwargs):
        opt_username = kwargs["user"]
        opt_password = kwargs["pass"]
        opt_base_url = kwargs["ip"]
        opt_base_port = kwargs["port"]
        limit =  kwargs['length'] if kwargs['length'] != "" else 10
        offset = kwargs['start'] if kwargs['start'] != "" else 0
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
            sort_chain = '+lastKeepAlive'
          if direction == 'desc':
            sort_chain = '-lastKeepAlive'
        url = opt_base_url + ":" + opt_base_port
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
    
    # /custom/SplunkAppForWazuh/agents/agents
    @expose_page(must_login=False, methods=['GET'])
    def agents(self, **kwargs):
      try:
        opt_username = kwargs["user"]
        opt_password = kwargs["pass"]
        opt_base_url = kwargs["ip"]
        opt_base_port = kwargs["port"]

        limit =  kwargs['length'] if 'length' in kwargs else "1"
        # limit =  "50"
        offset = kwargs['start'] if 'start' in kwargs else "0"
        # offset = "0"
        search_value = kwargs['search[value]'] if 'search[value]' in kwargs and kwargs['search[value]'] != "" else '""'
        # search_value = '""'
        sorting_column = kwargs["order[0][column]"] if "order[0][column]" in kwargs else '""'
        # sorting_column = '0'
        direction = kwargs['order[0][dir]'] if 'order[0][dir]' in kwargs else '""'
        # direction = 'asc'
        sort_chain = "-dateAdd"

        if sorting_column == "0":
          if direction == 'asc':
            sort_chain = '+id'
          if direction == 'desc':
            sort_chain = '-id'
        elif sorting_column == "1":
          if direction == 'asc':
            sort_chain = '+ip'
          if direction == 'desc':
            sort_chain = '-ip'
        elif sorting_column == "2":
          if direction == 'asc':
            sort_chain = '+name'
          if direction == 'desc':
            sort_chain = '-name'
        elif sorting_column == "3":
          if direction == 'asc':
            sort_chain = '+status'
          if direction == 'desc':
            sort_chain = '-status'
        elif sorting_column == "4":
          if direction == 'asc':
            sort_chain = '+os.platform'
          if direction == 'desc':
            sort_chain = '-os.platform'
        elif sorting_column == "5":
          if direction == 'asc':
            sort_chain = '+os.uname'
          if direction == 'desc':
            sort_chain = '-os.uname'
        elif sorting_column == "6":
          if direction == 'asc':
            sort_chain = '+os.name'
          if direction == 'desc':
            sort_chain = '-os.name'
        elif sorting_column == "7":
          if direction == 'asc':
            sort_chain = '+os.arch'
          if direction == 'desc':
            sort_chain = '-os.arch'
        elif sorting_column == "8":
          if direction == 'asc':
            sort_chain = '+os.version'
          if direction == 'desc':
            sort_chain = '-os.version'
        elif sorting_column == "9":
          if direction == 'asc':
            sort_chain = '+dateAdd'
          if direction == 'desc':
            sort_chain = '-dateAdd'
        elif sorting_column == "13":
          if direction == 'asc':
            sort_chain = '+version'
          if direction == 'desc':
            sort_chain = '-version'

        url = opt_base_url + ":" + opt_base_port
        auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
        verify = False
        if 'filters[status]' in kwargs and kwargs['filters[status]'] != "":
          final_url = url + '/agents?limit=' + limit + '&offset='+offset + '&search='+search_value+'&sort='+sort_chain+ '&status=' + kwargs['filters[status]']
        elif 'filters[platform]' in kwargs and kwargs['filters[platform]'] != "":
          final_url = url + '/agents?limit=' + limit + '&offset='+offset + '&search='+search_value+'&sort='+sort_chain+ '&os.platform=' + kwargs['filters[platform]']
        else:
          final_url = url + '/agents?limit=' + limit + '&offset='+offset + '&search='+search_value+'&sort='+sort_chain

        request = requests.get(final_url, auth=auth, verify=verify)
        agents = json.loads(request.text)["data"]["items"]
        total_items = json.loads(request.text)["data"]["totalItems"]

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


        response = {}
        response['data'] = {}
        response['data']['totalItems'] = total_items
        response['data']['items'] = results
      except Exception as e:
        return json.dumps({"error":str(e)})
      return json.dumps(response)

    # /custom/SplunkAppForWazuh/agents/agents_name
    @expose_page(must_login=False, methods=['GET'])
    def agents_name(self, **kwargs):
        opt_username = kwargs["user"]
        opt_password = kwargs["pass"]
        opt_base_url = kwargs["ip"]
        opt_base_port = kwargs["port"]
        url = opt_base_url + ":" + opt_base_port
        auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
        verify = False
        init_url = url + '/agents?limit=1' 
        request = requests.get(init_url, auth=auth, verify=verify)
        total_agents = json.loads(request.text)["data"]["totalItems"]
        final_url = url + '/agents?limit=' + str(total_agents) + '&offset=0' 
        request = requests.get(final_url, auth=auth, verify=verify)
        agents = json.loads(request.text)["data"]["items"]
        total_items = json.loads(request.text)["data"]["totalItems"]
        results = []
        for agent in agents:
          data = {}
          for attribute, value in agent.iteritems():
            if attribute == 'name' or attribute == 'id':
              data[attribute] = value 
          results.append(data)
        response = {}
        response['data'] = {}
        response['data']['items'] = results
        return json.dumps(response)

    # /custom/SplunkAppForWazuh/agents/agent/:id
    @expose_page(must_login=False, methods=['GET'])
    def agent(self, **kwargs):
      try:
        opt_username = kwargs["user"]
        opt_password = kwargs["pass"]
        opt_base_url = kwargs["ip"]
        opt_base_port = kwargs["port"]
        opt_agent_id = kwargs["id"]

        url = opt_base_url + ":" + opt_base_port
        auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
        verify = False
        final_url = url + '/agents/' + opt_agent_id
        request = requests.get(final_url, auth=auth, verify=verify)
        agent = json.loads(request.text)["data"]
        results = []
        data = {}
        for attribute, value in agent.iteritems():
          if attribute == 'name' or attribute == 'id':
            data[attribute] = value 
        results.append(data)

        response = {}
        response['data'] = {}
        response['data'] = results
      except Exception as e:
        return json.dumps("{error:"+str(e)+"}")
      return json.dumps(response)