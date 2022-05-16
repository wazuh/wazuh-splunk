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

import json

import splunk.appserver.mrsparkle.controllers as controllers
import splunk.auth as splunk_auth
import utils
from log import log
from splunk.appserver.mrsparkle.lib.decorators import expose_page


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
            controllers.BaseController.__init__(self)
            self.logger = log()
        except Exception as e:
            self.logger.error("Users: Error initializing object")

    @expose_page(methods='GET')
    def get_current_user(self):
        """
        Returns the user logged in.
        """
        self.logger.debug("Users::get_current_user() called")
        try:
            user = splunk_auth.getCurrentUser()
            return json.dumps(user)
        except Exception as e:
            self.logger.error("Users: Error getting Splunk's current user")
            return json.dumps({"error": str(e)})

    @expose_page(methods='GET')
    def get_users(self):
        """
        Returns a list with every user registered in this Splunk's instance.
        """
        self.logger.debug("Users::get_users() called")
        try:
            # The method listUsers() returns an EntityCollection object, which
            # is not JSON serializable. The string representation does not match
            # a JSON representation neither, so a few fixes must be done first.
            # We are going to parse the string representation of the object
            # following the (RFC 8259) standard.
            users = splunk_auth.listUsers().__str__()
            users = utils.to_json(users)
            return json.dumps(users)
        except Exception as e:
            self.logger.error("Users: Error getting internal Splunk's users")
            return json.dumps({"error": str(e)})
