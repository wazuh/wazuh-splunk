
from __future__ import absolute_import
from __future__ import print_function
import logging
import os
import sys
import json
import requests
import re

# try:
#     from utils import parse
# except ImportError:
#     raise Exception("Add the SDK repository to your PYTHONPATH to run the examples "
#                     "(e.g., export PYTHONPATH=~/splunk-sdk-python.")


sys.path.insert(0, os.path.join(os.path.dirname(__file__), "."))
from splunklib.client import connect

# sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../framework/contrib/requests/"))


def check_status():
  try:
    # opts = parse(sys.argv[1:], {}, ".splunkrc")
    kwargs = {}
    kwargs["owner"] = "nobody"
    kwargs["username"] = "admin"
    kwargs["password"] = "changeme"
    kwargs["app"] = "SplunkAppForWazuh"
    service = connect(**kwargs)
    for collection in service.kvstore:
        print("  %s" % collection.name)
      
    collection_name = "credentials"
    collection = service.kvstore[collection_name]
    if collection_name in service.kvstore:
      print ("Collection {} found!".format(collection_name) )
    
    print ("Collection data: %s" % json.dumps(collection.data.query(), indent=1))
    # opt_username = "wazuh"
    # opt_password = "wazuh2018"
    # opt_base_url = "https://192.168.1.78"
    # opt_base_port = "55000"

    # url = opt_base_url + ":" + opt_base_port
    # auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
    # verify = False
    # final_url = url + '/agents'
    # request = requests.get(final_url, auth=auth, verify=verify)
    # cluster = json.loads(request.text)["data"]
  except Exception as e:
    print ("Caught exception: " + str(e))
    return json.dumps("{error:"+str(e)+"}")
  # return json.dumps(cluster)
check_status()
