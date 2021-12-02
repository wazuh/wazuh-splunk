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

import csv
from io import StringIO

import api_info
import jsonbak
import requestsbak
import splunk.appserver.mrsparkle.controllers as controllers
from check_daemons import check_daemons
from db import database
from log import log
from requirements import (gdpr_requirements, hipaa_requirements,
                          nist_requirements, pci_requirements)
from splunk.appserver.mrsparkle.lib.decorators import expose_page
from splunk.clilib import cli_common as cli
from wazuh_api import Wazuh_API
from wazuhtoken import wazuhtoken


class api(controllers.BaseController):
    """
    API class.

    Handle API methods
    """

    def __init__(self):
        """Constructor."""
        try:
            self.logger = log()
            self.wztoken = wazuhtoken()
            self.wz_api = Wazuh_API()
            self.config = self.get_config_on_memory()
            self.timeout = int(self.config['timeout'])
            self.db = database()
            controllers.BaseController.__init__(self)
            self.session = requestsbak.Session()
            self.session.trust_env = False
        except Exception as e:
            self.logger.error("api: Error in API module constructor: %s" % (e))

    @expose_page(must_login=False, methods=['POST'])
    def wazuh_ready(self, **kwargs):
        """Endpoint to check daemons status.

        Parameters
        ----------
        kwargs : dict
            Request parameters
        """
        self.logger.debug("api:is_wazuh_ready() called")
        try:
            # Get current API data
            if not 'apiId' in kwargs:
                raise Exception("Missing API Key")

            api_id = kwargs['apiId']
            current_api_json = jsonbak.loads(self.db.get(api_id))['data']

            daemons_ready = check_daemons(current_api_json)
            msg = "Wazuh is now ready." if daemons_ready else "Wazuh not ready yet."
            self.logger.debug("api: %s" % msg)
            return jsonbak.dumps(
                {
                    "status": "200",
                    "ready": daemons_ready,
                    "message": msg
                }
            )
        except Exception as e:
            self.logger.error("api: Error checking daemons: %s" % (e))
            return jsonbak.dumps(
                {
                    "status": "200",
                    "ready": False,
                    "message": "Error getting the Wazuh daemons status."
                }
            )

    @expose_page(must_login=False, methods=['POST'])
    def request(self, **kwargs):
        """Make requests to the Wazuh API as a proxy backend.

        Parameters
        ----------
        kwargs : dict
            Request parameters
        """
        self.logger.debug("api: Preparing request.")
        try:
            # Get current API data
            if not 'apiId' in kwargs:
                raise Exception("Missing API Key")

            api_id = kwargs['apiId']
            current_api_json = jsonbak.loads(self.db.get(api_id))['data']

            opt_username = str(current_api_json['userapi'])
            opt_password = str(current_api_json['passapi'])
            opt_base_url = str(current_api_json['url'])
            opt_base_port = str(current_api_json['portapi'])

            # API requests auth
            auth = requestsbak.auth.HTTPBasicAuth(opt_username, opt_password)
            url = opt_base_url + ":" + opt_base_port

            if 'endpoint' not in kwargs:
                raise Exception('Missing endpoint')
            if 'method' not in kwargs:
                method = 'GET'
            elif kwargs['method'] == 'GET':
                del kwargs['method']
                method = 'GET'
            else:
                if str(self.getSelfAdminStanza()['admin']) != 'true':
                    self.logger.error('api: Admin mode is disabled.')
                    return jsonbak.dumps(
                        {
                            'error': 'Forbidden. Enable admin mode.'
                        }
                    )
                method = kwargs['method']
                del kwargs['method']

            opt_endpoint = kwargs['endpoint']
            del kwargs['apiId']
            del kwargs['endpoint']

            # Raise error if Wazuh Daemons are not ready.
            if not check_daemons(current_api_json):
                return jsonbak.dumps(
                    {
                        "status": "200",
                        "error": 3099,
                        "message": "Wazuh not ready yet."
                    }
                )
            response = self.wz_api.make_request(
                method,
                url,
                opt_endpoint,
                kwargs,
                auth,
                current_api_json
            )
            result = jsonbak.dumps(response)
        except Exception as e:
            self.logger.error("api: Error making API request: %s" % (e))
            return jsonbak.dumps(
                {
                    'error': str(e)
                }
            )
        return result

    @expose_page(must_login=False, methods=['GET'])
    def autocomplete(self, **kwargs):
        """
        Provisional method for returning the full list of Wazuh API endpoints.
        """
        try:
            self.logger.debug("Returning autocomplete for devtools.")
            return api_info.get_api_endpoints()
        except Exception as e:
            return jsonbak.dumps(
                {
                    'error': str(e)
                }
            )

    # POST /api/csv : Generates a CSV file with the returned data from API
    @expose_page(must_login=False, methods=['POST'])
    def csv(self, **kwargs):
        """Generate an exportable CSV from request data.

        Parameters
        ----------
        kwargs : dict
            Request parameters
        """
        self.logger.debug("api: Generating CSV file.")
        try:
            # Get current API data
            if not 'apiId' in kwargs:
                raise Exception("Missing API Key")

            api_id = kwargs['apiId']
            current_api_json = jsonbak.loads(self.db.get(api_id))['data']

            opt_username = str(current_api_json['userapi'])
            opt_password = str(current_api_json['passapi'])
            opt_base_url = str(current_api_json['url'])
            opt_base_port = str(current_api_json['portapi'])

            url = opt_base_url + ":" + opt_base_port
            auth = requestsbak.auth.HTTPBasicAuth(opt_username, opt_password)

            if 'path' not in kwargs:
                raise Exception("Missing path param.")
            opt_endpoint = kwargs['path']

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

            is_list_export_keys_values = "lists/files" in opt_endpoint

            # init csv writer
            output_file = StringIO()
            # get total items and keys
            response = self.wz_api.make_request(
                'GET',
                url,
                opt_endpoint,
                {} if is_list_export_keys_values else filters,
                auth,
                current_api_json
            )
            self.logger.debug("api: Data obtained for generate CSV file.")
            if ('affected_items' in response['data'] and
                    len(response['data']['affected_items']) > 0):
                # Export CSV the CDB List keys and values
                if is_list_export_keys_values:
                    items_list = [
                        {"Key": k, "Value": v}
                        for k, v in response['data']['affected_items'][0].items()
                    ]

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
                else:
                    final_obj = response['data']['affected_items']
                if isinstance(final_obj, list):
                    keys = final_obj[0].keys()
                    self.format_output(keys)
                    final_obj_dict = self.format_output(final_obj)
                    total_items = response['data']['total_affected_items']
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
                            response = self.wz_api.make_request(
                                'GET',
                                url,
                                opt_endpoint,
                                filters,
                                auth,
                                current_api_json
                            )
                            paginated_result = response['data']['affected_items']
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
            return jsonbak.dumps(
                {
                    "error": str(e)
                }
            )
        return csv_result

    @expose_page(must_login=False, methods=['GET'])
    def pci(self, **kwargs):
        self.logger.debug("api: Getting PCI data.")
        try:
            # Get current API data
            if not 'apiId' in kwargs:
                return jsonbak.dumps(pci_requirements.pci)

            api_id = kwargs['apiId']
            current_api_json = jsonbak.loads(self.db.get(api_id))['data']

            opt_username = str(current_api_json['userapi'])
            opt_password = str(current_api_json['passapi'])
            opt_base_url = str(current_api_json['url'])
            opt_base_port = str(current_api_json['portapi'])

            url = opt_base_url + ":" + opt_base_port
            auth = requestsbak.auth.HTTPBasicAuth(opt_username, opt_password)

            if not 'requirement' in kwargs:
                raise Exception('Missing requirement.')
            pci_description = ''
            requirement = kwargs['requirement']

            if requirement == 'all':
                opt_endpoint = '/rules/pci'
                response = self.wz_api.make_request(
                    'GET',
                    url,
                    opt_endpoint,
                    kwargs,
                    auth,
                    current_api_json
                )

                if response['error'] != 0:
                    return jsonbak.dumps(
                        {
                            'error': response['error']
                        }
                    )
                data = response['data']['items']
                result = {}

                for item in data:
                    result[item] = pci_requirements.pci[item]
                return jsonbak.dumps(result)
            else:
                if not requirement in pci_requirements.pci:
                    return jsonbak.dumps(
                        {
                            'error': 'Requirement not found.'
                        }
                    )

                pci_description = pci_requirements.pci[requirement]
                result = {}
                result['pci'] = {}
                result['pci']['requirement'] = requirement
                result['pci']['description'] = pci_description
                return jsonbak.dumps(result)
        except Exception as e:
            self.logger.error(
                "api: Error getting PCI-DSS requirements: %s" % (str(e)))
            return jsonbak.dumps(
                {
                    "error": str(e)
                }
            )

    @expose_page(must_login=False, methods=['GET'])
    def gdpr(self, **kwargs):
        self.logger.debug("api: Getting GDPR data.")
        try:
            # Get current API data
            if not 'apiId' in kwargs:
                return jsonbak.dumps(gdpr_requirements.gdpr)

            api_id = kwargs['apiId']
            current_api_json = jsonbak.loads(self.db.get(api_id))['data']

            opt_username = str(current_api_json['userapi'])
            opt_password = str(current_api_json['passapi'])
            opt_base_url = str(current_api_json['url'])
            opt_base_port = str(current_api_json['portapi'])

            url = opt_base_url + ":" + opt_base_port
            auth = requestsbak.auth.HTTPBasicAuth(opt_username, opt_password)

            if not 'requirement' in kwargs:
                raise Exception('Missing requirement.')
            pci_description = ''
            requirement = kwargs['requirement']

            if requirement == 'all':
                opt_endpoint = '/rules/gdpr'
                response = self.wz_api.make_request(
                    'GET',
                    url,
                    opt_endpoint,
                    kwargs,
                    auth,
                    current_api_json
                )

                if response['error'] != 0:
                    return jsonbak.dumps(
                        {
                            'error': response['error']
                        }
                    )
                data = response['data']['items']
                result = {}

                for item in data:
                    result[item] = gdpr_requirements.gdpr[item]

                return jsonbak.dumps(result)
            else:
                if not requirement in gdpr_requirements.gdpr:
                    return jsonbak.dumps(
                        {
                            'error': 'Requirement not found.'
                        }
                    )

                pci_description = gdpr_requirements.gdpr[requirement]
                result = {}
                result['gdpr'] = {}
                result['gdpr']['requirement'] = requirement
                result['gdpr']['description'] = pci_description

                return jsonbak.dumps(result)
        except Exception as e:
            self.logger.error(
                "api: Error getting PCI-DSS requirements: %s" % (str(e)))
            return jsonbak.dumps(
                {
                    "error": str(e)
                }
            )

    @expose_page(must_login=False, methods=['GET'])
    def hipaa(self, **kwargs):
        self.logger.debug("api: Getting HIPAA data.")
        try:
            # Get current API data
            if not 'apiId' in kwargs:
                return jsonbak.dumps(hipaa_requirements.hipaa)

            api_id = kwargs['apiId']
            current_api_json = jsonbak.loads(self.db.get(api_id))['data']

            opt_username = str(current_api_json['userapi'])
            opt_password = str(current_api_json['passapi'])
            opt_base_url = str(current_api_json['url'])
            opt_base_port = str(current_api_json['portapi'])

            url = opt_base_url + ":" + opt_base_port
            auth = requestsbak.auth.HTTPBasicAuth(opt_username, opt_password)

            if not 'requirement' in kwargs:
                raise Exception('Missing requirement.')
            hipaa_description = ''
            requirement = kwargs['requirement']

            if requirement == 'all':
                opt_endpoint = '/rules/hipaa'
                response = self.wz_api.make_request(
                    'GET',
                    url,
                    opt_endpoint,
                    kwargs,
                    auth,
                    current_api_json
                )

                if response['error'] != 0:
                    return jsonbak.dumps(
                        {
                            'error': response['error']
                        }
                    )
                data = response['data']['items']
                result = {}

                for item in data:
                    result[item] = hipaa_requirements.hipaa[item]

                return jsonbak.dumps(result)
            else:
                if not requirement in hipaa_requirements.hipaa:
                    return jsonbak.dumps(
                        {
                            'error': 'Requirement not found.'
                        }
                    )

                hipaa_description = hipaa_requirements.hipaa[requirement]
                result = {}
                result['hipaa'] = {}
                result['hipaa']['requirement'] = requirement
                result['hipaa']['description'] = hipaa_description

                return jsonbak.dumps(result)
        except Exception as e:
            self.logger.error(
                "api: Error getting HIPAA requirements: %s" % (str(e)))
            return jsonbak.dumps(
                {
                    "error": str(e)
                }
            )

    @expose_page(must_login=False, methods=['GET'])
    def nist(self, **kwargs):
        self.logger.debug("api: Getting NIST 800-53 data.")
        try:
            # Get current API data
            if not 'apiId' in kwargs:
                return jsonbak.dumps(nist_requirements.nist)

            api_id = kwargs['apiId']
            current_api_json = jsonbak.loads(self.db.get(api_id))['data']

            opt_username = str(current_api_json['userapi'])
            opt_password = str(current_api_json['passapi'])
            opt_base_url = str(current_api_json['url'])
            opt_base_port = str(current_api_json['portapi'])

            url = opt_base_url + ":" + opt_base_port
            auth = requestsbak.auth.HTTPBasicAuth(opt_username, opt_password)

            if not 'requirement' in kwargs:
                raise Exception('Missing requirement.')
            nist_description = ''
            requirement = kwargs['requirement']

            if requirement == 'all':
                opt_endpoint = '/rules/nist-800-53'
                response = self.wz_api.make_request(
                    'GET',
                    url,
                    opt_endpoint,
                    kwargs,
                    auth,
                    current_api_json
                )

                if response['error'] != 0:
                    return jsonbak.dumps(
                        {
                            'error': response['error']
                        }
                    )
                data = response['data']['items']
                result = {}

                for item in data:
                    result[item] = nist_requirements.nist[item]
                return jsonbak.dumps(result)
            else:
                if not requirement in nist_requirements.nist:
                    return jsonbak.dumps(
                        {
                            'error': 'Requirement not found.'
                        }
                    )

                nist_description = nist_requirements.nist[requirement]
                result = {}
                result['nist'] = {}
                result['nist']['requirement'] = requirement
                result['nist']['description'] = nist_description

                return jsonbak.dumps(result)
        except Exception as e:
            self.logger.error(
                "api: Error getting NIST 800-53 requirements: %s" % (str(e)))
            return jsonbak.dumps(
                {
                    "error": str(e)
                }
            )

    def get_config_on_memory(self):
        try:
            self.logger.debug("api: Getting configuration on memory.")
            config = cli.getConfStanza("config", "configuration")
            return config
        except Exception as e:
            self.logger.error(
                "api: Error getting the configuration on memory: %s" % (e))
            return jsonbak.dumps(
                {
                    "error": str(e)
                }
            )

    """
    Get basic syscollector information for a given agent.
    """
    @expose_page(must_login=False, methods=['GET'])
    def getSyscollector(self, **kwargs):
        self.logger.debug("api::getSysCollector() called")
        try:
            # Get current API data
            if not 'apiId' in kwargs:
                raise Exception("Missing API Key")

            api_id = kwargs['apiId']
            current_api_json = jsonbak.loads(self.db.get(api_id))['data']

            opt_username = str(current_api_json['userapi'])
            opt_password = str(current_api_json['passapi'])
            opt_base_url = str(current_api_json['url'])
            opt_base_port = str(current_api_json['portapi'])

            url = opt_base_url + ":" + opt_base_port
            auth = requestsbak.auth.HTTPBasicAuth(opt_username, opt_password)

            if not 'agentId' in kwargs:
                raise Exception('Missing `agentID` parameter.')
            agentId = str(kwargs['agentId'])

            syscollectorData = {
                'hardware': False,
                'os': False,
                'netiface': False,
                'ports': False,
                'netaddr': False,
                'packagesDate': False,
                'processesDate': False
            }

            # FIXME USE A FOR LOOP
            # Hardware
            endpoint_hardware = f'/syscollector/{agentId}/hardware'
            hardware_data = self.wz_api.make_request(
                'GET',
                url,
                endpoint_hardware,
                {},
                auth,
                current_api_json
            )

            if ('error' in hardware_data and hardware_data['error'] == 0
                    and 'data' in hardware_data):
                syscollectorData['hardware'] = hardware_data['data']

            # OS
            endpoint_os = f'/syscollector/{agentId}/os'
            os_data = self.wz_api.make_request(
                'GET',
                url,
                endpoint_os,
                {},
                auth,
                current_api_json
            )

            if 'error' in os_data and os_data['error'] == 0 and 'data' in os_data:
                syscollectorData['os'] = os_data['data']

            # Ports
            endpoint_ports = f'/syscollector/{agentId}/ports'
            ports_data = self.wz_api.make_request(
                'GET',
                url,
                endpoint_ports,
                {'limit': 1},
                auth,
                current_api_json
            )

            if ('error' in ports_data and ports_data['error'] == 0
                    and 'data' in ports_data):
                syscollectorData['ports'] = ports_data['data']

            # Packages
            endpoint_packages = f'/syscollector/{agentId}/packages'
            packages_data = self.wz_api.make_request(
                'GET',
                url,
                endpoint_packages,
                {'limit': 1},
                auth,
                current_api_json
            )

            if ('error' in packages_data and packages_data['error'] == 0
                    and 'data' in packages_data):
                if ('affected_items' in packages_data['data'] and
                    len(packages_data['data']['affected_items']) > 0 and
                        'scan' in packages_data['data']['affected_items'][0]):
                    syscollectorData['packagesDate'] = packages_data['data']['affected_items'][0]['scan']['time']
                else:
                    syscollectorData['packagesDate'] = 'Unknown'

            # Processes
            endpoint_processes = f'/syscollector/{agentId}/processes'
            processes_data = self.wz_api.make_request(
                'GET',
                url,
                endpoint_processes,
                {'limit': 1},
                auth,
                current_api_json
            )

            if ('error' in processes_data and processes_data['error'] == 0 and
                    'data' in processes_data):
                if ('affected_items' in processes_data['data'] and
                    len(processes_data['data']['affected_items']) > 0 and
                        'scan' in processes_data['data']['affected_items'][0]):
                    syscollectorData['processesDate'] = processes_data['data']['affected_items'][0]['scan']['time']
                else:
                    syscollectorData['processesDate'] = 'Unknown'

            # Netiface
            endpoint_netiface = F'/syscollector/{agentId}netiface'
            netiface_data = self.wz_api.make_request(
                'GET',
                url,
                endpoint_netiface,
                {},
                auth,
                current_api_json
            )

            if ('error' in netiface_data and netiface_data['error'] == 0 and
                    'data' in netiface_data):
                syscollectorData['netiface'] = netiface_data['data']

            # Netaddr
            endpoint_netaddr = f'/syscollector/{agentId}/netaddr'
            netaddr_data = self.wz_api.make_request(
                'GET',
                url,
                endpoint_netaddr,
                {'limit': 1},
                auth,
                current_api_json
            )

            if ('error' in netaddr_data and netaddr_data['error'] == 0 and
                    'data' in netaddr_data):
                syscollectorData['netaddr'] = netaddr_data['data']

            return jsonbak.dumps(syscollectorData)
        except Exception as e:
            self.logger.error(
                "Error getting syscollector information for a given agent: %s" % (str(e)))
            return jsonbak.dumps(
                {
                    "error": str(e)
                }
            )

    # ------------------------------------------------------------ #
    #   Utility methods
    # ------------------------------------------------------------ #

    # -----------------------------------------------------
    # NOTE
    # -----------------------------------------------------
    # Useful utility. Should be moved out of this class and
    # use it as a service.
    # This code is used extensively across this and other
    # API entry points as manager.py
    # It would be better if it returned an object and not
    # different variables.
    def get_credentials(self, the_id):
        try:
            self.logger.debug("api: Getting API credentials.")
            api = self.db.get(the_id)
            api = jsonbak.loads(api)
            if api:
                opt_username = api['data']['userapi']
                opt_password = api['data']['passapi']
                opt_base_url = api['data']['url']
                opt_base_port = api['data']['portapi']
                url = str(opt_base_url) + ":" + str(opt_base_port)
                auth = requestsbak.auth.HTTPBasicAuth(
                    opt_username, opt_password)
                verify = False
                cluster_enabled = (api['data']['filterType'] == "cluster.name")
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
        except Exception as e:
            raise e
        return apikeyconf

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

    # -----------
    # NOTE
    # -----------
    # Used only in report.py
    def exec_request(self, kwargs):
        self.logger.debug("api::exec_request() called")
        try:
            # Get current API data
            if not 'id' in kwargs:
                raise Exception("Missing API Key")

            api_id = kwargs['id']
            current_api_json = jsonbak.loads(self.db.get(api_id))['data']

            opt_username = str(current_api_json['userapi'])
            opt_password = str(current_api_json['passapi'])
            opt_base_url = str(current_api_json['url'])
            opt_base_port = str(current_api_json['portapi'])

            url = opt_base_url + ":" + opt_base_port
            auth = requestsbak.auth.HTTPBasicAuth(opt_username, opt_password)

            if 'endpoint' not in kwargs:
                raise Exception("Missing endpoint")
            if 'method' not in kwargs:
                method = 'GET'
            elif kwargs['method'] == 'GET':
                del kwargs['method']
                method = 'GET'
            else:
                if str(self.getSelfAdminStanza()['admin']) != 'true':
                    self.logger.error('Admin mode is disabled.')
                    return jsonbak.dumps(
                        {
                            'error': 'Forbidden. Enable admin mode.'
                        }
                    )
                method = kwargs['method']
                del kwargs['method']

            opt_endpoint = kwargs['endpoint']
            del kwargs['id']
            del kwargs['endpoint']

            if not check_daemons(current_api_json):
                return jsonbak.dumps(
                    {
                        "status": "200",
                        "error": 3099,
                        "message": "Wazuh not ready yet."
                    }
                )
            response = self.wz_api.make_request(
                method,
                url,
                opt_endpoint,
                kwargs,
                auth,
                current_api_json
            )
            self.logger.info(response)
            result = jsonbak.dumps(response)
        except Exception as e:
            self.logger.error("Error making API request: %s" % (e))
            return jsonbak.dumps(
                {
                    'error': str(e)
                }
            )
        return result
