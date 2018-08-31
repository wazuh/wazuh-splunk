
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
    limit = 500
    offset = 0
    request = requests.get(opt_base_url + '/agents?offset='+str(offset)+'&limit=' + str(limit), auth=auth, verify=verify)
    agents = json.loads(request.text)["data"]["items"]
    total_agents = json.loads(request.text)["data"]["totalItems"]
    for agent in agents:
        event = helper.new_event(source=helper.get_input_type(), index=helper.get_output_index(), sourcetype=helper.get_sourcetype(), data=json.dumps(agent))
        ew.write_event(event)
    if (total_agents > limit):
        while (offset <= total_agents-limit):
            offset+=limit
            request = requests.get(opt_base_url + '/agents?offset='+str(offset)+'&limit=' + str(limit), auth=auth, verify=verify)
            agents = json.loads(request.text)["data"]["items"]
            for agent in agents:
                event = helper.new_event(source=helper.get_input_type(), index=helper.get_output_index(), sourcetype=helper.get_sourcetype(), data=json.dumps(agent))
                ew.write_event(event)