#
# Wazuh app - api backend
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
import os
import sys
import json
import requests
import re
# from splunk import AuthorizationFailed as AuthorizationFailed
import splunk.appserver.mrsparkle.controllers as controllers
import splunk.appserver.mrsparkle.lib.util as util
from splunk.appserver.mrsparkle.lib.util import make_splunkhome_path
from splunk.appserver.mrsparkle.lib.decorators import expose_page
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "."))
from db import database

_APPNAME = 'SplunkAppForWazuh'
def setup_logger(level):
    """
    Setup a logger for the REST handler.
    """
    logger = logging.getLogger('splunk.appserver.%s.controllers.api' % _APPNAME)
    logger.propagate = False  # Prevent the log messages from being duplicated in the python.log file
    logger.setLevel(level)
    file_handler = logging.handlers.RotatingFileHandler(make_splunkhome_path(['var', 'log', 'splunk', 'api.log']), maxBytes=25000000, backupCount=5)
    formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s')
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)
    return logger
logger = setup_logger(logging.DEBUG)

class api(controllers.BaseController):

    def __init__(self):
      controllers.BaseController.__init__(self)
      self.db = database()
      self.session = requests.Session()
      self.session.trust_env = False

    # /custom/SplunkAppForWazuh/api/node
    @expose_page(must_login=False, methods=['GET'])
    def request(self, **kwargs):
      try:
        # token_data = jwt.decode(kwargs['token'],'myToken', algorithm='HS256')
        # token_data = json.dumps(token_data)
        if 'id' not in kwargs or 'endpoint' not in kwargs:
            return json.dumps({'error':'Missing ID or endpoint.'})
        the_id = kwargs['id']
        api = self.db.get(the_id)
        logger.info("Result making API request: %s" % (api))

        opt_username = api[0]["userapi"]
        opt_password = api[0]["passapi"]
        opt_base_url = api[0]["url"]
        opt_base_port = api[0]["portapi"]
        opt_endpoint = kwargs["endpoint"]

        url = opt_base_url + ":" + opt_base_port
        auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
        verify = False
        request = self.session.get(url + opt_endpoint, params=kwargs , auth=auth, verify=verify).json()
        result = json.dumps(request)

      except Exception as e:
        logger.error("Error making API request: %s" % (e))
        return json.dumps({'error':str(e)})
      return result