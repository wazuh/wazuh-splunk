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


class CheckQueue():

    def __init__(self):
        """Constructor."""
        self.logger = log()
        self.now = time.time()  # Get the date in seconds
        self.session = requestsbak.Session()
        self.auth_key = sys.stdin.readline().strip()
        self.q = JobsQueue()

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
        job_key = job['_key']
        req = job['job']
        #Job to execute

if __name__ == '__main__':
    try:
        cq = CheckQueue()
        cq.init()
    except Exception as e:
        log().error(
            'Error checking the jobs queue on CheckQueue module: {}'.format(e))
