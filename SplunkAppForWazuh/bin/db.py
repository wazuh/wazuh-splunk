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
import json
import os
# from splunk import AuthorizationFailed as AuthorizationFailed
from splunk.appserver.mrsparkle.lib.util import make_splunkhome_path
from tinydb import TinyDB, Query
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "."))
from log import log


class database():
    def __init__(self):
        self.origin = TinyDB(os.path.dirname(os.path.abspath(__file__))+'/apilist.json')
        self.db = self.origin.table('apis',cache_size=0)
        self.Api = Query()

    def insert(self, obj):
        try:
            result = self.db.insert(obj)
            parsed_result = json.dumps({'data': result})
        except Exception as e:
            self.logger.error("Error inserting in DB module: %s" % (e))
            raise e
        return parsed_result

    def update(self, obj):
        try:
            self.db.update(obj, self.Api.id == obj['id'])
            parsed_result = json.dumps({'data': 'success'})
        except Exception as e:
            self.logger.error("Error updating in DB module: %s" % (e))
            raise e
        return parsed_result

    def remove(self, id):
        try:
            self.db.remove(self.Api.id == id)
            parsed_result = json.dumps({'data': 'success'})
        except Exception as e:
            self.logger.error("Error removing in DB module: %s" % (e))
            raise e
        return parsed_result

    def all(self):
        try:
            all = self.db.all()
        except Exception as e:
            self.logger.error("Error at get all documents DB module: %s" % (e))
            raise e
        return all

    def get(self, id):
        try:
            data = self.db.search(self.Api.id == id)
        except Exception as e:
            self.logger.error("Error at get document DB: %s" % (e))
            raise e
        return data
