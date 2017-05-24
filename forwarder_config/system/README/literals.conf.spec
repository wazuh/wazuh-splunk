#   Version 6.4.0
#
# This file contains attribute/value pairs for configuring externalized strings
# in literals.conf.
#
# There is a literals.conf in $SPLUNK_HOME/etc/system/default/.  To set custom
# configurations, place a literals.conf in $SPLUNK_HOME/etc/system/local/. For
# examples, see literals.conf.example. You must restart Splunk to enable
# configurations.
#
# To learn more about configuration files (including precedence) please see the
# documentation located at
# http://docs.splunk.com/Documentation/Splunk/latest/Admin/Aboutconfigurationfiles
#
# For the full list of all literals that can be overridden, check out
# $SPLUNK_HOME/etc/system/default/literals.conf.

###############################################################################################
#
# CAUTION:
#
#  - You can destroy Splunk's performance by editing literals.conf incorrectly.
#
#  - Only edit the attribute values (on the right-hand side of the '=').
#    DO NOT edit the attribute names (left-hand side of the '=').
#
#  - When strings contain "%s", do not add or remove any occurrences of %s, or
#    reorder their positions.
#
#  - When strings contain HTML tags, take special care to make sure that all
#    tags and quoted attributes are properly closed, and that all entities such
#    as & are escaped.
#




