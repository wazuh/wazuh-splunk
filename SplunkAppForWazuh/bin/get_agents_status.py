
from __future__ import absolute_import
from __future__ import print_function
import logging
import os
import sys
import json
import requests
import re
from splunk.clilib import cli_common as cli

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "."))
from splunklib.client import connect

def current_credentials():
  try:
    app = cli.getConfStanza('config','credentials')
    current_username = app.get('username')
    current_pwd = app.get('password')
    my_arr = []
    credential_dict = {}
    credential_dict['username'] = current_username
    credential_dict['password'] = current_pwd
  except Exception as e:
    return json.dumps("{error:"+str(e)+"}")
  return credential_dict

def check_status():
  try:
    kwargs = {}
    kwargs["owner"] = "nobody"
    kwargs["username"] = "admin"
    kwargs["password"] = "changeme"
    kwargs["app"] = "SplunkAppForWazuh"
    service = connect(**kwargs)
    
    if (current_credentials()["username"] is None or current_credentials()["password"] is None) or (current_credentials()["username"] == "" or current_credentials()["password"] == ""):
      raise Exception('No username or password')

    user = current_credentials()["username"]
    pwd = current_credentials()["password"]
    collection = service.kvstore["credentials"]
    apis = collection.data.query()
    # obtains 
    for api in apis:
      # print (api)
      opt_password = api["passapi"]
      opt_username = api["userapi"]
      opt_base_url = api["url"]
      opt_base_port = api["portapi"]

      url = opt_base_url + ":" + opt_base_port
      auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
      verify = False
      final_url = url + '/agents'
      request = requests.get(final_url, auth=auth, verify=verify)
      # print (request)

  except Exception as e:
    print ("")

check_status()
