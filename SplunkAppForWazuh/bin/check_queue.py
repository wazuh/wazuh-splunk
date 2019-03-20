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

from log import log
import time
import datetime
import jsonbak
import requestsbak
import sys
from jobs_queue import JobsQueue
from db import database


class CheckQueue():

    def __init__(self):
        """Constructor."""
        self.logger = log()
        self.now = time.time()  # Get the date in seconds
        self.session = requestsbak.Session()
        self.auth_key = sys.stdin.readline().strip()
        self.q = JobsQueue()
        self.db = database()

    def init(self):
        jobs = self.q.get_jobs(self.auth_key)
        undone_jobs = self.get_undone_jobs(jobs)
        self.check_undone_jobs(undone_jobs)

    def get_undone_jobs(self, jobs):
        jobs = jsonbak.loads(jobs)
        try:
            undone_jobs = filter(lambda j: j['done'] == False, jobs)
        except TypeError as e:
            undone_jobs = []
            self.logger.error('Error filtering the fields: {}'.format(e))
        return undone_jobs

    def check_undone_jobs(self, jobs):
        for job in jobs:
            if job['exec_time'] < self.now:
                self.exec_job(job)

    def exec_job(self, job):
        try:
            req = job['job']
            method = 'GET'

            # Checks if are missing params
            if 'id' not in req or 'endpoint' not in req:
                raise Exception('Missing ID or endpoint')
            if req['method'] and req['method'] != 'GET':
                method = req['method']
                del req['method']

            api_id = req['id']
            url, auth, verify = self.get_api_credentials(api_id)
            endpoint = req['endpoint']

            # Checks methods
            if method == 'GET':
                request = self.session.get(
                    url + endpoint, params=req, auth=auth,
                    verify=verify).json()
            if method == 'POST':
                request = self.session.post(
                        url + endpoint, data=req, auth=auth,
                        verify=verify).json()
            if method == 'PUT':
                request = self.session.put(
                    url + endpoint, data=req, auth=auth,
                    verify=verify).json()
            if method == 'DELETE':
                request = self.session.delete(
                    url + endpoint, data=req, auth=auth,
                    verify=verify).json()
            
            if request['error'] == 0:
                self.mark_as_done(job)
            else:
                raise Exception('Job cannot be executed properly.')
            return request
        except Exception as e:
            self.logger.error(
                'Error executing the job in CheckQueue module: {}'.format(e))

    def mark_as_done(self, job):
        """Update the job and mark as done.

        Parameters
        ----------
        str: job_key
            The job key in the kvStore
        """
        try:
            job['done'] = True
            self.q.update_job(job, self.auth_key)
        except Exception as e:
            self.logger.error('Error updating the job in CheckQueue module: {}'.format(e))    

    def remove_job(self, job_key):
        """Remove the job of the queue.

        Parameters
        ----------
        str: job_key
            The job key in the kvStore
        """        
        pass


    def get_api_credentials(self, api_id):
        """Get API credentials.

        Parameters
        ----------
        str: api_id
            The API id
        """
        try:
            api = self.db.get(api_id, self.auth_key)
            api = jsonbak.loads(api)
            if api:
                opt_username = api['data']["userapi"]
                opt_password = api['data']["passapi"]
                opt_base_url = api['data']["url"]
                opt_base_port = api['data']["portapi"]
                url = str(opt_base_url) + ":" + str(opt_base_port)
                auth = requestsbak.auth.HTTPBasicAuth(
                    opt_username, opt_password)
                verify = False
                return url, auth, verify
            else:
                raise Exception('API not found')
        except Exception as e:
            raise e


if __name__ == '__main__':
    try:
        cq = CheckQueue()
        cq.init()
    except Exception as e:
        log().error(
            'Error checking the jobs queue in CheckQueue module: {}'.format(e))
