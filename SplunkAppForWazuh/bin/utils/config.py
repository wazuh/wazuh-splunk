# -*- coding: utf-8 -*-
"""
Wazuh app - API backend module.

Copyright (C) 2015-2021 Wazuh, Inc.

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

Find more information about this on the LICENSE file.
"""


import json
import os

from log import log
from splunk.clilib import cli_common as cli
from splunk.clilib.control_exceptions import ParsingError

SPLUNK_HOME = os.path.normpath(os.environ['SPLUNK_HOME'])
WAZUH_HOME = os.path.join(SPLUNK_HOME, "etc", "apps", "SplunkAppForWazuh")

LOGGER = log()


def get_default_conf_path(filename: str) -> str:
    """Returns the absolute path to $WAZUH_HOME/default/${filename}"""
    return os.path.join(WAZUH_HOME, "default", filename)


def get_default_conf(filename: str, stanza: str) -> dict:
    """
    Reads the file $WAZUH_HOME/default/${file} and returns its contents as a
    dictionary.

    The absolute path of the file is built automatically using the
    get_default_conf_path() function, so simply provide the filename without
    extension.

    Parameters
    ----------
    filename : str
        The filename to be read in the /default directory, without extension.
    stanza : str
        The configuration block to be returned from the conf file.

    Returns
    --------
        A dictionary with the configuration block requested from the file.
    """
    try:
        # ------------------------------
        # Interesting Splunk utility. Returned values can be seen at:
        # https://github.com/wazuh/wazuh-splunk/pull/1340#discussion_r900338325
        # ------------------------------
        # app_conf = cli.getAppConf(
        #     confName="app",
        #     app="SplunkAppForWazuh",
        #     use_btool=False,
        #     app_path=WAZUH_HOME
        # )
        # ------------------------------

        file_path = get_default_conf_path(filename)
        settings = cli.getConfStanza(file_path, stanza)
        json_data = json.dumps(settings)
        LOGGER.debug(f'Reading "{stanza}" from {file_path}: {json_data}')
        return settings
    except Exception as e:
        raise e

def getLocalConfPath(file):
    return os.path.join(
        splunk_home,
        "etc",
        "apps",
        "SplunkAppForWazuh",
        "local",
        file + ".conf"
    )


def getSelfConfStanza(file, stanza):
    """
    Get the configuration from a stanza.

    Parameters
    ----------
    stanza : unicode
        The selected stanza
    """
    try:
        apikeyconf = cli.getConfStanza(file, stanza)
        parsed_data = json.dumps(apikeyconf)
        return parsed_data
    except Exception as e:
        raise e


def getConfStanzaById(file, id):
    extConf = getLocalConfPath(file)
    try:
        stanzas = cli.readConfFile(extConf)
        if id in stanzas:
            return json.dumps(stanzas[id])
        else:
            raise ParsingError("No custom setting for id %s" % id)
    except Exception as e:
        raise e


def putConfStanza(file, stanzaDict):
    extConf = getLocalConfPath(file)
    try:
        cli.mergeConfFile(extConf, stanzaDict)
        return {'error': False}
    except Exception as e:
        raise e


def rmConfStanza(file, stanza):
    try:
        conf = cli.readConfFile(getLocalConfPath(file))
        response = stanza in conf
        if response:
            conf.pop(stanza)
        cli.writeConfFile(getLocalConfPath(file), conf)
        return response
    except Exception as e:
        raise e
