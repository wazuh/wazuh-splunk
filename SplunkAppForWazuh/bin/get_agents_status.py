import logging
import os
import sys
import json
import requests
import re
def check_status():
  try:
    opt_username = "foo"
    opt_password = "bar"
    opt_base_url = "http://192.168.0.130"
    opt_base_port = "55000"

    url = opt_base_url + ":" + opt_base_port
    auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
    verify = False
    final_url = url + '/agents'
    request = requests.get(final_url, auth=auth, verify=verify)
    cluster = json.loads(request.text)["data"]

  except Exception as e:
    return json.dumps("{error:"+str(e)+"}")
  return json.dumps(cluster)

print check_status()