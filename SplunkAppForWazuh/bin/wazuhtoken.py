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

import splunk.auth as splunk_auth

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

    def get_auth_token(self, api_url: str, api_user: str, api_object: dict = None) -> str:
        """
        Fetches a new authorization token for the given manager API and API user.
        The token can be obtained from the session cache or he Wazuh Manager API.
        If a new token is obtained, it is stored in the session cache.

        This token will expire after auth_token_exp_timeout seconds (default: 900).
        This value can be changed using PUT /security/config

        :param api_url: Manager URL --> {protocol}://{host}:{port}
        :param api_user: API username (e.g: wazuh, wazuh-wui...)
        :param api_object: API registry (as stored in the DB)
        :return: String with the authorization token from the Wazuh API
        """
        self.logger.debug("wazuh-token::get_auth_token() called")
        if api_object is None:
            error = "Missing API object"
            self.logger.error(f"wazuh-token: {error}")
            raise Exception(error)
        else:
            self.logger.debug(
                "wazuh-token: API object provided\n" +
                json.dumps(api_object, sort_keys=True, indent=4)
            )

        api_run_as: bool = (api_object["runAs"] == "true")
        token_key: str = f'token-{api_url}-{api_user}'
        try:
            # Return cached token, if it exists
            auth_token: str = self.cache.get(token_key)
            if auth_token is not None:
                self.logger.debug(
                    f"wazuh-token: the token for {token_key} key is in cache")
                return auth_token
            # Otherwise, get a new token from the manager's API.
            else:
                response = self.get_token_request(
                    api_url, api_user, api_run_as)

                # Request was successful
                if response.status_code == 200:
                    token: str = response.json()['data']['token']
                    # timeout of 900 seconds, as specified on the Wazuh API
                    self.cache.set(token_key, token, 900)
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
                "wazuh-token: error on get_auth_token: %s" % (e))
            raise e

    def get_token_request(self, api_url: str, api_user: str, api_run_as: bool) -> requestsbak.models.Response:
        """
        This method should be called to get an API token. Performs a request on
        the Wazuh API to get the token. If allowed, an authorization context
        login is used.

        :param api_url: Manager URL --> {protocol}://{host}:{port}
        :param api_user: API username (e.g: wazuh, wazuh-wui...)
        :return: Response object for the authorization request.
        """
        self.logger.debug("wazuh-token::get_token_request() called")
        try:
            # Obtain Splunk's user context.
            user: dict = {"username": splunk_auth.getCurrentUser()['name']}
            self.logger.debug(
                "wazuh-token: Splunk's User is\n" +
                json.dumps(user, indent=4)
            )
            self.logger.debug("wazuh-token: API.run_as is " + str(api_run_as))

            # Try to log in using the auth context first
            if api_run_as:
                response = self.auth_context_login(api_url, api_user, user)
                # If it fails, use the basic auth
                if response.status_code != 200:
                    self.logger.debug(
                        "wazuh-token: API response\n" +
                        json.dumps(response.json(), sort_keys=True, indent=4)
                    )
                    self.logger.info(
                        f'wazuh-token: allow_run_as not enabled for user {api_user}')
                    response = self.basic_auth_login(api_url, api_user)
            else:
                response = self.basic_auth_login(api_url, api_user)
            return response
        except Exception as e:
            self.logger.error("wazuh-token::get_token_request() - " + str(e))
            raise (e)

    def basic_auth_login(self, api_url: str, api_user: str) -> requestsbak.models.Response:
        """
        This method should be called to get an API token.

        :param api_url: Manager URL --> {protocol}://{host}:{port}
        :param api_user: API username (e.g: wazuh, wazuh-wui...)
        :return: Response object result of the login request.
        """
        self.logger.debug("wazuh-token: using basic auth")
        try:
            return self.session.get(
                f"{api_url}/security/user/authenticate",
                auth=api_user,
                timeout=20,
                verify=False
            )
        except Exception as e:
            self.logger.error(
                "wazuh-token: error on basic_auth_login: %s" % (e))
            raise e

    def auth_context_login(self, api_url: str, api_user: str, auth_context: dict = {}) -> requestsbak.models.Response:
        """
        This method should be called to get an API token using an
        authorization context body.

        :param api_url: Manager URL --> {protocol}://{host}:{port}
        :param api_user: API username (e.g: wazuh, wazuh-wui...)
        :param auth_context: Authorization context data.
        :return: Response object result of the login request.
        """
        self.logger.debug("wazuh-token: using auth context")
        try:
            return self.session.get(
                f"{api_url}/security/user/authenticate/run_as",
                auth=api_user,
                data=auth_context,
                timeout=20,
                verify=False
            )
        except Exception as e:
            self.logger.error(
                "wazuh-token: error on auth_context_login: %s" % (e))
            raise e
