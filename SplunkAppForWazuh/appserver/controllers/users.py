# -*- coding: utf-8 -*-
"""
Wazuh app - API backend module.

Copyright (C) 2015-2021 Wazuh, Inc.

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

Find more information about this on the LICENSE file.
"""

import splunk.appserver.mrsparkle.controllers as controllers
from splunk.appserver.mrsparkle.lib.decorators import expose_page
from log import log

import json
import splunk.auth as splunk_auth

class Users(controllers.BaseController):
    """
    Users class

    Implements methods to retrieve users registered in Splunk.
    """

    def __init__(self):
        """
        Constructor
        """
        try:
            # super(self)
            controllers.BaseController.__init__(self)
            self.logger = log()
        except Exception as e:
            self.logger.error("Users: Error initializing object")

    @expose_page(methods='GET')
    def get_current_user(self):
        """
        """
        try:
            self.logger.debug("Users: get_current_user()")
            user = splunk_auth.getCurrentUser()

            return user
        except Exception as e:
            self.logger.error("Users: Error getting Splunk's current user")
            return json.dumps({"error": str(e)})

    @expose_page(methods='GET')
    def get_users(self):
        """
        """
        try:
            self.logger.debug("Users: get_users()")
            users = splunk_auth.listUsers()

            return users
        except Exception as e:
            self.logger.error("Users: Error getting internal Splunk's users")
            return json.dumps({"error": str(e)})
