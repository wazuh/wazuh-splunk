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
import time

import requestsbak as requests
from API_model import API_model
from log import log
from wazuhtoken import wazuhtoken


class Wazuh_API():
    """
    Wazuh_API class.

    Handle the requests sent to the Wazuh API.
    """

    def __init__(self):
        """Constructor."""
        try:
            self.logger = log()
            self.wztoken = wazuhtoken()
            self.session = requests.Session()
            self.session.trust_env = False
            self.config = self.logger.get_config_on_memory()
            self.timeout = int(self.config['timeout'])
        except Exception as e:
            self.logger.error(
                "wazuh-api: error in the constructor: %s" % (e))

    def make_request(
        self,
        method: str,
        endpoint_url: str,
        kwargs,
        current_api: API_model,
        counter: int = 3
    ):
        """
        Use this method to launch response to a Wazuh API.

        Given the HTTP method, API URL and API endpoint, perform a response
        with kwargs as payload / parameters, and retry 'counter' times if
        it fails.

        :param method
        :param endpoint_url
        :param kwargs
        :param current_api
        :param counter
        """

        def catch_exceptions(
            response: requests.models.Response
        ) -> dict:
            """
            Auxiliar function. Controls some of the response's status codes.

            - 200 Ok
                Return the request's JSON body.

            - 401 Unauthorized - No token provided
                In this case, a token refresh is enforced and the request is
                sent again.

            Parameters
            ----------
            response : requests.models.Response
                A response object.

            Returns
            ----------
            The response JSON body.
            """
            # Static variable. Retains state between calls
            if not hasattr(catch_exceptions, 'attempts'):
                catch_exceptions.attempts = 0

            try:
                status_code = response.status_code
                # Unauthorized. Try to refresh the token and re-attempt request.
                if status_code == 401:
                    if catch_exceptions.attempts == 0:
                        catch_exceptions.attempts += 1
                        self.wztoken.refresh()
                        response = self.make_request(
                            method=method,
                            endpoint_url=endpoint_url,
                            kwargs=kwargs,
                            current_api=current_api,
                            counter=counter - 1
                        )
                elif status_code != 200:
                    result = response.json()
                    response = {
                        'error': True,
                        'status_code': status_code,
                        'message': result['title'] + ": " + result['detail']
                    }

                    self.logger.error(
                        f"{method} {endpoint_url} request failed with status {status_code}\n"
                        + json.dumps(response, indent=4))
                else:
                    response = response.json()
                catch_exceptions.attempts = 0
            except Exception as e:
                self.logger.error(
                    f"{self.__class__.__name__}::catch_exceptions() {e}"
                )
                raise e
            finally:
                return response

        try:
            socket_errors = (1013, 1014, 1017, 1018, 1019)
            wazuh_token = self.wztoken.get_auth_token(current_api)
            if method == 'GET':
                if 'origin' in kwargs:
                    if kwargs['origin'] == 'xmlreader':
                        response_xml = self.session.get(
                            url=current_api.get_url() + endpoint_url,
                            headers={
                                'Authorization': f'Bearer {wazuh_token}'
                            },
                            timeout=self.timeout,
                            verify=False
                        ).content
                        # FIXME dumps + loads ???
                        response = {
                            'data': response_xml.decode("utf-8")
                        }
                        # json_response = json.dumps(
                        #     {
                        #         'data': response_xml.decode("utf-8")
                        #     }
                        # )
                        # response = json.loads(json_response)
                    if kwargs['origin'] == 'raw':
                        response = self.session.get(
                            url=current_api.get_url() + endpoint_url,
                            headers={
                                'Authorization': f'Bearer {wazuh_token}'
                            },
                            timeout=self.timeout,
                            verify=False
                        )
                        response = {
                            'data': response.content.decode("utf-8")
                        }
                        # return json.loads(
                        #     json.dumps(
                        #         {
                        #             'data': response.content.decode("utf-8")
                        #         }
                        #     )
                        # )
                else:
                    response = self.session.get(
                        url=current_api.get_url() + endpoint_url,
                        params=kwargs,
                        headers={
                            'Authorization': f'Bearer {wazuh_token}'
                        },
                        timeout=self.timeout,
                        verify=False
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
                        url=current_api.get_url() + endpoint_url,
                        data=kwargs,
                        timeout=self.timeout,
                        verify=False,
                        headers=headers
                    )
                    response = catch_exceptions(response)
                else:
                    response = self.session.post(
                        url=current_api.get_url() + endpoint_url,
                        data=kwargs,
                        headers={
                            'Authorization': f'Bearer {wazuh_token}'
                        },
                        timeout=self.timeout,
                        verify=False
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
                        url=current_api.get_url() + endpoint_url,
                        data=kwargs,
                        verify=False,
                        timeout=self.timeout,
                        headers=headers
                    )
                    response = catch_exceptions(response)

                elif endpoint_url == '/agents/group':
                    response = self.session.put(
                        url=current_api.get_url() + endpoint_url,
                        params=kwargs,
                        headers={
                            'Authorization': f'Bearer {wazuh_token}'
                        },
                        timeout=self.timeout,
                        verify=False
                    )
                    response = catch_exceptions(response)

                else:
                    response = self.session.put(
                        url=current_api.get_url() + endpoint_url,
                        data=kwargs,
                        headers={
                            'Authorization': f'Bearer {wazuh_token}'
                        },
                        timeout=self.timeout,
                        verify=False
                    )
                    response = catch_exceptions(response)

            if method == 'DELETE':
                response = self.session.delete(
                    url=current_api.get_url() + endpoint_url,
                    data=kwargs,
                    headers={
                        'Authorization': f'Bearer {wazuh_token}'
                    },
                    timeout=self.timeout,
                    verify=False
                )
                response = catch_exceptions(response)

            self.logger.debug(
                f"{self.__class__.__name__}: {method} {current_api.get_url()} {endpoint_url} {kwargs}"
            )

            if 'error' in response and response['error'] in socket_errors:
                self.logger.debug(
                    f"{self.__class__.__name__}: retrying response ({counter})."
                )
                if counter > 0:
                    time.sleep(0.5)
                    return self.make_request(
                        method=method,
                        endpoint_url=endpoint_url,
                        kwargs=kwargs,
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

    def clean_keys(self, response) -> dict:
        """
        Hide sensible data from the API response.

        Parameters
        ----------
        response : dict
            The response JSON body.

        Returns
        ----------
        The same response object but with every sensible data hidden.
        """
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
