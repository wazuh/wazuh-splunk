#
# Wazuh app - API backend
# Copyright (C) 2018 Wazuh, Inc.
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# Find more information about this on the LICENSE file.
#
import os
import sys
import json
import requests
import re
import splunk.appserver.mrsparkle.controllers as controllers
import splunk.appserver.mrsparkle.lib.util as util
from splunk.appserver.mrsparkle.lib.util import make_splunkhome_path
from splunk.appserver.mrsparkle.lib.decorators import expose_page
from db import database
from log import log


# This function change the keys for "********" for don't show the password in the app 
def cleanKeys(response): 
    res = response["data"]
    hide = "********"

    # Remove agent key
    if "internal_key" in res:
        res["internal_key"] = hide

    # Remove cluster key (/come/cluster)
    if "node_type" in res and "key" in res:
        res["key"] = hide

    # Remove cluster key (/manager/configuration)
    if "cluster" in res:
        if "node_type" in res["cluster"] and "key" in res["cluster"]:
            res["cluster"]["key"] = hide
    
    # Remove AWS keys
    if "wmodules" in res:
        for wmod in res["wmodules"]:
            if "aws-s3" in wmod:
                if "buckets" in wmod["aws-s3"]:
                    for bucket in wmod["aws-s3"]["buckets"]:
                        for bKey, bVal in bucket.items():
                            bVal["access_key"] = hide
                            bVal["secret_key"] = hide

    # Remove integrations keys
    if "integration" in res:
        for integ in res["integration"]:
            for iKey, iVal in integ.items():
                iVal["api_key"] = hide

    response["data"] = res
    return str(response)

class api(controllers.BaseController):

    def __init__(self):
        self.logger = log()
        try:
            controllers.BaseController.__init__(self)
            self.db = database()
            self.session = requests.Session()
            self.session.trust_env = False
        except Exception as e:
            self.logger.error("Error in API module constructor: %s" % (e))

    # /custom/SplunkAppForWazuh/api/node
    # This will perform an HTTP request to Wazuh API
    # It will return the full API response with including its error codes
    @expose_page(must_login=False, methods=['GET'])
    def request(self, **kwargs):
        try:
            if 'id' not in kwargs or 'endpoint' not in kwargs:
                return json.dumps({'error': 'Missing ID or endpoint.'})
            the_id = kwargs['id']
            api = self.db.get(the_id)
            opt_username = api[0]["userapi"]
            opt_password = api[0]["passapi"]
            opt_base_url = api[0]["url"]
            opt_base_port = api[0]["portapi"]
            opt_endpoint = kwargs["endpoint"]
            del kwargs['id']
            del kwargs['endpoint']
            url = opt_base_url + ":" + opt_base_port
            auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
            verify = False
            request = self.session.get(
                url + opt_endpoint, params=kwargs, auth=auth, verify=verify).json()
            result = json.dumps(cleanKeys(request))
        except Exception as e:
            self.logger.error("Error making API request: %s" % (e))
            return json.dumps({'error': str(e)})
        return result
