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

from tinydb import TinyDB, Query

class database():
  def __init__(self):
    self.db = TinyDB("/opt/splunk/etc/apps/SplunkAppForWazuh/bin/apilist.json")
    self.Api = Query()

  def insert(self,obj):
    try:
      self.db.insert(obj)
    except Exception as e:
      return str(e)

  def remove(self,id):
    try:
      self.db.remove(self.Api.id == id)
    except Exception as e:
      return str(e)

  def all(self):
    return self.db.all()

  def get(self,id):
    return self.db.search(self.Api.id == id)
