
# encoding = utf-8

import json
import requests

def validate_input(helper, definition):
    pass

def collect_events(helper, ew):
    opt_username = helper.get_arg('username')
    opt_password = helper.get_arg('password')
    opt_base_url = helper.get_arg('base_url')
    auth = requests.auth.HTTPBasicAuth(opt_username, opt_password)
    verify = False

    request = requests.get(opt_base_url + '/agents?limit=0', auth=auth, verify=verify)
    agents_qty = json.loads(request.text)["data"]["totalItems"]

    request = requests.get(opt_base_url + '/agents?offset=0&limit=' + str(agents_qty), auth=auth, verify=verify)
    agents = json.loads(request.text)["data"]["items"]

    for row in agents:
        data = {}
        request = requests.get(opt_base_url + '/agents/' + row["id"], auth=auth, verify=verify)
        agent_info = json.loads(request.text)["data"]

        request = requests.get(opt_base_url + '/rootcheck/' + row["id"] + '/last_scan', auth=auth, verify=verify)
        rootcheck_lastscan = json.loads(request.text)["data"]["start"]

        request = requests.get(opt_base_url + '/syscheck/' + row["id"] + '/last_scan', auth=auth, verify=verify)
        syscheck_lastscan = json.loads(request.text)["data"]["start"]

        keys = ["id", "status", "name", "ip", "dateAdd", "version", "os_family", "lastKeepAlive", "os"]

        data = {}
        for key in keys:
            if key in agent_info:
                data[key] = agent_info[key]

        data["last_rootcheck"] = rootcheck_lastscan
        data["last_syscheck"] = syscheck_lastscan

        event = helper.new_event(source=helper.get_input_type(), index=helper.get_output_index(), sourcetype=helper.get_sourcetype(), data=json.dumps(data))
        ew.write_event(event)
