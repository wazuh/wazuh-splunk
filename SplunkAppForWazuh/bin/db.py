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

import splunk
from splunk import entity, rest

import jsonbak
import requestsbak
from log import log


class database():
    """
    Database class.

    Handles the Splunk's KV store, where the the information of the Wazuh APIs
    are stored.

    Each API is a collection of type credentials. The fields of this are defined
    on the collections.conf file.
    """

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

    def insert(self, obj: dict) -> str:
        """
        Insert a new API.


        Parameters
        ----------
        obj : dict
            The information of the new API to be stored.
        Returns
        ----------
        str
            The ID (_key) for the new API collection.
        """
        self.logger.debug("bin.db: inserting a new API")
        try:
            self.logger.debug("bin.db: Inserting database entry in %s." % self.entityName)
            kvstoreUri = self.kvstoreUri+'?output_mode=json'
            result = self.session.post(
                url=kvstoreUri,
                data=obj,
                headers={
                    "Authorization": "Splunk %s" % splunk.getSessionKey(),
                    "Content-Type": "application/json"
                },
                verify=False
            ).json()
            if not '_key' in result:
                raise Exception('The new API could not be inserted\n' +
                                jsonbak.dumps(result, indent=4)
                                )
            key = result['_key']
            return key
        except Exception as e:
            self.logger.error("Error inserting in DB module: %s" % (e))
            raise e

    def update(self, obj: dict) -> dict:
        """
        Update an already existing API.

        Parameters
        ----------
        obj : dict
            The new API information.
        Returns
        ----------
        dict
            The updated API.
        """
        self.logger.debug("bin.db: updating existing API")
        try:
            self.logger.debug("bin.db: Updating entry in %s." % self.entityName)
            if not '_key' in obj:
                raise Exception('Missing API ID')

            id = obj['_key']
            del obj['_key']
            obj = jsonbak.dumps(obj)

            kvstoreUri = self._build_kvstore_uri(id)
            result = self.session.post(
                url=kvstoreUri,
                data=obj,
                headers={
                    "Authorization": "Splunk %s" % splunk.getSessionKey(),
                    "Content-Type": "application/json"
                },
                verify=False
            ).json()
            parsed_result = jsonbak.dumps(
                {
                    'data': result
                }
            )
            return parsed_result
        except Exception as e:
            self.logger.error("Error updating in DB module: %s" % (e))
            raise e

    def remove(self, _key: str) -> dict:
        # CHECK RBAC PR MERGE
        """
        Remove an API given its ID.

        Parameters
        ----------
        id : str
            The ID of the API to be removed.
        Returns
        ----------
        dict
            Confirmation or error message.
        """
        self.logger.debug("bin.db: Removing API.")
        try:
            self.logger.debug("bin.db: Removing entry in %s." % self.entityName)
            if not _key:
                raise Exception('Missing ID in remove DB module')
            kvstoreUri = self.kvstoreUri+'/'+str(_key)+'?output_mode=json'
            result = self.session.delete(
                url=kvstoreUri,
                headers={
                    "Authorization": "Splunk %s" % splunk.getSessionKey(),
                    "Content-Type": "application/json"
                },
                verify=False
            )
            if result.status_code == 200:
                parsed_result = jsonbak.dumps(
                    {
                        'data': 'API removed.'
                    }
                )
            else:
                msg = jsonbak.loads(result.text)
                text = msg['messages'][0]['text']
                raise Exception(text)

            return parsed_result
        except Exception as e:
            self.logger.error("Error removing an entry in DB module: %s" % (e))
            raise e

    def all(self, session_key=False) -> dict:
        """
        Get all the APIs stored in the KV store.

        Parameters
        ----------
        session_key : str
            (Optional) The Splunk's session key.

        Returns
        ----------
        dict
            The stored APIs.
        """
        self.logger.debug("bin.db: Getting all APIs .")
        try:
            self.logger.debug("bin.db: Getting all entries in %s ." % self.entityName)
            kvstoreUri = self.kvstoreUri+'?output_mode=json'
            auth_key = session_key if session_key else splunk.getSessionKey()
            result = self.session.get(
                url=kvstoreUri,
                headers={
                    "Authorization": "Splunk %s" % auth_key,
                    "Content-Type": "application/json"
                },
                verify=False
            ).json()
            return jsonbak.dumps(result)
        except Exception as e:

            self.logger.error(
                'Error returning all API rows in DB module: %s ' % (e))
            return jsonbak.dumps(
                {
                    "error": str(e)
                }
            )

    def get(self, id: str, session_key=False) -> dict:
        """
        Get an API by ID.

        Parameters
        ----------
        id : str
            The ID of the requested API.
        Returns
        ----------
        dict
            The API information for the given ID.
        """
        self.logger.debug("bin.db: Getting an API.")
        try:
            self.logger.debug("bin.db: Getting an entry from %s." % self.entityName)
            if not id:
                raise Exception('Missing API ID')

            kvstoreUri = self._build_kvstore_uri(id)
            auth_key = session_key if session_key else splunk.getSessionKey()
            result = self.session.get(
                url=kvstoreUri,
                headers={
                    "Authorization": "Splunk %s" % auth_key,
                    "Content-Type": "application/json"
                },
                verify=False
            ).json()
            parsed_result = jsonbak.dumps(
                {
                    'data': result
                }
            )
        except Exception as e:
            self.logger.error("Error getting an entry from DB module : %s" % (e))
            raise e
        return parsed_result

    def _build_kvstore_uri(self, id: str = '') -> str:
        """
        Utility mehtod to build the Splunk's endpoint to the KVstore
        taken the collection ID as an optional parameter.

        Parameters
        ----------
        id : str
            The colecttion ID.
        Returns
        ----------
        str
            The Splunk's endpoint for the required collection.
        """
        return f'{self.kvstoreUri}/{id}?output_mode=json'
