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
import requestsbak
from wazuhtoken import wazuhtoken
import csv
from io import StringIO
import json
import splunk.appserver.mrsparkle.controllers as controllers
from splunk.appserver.mrsparkle.lib.decorators import expose_page
from db import database
from log import log
from splunk.clilib import cli_common as cli
from requirements import pci_requirements,gdpr_requirements,hipaa_requirements,nist_requirements
import time
import api_info

class api(controllers.BaseController):
    
    """API class.

    Handle API methods
    """

    def __init__(self):
        """Constructor."""
        try:
            self.logger = log()
            self.wztoken = wazuhtoken()
            self.config =  self.get_config_on_memory()
            self.timeout = int(self.config['timeout'])
            self.db = database("credentials")
            controllers.BaseController.__init__(self)
            self.session = requestsbak.Session()
            self.session.trust_env = False
        except Exception as e:
            self.logger.error("api: Error in API module constructor: %s" % (e))

    def get_credentials(self, the_id):
        try:
            self.logger.debug("api: Getting API credentials.")
            api = self.db.get(the_id)
            api = jsonbak.loads(api)
            if api:
                opt_username = api['data']["userapi"]
                opt_password = api['data']["passapi"]
                opt_base_url = api['data']["url"]
                opt_base_port = api['data']["portapi"]
                url = str(opt_base_url) + ":" + str(opt_base_port)
                auth = requestsbak.auth.HTTPBasicAuth(opt_username, opt_password)
                verify = False
                cluster_enabled = True if api['data']['filterType'] == "cluster.name" else False
                return url, auth, verify, cluster_enabled
            else:
                raise Exception('API not found')
        except Exception as e:
            raise e

    def getSelfAdminStanza(self):
        """Get the configuration from a stanza.
        """
        try:
            apikeyconf = cli.getConfStanza('config', 'configuration')
            # parsed_data = jsonbak.dumps(apikeyconf)
        except Exception as e:
            raise e
        return apikeyconf

    def clean_keys(self, response):
        """Hide sensible data from API response."""
        try:
            self.logger.debug("api: Offuscating keys.")
            hide = "********"
            if "data" in response and type(response["data"]) == dict:
                # Remove agent key
                if "internal_key" in response["data"]:
                    response["data"]["internal_key"] = hide
                
                # Remove cluster key (/come/cluster)
                if "node_type" in response["data"]:
                    if "key" in response["data"]:
                        response["data"]["key"] = hide
                
                # Remove cluster key (/manager/configuration)
                if "cluster" in response["data"]:
                    if "node_type" in response["data"]["cluster"] and "key" in response["data"]["cluster"]:
                        response["data"]["cluster"]["key"] = hide
                
                # Remove AWS keys
                if "wmodules" in response["data"]:
                    for wmod in response["data"]["wmodules"]:
                        if "aws-s3" in wmod:
                            if "buckets" in wmod["aws-s3"]:
                                for bucket in wmod["aws-s3"]["buckets"]:
                                    bucket["access_key"] = hide
                                    bucket["secret_key"] = hide
                            if "services" in wmod["aws-s3"]:
                                for service in wmod["aws-s3"]["services"]:
                                    service["access_key"] = hide
                                    service["secret_key"] = hide

                # Remove integrations keys
                if "integration" in response["data"]:
                    for integ in response["data"]["integration"]:
                        integ["api_key"] = hide
            return response
        except Exception as e:
            self.logger.error("api: Error while cleaning keys in request response: %s" % (e))
            raise e

    def format_output(self, arr):
        """Format the data for the CSV file generation.

        Parameters
        ----------
        arr : list
            A list of dicts
        """
        try:
            self.logger.debug("api: Formatting data to generate CSV file.")
            if isinstance(arr, list):
                for item in arr:
                    if isinstance(item, dict):
                        for key, value in item.items():
                            if isinstance(value, dict):
                                item[key] = jsonbak.dumps(value)
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


    def catch_Exceptions(self, request):
        try:
            if request.status_code != 200: 
                raise Exception(request.json())
            return request.json()
        except Exception as e:
            raise e

    def make_request(self, method, url, opt_endpoint, kwargs, auth, verify, counter = 3):
        try:
            socket_errors = (1013, 1014, 1017, 1018, 1019)
            wazuh_token = self.wztoken.get_auth_token(url,auth)
            if method == 'GET':
                if 'origin' in kwargs:
                    if kwargs['origin'] == 'xmlreader':
                        request_xml = self.session.get(
                            url + opt_endpoint, headers = {'Authorization': f'Bearer {wazuh_token}'},
                            verify=verify).content
                        json_response = json.dumps({'data': request_xml.decode("utf-8")})
                        json_load = json.loads(json_response)
                        request = json_load
                        return request
                    if kwargs['origin'] == 'raw':
                        response = self.session.get(
                            url + opt_endpoint, headers = {'Authorization': f'Bearer {wazuh_token}'},
                            verify=verify)
                        return json.loads(json.dumps({'data': response.content.decode("utf-8") }))
                else:
                    request = self.session.get(
                        url + opt_endpoint, params=kwargs, headers = {'Authorization': f'Bearer {wazuh_token}'},
                        verify=verify)
                    request = self.catch_Exceptions(request)

            if method == 'POST':
                if 'origin' in kwargs:
                    if kwargs['origin'] == 'xmleditor':
                        headers = {'Content-Type': 'application/xml', 'Authorization': f'Bearer {wazuh_token}'} 
                    elif kwargs['origin'] == 'json':
                        headers = {'Content-Type':  'application/json', 'Authorization': f'Bearer {wazuh_token}'} 
                    elif kwargs['origin'] == 'raw':
                        headers = {'Content-Type':  'application/octet-stream', 'Authorization': f'Bearer {wazuh_token}'} 
                    kwargs = str(kwargs['content'])
                    request = self.session.post(url + opt_endpoint, data=kwargs ,verify=verify, headers=headers)
                    request = self.catch_Exceptions(request)
                else:
                    request = self.session.post(
                        url + opt_endpoint, data=kwargs, headers = {'Authorization': f'Bearer {wazuh_token}'} ,
                        verify=verify)
                    request = self.catch_Exceptions(request)


            if method == 'PUT':
                if 'origin' in kwargs:
                    if kwargs['origin'] == 'xmleditor':
                        headers = {'Content-Type': 'application/xml', 'Authorization': f'Bearer {wazuh_token}'} 
                    elif kwargs['origin'] == 'json':
                        headers = {'Content-Type':  'application/json', 'Authorization': f'Bearer {wazuh_token}'} 
                    elif kwargs['origin'] == 'raw':
                        headers = {'Content-Type':  'application/octet-stream', 'Authorization': f'Bearer {wazuh_token}'}
                    kwargs = str(kwargs['content'])
                    request = self.session.put(url + opt_endpoint, data=kwargs ,verify=verify, headers=headers)
                    request = self.catch_Exceptions(request)

                elif opt_endpoint == '/agents/group':
                    request = self.session.put(
                        url + opt_endpoint, params=kwargs, headers = {'Authorization': f'Bearer {wazuh_token}'},
                        verify=verify)
                    request = self.catch_Exceptions(request)

                else:
                    request = self.session.put(
                        url + opt_endpoint, data=kwargs, headers = {'Authorization': f'Bearer {wazuh_token}'},
                        verify=verify)
                    request = self.catch_Exceptions(request)
                    
            if method == 'DELETE':
                request = self.session.delete(
                    url + opt_endpoint, data=kwargs, headers = {'Authorization': f'Bearer {wazuh_token}'},
                    verify=verify).json()
            self.logger.debug("api: %s: %s%s - %s" % (method, url, opt_endpoint, kwargs))    
            if request['error'] and request['error'] in socket_errors:
                self.logger.debug("api: Trying the previous request again.")                    
                if counter > 0:
                    time.sleep(0.5)
                    return self.make_request(method, url, opt_endpoint, kwargs, auth, verify, counter - 1)
                else:                    
                    raise Exception("Tried to execute %s %s three times with no success, aborted." % (method, opt_endpoint))
            return self.clean_keys(request)
        except Exception as e:
            self.logger.error("api: Error while requesting to Wazuh API: %s" % (e))
            raise e

    def exec_request(self, kwargs):
        try:
            if 'id' not in kwargs or 'endpoint' not in kwargs:
                return jsonbak.dumps({'error': 'Missing ID or endpoint.'})
            if 'method' not in kwargs:
                method = 'GET'
            elif kwargs['method'] == 'GET':
                del kwargs['method']
                method = 'GET'
            else:
                if str(self.getSelfAdminStanza()['admin']) != 'true':
                    self.logger.error('Admin mode is disabled.')
                    return jsonbak.dumps({'error': 'Forbidden. Enable admin mode.'})
                method = kwargs['method']
                del kwargs['method']
            the_id = kwargs['id']
            url, auth, verify, cluster_enabled = self.get_credentials(the_id)
            opt_endpoint = kwargs["endpoint"]
            del kwargs['id']
            del kwargs['endpoint']
            daemons_ready = self.check_daemons(url, auth, verify, cluster_enabled)
            if not daemons_ready:
                return jsonbak.dumps({"status": "200", "error": 3099, "message": "Wazuh not ready yet."})
            request = self.make_request(method, url, opt_endpoint, kwargs, auth, verify)
            self.logger.info(request)   
            result = jsonbak.dumps(request)
        except Exception as e:
            self.logger.error("Error making API request: %s" % (e))
            return jsonbak.dumps({'error': str(e)})
        return result

    def check_daemons(self, url, auth, verify, check_cluster):
        """ Request to check the status of this daemons: execd, modulesd, wazuhdb and clusterd

        Parameters
        ----------
        url: str
        auth: str
        verify: str
        cluster_enabled: bool
        """
        try:
            self.logger.debug("api: Checking Wazuh daemons.")
            wazuh_token = self.wztoken.get_auth_token(url,auth)
            request_cluster = self.session.get(
                url + '/cluster/status', headers = {'Authorization': f'Bearer {wazuh_token}'}, timeout=self.timeout, verify=verify).json()
            # Try to get cluster is enabled if the request fail set to false
            try:
                cluster_enabled = request_cluster['data']['enabled'] == 'yes'
            except Exception as e:
                cluster_enabled = False
            cc = check_cluster and cluster_enabled # Var to check the cluster demon or not
            opt_endpoint = "/manager/status"
            daemons_status = self.session.get(
                    url + opt_endpoint, headers = {'Authorization': f'Bearer {wazuh_token}'},
                    verify=verify).json()
            if not daemons_status['error']:
                d = daemons_status['data']['affected_items'][0]
                daemons = {"execd": d['wazuh-execd'], "modulesd": d['wazuh-modulesd'], "db": d['wazuh-db']}
                if cc:
                    daemons['clusterd'] = d['wazuh-clusterd']
                values = list(daemons.values())
                wazuh_ready = len(set(values)) == 1 and values[0] == "running" # Checks all the status are equals, and running
                checked_debug_msg = "Wazuh daemons ready" if wazuh_ready else "Wazuh daemons not ready yet"
                self.logger.debug("api: %s" % checked_debug_msg)
                return wazuh_ready
        except Exception as e:
            self.logger.error("api: Error checking daemons: %s" % (e))
            raise e


    @expose_page(must_login=False, methods=['POST'])
    def wazuh_ready(self, **kwargs):
        """Endpoint to check daemons status.

        Parameters
        ----------
        kwargs : dict
            Request parameters
        """
        try:
            self.logger.debug("api: Checking if Wazuh is ready.")
            if 'apiId' not in kwargs:
                return jsonbak.dumps({'error': 'Missing API ID.'})
            the_id = kwargs['apiId']
            url, auth, verify, cluster_enabled = self.get_credentials(the_id)
            daemons_ready = self.check_daemons(url, auth, verify, cluster_enabled)
            msg = "Wazuh is now ready." if daemons_ready else "Wazuh not ready yet."
            self.logger.debug("api: %s" % msg)
            return jsonbak.dumps({"status": "200", "ready": daemons_ready, "message": msg})
        except Exception as e:
            self.logger.error("api: Error checking daemons: %s" % (e))
            return jsonbak.dumps({"status": "200", "ready": False, "message": "Error getting the Wazuh daemons status."})

    @expose_page(must_login=False, methods=['POST'])
    def request(self, **kwargs):
        """Make requests to the Wazuh API as a proxy backend.

        Parameters
        ----------
        kwargs : dict
            Request parameters
        """
        try:
            self.logger.debug("api: Preparing request.")
            if 'apiId' not in kwargs or 'endpoint' not in kwargs:
                return jsonbak.dumps({'error': 'Missing ID or endpoint.'})
            if 'method' not in kwargs:
                method = 'GET'
            elif kwargs['method'] == 'GET':
                del kwargs['method']
                method = 'GET'
            else:
                if str(self.getSelfAdminStanza()['admin']) != 'true':
                    self.logger.error('api: Admin mode is disabled.')
                    return jsonbak.dumps({'error': 'Forbidden. Enable admin mode.'})
                method = kwargs['method']
                del kwargs['method']
            the_id = kwargs['apiId']
            url, auth, verify, cluster_enabled = self.get_credentials(the_id)
            opt_endpoint = kwargs["endpoint"]
            del kwargs['apiId']
            del kwargs['endpoint']
            daemons_ready = self.check_daemons(url, auth, verify, cluster_enabled)
            if not daemons_ready:
                return jsonbak.dumps({"status": "200", "error": 3099, "message": "Wazuh not ready yet."})
            request = self.make_request(method, url, opt_endpoint, kwargs, auth, verify)
            result = jsonbak.dumps(request)
        except Exception as e:
            self.logger.error("api: Error making API request: %s" % (e))
            return jsonbak.dumps({'error': str(e)})
        return result

    @expose_page(must_login=False, methods=['GET'])
    def autocomplete(self, **kwargs):
        """Provisional method for returning the full list of Wazuh API endpoints."""
        try:
            self.logger.debug("Returning autocomplete for devtools.")
            return api_info.get_api_endpoints()
        except Exception as e:
            return jsonbak.dumps({'error': str(e)})
    
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
            self.logger.debug("api: Generating CSV file.")
            if 'id' not in kwargs or 'path' not in kwargs:
                raise Exception("Invalid arguments or missing params.")
            filters = {}
            filters['limit'] = 500
            filters['offset'] = 0

            if 'filters' in kwargs and kwargs['filters'] != '':
                parsed_filters = jsonbak.loads(kwargs['filters'])
                keys_to_delete = []
                for key, value in parsed_filters.items():
                    if parsed_filters[key] == "":
                        keys_to_delete.append(key)
                if len(keys_to_delete) > 0:
                    for key in keys_to_delete:
                        parsed_filters.pop(key, None)
                filters.update(parsed_filters)

            the_id = kwargs['id']
            api = self.db.get(the_id)
            api = jsonbak.loads(api)
            opt_username = api["data"]["userapi"]
            opt_password = api["data"]["passapi"]
            opt_base_url = api["data"]["url"]
            opt_base_port = api["data"]["portapi"]
            opt_endpoint = kwargs['path']
            url = str(opt_base_url) + ":" + str(opt_base_port)
            auth = requestsbak.auth.HTTPBasicAuth(opt_username, opt_password)
            verify = False
            wazuh_token = self.wztoken.get_auth_token(url,auth)
            is_list_export_keys_values = "lists/files" in opt_endpoint

            # init csv writer
            output_file = StringIO()
            # get total items and keys
            request = self.session.get(
                url + opt_endpoint, params=None if is_list_export_keys_values else filters, headers = {'Authorization': f'Bearer {wazuh_token}'},
                verify=verify).json()
            self.logger.debug("api: Data obtained for generate CSV file.")
            if ('affected_items' in request['data'] and
                    len(request['data']['affected_items']) > 0):
                # Export CSV the CDB List keys and values
                if is_list_export_keys_values:
                    items_list = [{"Key": k,"Value": v} for k,v in request["data"]["affected_items"][0].items()]

                    dict_writer = csv.DictWriter(
                        output_file,
                        delimiter=',',
                        fieldnames=items_list[0].keys(),
                        extrasaction='ignore',
                        lineterminator='\n',
                        quotechar='"')
                    # write CSV header
                    dict_writer.writeheader()
                    dict_writer.writerows(items_list)
                    csv_result = output_file.getvalue()
                    output_file.close()
                    self.logger.debug("api: CSV file generated.")
                    return csv_result 
                else :
                    final_obj = request["data"]["affected_items"]
                if isinstance(final_obj, list):
                    keys = final_obj[0].keys()
                    self.format_output(keys)
                    final_obj_dict = self.format_output(final_obj)
                    total_items = request["data"]["total_affected_items"]
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
                                url + opt_endpoint, params=filters, headers = {'Authorization': f'Bearer {wazuh_token}'},
                                verify=verify).json()
                            paginated_result = req['data']['affected_items']
                            format_paginated_results = self.format_output(
                                paginated_result)
                            dict_writer.writerows(format_paginated_results)

                        csv_result = output_file.getvalue()
                        self.logger.info("api: CSV generated successfully.")
                else:
                    csv_result = '[]'
            else:
                csv_result = '[]'
            output_file.close()
            self.logger.debug("api: CSV file generated.")
        except Exception as e:
            self.logger.error("api: Error in CSV generation!: %s" % (str(e)))
            return jsonbak.dumps({"error": str(e)})
        return csv_result

    @expose_page(must_login=False, methods=['GET'])
    def pci(self, **kwargs):
        try:
            self.logger.debug("api: Getting PCI data.")
            if not 'requirement' in kwargs:
                raise Exception('Missing requirement.')
            pci_description = ''
            requirement = kwargs['requirement']
            if requirement == 'all':
                if not 'apiId' in kwargs:
                    return jsonbak.dumps(pci_requirements.pci)
                the_id = kwargs['apiId']
                url,auth,verify,cluster_enabled = self.get_credentials(the_id)
                wazuh_token = self.wztoken.get_auth_token(url,auth)
                opt_endpoint = '/rules/pci'
                request = self.session.get(
                    url + opt_endpoint, params=kwargs, headers = {'Authorization': f'Bearer {wazuh_token}'},
                    verify=verify).json()
                if request['error'] != 0:
                    return jsonbak.dumps({'error':request['error']})
                data = request['data']['items']
                result = {}
                for item in data:
                    result[item] = pci_requirements.pci[item]
                return jsonbak.dumps(result)
            else:
                if not requirement in pci_requirements.pci:
                    return jsonbak.dumps({'error':'Requirement not found.'})
                pci_description = pci_requirements.pci[requirement]
                result = {}
                result['pci'] = {}
                result['pci']['requirement'] = requirement
                result['pci']['description'] = pci_description
                return jsonbak.dumps(result)
        except Exception as e:
            self.logger.error("api: Error getting PCI-DSS requirements: %s" % (str(e)))
            return jsonbak.dumps({"error": str(e)})

    @expose_page(must_login=False, methods=['GET'])
    def gdpr(self, **kwargs):
        try:
            self.logger.debug("api: Getting GDPR data.")
            if not 'requirement' in kwargs:
                raise Exception('Missing requirement.')
            pci_description = ''
            requirement = kwargs['requirement']
            if requirement == 'all':
                if not 'apiId' in kwargs:
                    return jsonbak.dumps(gdpr_requirements.gdpr)
                the_id = kwargs['apiId']
                url,auth,verify,cluster_enabled = self.get_credentials(the_id)
                wazuh_token = self.wztoken.get_auth_token(url,auth)
                opt_endpoint = '/rules/gdpr'
                request = self.session.get(
                    url + opt_endpoint, params=kwargs, headers = {'Authorization': f'Bearer {wazuh_token}'},
                    verify=verify).json()
                if request['error'] != 0:
                    return jsonbak.dumps({'error':request['error']})
                data = request['data']['items']
                result = {}
                for item in data:
                    result[item] = gdpr_requirements.gdpr[item]
                return jsonbak.dumps(result)
            else:
                if not requirement in gdpr_requirements.gdpr:
                    return jsonbak.dumps({'error':'Requirement not found.'})
                pci_description = gdpr_requirements.gdpr[requirement]
                result = {}
                result['gdpr'] = {}
                result['gdpr']['requirement'] = requirement
                result['gdpr']['description'] = pci_description
                return jsonbak.dumps(result)
        except Exception as e:
            self.logger.error("api: Error getting PCI-DSS requirements: %s" % (str(e)))
            return jsonbak.dumps({"error": str(e)})

            
    @expose_page(must_login=False, methods=['GET'])
    def hipaa(self, **kwargs):
        try:
            self.logger.debug("api: Getting HIPAA data.")
            if not 'requirement' in kwargs:
                raise Exception('Missing requirement.')
            hipaa_description = ''
            requirement = kwargs['requirement']
            if requirement == 'all':
                if not 'apiId' in kwargs:
                    return jsonbak.dumps(hipaa_requirements.hipaa)
                the_id = kwargs['apiId']
                url,auth,verify = self.get_credentials(the_id)
                opt_endpoint = '/rules/hipaa'
                wazuh_token = self.wztoken.get_auth_token(url,auth)
                request = self.session.get(
                    url + opt_endpoint, params=kwargs, headers = {'Authorization': f'Bearer {wazuh_token}'},
                    verify=verify).json()
                if request['error'] != 0:
                    return jsonbak.dumps({'error':request['error']})
                data = request['data']['items']
                result = {}
                for item in data:
                    result[item] = hipaa_requirements.hipaa[item]
                return jsonbak.dumps(result)
            else:
                if not requirement in hipaa_requirements.hipaa:
                    return jsonbak.dumps({'error':'Requirement not found.'})
                hipaa_description = hipaa_requirements.hipaa[requirement]
                result = {}
                result['hipaa'] = {}
                result['hipaa']['requirement'] = requirement
                result['hipaa']['description'] = hipaa_description
                return jsonbak.dumps(result)
        except Exception as e:
            self.logger.error("api: Error getting HIPAA requirements: %s" % (str(e)))
            return jsonbak.dumps({"error": str(e)})
         
    @expose_page(must_login=False, methods=['GET'])
    def nist(self, **kwargs):
        try:
            self.logger.debug("api: Getting NIST 800-53 data.")
            if not 'requirement' in kwargs:
                raise Exception('Missing requirement.')
            nist_description = ''
            requirement = kwargs['requirement']
            if requirement == 'all':
                if not 'apiId' in kwargs:
                    return jsonbak.dumps(nist_requirements.nist)
                the_id = kwargs['apiId']
                url,auth,verify = self.get_credentials(the_id)
                wazuh_token = self.wztoken.get_auth_token(url,auth)
                opt_endpoint = '/rules/nist-800-53'
                request = self.session.get(
                    url + opt_endpoint, params=kwargs, headers = {'Authorization': f'Bearer {wazuh_token}'},
                    verify=verify).json()
                if request['error'] != 0:
                    return jsonbak.dumps({'error':request['error']})
                data = request['data']['items']
                result = {}
                for item in data:
                    result[item] = nist_requirements.nist[item]
                return jsonbak.dumps(result)
            else:
                if not requirement in nist_requirements.nist:
                    return jsonbak.dumps({'error':'Requirement not found.'})
                nist_description = nist_requirements.nist[requirement]
                result = {}
                result['nist'] = {}
                result['nist']['requirement'] = requirement
                result['nist']['description'] = nist_description
                return jsonbak.dumps(result)
        except Exception as e:
            self.logger.error("api: Error getting NIST 800-53 requirements: %s" % (str(e)))
            return jsonbak.dumps({"error": str(e)})


    def get_config_on_memory(self):
        try:
            self.logger.debug("api: Getting configuration on memory.")
            config = cli.getConfStanza("config", "configuration")
            return config
        except Exception as e:
            self.logger.error("api: Error getting the configuration on memory: %s" % (e))
            return jsonbak.dumps({"error": str(e)})

    """
    Get basic syscollector information for a given agent.
    """
    @expose_page(must_login=False, methods=['GET'])
    def getSyscollector(self, **kwargs):
        try:
            self.logger.info("Request to get basic syscollector information for a given agent")
            if not 'apiId' in kwargs and not 'agentId' in kwargs:
                raise Exception('Missing parameters.')
            syscollectorData = {
                'hardware' : False,
                'os': False,
                'netiface': False,
                'ports': False,
                'netaddr': False,
                'packagesDate': False,
                'processesDate': False
            }
            apiId = kwargs['apiId']
            agentId = kwargs['agentId']
            url,auth,verify,cluster_enabled = self.get_credentials(apiId)
            wazuh_token = self.wztoken.get_auth_token(url,auth)
            # Hardware
            endpoint_hardware = '/syscollector/' +  str(agentId) + '/hardware'
            hardware_data = self.session.get(
                    url + endpoint_hardware, params={}, headers = {'Authorization': f'Bearer {wazuh_token}'},
                    verify=verify).json()
            if 'error' in hardware_data and hardware_data['error'] == 0 and 'data' in hardware_data:
                syscollectorData['hardware'] = hardware_data['data']
            
            # OS
            endpoint_os = '/syscollector/' +  str(agentId) + '/os'
            os_data = self.session.get(
                    url + endpoint_os, params={}, headers = {'Authorization': f'Bearer {wazuh_token}'},
                    verify=verify).json()
            if 'error' in os_data and os_data['error'] == 0 and 'data' in os_data:
                syscollectorData['os'] = os_data['data']
            
            # Ports
            endpoint_ports = '/syscollector/' +  str(agentId) + '/ports'
            ports_data = self.session.get(
                    url + endpoint_ports, params={ 'limit' : 1 }, headers = {'Authorization': f'Bearer {wazuh_token}'},
                    verify=verify).json()
            if 'error' in ports_data and ports_data['error'] == 0 and 'data' in ports_data:
                syscollectorData['ports'] = ports_data['data']

            # Packages
            endpoint_packages = '/syscollector/' +  str(agentId) + '/packages'
            packages_data = self.session.get(
                    url + endpoint_packages, params={ 'limit' : 1}, headers = {'Authorization': f'Bearer {wazuh_token}'},
                    verify=verify).json()
            if 'error' in packages_data and packages_data['error'] == 0 and 'data' in packages_data:
                if 'affected_items' in packages_data['data'] and len(packages_data['data']['affected_items']) > 0 and 'scan' in packages_data['data']['affected_items'][0]:
                    syscollectorData['packagesDate'] = packages_data['data']['affected_items'][0]['scan']['time']
                else:
                    syscollectorData['packagesDate'] = 'Unknown'

            # Processes
            endpoint_processes = '/syscollector/' +  str(agentId) + '/processes'
            processes_data = self.session.get(
                    url + endpoint_processes, params={ 'limit' : 1}, headers = {'Authorization': f'Bearer {wazuh_token}'},
                    verify=verify).json()
            if 'error' in processes_data and processes_data['error'] == 0 and 'data' in processes_data:
                if 'affected_items' in processes_data['data'] and len(processes_data['data']['affected_items']) > 0 and 'scan' in processes_data['data']['affected_items'][0]:
                    syscollectorData['processesDate'] = processes_data['data']['affected_items'][0]['scan']['time']
                else:
                    syscollectorData['processesDate'] = 'Unknown'

            # Netiface
            endpoint_netiface = '/syscollector/' +  str(agentId) + '/netiface'
            netiface_data = self.session.get(
                    url + endpoint_netiface, params={}, headers = {'Authorization': f'Bearer {wazuh_token}'},
                    verify=verify).json()
            if 'error' in netiface_data and netiface_data['error'] == 0 and 'data' in netiface_data:
                syscollectorData['netiface'] = netiface_data['data']

            # Netaddr
            endpoint_netaddr = '/syscollector/' +  str(agentId) + '/netaddr'
            netaddr_data = self.session.get(
                    url + endpoint_netaddr, params={ 'limit' : 1 }, headers = {'Authorization': f'Bearer {wazuh_token}'},
                    verify=verify).json()
            if 'error' in netaddr_data and netaddr_data['error'] == 0 and 'data' in netaddr_data:
                syscollectorData['netaddr'] = netaddr_data['data']
            return jsonbak.dumps(syscollectorData)
        except Exception as e:
            self.logger.error("Error getting syscollector information for a given agent: %s" % (str(e)))
            return jsonbak.dumps({"error": str(e)})
