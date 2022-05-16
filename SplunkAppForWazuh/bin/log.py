# -*- coding: utf-8 -*-
"""
Wazuh app - Logs management backend.

Copyright (C) 2015-2022 Wazuh, Inc.

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

Find more information about this on the LICENSE file.
"""

import logging

from splunk.appserver.mrsparkle.lib.util import make_splunkhome_path
from splunk.clilib import cli_common as cli

import tailer

_APPNAME = 'SplunkAppForWazuh'

loggers = {}


class log():
    """Handle Wazuh app logs."""

    def __init__(self):
        """Setup a logger for the REST handler."""
        global loggers
        self.config = self.get_config_on_memory()
        self.debug_enabled = True if self.config['log.level'] == 'debug' else False

        if loggers.get('splunk.appserver.%s.controllers.logs' % _APPNAME):
            self.logger = loggers.get(
                'splunk.appserver.%s.controllers.logs' % _APPNAME)
        else:
            self.logger = logging.getLogger(
                'splunk.appserver.%s.controllers.logs' % _APPNAME)
            try:
                self.logger.propagate = False
                self.logger.setLevel(logging.DEBUG)
                self.file_handler = logging.handlers.RotatingFileHandler(
                    make_splunkhome_path(
                        ['var', 'log', 'splunk', 'SplunkAppForWazuh.log']),
                    maxBytes=100000000,
                    backupCount=50
                )
                self.formatter = logging.Formatter(
                    "%(levelname)s: %(asctime)s: '%(message)s'", "%Y/%m/%d %H:%M:%S")
                self.file_handler.setFormatter(self.formatter)
                self.logger.addHandler(self.file_handler)
                loggers['splunk.appserver.%s.controllers.logs' %
                        _APPNAME] = self.logger
            except Exception as e:
                self.error('[log.py][constructor] %s' % (e))
                raise e

    def error(self, msg):
        """Error log message."""
        enable_exc_info = True if self.debug_enabled else False
        self.logger.error(msg, exc_info=enable_exc_info)

    def info(self, msg):
        """Info log message."""
        self.logger.info(msg)

    def debug(self, msg):
        """Info messages if debug is enabled."""
        if self.debug_enabled:
            self.logger.debug(msg)

    def get_last_log_lines(self, lines):
        """Return the last logs messages."""
        try:
            current_tail = tailer.tail(open(make_splunkhome_path(
                ['var', 'log', 'splunk', 'SplunkAppForWazuh.log'])), lines)
            result = list(reversed(current_tail))
        except Exception as e:
            self.error('[log.py][get_last_log_lines] %s' % (e))
            raise e
        return result

    def get_config_on_memory(self):
        try:
            config = cli.getConfStanza("config", "configuration")
            return config
        except Exception as e:
            self.logger.error(
                "log: Error getting the configuration on memory: %s" % (e))
            raise e
