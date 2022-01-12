
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

        # Ensure backwards compatibility (add the new fields to the registries)
        if not 'runAs' in api_as_json or not 'alias' in api_as_json:
            if not 'runAs' in api_as_json:
                api_as_json['runAs'] = False
            if not 'alias' in api_as_json:
                api_as_json['alias'] = f"manager-{id}"
            db.update(api_as_json)

        return API_model(
            address=api_as_json['url'],
            port=api_as_json['portapi'],
            user=api_as_json['userapi'],
            password=api_as_json['passapi'],
            name=api_as_json['managerName'],
            alias=None, # FIXME when the ALIAS stuff is merged
            filter_name=api_as_json['filterName'],
            filter_type=api_as_json['filterType'],
            run_as=api_as_json['runAs'],
            _user=api_as_json['_user'],
            _key=api_as_json['_key']
        )

    except KeyError as e:
        msg = f"get_api_by_id(): missing {str(e)} field"
        logger.error(msg)
        raise KeyError(msg)
