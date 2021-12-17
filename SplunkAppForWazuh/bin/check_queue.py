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

import sys
import time

import get_api_by_id as API_services
import jsonbak
import utils
from API_model import API_model
from db import database
from jobs_queue import JobsQueue
from log import log
from wazuh_api import Wazuh_API


class CheckQueue():

    def __init__(self):
        """Constructor."""
        try:
            self.logger = log()
            self.now = time.time()  # Get the date in seconds
            self.auth_key = sys.stdin.readline().strip()
            self.q = JobsQueue()
            self.db = database()
            self.wz_api = Wazuh_API()
        except Exception as e:
            self.logger.error(
                "bin.check_queue: error in the constructor: %s" % (e))

    def init(self):
        """Inits the job"""
        self.logger.debug("bin.check_queue: Checking jobs queue.")
        try:
            jobs = self.q.get_jobs(self.auth_key)
            todo_jobs = self.get_todo_jobs(jobs)
            self.check_todo_jobs(todo_jobs)
            jobs = jsonbak.loads(jobs)
            self.check_todo_jobs(jobs)
        except Exception as e:
            self.logger.error(
                'bin.check_queue: Error at init in the CheckQueue module: {}'.format(e))

    def get_todo_jobs(self, jobs):
        """
        Gets the to do jobs

        Parameters
        ----------
        str: jobs
            A dictionary in string format with the jobs
        """
        self.logger.debug("bin.check_queue: Gettings todo jobs.")
        try:
            jobs = jsonbak.loads(jobs)
            todo_jobs = filter(lambda j: j['done'] == False, jobs)
        except TypeError as e:
            todo_jobs = []
            self.logger.error(
                'bin.check_queue: Error filtering the fields in the CheckQueue module: {}'.format(e))
        return todo_jobs

    def check_todo_jobs(self, jobs):
        """
        Check the to do jobs

        Parameters
        ----------
        dic: jobs
            A dictionary with the todo jobs
        """
        self.logger.debug("bin.check_queue: Checking todo jobs.")
        try:
            for job in jobs:
                if job['exec_time'] < self.now:
                    self.exec_job(job)
        except Exception as e:
            self.logger.error(
                'bin.check_queue: Error checking to do jobs in the CheckQueue module: {}'.format(e))

    def exec_job(self, job):
        """
        Exec the passed job

        Parameters
        ----------
        dic: job
            A dictionary with the job
        """
        self.logger.debug("bin.check_queue: Executing job.")
        try:
            req = job['job']
            method = 'GET'

            # Checks if are missing params
            endpoint = utils.get_parameter(req, 'endpoint')
            api_id = utils.get_parameter(req, 'apiId')

            if 'method' in req.keys() and req['method'] != 'GET':
                method = req['method']
                del req['method']

            try:
                api: API_model = API_services.get_api_by_id(api_id)
            except Exception as e:
                self.logger.error(
                    "bin.check_queue: Error executing the job, job will be"
                    + " deleted from the queue. Reason: {}".format(e))
                self.remove_job(job['_key'])
                return

            # Checks methods
            if method == 'GET':
                response = self.wz_api.make_request(
                    method='GET',
                    endpoint_url=endpoint,
                    kwargs={},
                    current_api=api
                )

            elif method == 'POST':
                response = self.wz_api.make_request(
                    method='POST',
                    endpoint_url=endpoint,
                    kwargs=req,
                    current_api=api
                )

            elif method == 'PUT':
                response = self.wz_api.make_request(
                    method='PUT',
                    endpoint_url=endpoint,
                    kwargs=req,
                    current_api=api
                )

            elif method == 'DELETE':
                response = self.wz_api.make_request(
                    method='DELETE',
                    endpoint_url=endpoint,
                    kwargs=req,
                    current_api=api
                )

            if response['error'] == 0:
                self.remove_job(job['_key'])
            else:
                raise Exception('Job cannot be executed properly.')
            return response
        except Exception as e:
            self.logger.error(
                'bin.check_queue: Error executing the job in CheckQueue module: {}'.format(e))

    def mark_as_done(self, job):
        """
        Update the job and mark as done.

        Parameters
        ----------
        str: job_key
            The job key in the kvStore
        """
        self.logger.debug("bin.check_queue: Marking job as done.")
        try:
            job['done'] = True
            self.q.update_job(job, self.auth_key)
        except Exception as e:
            self.logger.error(
                'bin.check_queue: Error updating the job in CheckQueue module: {}'.format(e))

    def remove_job(self, job_key):
        """
        Remove the job of the queue.

        Parameters
        ----------
        str: job_key
            The job key in the kvStore
        """
        self.logger.debug("bin.check_queue: Removing job.")
        try:
            self.q.remove_job(job_key, self.auth_key)
        except Exception as e:
            self.logger.error(
                'bin.check_queue: Error removing the job in CheckQueue module: {}'.format(e))


if __name__ == '__main__':
    try:
        cq = CheckQueue()
        cq.init()
    except Exception as e:
        log().error(
            'Error at main function in CheckQueue module: {}'.format(e))
