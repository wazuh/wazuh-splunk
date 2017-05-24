#   Version 6.4.0
#
# This file contains possible attribute/value pairs for creating roles in
# authorize.conf.  You can configure roles and granular access controls by
# creating your own authorize.conf.

# There is an authorize.conf in $SPLUNK_HOME/etc/system/default/.  To set
# custom configurations, place an authorize.conf in
# $SPLUNK_HOME/etc/system/local/. For examples, see authorize.conf.example.
# You must restart Splunk to enable configurations.
#
# To learn more about configuration files (including precedence) please see
# the documentation located at
# http://docs.splunk.com/Documentation/Splunk/latest/Admin/Aboutconfigurationfiles

# GLOBAL SETTINGS
# Use the [default] stanza to define any global settings.
#   * You can also define global settings outside of any stanza, at the top
#     of the file.
#   * Each conf file should have at most one default stanza. If there are
#     multiple default stanzas, attributes are combined. In the case of
#     multiple definitions of the same attribute, the last definition in
#     the file wins.
#   * If an attribute is defined at both the global level and in a specific
#     stanza, the value in the specific stanza takes precedence.

[default]
srchFilterSelecting = <boolean>
* Determine's whether roles' search filters will be used for selecting or
  eliminating during role inheritance.
* Selecting will join the search filters with an OR when combining the
  filters.
* Eliminating will join the search filters with an AND when combining the
  filters.
    * All roles will default to true (in other words, selecting).
* Example:
  * role1 srchFilter = sourcetype!=ex1 with selecting=true
  * role2 srchFilter = sourcetype=ex2 with selecting = false
  * role3 srchFilter = sourcetype!=ex3 AND index=main with selecting = true
  * role3 inherits from role2 and role 2 inherits from role1
  * Resulting srchFilter = ((sourcetype!=ex1) OR (sourcetype!=ex3 AND index=main)) AND ((sourcetype=ex2))

[capability::<capability>]
* DO NOT edit, remove, or add capability stanzas. The existing capabilities
  are the full set of Splunk system capabilities.
* Splunk adds all of its capabilities this way
* For the default list of capabilities and assignments, see authorize.conf
  under the 'default' directory
* Descriptions of specific capabilities are listed below.

[role_<roleName>]
<capability> = <enabled>
* A capability that is enabled for this role.
* You can list many of these.
* Note that 'enabled' is the only accepted value here, as capabilities are
  disabled by default.
* Roles inherit all capabilities from imported roles, and inherited
  capabilities cannot be disabled.
* Role names cannot have uppercase characters. User names, however, are
  case-insensitive.

importRoles = <string>
* Semicolon delimited list of other roles and their associated capabilities
  that should be imported.
* Importing other roles also imports the other aspects of that role, such as
  allowed indexes to search.
* By default a role imports no other roles.

grantableRoles = <string>
* Semicolon delimited list of roles that can be granted when edit_user
  capability is present.
* By default, a role with edit_user capability can create/edit a user and
  assign any role to them. But when grantableRoles is present, the roles
  that can be assigned will be restricted to the ones provided.
* For a role that has no edit_user capability, grantableRoles has no effect.
* Defaults to not present.
* Example: grantableRoles = role1;role2;role3

srchFilter = <string>
* Semicolon delimited list of search filters for this Role.
* By default we perform no search filtering.
* To override any search filters from imported roles, set this to '*', as
  the 'admin' role does.


srchTimeWin = <number>
* Maximum time span of a search, in seconds.
    * This time window limit is applied backwards from the latest time
      specified in a search.
* By default, searches are not limited to any specific time window.
* To override any search time windows from imported roles, set this to '0'
  (infinite), as the 'admin' role does.
* -1 is a special value that implies no search window has been set for this role
    * This is equivalent to not setting srchTimeWin at all, which means it
      can be easily overridden by an imported role

srchDiskQuota = <number>
* Maximum amount of disk space (MB) that can be used by search jobs of a
  user that belongs to this role
* Defaults to '100', for 100 MB.

srchJobsQuota = <number>
* Maximum number of concurrently running historical searches a member of
  this role can have.
* This excludes real-time searches, see rtSrchJobsQuota.
* Defaults to 3.

rtSrchJobsQuota = <number>
* Maximum number of concurrently running real-time searches a member of this
  role can have.
* Defaults to 6.

srchMaxTime = <number><unit>
* Maximum amount of time that searches of users from this role will be
  allowed to run.
* Once the search has been ran for this amount of time it will be auto
  finalized, If the role
* Inherits from other roles, the maximum srchMaxTime value specified in the
  included roles.
* This maximum does not apply to real-time searches.
* Examples: 1h, 10m, 2hours, 2h, 2hrs, 100s
* Defaults to 100days

srchIndexesDefault = <string>
* Semicolon delimited list of indexes to search when no index is specified
* These indexes can be wildcarded, with the exception that '*' does not
  match internal indexes
* To match internal indexes, start with '_'. All internal indexes are
  represented by '_*'
* Defaults to none, but the UI will automatically populate this with 'main'
  in manager

srchIndexesAllowed = <string>
* Semicolon delimited list of indexes this role is allowed to search
* Follows the same wildcarding semantics as srchIndexesDefault
* Defaults to none, but the UI will automatically populate this with '*' in
  manager

cumulativeSrchJobsQuota = <number>
* Maximum number of concurrently running historical searches that all
  members of this role can have.
* NOTE: if a user belongs to multiple roles then s/he will first consume
        searches from the roles with the largest cumulative search quota,
        when the quota of a role is completely used up then roles with lower
        quotas will be examined. 

cumulativeRTSrchJobsQuota = <number>
* Maximum number of concurrently running real-time searches that all members
  of this role can have.
* NOTE: if a user belongs to multiple roles then s/he will first consume
        searches from the roles with the largest cumulative search quota,
        when the quota of a role is completely used up then roles with lower
        quotas will be examined.


### Descriptions of Splunk system capabilities
[capability::accelerate_datamodel]
* Required to accelerate a datamodel.

[capability::admin_all_objects]
* A role with this capability has access to objects in the system (user
  objects, search jobs, etc.)
* This bypasses any ACL restrictions (similar to root access in a *nix
  environment)
* We check this capability when accessing manager pages and objects

[capability::change_authentication]
* Required to change authentication settings through the various
  authentication endpoints.
* Also controls whether authentication can be reloaded

[capability::change_own_password]
* Self explanatory. Some auth systems prefer to have passwords be immutable
  for some users.

[capability::delete_by_keyword]
* Required to use the 'delete' search operator. Note that this does not
  actually delete the raw data on disk.
* Delete merely masks the data (via the index) from showing up in search
  results.

[capability::edit_deployment_client]
* Self explanatory. The deployment client admin endpoint requires this cap
  for edit.

[capability::list_deployment_client]
* Self explanatory.

[capability::edit_deployment_server]
* Self explanatory. The deployment server admin endpoint requires this cap
  for edit.
* Required to change/create remote inputs that get pushed to the forwarders.

[capability::list_deployment_server]
* Self explanatory.

[capability::edit_dist_peer]
* Required to add and edit peers for distributed search.

[capability::edit_forwarders]
* Required to edit settings for forwarding data.
* Used by TCP and Syslog output admin handlers
* Includes settings for SSL, backoff schemes, etc.

[capability::edit_httpauths]
* Required to edit and end user sessions through the httpauth-tokens endpoint

[capability::edit_input_defaults]
* Required to change the default hostname for input data in the server
  settings endpoint.

[capability::edit_monitor]
* Required to add inputs and edit settings for monitoring files.
* Used by the standard inputs endpoint as well as the one-shot input
  endpoint.

[capability::edit_modinput_winhostmon]
* Required to add and edit inputs for monitoring Windows host data.

[capability::edit_modinput_winnetmon]
* Required to add and edit inputs for monitoring Windows network data.

[capability::edit_modinput_winprintmon]
* Required to add and edit inputs for monitoring Windows printer data.

[capability::edit_modinput_perfmon]
* Required to add and edit inputs for monitoring Windows performance.

[capability::edit_modinput_admon]
* Required to add and edit inputs for monitoring Splunk's Active Directory.

[capability::edit_roles]
* Required to edit roles as well as change the mappings from users to roles.
* Used by both the users and roles endpoint.

[capability::edit_roles_grantable]
* Restrictive version of the edit_roles capability. Only allows creation of 
    roles with subset of the capabilities that the current user has as part of 
    its grantable_roles. only works in conjunction with edit_user and grantableRoles

[capability::edit_scripted]
* Required to create and edit scripted inputs.

[capability::edit_search_server]
* Required to edit general distributed search settings like timeouts,
  heartbeats, and blacklists

[capability::list_introspection]
* Required to read introspection settings and statistics for indexers, search,
  processors, queues, etc.
* Does not permit editing introspection settings.

[capability::list_settings]
* Required to list general server and introspection settings such as the server
  name, log levels, etc.

[capability::edit_server]
* Required to edit general server and introspection settings such as the server 
  name, log levels, etc.
* Inherits ability to read general server and introspection settings.

[capability::edit_search_head_clustering]
* Required to edit and manage search head clustering.

[capability::edit_search_scheduler]
* Required to disable/enable the search scheduler.

[capability::list_search_scheduler]
* Required to display search scheduler settings.

[capability::edit_sourcetypes]
    * Required to create and edit sourcetypes.

[capability::edit_splunktcp]
* Required to change settings for receiving TCP input from another Splunk
  instance.

[capability::edit_splunktcp_ssl]
* Required to list or edit any SSL specific settings for Splunk TCP input.

[capability::edit_splunktcp_token]
* Required to list or edit splunktcptokens which can be used on a receiving
  system to only accept data from forwarders that have been configured with
  same token.

[capability::edit_tcp]
* Required to change settings for receiving general TCP inputs.

[capability::edit_udp]
* Required to change settings for UDP inputs.

[capability::edit_token_http]
* Required to create, edit, display and remove settings for HTTP token input.

[capability::edit_user]
* Required to create, edit, or remove users.
* Note that Splunk users may edit certain aspects of their information
  without this capability.
* Also required to manage certificates for distributed search.

[capability::edit_view_html]
* Required to create, edit, or otherwise modify HTML-based views.

[capability::edit_web_settings]
* Required to change the settings for web.conf through the system settings
  endpoint.

[capability::get_diag]
* Required to use the /streams/diag endpoint to get remote diag from an
  instance

[capability::get_metadata]
* Required to use the 'metadata' search processor.

[capability::get_typeahead]
* Required for typeahead. This includes the typeahead endpoint and the
  'typeahead' search processor.

[capability::input_file]
* Required for inputcsv (except for dispatch=t mode) and inputlookup

[capability::indexes_edit]
* Required to change any index settings like file size and memory limits.

[capability::license_tab]
* Required to access and change the license.(Deprecated)

[capability::license_edit]
* Required to access and change the license.

[capability::license_view_warnings]
* Required to view license warnings on the system banner

[capability::list_forwarders]
* Required to show settings for forwarding data.
* Used by TCP and Syslog output admin handlers.

[capability::list_httpauths]
* Required to list user sessions through the httpauth-tokens endpoint.

[capability::list_inputs]
* Required to view the list of various inputs.
* This includes input from files, TCP, UDP, Scripts, etc.

[capability::list_search_head_clustering]
* Required to list search head clustering objects like artifacts, delegated
  jobs, members, captain, etc.

[capability::output_file]
* Required for outputcsv (except for dispatch=t mode) and outputlookup

[capability::request_remote_tok]
* Required to get a remote authentication token.
* Used for distributing search to old 4.0.x Splunk instances.
* Also used for some distributed peer management and bundle replication.

[capability::rest_apps_management]
* Required to edit settings for entries and categories in the python remote
  apps handler.
* See restmap.conf for more information

[capability::rest_apps_view]
* Required to list various properties in the python remote apps handler.
* See restmap.conf for more info

[capability::rest_properties_get]
* Required to get information from the services/properties endpoint.

[capability::rest_properties_set]
* Required to edit the services/properties endpoint.

[capability::restart_splunkd]
* Required to restart Splunk through the server control handler.

[capability::rtsearch]
* Required to run a realtime search.

[capability::run_debug_commands]
* Required to run debugging commands like 'summarize'

[capability::schedule_search]
* Required to schedule saved searches.

[capability::schedule_rtsearch]
* Required to schedule real time saved searches. Note that scheduled_search
  capability is also required to be enabled

[capability::search]
* Self explanatory - required to run a search.

[capability::use_file_operator]
* Required to use the 'file' search operator.

[capability::accelerate_search]
* Required to save an accelerated search
* All users have this capability by default

[capability::web_debug]
* Required to access /_bump and /debug/** web debug endpoints

[capability::edit_server_crl]
* Required to reload CRL information within Splunk

[capability::search_process_config_refresh]
* Required to use the "refresh search-process-config" CLI command, which
  manually flushes idle search processes.

[capability::extra_x509_validation]
* Required to perform additional X509 validation through
  the /server/security/extra-x509-validation.
