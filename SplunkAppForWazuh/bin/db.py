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
    def __init__(self, entityName):
        self.logger = log()
        self.session = requestsbak.Session()
        self.session.trust_env = False
        self.kvstoreUri = entity.buildEndpoint(
            entityClass=["storage", "collections", "data"],
            entityName=entityName,
            owner="nobody",
            namespace="SplunkAppForWazuh",
            hostPath=rest.makeSplunkdUri().strip("/")
        )
        self.entityName = entityName
        self.sessionKey = splunk.getSessionKey()

    def insert(self, obj):
        """Insert a entry.

        Parameters
        ----------
        obj : dict
            The entry

        """
        try:
            self.logger.debug("bin.db: Inserting database entry in %s." % self.entityName)
            kvstoreUri = self.kvstoreUri+'?output_mode=json'
            result = self.session.post(kvstoreUri, data=obj, headers={"Authorization": "Splunk %s" % splunk.getSessionKey(), "Content-Type": "application/json"}, verify=False).json()
            if not '_key' in result:
                raise Exception('Format error when inserting object.')
            key = result['_key']
            return key
        except Exception as e:
            self.logger.error("Error inserting in DB module: %s" % (e))
            raise e

    def update(self, obj):
        """Update an already inserted entry.

        Parameters
        ----------
        obj : dict
            The entry to edit.

        """
        try:
            self.logger.debug("bin.db: Updating entry in %s." % self.entityName)
            if not '_key' in obj:
                raise Exception('Missing Key')
            id = obj['_key']
            del obj['_key']
            obj = jsonbak.dumps(obj)
            kvstoreUri = self.kvstoreUri+'/'+id+'?output_mode=json'
            result = self.session.post(kvstoreUri, data=obj, headers={"Authorization": "Splunk %s" % splunk.getSessionKey(), "Content-Type": "application/json"}, verify=False).json()
            parsed_result = jsonbak.dumps({'data': result})
            return parsed_result
        except Exception as e:
            self.logger.error("Error updating in DB module: %s" % (e))
            raise e

    def remove(self, _key):
        """Remove an entry.

        Parameters
        ----------
        obj : dict
            The entry to be removed.

        """
        try:
            self.logger.debug("bin.db: Removing entry in %s." % self.entityName)
            if not _key:
                raise Exception('Missing ID in remove DB module')
            kvstoreUri = self.kvstoreUri+'/'+str(_key)+'?output_mode=json'
            result = self.session.delete(kvstoreUri,headers={"Authorization": "Splunk %s" % splunk.getSessionKey(), "Content-Type": "application/json"}, verify=False)
            if result.status_code == 200:
                parsed_result = jsonbak.dumps({'data': 'API removed.'})
            else:
                msg = jsonbak.loads(result.text)
                text = msg['messages'][0]['text']
                raise Exception(text)
            return parsed_result
        except Exception as e:
            self.logger.error("Error removing an entry in DB module: %s" % (e))
            raise e

    def all(self, session_key=False):
        try:
            self.logger.debug("bin.db: Getting all entries in %s ." % self.entityName)
            kvstoreUri = self.kvstoreUri+'?output_mode=json'
            auth_key = session_key if session_key else splunk.getSessionKey()
            result = self.session.get(kvstoreUri, headers={"Authorization": "Splunk %s" % auth_key, "Content-Type": "application/json"}, verify=False).json()
            return jsonbak.dumps(result)
        except Exception as e:
            self.logger.error('Error returning all entry rows in DB module: %s ' % (e))
            return jsonbak.dumps({"error": str(e)})

    def get(self, id, session_key=False):
        try:
            self.logger.debug("bin.db: Getting an entry from %s." % self.entityName)
            if not id:
                raise Exception('Missing ID')
            kvstoreUri = self.kvstoreUri+'/'+id+'?output_mode=json'
            auth_key = session_key if session_key else splunk.getSessionKey()
            result = self.session.get(kvstoreUri,headers={"Authorization": "Splunk %s" % auth_key, "Content-Type": "application/json"}, verify=False).json()
            parsed_result = jsonbak.dumps({'data': result})
        except Exception as e:
            self.logger.error("Error getting an entry from DB module : %s" % (e))
            raise e
        return parsed_result