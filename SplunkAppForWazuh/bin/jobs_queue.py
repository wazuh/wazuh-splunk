# -*- coding: utf-8 -*-
"""
Wazuh app - Report generation backend.

Copyright (C) 2015-2022 Wazuh, Inc.

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

Find more information about this on the LICENSE file.
"""

import splunk
from splunk import entity, rest

import jsonbak
import requestsbak
from log import log


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
            self.logger.error(
                "bin.jobs_queue: Error in queue module constructor: %s" % (e))

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
            self.logger.debug("bin.jobs_queue: Inserting job.")
            kvstoreUri = self.kvstoreUri+'?output_mode=json'
            auth_key = session_key if session_key else splunk.getSessionKey()
            job = jsonbak.dumps(job)
            result = self.session.post(
                kvstoreUri,
                data=job,
                headers={
                    "Authorization": "Splunk %s" % auth_key,
                    "Content-Type": "application/json"
                },
                verify=False
            ).json()
            return jsonbak.dumps(result)
        except Exception as e:
            self.logger.error(
                'bin.jobs_queue: Error inserting a job in JobsQueue module: %s ' % (e))
            return jsonbak.dumps({"error": str(e)})

    def update_job(self, job, session_key=False):
        """Update an already inserted API.

        Parameters
        ----------
        obj : dict
            The API to edit.
        """
        try:
            self.logger.debug("bin.jobs_queue: Updating job.")
            if not '_key' in job:
                raise Exception('Missing Key')
            id = job['_key']
            del job['_key']
            job = jsonbak.dumps(job)
            kvstoreUri = self.kvstoreUri+'/'+id+'?output_mode=json'
            auth_key = session_key if session_key else splunk.getSessionKey()
            result = self.session.post(
                kvstoreUri,
                data=job,
                headers={
                    "Authorization": "Splunk %s" % auth_key,
                    "Content-Type": "application/json"
                },
                verify=False
            ).json()
            if '_key' in result.keys() and result['_key'] == id:
                return 'Job updated.'
            else:
                raise Exception('Job cannot be updated.')
        except Exception as e:
            self.logger.error(
                "bin.jobs_queue: Error updating in JobsQueue module: %s" % (e))
            raise e

    def remove_job(self, _key, session_key=False):
        """Remove an API.

        Parameters
        ----------
        obj : dict
            The API to be removed.
        """
        try:
            self.logger.debug("bin.jobs_queue: Removing job.")
            if not _key:
                raise Exception('Missing ID in remove JobQueue module')
            kvstoreUri = self.kvstoreUri+'/'+str(_key)+'?output_mode=json'
            auth_key = session_key if session_key else splunk.getSessionKey()
            result = self.session.delete(
                kvstoreUri,
                headers={
                    "Authorization": "Splunk %s" % auth_key,
                    "Content-Type": "application/json"
                },
                verify=False)
            if result.status_code == 200:
                return 'Job removed.'
            else:
                msg = jsonbak.loads(result.text)
                text = msg['messages'][0]['text']
                raise Exception(text)
        except Exception as e:
            self.logger.error(
                "bin.jobs_queue: Error removing a Job in JobsQueue module: %s" % (e))
            raise e

    def get_jobs(self, session_key=False):
        """Get all jobs.

        Parameters
        ----------
        str : session_key
            The authorized session key
        """
        try:
            # self.logger.debug("bin.jobs_queue: Getting all jobs.")
            kvstoreUri = self.kvstoreUri+'?output_mode=json'
            auth_key = session_key if session_key else splunk.getSessionKey()
            result = self.session.get(
                kvstoreUri,
                headers={
                    "Authorization": "Splunk %s" % auth_key,
                    "Content-Type": "application/json"
                },
                verify=False
            ).json()
            if 'messages' in result:
                r = result['messages'][0]
                if r['type'] == 'ERROR' and r['text'] == 'KV Store is initializing. Please try again later.':
                    result = []
            return jsonbak.dumps(result)
        except Exception as e:
            self.logger.error(
                'bin.jobs_queue: Error getting the jobs queue in JobsQueue module: %s ' % (e))
            raise e
