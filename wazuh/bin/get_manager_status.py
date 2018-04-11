#!/opt/splunk/bin/python
############################################################
#
# GET /manager/status
#
############################################################
import sys
import splunk.Intersplunk as si
import requests
import json

try:
    request = requests.get('http://'+sys.argv[1]+":"+sys.argv[2]+"/en-US/custom/wazuh/manager/status?ip="+sys.argv[3]+"&port="+sys.argv[4]+"&user="+sys.argv[5]+"&pass="+sys.argv[6])
    data = json.loads(request.text)
except Exception as err:
        import traceback
        print err
        stack = traceback.format_exc()
        data = si.generateErrorResults("Error : Traceback: " + str(stack))

si.outputResults(data)
