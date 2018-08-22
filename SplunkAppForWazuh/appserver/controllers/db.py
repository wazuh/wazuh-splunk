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
# sys.path.insert(0, os.path.join(os.path.dirname(__file__), "."))
from tinydb import TinyDB, Query
db = TinyDB("/opt/splunk/etc/apps/SplunkAppForWazuh/bin/apilist.json")

class database():
  def __init__(self):
   self.data = []

  def insert(object):
    try:
      db.insert(object)
    except Exception as e:
      return str(e)

  def get(url):
    Api = Query()
    return db.search(Api.url == url)
