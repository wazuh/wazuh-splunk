#!/usr/bin/python
"""
This file is generate by AoB.
Please do not change it.
"""
import os
import re

#If the ta-folder is a symblink, the following code can not handle it
ta_name = os.path.basename(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ta_lib_name = re.sub("[^\w]+", "_", ta_name.lower())
__import__(ta_lib_name + "_declare")

import cloudconnectlib.splunktacollectorlib.cloud_connect_mod_input as mod_input

if __name__ == "__main__":
    mod_input.run()
