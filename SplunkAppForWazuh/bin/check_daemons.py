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

import json

from API_model import API_model
from log import log
from wazuh_api import Wazuh_API


def check_daemons(api: API_model) -> bool:
    """
    Request to check the status of this daemons:
    execd, modulesd, wazuhdb and clusterd

    Parameters
    ----------
    api :  API_model
        Holds the API information.
    Returns
    ----------
    bool
        True if the daemons listed above are up and running, False otherwise.
    """
    logger = log()
    wz_api = Wazuh_API()

    logger.debug("check_daemons() called")

    # FIXME check intialization of filter_type and cluster on manager.py
    check_cluster = (api.filter_type == "cluster.name" or api.cluster)

    request_cluster = wz_api.make_request(
        method='GET',
        endpoint_url='/cluster/status',
        kwargs={},
        current_api=api
    )
    # Try to get if the cluster is enabled.
    # If the request has failed, then set cluster_enabled to false.
    try:
        cluster_enabled = request_cluster['data']['enabled'] == 'yes'
    except KeyError:
        cluster_enabled = False

    # Var to check the cluster demon or not
    cc = check_cluster and cluster_enabled
    daemons_status = wz_api.make_request(
        method='GET',
        endpoint_url='/manager/status',
        kwargs={},
        current_api=api
    )

    wazuh_ready = False
    if 'error' in daemons_status and daemons_status['error'] > 0:
        logger.error("check_daemons(): " + json.dumps(daemons_status))
    else:
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
        wazuh_ready = len(set(daemons.values())) == 1 and values[0] == "running"        

    # Log result
    if wazuh_ready:
        checked_debug_msg = "Wazuh daemons ready"
    else:
        checked_debug_msg = "Wazuh daemons not ready yet"
    logger.debug(
        "check_daemons(): %s" % checked_debug_msg
    )
    return wazuh_ready
