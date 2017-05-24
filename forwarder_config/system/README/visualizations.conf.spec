#   Version 6.4.0
#
# This file contains definitions for visualizations an app makes avialable
# to the system. An app intending to share visualizations with the system
# should include a visualizations.conf in $SPLUNK_HOME/etc/apps/<appname>/default
#
# visualizations.conf should include one stanza for each visualization to be shared
#
# To learn more about configuration files (including precedence) please see
# the documentation located at
# http://docs.splunk.com/Documentation/Splunk/latest/Admin/Aboutconfigurationfiles

#*******
# The possible attribute/value pairs for visualizations.conf are:
#*******

[<stanza name>]
* Create a unique stanza name for each visualization. It should match the name
  of the visualization 
* Follow the stanza name with any number of the following attribute/value
  pairs.
* If you do not specify an attribute, Splunk uses the default.

disabled = [0|1]
* Disable the visualization by setting to 1.
* If set to 1, the visualization is not available anywhere in Splunk
* Defaults to 0.

label = <string>
* The human-readable label or title of the visualization
* Will be used in dropdowns and lists as the name of the visualization

default_height = <int>
* The default height of the visualization in pixels

description = <string>
* The short description that will show up in the visualization picker

search_fragment = <string>
* An example part of a search that formats the data correctly for the viz. Typically the last pipe(s) in a search query.

allow_user_selection = <bool>
* Whether the visualization should be available for users to select
