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
import logging
from pygtail import Pygtail
from splunk.appserver.mrsparkle.lib.util import make_splunkhome_path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "."))
from tail import tail

_APPNAME = 'SplunkAppForWazuh'


class log():
    def __init__(self):
        """
        Setup a logger for the REST handler.
        """
        self.logger = logging.getLogger(
            'splunk.appserver.%s.controllers.agents' % _APPNAME)
        # Prevent the log messages from being duplicated in the python.log file
        self.logger.propagate = False
        self.logger.setLevel(logging.DEBUG)
        self.file_handler = logging.handlers.RotatingFileHandler(make_splunkhome_path(
            ['var', 'log', 'splunk', 'SplunkAppForWazuh.log']), maxBytes=100000000, backupCount=5)
        self.formatter = logging.Formatter(
            '%(asctime)s %(levelname)s %(message)s')
        self.file_handler.setFormatter(self.formatter)
        self.logger.addHandler(self.file_handler)

    def error(self, msg):
        self.logger.error(msg)

    def info(self, msg):
        self.logger.info(msg)

    def get_last_log_lines(self, lines, file_name):
        current_tail = tail(lines, file_name)
        return current_tail.make_tail()
