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


class EditConfig():
    def __init__(self):
        self.logger = log()
        self.script_path = os.path.abspath(
            __file__).split("bin/edit_config.py")[0]
        self.config_path = self.script_path+'default/config.conf'

    def read_config_file(self):
        """
        Reads the config.conf file
        """
        try:
            self.logger.debug("bin.edit_config: Reading config.conf file.")
            f = open(self.config_path)
            content = f.read()
            f.close()
            return content
        except Exception as e:
            self.logger.error("Error reading config.conf file: %s" % (e))
            raise e

    def get_config(self):
        """
        Returns a dict with the parameters set in the [configuration] block
        """
        try:
            self.logger.debug("bin.edit_config: Getting config.")
            content = self.read_config_file()
            config = content.split("[configuration]")[1]
            config = config.split("\n")
            config = filter(None, config)
            config_dict = {}
            for c in config:
                k, v = c.split("=")
                k = k.strip()
                v = v.strip()
                config_dict[k] = v
            return config_dict
        except Exception as e:
            self.logger.error("Error getting configuration: %s" % (e))
            raise e

    def get_unalterable_config(self):
        """
        Returns all the config.conf file content exect the [configuration] block
        """
        try:
            self.logger.debug("bin.edit_config: Getting unalterable config.")
            content = self.read_config_file()
            config = content.split("[configuration]")[0]
            return config
        except Exception as e:
            self.logger.error(
                "Error getting unalterable configuration: %s" % (e))
            raise e

    def update_config(self, new_config):
        """
        Updates the config writting over the config.conf file, 
        modify only the [configuration] block
        """
        try:
            self.logger.debug("bin.edit_config: Updating config.")
            unalterable = self.get_unalterable_config()
            f = open(self.config_path, "w")
            f.write(unalterable)
            f.write("[configuration]")
            for k, v in new_config.items():
                f.write("\n%s = %s" % (str(k), str(v)))
            f.close()
            return {
                "data": "Configuration updated susccesfully.",
                "error": 0
            }
        except Exception as e:
            self.logger.error("Error updating configuration: %s" % (e))
            raise e
