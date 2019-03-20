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
# from splunk import AuthorizationFailed as AuthorizationFailed
import splunk
from splunk import entity, rest


class JobsQueue():
    """Handle queue endpoints"""

    def __init__(self):
        """Constructor."""
        try:
            self.logger = log()
            self.session = requestsbak.Session()
            self.session.trust_env = False
            self.kvstoreUri = entity.buildEndpoint(
                entityClass=["storage", "collections", "data"],
                entityName="jobs",
                owner="nobody",
                namespace="SplunkAppForWazuh",
                hostPath=rest.makeSplunkdUri().strip("/")
            )
            self.sessionKey = splunk.getSessionKey()
        except Exception as e:
            self.logger.error("Error in queue module constructor: %s" % (e))

    def insert_job(self, job, session_key=False):
        """Insert a job.

        Parameters
        ----------
        dic : job
            The job information
        str : session_key
            The authorized session key

        """
        try:
            kvstoreUri = self.kvstoreUri+'?output_mode=json'
            auth_key = session_key if session_key else splunk.getSessionKey()
            job = jsonbak.dumps(job)
            result = self.session.post(kvstoreUri, data=job, headers={
                                       "Authorization": "Splunk %s" % auth_key, "Content-Type": "application/json"}, verify=False).json()
            return jsonbak.dumps(result)
        except Exception as e:
            self.logger.error(
                'Error inserting a job in JobsQueue module: %s ' % (e))
            return jsonbak.dumps({"error": str(e)})

    def update_job(self, job, session_key=False):
        """Update an already inserted API.

        Parameters
        ----------
        obj : dict
            The API to edit.

        """
        try:
            if not '_key' in job:
                raise Exception('Missing Key')
            id = job['_key']
            del job['_key']
            job = jsonbak.dumps(job)
            kvstoreUri = self.kvstoreUri+'/'+id+'?output_mode=json'
            auth_key = session_key if session_key else splunk.getSessionKey()
            result = self.session.post(kvstoreUri, data=job, headers={
                                       "Authorization": "Splunk %s" % auth_key, "Content-Type": "application/json"}, verify=False).json()
            if '_key' in result.keys() and result['_key'] == id:
                return 'Job updated.'
            else:
                raise Exception('Job cannot be updated.')
        except Exception as e:
            self.logger.error("Error updating in JobsQueue module: %s" % (e))
            raise e

    def get_jobs(self, session_key=False):
        """Get all jobs.

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
            return jsonbak.dumps(result)
        except Exception as e:
            self.logger.error(
                'Error getting the jobs queue in JobsQueue module: %s ' % (e))
            raise e