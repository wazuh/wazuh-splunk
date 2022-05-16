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

import jsonbak
import splunk.appserver.mrsparkle.controllers as controllers
from edit_config import EditConfig
from log import log
from splunk.appserver.mrsparkle.lib.decorators import expose_page


class Configuration(controllers.BaseController):

    """Queue class.

    Handle Jobs queue methods
    """

    def __init__(self):
        """Constructor."""
        try:
            self.config = EditConfig()
            self.logger = log()
            controllers.BaseController.__init__(self)
        except Exception as e:
            self.logger.error(
                "config: Error in configuration module constructor: %s" % (e))

    @expose_page(must_login=False, methods=['POST'])
    def update_config(self, **kwargs):
        """Updates a parameter of the configuration.

        Parameters
        ----------
        kwargs : dict
            Request parameters
        """
        try:
            self.logger.debug("config: Updating configuration.")
            result = self.config.update_config(kwargs)
            return jsonbak.dumps(
                {
                    "data": result, "error": 0
                }
            )
        except Exception as e:
            self.logger.error(
                "config: Error updating the configuration: %s" % (e))
            return jsonbak.dumps(
                {
                    'error': str(e)
                }
            )

    @expose_page(must_login=False, methods=['GET'])
    def get_config(self):
        """Gets the configuration.

        Parameters
        ----------
        kwargs : dict
            Request parameters
        """
        try:
            self.logger.debug("config: Reading the config.conf file.")
            config = self.config.get_config()
            return jsonbak.dumps(
                {
                    "data": config, "error": 0
                }
            )
        except Exception as e:
            self.logger.error(
                "config: Error getting the configuration: %s" % (e))
            return jsonbak.dumps(
                {
                    'error': str(e)
                }
            )
