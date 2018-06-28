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
      return json.dumps({"error:error"})
    return result

  @expose_page(must_login=False, methods=['GET'])
  def current_version(self, **kwargs):
    try:
      app = cli.getConfStanza('package','app')
      app_version = app.get('version')
      app_revision = app.get('revision')
      wazuh = cli.getConfStanza('package','wazuh')
      wazuh_version = wazuh.get('version')
      my_arr = []
      version_dict = {}
      version_dict['appversion'] = app_version
      version_dict['apprevision'] = app_revision
      version_dict['wazuhversion'] = wazuh_version
      my_arr.append(version_dict)
      data_temp = json.dumps(my_arr)
    except Exception as e:
      return json.dumps("{error:"+str(err)+"}")
    return data_temp

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


  @expose_page(must_login=False, methods=['GET'])
  def status(self, **kwargs):
    opt_username = kwargs["user"]
    opt_password = kwargs["pass"]
    opt_base_url = kwargs["ip"]
    opt_base_port = kwargs["port"]
    url = opt_base_url + ":" + opt_base_port
    auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
    verify = False
    request = requests.get(url + '/manager/status', auth=auth, verify=verify).json()
    result = json.dumps(request)
    return result
      
  # /custom/SplunkAppForWazuh/manager/info
  @expose_page(must_login=False, methods=['GET'])
  def info(self, **kwargs):
    opt_username = kwargs["user"]
    opt_password = kwargs["pass"]
    opt_base_url = kwargs["ip"]
    opt_base_port = kwargs["port"]
    url = opt_base_url + ":" + opt_base_port
    auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
    verify = False
    request = requests.get(url + '/manager/info', auth=auth, verify=verify).json()
    result = json.dumps(request)
    return result

  # /custom/SplunkAppForWazuh/manager/configuration
  @expose_page(must_login=False, methods=['GET'])
  def configuration(self, **kwargs):
    opt_username = kwargs["user"]
    opt_password = kwargs["pass"]
    opt_base_url = kwargs["ip"]
    opt_base_port = kwargs["port"]
    url = opt_base_url + ":" + opt_base_port
    auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
    verify = False
    request = requests.get(url + '/manager/configuration', auth=auth, verify=verify)
    manager_config = json.loads(request.text)['data']
    result = json.dumps(manager_config)
    return result

  # /custom/SplunkAppForWazuh/manager/logs
  @expose_page(must_login=False, methods=['GET'])
  def logs(self, **kwargs):
    opt_username = kwargs["user"]
    opt_password = kwargs["pass"]
    opt_base_url = kwargs["ip"]
    opt_base_port = kwargs["port"]
    limit = kwargs["length"]
    offset = kwargs["start"]
    search_value = kwargs['search[value]'] if kwargs['search[value]'] != "" else '""'
    category = kwargs['columns[1][search][value]'] if kwargs['columns[1][search][value]'] != "" else 'all'
    type_log = kwargs['columns[3][search][value]'] if kwargs['columns[3][search][value]'] != "" else 'all'
    sorting_column = kwargs["order[0][column]"]
    direction = kwargs['order[0][dir]']
    sort_chain = ""
    if sorting_column == "0":
      if direction == 'asc':
        sort_chain = '+timestamp'
      if direction == 'desc':
        sort_chain = '-timestamp'
    elif sorting_column == "1":
      if direction == 'asc':
        sort_chain = '+tag'
      if direction == 'desc':
        sort_chain = '-tag'
    elif sorting_column == "2":
      if direction == 'asc':
        sort_chain = '+description'
      if direction == 'desc':
        sort_chain = '-description'
    elif sorting_column == "3":
      if direction == 'asc':
        sort_chain = '+level'
      if direction == 'desc':
        sort_chain = '-level'
    url = opt_base_url + ":" + opt_base_port
    auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
    verify = False

    request = requests.get(url + '/manager/logs' + '?limit=' + limit + '&offset='+offset + '&search='+search_value+'&sort='+sort_chain+'&category='+category+'&type_log='+type_log, auth=auth, verify=verify).json()
    result = json.dumps(request)
    return result

  # /custom/SplunkAppForWazuh/manager/logs
  @expose_page(must_login=False, methods=['GET'])
  def logs_summary(self, **kwargs):
    opt_username = kwargs["user"]
    opt_password = kwargs["pass"]
    opt_base_url = kwargs["ip"]
    opt_base_port = kwargs["port"]
    
    url = opt_base_url + ":" + opt_base_port
    auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
    verify = False

    request = requests.get(url + '/manager/logs/summary', auth=auth, verify=verify).json()
    result = json.dumps(request)
    return result

  # /custom/SplunkAppForWazuh/manager/groups
  @expose_page(must_login=False, methods=['GET'])
  def groups(self, **kwargs):
    try:
      opt_username = kwargs["user"]
      opt_password = kwargs["pass"]
      opt_base_url = kwargs["ip"]
      opt_base_port = kwargs["port"]
      url = opt_base_url + ":" + opt_base_port
      auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
      verify = False
      limit = kwargs["length"]
      offset = kwargs["start"]
      search_value = kwargs['search[value]'] if kwargs['search[value]'] != "" else '""'
      sorting_column = kwargs["order[0][column]"]
      direction = kwargs['order[0][dir]']
      sort_chain = ""
      if sorting_column == "0":
        if direction == 'asc':
          sort_chain = '+name'
        if direction == 'desc':
          sort_chain = '-name'
      elif sorting_column == "1":
        if direction == 'asc':
          sort_chain = '+merged_sum'
        if direction == 'desc':
          sort_chain = '-merged_sum'
      
      request = requests.get(url + '/agents/groups' + '?limit=' + limit + '&offset='+offset + '&search='+search_value+'&sort='+sort_chain, auth=auth, verify=verify).json()
      result = json.dumps(request)
    except Exception as e:
      return json.dumps({"error":str(e)})
    return result

  # /custom/SplunkAppForWazuh/manager/rules
  @expose_page(must_login=False, methods=['GET'])
  def rules(self, **kwargs):
    try:
      opt_username = kwargs["user"]
      opt_password = kwargs["pass"]
      opt_base_url = kwargs["ip"]
      opt_base_port = kwargs["port"]
      url = opt_base_url + ":" + opt_base_port
      auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
      verify = False
      limit =  kwargs['length'] if 'length' in kwargs else "10"
      offset = kwargs['start'] if 'start' in kwargs else "0"
      search_value = kwargs['search[value]'] if 'search[value]' in kwargs and kwargs['search[value]'] != "" else '""'
      sorting_column = kwargs["order[0][column]"] if "order[0][column]" in kwargs else '""'
      direction = kwargs['order[0][dir]'] if 'order[0][dir]' in kwargs else '""'
      sort_chain = "-id"
      if sorting_column == "0":
        if direction == 'asc':
          sort_chain = '+id'
        if direction == 'desc':
          sort_chain = '-id'
      elif sorting_column == "1":
        if direction == 'asc':
          sort_chain = '+path'
        if direction == 'desc':
          sort_chain = '-path'
      elif sorting_column == "2":
        if direction == 'asc':
          sort_chain = '+status'
        if direction == 'desc':
          sort_chain = '-status'
      elif sorting_column == "3":
        if direction == 'asc':
          sort_chain = '+file'
        if direction == 'desc':
          sort_chain = '-file'
      elif sorting_column == "5":
        if direction == 'asc':
          sort_chain = '+description'
        if direction == 'desc':
          sort_chain = '-description'
      elif sorting_column == "6":
        if direction == 'asc':
          sort_chain = '+level'
        if direction == 'desc':
          sort_chain = '-level'
      request = requests.get(url + '/rules' + '?limit=' + limit + '&offset='+offset + '&search='+search_value+'&sort='+sort_chain, auth=auth, verify=verify).json()
      result = json.dumps(request)
    except Exception as e:
      return json.dumps({"error":str(e)})
    return result

  # /custom/SplunkAppForWazuh/manager/decoders
  @expose_page(must_login=False, methods=['GET'])
  def decoders(self, **kwargs):
    try:
      opt_username = kwargs["user"]
      opt_password = kwargs["pass"]
      opt_base_url = kwargs["ip"]
      opt_base_port = kwargs["port"]
      url = opt_base_url + ":" + opt_base_port
      auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
      verify = False
      limit =  kwargs['length'] if 'length' in kwargs else "10"
      offset = kwargs['start'] if 'start' in kwargs else "0"
      search_value = kwargs['search[value]'] if 'search[value]' in kwargs and kwargs['search[value]'] != "" else '""'
      sorting_column = kwargs["order[0][column]"] if "order[0][column]" in kwargs else '""'
      direction = kwargs['order[0][dir]'] if 'order[0][dir]' in kwargs else '""'
      sort_chain = "-name"
      if sorting_column == "0":
        if direction == 'asc':
          sort_chain = '+name'
        if direction == 'desc':
          sort_chain = '-name'
      elif sorting_column == "1":
        if direction == 'asc':
          sort_chain = '+status'
        if direction == 'desc':
          sort_chain = '-status'
      elif sorting_column == "2":
        if direction == 'asc':
          sort_chain = '+path'
        if direction == 'desc':
          sort_chain = '-path'
      elif sorting_column == "3":
        if direction == 'asc':
          sort_chain = '+file'
        if direction == 'desc':
          sort_chain = '-file'
      elif sorting_column == "4":
        if direction == 'asc':
          sort_chain = '+position'
        if direction == 'desc':
          sort_chain = '-position'

      if kwargs['columns[1][search][value]'] == 'parents':
        request = requests.get(url + '/decoders/parents' + '?limit=' + limit + '&offset='+offset + '&search='+search_value+'&sort='+sort_chain, auth=auth, verify=verify).json()
      else:
        request = requests.get(url + '/decoders' + '?limit=' + limit + '&offset='+offset + '&search='+search_value+'&sort='+sort_chain, auth=auth, verify=verify).json()
      result = json.dumps(request)
    except Exception as e:
      return json.dumps({"error":str(e)})
    return result