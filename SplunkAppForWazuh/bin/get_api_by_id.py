
# -*- coding: utf-8 -*-
"""
Wazuh app - Report generation backend.

Copyright (C) 2015-2019 Wazuh, Inc.

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

Find more information about this on the LICENSE file.
"""

import json

from db import database
from log import log
from API_model import API_model


def get_api_by_id(id: int):
    """
    Use case. Get API by ID from the Splunk's KV store
    """
    logger = log()
    db = database()

    try:
        logger.debug(f"get_api_by_id() called with ID {id}")
        api_as_json = json.loads(db.get(id))['data']

        return API_model(
            api_as_json['url'],
            api_as_json['portapi'],
            api_as_json['userapi'],
            api_as_json['passapi'],
            api_as_json['managerName'],
            api_as_json['filterName'],
            api_as_json['runAs']
        )

    except KeyError:
        msg = "get_api_by_id(): no ID provided"
        logger.error(msg)
        raise KeyError(msg)
