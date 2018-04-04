#!/opt/splunk/bin/python
############################################################
#
# GET /agents/groups
#
############################################################
import sys
import splunk.Intersplunk as si
import requests
import json

try:
    results = []
    request = requests.get("http://10.0.0.90:8000/en-US/custom/wazuh/agents/groups?id="+sys.argv[1])
    data = json.loads(request.text)
except Exception as err:
        import traceback
        print err
        stack = traceback.format_exc()
        data = si.generateErrorResults("Error : Traceback: " + str(stack))

si.outputResults(data)
