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

    request = requests.get(opt_base_url + '/decoders?limit=1', auth=auth, verify=verify)
    decoders_qty = json.loads(request.text)["data"]["totalItems"]

    request = requests.get(opt_base_url + '/decoders?offset=0&limit=' + str(decoders_qty), auth=auth, verify=verify)
    decoders = json.loads(request.text)["data"]["items"]

    for row in decoders:
        data = {}
        for key in row:
            if isinstance(row[key], dict):
                for detail in row[key]:
                    data[key + "-" + detail] = row[key][detail]
            elif isinstance(row[key], list):
                count = 0
                for detail in row[key]:
                    data[str(key) + "-" + str(count)] = detail
                    count += 1
            else:
                data[key] = row[key]
        data = json.dumps(data)
        event = helper.new_event(source=helper.get_input_type(), index=helper.get_output_index(), sourcetype=helper.get_sourcetype(), data=data)
        ew.write_event(event)