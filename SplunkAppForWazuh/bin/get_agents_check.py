#!/opt/splunk/bin/python
############################################################
#
# GET /agents/agents
#
############################################################
import sys
import splunk.Intersplunk as si
import requests
import json

try:
    #pass
    results = []
    request = requests.get("http://192.168.0.159:8000/en-US/custom/SplunkAppForWazuh/agents/agents_checks")
    # print request.text
    data = json.loads(request.text)
except Exception as err:
        import traceback
        print err
        stack = traceback.format_exc()
        data = si.generateErrorResults("Error : Traceback: " + str(stack))

si.outputResults(data)
