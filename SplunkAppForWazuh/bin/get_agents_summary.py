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
  request = requests.get(sys.argv[1]+"/en-US/custom/SplunkAppForWazuh/agents/summary?id="+sys.argv[2], verify=False)
  data = json.loads(request.text)
except Exception as err:
  import traceback
  stack = traceback.format_exc()
  data = si.generateErrorResults("Error : Traceback: " + str(stack))

si.outputResults(data)