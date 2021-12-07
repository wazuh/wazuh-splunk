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

import json
import time

import requestsbak
from log import log
from wazuhtoken import wazuhtoken


class Wazuh_API():
    """
    Wazuh_API class.

    Handles responsees to the Wazuh API.
    """

    def __init__(self):
        """Constructor."""
        try:
            self.logger = log()
            self.wztoken = wazuhtoken()
            self.session = requestsbak.Session()
            self.session.trust_env = False
        except Exception as e:
            self.logger.error(
                "wazuh-api: error in the constructor: %s" % (e))

    def make_request(
        self,
        method: str,
        api_url: str,
        endpoint_url: str,
        kwargs,
        auth: requestsbak.auth.HTTPBasicAuth,
        current_api: dict,
        counter: int = 3
    ):
        """
        Use this method to launch response to a Wazuh API.

        Given the HTTP method, API URL and API endpoint, perform a response
        with kwargs as payload / parameters, and retry 'counter' times if
        it fails.

        :param method
        :param api_url
        :param endpoint_url
        :param kwargs
        :param auth
        :param current_api
        :param counter
        """

        def catch_exceptions(
            response: requestsbak.models.Response
        ) -> requestsbak.models.Response:
            """
            Auxiliar function. Controls some of the response's status codes.

            :param response
            """
            # Static variable. Retains state between calls
            if not hasattr(catch_exceptions, 'attempts'):
                catch_exceptions.attempts = 0
            try:
                # Unauthorized. Try to refresh the token and re-attempt response
                if response.status_code == 401:
                    if catch_exceptions.attempts == 0:
                        self.wztoken.refresh()
                        return self.make_request(
                            method=method,
                            api_url=api_url,
                            endpoint_url=endpoint_url,
                            kwargs=kwargs,
                            auth=auth,
                            current_api=current_api,
                            counter=counter - 1
                        )

                if response.status_code != 200:
                    raise Exception(response.json())

                catch_exceptions.attempts = 0
                return response.json()
            except Exception as e:
                raise e

        verify = False
        try:
            socket_errors = (1013, 1014, 1017, 1018, 1019)
            wazuh_token = self.wztoken.get_auth_token(
                api_url, auth, current_api)
            if method == 'GET':
                if 'origin' in kwargs:
                    if kwargs['origin'] == 'xmlreader':
                        response_xml = self.session.get(
                            url=api_url + endpoint_url,
                            headers={
                                'Authorization': f'Bearer {wazuh_token}'
                            },
                            verify=verify
                        ).content
                        # FIXME dumps + loads ???
                        json_response = json.dumps(
                            {
                                'data': response_xml.decode("utf-8")
                            }
                        )
                        json_load = json.loads(json_response)
                        response = json_load
                        return response
                    if kwargs['origin'] == 'raw':
                        response = self.session.get(
                            url=api_url + endpoint_url,
                            headers={
                                'Authorization': f'Bearer {wazuh_token}'
                            },
                            verify=verify
                        )
                        return json.loads(
                            json.dumps(
                                {
                                    'data': response.content.decode("utf-8")
                                }
                            )
                        )
                else:
                    response = self.session.get(
                        url=api_url + endpoint_url,
                        params=kwargs,
                        headers={
                            'Authorization': f'Bearer {wazuh_token}'
                        },
                        verify=verify
                    )
                    response = catch_exceptions(response)

            if method == 'POST':
                if 'origin' in kwargs:
                    if kwargs['origin'] == 'xmleditor':
                        headers = {
                            'Content-Type': 'application/xml',
                            'Authorization': f'Bearer {wazuh_token}'
                        }
                    elif kwargs['origin'] == 'json':
                        headers = {
                            'Content-Type':  'application/json',
                            'Authorization': f'Bearer {wazuh_token}'
                        }
                    elif kwargs['origin'] == 'raw':
                        headers = {
                            'Content-Type':  'application/octet-stream',
                            'Authorization': f'Bearer {wazuh_token}'
                        }
                    kwargs = str(kwargs['content'])
                    response = self.session.post(
                        url=api_url + endpoint_url,
                        data=kwargs,
                        verify=verify,
                        headers=headers
                    )
                    response = catch_exceptions(response)
                else:
                    response = self.session.post(
                        url=api_url + endpoint_url,
                        data=kwargs,
                        headers={
                            'Authorization': f'Bearer {wazuh_token}'
                        },
                        verify=verify
                    )
                    response = catch_exceptions(response)

            if method == 'PUT':
                if 'origin' in kwargs:
                    if kwargs['origin'] == 'xmleditor':
                        headers = {
                            'Content-Type': 'application/xml',
                            'Authorization': f'Bearer {wazuh_token}'
                        }
                    elif kwargs['origin'] == 'json':
                        headers = {
                            'Content-Type':  'application/json',
                            'Authorization': f'Bearer {wazuh_token}'
                        }
                    elif kwargs['origin'] == 'raw':
                        headers = {
                            'Content-Type':  'application/octet-stream',
                            'Authorization': f'Bearer {wazuh_token}'
                        }
                    kwargs = str(kwargs['content'])
                    response = self.session.put(
                        url=api_url + endpoint_url,
                        data=kwargs,
                        verify=verify,
                        headers=headers
                    )
                    response = catch_exceptions(response)

                elif endpoint_url == '/agents/group':
                    response = self.session.put(
                        url=api_url + endpoint_url,
                        params=kwargs,
                        headers={
                            'Authorization': f'Bearer {wazuh_token}'
                        },
                        verify=verify
                    )
                    response = catch_exceptions(response)

                else:
                    response = self.session.put(
                        url=api_url + endpoint_url,
                        data=kwargs,
                        headers={
                            'Authorization': f'Bearer {wazuh_token}'
                        },
                        verify=verify
                    )
                    response = catch_exceptions(response)

            if method == 'DELETE':
                response = self.session.delete(
                    url=api_url + endpoint_url,
                    data=kwargs,
                    headers={
                        'Authorization': f'Bearer {wazuh_token}'
                    },
                    verify=verify
                )
                response = catch_exceptions(response)

            self.logger.debug(
                f"{self.__class__.__name__}: {method} {api_url} {endpoint_url} {kwargs}"
            )

            if response['error'] and response['error'] in socket_errors:
                self.logger.debug(
                    f"{self.__class__.__name__}: retrying response ({counter})."
                )
                if counter > 0:
                    time.sleep(0.5)
                    return self.make_request(
                        method=method,
                        api_url=api_url,
                        endpoint_url=endpoint_url,
                        kwargs=kwargs,
                        auth=auth,
                        current_api=current_api,
                        counter=counter - 1
                    )
                else:
                    raise Exception(
                        "Tried to execute %s %s three times with no success."
                        % (method, endpoint_url)
                    )
            return self.clean_keys(response)
        except Exception as e:
            self.logger.error(f"{self.__class__.__name__}: {e}")
            raise e

    def clean_keys(self, response):
        """Hide sensible data from API response."""
        self.logger.debug(f"{self.__class__.__name__}::clean_keys() called.")
        try:
            hide = "********"
            if "data" in response and type(response['data']) == dict:
                # Remove agent key
                if "internal_key" in response['data']:
                    response['data']['internal_key'] = hide

                # Remove cluster key (/come/cluster)
                if "node_type" in response['data']:
                    if "key" in response['data']:
                        response['data']['key'] = hide

                # Remove cluster key (/manager/configuration)
                if "cluster" in response['data']:
                    if "node_type" in response['data']['cluster']:
                        if "key" in response['data']['cluster']:
                            response['data']['cluster']['key'] = hide

                # Remove AWS keys
                if "wmodules" in response['data']:
                    for wmod in response['data']['wmodules']:
                        if "aws-s3" in wmod:
                            if "buckets" in wmod['aws-s3']:
                                for bucket in wmod['aws-s3']['buckets']:
                                    bucket['access_key'] = hide
                                    bucket['secret_key'] = hide
                            if "services" in wmod['aws-s3']:
                                for service in wmod['aws-s3']['services']:
                                    service['access_key'] = hide
                                    service['secret_key'] = hide

                # Remove integrations keys
                if "integration" in response['data']:
                    for integ in response['data']['integration']:
                        integ['api_key'] = hide
            return response
        except Exception as e:
            self.logger.error(f"{self.__class__.__name__}::clean_keys() {e}")
            raise e