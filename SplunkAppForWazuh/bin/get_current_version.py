#
# Wazuh app - Get current version streamed command
# Copyright (C) 2018 Wazuh, Inc.
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# Find more information about this on the LICENSE file.
#

 #!/opt/splunk/bin/python
import sys
import splunk.Intersplunk as si
from splunk.clilib import cli_common as cli
import json

try:
    app = cli.getConfStanza('version','app')
    app_version = app.get('version')
    app_revision = app.get('revision')
    wazuh = cli.getConfStanza('version','wazuh')
    wazuh_version = wazuh.get('version')
    my_arr = []
    version_dict = {}
    version_dict['appversion'] = app_version
    version_dict['apprevision'] = app_revision
    version_dict['wazuhversion'] = wazuh_version
    my_arr.append(version_dict)
    data_temp = json.dumps(my_arr)
    data = json.loads(data_temp)
except Exception as err:
        import traceback
        stack = traceback.format_exc()
        data = si.generateErrorResults("Error : Traceback: " + str(stack))

si.outputResults(data)
