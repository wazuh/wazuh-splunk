# -*- coding: utf-8 -*-
"""
Wazuh app - Agents status polling script.

Copyright (C) 2015-2019 Wazuh, Inc.

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

Find more information about this on the LICENSE file.
"""


from __future__ import absolute_import
from __future__ import print_function
import json
import requests
import datetime
from db import database
from log import log

db = database()
logger = log()


def get_apis():
    """Obtain the list of APIs."""
    try:
        data_temp = db.all()
    except Exception as e:
        return json.dumps({'error': str(e)})
    return data_temp


def check_status():
    """Check status of agents."""
    try:
        apis = get_apis()
        date = str(datetime.datetime.utcnow())[:-7]
        # obtains
        for api in apis:
            opt_password = api["passapi"]
            opt_username = api["userapi"]
            opt_base_url = api["url"]
            opt_base_port = api["portapi"]
            agent_list = {}
            url = opt_base_url + ":" + opt_base_port
            auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
            verify = False
            agents_url_total_items = url + '/agents?limit=1'
            try:
                request_agents = requests.get(
                    agents_url_total_items,
                    auth=auth, timeout=1,
                    verify=verify).json()
                total_items = request_agents["data"]["totalItems"]
                limit = 500
                offset = 0
                
                while offset < total_items:
                    agents_url = url + \
                        '/agents?select=id,ip,manager,status&offset='+str(offset)+'&limit='+str(limit)
                    request_agents = requests.get(
                        agents_url, auth=auth, timeout=1, verify=verify).json()

                    agent_list = request_agents["data"]["items"]
                    final_url_cluster = url + '/cluster/status'
                    request_cluster_status = requests.get(
                        final_url_cluster,
                        auth=auth,
                        timeout=1,
                        verify=verify).json()
                    cluster_status = request_cluster_status["data"]["enabled"]
                    final_url_cluster_name = url + '/cluster/node'
                    request_cluster_name = requests.get(
                        final_url_cluster_name,
                        timeout=1,
                        auth=auth,
                        verify=verify).json()
                    offset = offset + limit
                    for item in agent_list:
                        if cluster_status == "yes":
                            item["cluster"] = {}
                            item["cluster"]["name"] = request_cluster_name["data"]["cluster"]
                        if 'manager' in item:
                            manager_name = item["manager"]
                            item["manager"] = {}
                            item["manager"]["name"] = manager_name
                        item["timestamp"] = date
                        print(json.dumps(item))
            except Exception as e:
                logger.error("Error requesting agents status: %s" % str(e))
                pass
    except Exception as e:
        logger.error("Error requesting agents status: %s" % str(e))
        pass


check_status()
