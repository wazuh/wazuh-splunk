
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
from db import database

db = database()

def get_apis():
    try:
        data_temp = db.all()
    except Exception as e:
        return json.dumps({'error': str(e)})
    return data_temp


def check_status():
    try:
        apis = get_apis()
        date = str(datetime.datetime.utcnow())[:-7]
        # obtains
        for api in apis:
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
                request_agents = requests.get(
                    agents_url_total_items, auth=auth, timeout=1, verify=verify).json()
                total_items = request_agents["data"]["totalItems"]
                agents_url = url + \
                    '/agents?select=id,ip,manager_host,status&offset=0&limit=' + \
                    str(total_items)
                request_agents = requests.get(
                    agents_url, auth=auth, timeout=1, verify=verify).json()

                final_obj = request_agents["data"]["items"]
                final_url_cluster = url + '/cluster/status'
                request_cluster_status = requests.get(
                    final_url_cluster, auth=auth, timeout=1, verify=verify).json()
                cluster_status = request_cluster_status["data"]["enabled"]
                # print ("cluster status " + cluster_status)
                final_url_cluster_name = url + '/cluster/node'
                request_cluster_name = requests.get(
                    final_url_cluster_name, timeout=1, auth=auth, verify=verify).json()
                for item in final_obj:
                    if cluster_status == "yes":
                        item["cluster"] = {}
                        item["cluster"]["name"] = request_cluster_name["data"]["cluster"]
                    item["timestamp"] = date

                    # print("fecha " + str(date))
                    # print (datetime.datetime.utcnow())
                    print(json.dumps(item))
            except Exception as e:
                pass
    except Exception as e:
        # print ("exception" + str(e))
        pass


check_status()
