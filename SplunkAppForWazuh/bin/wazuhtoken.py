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
import utils
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
            self.__refresh = False

            self.api_url = None
            self.api_auth = None
            self.api_object = dict()
        except Exception as e:
            self.logger.error(
                "wazuh-token: error in the constructor: %s" % (e))

    def refresh(self):
        """
        Use this method to force a token refresh on the next request.
        """
        self.logger.debug("wazuh-token: token refresh requested")
        self.__refresh = True

    def get_auth_token(
        self,
        api_url: str,
        api_auth: requestsbak.auth.HTTPBasicAuth,
        api_object: dict = None
    ) -> str:
        """
        Fetches a new authorization token for the given manager API and API user.
        The token can be obtained from the session cache or he Wazuh Manager API.
        If a new token is obtained, it is stored in the session cache.

        This token will expire after auth_token_exp_timeout seconds (default: 900).
        This value can be changed using PUT /security/config

        :param api_url: Manager URL --> {protocol}://{host}:{port}
        :param api_auth: HttpBasicAuth (e.g: wazuh:wazuh, user:password...)
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

        # Init values
        self.api_url = api_url
        self.api_auth = api_auth
        self.api_object = api_object

        token_key = utils.dict_hash(self.api_object)

        try:
            # Return cached token, if it exists. Check if a refresh is required.
            token: str = self.cache.get(token_key)
            if not self.__refresh and token is not None:
                self.logger.debug(
                    f"wazuh-token: the token for {token_key} key is in cache")
            # Otherwise, get a new token from the manager's API.
            else:
                response = self._get_token_request()
                # TODO handle possible status codes
                token: str = response.json()['data']['token']

                # timeout of 900 seconds, as specified on the Wazuh API
                # TODO get configured value from /security/config endpoint
                self.cache.set(token_key, token, 900)
                self.logger.debug(f"wazuh-token: new token for key {token_key}")

            self.__refresh = False
            return token
        except Exception as e:
            self.logger.error("wazuh-token: error on get_auth_token: %s" % (e))
            raise e

    def _get_token_request(self) -> requestsbak.models.Response:
        """
        This method should be called to get an API token. Performs a request on
        the Wazuh API to get the token. If allowed, an authorization context
        login is used.

        :return: Response object for the authorization request.
        """
        self.logger.debug("wazuh-token::get_token_request() called")
        try:
            api_run_as: bool = (self.api_object["runAs"] == "true")

            if api_run_as:
                response = self._auth_context_login()
                # If it fails, use the basic auth
                if response.status_code != 200:
                    self.logger.error(
                        f"wazuh-token: allow_run_as not enabled for user {self.api_auth}\n"
                        + "API response:\n"
                        + f"Request failed with code {response.status_code}"
                        + json.dumps(response.json(), indent=4)
                    )
                    response = self._basic_auth_login()
            else:
                response = self._basic_auth_login()
            return response
        except Exception as e:
            self.logger.error("wazuh-token::get_token_request() - " + str(e))
            raise e

    def _basic_auth_login(self) -> requestsbak.models.Response:
        """
        This method should be called to get an API token.

        :return: Response object result of the login request.
        """
        self.logger.debug("wazuh-token: using basic auth")
        try:
            return self.session.get(
                f"{self.api_url}/security/user/authenticate",
                auth=self.api_auth,
                timeout=20,
                verify=False
            )
        except Exception as e:
            self.logger.error(
                "wazuh-token: error on basic_auth_login: %s" % (e))
            raise e

    def _auth_context_login(self) -> requestsbak.models.Response:
        """
        This method should be called to get an API token using an
        authorization context body.

        :return: Response object result of the login request.
        """
        # Obtain Splunk's user context.
        auth_context = {
            "user_name": splunk_auth.getCurrentUser()['name']
        }
        self.logger.debug(
            "wazuh-token: using auth context\n"
            + json.dumps(auth_context, indent=4)
        )
        try:
            return self.session.post(
                f"{self.api_url}/security/user/authenticate/run_as",
                auth=self.api_auth,
                json=auth_context,
                timeout=20,
                verify=False
            )
        except Exception as e:
            self.logger.error(
                "wazuh-token: error on auth_context_login: %s" % (e))
            raise e
