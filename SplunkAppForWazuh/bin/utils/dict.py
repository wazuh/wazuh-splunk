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

from typing import Dict, Any
import hashlib
import json
import re

# https://www.doc.ic.ac.uk/~nuric/coding/how-to-hash-a-dictionary-in-python.html
def dict_hash(dictionary: Dict[str, Any]) -> str:
    """MD5 hash of a dictionary."""
    dhash = hashlib.md5()
    # We need to sort arguments so {'a': 1, 'b': 2} is
    # the same as {'b': 2, 'a': 1}
    encoded = json.dumps(dictionary, sort_keys=True).encode()
    dhash.update(encoded)
    return dhash.hexdigest()


def to_json(data: str) -> dict:
    """
    Apply few fixes to a String representation of an object in order
    to be parsed as a JSON object following the (RFC 8259) standard.

    Parameters
    ----------
    data : str
    The string to be parsed.

    Returns
    ----------
    data : JSON object or str
    The parsed string as a JSON object if possible, as a string otherwise.
    """
    data = re.sub('\'\{', '{', data)        # Replace '{ with {
    data = re.sub('\}\'', '}', data)        # Replace }' with }
    data = re.sub('\'', '"', data)          # Replace ' with "
    data = re.sub('None', '"None"', data)   # Replace None with "None"

    try:
        return json.loads(data)
    except ValueError:
        raise ValueError(
            "to_json() - invalid string representation of a JSON object."
            + "Unable to parse."
        )
    