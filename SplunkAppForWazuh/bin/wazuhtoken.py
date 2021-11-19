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
from cache import cache
from log import log


class wazuhtoken():
    """
    WazuhToken class.

    Handle the user's authorization token on the Wazuh API.
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
                "wazuh-token: error in the constructor: %s" % (e))

    def get_auth_token(self, api_url, api_user, api_object: dict = None):
        """
        Fetches a new authorization token for the given manager API and API user.
        The token can be obtained from the session cache or he Wazuh Manager API.
        If a new token is obtained, it is stored in the session cache.

        :param api_url: Manager URL --> {protocol}://{host}:{port}
        :param api_user: API username (e.g: wazuh, wazuh-wui...)
        :return: String with the authorization token from the Wazuh API
        """
        token_key = f'token-{api_url}-{api_user}'
        
        self.logger.debug("wazuhtoken::get_auth_token()")
        if api_object is None:
            self.logger.debug("Missing API object")
        else:
            self.logger.debug(f"wazuhtoken: {api_object}")

        try:
            # Return cached token, if it exists
            auth_token = self.cache.get(token_key)
            if auth_token is not None:
                self.logger.debug(
                    f"wazuh-token: the token for {token_key} key is in cache")
                return auth_token
            # Otherwise, get a new token from the manager's API.
            else:
                # Performs a GET request
                response = self.session.get(
                    f"{api_url}/security/user/authenticate",
                    auth=api_user,
                    timeout=20,
                    verify=False
                )
                # Request was successful
                if response.status_code == 200:
                    token = response.json()['data']['token']
                    self.cache.set(token_key, token, 600)
                    self.logger.debug(
                        f"wazuh-token: new token for key {token_key}")
                    return token
                # Request returned an error code
                elif response.status_code != 200:
                    error_title = response.json()['title']
                    error_detail = response.json()['detail']
                    error_code = response.json()['error']
                    self.logger.error(
                        f"wazuh-token: new token request failed with code {error_code}")
                    raise Exception(
                        f"wazuh-token: {error_title} - {error_detail}")
                # No response
                else:
                    error = "wazuh-token: no response received from the Wazuh API"
                    self.logger.error(error)
                    raise Exception(error)
        except Exception as e:
            self.logger.error(
                "wazuh-token: Error geting auth Wazuh token: %s" % (e))
            raise e
