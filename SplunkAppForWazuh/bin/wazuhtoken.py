# -*- coding: utf-8 -*-
"""
Wazuh app - API backend module.

Copyright (C) 2015-2019 Wazuh, Inc.

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

Find more information about this on the LICENSE file.
"""

import jsonbak
import requestsbak
from cache import cache
import splunk.appserver.mrsparkle.controllers as controllers
from splunk.appserver.mrsparkle.lib.decorators import expose_page
from log import log

class wazuhtoken():

    """Queue class.

    Handle Jobs queue methods
    """

    def __init__(self):
        """Constructor."""
        try:
            self.logger = log()
            self.session = requestsbak.Session()
            self.session.trust_env = False
            self.cache = cache()
        except Exception as e:
            self.logger.error("token: Error in token module constructor: %s" % (e))
        
    def get_auth_token(self, url, auth):
        try:
            verify = False
            wazuh_token = self.session.get(
            url + '/security/user/authenticate?raw=false', auth=auth, timeout=20, verify=verify).json()
            token = wazuh_token['data']['token']
            self.logger.info("get_auth_token: %s" % (token))
            return token
        except Exception as e:
            self.logger.error("Error when get auth Wazuh token: %s" % (e))
        raise e