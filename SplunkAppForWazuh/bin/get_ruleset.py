#!/opt/splunk/bin/python
############################################################
#
# GET /manager/rules
#
############################################################
import sys
import splunk.Intersplunk as si
import requests
import json

try:
    request = requests.get(sys.argv[1]+":"+sys.argv[2]+"/en-US/custom/wazuh/manager/rules?ip="+sys.argv[3]+"&port="+sys.argv[4]+"&user="+sys.argv[5]+"&pass="+sys.argv[6])
    # data = json.loads(request.text)["data"]["items"]
    data = json.loads(request.text)["data"]["items"]
except Exception as err:
        import traceback
        print err
        stack = traceback.format_exc()
        data = si.generateErrorResults("Error : Traceback: " + str(stack))

si.outputResults(data)
