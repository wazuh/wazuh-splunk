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
from db import database

_APPNAME = 'SplunkAppForWazuh'
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

def remove_keys(arr):
  del arr['user']
  del arr['port']
  del arr['ip']
  del arr['pass']
  return arr
  
class agents(controllers.BaseController):
    def __init__(self):
        controllers.BaseController.__init__(self)
        self.db = database()
        self.session = requests.Session()
        self.session.trust_env = False

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
        request = requests.get(url + '/agents?limit=1', auth=auth, verify=verify)
        agents_qty = json.loads(request.text)["data"]["totalItems"]
        request = requests.get(url + '/agents?select=version,os.name,os.platform,os.version&offset=0&limit=' + str(agents_qty), auth=auth, verify=verify).json()
      except Exception as e:
        logger.error("Error in agents_uniq endpoint: %s" % (e))
        return json.dumps({"error":str(e)})
      return json.dumps(request)
 
     # /custom/SplunkAppForWazuh/agents/agent/:id
    @expose_page(must_login=False, methods=['GET'])
    def agent(self, **kwargs):
      try:
        if 'id' not in kwargs:
          return json.dumps({'error': 'Missing ID.'})
        id = kwargs['id']
        api = self.db.get(id)

        opt_base_url = api['url']
        opt_base_port = api['portapi']
        opt_username = api['userapi']
        opt_password = api['passapi']

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