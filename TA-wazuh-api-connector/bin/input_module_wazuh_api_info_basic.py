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

    request = requests.get(opt_base_url + '/manager/info', auth=auth, verify=verify)
    manager_info = json.loads(request.text)['data']

    request = requests.get(opt_base_url + '/manager/status', auth=auth, verify=verify)
    manager_status = json.loads(request.text)['data']

    request = requests.get(opt_base_url + '/agents/summary', auth=auth, verify=verify)
    agent_summary = json.loads(request.text)['data']

    request = requests.get(opt_base_url + '/manager/logs', auth=auth, verify=verify)
    logs = json.loads(request.text)["data"]["items"]

    # data = {}
    # for key in manager_info:
    #     data['manager-info_' + key.lower()] = manager_info[key]
    #
    # for key in manager_status:
    #     data['manager-status_' + key.lower()] = manager_status[key]
    #
    # for key in agent_summary:
    #     data['agent_summary_' + key.lower().replace(' ', '')] = agent_summary[key]
    #
    # event = helper.new_event(source=helper.get_input_type(), index=helper.get_output_index(), sourcetype=helper.get_sourcetype(), data=json.dumps(data))
    # ew.write_event(event)

    for row in logs:
        data = {}
        for key in row:
            data[key] = row[key]
        data = json.dumps(data)
        event = helper.new_event(source=helper.get_input_type(), index=helper.get_output_index(), sourcetype=helper.get_sourcetype(), data=data)
        ew.write_event(event)
