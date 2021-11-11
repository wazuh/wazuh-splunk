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

import requestsbak
from cache import cache
from log import log


class wazuhtoken():
    """
    Queue class.

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
            self.logger.error(
                "token: Error in token module constructor: %s" % (e))

    def get_auth_token(self, url, auth):
        try:
            token_key = 'token-' + url + '-' + str(auth)
            if self.cache.get(token_key) is None:
                verify = False
                wazuh_token_response = self.session.get(
                    url + '/security/user/authenticate?raw=false', auth=auth, timeout=20, verify=verify)
                if wazuh_token_response.status_code == 200:
                    wazuh_token = wazuh_token_response.json()
                    token = wazuh_token['data']['token']
                elif wazuh_token_response.status_code >= 400 and wazuh_token_response.status_code <= 499:
                    wazuh_token = wazuh_token_response.json()
                    error = wazuh_token['title'] + ': ' + wazuh_token['detail']
                    raise Exception(error)
                else:
                    error = "An error ocurred when authenticating with Wazuh API"
                    raise Exception(error)
                self.cache.set(token_key, token, 600)
                self.logger.debug("api token KEY: %s" % (token_key))
                return token
            else:
                self.logger.debug("cache token: %s" % (token_key))
                return self.cache.get(token_key)
        except Exception as e:
            self.logger.error(
                "wazuh-token: Error geting auth Wazuh token: %s" % (e))
            raise e
