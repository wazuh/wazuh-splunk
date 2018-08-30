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
import logging
import json
# from splunk import AuthorizationFailed as AuthorizationFailed
from splunk.appserver.mrsparkle.lib.util import make_splunkhome_path
from tinydb import TinyDB, Query

_APPNAME = 'SplunkAppForWazuh'
def setup_logger(level):
    """
    Setup a logger for the REST handler.
    """
    logger = logging.getLogger('splunk.appserver.%s.controllers.db' % _APPNAME)
    logger.propagate = False  # Prevent the log messages from being duplicated in the python.log file
    logger.setLevel(level)
    file_handler = logging.handlers.RotatingFileHandler(make_splunkhome_path(['var', 'log', 'splunk', 'db.log']), maxBytes=25000000, backupCount=5)
    formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s')
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)
    return logger
logger = setup_logger(logging.DEBUG)

class database():
    def __init__(self):
        self.origin = TinyDB('/opt/splunk/etc/apps/SplunkAppForWazuh/bin/apilist.json')
        self.db = self.origin.table('apis',cache_size=0)
        self.Api = Query()

    def insert(self, obj):
        try:
            result = self.db.insert(obj)
        except Exception as e:
            logger.info("Error in insert DB: %s" % (e))
            raise e
        return json.dumps({'data': result})

    def update(self, obj):
        try:
            logger.info("Updating this: %s" % (obj))
            self.db.update(obj, self.Api.id == obj['id'])
        except Exception as e:
            raise e
        return json.dumps({'data': 'success'})

    def remove(self, id):
        try:
            self.db.remove(self.Api.id == id)
        except Exception as e:
            raise e
        return json.dumps({'data': 'success'})

    def all(self):
        try:
            all = self.db.all()
        except Exception as e:
            logger.info("Error at get all documents DB: %s" % (e))
            raise e
        return all

    def get(self, id):
        try:
            data = self.db.search(self.Api.id == id)
        except Exception as e:
            logger.info("Error at get document DB: %s" % (e))
            raise e
        return data
