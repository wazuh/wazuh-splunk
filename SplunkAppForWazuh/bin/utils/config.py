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

from splunk.clilib import cli_common as cli
from splunk.clilib.control_exceptions import ParsingError

splunk_home = os.path.normpath(os.environ['SPLUNK_HOME'])


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
