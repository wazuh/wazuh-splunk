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


class API_model:
    """
    API DTO object
    """

    def __init__(
        self,
        address:    str = None,
        port:       int = None,
        user:       str = None,
        password:   str = None,
        name:       str = None,
        alias:      str = None,
        filter_name:str = None,
        filter_type:str = None, 
        run_as:     bool = False,
        cluster:    bool = False,
        _user:      str = None,
        _key:       str = None,
    ):
        self.address = address
        self.port = API_model._to_number(port)
        self.user = user
        self.password = password
        self.name = name
        self.alias = alias
        self.filter_name = filter_name
        self.filter_type = filter_type
        self.run_as = API_model._to_boolean(run_as)
        self.cluster = API_model._to_boolean(cluster)
        self._user = _user
        self._key = _key

    def get_auth(self):
        from requestsbak.auth import HTTPBasicAuth
        return HTTPBasicAuth(self.user, self.password)

    def get_url(self):
        return f"{self.address}:{self.port}"

    def hide_password(self):
        del self.password

    def can_use_run_as(self):
        return self.run_as and self.user == "wazuh-wui"

    # ------------------------------------------------------------ #
    #   Utility methods (data validation)
    # ------------------------------------------------------------ #

    @staticmethod
    def _to_boolean(attr):
        '''
        Converts a string attribute to a boolean type.
        '''
        if type(attr) is not str or type(attr) is bool:
            return attr
        return attr.lower() == "true"

    @staticmethod
    def _to_number(attr, new_type = int):
        '''
        Converts a string attribute to a number type (integer by default).
        '''
        if new_type not in [int, float]:
            raise TypeError("Invalid number type")
        if type(attr) is not str or type(attr) is new_type:
            return attr
        return new_type(attr)
