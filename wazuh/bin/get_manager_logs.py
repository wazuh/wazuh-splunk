#!/opt/splunk/bin/python
############################################################
#
# GET /manager/logs
#
############################################################
import sys
import splunk.Intersplunk as si
import requests
import json

try:
    request = requests.get('http://'+sys.argv[1]+":"+sys.argv[2]+"/en-US/custom/wazuh/manager/logs?ip="+sys.argv[3]+"&port="+sys.argv[4]+"&user="+sys.argv[5]+"&pass="+sys.argv[6])
    print "cero " + str(sys.argv)

    print "ip " + sys.argv[1]
    print "port " + sys.argv[2]
    print "api " + sys.argv[3]
    print "api port " + sys.argv[4]

    print "api user " + sys.argv[5]

    print "api password " + sys.argv[6]

    data = json.loads(request.text)
except Exception as err:
        import traceback
        print err
        stack = traceback.format_exc()
        data = si.generateErrorResults("Error : Traceback: " + str(stack))

si.outputResults(data)
