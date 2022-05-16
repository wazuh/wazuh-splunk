# -*- coding: utf-8 -*-
"""
Wazuh app - API backend module.

Copyright (C) 2015-2022 Wazuh, Inc.

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

Find more information about this on the LICENSE file.
"""

import time

import jsonbak
import splunk.appserver.mrsparkle.controllers as controllers
from jobs_queue import JobsQueue
from log import log
from splunk.appserver.mrsparkle.lib.decorators import expose_page


class Queue(controllers.BaseController):

    """Queue class.

    Handle Jobs queue methods
    """

    def __init__(self):
        """Constructor."""
        try:
            self.queue = JobsQueue()
            self.logger = log()
            controllers.BaseController.__init__(self)
        except Exception as e:
            self.logger.error(
                "queue: Error in Jobs queue module constructor: %s" % (e))

    @expose_page(must_login=False, methods=['POST'])
    def add_job(self, **kwargs):
        """Add job to the queue.

        Parameters
        ----------
        kwargs : dict
            Request parameters
        """
        try:
            self.logger.debug("queue: Adding job to the jobs queue.")
            now = time.time()
            exec_time = now + float(kwargs['delay'])
            del kwargs['delay']
            job = {
                "job": kwargs,
                "added": now,
                "exec_time": exec_time,
                "done": 0
            }
            self.queue.insert_job(job)
            return jsonbak.dumps(
                {
                    "data": "Job added to the queue.", "error": 0
                }
            )
        except Exception as e:
            self.logger.error("queue: Error adding job: %s" % (e))
            return jsonbak.dumps(
                {
                    'error': str(e)
                }
            )
