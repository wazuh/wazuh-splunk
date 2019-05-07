# -*- coding: utf-8 -*-
"""
Wazuh app - Report generation backend.

Copyright (C) 2015-2019 Wazuh, Inc.

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

Find more information about this on the LICENSE file.
"""

import jsonbak
import requestsbak
from log import log
import splunk
from splunk import entity, rest


class ConfigStorage():
    """Handle queue endpoints"""

    def __init__(self):
        """Constructor."""
        try:
            self.logger = log()
            self.session = requestsbak.Session()
            self.session.trust_env = False
            self.kvstoreUri = entity.buildEndpoint(
                entityClass=["storage", "collections", "data"],
                entityName="configuration",
                owner="nobody",
                namespace="SplunkAppForWazuh",
                hostPath=rest.makeSplunkdUri().strip("/")
            )
            self.sessionKey = splunk.getSessionKey()
        except Exception as e:
            self.logger.error("Error in ConfigStorage module constructor: %s" % (e))


    def add_parameter(self, parameter, session_key=False):
        """Insert a new config parameter.

        Parameters
        ----------
        dic : parameter
            The parameter information
        str : session_key
            The authorized session key

        """
        try:
            kvstoreUri = self.kvstoreUri+'?output_mode=json'
            auth_key = session_key if session_key else splunk.getSessionKey()
            parameter = jsonbak.dumps(parameter)
            result = self.session.post(kvstoreUri, data=parameter, headers={
                                       "Authorization": "Splunk %s" % auth_key, "Content-Type": "application/json"}, verify=False).json()
            return jsonbak.dumps(result)
        except Exception as e:
            self.logger.error(
                'Error creating a new parameter in ConfigStorage module: %s ' % (e))
            return jsonbak.dumps({"error": str(e)})

    def update_parameter(self, param, session_key=False):
        """Update an already inserted API.

        Parameters
        ----------
        obj : dict
            The API to edit.

        """
        try:
            if not '_key' in param:
                raise Exception('Missing Key')
            id = param['_key']
            del param['_key']
            param = jsonbak.dumps(param)
            kvstoreUri = self.kvstoreUri+'/'+id+'?output_mode=json'
            auth_key = session_key if session_key else splunk.getSessionKey()
            result = self.session.post(kvstoreUri, data=param, headers={
                                       "Authorization": "Splunk %s" % auth_key, "Content-Type": "application/json"}, verify=False).json()
            if '_key' in result.keys() and result['_key'] == id:
                return 'Parameter updated.'
            else:
                raise Exception('Parameter cannot be updated. Changes will not be applied until restart Splunk.')
        except Exception as e:
            self.logger.error("Error updating in ConfigStorage module: %s" % (e))
            raise e

    def get_config(self, session_key=False):
        """Get the config.

        Parameters
        ----------
        str : session_key
            The authorized session key

        """
        try:
            kvstoreUri = self.kvstoreUri+'?output_mode=json'
            auth_key = session_key if session_key else splunk.getSessionKey()
            result = self.session.get(kvstoreUri, headers={
                                      "Authorization": "Splunk %s" % auth_key, "Content-Type": "application/json"}, verify=False).json()
            return result
        except Exception as e:
            self.logger.error(
                'Error getting the configuration ConfigStorage module: %s ' % (e))
            raise e
