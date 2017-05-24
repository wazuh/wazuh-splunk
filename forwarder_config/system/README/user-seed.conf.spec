#   Version 6.4.0
#
# Specification for user-seed.conf.  Allows configuration of Splunk's
# initial username and password.  Currently, only one user can be configured
# with user-seed.conf.
#
# Specification for user-seed.conf.  Allows configuration of Splunk's initial username and password.
# Currently, only one user can be configured with user-seed.conf.
#
# To override the default username and password, place user-seed.conf in 
# $SPLUNK_HOME/etc/system/local. You must restart Splunk to enable configurations.
#
# http://docs.splunk.com/Documentation/Splunk/latest/Admin/Aboutconfigurationfiles
# To learn more about configuration files (including precedence) please see the documentation 
# located at http://docs.splunk.com/Documentation/Splunk/latest/Admin/Aboutconfigurationfiles

[user_info]
* Default is Admin.
USERNAME = <string> 
          * Username you want to associate with a password.
          * Default is Admin.
PASSWORD = <password>
          * Password you wish to set for that user.
          * Default is changeme.
