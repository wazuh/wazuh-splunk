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

import logging
import os
import sys
import json
import requests
# from splunk import AuthorizationFailed as AuthorizationFailed
from splunk.clilib import cli_common as cli
import splunk.appserver.mrsparkle.controllers as controllers
import splunk.appserver.mrsparkle.lib.util as util
from splunk.appserver.mrsparkle.lib.util import make_splunkhome_path
from splunk.appserver.mrsparkle.lib.decorators import expose_page

_APPNAME = 'SplunkAppForWazuh'

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

def remove_keys(arr):
  del arr['user']
  del arr['port']
  del arr['ip']
  del arr['pass']
  return arr

class manager(controllers.BaseController):
  def __init__(self):
    controllers.BaseController.__init__(self)
    self.session = requests.Session()
    self.session.trust_env = False

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
      request_cluster = self.session.get(url + '/cluster/status', auth=auth, timeout=8, verify=verify).json()
      result = json.dumps(request_cluster)
    except Exception as e:
      return json.dumps({"status":"400","error":str(e)})
    return result

  @expose_page(must_login=False, methods=['GET'])
  def polling_state(self, **kwargs):
    try:
      app = cli.getConfStanza('inputs','script:///opt/splunk/etc/apps/SplunkAppForWazuh/bin/get_agents_status.py')
      disabled = app.get('disabled')
      polling_dict = {}
      polling_dict['disabled'] = disabled
      data_temp = json.dumps(polling_dict)
    except Exception as e:
      return json.dumps("{error:"+str(err)+"}")
    return data_temp