# -*- coding: utf-8 -*-
"""
Wazuh app - Database backend.

Copyright (C) 2018 Wazuh, Inc.

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

Find more information about this on the LICENSE file.
"""

import json
import os
# from splunk import AuthorizationFailed as AuthorizationFailed
from tinydb import TinyDB, Query
# sys.path.insert(0, os.path.join(os.path.dirname(__file__), "."))
from log import log
import threading


class database():
    """Handle CRUD methods for DB."""

    def __init__(self):
        """Constructor."""
        self.logger = log()
        self.origin = TinyDB(os.path.dirname(
            os.path.abspath(__file__))+'/apilist.json')
        self.db = self.origin.table('apis', cache_size=0)
        self.Api = Query()
        self.mutex = threading.Lock()

    def insert(self, obj):
        """Insert a new API.

        Parameters
        ----------
        obj : dict
            The new API

        """
        with self.mutex:
            try:
                result = self.db.insert(obj)
                parsed_result = json.dumps({'data': result})
            except Exception as e:
                self.logger.error("Error inserting in DB module: %s" % (e))
                raise e
            return parsed_result

    def update(self, obj):
        """Update an already inserted API.

        Parameters
        ----------
        obj : dict
            The API to edit.

        """
        with self.mutex:
            try:
                self.db.update(obj, self.Api.id == obj['id'])
                parsed_result = json.dumps({'data': 'success'})
            except Exception as e:
                self.logger.error("Error updating in DB module: %s" % (e))
                raise e
            return parsed_result

    def remove(self, id):
        """Remove an API.

        Parameters
        ----------
        obj : dict
            The API to be removed.

        """
        with self.mutex:
            try:
                self.db.remove(self.Api.id == id)
                parsed_result = json.dumps({'data': 'success'})
            except Exception as e:
                self.logger.error("Error removing in DB module: %s" % (e))
                raise e
            return parsed_result

    def all(self):
        """Obtain the full API list."""
        with self.mutex:
            try:
                all = self.db.all()
            except Exception as e:
                self.logger.error("Error at get all documents DB module: %s" % (e))
                raise e
            return all

    def get(self, id):
        """Get API by ID.

        Parameters
        ----------
        id : unicode
            The API ID

        """
        with self.mutex:
            try:
                data = self.db.search(self.Api.id == id)
            except Exception as e:
                self.logger.error("Error at get document DB: %s" % (e))
                raise e
            return data
