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


import json
import requests
import csv
import cStringIO
import splunk.appserver.mrsparkle.controllers as controllers
from splunk.appserver.mrsparkle.lib.decorators import expose_page
from db import database
from log import log
from splunk.clilib import cli_common as cli



class api(controllers.BaseController):
    
    """API class.

    Handle API methods
    """

    def __init__(self):
        """Constructor."""
        try:
            self.logger = log()
            controllers.BaseController.__init__(self)
            self.db = database()
            self.session = requests.Session()
            self.session.trust_env = False
        except Exception as e:
            self.logger.error("Error in API module constructor: %s" % (e))

    def getSelfAdminStanza(self):
        """Get the configuration from a stanza.
        """
        try:
            apikeyconf = cli.getConfStanza('config', 'extensions')
            # parsed_data = json.dumps(apikeyconf)
        except Exception as e:
            raise e
        return apikeyconf

    def clean_keys(self, response):
        """Hide sensible data from API response."""
        try:
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
                                bucket["access_key"] = hide
                                bucket["secret_key"] = hide
            # Remove integrations keys
            if "integration" in res:
                for integ in res["integration"]:
                    integ["api_key"] = hide
            response["data"] = res
            return json.dumps(response)
        except Exception as e:
            raise e

    def format_output(self, arr):
        """Format the data for the CSV file generation.

        Parameters
        ----------
        arr : list
            A list of dicts
        """
        try:
            if isinstance(arr, list):
                for item in arr:
                    if isinstance(item, dict):
                        for key, value in item.iteritems():
                            if isinstance(value, dict):
                                item[key] = json.dumps(value)
                            elif isinstance(value, list):
                                i = 0
                                while i < len(value):
                                    value[i] = str(value[i])
                                    i += 1
                            else:
                                item[key] = str(value)
                    elif isinstance(item, list):
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
    @expose_page(must_login=False, methods=['POST'])
    def request(self, **kwargs):
        """Make requests to the Wazuh API as a proxy backend.

        Parameters
        ----------
        kwargs : dict
            Request parameters
        """
        try:
            if 'id' not in kwargs or 'endpoint' not in kwargs:
                return json.dumps({'error': 'Missing ID or endpoint.'})
            if 'method' not in kwargs:
                method = 'GET'
            elif kwargs['method'] == 'GET':
                del kwargs['method']
                method = 'GET'
            else:
                if str(self.getSelfAdminStanza()['admin']) != 'true':
                    self.logger.error('Admin mode is disabled.')
                    return json.dumps({'error': 'Forbidden. Enable admin mode.'})
                method = kwargs['method']
                del kwargs['method']
            the_id = kwargs['id']
            api = self.db.get(the_id)
            if api:
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
                if method == 'GET':
                    request = self.session.get(
                        url + opt_endpoint, params=kwargs, auth=auth,
                        verify=verify).json()
                if method == 'POST':
                    if 'origin' in kwargs and kwargs['origin'] == 'xmleditor':
                        headers = {'Content-Type': 'application/xml'} 
                        kwargs = str(kwargs['content'])
                        request = self.session.post(url + opt_endpoint, data=kwargs, auth=auth,verify=verify, headers=headers).json()
                    else:
                        request = self.session.post(
                            url + opt_endpoint, data=kwargs, auth=auth,
                            verify=verify).json()
                if method == 'PUT':
                    request = self.session.put(
                        url + opt_endpoint, data=kwargs, auth=auth,
                        verify=verify).json()
                if method == 'DELETE':
                    request = self.session.delete(
                        url + opt_endpoint, data=kwargs, auth=auth,
                        verify=verify).json()
                result = json.dumps(request)
        except Exception as e:
            self.logger.error("Error making API request: %s" % (e))
            return json.dumps({'error': str(e)})
        return result

    @expose_page(must_login=False, methods=['GET'])
    def autocomplete(self, **kwargs):
        """Provisional method for returning the full list of Wazuh API endpoints."""
        try:
            parsed_json = json.dumps([{"method":'PUT',"endpoints":[{"name":'/active-response/:agent_id',"args":[{"name":':agent_id'}]},{"name":'/agents/:agent_id/group/:group_id',"args":[{"name":':agent_id'},{"name":':group_id'}]},{"name":'/agents/:agent_id/restart',"args":[{"name":':agent_id'}]},{"name":'/agents/:agent_id/upgrade',"args":[{"name":':agent_id'}]},{"name":'/agents/:agent_id/upgrade_custom',"args":[{"name":':agent_id'}]},{"name":'/agents/:agent_name',"args":[{"name":':agent_name'}]},{"name":'/agents/groups/:group_id',"args":[{"name":':group_id'}]},{"name":'/agents/restart',"args":[]},{"name":'/rootcheck',"args":[]},{"name":'/rootcheck/:agent_id',"args":[{"name":':agent_id'}]},{"name":'/syscheck',"args":[]},{"name":'/syscheck/:agent_id',"args":[{"name":':agent_id'}]}]},{"method":'DELETE',"endpoints":[{"name":'/agents',"args":[]},{"name":'/agents/:agent_id',"args":[{"name":':agent_id'}]},{"name":'/agents/:agent_id/group',"args":[{"name":':agent_id'}]},{"name":'/agents/:agent_id/group/:group_id',"args":[{"name":':agent_id'},{"name":':group_id'}]},{"name":'/agents/groups',"args":[]},{"name":'/agents/groups/:group_id',"args":[{"name":':group_id'}]},{"name":'/cache',"args":[]},{"name":'/cache',"args":[]},{"name":'/experimental/syscheck',"args":[]},{"name":'/rootcheck',"args":[]},{"name":'/rootcheck/:agent_id',"args":[{"name":':agent_id'}]},{"name":'/syscheck/:agent_id',"args":[{"name":':agent_id'}]}]},{"method":'GET',"endpoints":[{"name":'/agents',"args":[]},{"name":'/agents/:agent_id',"args":[{"name":':agent_id'}]},{"name":'/agents/:agent_id/config/:component/:configuration',"args":[{"name":':agent_id'},{"name":':component'},{"name":':configuration'}]},{"name":'/agents/:agent_id/group/is_sync',"args":[{"name":':agent_id'}]},{"name":'/agents/:agent_id/key',"args":[{"name":':agent_id'}]},{"name":'/agents/:agent_id/upgrade_result',"args":[{"name":':agent_id'}]},{"name":'/agents/groups',"args":[]},{"name":'/agents/groups/:group_id',"args":[{"name":':group_id'}]},{"name":'/agents/groups/:group_id/configuration',"args":[{"name":':group_id'}]},{"name":'/agents/groups/:group_id/files',"args":[{"name":':group_id'}]},{"name":'/agents/groups/:group_id/files/:filename',"args":[{"name":':group_id'},{"name":':filename'}]},{"name":'/agents/"name"/:agent_name',"args":[{"name":':agent_name'}]},{"name":'/agents/no_group',"args":[]},{"name":'/agents/outdated',"args":[]},{"name":'/agents/stats/distinct',"args":[]},{"name":'/agents/summary',"args":[]},{"name":'/agents/summary/os',"args":[]},{"name":'/cache',"args":[]},{"name":'/cache/config',"args":[]},{"name":'/ciscat/:agent_id/results',"args":[{"name":':agent_id'}]},{"name":'/cluster/:node_id/configuration',"args":[{"name":':node_id'}]},{"name":'/cluster/:node_id/info',"args":[{"name":':node_id'}]},{"name":'/cluster/:node_id/logs',"args":[{"name":':node_id'}]},{"name":'/cluster/:node_id/logs/summary',"args":[{"name":':node_id'}]},{"name":'/cluster/:node_id/stats',"args":[{"name":':node_id'}]},{"name":'/cluster/:node_id/stats/hourly',"args":[{"name":':node_id'}]},{"name":'/cluster/:node_id/stats/weekly',"args":[{"name":':node_id'}]},{"name":'/cluster/:node_id/status',"args":[{"name":':node_id'}]},{"name":'/cluster/config',"args":[]},{"name":'/cluster/healthcheck',"args":[]},{"name":'/cluster/node',"args":[]},{"name":'/cluster/nodes',"args":[]},{"name":'/cluster/nodes/:node_name',"args":[{"name":':node_name'}]},{"name":'/cluster/status',"args":[]},{"name":'/decoders',"args":[]},{"name":'/decoders/:decoder_name',"args":[{"name":':decoder_name'}]},{"name":'/decoders/files',"args":[]},{"name":'/decoders/parents',"args":[]},{"name":'/experimental/ciscat/results',"args":[]},{"name":'/experimental/syscollector/hardware',"args":[]},{"name":'/experimental/syscollector/netaddr',"args":[]},{"name":'/experimental/syscollector/netiface',"args":[]},{"name":'/experimental/syscollector/netproto',"args":[]},{"name":'/experimental/syscollector/os',"args":[]},{"name":'/experimental/syscollector/packages',"args":[]},{"name":'/experimental/syscollector/ports',"args":[]},{"name":'/experimental/syscollector/processes',"args":[]},{"name":'/manager/configuration',"args":[]},{"name":'/manager/info',"args":[]},{"name":'/manager/logs',"args":[]},{"name":'/manager/logs/summary',"args":[]},{"name":'/manager/stats',"args":[]},{"name":'/manager/stats/analysisd',"args":[]},{"name":'/manager/stats/hourly',"args":[]},{"name":'/manager/stats/remoted',"args":[]},{"name":'/manager/stats/weekly',"args":[]},{"name":'/manager/status',"args":[]},{"name":'/rootcheck/:agent_id',"args":[{"name":':agent_id'}]},{"name":'/rootcheck/:agent_id/cis',"args":[{"name":':agent_id'}]},{"name":'/rootcheck/:agent_id/last_scan',"args":[{"name":':agent_id'}]},{"name":'/rootcheck/:agent_id/pci',"args":[{"name":':agent_id'}]},{"name":'/rules',"args":[]},{"name":'/rules/:rule_id',"args":[{"name":':rule_id'}]},{"name":'/rules/files',"args":[]},{"name":'/rules/gdpr',"args":[]},{"name":'/rules/groups',"args":[]},{"name":'/rules/pci',"args":[]},{"name":'/syscheck/:agent_id',"args":[{"name":':agent_id'}]},{"name":'/syscheck/:agent_id/last_scan',"args":[{"name":':agent_id'}]},{"name":'/syscollector/:agent_id/hardware',"args":[{"name":':agent_id'}]},{"name":'/syscollector/:agent_id/netaddr',"args":[{"name":':agent_id'}]},{"name":'/syscollector/:agent_id/netiface',"args":[{"name":':agent_id'}]},{"name":'/syscollector/:agent_id/netproto',"args":[{"name":':agent_id'}]},{"name":'/syscollector/:agent_id/os',"args":[{"name":':agent_id'}]},{"name":'/syscollector/:agent_id/packages',"args":[{"name":':agent_id'}]},{"name":'/syscollector/:agent_id/ports',"args":[{"name":':agent_id'}]},{"name":'/syscollector/:agent_id/processes',"args":[{"name":':agent_id'}]}]},{"method":'POST',"endpoints":[{"name":'/agents',"args":[]},{"name":'/agents/insert',"args":[]},{"name":'/agents/restart',"args":[]}]}])
        except Exception as e:
            return json.dumps({'error': str(e)})
        return parsed_json
    
    
    # POST /api/csv : Generates a CSV file with the returned data from API
    @expose_page(must_login=False, methods=['POST'])
    def csv(self, **kwargs):
        """Generate an exportable CSV from request data.

        Parameters
        ----------
        kwargs : dict
            Request parameters
        """
        try:
            if 'id' not in kwargs or 'path' not in kwargs:
                raise Exception("Invalid arguments or missing params.")
            filters = {}
            filters['limit'] = 1000
            filters['offset'] = 0

            if 'filters' in kwargs and kwargs['filters'] != '':
                parsed_filters = json.loads(kwargs['filters'])
                keys_to_delete = []
                for key, value in parsed_filters.iteritems():
                    if parsed_filters[key] == "":
                        keys_to_delete.append(key)
                if len(keys_to_delete) > 0:
                    for key in keys_to_delete:
                        parsed_filters.pop(key, None)
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
            request = self.session.get(
                url + opt_endpoint, params=filters, auth=auth,
                verify=verify).json()
            if ('items' in request['data'] and
                    len(request['data']['items']) > 0):
                final_obj = request["data"]["items"]
                if isinstance(final_obj, list):
                    keys = final_obj[0].keys()
                    self.format_output(keys)
                    final_obj_dict = self.format_output(final_obj)
                    total_items = request["data"]["totalItems"]
                    # initializes CSV buffer
                    if total_items > 0:
                        dict_writer = csv.DictWriter(
                          output_file,
                          delimiter=',',
                          fieldnames=keys,
                          extrasaction='ignore',
                          lineterminator='\n',
                          quotechar='"')
                        # write CSV header
                        dict_writer.writeheader()
                        dict_writer.writerows(final_obj_dict)

                        offset = 0
                        # get the rest of results
                        while offset <= total_items:
                            offset += filters['limit']
                            filters['offset'] = offset
                            req = self.session.get(
                                url + opt_endpoint, params=filters, auth=auth,
                                verify=verify).json()
                            paginated_result = req['data']['items']
                            format_paginated_results = self.format_output(
                                paginated_result)
                            dict_writer.writerows(format_paginated_results)

                        csv_result = output_file.getvalue()
                        self.logger.info('CSV generated successfully.')
                else:
                    csv_result = '[]'
            else:
                csv_result = '[]'
            output_file.close()
        except Exception as e:
            self.logger.error("Error in CSV generation!: %s" % (str(e)))
            return json.dumps({"error": str(e)})
        return csv_result
