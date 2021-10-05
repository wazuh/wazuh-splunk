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
from wazuhtoken import wazuhtoken
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
        self.wztoken = wazuhtoken()
        self.now = time.time()  # Get the date in seconds
        self.session = requestsbak.Session()
        self.auth_key = sys.stdin.readline().strip()
        self.q = JobsQueue()
        self.db = database("credentials")

    def init(self):
        """Inits the jobs
        """
        try:
            self.logger.debug("bin.check_queue: Checking jobs queue.")
            jobs = self.q.get_jobs(self.auth_key)
            todo_jobs = self.get_todo_jobs(jobs)
            self.check_todo_jobs(todo_jobs)
            jobs = jsonbak.loads(jobs)
            self.check_todo_jobs(jobs)
        except Exception as e:
            self.logger.error('bin.check_queue: Error at init in the CheckQueue module: {}'.format(e))

    def get_todo_jobs(self, jobs):
        """Gets the to do jobs

        Parameters
        ----------
        str: jobs
            A dictionary in string format with the jobs
        """

        try:
            self.logger.debug("bin.check_queue: Gettings todo jobs.")
            jobs = jsonbak.loads(jobs)
            todo_jobs = filter(lambda j: j['done'] == False, jobs)
        except TypeError as e:
            todo_jobs = []
            self.logger.error('bin.check_queue: Error filtering the fields in the CheckQueue module: {}'.format(e))
        return todo_jobs

    def check_todo_jobs(self, jobs):
        """Check the to do jobs

        Parameters
        ----------
        dic: jobs
            A dictionary with the todo jobs
        """
        try:
            self.logger.debug("bin.check_queue: Checking todo jobs.")
            for job in jobs:
                if job['exec_time'] < self.now:
                    self.exec_job(job)
        except Exception as e:
            self.logger.error('bin.check_queue: Error checking to do jobs in the CheckQueue module: {}'.format(e))

    def exec_job(self, job):
        """Exec the passed job

        Parameters
        ----------
        dic: job
            A dictionary with the job
        """
        try:
            self.logger.debug("bin.check_queue: Executing job.")
            req = job['job']
            method = 'GET'

            # Checks if are missing params
            if ('id' not in req and 'apiId' not in req) or 'endpoint' not in req:
                raise Exception('Missing ID or endpoint')
            if 'method' in req.keys() and req['method'] != 'GET':
                method = req['method']
                del req['method']
            
            api_id = 0
            if 'id' in req:
                api_id = req['id']
            elif 'apiId' in req:
                api_id = req['apiId']
            else:
                raise Exception('Missing API ID')
            try:
                url, auth, verify = self.get_api_credentials(api_id)
            except Exception as e:
                self.logger.error("bin.check_queue: Error executing the job, job will be deleted from the queue. Reason: {}".format(e))
                self.remove_job(job['_key'])
                return 
            endpoint = req['endpoint']
            wazuh_token = self.wztoken.get_auth_token(url,auth)
            # Checks methods
            if method == 'GET':
                request = self.session.get(
                    url + endpoint, params=req, headers = {'Authorization': f'Bearer {wazuh_token}'},
                    verify=verify).json()
            if method == 'POST':
                request = self.session.post(
                    url + endpoint, data=req, headers = {'Authorization': f'Bearer {wazuh_token}'},
                    verify=verify).json()
            if method == 'PUT':
                request = self.session.put(
                    url + endpoint, data=req, headers = {'Authorization': f'Bearer {wazuh_token}'},
                    verify=verify).json()
            if method == 'DELETE':
                request = self.session.delete(
                    url + endpoint, data=req, headers = {'Authorization': f'Bearer {wazuh_token}'},
                    verify=verify).json()

            if request['error'] == 0:
                # self.mark_as_done(job)
                self.remove_job(job['_key'])
            else:
                raise Exception('Job cannot be executed properly.')
            return request
        except Exception as e:
            self.logger.error('bin.check_queue: Error executing the job in CheckQueue module: {}'.format(e))

    def mark_as_done(self, job):
        """Update the job and mark as done.

        Parameters
        ----------
        str: job_key
            The job key in the kvStore
        """
        try:
            self.logger.debug("bin.check_queue: Marking job as done.")
            job['done'] = True
            self.q.update_job(job, self.auth_key)
        except Exception as e:
            self.logger.error('bin.check_queue: Error updating the job in CheckQueue module: {}'.format(e))

    def remove_job(self, job_key):
        """Remove the job of the queue.

        Parameters
        ----------
        str: job_key
            The job key in the kvStore
        """
        try:
            self.logger.debug("bin.check_queue: Removing job.")
            self.q.remove_job(job_key, self.auth_key)
        except Exception as e:
            self.logger.error('bin.check_queue: Error removing the job in CheckQueue module: {}'.format(e))

    def get_api_credentials(self, api_id):
        """Get API credentials.

        Parameters
        ----------
        str: api_id
            The API id
        """
        try:
            self.logger.debug("bin.check_queue: Getting API credentials.")
            api = self.db.get(api_id, self.auth_key)
            api = jsonbak.loads(api)
            if "data" in api and "messages" in api["data"] and api["data"]["messages"][0] and "type" in api["data"]["messages"][0] and api["data"]["messages"][0]["type"] == "ERROR":
                raise Exception('API does not exist')
            elif api:
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
            'Error at main function in CheckQueue module: {}'.format(e))
