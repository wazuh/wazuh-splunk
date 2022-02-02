#
# Wazuh app - Database backend
# Copyright (C) 2018 Wazuh, Inc.
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# Find more information about this on the LICENSE file.
#


from log import log
from splunk.clilib import cli_common as cli

class EditInputs():
    def __init__(self):
        self.logger = log()



    def get_inputs(self):
        """
        Returns a dict with the parameters set in the [inputs] block
        """
        try:
            self.logger.debug("bin.inputs_conf: Getting inputs.")
            imports = cli.getConfStanza('inputs', 'script:///opt/splunk/etc/apps/SplunkAppForWazuh/bin/get_agents_status.py')
            return imports
        except Exception as e:
            self.logger.error("Error getting inputs: %s" % (e))
            raise e