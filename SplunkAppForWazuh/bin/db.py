#
# Wazuh app - Database backend
# Copyright (C) 2018 Wazuh, Inc.
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# Find more information about this on the LICENSE file.
#
import jsonbak
import requestsbak
import os
from splunk.appserver.mrsparkle.lib.util import make_splunkhome_path
from log import log
import splunk
from splunk import entity, rest

class database():
    def __init__(self):
        self.logger = log()
        self.session = requestsbak.Session()
        self.session.trust_env = False
        self.kvstoreUri = entity.buildEndpoint(
            entityClass=["storage", "collections", "data"],
            entityName="credentials",
            owner="nobody",
            namespace="SplunkAppForWazuh",
            hostPath=rest.makeSplunkdUri().strip("/")
        )
        self.sessionKey = splunk.getSessionKey()
        # self.headers = {"Authorization": "Splunk %s" % splunk.getSessionKey(), "Content-Type": "application/json"}

    def insert(self, obj):
        """Insert a new API.

        Parameters
        ----------
        obj : dict
            The new API

        """
        try:
            kvstoreUri = self.kvstoreUri+'?output_mode=json'
            result = self.session.post(kvstoreUri, data=obj, headers={"Authorization": "Splunk %s" % splunk.getSessionKey(), "Content-Type": "application/json"}, verify=False).json()
            self.logger.info('------------------------------------------------ INSERT --------------- %s' % (result))
            if not '_key' in result:
                raise Exception('Format error when inserting object.')
            key = result['_key']
            return key
        except Exception as e:
            self.logger.error("Error inserting in DB module: %s" % (e))
            raise e

    def update(self, obj):
        """Update an already inserted API.

        Parameters
        ----------
        obj : dict
            The API to edit.

        """
        try:
            if not '_key' in obj:
                raise Exception('Missing Key')
            id = obj['_key']
            del obj['_key']
            kvstoreUri = self.kvstoreUri+'/'+id+'?output_mode=json'
            result = self.session.post(kvstoreUri, data=obj, headers={"Authorization": "Splunk %s" % splunk.getSessionKey(), "Content-Type": "application/json"}, verify=False).json()
            self.logger.info('result %s' % (result))
            parsed_result = jsonbak.dumps({'data': result})
        except Exception as e:
            self.logger.error("Error updating in DB module: %s" % (e))
            raise e
        return parsed_result


    def remove(self, id):
        """Remove an API.

        Parameters
        ----------
        obj : dict
            The API to be removed.

        """
        try:
            if not id:
                raise Exception('Missing ID')
            kvstoreUri = self.kvstoreUri+'/'+id+'?output_mode=json'
            result = self.session.delete(kvstoreUri,headers={"Authorization": "Splunk %s" % splunk.getSessionKey(), "Content-Type": "application/json"}, verify=False).json()
            self.logger.info('result %s' % (result))
            parsed_result = jsonbak.dumps({'data': result})
        except Exception as e:
            self.logger.error("Error removing an API in DB module: %s" % (e))
            raise e
        return parsed_result


    def all(self):
        try:
            kvstoreUri = self.kvstoreUri+'?output_mode=json'
            result = self.session.get(kvstoreUri, headers={"Authorization": "Splunk %s" % splunk.getSessionKey(), "Content-Type": "application/json"}, verify=False).json()
            self.logger.info('result %s' % (result))
            return jsonbak.dumps(result)
        except Exception as e:
            self.logger.error('Error returning all API rows in DB module: %s ' % (e))
            return jsonbak.dumps({"error": str(e)})

    def get(self, id):
        try:
            if not id:
                raise Exception('Missing ID')
            kvstoreUri = self.kvstoreUri+'/'+id+'?output_mode=json'
            result = self.session.get(kvstoreUri,headers={"Authorization": "Splunk %s" % splunk.getSessionKey(), "Content-Type": "application/json"}, verify=False).json()
            self.logger.info('result %s' % (result))
            parsed_result = jsonbak.dumps({'data': result})
        except Exception as e:
            self.logger.error("Error getting an API in DB module : %s" % (e))
            raise e
        return parsed_result