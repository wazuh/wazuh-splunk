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

import os

from log import log

class EditInputs():
    def __init__(self):
        self.logger = log()
        self.script_path = os.path.abspath(
            __file__).split("bin/inputs_conf.py")[0]
        self.config_path = self.script_path+'default/inputs.conf'

    def read_config_file(self):
        """
        Reads the config.conf file
        """
        try:
            self.logger.debug("bin.inputs.conf: Reading inputs.conf file.")
            f = open(self.config_path)
            content = f.read()
            f.close()
            return content
        except Exception as e:
            self.logger.error("Error reading inputs.conf file: %s" % (e))
            raise e

    def get_inputs(self):
        """
        Returns a dict with the parameters set in the [inputs] block
        """
        try:
            self.logger.debug("bin.inputs_conf: Getting inputs.")
            content = self.read_config_file()
            inputs = content.split("[script://$SPLUNK_HOME/etc/apps/SplunkAppForWazuh/bin/get_agents_status.py]")[1]
            inputs = inputs.split("\n")
            inputs = filter(None, inputs[1: 7])
            inputs_dict = {}
            for c in inputs:
                if '=' in c:
                    k, v = c.split("=")
                    k = k.strip()
                    v = v.strip()
                    inputs_dict[k] = v
            return inputs_dict
        except Exception as e:
            self.logger.error("Error getting inputs: %s" % (e))
            raise e