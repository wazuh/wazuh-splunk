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

    def format(self,arr):
        try:
            if isinstance(arr,list):
                for item in arr:
                    if isinstance(item,dict):
                        for key, value in item.iteritems():
                            if isinstance(value,dict):
                                item[key] = json.dumps(value)
                            elif isinstance(value,list):
                                i = 0
                                while i < len(value):
                                    value[i] = str(value[i])
                                    i += 1
                            else:
                                item[key] = str(value)
                    elif isinstance(item,list):
                        for each in item:
                            each = str(each)
                    else:
                        item = str(item)
            return arr
        except Exception as e:
            raise e

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
            if 'id' not in kwargs or 'path' not in kwargs:
                raise Exception("Invalid arguments or missing params.")
            filters = {}
            filters['limit'] = 1000
            filters['offset'] = 0

            if 'filters' in kwargs and kwargs['filters'] != '':
                parsed_filters = json.loads(kwargs['filters'])
                keys_to_delete = []
                for key,value in parsed_filters.iteritems():
                    if parsed_filters[key] == "":
                        keys_to_delete.append(key)
                if len(keys_to_delete) > 0:
                    for key in keys_to_delete:
                        parsed_filters.pop(key,None)
                filters.update(parsed_filters)
            
            the_id = kwargs['id']
            api = self.db.get(the_id)
            opt_username = api[0]["userapi"]
            opt_password = api[0]["passapi"]
            opt_base_url = api[0]["url"]
            opt_base_port = api[0]["portapi"]
            opt_endpoint = kwargs['path']
            del kwargs['id']
            del kwargs['path']
            url = opt_base_url + ":" + opt_base_port
            auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
            verify = False
            # init csv writer
            output_file = cStringIO.StringIO()
            # get total items and keys
            request = self.session.get(url + opt_endpoint, params=filters, auth=auth, verify=verify).json()
            self.logger.info('Data items: %s ' % (request['data']['items']))
            self.logger.info('Items length: %s ' % (len(request['data']['items'])))
            if 'items' in request['data'] and len(request['data']['items']) > 0:
                final_obj = request["data"]["items"]
                if isinstance(final_obj,list):
                    keys = final_obj[0].keys()
                    self.format(keys)
                    final_obj_dict = self.format(final_obj)
                    total_items = request["data"]["totalItems"]
                    # initializes CSV buffer
                    if total_items > 0:
                        dict_writer = csv.DictWriter(output_file, delimiter=',',fieldnames=keys,extrasaction='ignore',lineterminator='\n',quotechar='"')
                        # write CSV header
                        dict_writer.writeheader()
                        dict_writer.writerows(final_obj_dict)

                        offset = 0
                        # get the rest of results
                        while offset <= total_items:
                            offset+=filters['limit']
                            filters['offset']=offset
                            req = self.session.get(url + opt_endpoint, params=filters, auth=auth, verify=verify).json()
                            paginated_result = req['data']['items']
                            format_paginated_results = self.format(paginated_result)
                            dict_writer.writerows(format_paginated_results)

                        csv_result = output_file.getvalue()
                        self.logger.info('CSV generated successfully.')
                else:
                    csv_result = '[]'
            else:
                self.logger.info('Else')
                csv_result = '[]'
            output_file.close()

        except Exception as e:
            self.logger.error("Error in CSV generation!: %s" % (str(e)))
            return json.dumps({"error":str(e)})
        return csv_result
