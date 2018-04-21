import logging
import os
import sys
import json
import requests
import ssl
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
ssl._create_default_https_context = ssl._create_unverified_context

logger = setup_logger(logging.DEBUG)

# class cache:
#   def __init__(self):
#     self.cached_search_column = ""
#     self.cached_direction = ""
  
  
#   def set_cache(column,dir):
#     self.cached_search_column = ""
#     self.cached_direction = ""


#   def get_cache():
#     cached = {}
#     cached['column'] = self.cached_search_column
#     cached['dir'] = self.cached_direction
#     return cached


class manager(controllers.BaseController):
  def __init__(self):
    controllers.BaseController.__init__(self)
    # /custom/wazuh/manager/status
    # self.cached_search_column = ""
    # self.cached_direction = ""

    
  @expose_page(must_login=False, methods=['GET'])
  def status(self, **kwargs):
    opt_username = kwargs["user"]
    opt_password = kwargs["pass"]
    opt_base_url = kwargs["ip"]
    opt_base_port = kwargs["port"]
    url = opt_base_url + ":" + opt_base_port
    auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
    verify = False
    request = requests.get(url + '/manager/status', auth=auth, verify=verify)
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
    opt_username = kwargs["user"]
    opt_password = kwargs["pass"]
    opt_base_url = kwargs["ip"]
    opt_base_port = kwargs["port"]
    url = "http://" + opt_base_url + ":" + opt_base_port
    auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
    verify = False
    request = requests.get(url + '/manager/info', auth=auth, verify=verify)
    manager_info = json.loads(request.text)['data']
    data = {}
    for key in manager_info:
        data['manager-info_' + key.lower()] = manager_info[key]
    data = [data]
    result = json.dumps(data)
    return result

  # /custom/wazuh/manager/configuration
  @expose_page(must_login=False, methods=['GET'])
  def configuration(self, **kwargs):
    opt_username = kwargs["user"]
    opt_password = kwargs["pass"]
    opt_base_url = kwargs["ip"]
    opt_base_port = kwargs["port"]
    url = "http://" + opt_base_url + ":" + opt_base_port
    auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
    verify = False
    request = requests.get(url + '/manager/configuration', auth=auth, verify=verify)
    manager_config = json.loads(request.text)['data']
    result = json.dumps(manager_config)
    return result

  # /custom/wazuh/manager/logs
  @expose_page(must_login=False, methods=['GET'])
  def logs(self, **kwargs):
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
    url = "http://" + opt_base_url + ":" + opt_base_port
    auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
    verify = False

    request = requests.get(url + '/manager/logs' + '?limit=' + limit + '&offset='+offset + '&search='+search_value+'&sort='+sort_chain, auth=auth, verify=verify).json()
    result = json.dumps(request)
    return result

  # /custom/wazuh/manager/groups
  @expose_page(must_login=False, methods=['GET'])
  def groups(self, **kwargs):
    opt_username = kwargs["user"]
    opt_password = kwargs["pass"]
    opt_base_url = kwargs["ip"]
    opt_base_port = kwargs["port"]
    url = "http://" + opt_base_url + ":" + opt_base_port
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
    return result

  # /custom/wazuh/manager/rules
  @expose_page(must_login=False, methods=['GET'])
  def rules(self, **kwargs):
    opt_username = kwargs["user"]
    opt_password = kwargs["pass"]
    opt_base_url = kwargs["ip"]
    opt_base_port = kwargs["port"]
    url = "http://" + opt_base_url + ":" + opt_base_port
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
    return result

  # /custom/wazuh/manager/decoders
  @expose_page(must_login=False, methods=['GET'])
  def decoders(self, **kwargs):
    opt_username = kwargs["user"]
    opt_password = kwargs["pass"]
    opt_base_url = kwargs["ip"]
    opt_base_port = kwargs["port"]
    url = "http://" + opt_base_url + ":" + opt_base_port
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
    
    request = requests.get(url + '/decoders' + '?limit=' + limit + '&offset='+offset + '&search='+search_value+'&sort='+sort_chain, auth=auth, verify=verify).json()
    result = json.dumps(request)
    return result