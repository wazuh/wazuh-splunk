# -*- coding: utf-8 -*-
"""
Wazuh app - Manager backend.

Copyright (C) 2018 Wazuh, Inc.

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

Find more information about this on the LICENSE file.
"""


import json
import requests
import uuid
# from splunk import AuthorizationFailed as AuthorizationFailed
from splunk.clilib import cli_common as cli
import splunk.appserver.mrsparkle.controllers as controllers
from splunk.appserver.mrsparkle.lib.decorators import expose_page
from db import database
from log import log


def getSelfConfStanza(stanza):
    """Get the configuration from a stanza.

    Parameters
    ----------
    stanza : unicode
        The selected stanza

    """
    try:
        apikeyconf = cli.getConfStanza('config', stanza)
        parsed_data = json.dumps(apikeyconf)
    except Exception as e:
        raise e
    return parsed_data


def diff_keys_dic_update_api(kwargs_dic):
    """Get the missing fields for the API entry.

    Parameters
    ----------
    kwargs_dic : dict
        The current dict to be compared

    """
    try:
        diff = []
        kwargs_dic_keys = kwargs_dic.keys()
        dic_keys = ['id', 'url', 'portapi', 'userapi', 'passapi']
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
            self.db = database()
            self.session = requests.Session()
            self.session.trust_env = False
        except Exception as e:
            self.logger.error("Error in manager module constructor: %s" % (e))

    # /custom/SplunkAppForWazuh/manager/node
    @expose_page(must_login=False, methods=['GET'])
    def check_connection(self, **kwargs):
        """Check API connection.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            opt_username = kwargs["user"]
            opt_password = kwargs["pass"]
            opt_base_url = kwargs["ip"]
            opt_base_port = kwargs["port"]
            url = opt_base_url + ":" + opt_base_port
            auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
            verify = False
            request_cluster = self.session.get(
                url + '/version', auth=auth, timeout=8, verify=verify).json()
            del kwargs['pass']
            result = json.dumps(request_cluster)
        except Exception as e:
            self.logger.error("Cannot connect to API : %s" % (e))
            return json.dumps({"status": "400", "error": str(e)})
        return result

    @expose_page(must_login=False, methods=['GET'])
    def polling_state(self, **kwargs):
        """Check agent monitoring status.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            app = cli.getConfStanza(
                'inputs',
                'script:///opt/splunk/etc/apps/SplunkAppForWazuh/bin/get_agents_status.py')
            disabled = app.get('disabled')
            polling_dict = {}
            polling_dict['disabled'] = disabled
            data_temp = json.dumps(polling_dict)
        except Exception as e:
            return json.dumps({'error': str(e)})
        return data_temp

    @expose_page(must_login=False, methods=['GET'])
    def extensions(self, **kwargs):
        """Obtain extension from file.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            stanza = getSelfConfStanza("extensions")
            data_temp = stanza
        except Exception as e:
            return json.dumps({'error': str(e)})
        return data_temp

    @expose_page(must_login=False, methods=['GET'])
    def get_api(self, **kwargs):
        """Obtain Wazuh API from DB.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            if 'id' not in kwargs:
                return json.dumps({'error': 'Missing ID.'})
            id = kwargs['id']
            data_temp = self.db.get(id)
            parsed_data = json.dumps(data_temp)
        except Exception as e:
            self.logger.error("Error in get_apis endpoint: %s" % (e))
            return json.dumps({'error': str(e)})
        return parsed_data

    @expose_page(must_login=False, methods=['GET'])
    def get_apis(self, **kwargs):
        """Obtain all Wazuh APIs from DB.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            data_temp = self.db.all()
            result = json.dumps(data_temp)
        except Exception as e:
            self.logger.error(json.dumps({"error": str(e)}))
            return json.dumps({"error": str(e)})
        return result

    @expose_page(must_login=False, methods=['POST'])
    def add_api(self, **kwargs):
        """Add a Wazuh API.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            record = kwargs
            keys_list = ['url', 'portapi', 'userapi', 'passapi']
            if set(record.keys()) == set(keys_list):
                record['id'] = str(uuid.uuid4())
                self.db.insert(record)
                parsed_data = json.dumps({'result': record['id']})
            else:
                return json.dumps({'error': 'Invalid number of arguments'})
        except Exception as e:
            self.logger.error({'error': str(e)})
            return json.dumps({'error': str(e)})
        return parsed_data

    @expose_page(must_login=False, methods=['POST'])
    def remove_api(self, **kwargs):
        """Delete Wazuh API from DB.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            api_id = kwargs
            if 'id' not in api_id:
                return json.dumps({'error': 'Missing ID'})
            self.db.remove(api_id['id'])
            parsed_data = json.dumps({'data': 'success'})
        except Exception as e:
            self.logger.error("Error in remove_api endpoint: %s" % (e))
            return json.dumps({'error': str(e)})
        return parsed_data

    @expose_page(must_login=False, methods=['POST'])
    def update_api(self, **kwargs):
        """Update Wazuh API.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            entry = kwargs
            keys_list = ['id', 'url', 'portapi', 'userapi',
                         'passapi', 'filterName', 'filterType', 'managerName']
            if set(entry.keys()) == set(keys_list):
                self.db.update(entry)
                parsed_data = json.dumps({'data': 'success'})
            else:
                missing_params = diff_keys_dic_update_api(entry)
                raise Exception(
                    "Invalid arguments, missing params : %s"
                    % str(missing_params))
        except Exception as e:
            self.logger.error("Error in update_api endpoint: %s" % (e))
            return json.dumps({"error": str(e)})
        return parsed_data

    @expose_page(must_login=False, methods=['GET'])
    def get_log_lines(self, **kwargs):
        """Get last log lines.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            lines = self.logger.get_last_log_lines(20)
            parsed_data = json.dumps({'logs': lines})
        except Exception as e:
            self.logger.error("Get_log_lines endpoint: %s" % (e))
            return json.dumps({"error": str(e)})
        return parsed_data
