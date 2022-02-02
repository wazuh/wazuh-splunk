# -*- coding: utf-8 -*-
"""
Wazuh app - Manager backend.

Copyright (C) 2015-2019 Wazuh, Inc.

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

Find more information about this on the LICENSE file.
"""


import json
import os

import get_api_by_id as API_services
import jsonbak
import splunk.appserver.mrsparkle.controllers as controllers
import utils
from API_model import API_model
from check_daemons import check_daemons
from db import database
from log import log
from splunk.appserver.mrsparkle.lib.decorators import expose_page
from splunk.appserver.mrsparkle.lib.util import make_splunkhome_path
from splunk.clilib import cli_common as cli
from splunk.clilib.control_exceptions import ParsingError
from wazuh_api import Wazuh_API


def getDefaultExtensions():
    try:
        stanza = utils.getSelfConfStanza("config", "extensions")
        return stanza
    except Exception as e:
        return jsonbak.dumps({'error': str(e)})


def diff_keys_dic_update_api(kwargs_dic):
    """
    Get the missing fields for the API entry.

    Parameters
    ----------
    kwargs_dic : dict
        The current dict to be compared
    """
    try:
        diff = []
        kwargs_dic_keys = kwargs_dic.keys()
        dic_keys = ['_key', 'url', 'portapi', 'userapi', 'passapi',
                    'filterName', 'filterType', 'managerName', 'runAs']
        for key in dic_keys:
            if key not in kwargs_dic_keys:
                diff.append(key)
        return str(', '.join(diff))
    except Exception:
        return "Error comparing dictionaries"


class manager(controllers.BaseController):
    """Handle manager endpoints."""

    def __init__(self):
        """Constructor."""
        self.logger = log()
        try:
            controllers.BaseController.__init__(self)
            self.db = database("credentials")
            self.extensionsdb = database("extensions")
            self.wz_api = Wazuh_API()
        except Exception as e:
            self.logger.error(
                "manager: Error in manager module constructor: %s" % (e)
            )

    @expose_page(must_login=False, methods=['GET'])
    def polling_state(self, **kwargs):
        """
        Check agent monitoring status.

        Parameters
        ----------
        kwargs : dict
            The request's parameters
        """
        try:
            self.logger.debug("manager: Getting agents polling state.")
            app = cli.getConfStanza(
                'inputs',
                'script:///opt/splunk/etc/apps/SplunkAppForWazuh/bin/get_agents_status.py'
            )

            disabled = app.get('disabled')
            polling_dict = {}
            polling_dict['disabled'] = disabled
            data_temp = jsonbak.dumps(polling_dict)
        except Exception as e:
            return jsonbak.dumps(
                {
                    'error': str(e)
                }
            )
        return data_temp

    @expose_page(must_login=False, methods=['GET', 'POST'])
    def extensions(self, **kwargs):
        """
        Obtain extension from file.

        Parameters
        ----------
        kwargs : dict
            The request's parameters
        """

        try:
            self.logger.debug('Fetching extensions with kwargs %s' %
                              jsonbak.dumps(kwargs))
            # If we are provided with a key for a db entry, it is retrieved
            if '_key' in kwargs:
                key = kwargs['_key']
                self.logger.debug(
                    "manager: Getting extensions from db for %s" % (key))
                stanza = jsonbak.dumps(jsonbak.loads(
                    self.extensionsdb.get(key))['data'])

            # if no key is provided, we check whether there is a value in the
            # db that matches the api
            elif 'api' in kwargs:
                stanzas = {}
                api = kwargs['api']
                self.logger.debug("manager: Getting extensions for %s" % (api))
                stanzas = jsonbak.loads(self.extensionsdb.all())
                filtered = [s for s in stanzas if s['api'] == api]
                if filtered:
                    data_temp = filtered[0]
                    stanza = jsonbak.dumps(data_temp)
                # if no value matches, we create an entry for that API and
                # return the stanza
                else:
                    data_temp = jsonbak.loads(getDefaultExtensions())
                    data_temp['api'] = api
                    key = self.extensionsdb.insert(jsonbak.dumps(data_temp))
                    stanza = jsonbak.dumps(jsonbak.loads(
                        self.extensionsdb.get(key))['data'])
            else:
                stanza = getDefaultExtensions()
            return stanza
        except Exception as e:
            return jsonbak.dumps({'error': str(e)})

    @expose_page(must_login=False, methods=['POST'])
    def remove_extensions(self, **kwargs):
        try:
            self.logger.debug("manager: Removing extensions.")

            key = kwargs['_key']
            response = self.extensionsdb.remove(key)
            return response
        except Exception as e:
            return {'error': str(e)}

    @expose_page(must_login=False, methods=['POST'])
    def save_extensions(self, **kwargs):
        """
        Save extensions to file

        Parameters
        ----------
        kwargs : dict
            The request's parameters
        """
        try:
            self.logger.debug("manager: Saving extensions.")

            extensions = jsonbak.loads(kwargs['extensions'])
            response = self.extensionsdb.update(extensions)
        except Exception as e:
            return jsonbak.dumps(
                {
                    'error': str(e)
                }
            )
        return jsonbak.dumps(response)

    @expose_page(must_login=False, methods=['GET'])
    def admin_extensions(self, **kwargs):
        """
        Obtain extension from file.

        Parameters
        ----------
        kwargs : dict
            The request's parameters
        """
        try:
            self.logger.debug("manager: Getting admin extensions.")
            stanza = utils.getSelfConfStanza("config", "admin_extensions")
            data_temp = stanza
        except Exception as e:
            return jsonbak.dumps(
                {
                    'error': str(e)
                }
            )
        return data_temp

    @expose_page(must_login=False, methods=['GET'])
    def configuration(self, **kwargs):
        """
        Obtain extension from file.

        Parameters
        ----------
        kwargs : dict
            The request's parameters
        """
        try:
            self.logger.debug(
                "manager: Getting configuration on memory from frontend.")
            stanza = utils.getSelfConfStanza("config", "configuration")
            data_temp = stanza
        except Exception as e:
            return jsonbak.dumps(
                {
                    'error': str(e)
                }
            )
        return data_temp

    @expose_page(must_login=False, methods=['GET'])
    def app_info(self, **kwargs):
        """
        Obtain app information from file.

        Parameters
        ----------
        kwargs : dict
            The request's parameters
        """
        try:
            self.logger.debug("manager: Getting app info.")
            stanza = cli.getConfStanza('package', 'app')
            data_temp = stanza
            stanza = cli.getConfStanza('package', 'splunk')
            data_temp['splunk_version'] = stanza['version']
            parsed_data = jsonbak.dumps(data_temp)
        except Exception as e:
            return jsonbak.dumps(
                {
                    'error': str(e)
                }
            )
        return parsed_data

    @expose_page(must_login=False, methods=['GET'])
    def get_api(self, **kwargs):
        """
        Obtain Wazuh API from DB.

        Parameters
        ----------
        kwargs : dict
            The request's parameters
        """
        # TODO USE MODEL AND SERVICE
        try:
            self.logger.debug("manager: Getting API info from _key.")
            if 'apiId' not in kwargs:
                return jsonbak.dumps({'error': 'Missing ID.'})
            id = kwargs['apiId']

            # TODO: This conditional statement is done to ensure
            # retrocompatibility with registered managers that do
            # not have an alias. Replace the following 4 lines with
            # data_temp=self.db.get(id) when these are no longer supported.
            data_temp = jsonbak.loads(self.db.get(id))["data"]
            if not "alias" in data_temp:
                data_temp["alias"] = data_temp["url"]
            data_temp = jsonbak.dumps({"data": data_temp})

            parsed_data = jsonbak.dumps(data_temp)
        except Exception as e:
            self.logger.error("manager::get_api(): %s" % (e))
            return jsonbak.dumps(
                {
                    'error': str(e)
                }
            )

    @expose_page(must_login=False, methods=['GET'])
    def get_apis(self, **kwargs):
        """
        Obtain all Wazuh APIs from DB.

        Parameters
        ----------
        kwargs : dict
            The request's parameters
        """
        # TODO USE MODEL AND SERVICE
        try:
            self.logger.debug("manager: Getting API list.")

            apis = self.db.all()
            parsed_apis = jsonbak.loads(apis)

            # Remove the password from the list of apis
            for api in parsed_apis:
                if "passapi" in api:
                    del api["passapi"]
                # TODO: This conditional is put in place in order to support
                # previous installations that did not have the "alias" field
                # in the database. Remove it when these are no longer supported.
                if not "alias" in api:
                    api["alias"] = api["url"]
            return jsonbak.dumps(parsed_apis)
        except Exception as e:
            error = jsonbak.dumps(
                {
                    "error": str(e)
                }
            )
            self.logger.error(error)
            return error

    @expose_page(must_login=False, methods=['POST'])
    def add_api(self, **kwargs):
        """
        Add a Wazuh API.

        Parameters
        ----------
        kwargs : dict
            The request's parameters
        """
        # TODO USE MODEL AND SERVICE
        try:
            self.logger.debug("manager: Adding a new API.")
            record = kwargs
            self.logger.debug(record)
            keys_list = ['url', 'portapi', 'userapi', 'passapi', 'managerName',
                         'filterType', 'filterName', 'alias', 'runAs']
            if set(record.keys()) == set(keys_list):
                key = self.db.insert(jsonbak.dumps(record))
                parsed_data = jsonbak.dumps(
                    {
                        'result': key
                    }
                )
                return parsed_data
            else:
                raise Exception('Invalid number of arguments')
        except Exception as e:
            self.logger.error({'manager - add_api': str(e)})
            return jsonbak.dumps(
                {
                    'error': str(e)
                }
            )

    @expose_page(must_login=False, methods=['POST'])
    def remove_api(self, **kwargs):
        """
        Delete Wazuh API from DB.

        Parameters
        ----------
        kwargs : dict
            The request's parameters
        """
        # TODO USE MODEL AND SERVICE
        try:
            self.logger.debug("manager: Removing API.")

            api_id = utils.get_parameter(kwargs, '_key')
            self.db.remove(api_id)

            return jsonbak.dumps(
                {
                    'data': 'success'
                }
            )
        except Exception as e:
            self.logger.error(
                "manager: Error in remove_api endpoint: %s" % (e))
            return jsonbak.dumps(
                {
                    'error': str(e)
                }
            )

    @expose_page(must_login=False, methods=['POST'])
    def update_api(self, **kwargs):
        """
        Update Wazuh API.

        Parameters
        ----------
        kwargs : dict
            The request's parameters
        """
        # TODO USE MODEL AND SERVICE
        self.logger.debug("manager::update_api() called")
        try:
            entry = kwargs
            self.logger.debug(f"manager: Updating API information")
            if '_user' in kwargs:
                del kwargs['_user']
            if not "passapi" in entry:
                opt_id = entry["_key"]
                data_temp = self.db.get(opt_id)
                current_api = jsonbak.loads(data_temp)
                current_api = current_api["data"]
                entry["passapi"] = current_api["passapi"]
            keys_list = ['_key', 'url', 'portapi', 'userapi', 'passapi', 'filterName',
                         'filterType', 'managerName', 'alias', 'runAs']
            if set(entry.keys()) == set(keys_list):
                result = self.db.update(entry)
            else:
                missing_params = diff_keys_dic_update_api(entry)
                raise Exception(
                    "Invalid arguments, missing params : %s"
                    % str(missing_params))
        except Exception as e:
            self.logger.error(
                "manager: Error in update_api endpoint: %s" % (e))
            return jsonbak.dumps({"error": str(e)})
        return result

    @expose_page(must_login=False, methods=['GET'])
    def get_log_lines(self, **kwargs):
        """
        Get last log lines.

        Parameters
        ----------
        kwargs : dict
            The request's parameters
        """
        try:
            self.logger.debug("manager: Getting last log lines.")
            lines = self.logger.get_last_log_lines(20)
            parsed_data = jsonbak.dumps(
                {
                    'logs': lines,
                    'logs_path': make_splunkhome_path(
                        ['var', 'log', 'splunk', 'SplunkAppForWazuh.log'])
                }
            )
        except Exception as e:
            self.logger.error("manager: Get_log_lines endpoint: %s" % (e))
            return jsonbak.dumps(
                {
                    'error': str(e)
                }
            )
        return parsed_data

    @expose_page(must_login=False, methods=['GET'])
    def check_connection(self, **kwargs):
        """
        Check API connection BEFORE registration.

        FIXME API registration logic is wrongly done on the frontend. The
        registration process takes 2 steps guided by the frontend:
            - 1. This endpoint is accessed to check API connectivity.
                 Full API info is sent.
            - 2. If the connection was successful (checked on the frontend),
                 then the frontend sends another request to register the API
                 on the DB, sending the API information again.

        Parameters
        ----------
        kwargs : dict
            ip: str: API URL.
            port: str: API port.
            user: str: API username.
            pass: str: API user password.
            cluster: str: true or false
        """
        self.logger.debug("manager::check_connection() called")
        try:
            api = API_model(
                address=kwargs['ip'],
                port=kwargs['port'],
                user=kwargs['user'],
                password=kwargs['pass'],
                cluster=kwargs['cluster'] == "true",
            )
        except KeyError as e:
            self.log.error(f"Missing parameters: {e}")

        try:
            self.check_wazuh_version(api)
            # Raise error if Wazuh Daemons are not ready.
            if not check_daemons(api):
                raise Exception("DAEMONS-NOT-READY")
            output = self.get_cluster_info(api)
            result = jsonbak.dumps(output)
        except Exception as e:
            if e == "DAEMONS-NOT-READY":
                self.logger.error(
                    "manager: Cannot connect to API; Wazuh not ready yet.")
                return jsonbak.dumps(
                    {
                        "status": "200",
                        "error": 3099,
                        "message": "Wazuh not ready yet."
                    }
                )
            else:
                self.logger.error("manager: Cannot connect to API : %s" % (e))
                return jsonbak.dumps(
                    {
                        "status": 400,
                        "error": "Cannot connect to the API, please see the app logs"
                    }
                )
        return result

    @expose_page(must_login=False, methods=['GET'])
    def check_connection_by_id(self, **kwargs):
        """
        Check API connection AFTER registration.

        Parameters
        ----------
        kwargs : dict
            The request's parameters
        """
        self.logger.debug("manager::check_connection_by_id() called")
        try:
            api_id = utils.get_parameter(kwargs, 'apiId')
            api: API_model = API_services.get_api_by_id(api_id)
            # NOTE the frontend expects a different interface, so the API_model
            # cannot be used yet.
            # TODO Needs a refactor on the frontend
            current_api_json: dict = jsonbak.loads(self.db.get(api_id))['data']

            output = self.get_cluster_info(api)

            # Hide API password
            api.hide_password()
            del current_api_json['passapi']  # FIXME

            output['api'] = {
                "data": current_api_json
            }
            return jsonbak.dumps(output)
        except KeyError as e:
            self.logger.error(f"KeyError {e}")
        except Exception as e:
            msg = f"Error checking API connection: {e}"
            self.logger.error(msg)
            return jsonbak.dumps(
                {
                    "status": "500",
                    "error": msg
                }
            )

    @expose_page(must_login=False, methods=['POST'])
    def upload_file(self, **kwargs):
        self.logger.debug("manager: Uploading file(s)")
        try:
            api_id = utils.get_parameter(kwargs, 'apiId')
            api: API_model = API_services.get_api_by_id(api_id)
        except Exception as e:
            self.logger.error(str(e))

        try:
            # Get file name and file content
            file_info = kwargs['file'].__dict__
            file_name = file_info['filename']
            file_content = kwargs['file'].file
            # Get path
            dest_resource = kwargs['resource']

            response = self.wz_api.make_request(
                method='PUT',
                endpoint_url=f"/{dest_resource}/files/{file_name}",
                kwargs=file_content,
                current_api=api
            )
            result = jsonbak.loads(response.text)

            if 'error' in result and result['error'] != 0:
                self.logger.error(
                    "manager: Error trying to upload a file(s): %s" % (result))
                return jsonbak.dumps(
                    {
                        "status": "400",
                        "text": "Error adding file: %s. Cause: %s" % (file_name, result['detail'])
                    }
                )
            return jsonbak.dumps(
                {
                    "status": "200",
                    "text": "File %s was updated successfully. " % file_name
                }
            )
        except Exception as e:
            self.logger.error(
                "manager: Error trying to upload a file(s): %s" % (e))
            return jsonbak.dumps(
                {
                    "status": "400",
                    "text": "Error adding file: %s. Cause: %s" % (file_name, e)
                }
            )

    # ------------------------------------------------------------ #
    #   Utility methods
    # ------------------------------------------------------------ #

    def get_cluster_info(self, api: API_model) -> dict:
        """
        Get information about the cluster.
        """
        self.logger.debug("manager::get_cluster_info() called")

        # Response model
        output: dict = {
            'managerName': {
                'name': 'NoName'
            },
            'clusterMode': {
                'enabled': 'no',
                'running': 'no'
            },
            'clusterName': {
                'cluster': False
            }
        }

        # A little cheat to force the use of a basic token. This solves the
        # situation when an user has no permissions to fetch the cluster's or
        # manager's information. These requests below are required for internal
        # usage (to set the filters), and are not triggered by the user's
        # activity on the frontend.
        api.run_as = False

        # Get manager's name
        endpoint = "/agents?q=id=000&select=name"
        response = self.wz_api.make_request(
            method='GET',
            endpoint_url=endpoint,
            kwargs={},
            current_api=api
        )
        try:
            manager_name: str = response['data']['affected_items'][0]['name']
        except IndexError:
            # data.affected_items is empty
            self.logger.error(
                f"manager::get_cluster_info(): {endpoint} did not return any data\n"
                + json.dumps(response, indent=4)
            )
            return response  # API error response
        else:
            output['managerName']['name'] = manager_name

        # Get cluster's status
        response = self.wz_api.make_request(
            method='GET',
            endpoint_url='/cluster/status',
            kwargs={},
            current_api=api
        )
        try:
            cluster_data: dict = response['data']
            output['clusterMode'] = cluster_data

            # Cluster enabled and running
            if all(value == "yes" for value in cluster_data.values()):
                # Get cluster's info
                response = self.wz_api.make_request(
                    method='GET',
                    endpoint_url='/cluster/local/info',
                    kwargs={},
                    current_api=api
                )
                cluster_info: dict = response['data']['affected_items'][0]
                output['clusterName'] = {
                    'type':     cluster_info['type'],
                    'cluster':  cluster_info['cluster'],
                    'node':     cluster_info['node']
                }
        except (IndexError, KeyError):
            # data does not exist or data.affected_items is empty
            self.logger.error(
                f"manager: {endpoint} did not return any data\n"
                + json.dumps(response, indent=4)
            )
        except Exception as e:
            self.logger.error(f"manager: error on get_cluster_info(): {e}")

        return output

    def check_wazuh_version(self, api: API_model):
        """
        Check Wazuh version

        Parameters
        ----------
        kwargs : dict
            The request's parameters
        """
        self.logger.debug("manager::check_wazuh_version() called")

        try:
            response = self.wz_api.make_request(
                method='GET',
                endpoint_url='/',
                kwargs={},
                current_api=api
            )

            wazuh_version = utils.get_parameter(
                response, 'data')['api_version']
            v_split = wazuh_version.split('.')
            wazuh_version = str(v_split[0]+"."+v_split[1])

            app_version = cli.getConfStanza('package', 'app')['version']
            a_split = app_version.split('.')
            app_version = str(a_split[0]+"."+a_split[1])

            if wazuh_version != app_version:
                raise Exception(
                    "Unexpected Wazuh version. App version: %s, Wazuh version: %s"
                    % (app_version, wazuh_version))
        except Exception as ex:
            self.logger.error("Error when checking Wazuh version: %s" % (ex))
            raise ex

    def get_config_on_memory(self):
        try:
            self.logger.debug("manager: Getting configuration on memory.")
            config_str = utils.getSelfConfStanza("config", "configuration")
            config = jsonbak.loads(config_str)
            return config
        except Exception as e:
            self.logger.error(
                "manager: Error getting the configuration on memory: %s" % (e))
            raise e
