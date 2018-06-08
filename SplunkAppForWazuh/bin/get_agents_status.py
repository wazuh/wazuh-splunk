
from __future__ import absolute_import
from __future__ import print_function
import logging
import os
import sys
import json
import requests
import re
import datetime
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
    print("Error at load configuration file")
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
    date = str(datetime.datetime.utcnow())[:-7]

    # obtains 
    for api in apis:
      # print (api)
      opt_password = api["passapi"]
      opt_username = api["userapi"]
      opt_base_url = api["url"]
      opt_base_port = api["portapi"]
      final_obj = {}
      url = opt_base_url + ":" + opt_base_port
      auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
      verify = False
      agents_url_total_items = url + '/agents?limit=1'
      try:
        # print ("making request ..." + api["url"])

        request_agents = requests.get(agents_url_total_items, auth=auth, timeout = 1, verify=verify).json()
        total_items = request_agents["data"]["totalItems"]
        agents_url = url + '/agents?select=id,ip,manager_host,status&offset=0&limit='+str(total_items)
        request_agents = requests.get(agents_url, auth=auth, timeout = 1, verify=verify).json()

        final_obj = request_agents["data"]["items"]
        final_url_cluster = url + '/cluster/status'
        request_cluster_status = requests.get(final_url_cluster, auth=auth, timeout = 1,verify=verify).json()
        cluster_status = request_cluster_status["data"]["enabled"]
        # print ("cluster status " + cluster_status)
        final_url_cluster_name = url + '/cluster/node'
        request_cluster_name = requests.get(final_url_cluster_name,timeout = 1, auth=auth, verify=verify).json()
        for item in final_obj:
          if cluster_status == "yes":
            item["cluster"] = {}
            item["cluster"]["name"] = request_cluster_name["data"]["cluster"]
          item["timestamp"] = date

          # print("fecha " + str(date))
          # print (datetime.datetime.utcnow())
          print (json.dumps(item))
      except Exception as e:
        pass
  except Exception as e:
    # print ("exception" + str(e))
    pass

check_status()
