#
# Wazuh app - Cluster backend
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
_APPNAME = 'wazuh'
def setup_logger(level):
    """
    Setup a logger for the REST handler.
    """
    logger = logging.getLogger('splunk.appserver.%s.controllers.cluster' % _APPNAME)
    logger.propagate = False  # Prevent the log messages from being duplicated in the python.log file
    logger.setLevel(level)
    file_handler = logging.handlers.RotatingFileHandler(make_splunkhome_path(['var', 'log', 'splunk', 'cluster.log']), maxBytes=25000000, backupCount=5)
    formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s')
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)
    return logger
logger = setup_logger(logging.DEBUG)

class cluster(controllers.BaseController):

        # /custom/SplunkAppForWazuh/cluster/node
    @expose_page(must_login=False, methods=['GET'])
    def node(self, **kwargs):
      try:
        opt_username = kwargs["user"]
        opt_password = kwargs["pass"]
        opt_base_url = kwargs["ip"]
        opt_base_port = kwargs["port"]

        url = opt_base_url + ":" + opt_base_port
        auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
        verify = False
        final_url = url + '/cluster/node'
        request = requests.get(final_url, auth=auth, verify=verify)
        cluster = json.loads(request.text)["data"]

      except Exception as e:
        return json.dumps("{error:"+str(e)+"}")
      return json.dumps(cluster)