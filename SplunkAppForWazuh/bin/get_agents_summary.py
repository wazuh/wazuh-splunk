#!/opt/splunk/bin/python
############################################################
#
# GET /agents/summary
#
############################################################
import sys
import splunk.Intersplunk as si
import requests
import json

try:
    request = requests.get(sys.argv[1]+"/en-US/custom/wazuh/agents/summary?ip="+sys.argv[2]+"&port="+sys.argv[3]+"&user="+sys.argv[4]+"&pass="+sys.argv[5], verify=False)
    data = json.loads(request.text)
except Exception as err:
        import traceback
        print err
        stack = traceback.format_exc()
        data = si.generateErrorResults("Error : Traceback: " + str(stack))

si.outputResults(data)
