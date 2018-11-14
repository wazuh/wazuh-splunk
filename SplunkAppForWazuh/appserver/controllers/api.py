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
import csv
import cStringIO
import splunk.appserver.mrsparkle.controllers as controllers
import splunk.appserver.mrsparkle.lib.util as util
from splunk.appserver.mrsparkle.lib.util import make_splunkhome_path
from splunk.appserver.mrsparkle.lib.decorators import expose_page
from db import database
from log import log


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
            result = json.dumps(request)
        except Exception as e:
            self.logger.error("Error making API request: %s" % (e))
            return json.dumps({'error': str(e)})
        return result

    
    @expose_page(must_login=False, methods=['POST'])
    def csv(self, **kwargs):
        try:
            self.logger.info('Entring CSV route')

            if 'payload[id]' not in kwargs or 'payload[path]' not in kwargs:
                #missing_params = diff_keys_dic_update_api(kwargs)
                raise Exception("Invalid arguments, missing params. Already got these params : %s" % str(kwargs))
            filters = {}
            filters['limit'] = 1000
            filters['offset'] = 0
            self.logger.info('Declaring filters route')

            # if 'payload[filters]' in kwargs:
            #     for key, value in kwargs['payload[filters]'].iteritems():
            #         filters[key] = value
            the_id = kwargs['payload[id]']
            api = self.db.get(the_id)
            opt_username = api[0]["userapi"]
            opt_password = api[0]["passapi"]
            opt_base_url = api[0]["url"]
            opt_base_port = api[0]["portapi"]
            opt_endpoint = kwargs['payload[path]']
            del kwargs['payload[id]']
            del kwargs['payload[path]']
            url = opt_base_url + ":" + opt_base_port
            auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
            verify = False
            # init csv writer
            output_file = cStringIO.StringIO()
            # get total items and keys
            request = self.session.get(url + opt_endpoint, params=filters, auth=auth, verify=verify).json()
            final_obj = request["data"]["items"]
            # for item in final_obj_dict:
            #     if item typeof
            total_items = request["data"]["totalItems"]
            keys = final_obj[0].keys()
            # initializes CSV buffer
            dict_writer = csv.DictWriter(output_file, delimiter=',',fieldnames=keys,extrasaction='ignore',lineterminator='\n')
            dict_writer.writerow(final_obj)

            # write CSV header
            dict_writer.writeheader()
            offset = 1000
            # get the rest of results
            while offset < total_items:
                offset+=filters['limit']
                filters['offset']=offset
                req = self.session.get(url + opt_endpoint, params=filters, auth=auth, verify=verify).json()
                dict_writer.writerow(req['data']['items'])

            csv_result = output_file.getvalue()
            output_file.close()
        except Exception as e:
            self.logger.error("Error in CSV generation!: %s" % (e))
            return json.dumps({"error":str(e)})
        return csv_result
