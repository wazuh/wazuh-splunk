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


from __future__ import absolute_import, print_function

import datetime
import sys

import jsonbak
import requestsbak
from API_model import API_model
from db import database
from log import log
from wazuhtoken import wazuhtoken

db = database("credentials")
logger = log()
wztoken = wazuhtoken()


def get_apis():
    """
    Obtain the list of APIs.

    Returns
    -------
    string
        a JSON string containing the saved APIs information.
    """
    try:
        logger.debug("bin.get_agents_status: Getting APIs.")
        session_key = getSplunkSessionKey()
        data_temp = db.all(session_key)
    except Exception as e:
        return jsonbak.dumps({'error': str(e)})
    return data_temp


def check_status():
    """Check status of agents."""
    try:
        logger.debug("bin.get_agents_status: Checking agents status.")
        apis = get_apis()
        # get_apis() returns a JSON string, it needs to be converted as a dictionary
        apis = jsonbak.loads(apis)
        date = str(datetime.datetime.utcnow())[:-7]
        # obtains
        for api in apis:
            api = API_model(
                address=api['url'],
                port=api['portapi'],
                user=api['userapi'],
                password=api['passapi'],
            )
            url = api.get_url()
            wazuh_token = wztoken.get_auth_token(api)

            agent_list = {}
            agents_url_total_items = url + '/agents?limit=1&q=id!=000'
            try:
                request_agents = requestsbak.get(
                    agents_url_total_items,
                    headers={'Authorization': f'Bearer {wazuh_token}'},
                    timeout=1,
                    verify=False
                ).json()
                total_items = request_agents["data"]["total_affected_items"]
                limit = 500
                offset = 0
                params = {}
                params['q'] = 'id!=000'

                while offset < total_items:
                    agents_url = url + \
                        '/agents?select=id,ip,manager,status&offset=' + \
                        str(offset)+'&limit='+str(limit)
                    request_agents = requestsbak.get(
                        agents_url,
                        headers={'Authorization': f'Bearer {wazuh_token}'},
                        timeout=1,
                        verify=False
                    ).json()

                    agent_list = request_agents["data"]["affected_items"]
                    final_url_cluster = url + '/cluster/status'
                    request_cluster_status = requestsbak.get(
                        final_url_cluster,
                        headers={'Authorization': f'Bearer {wazuh_token}'},
                        timeout=1,
                        verify=False
                    ).json()
                    cluster_status = request_cluster_status["data"]["enabled"]

                    if request_cluster_status["data"]["enabled"] == "yes":
                        final_url_cluster_name = url + '/cluster/local/info'
                        request_cluster_name = requestsbak.get(
                            final_url_cluster_name,
                            timeout=1,
                            headers={'Authorization': f'Bearer {wazuh_token}'},
                            verify=False
                        ).json()
                    offset = offset + limit
                    for item in agent_list:
                        if cluster_status == "yes":
                            item["cluster"] = {}
                            item["cluster"]["name"] = request_cluster_name['data']['affected_items'][0]['cluster']
                        if 'manager' in item:
                            manager_name = item["manager"]
                            item["manager"] = {}
                            item["manager"]["name"] = manager_name
                        item["timestamp"] = date
                        print(jsonbak.dumps(item))
            except Exception as e:
                logger.error(
                    "agents-status: Error requesting agents status: %s" % str(e))
                pass
    except Exception as e:
        logger.error(
            "agents-status: Error requesting agents status: %s" % str(e))
        pass


def getSplunkSessionKey():
    """
    Get the session key, it needs to configure in the inputs.conf that
    executes this script the following parameter: passAuth = splunk-system-user
    """
    logger.debug("bin.get_agents_status: Getting Splunk session key.")
    session_key = sys.stdin.readline().strip()
    return session_key


check_status()
