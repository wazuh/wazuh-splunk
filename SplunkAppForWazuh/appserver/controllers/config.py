# -*- coding: utf-8 -*-
"""
Wazuh app - API backend module.

Copyright (C) 2015-2019 Wazuh, Inc.

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

Find more information about this on the LICENSE file.
"""

import jsonbak
import splunk.appserver.mrsparkle.controllers as controllers
from splunk.appserver.mrsparkle.lib.decorators import expose_page
from log import log
from config_storage import ConfigStorage


class Configuration(controllers.BaseController):

    """Queue class.

    Handle Jobs queue methods
    """

    def __init__(self):
        """Constructor."""
        try:
            self.config = ConfigStorage()
            self.logger = log()
            controllers.BaseController.__init__(self)
        except Exception as e:
            self.logger.error(
                "Error in configuration module constructor: %s" % (e))

    @expose_page(must_login=False, methods=['POST'])
    def update_parameter(self, **kwargs):
        """Updates a parameter of the configuration.

        Parameters
        ----------
        kwargs : dict
            Request parameters
        """
        try:
            param = kwargs['parameter']
            result = self.config.update_parameter(param)
            return jsonbak.dumps({"data": result, "error": 0})
        except Exception as e:
            self.logger.error("Error updating the configuration: %s" % (e))
            return jsonbak.dumps({'error': str(e)})

    @expose_page(must_login=False, methods=['GET'])
    def get_config(self):
        """Gets the configuration.

        Parameters
        ----------
        kwargs : dict
            Request parameters
        """
        try:
            config =  self.check_init_config()
            return jsonbak.dumps({"data": config, "error": 0})
        except Exception as e:
            self.logger.error("Error getting the configuration: %s" % (e))
            return jsonbak.dumps({'error': str(e)})

    
    def check_init_config(self):
        """Checks if exist the init configuration, else it will create it.
        """
        try:
            config = self.config.get_config()
            if config:
                self.logger.info("Configuration created")
            else:
                self.logger.info("Configuration is not created yet")
        except Exception as e:
            self.logger.error("Error creating the configuration: %s" % (e))
            return jsonbak.dumps({'error': str(e)})