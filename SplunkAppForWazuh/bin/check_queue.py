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
from queue import Queue


class CheckQueue():

    def __init__(self):
        """Constructor."""
        self.logger = log()
        self.now = time.time()  # Get the date in seconds
        self.session = requestsbak.Session()
        self.auth_key = sys.stdin.readline().strip()
        self.q = Queue()

    def check_jobs(self):
        jobs = self.q.get_jobs(self.auth_key)

if __name__ == '__main__':
    cq = CheckQueue()
    cq.check_jobs()
