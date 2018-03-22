import logging
import os
import sys
import json
import requests
# from splunk import AuthorizationFailed as AuthorizationFailed
import splunk.appserver.mrsparkle.controllers as controllers
import splunk.appserver.mrsparkle.lib.util as util
from splunk.appserver.mrsparkle.lib.util import make_splunkhome_path
from splunk.appserver.mrsparkle.lib.decorators import expose_page
_APPNAME = 'SplunkAppForWazuh'
def setup_logger(level):
    """
    Setup a logger for the REST handler.
    """
    logger = logging.getLogger('splunk.appserver.%s.controllers.agents' % _APPNAME)
    logger.propagate = False  # Prevent the log messages from being duplicated in the python.log file
    logger.setLevel(level)
    file_handler = logging.handlers.RotatingFileHandler(make_splunkhome_path(['var', 'log', 'splunk', 'agents.log']), maxBytes=25000000, backupCount=5)
    formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s')
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)
    return logger
logger = setup_logger(logging.DEBUG)
print 'OK'
class agents(controllers.BaseController):
    # /custom/wazuh/agents/summary
    @expose_page(must_login=False, methods=['GET'])
    def summary(self, **kwargs):
        opt_username = 'foo'
        opt_password = 'bar'
        opt_base_url = 'http://192.168.0.157:55000'
        auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
        verify = False
        request = requests.get(opt_base_url + '/agents/summary', auth=auth, verify=verify)
        agent_summary = json.loads(request.text)['data']
        data = {}
        for key in agent_summary:
            data['agent_summary_' + key.lower().replace(' ', '')] = agent_summary[key]
        data = [data]
        result = json.dumps(data)
        return result