# -*- coding: utf-8 -*-
"""
Wazuh app - Manager backend.

Copyright (C) 2015-2019 Wazuh, Inc.

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

Find more information about this on the LICENSE file.
"""


from . import api
from wazuhtoken import wazuhtoken
import jsonbak
import requestsbak
import uuid
import json
# from splunk import AuthorizationFailed as AuthorizationFailed
from splunk.clilib import cli_common as cli
import splunk.appserver.mrsparkle.controllers as controllers
from splunk.appserver.mrsparkle.lib.decorators import expose_page
from splunk.appserver.mrsparkle.lib.util import make_splunkhome_path
from db import database
from log import log
from requestsbak.exceptions import ConnectionError

def getSelfConfStanza(file, stanza):
    """Get the configuration from a stanza.

    Parameters
    ----------
    stanza : unicode
        The selected stanza

    """
    try:
        apikeyconf = cli.getConfStanza(file, stanza)
        parsed_data = jsonbak.dumps(apikeyconf)
    except Exception as e:
        raise e
    return parsed_data


def diff_keys_dic_update_api(kwargs_dic):
    """Get the missing fields for the API entry.

    Parameters
    ----------
    kwargs_dic : dict
        The current dict to be compared

    """
    try:
        diff = []
        kwargs_dic_keys = kwargs_dic.keys()
        dic_keys = ['_key', 'url', 'portapi', 'userapi',
                    'passapi', 'filterName', 'filterType', 'managerName']
        for key in dic_keys:
            if key not in kwargs_dic_keys:
                diff.append(key)
        return str(', '.join(diff))
    except Exception:
        return "Error comparing dictionaries"


class manager(controllers.BaseController):
    """Handle manager endpoints."""

    def __init__(self):
        """Constructor."""
        self.logger = log()
        try:
            controllers.BaseController.__init__(self)
            self.db = database()
            self.wztoken = wazuhtoken()
            self.config =  self.get_config_on_memory()
            self.timeout = int(self.config['timeout'])
            self.wazuh_api = api.api()
            self.session = requestsbak.Session()            
            self.session.trust_env = False
        except Exception as e:
            self.logger.error("manager: Error in manager module constructor: %s" % (e))

    @expose_page(must_login=False, methods=['GET'])
    def polling_state(self, **kwargs):
        """Check agent monitoring status.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            self.logger.debug("manager: Getting agents polling state.")
            app = cli.getConfStanza(
                'inputs',
                'script:///opt/splunk/etc/apps/SplunkAppForWazuh/bin/get_agents_status.py')

            disabled = app.get('disabled')
            polling_dict = {}
            polling_dict['disabled'] = disabled
            data_temp = jsonbak.dumps(polling_dict)
        except Exception as e:
            return jsonbak.dumps({'error': str(e)})
        return data_temp

    @expose_page(must_login=False, methods=['GET'])
    def extensions(self, **kwargs):
        """Obtain extension from file.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            self.logger.debug("manager: Getting extensions.")
            stanza = getSelfConfStanza("config", "extensions")
            data_temp = stanza
        except Exception as e:
            return jsonbak.dumps({'error': str(e)})
        return data_temp

    @expose_page(must_login=False, methods=['GET'])
    def admin_extensions(self, **kwargs):
        """Obtain extension from file.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            self.logger.debug("manager: Getting admin extensions.")
            stanza = getSelfConfStanza("config", "admin_extensions")
            data_temp = stanza
        except Exception as e:
            return jsonbak.dumps({'error': str(e)})
        return data_temp

    @expose_page(must_login=False, methods=['GET'])
    def configuration(self, **kwargs):
        """Obtain extension from file.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            self.logger.debug("manager: Getting configuration on memory from frondent.")
            stanza = getSelfConfStanza("config", "configuration")
            data_temp = stanza
        except Exception as e:
            return jsonbak.dumps({'error': str(e)})
        return data_temp

    @expose_page(must_login=False, methods=['GET'])
    def app_info(self, **kwargs):
        """Obtain app information from file.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            self.logger.debug("manager: Getting app info.")
            stanza = cli.getConfStanza(
                'package',
                'app')
            data_temp = stanza
            stanza = cli.getConfStanza(
                'package',
                'splunk')
            data_temp['splunk_version'] = stanza['version']
            parsed_data = jsonbak.dumps(data_temp)
        except Exception as e:
            return jsonbak.dumps({'error': str(e)})
        return parsed_data

    @expose_page(must_login=False, methods=['GET'])
    def get_api(self, **kwargs):
        """Obtain Wazuh API from DB.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            self.logger.debug("manager: Getting API info from _key.")
            if 'apiId' not in kwargs:
                return jsonbak.dumps({'error': 'Missing ID.'})
            id = kwargs['apiId']
            data_temp = self.db.get(id)
            parsed_data = jsonbak.dumps(data_temp)
        except Exception as e:
            self.logger.error("manager: Error in get_apis endpoint: %s" % (e))
            return jsonbak.dumps({'error': str(e)})
        return parsed_data

    @expose_page(must_login=False, methods=['GET'])
    def get_apis(self, **kwargs):
        """Obtain all Wazuh APIs from DB.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            self.logger.debug("manager: Getting API list.")
            apis = self.db.all()
            parsed_apis = jsonbak.loads(apis)
            # Remove the password from the list of apis
            for api in parsed_apis:
                if "passapi" in api:
                    del api["passapi"]
            result = jsonbak.dumps(parsed_apis)
        except Exception as e:
            self.logger.error(jsonbak.dumps({"error": str(e)}))
            return jsonbak.dumps({"error": str(e)})
        return result

    @expose_page(must_login=False, methods=['POST'])
    def add_api(self, **kwargs):
        """Add a Wazuh API.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            self.logger.debug("manager: Adding a new API.")
            record = kwargs
            keys_list = ['url', 'portapi', 'userapi', 'passapi',
                         'managerName', 'filterType', 'filterName']
            if set(record.keys()) == set(keys_list):
                key = self.db.insert(jsonbak.dumps(record))
                parsed_data = jsonbak.dumps({'result': key})
                return parsed_data
            else:
                raise Exception('Invalid number of arguments')
        except Exception as e:
            self.logger.error({'manager - add_api': str(e)})
            return jsonbak.dumps({'error': str(e)})

    @expose_page(must_login=False, methods=['POST'])
    def remove_api(self, **kwargs):
        """Delete Wazuh API from DB.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            self.logger.debug("manager: Removing API.")
            api_id = kwargs
            if '_key' not in api_id:
                return jsonbak.dumps({'error': 'Missing ID'})
            self.db.remove(api_id['_key'])
            parsed_data = jsonbak.dumps({'data': 'success'})
        except Exception as e:
            self.logger.error("manager: Error in remove_api endpoint: %s" % (e))
            return jsonbak.dumps({'error': str(e)})
        return parsed_data

    @expose_page(must_login=False, methods=['POST'])
    def update_api(self, **kwargs):
        """Update Wazuh API.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            self.logger.debug("manager: Updating API information.")
            entry = kwargs
            if '_user' in kwargs:
                del kwargs['_user']
            if not "passapi" in entry:
                opt_id = entry["_key"]
                data_temp = self.db.get(opt_id)
                current_api = jsonbak.loads(data_temp)
                current_api = current_api["data"]
                entry["passapi"] = current_api["passapi"]
            keys_list = ['_key', 'url', 'portapi', 'userapi',
                         'passapi', 'filterName', 'filterType', 'managerName']
            if set(entry.keys()) == set(keys_list):
                self.db.update(entry)
                parsed_data = jsonbak.dumps({'data': 'success'})
            else:
                missing_params = diff_keys_dic_update_api(entry)
                raise Exception(
                    "Invalid arguments, missing params : %s"
                    % str(missing_params))
        except Exception as e:
            self.logger.error("manager: Error in update_api endpoint: %s" % (e))
            return jsonbak.dumps({"error": str(e)})
        return parsed_data

    @expose_page(must_login=False, methods=['GET'])
    def get_log_lines(self, **kwargs):
        """Get last log lines.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            self.logger.debug("manager: Getting last log lines.")
            lines = self.logger.get_last_log_lines(20)
            parsed_data = jsonbak.dumps({'logs': lines, 'logs_path': make_splunkhome_path(['var', 'log', 'splunk', 'SplunkAppForWazuh.log'])})
        except Exception as e:
            self.logger.error("manager: Get_log_lines endpoint: %s" % (e))
            return jsonbak.dumps({"error": str(e)})
        return parsed_data
                        
    @expose_page(must_login=False, methods=['GET'])
    def check_connection(self, **kwargs):
        """Check API connection.

        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            self.logger.debug("manager: Checking API connection.")
            opt_username = kwargs["user"]
            opt_password = kwargs["pass"]
            opt_base_url = kwargs["ip"]
            opt_base_port = kwargs["port"]
            opt_cluster = kwargs["cluster"] == "true"
            url = opt_base_url + ":" + opt_base_port
            auth = requestsbak.auth.HTTPBasicAuth(opt_username, opt_password)
            verify = False
            try:
                self.check_wazuh_version(kwargs)
            except Exception as e:
                error = {"status": 400, "error": str(e), "message": "Cannot connect to the API"}
                return jsonbak.dumps(error)
            daemons_ready = self.check_daemons(url, auth, verify, opt_cluster, kwargs)
            # Pass the cluster status instead of always False
            if not daemons_ready:
                raise Exception("DAEMONS-NOT-READY")
            output = self.get_cluster_info(opt_username, opt_password, opt_base_url, opt_base_port , opt_cluster)   
            result = jsonbak.dumps(output) 
        except Exception as e:
            if e == "DAEMONS-NOT-READY":
                self.logger.error("manager: Cannot connect to API; Wazuh not ready yet.")
                return jsonbak.dumps({"status": "200", "error": 3099, "message": "Wazuh not ready yet."})
            else:
                self.logger.error("manager: Cannot connect to API : %s" % (e))
                return jsonbak.dumps({"status": 400, "error": "Cannot connect to the API"})
        return result

    @expose_page(must_login=False, methods=['GET'])
    def check_connection_by_id(self, **kwargs):
        """Given an API id we check the connection.
        
        Parameters
        ----------
        kwargs : dict
            The request's parameters

        """
        try:
            self.logger.debug("manager: Checking API connection by id.")
            opt_id = kwargs["apiId"]
            current_api = self.get_api(apiId=opt_id)
            current_api_json = jsonbak.loads(jsonbak.loads(current_api))
            if not "data" in current_api_json:
                return jsonbak.dumps({"status": "400", "error": "Error when checking API connection."})
            opt_username = str(current_api_json["data"]["userapi"])
            opt_password = str(current_api_json["data"]["passapi"])
            opt_base_url = str(current_api_json["data"]["url"])
            opt_base_port = str(current_api_json["data"]["portapi"])
            opt_cluster = False
            if "cluster" in current_api_json["data"]:
                opt_cluster = current_api_json["data"]["cluster"] == "true"
            output = self.get_cluster_info(opt_username, opt_password, opt_base_url, opt_base_port , opt_cluster)
            del current_api_json["data"]["passapi"]
            output['api'] = current_api_json
            result = jsonbak.dumps(output)             
        except Exception as e:
            self.logger.error("Error when checking API connection: %s" % (e))
            return jsonbak.dumps({"status": "500", "error": "Error when checking API connection: %s" % (e)})
        return result
    
    def get_cluster_info(self, opt_username, opt_password, opt_base_url, opt_base_port, opt_cluster):
        """Get info about the cluster.

        """
        self.logger.debug("manager: Get cluster info.")
        url = opt_base_url + ":" + opt_base_port
        auth = requestsbak.auth.HTTPBasicAuth(opt_username, opt_password)
        wazuh_token = self.wztoken.get_auth_token(url,auth)
        verify = False
        try:
            request_manager = self.session.get(
                url + '/agents?q=id=000&select=name', headers={'Authorization': f'Bearer {wazuh_token}'}, timeout=20, verify=verify).json()
            request_cluster = self.session.get(
                url + '/cluster/status', headers={'Authorization': f'Bearer {wazuh_token}'}, timeout=20, verify=verify).json()
            if request_cluster['data']['enabled'] == "yes" and request_cluster['data']['running'] == "yes" :
                request_cluster_name = self.session.get(
                    url + '/cluster/local/info', headers={'Authorization': f'Bearer {wazuh_token}'}, timeout=20, verify=verify).json()
                request_cluster_name = { "type" : request_cluster_name['data']['affected_items'][0]['type'], "cluster" : request_cluster_name['data']['affected_items'][0]['cluster'], "node" : request_cluster_name['data']['affected_items'][0]['node'] }                                
            else:
                request_cluster_name = { "cluster": False }
        except ConnectionError as e:
            self.logger.error("manager: Cannot connect to API : %s" % (e))
            return Exception("Unreachable API, please check the URL and port.")
        if "error" in request_manager and request_manager["error"] != 0: #Checks if daemons are up and running
            raise Exception(request_manager["message"])
        output = {}
        output['managerName'] = { 'name': request_manager['data']['affected_items'][0]['name'] }
        output['clusterMode'] = request_cluster['data']
        output['clusterName'] = request_cluster_name       
        return output

    def check_wazuh_version(self, kwargs):
        """Check Wazuh version

        Parameters
        ----------
        kwargs : dict
            The request's parameters
        """
        try:
            opt_username = kwargs["user"]
            opt_password = kwargs["pass"]
            opt_base_url = kwargs["ip"]
            opt_base_port = kwargs["port"]
            url = opt_base_url + ":" + opt_base_port
            verify = False
            auth = requestsbak.auth.HTTPBasicAuth(opt_username, opt_password)
            wazuh_token = self.wztoken.get_auth_token(url,auth)

            wazuh_version = self.session.get(
                url + '/', headers={'Authorization': f'Bearer {wazuh_token}'}, timeout=20, verify=verify).json()   
            wazuh_version = wazuh_version['data']['api_version']

            app_version = cli.getConfStanza(
                'package',
                'app')
            app_version = app_version['version']

            v_split = wazuh_version.split('.')
            a_split = app_version.split('.')

            wazuh_version = str(v_split[0]+"."+v_split[1])
            app_version = str(a_split[0]+"."+a_split[1])
            if wazuh_version != app_version:
                raise Exception("Unexpected Wazuh version. App version: %s, Wazuh version: %s" % (app_version, wazuh_version))
        except Exception as e:
            self.logger.error("Error when checking Wazuh version: %s" % (e))
            raise e
            
    def check_daemons(self, url, auth, verify, check_cluster,kwargs):
        """ Request to check the status of this daemons: execd, modulesd, wazuhdb and clusterd

        Parameters
        ----------
        url: str
        auth: str
        verify: str
        cluster_enabled: bool
        """
        try:
            self.logger.debug("manager: Checking Wazuh daemons.")
            opt_username = kwargs["user"]
            opt_password = kwargs["pass"]
            opt_base_url = kwargs["ip"]
            opt_base_port = kwargs["port"]
            wazuh_token = self.wztoken.get_auth_token(url,auth)
            request_cluster = self.session.get(
                url + '/cluster/status',  headers={'Authorization': f'Bearer {wazuh_token}'}, timeout=self.timeout, verify=verify).json()
            # Try to get cluster is enabled if the request fail set to false
            try:
                cluster_enabled = request_cluster['data']['enabled'] == 'yes'
            except Exception as e:
                cluster_enabled = False
            cc = check_cluster and cluster_enabled # Var to check the cluster demon or not
            opt_endpoint = "/manager/status"
            daemons_status = self.session.get(
                    url + opt_endpoint, headers={'Authorization': f'Bearer {wazuh_token}'},
                    verify=verify).json()
            if not daemons_status['error']:
                d = daemons_status['data']['affected_items'][0]
                daemons = {"execd": d['wazuh-execd'], "modulesd": d['wazuh-modulesd'], "db": d['wazuh-db']}
                if cc:
                    daemons['clusterd'] = d['wazuh-clusterd']
                values = list(daemons.values())
                wazuh_ready = len(set(values)) == 1 and values[0] == "running" # Checks all the status are equals, and running
                return wazuh_ready
        except Exception as e:
            self.logger.error("manager: Error checking daemons: %s" % (e))
            raise e

    @expose_page(must_login=False, methods=['POST'])
    def upload_file(self, **kwargs):
        # Only rules files are uploaded currently
        self.logger.debug("manager: Uploading file(s)")
        try:
            # Get file name and file content
           
            
            file_info = kwargs["file"].__dict__
            file_name = file_info['filename']
            file_content = kwargs['file'].file
            # Get path 
            dest_resource = kwargs["resource"]

            # Get current API data
            opt_id = kwargs["apiId"]
            current_api_json = self.db.get(opt_id)
            current_api_json = jsonbak.loads(current_api_json)
            opt_username = str(current_api_json["data"]["userapi"])
            opt_password = str(current_api_json["data"]["passapi"])
            opt_base_url = str(current_api_json["data"]["url"])
            opt_base_port = str(current_api_json["data"]["portapi"])
            opt_cluster = False
            if "filterType" in current_api_json["data"] and current_api_json["data"]["filterType"] == 'cluster.name':
                opt_cluster = True

            # API requests auth
            auth = requestsbak.auth.HTTPBasicAuth(opt_username, opt_password)
            verify = False
            url = opt_base_url + ":" + opt_base_port
            wazuh_token = self.wztoken.get_auth_token(url,auth)
             
            
            response = self.session.put(url + '/' + dest_resource + '/files/' + file_name, data=file_content, headers= {"Content-type": "application/octet-stream", 'Authorization': f'Bearer {wazuh_token}' }, timeout=20, verify=verify)
            
            result = jsonbak.loads(response.text)       
                 
            if 'error' in result and result['error'] != 0:
                self.logger.error("manager: Error trying to upload a file(s): %s" % (result))
                return jsonbak.dumps({"status": "400", "text": "Error adding file: %s. Cause: %s" % (file_name,result["detail"])})
            return jsonbak.dumps({"status": "200", "text": "File %s was updated successfully. " % file_name})
        except Exception as e:
            self.logger.error("manager: Error trying to upload a file(s): %s" % (e))
            return jsonbak.dumps({"status": "400", "text": "Error adding file: %s. Cause: %s" % (file_name,e)})

    def get_config_on_memory(self):
        try:
            self.logger.debug("manager: Getting configuration on memory.")
            config_str = getSelfConfStanza("config", "configuration")
            config = jsonbak.loads(config_str)
            return config
        except Exception as e:
            self.logger.error("manager: Error getting the configuration on memory: %s" % (e))
            raise e
