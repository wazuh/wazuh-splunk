# -*- coding: utf-8 -*-
"""
Wazuh app - API information endpoints

Copyright (C) 2015-2021 Wazuh, Inc.

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

Find more information about this on the LICENSE file.
"""

import os

json_endpoints_content = ""

try:
    endpoints_dir = os.path.join(os.path.dirname(__file__), "endpoints.json")
    with open(endpoints_dir, 'r') as reader:
        json_endpoints_content = reader.read()
except Exception as e:
    pass

def get_api_endpoints():
    """Get API endpoints information"""
    return json_endpoints_content
    