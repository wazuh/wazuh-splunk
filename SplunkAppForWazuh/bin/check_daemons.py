# -*- coding: utf-8 -*-
"""
Wazuh app - API backend module.

Copyright (C) 2015-2021 Wazuh, Inc.

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

Find more information about this on the LICENSE file.
"""

import requestsbak
from log import log
from wazuh_api import Wazuh_API


def check_daemons(current_api: dict) -> bool:
    """
    Request to check the status of this daemons:
    execd, modulesd, wazuhdb and clusterd

    Parameters
    ----------
    current_api :  dict
        Holds the API information.
    """
    logger = log()
    wz_api = Wazuh_API()

    logger.debug("Daemons::check_daemons() called")

    opt_username = str(current_api['userapi'])
    opt_password = str(current_api['passapi'])
    opt_base_url = str(current_api['url'])
    opt_base_port = str(current_api['portapi'])
    check_cluster = (
        'filterType' in current_api and str(current_api['filterType']) == "cluster.name"
        or
        'cluster' in current_api and str(current_api['cluster']) == "true"
    )

    url = opt_base_url + ":" + opt_base_port
    auth = requestsbak.auth.HTTPBasicAuth(opt_username, opt_password)

    try:
        request_cluster = wz_api.make_request(
            method='GET',
            api_url=url,
            endpoint_url='/cluster/status',
            kwargs={},
            auth=auth,
            current_api=current_api
        )

        # Try to get cluster is enabled if the request fail set to false
        try:
            cluster_enabled = request_cluster['data']['enabled'] == 'yes'
        except Exception as e:
            cluster_enabled = False
        # Var to check the cluster demon or not
        cc = check_cluster and cluster_enabled

        daemons_status = wz_api.make_request(
            method='GET',
            api_url=url,
            endpoint_url='/manager/status',
            kwargs={},
            auth=auth,
            current_api=current_api
        )

        if not daemons_status['error']:
            d = daemons_status['data']['affected_items'][0]
            daemons = {
                "execd": d['wazuh-execd'],
                "modulesd": d['wazuh-modulesd'],
                "db": d['wazuh-db']
            }
            if cc:
                daemons['clusterd'] = d['wazuh-clusterd']
            values = list(daemons.values())
            # Checks all the status are equals, and running
            wazuh_ready = len(
                set(values)) == 1 and values[0] == "running"

            # Log result
            if wazuh_ready:
                checked_debug_msg = "Wazuh daemons ready"
            else:
                checked_debug_msg = "Wazuh daemons not ready yet"
            logger.debug(
                "Daemons::check_daemons(): %s" % checked_debug_msg
            )
            return wazuh_ready
        else:
            raise Exception(daemons_status["error"])
    except Exception as e:
        logger.error(f"Daemons::check_daemons(): {e}")
        raise e
