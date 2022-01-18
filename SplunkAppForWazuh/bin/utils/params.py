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


def get_parameter(kwargs, field: str) -> str:
    '''Get the desired field from the request's data (kwargs).'''
    if not field in kwargs:
        raise KeyError(f"Bad Request: no '{field}' field provided.")
    else:
        return kwargs[field]
