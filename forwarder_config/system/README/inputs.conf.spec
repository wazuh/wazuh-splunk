#   Version 6.4.0

# This file contains possible attributes and values you can use to configure
# inputs, distributed inputs such as forwarders, and file system monitoring in
# inputs.conf.
#
# There is an inputs.conf in $SPLUNK_HOME/etc/system/default/.  To set custom
# configurations, place an inputs.conf in $SPLUNK_HOME/etc/system/local/.  For
# examples, see inputs.conf.example.  You must restart Splunk to enable new
# configurations.
#
# To learn more about configuration files (including precedence), see the
# documentation located at
# http://docs.splunk.com/Documentation/Splunk/latest/Admin/Aboutconfigurationfiles
#

# GLOBAL SETTINGS
# Use the [default] stanza to define any global settings.
#   * You can also define global settings outside of any stanza, at the top of
#     the file.
#   * Each conf file should have at most one default stanza. If there are
#     multiple default stanzas, attributes are combined. In the case of
#     multiple definitions of the same attribute, the last definition in the
#     file wins.
#   * If an attribute is defined at both the global level and in a specific
#     stanza, the value in the specific stanza takes precedence.

#*******
# GENERAL SETTINGS:
# The following attribute/value pairs are valid for all input types (except
# file system change monitor, which is described in a separate section in this
# file).
# You must first enter a stanza header in square brackets, specifying the input
# type. See further down in this file for examples.
# Then, use any of the following attribute/value pairs.
#*******

host = <string>
* Sets the host key/field to a static value for this stanza.
* Primarily used to control the host field, which will be used for events
  coming in via this input stanza.
* Detail: Sets the host key's initial value. The key is used during
  parsing/indexing, in particular to set the host field. It is also the host
  field used at search time.
* As a convenience, the chosen string is prepended with 'host::'.
* WARNING: Do not quote the <string> value: host=foo, not host="foo".
* If set to '$decideOnStartup', will be interpreted as hostname of executing
  machine; this will occur on each splunkd startup.  
* If you are running multiple instances of splunk on the same system (hardware
  or VM), you should probably choose unique values for host to differentiate
  your data, e.g. myhost-sh-1 or myhost-idx-2.
* The literal default conf value is $decideOnStartup, but a default splunk
  install will add the local hostname as determined by dns API to the
  etc/system/local/inputs.conf default stanza, which is the effective default
  value.

index = <string>
* Sets the index to store events from this input.
* Primarily used to specify the index to store events coming in via this input
  stanza.
* Detail: Sets the index key's initial value. The key is used when selecting an
  index to store the events.
* Defaults to "main" (or whatever you have set as your default index).

source = <string>
* Sets the source key/field for events from this input.
* NOTE: Overriding the source key is generally not recommended.  Typically, the
  input layer will provide a more accurate string to aid problem
  analysis and investigation, accurately recording the file from which the data
  was retreived.  Please consider use of source types, tagging, and search
  wildcards before overriding this value.
* Detail: Sets the source key's initial value. The key is used during
  parsing/indexing, in particular to set the source field during
  indexing.  It is also the source field used at search time.
* As a convenience, the chosen string is prepended with 'source::'.
* WARNING: Do not quote the <string> value: source=foo, not source="foo".
* Defaults to the input file path.

sourcetype = <string>
* Sets the sourcetype key/field for events from this input.
* Primarily used to explicitly declare the source type for this data, as
  opposed to allowing it to be determined via automated methods.  This is
  typically important both for searchability and for applying the relevant
  configuration for this type of data during parsing and indexing.
* Detail: Sets the sourcetype key's initial value. The key is used during
  parsing/indexing, in particular to set the source type field during
  indexing. It is also the source type field used at search time.
* As a convenience, the chosen string is prepended with 'sourcetype::'.
* WARNING: Do not quote the <string> value: sourcetype=foo, not sourcetype="foo".
* If unset, Splunk picks a source type based on various aspects of the data.
  There is no hard-coded default.

queue = [parsingQueue|indexQueue]
* Specifies where the input processor should deposit the events it reads.
* Set queue to "parsingQueue" to apply props.conf and other parsing rules to
  your data. For more information about props.conf and rules for timestamping
  and linebreaking, refer to props.conf and the online documentation at
  http://docs.splunk.com/Documentation.
* Set queue to "indexQueue" to send your data directly into the index.
* Defaults to parsingQueue.

# Pipeline Key defaulting.

* Pipeline keys in general can be defaulted in inputs stanzas.
* The list of user-available modifiable pipeline keys is described in
  transforms.conf.spec; see transforms.conf.spec for further information on
  these keys.
* The currently-defined keys which are available literally in inputs stanzas
  are as follows:
queue = <value>
_raw  = <value>
_meta = <value>
_time = <value>
* Inputs have special support for mapping host, source, sourcetype, and index
  to their metadata names such as host -> Metadata:Host
* Defaulting these values is not recommended, and is
  generally only useful as a workaround to other product issues.
* Defaulting these keys in most cases will override the default behavior of
  input processors; but this behavior is not guaranteed in all cases.
* Values defaulted here, as with all values provided by inputs, may be
  altered by transforms at parse-time.

# ***********
# This section contains options for routing data using inputs.conf rather than
# outputs.conf.
# Note concerning routing via inputs.conf:
# This is a simplified set of routing options you can use as data is coming in.
# For more flexible options or details on configuring required or optional
# settings, refer to outputs.conf.spec.

_TCP_ROUTING = <tcpout_group_name>,<tcpout_group_name>,<tcpout_group_name>, ...
* Comma-separated list of tcpout group names.
* Using this, you can selectively forward the data to specific indexer(s).
* Specify the tcpout group the forwarder should use when forwarding the data.
  The tcpout group names are defined in outputs.conf with [tcpout:<tcpout_group_name>].
* Defaults to groups specified in "defaultGroup" in [tcpout] stanza in
  outputs.conf.
* To forward data from the "_internal" index, _TCP_ROUTING must explicitly be
  set to either "*" or a specific splunktcp target group.

_SYSLOG_ROUTING = <syslog_group_name>,<syslog_group_name>,<syslog_group_name>, ...
* Comma-separated list of syslog group names. 
* Using this, you can selectively forward the data to specific destinations as
  syslog events.
* Specify the syslog group to use when forwarding the data.
  The syslog group names are defined in outputs.conf with [syslog:<syslog_group_name>].
* Defaults to groups present in "defaultGroup" in [syslog] stanza in
  outputs.conf.
* The destination host must be configured in outputs.conf, using
  "server=[<ip>|<servername>]:<port>".

_INDEX_AND_FORWARD_ROUTING = <string>
* Only has effect if using selectiveIndexing feature in outputs.conf.
* If set for any input stanza, should cause all data coming from that input
  stanza to be labeled with this setting.
* When selectiveIndexing is in use on a forwarder:
  * data without this label will not be indexed by that forwarder.
  * data with this label will be indexed in addition to any forwarding.
* This setting does not actually cause data to be forwarded or not forwarded in
  any way, nor does it control where the data is forwarded in multiple-forward
  path cases.
* Defaults to not present.

#************
# Blacklist
#************

[blacklist:<path>]
* Protect files on the filesystem from being indexed or previewed.
* Splunk will treat a file as blacklisted if it starts with any of the defined
  blacklisted <paths>.
* The preview endpoint will return and error when asked to preview a
  blacklisted file.
* The oneshot endpoint and command will also return an error.
* When a blacklisted file is monitored (monitor:// or batch://), filestatus
  endpoint will show an error.
* For fschange with sendFullEvent option enabled, contents of backlisted files
  will not be indexed.

#*******
# Valid input types follow, along with their input-specific attributes:
#*******


#*******
# MONITOR:
#*******

[monitor://<path>]
* This directs Splunk to watch all files in <path>.
* <path> can be an entire directory or just a single file.
* You must specify the input type and then the path, so put three slashes in
  your path if you are starting at the root (to include the slash that goes
  before the root directory).

# Additional attributes:

host_regex = <regular expression>
* If specified, <regular expression> extracts host from the path to the file
  for each input file.
    * Detail: This feature examines the source key; if source is set
      explicitly in the stanza, that string will be matched, not the original
      filename.
* Specifically, the first group of the regex is used as the host.
* If the regex fails to match, the default "host =" attribute is used.
* If host_regex and host_segment are both set, host_regex will be ignored.
* Defaults to unset.

host_segment = <integer>
* If set to N, the Nth "/"-separated segment of the path is set as host. If
  host_segment=3, for example, the third segment is used.
* If the value is not an integer or is less than 1, the default "host ="
  attribute is used.
* Defaults to unset.

whitelist = <regular expression>
* If set, files from this input are monitored only if their path matches the
  specified regex.
* Takes precedence over the deprecated _whitelist attribute, which functions
  the same way.

blacklist = <regular expression>
* If set, files from this input are NOT monitored if their path matches the
  specified regex.
* Takes precedence over the deprecated _blacklist attribute, which functions
  the same way.

Note concerning wildcards and monitor:
* You can use wildcards to specify your input path for monitored input. Use
  "..." for recursive directory matching and "*" for wildcard matching in a
  single directory segment.
* "..." recurses through directories. This means that /foo/.../bar will match
  foo/bar, foo/1/bar, foo/1/2/bar, etc.
* You can use multiple "..." specifications in a single input path. For
  example: /foo/.../bar/...
* The asterisk (*) matches anything in a single path segment; unlike "...", it
  does not recurse.  For example, /foo/*/bar matches the files /foo/bar,
  /foo/1/bar, /foo/2/bar, etc. However, it does not match /foo/1/2/bar.
  A second example: /foo/m*r/bar matches /foo/mr/bar, /foo/mir/bar,
  /foo/moor/bar, etc.
* You can combine "*" and "..." as needed: foo/.../bar/* matches any file in
  the bar directory within the specified path.

crcSalt = <string>
* Use this setting to force Splunk to consume files that have matching CRCs
  (cyclic redundancy checks).
    * (Splunk only performs CRC checks against, by default, the first 256 bytes
      a file. This behavior prevents Splunk from indexing the same file twice,
      even though you may have renamed it -- as, for example, with rolling log
      files. However, because the CRC is based on only the first few lines of
      the file, it is possible for legitimately different files to have matching
      CRCs, particularly if they have identical headers.)
* If set, <string> is added to the CRC.
* If set to the literal string <SOURCE> (including the angle brackets), the
  full directory path to the source file is added to the CRC. This ensures that
  each file being monitored has a unique CRC.   When crcSalt is invoked, it is
  usually set to <SOURCE>.
* Be cautious about using this attribute with rolling log files; it could lead
  to the log file being re-indexed after it has rolled.
* In many situations, initCrcLength can be used to achieve the same goals.
* Defaults to empty.

initCrcLength = <integer>
* This setting adjusts how much of a file Splunk reads before trying to
  identify whether it is a file that has already been seen.  You may want to
  adjust this if you have many files with common headers (comment headers, long
  CSV headers, etc) and recurring filenames.
* CAUTION: Improper use of this setting will cause data to be reindexed.  You
  may wish to consult with Splunk Support before adjusting this value - the
  default is fine for most installations.
* Defaults to 256 (bytes).
* Must be in the range 256-1048576.

ignoreOlderThan = <nonnegative integer>[s|m|h|d]
* Causes the monitored input to stop checking files for updates if their
  modtime has passed this threshold.  This improves the speed of file tracking
  operations when monitoring directory hierarchies with large numbers of
  historical files (for example, when active log files are colocated with old
  files that are no longer being written to).
  * As a result, do not select a cutoff that could ever occur for a file
    you wish to index.  Take downtime into account!
    Suggested value: 14d , which means 2 weeks
* A file whose modtime falls outside this time window when seen for the first
  time will not be indexed at all.
* Default: 0, meaning no threshold.

followTail = [0|1]
* WARNING: Use of followTail should be considered an advanced administrative
  action.
* Treat this setting as an 'action'.  That is, bring splunk up with this
  setting enabled.  Wait enough time for splunk to identify the related files,
  then disable the setting and restart splunk without it.
* DO NOT leave followTail enabled in an ongoing fashion.
* Do not use for rolling log files, or files whose names or paths vary.
* Can be used to force splunk to skip past all current data for a given stanza.
  * In more detail: this is intended to mean that if you start up splunk with a
    stanza configured this way, all data in the file at the time it is first
    encountered will not be read.  Only data arriving after that first
    encounter time will be read.
  * This can be used to "skip over" data from old log files, or old portions of
    log files, to get started on current data right away.
* If set to 1, monitoring begins at the end of the file (like tail -f).
* If set to 0, Splunk will always start at the beginning of the file.
* Defaults to 0.

alwaysOpenFile = [0|1]
* Opens a file to check whether it has already been indexed, by skipping the
  modtime/size checks.
* Only useful for files that do not update modtime or size.
* Only known to be needed when monitoring files on Windows, mostly for IIS
  logs.
* This flag should only be used as a last resort, as it increases load and
  slows down indexing.
* Defaults to 0.

time_before_close = <integer>
* Modtime delta required before Splunk can close a file on EOF.
* Tells the system not to close files that have been updated in past <integer>
  seconds.
* Defaults to 3.

multiline_event_extra_waittime = [true|false]
*By default, Splunk Enterprise sends an event delimiter when (1) it reaches EOF of a file it monitors and (2) the last char it reads is a newline.
*In some cases, it takes time for all lines of a multiple-line event to arrive.
*Set to true to delay sending an event delimiter until the time that Splunk Enterprise closes the file, as defined by the time_before_close attribute, to allow all event lines to arrive.
*Default to false.

recursive = [true|false]
* If false, Splunk will not monitor subdirectories found within a monitored
  directory.
* Defaults to true.

followSymlink = [true|false]
* Tells Splunk whether or not to follow any symbolic links within a directory
  it is monitoring.
* If set to false, Splunk will ignore symbolic links found within a monitored
  directory.
* If set to true, Splunk will follow symbolic links and monitor files at the
  symbolic link's destination.
* Additionally, any whitelists or blacklists defined for the stanza also apply
  to files at the symbolic link's destination.
* Defaults to true.

_whitelist = ...
* This setting is deprecated.  It is still honored, unless "whitelist"
  attribute also exists.

_blacklist = ...
* This setting is deprecated.  It is still honored, unless "blacklist"
  attribute also exists.

dedicatedFD = ...
* This setting has been removed.  It is no longer needed.

#****************************************
# BATCH  ("Upload a file" in Splunk Web):
#****************************************

NOTE: Batch should only be used for large archives of historic data. If you
want to continuously monitor a directory or index small archives, use monitor
(see above). Batch reads in the file and indexes it, and then deletes the file
from the Splunk instance.

[batch://<path>]
* One time, destructive input of files in <path>.
* For continuous, non-destructive inputs of files, use monitor instead.

# Additional attributes:

move_policy = sinkhole
* IMPORTANT: This attribute/value pair is required. You *must* include
  "move_policy = sinkhole" when defining batch inputs.
* This loads the file destructively.
* Do not use the batch input type for files you do not want to consume
  destructively.
* As long as this is set, Splunk won't keep track of indexed files. Without the
  "move_policy = sinkhole" setting, it won't load the files destructively and
  will keep a track of them. 

host_regex = see MONITOR, above.
host_segment = see MONITOR, above.
crcSalt = see MONITOR, above.

# IMPORTANT: The following attribute is not used by batch:
# source = <string>

followSymlink = [true|false]
* Works similarly to the same setting for monitor, but will not delete files
  after following a symlink out of the monitored directory.

# The following settings work identically as for [monitor::] stanzas, documented above
host_regex = <regular expression>
host_segment = <integer>
crcSalt = <string>
recursive = [true|false]
whitelist = <regular expression>
blacklist = <regular expression>
initCrcLength = <integer>

#*******
# TCP: 
#*******

[tcp://<remote server>:<port>]
* Configure Splunk to listen on a specific port.
* If a connection is made from <remote server>, this stanza is used to
  configure the input.
* If <remote server> is empty, this stanza matches all connections on the
  specified port.
* Will generate events with source set to tcp:portnumber, for example: tcp:514
* If sourcetype is unspecified, will generate events with sourcetype 
  set to tcp-raw.

# Additional attributes:

connection_host = [ip|dns|none]
* "ip" sets the host to the IP address of the system sending the data.
* "dns" sets the host to the reverse DNS entry for IP address of the system
  sending the data.
* "none" leaves the host as specified in inputs.conf, typically the splunk
  system hostname.
* Defaults to "dns".

queueSize = <integer>[KB|MB|GB]
* Maximum size of the in-memory input queue.
* Defaults to 500KB.

persistentQueueSize = <integer>[KB|MB|GB|TB]
* Maximum size of the persistent queue file.
* Defaults to 0 (no persistent queue).
* If set to some value other than 0, persistentQueueSize must be larger than
  the in-memory queue size (set by queueSize attribute in inputs.conf or
  maxSize settings in [queue] stanzas in server.conf).
* Persistent queues can help prevent loss of transient data. For information on
  persistent queues and how the queueSize and persistentQueueSize settings
  interact, see the online documentation.

requireHeader = <bool>
* Require a header be present at the beginning of every stream.
* This header may be used to override indexing settings.
* Defaults to false.

listenOnIPv6 = <no | yes | only>
* Toggle whether this listening port will listen on IPv4, IPv6, or both
* If not present, the setting in the [general] stanza of server.conf will be
  used

acceptFrom = <network_acl> ...
* Lists a set of networks or addresses to accept connections from.  These rules
  are separated by commas or spaces
* Each rule can be in the following forms:
    1. A single IPv4 or IPv6 address (examples: "10.1.2.3", "fe80::4a3")
    2. A CIDR block of addresses (examples: "10/8", "fe80:1234/32")
    3. A DNS name, possibly with a '*' used as a wildcard (examples:
       "myhost.example.com", "*.splunk.com")
    4. A single '*' which matches anything
* Entries can also be prefixed with '!' to cause the rule to reject the
  connection.  Rules are applied in order, and the first one to match is
  used.  For example, "!10.1/16, *" will allow connections from everywhere
  except the 10.1.*.* network.
* Defaults to "*" (accept from anywhere)

rawTcpDoneTimeout = <seconds>
* Specifies timeout value for sending Done-key.
* If a connection over this port remains idle after receiving data for
  specified seconds, it adds a Done-key, thus declaring the last event has been
  completely received.
* Defaults to 10 second.

#*******
# Data distribution:
#*******

# Global settings for splunktcp. Used on the receiving side for data forwarded
# from a forwarder.

[splunktcp]
route = [has_key|absent_key:<key>:<queueName>;...]
* Settings for the light forwarder.
* Splunk sets these parameters automatically -- you DO NOT need to set them.
* The property route is composed of rules delimited by ';'.
* Splunk checks each incoming data payload via cooked tcp port against the
  route rules.
* If a matching rule is found, Splunk sends the payload to the specified
  <queueName>.
* If no matching rule is found, Splunk sends the payload to the default queue
  specified by any queue= for this stanza. If no queue= key is set in
  the stanza or globally, the events will be sent to the parsingQueue.

enableS2SHeartbeat = [true|false]
* This specifies the global keepalive setting for all splunktcp ports.
* This option is used to detect forwarders which may have become unavailable
  due to network, firewall, etc., problems.
* Splunk will monitor each connection for presence of heartbeat, and if the
  heartbeat is not seen for s2sHeartbeatTimeout seconds, it will close the
  connection.
* Defaults to true (heartbeat monitoring enabled).

s2sHeartbeatTimeout = <seconds>
* This specifies the global timeout value for monitoring heartbeats.
* Splunk will close a forwarder connection if heartbeat is not seen for
  s2sHeartbeatTimeout seconds.
* Defaults to 600 seconds (10 minutes).

inputShutdownTimeout = <seconds>
* Used during shutdown to minimize data loss when forwarders are connected to a
  receiver.
  During shutdown, the tcp input processor waits for the specified number of
  seconds and then closes any remaining open connections. If, however, all
  connections close before the end of the timeout period, shutdown proceeds
  immediately, without waiting for the timeout.

stopAcceptorAfterQBlock = <seconds>
* Specifies seconds to wait before closing splunktcp port.
* If splunk is unable to insert received data into the configured queue for
  more than the specified number of seconds, it closes the splunktcp port.
* This action prevents forwarders establishing new connections to this indexer,
  and existing forwarders will notice the port is closed upon test-connections
  and migrate to other indexers. 
* Once the queue unblocks, and TCP Input can continue processing data, Splunk
  starts listening on the port again.
* This setting should not be adjusted lightly; extreme values may interact
  poorly with other defaults.
* Defaults to 300 seconds (5 minutes).

listenOnIPv6 = <no | yes | only>
* Toggle whether this listening port will listen on IPv4, IPv6, or both
* If not present, the setting in the [general] stanza of server.conf will be
  used.

acceptFrom = <network_acl> ...
* Lists a set of networks or addresses to accept connections from.  These rules
  are separated by commas or spaces
* Each rule can be in the following forms:
    1. A single IPv4 or IPv6 address (examples: "10.1.2.3", "fe80::4a3")
    2. A CIDR block of addresses (examples: "10/8", "fe80:1234/32")
    3. A DNS name, possibly with a '*' used as a wildcard (examples:
       "myhost.example.com", "*.splunk.com")
    4. A single '*' which matches anything
* Entries can also be prefixed with '!' to cause the rule to reject the
  connection.  Rules are applied in order, and the first one to match is
  used.  For example, "!10.1/16, *" will allow connections from everywhere
  except the 10.1.*.* network.
* Defaults to "*" (accept from anywhere)

negotiateNewProtocol = [true|false]
* If set to true, allow forwarders that connect to this indexer (or
  specific port) to send data using the new forwarder protocol.
* If set to false, deny the use of the new forwarder protocol during connection
  negotation.
* Defaults to true.

concurrentChannelLimit = <unsigned integer>
* Each forwarder that connects to this indexer may use up to
  <concurrentChannelLimit> unique channel codes.
* In other words, each forwarder may have up to <concurrentChannelLimit>
  channels in flight concurrently.
* Splunk will close a forwarder connection if a forwarder attempts to exceed
  this value.
* This setting only applies when the new forwarder protocol is in use.
* Defaults to 300.

# Forwarder-specific settings for splunktcp. 

[splunktcp://[<remote server>]:<port>]
* This input stanza is used with Splunk instances receiving data from
  forwarders ("receivers"). See the topic
  http://docs.splunk.com/Documentation/Splunk/latest/deploy/Aboutforwardingandreceivingdata
  for more information.
* This is the same as TCP, except the remote server is assumed to be a Splunk
  instance, most likely a forwarder.
* <remote server> is optional.  If specified, will only listen for data
  from <remote server>.
  * Use of <remote server is not recommended.  This feature has been superseded
    by the acceptFrom setting.

connection_host = [ip|dns|none]
* For splunktcp, the host or connection_host will be used if the remote Splunk
  instance does not set a host,
  or if the host is set to "<host>::<localhost>".
* "ip" sets the host to the IP address of the system sending the data.
* "dns" sets the host to the reverse DNS entry for IP address of the system
  sending the data.
* "none" leaves the host as specified in inputs.conf, typically the splunk
  system hostname.
* Defaults to "ip".

compressed = [true|false]
* Specifies whether receiving compressed data.
* Applies to non-SSL receiving only. There is no compression setting required
  for SSL.
* If set to true, the forwarder port(s) should also have compression turned on;
  otherwise, the receiver will reject the connection.
* Defaults to false.

enableS2SHeartbeat = [true|false]
* This specifies the keepalive setting for the splunktcp port.
* This option is used to detect forwarders which may have become unavailable
  due to network, firewall, etc., problems.
* Splunk will monitor the connection for presence of heartbeat, and if the
  heartbeat is not seen for s2sHeartbeatTimeout seconds, it will close the
  connection.
* This overrides the default value specified at the global [splunktcp] stanza.
* Defaults to true (heartbeat monitoring enabled).

s2sHeartbeatTimeout = <seconds>
* This specifies the timeout value for monitoring heartbeats.
* Splunk will will close the forwarder connection if heartbeat is not seen for
  s2sHeartbeatTimeout seconds.
* This overrides the default value specified at global [splunktcp] stanza.
* Defaults to 600 seconds (10 minutes).

queueSize = <integer>[KB|MB|GB]
* Maximum size of the in-memory input queue.
* Defaults to 500KB.

negotiateNewProtocol = [true|false]
* See comments for [splunktcp].

concurrentChannelLimit = <unsigned integer>
* See comments for [splunktcp].

[splunktcp:<port>]
* This input stanza is same as [splunktcp://[<remote server>]:<port>] but
  without any remote server restriction
* Please see documentation for [splunktcp://[<remote server>]:<port>] for
  following supported settings:
connection_host = [ip|dns|none]
compressed = [true|false]
enableS2SHeartbeat = [true|false]
s2sHeartbeatTimeout = <seconds>
queueSize = <integer>[KB|MB|GB]
negotiateNewProtocol = [true|false]
concurrentChannelLimit = <unsigned integer>

# Access control settings.
[splunktcptoken://<token name>]
* This stanza is optional, use it to specify forwarders from which to accept data.
  You must configure a token on receiver, then configure that token in forwarders.
* Data from forwarders not configured with this token will be discarded.
* This setting is enabled for all receiving ports.

token = <string>
* Value of token.

# SSL settings for data distribution:

[splunktcp-ssl:<port>]
* Use this stanza type if you are receiving encrypted, parsed data from a
  forwarder.
* Set <port> to the port on which the forwarder is sending the encrypted data.
* Forwarder settings are set in outputs.conf on the forwarder.
* Compression for SSL is enabled by default. On forwarder you can still specify
  compression using 'useClientSSLCompression' setting in outputs.conf.
  'compressed' setting is used for non-SSL. However, if 'compressed' is still
  specified for SSL, ensure that 'compressed' setting is same as forwarder, as
  splunktcp protocol expects same 'compressed' setting from forwarder as well.

connection_host = [ip|dns|none]
* For SplunkTCP, the host or connection_host will be used if the remote Splunk
  instance does not set a host, or if the host is set to "<host>::<localhost>".
* "ip" sets the host to the IP address of the system sending the data.
* "dns" sets the host to the reverse DNS entry for IP address of the system
  sending the data.
* "none" leaves the host as specified in inputs.conf, typically the splunk
  system hostname.
* Defaults to "ip".

enableS2SHeartbeat = true|false
* See comments for [splunktcp:<port>].

s2sHeartbeatTimeout = <seconds>
* See comments for [splunktcp:<port>].

listenOnIPv6 = <no | yes | only>
* Toggle whether this listening port will listen on IPv4, IPv6, or both
* If not present, the setting in the [general] stanza of server.conf will be
  used

acceptFrom = <network_acl> ...
* Lists a set of networks or addresses to accept connections from.  These rules
  are separated by commas or spaces
* Each rule can be in the following forms:
    1. A single IPv4 or IPv6 address (examples: "10.1.2.3", "fe80::4a3")
    2. A CIDR block of addresses (examples: "10/8", "fe80:1234/32")
    3. A DNS name, possibly with a '*' used as a wildcard (examples:
       "myhost.example.com", "*.splunk.com")
    4. A single '*' which matches anything
* Entries can also be prefixed with '!' to cause the rule to reject the
  connection.  Rules are applied in order, and the first one to match is
  used.  For example, "!10.1/16, *" will allow connections from everywhere
  except the 10.1.*.* network.
* Defaults to "*" (accept from anywhere)

negotiateNewProtocol = [true|false]
* See comments for [splunktcp].

concurrentChannelLimit = <unsigned integer>
* See comments for [splunktcp].

[tcp-ssl:<port>]
* Use this stanza type if you are receiving encrypted, unparsed data from a
  forwarder or third-party system.
* Set <port> to the port on which the forwarder/third-party system is sending
  unparsed, encrypted data.

listenOnIPv6 = <no | yes | only>
* Toggle whether this listening port will listen on IPv4, IPv6, or both
* If not present, the setting in the [general] stanza of server.conf will be used

acceptFrom = <network_acl> ...
* Lists a set of networks or addresses to accept connections from.  These rules
  are separated by commas or spaces
* Each rule can be in the following forms:
    1. A single IPv4 or IPv6 address (examples: "10.1.2.3", "fe80::4a3")
    2. A CIDR block of addresses (examples: "10/8", "fe80:1234/32")
    3. A DNS name, possibly with a '*' used as a wildcard (examples:
       "myhost.example.com", "*.splunk.com")
    4. A single '*' which matches anything
* Entries can also be prefixed with '!' to cause the rule to reject the
  connection.  Rules are applied in order, and the first one to match is
  used.  For example, "!10.1/16, *" will allow connections from everywhere
  except the 10.1.*.* network.
* Defaults to "*" (accept from anywhere)

[SSL]
* Set the following specifications for SSL underneath this stanza name:

serverCert = <path>
* Full path to the server certificate.

password = <password>
* Server certificate password, if any.

rootCA = <path>
* DEPRECATED; use server.conf/[sslConfig]/sslRootCAPath instead.
* Used only when 'sslRootCAPath' is unset.
* Full path to the root CA (Certificate Authority) certificate store.
* The <path> must refer to a PEM format file containing one or more root CA
  certificates concatenated together.
* Default is unset.

requireClientCert = [true|false]
* Determines whether a client must authenticate.
* Defaults to false.

sslVersions = <string>
* Comma-separated list of SSL versions to support
* The versions available are "ssl3", "tls1.0", "tls1.1", and "tls1.2"
* The special version "*" selects all supported versions.  The version "tls"
  selects all versions tls1.0 or newer
* If a version is prefixed with "-" it is removed from the list
* SSLv2 is always disabled; "-ssl2" is accepted in the version list but does nothing
* When configured in FIPS mode ssl3 is always disabled regardless of
  this configuration
* Defaults to "*,-ssl2".  (anything newer than SSLv2)

supportSSLV3Only = [true|false]
* DEPRECATED.  SSLv2 is now always disabled.  The exact set of
  SSL versions allowed is now configurable via the "sslVersions" setting above

cipherSuite = <cipher suite string>
* If set, uses the specified cipher string for the input processors.
* If not set, the default cipher string is used.
* Provided by OpenSSL. This is used to ensure that the server does not
  accept connections using weak encryption protocols.
* Must specify 'dhFile' to enable any Diffie-Hellman ciphers.

ecdhCurveName = <string>
* DEPRECATED, Use 'ecdhCurves' to specify one or more ec curves instead.
* ECDH curve to use for ECDH key negotiation
* We only support named curves specified by their SHORT name.
* The list of valid named curves by their short/long names
  can be obtained by executing this command:
  $SPLUNK_HOME/bin/splunk cmd openssl ecparam -list_curves
* Default is empty string.

ecdhCurves = <comma separated list of ec curves>
* ECDH curves to use for ECDH key negotiation.
* The curves should be specified in the order of preference.
* The client sends these curves as a part of Client Hello.
* The server supports only the curves specified in the list.
* We only support named curves specified by their SHORT names.
  (see struct ASN1_OBJECT in asn1.h)
* The list of valid named curves by their short/long names can be obtained
  by executing this command:
  $SPLUNK_HOME/bin/splunk cmd openssl ecparam -list_curves
* Default is empty string.
* e.g. ecdhCurves = prime256v1,secp384r1,secp521r1

dhfile = <path>
* DEPRECATED
* Use 'dhFile' instead.

dhFile = <path>
* Full path to the Diffie-Hellman parameter file.
* The file needs to be in PEM format and DH group size should be no less than 2048bits.
* This file is required in order to enable any Diffie-Hellman ciphers.
* Not set by default.

allowSslRenegotiation = true|false
* In the SSL protocol, a client may request renegotiation of the connection
  settings from time to time.
* Setting this to false causes the server to reject all renegotiation
  attempts, breaking the connection.  This limits the amount of CPU a
  single TCP connection can use, but it can cause connectivity problems
  especially for long-lived connections.
* Defaults to true.

sslQuietShutdown = [true|false]
* Enables quiet shutdown mode in SSL
* Defaults to false

sslCommonNameToCheck = <commonName1>, <commonName2>, ...
* Optional. Defaults to no common name checking.
* Check the common name of the client's certificate against this list of names.
* If there is no match, assume that Splunk is not authenticated against this
  server.
* requireClientCert must be set to true for this setting to work.

sslAltNameToCheck = <alternateName1>, <alternateName2>, ... 
* Optional. Defaults to no alternate name checking.
* Check the alternate name of the client's certificate against this list of names.
* If there is no match, assume that Splunk is not authenticated against this
  server.
* requireClientCert must be set to true for this setting to work.

#*******
# UDP:
#*******

[udp://<remote server>:<port>]
* Similar to TCP, except that it listens on a UDP port.
* Only one stanza per port number is currently supported.
* Configure Splunk to listen on a specific port.
* If <remote server> is specified, the specified port will only accept data
  from that server.
* If <remote server> is empty - [udp://<port>] - the port will accept data sent
  from any server.
  * remote server is not recommended.  This feature has been superseded by the
    acceptFrom setting.
* Will generate events with source set to udp:portnumber, for example: udp:514
* If sourcetype is unspecified, will generate events with sourcetype set 
  to udp:portnumber .

# Additional attributes:

connection_host = [ip|dns|none]
* "ip" sets the host to the IP address of the system sending the data.
* "dns" sets the host to the reverse DNS entry for IP address of the system
  sending the data.
* "none" leaves the host as specified in inputs.conf, typically the splunk
  system hostname.
* Defaults to "ip".

_rcvbuf = <integer>
* Specifies the receive buffer for the UDP port (in bytes).
* If the value is 0 or negative, it is ignored.
* Note: If the default value is too large for an OS, Splunk will try to set the
  value to 1572864/2. If that value also fails, Splunk will retry with
  1572864/(2*2). It will continue to retry by halving the value until it
  succeeds.
* Defaults to 1,572,864.

no_priority_stripping = [true|false]
* Setting for receiving syslog data.
* If this attribute is set to true, Splunk does NOT strip the <priority> syslog
  field from received events.
* NOTE: Do NOT include this attribute if you want to strip <priority>.
* Default is false.

no_appending_timestamp = [true|false]
* If this attribute is set to true, Splunk does NOT append a timestamp and host
  to received events.
* NOTE: Do NOT include this attribute if you want to append timestamp and host
  to received events.
* Default is false.

queueSize = <integer>[KB|MB|GB]
* Maximum size of the in-memory input queue.
* Defaults to 500KB.

persistentQueueSize = <integer>[KB|MB|GB|TB]
* Maximum size of the persistent queue file.
* Defaults to 0 (no persistent queue).
* If set to some value other than 0, persistentQueueSize must be larger than
  the in-memory queue size (set by queueSize attribute in inputs.conf or
  maxSize settings in [queue] stanzas in server.conf).
* Persistent queues can help prevent loss of transient data. For information on
  persistent queues and how the queueSize and persistentQueueSize settings
  interact, see the online documentation.

listenOnIPv6 = <no | yes | only>
* Toggle whether this port will listen on IPv4, IPv6, or both
* If not present, the setting in the [general] stanza of server.conf will be
  used

acceptFrom = <network_acl> ...
* Lists a set of networks or addresses to accept data from.  These rules are
  separated by commas or spaces
* Each rule can be in the following forms:
    1. A single IPv4 or IPv6 address (examples: "10.1.2.3", "fe80::4a3")
    2. A CIDR block of addresses (examples: "10/8", "fe80:1234/32")
    3. A DNS name, possibly with a '*' used as a wildcard (examples:
       "myhost.example.com", "*.splunk.com")
    4. A single '*' which matches anything
* Entries can also be prefixed with '!' to cause the rule to reject the
  connection.  Rules are applied in order, and the first one to match is
  used.  For example, "!10.1/16, *" will allow connections from everywhere
  except the 10.1.*.* network.
* Defaults to "*" (accept from anywhere)

[udp:<port>]
* This input stanza is same as [udp://<remote server>:<port>] but without any
  remote server restriction
* Please see the documentation for [udp://<remote server>:<port>] to follow
  supported settings:

connection_host = [ip|dns|none]
_rcvbuf = <integer>
no_priority_stripping = [true|false]
no_appending_timestamp = [true|false]
queueSize = <integer>[KB|MB|GB]
persistentQueueSize = <integer>[KB|MB|GB|TB]
listenOnIPv6 = <no | yes | only>
acceptFrom = <network_acl> ...

#*******
# FIFO:
#*******

[fifo://<path>]
* This directs Splunk to read from a FIFO at the specified path.

queueSize = <integer>[KB|MB|GB]
* Maximum size of the in-memory input queue.
* Defaults to 500KB.

persistentQueueSize = <integer>[KB|MB|GB|TB]
* Maximum size of the persistent queue file.
* Defaults to 0 (no persistent queue).
* If set to some value other than 0, persistentQueueSize must be larger than
  the in-memory queue size (set by queueSize attribute in inputs.conf or
  maxSize settings in [queue] stanzas in server.conf).
* Persistent queues can help prevent loss of transient data. For information on
  persistent queues and how the queueSize and persistentQueueSize settings
  interact, see the online documentation.


#*******
# Scripted Input:
#*******

[script://<cmd>]
* Runs <cmd> at a configured interval (see below) and indexes the output.  
* The <cmd> must reside in one of:
  * $SPLUNK_HOME/etc/system/bin/
  * $SPLUNK_HOME/etc/apps/$YOUR_APP/bin/
  * $SPLUNK_HOME/bin/scripts/
* Script path can be an absolute path, make use of an environment variable such
  as $SPLUNK_HOME, or use the special pattern of an initial '.' as the first
  directory to indicate a location inside the current app.   Note that the '.'
  must be followed by a platform-specific directory separator.
  * For example, on UNIX:
        [script://./bin/my_script.sh]
    Or on Windows:
        [script://.\bin\my_program.exe]
    This '.' pattern is strongly recommended for app developers, and necessary
    for operation in search head pooling environments.
* Splunk on Windows ships with several Windows-only scripted inputs. Check
  toward the end of the inputs.conf.example for examples of the stanzas for
  specific Windows scripted inputs that you must add to your inputs.conf file.
* <cmd> can also be a path to a file that ends with a ".path" suffix. A file
  with this suffix is a special type of pointer file that points to a command
  to be executed.  Although the pointer file is bound by the same location
  restrictions mentioned above, the command referenced inside it can reside
  anywhere on the file system.
  This file must contain exactly one line: the path to the command to execute,
  optionally followed by command line arguments.  Additional empty lines and
  lines that begin with '#' are also permitted and will be ignored.

interval = [<number>|<cron schedule>]
* How often to execute the specified command (in seconds), or a valid cron
  schedule.
* NOTE: when a cron schedule is specified, the script is not executed on
  start-up.
* If specified as a number, may have a fractional component; e.g., 3.14
* Splunk's cron implementation does not currently support names of months/days.
* Defaults to 60.0 seconds.
* The special value 0 will force this scripted input to be executed non-stop;
  that is, as soon as script exits, we shall re-start it.

passAuth = <username>
* User to run the script as.
* If you provide a username, Splunk generates an auth token for that user and
  passes it to the script via stdin.

queueSize = <integer>[KB|MB|GB]
* Maximum size of the in-memory input queue.
* Defaults to 500KB.

persistentQueueSize = <integer>[KB|MB|GB|TB]
* Maximum size of the persistent queue file.
* If set to some value other than 0, persistentQueueSize must be larger than
  the in-memory queue size (set by queueSize attribute in inputs.conf or
  maxSize settings in [queue] stanzas in server.conf).
* Persistent queues can help prevent loss of transient data. For information on
  persistent queues and how the queueSize and persistentQueueSize settings
  interact, see the online documentation.
* Defaults to 0 (no persistent queue).

index = <index name>
* The index to which the output will be indexed to.
* Note: this parameter will be passed as a command-line argument to <cmd> in
  the format: -index <index name>.
  If the script does not need the index info, it can simply ignore this argument.
* If no index is specified, the default index will be used for the script output.

send_index_as_argument_for_path = [true|false]
* Defaults to true and we will pass the index as an argument when specified for
  stanzas that begin with 'script://'
* The argument is passed as '-index <index name>'.
* To avoid passing the index as a command line argument, set this to false

start_by_shell = [true|false]
* If set to true, the specified command will be run via the OS's shell
  ("/bin/sh -c" on UNIX, "cmd.exe /c" on Windows)
* If set to false, the program will be run directly without attempting to
  expand shell metacharacters.
* Defaults to true on UNIX, false on Windows.
* Usually the default is fine, but you may want to explicitly set this to false
  for scripts that you know do not need UNIX shell metacharacter expansion.

#*******
# File system change monitor (fschange monitor)
#*******

NOTE: You cannot simultaneously watch a directory using both fschange monitor
      and monitor (described above).

[fschange:<path>]
* Monitors all add/update/deletes to this directory and its subdirectories.
* NOTE: <path> is the direct path.  You do not need to preface it with // like
  other inputs.
* Sends an event for every change.

# Additional attributes:
# NOTE: fschange does not use the same attributes as other input types (described above).  Use only the following attributes:

index = <indexname>
* The index in which to store all generated events.
* Defaults to _audit, unless you do not set signedaudit (below) or set
  signedaudit = false, in which case events go into the default index.

signedaudit = [true|false]
* Send cryptographically signed add/update/delete events.
* If set to true, events are *always* sent to the _audit index and will
  *always* have the source type "audittrail".
* If set to false, events are placed in the default index and the source type
  is whatever you specify (or "fs_notification" by default).
* You must set signedaudit to false if you want to set the index.
* NOTE: You must also enable auditing in audit.conf.
* Defaults to false.

filters = <filter1>,<filter2>,...
* Each filter is applied left to right for each file or directory found during
  the monitor poll cycle.
* See "File System Monitoring Filters" below for help defining a filter.

recurse = [true|false]
* If true, recurse directories within the directory specified in [fschange].
* Defaults to true.

followLinks = [true|false]
* If true, follow symbolic links.
* It is recommended that you do not set this to true; file system loops can
  occur.
* Defaults to false.

pollPeriod = <integer>
* Check this directory for changes every <integer> seconds.
* Defaults to 3600 seconds (1 hour).

hashMaxSize = <integer>
* Calculate a SHA256 hash for every file that is less than or equal to
  <integer> bytes.
* This hash is used as an additional method for detecting changes to the
  file/directory.
* Defaults to -1 (disabled).

fullEvent = [true|false]
* Set to true to send the full event if an add or update change is detected.
* Further qualified by the sendEventMaxSize attribute.
* Defaults to false.

sendEventMaxSize  = <integer>
* Only send the full event if the size of the event is less than or equal to
  <integer> bytes.
* This limits the size of indexed file data.
* Defaults to -1, which is unlimited.

sourcetype = <string>
* Set the source type for events from this input.
* "sourcetype=" is automatically prepended to <string>.
* Defaults to audittrail (if signedaudit=true) or fs_notification (if
  signedaudit=false).

host = <string>
* Set the host for events from this input.
* Defaults to whatever host sent the event.

filesPerDelay = <integer>
* Injects a delay specified by delayInMills after processing <integer> files.
* This is used to throttle file system monitoring so it consumes less CPU.
* Defaults to 10.

delayInMills = <integer>
* The delay in milliseconds to use after processing every <integer> files, as
  specified in filesPerDelay.
* This is used to throttle file system monitoring so it consumes less CPU.
* Defaults to 100.


#*******
# File system monitoring filters:
#*******

[filter:<filtertype>:<filtername>]
* Define a filter of type <filtertype> and name it <filtername>.
* <filtertype>:
  * Filter types are either 'blacklist' or 'whitelist.'
  * A whitelist filter processes all file names that match the regex list.
  * A blacklist filter skips all file names that match the regex list.
* <filtername>
  * The filter name is used in the comma-separated list when defining a file system monitor.

regex<integer> = <regex>
* Blacklist and whitelist filters can include a set of regexes.
* The name of each regex MUST be 'regex<integer>', where <integer> starts at 1
  and increments.
* Splunk applies each regex in numeric order:
  regex1=<regex>
  regex2=<regex>
  ...

#*******
# http:
#*******

# Global settings for HTTP Input.

[http]
port = <number>
* HTTP Input data endpoint server IP port. 
  By default, the port is 8088.

disabled = [0|1]
* Disable or enable the HTTP Input feature. 
  By default this value is 1, i.e., the feature is disabled.

outputgroup = <string>
* The name of the output group to forward data to.
  If not specified output group is empty.
  
useDeploymentServer = [0|1]
* When true, writes to the location specified by repositoryLocation property
  in serverclass.conf.
* Defaults to 0 and writes to $SPLUNK_HOME/etc/apps.

index = <string>
* The default index to use.
  If not specified "default" index is used. 

sourcetype = <string>
* The default source type for the events.
  If not specified source type is empty.

enableSSL = [0|1]
* HTTP Input data endpoint server - enable or disable SSL protocol.
  By default SSL is enabled.
  HTTP Input server shares SSL settings with the splunk management server and it
  cannot have enableSsl set to true when splunk management server uses HTTP protocol.

dedicatedIoThreads = <number>
* Define number of dedicated IO threads in HTTP Input data endpoint server. 
  By default dedicatedIoThreads is zero and HTTP Input server uses a single thread.

maxSockets = <int>
* The number of simultaneous HTTP connections that Splunk Enterprise accepts 
  simultaneously. You can limit this number to constrain resource usage.
* If set to 0, Splunk Enterprise automatically sets it to one third of the 
  maximum allowable open files on the host. 
* If this number is less than 50, it will be set to 50. If this number is 
  greater than 400000, it will be set to 400000. 
* If set to a negative number, no limit will be enforced.
* Defaults to 0.

maxThreads = <int>
* The number of threads that can be used by active HTTP transactions.
  You can limit this number to constrain resource usage.
* If set to 0, Splunk Enterprise automatically sets the limit to
  one third of the maximum allowable threads on the host. 
* If this number is less than 20, it will be set to 20. If this number is 
  greater than 150000, it will be set to 150000. 
* If maxSockets is not negative and maxThreads is greater than maxSockets, then
  Splunk Enterprise sets maxThreads to be equal to maxSockets.
* If set to a negative number, no limit will be enforced.
* Defaults to 0.

sslKeysfile = <filename>
* Server certificate file.
* Certificates are auto-generated by splunkd upon starting Splunk.
* You may replace the default cert with your own PEM format file.
* Certs are stored in caPath (see below).
* Default is server.pem.

sslKeysfilePassword = <password>
* Server certificate password.
* Default is password.

caCertFile = <filename>
* Public key of the signing authority.
* Default is cacert.pem.

caPath = <path>
* Path where all these certs are stored.
* Default is $SPLUNK_HOME/etc/auth.

serverCert = <path>
* Full path to file containing private key and server certificate.
* There is no default value.

sslVersions = <versions_list>
* Comma-separated list of SSL versions to support.
* The versions available are "ssl3", "tls1.0", "tls1.1",
  and "tls1.2".
* The special version "*" selects all supported versions.  The version "tls"
  selects all versions tls1.0 or newer.
* If a version is prefixed with "-" it is removed from the list.
* SSLv2 is always disabled; "-ssl2" is accepted in the version list but does nothing.
* When configured in FIPS mode ssl3 is always disabled regardless
  of this configuration.
* Defaults to "*,-ssl2".  (anything newer than SSLv2).

cipherSuite = <cipher suite string>
* If set, Splunk uses the specified cipher string for the HTTP server.
* If not set, Splunk uses the default cipher string provided by OpenSSL.
  This is used to ensure that the server does not accept connections using
  weak encryption protocols.
  
listenOnIPv6 = no|yes|only
* Toggle whether this listening ip:port will listen on IPv4, IPv6, or both.
* If not present, the setting in the [general] stanza will be used.

acceptFrom = <network_acl> ...
* Lists a set of networks or addresses to accept data from.  These rules are
  separated by commas or spaces.
* Each rule can be in the following forms:
    1. A single IPv4 or IPv6 address (examples: "10.1.2.3", "fe80::4a3").
    2. A CIDR block of addresses (examples: "10/8", "fe80:1234/32").
    3. A DNS name, possibly with a '*' used as a wildcard (examples:
       "myhost.example.com", "*.splunk.com").
    4. A single '*' which matches anything.
* Entries can also be prefixed with '!' to cause the rule to reject the
  connection.  Rules are applied in order, and the first one to match is
  used.  For example, "!10.1/16, *" will allow connections from everywhere
  except the 10.1.*.* network.
* Defaults - accept everything.

requireClientCert = true|false
* Requires that any client connecting to the HTTP Event Collector port 
  has a certificate that can be validated by certificate authority specified 
  in caCertFile.

ecdhCurveName = <string>
* DEPRECATED, Use 'ecdhCurves' to specify one or more ec curves instead.
* ECDH curve to use for ECDH key negotiation.
* We only support named curves specified by their SHORT name.
* The list of valid named curves by their short/long names can be obtained
  by executing this command:
  $SPLUNK_HOME/bin/splunk cmd openssl ecparam -list_curves.
* Default is empty string.

ecdhCurves = <comma separated list of ec curves>
* ECDH curves to use for ECDH key negotiation.
* The curves should be specified in the order of preference.
* The client sends these curves as a part of Client Hello.
* The server supports only the curves specified in the list.
* We only support named curves specified by their SHORT names.
  (see struct ASN1_OBJECT in asn1.h)
* The list of valid named curves by their short/long names can be obtained
  by executing this command:
  $SPLUNK_HOME/bin/splunk cmd openssl ecparam -list_curves
* Default is empty string.
* e.g. ecdhCurves = prime256v1,secp384r1,secp521r1

crossOriginSharingPolicy = <origin_acl> ...
* List of the HTTP Origins for which to return Access-Control-Allow-* (CORS)
  headers.
* These headers tell browsers that we trust web applications at those sites
  to make requests to the REST interface.
* The origin is passed as a URL without a path component (for example
  "https://app.example.com:8000").
* This setting can take a list of acceptable origins, separated
  by spaces and/or commas.
* Each origin can also contain wildcards for any part.  Examples:
    *://app.example.com:*  (either HTTP or HTTPS on any port)
    https://*.example.com  (any host under example.com, including example.com itself).
* An address can be prefixed with a '!' to negate the match, with
  the first matching origin taking precedence.  For example,
  "!*://evil.example.com:* *://*.example.com:*" to not avoid
  matching one host in a domain.
* A single "*" can also be used to match all origins.
* By default, the list is empty.

forceHttp10 = auto|never|always
* When set to "always", the REST HTTP server will not use some
  HTTP 1.1 features such as persistent connections or chunked
  transfer encoding.
* When set to "auto" it will do this only if the client sent no
  User-Agent header, or if the user agent is known to have bugs
  in its HTTP/1.1 support.
* When set to "never" it will always allow HTTP 1.1, even to
  clients it suspects may be buggy.
* Defaults to "auto".

sslCommonNameToCheck = <commonName>
* If this value is set, and 'requireClientCert' is set to true,
  splunkd will limit most inbound HTTPS connections to hosts that use
  a cert with this common name.
* 'sslCommonNameList' is a multivalue extension of this setting, certs
  that match 'sslCommonNameList' or 'sslCommonNameToCheck' will be
  accepted.
* The most important scenario is distributed search.
* This feature does not work with the deployment server and client
  communication over SSL.
* Optional. Defaults to no common name checking.

sslAltNameToCheck = <alternateName1>, <alternateName2>, ...
* If this value is set, and 'requireClientCert' is set to true,
  splunkd will also be willing to verify certificates that have a
  so-called "Subject Alternate Name" that matches any of the alternate
  names in this list.
  * Subject Alternate Names are effectively extended descriptive
    fields in SSL certs beyond the commonName.  A common practice for
    HTTPS certs is to use these values to store additional valid
    hostnames or domains where the cert should be considered valid.
* Accepts a comma-separated list of Subject Alternate Names to consider
  valid.
* Items in this list are never validated against the SSL Common Name.
* This feature does not work with the deployment server and client
  communication over SSL.
* Optional.  Defaults to no alternate name checking

sendStrictTransportSecurityHeader = true|false
* If set to true, the REST interface will send a "Strict-Transport-Security"
  header with all responses to requests made over SSL.
* This can help avoid a client being tricked later by a Man-In-The-Middle
  attack to accept a non-SSL request.  However, this requires a commitment that
  no non-SSL web hosts will ever be run on this hostname on any port.  For
  example, if splunkweb is in default non-SSL mode this can break the
  ability of browser to connect to it.  Enable with caution.
* Defaults to false.

allowSslCompression = true|false
* If set to true, the server will allow clients to negotiate
  SSL-layer data compression.
* Defaults to true.

allowSslRenegotiation = true|false
* In the SSL protocol, a client may request renegotiation of the connection
  settings from time to time.
* Setting this to false causes the server to reject all renegotiation
  attempts, breaking the connection.  This limits the amount of CPU a
  single TCP connection can use, but it can cause connectivity problems
  especially for long-lived connections.
* Defaults to true.

ackIdleCleanup = true|false
* If set to true, the server will remove the ACK channels that are idle
  for the maxIdleTime seconds.
* Default to false.

maxIdleTime = <int>
* The max number of seconds the ACK channels are idle before they are removed.
* Defaults to 600 seconds. 

channel_cookie = <string>
* The name of the cookie to use when sending data with a specified channel ID.
* The value of the cookie will be the channel sent. For example, if you have 
  set 'channel_cookie=foo' and sent a request with channel ID set to 'bar', 
  then you will have a cookie in the response with the value 'foo=bar'.
* If no channel ID is present in the request, then no cookie will be returned.
* This setting is to be used for load balancers (for example, AWS ELB) that can 
  only provide sticky sessions on cookie values and not general header values.
* If no value is set (the default), then no cookie will be returned.
* Defaults to the empty string (no cookie). 

# local stanza for each token
[http://name]

token = <string>
* the token value.

disabled = [0|1]
* Disable or enable this token.
  By default this value is 0, i.e., the token  is enabled.

description = <string>
* Human-readable description of this token.
* Defaults to empty string.

indexes = <string>
* The indexes the event for this token can go to.
  If not specified indexes list is empty and any index can be used.

index = <string>
* The default index to use.
  If not specified "default" index is used. 

sourcetype = <string>
* The default source type if it is not specified in an event. 
  If not specified source type is empty.

outputgroup = <string>
* The name of the output group to forward data to.
  If not specified output group is empty.

queueSize = <integer>[KB|MB|GB]
* Maximum size of the in-memory input queue. 
* Defaults to 500KB.

persistentQueueSize = <integer>[KB|MB|GB|TB]
* Maximum size of the persistent queue file.
* Defaults to 0 (no persistent queue).
* If set to some value other than 0, persistentQueueSize must be larger than 
  the in-memory queue size (set by queueSize attribute in inputs.conf or maxSize 
  settings in [queue] stanzas in server.conf).
* Persistent queues can help prevent loss of transient data. For information on 
  persistent queues and how the queueSize and persistentQueueSize settings 
  interact, see the online documentation.

connection_host = [ip|dns|none]
* Specify the host if an event doesn't have host set.
* "ip" sets the host to the IP address of the system sending the data. 
* "dns" sets the host to the reverse DNS entry for IP address of the system 
  sending the data.
* "none" leaves the host as specified in the HTTP header.

useACK = [true|false]
* When set to true, acknowledgement (ACK) is enabled. Events in a request will be
  tracked until they are indexed. An events status (indexed or not) can be
  queried from the ACK endpoint with the ID for the request.
* When set to false, acknowledgement is not enabled.
* This attribute can be set at the stanza level. 
* Defaults to false.

#*******
# WINDOWS INPUTS:
#*******

* Windows platform specific input processor.
# ***********
# Splunk for Windows ships with several Windows-only scripted inputs. They are
# defined in the default inputs.conf.

* This is a list of the Windows scripted input stanzas:
    [script://$SPLUNK_HOME\bin\scripts\splunk-wmi.path]
    [script://$SPLUNK_HOME\bin\scripts\splunk-regmon.path]
    [script://$SPLUNK_HOME\bin\scripts\splunk-admon.path]

* By default, some of the scripted inputs are enabled and others are disabled.
* Use the "disabled=" parameter to enable/disable any of them.
* Here's a short summary of the inputs:
  * WMI: Retrieves event logs remotely and locally. It can also gather
    performance data remotely, as well as receive various system notifications.
  * RegMon: Uses a driver to track and report any changes that occur in the
    local system's Registry.
  * ADMon: Indexes existing AD objects and listens for AD changes.

###
# The following Windows input specifications are for parsing on non-Windows
# platforms.
###
###
# Performance Monitor
###

[perfmon://<name>]

* This section explains possible attribute/value pairs for configuring
  Splunk's Windows Performance Monitor.
* Each perfmon:// stanza represents an individually configured performance
  monitoring input. If you configure the input through Splunk Web, then the
  value of "$NAME" will match what was specified there. While you can add
  performance monitor inputs manually, Splunk recommends that you use Splunk
  Web to configure them, because it is easy to mistype the values for
  Performance Monitor objects, counters and instances.
* Note: The perfmon stanza is for local systems ONLY. To define performance
  monitor inputs for remote machines, use wmi.conf.

object = <string>
* This is a valid Performance Monitor object as defined within Performance
  Monitor (for example, "Process," "Server," "PhysicalDisk.")
* You can specify a single valid Performance Monitor object, or use a
  regular expression to specify multiple objects.
* This attribute is required, and the input will not run if the attribute is
  not present.
* The object name can be a regular expression (regex).
* There is no default.

counters = <semicolon-separated strings>
* This can be a single counter, or multiple valid Performance Monitor
  counters.
* This attribute is required, and the input will not run if the attribute is
  not present.
* '*' is equivalent to all available counters for a given Performance
  Monitor object.
* There is no default.

instances = <semicolon-separated strings>
* This can be a single instance, or multiple valid Performance Monitor
  instances.
* '*' is  equivalent to all available instances for a given Performance Monitor
  counter.
* If applicable instances are available for a counter and this attribute is not
  present, then the input logs data for all available instances (this is the same as
  setting 'instances = *').
* If there are no applicable instances for a counter, then this attribute
  can be safely omitted.
* There is no default.

interval = <integer>
* How often, in seconds, to poll for new data.
* This attribute is required, and the input will not run if the attribute is
  not present.
* The recommended setting depends on the Performance Monitor object,
  counter(s) and instance(s) that you define in the input, and how much
  performance data you require.  Objects with numerous instantaneous
  or per-second counters, such as "Memory," "Processor" and
  "PhysicalDisk" should have shorter interval times specified (anywhere
  from 1-3 seconds). Less volatile counters such as "Terminal Services,"
  "Paging File" and "Print Queue" can have longer times configured.
* Default is 300 seconds.

mode = <output mode>
* Specifies output mode.
* Possible values: single, multikv

samplingInterval = <sampling interval in ms>
* Advanced setting. How often, in milliseconds, to poll for new data.
* Enables high-frequency performance sampling. The input collects
  performance data every sampling interval. It then reports averaged data
  and other statistics at every interval.
* The minimum legal value is 100, and the maximum legal value must be less
  than what the 'interval' attribute to.
* If not specified, high-frequency sampling does not take place.
* Defaults to not specified (disabled).

stats = <average;count;dev;min;max>
* Advanced setting. Reports statistics for high-frequency performance
  sampling.
* Allows values: average, count, dev, min, max.
* Can be specified as a semicolon separated list.
* If not specified, the input does not produce high-frequency sampling
  statistics.
* Defaults to not specified (disabled).

disabled = [0|1]
* Specifies whether or not the input is enabled.
* 1 to disable the input, 0 to enable it.
* Defaults to 0 (enabled).

index = <string>
* Specifies the index that this input should send the data to.
* This attribute is optional.
* If no value is present, defaults to the default index.

showZeroValue = [0|1]
* Specfies whether or not zero value event data should be collected.
* 1 captures zero value event data, 0 ignores zero value event data.
* Defaults to 0 (ignores zero value event data)

useEnglishOnly = [true|false]
* Controls which Windows perfmon API is used.
* If true, PdhAddEnglishCounter() is used to add the counter string.
* If false, PdhAddCounter() is used to add the counter string.
* Note: if set to true, object regular expression is disabled on
  non-English language hosts.
* Defaults to false.

formatString = <double format specifier>
* Controls the print format for double-precision statistic counters.
* The default is "%.20g"
* Specify without quotes.

###
# Direct Access File Monitor (does not use file handles)
# For Windows systems only.
###

[MonitorNoHandle://<path>]

* This stanza directs Splunk to intercept file writes to the specific file.
* <path> must be a fully qualified path name to a specific file.
* There can be more than one stanza.

disabled = [0|1]
* Tells Splunk whether or not the input is enabled.
* Defaults to 0 (enabled).

index = <string>
* Tells Splunk which index to store incoming data into for this stanza.
* This field is optional.
* Defaults to the default index.

###
# Windows Event Log Monitor
###

[WinEventLog://<name>]

* This section explains possible attribute/value pairs for configuring Splunk's
  Windows event log Monitor.
* Each WinEventLog:// stanza represents an individually configured WinEventLog
  monitoring input. If you you configure the input through Splunk Web, the
  value of "$NAME" will match what was specified there. While you can add
  event log monitor inputs manually, Splunk recommends that you use the
  Manager interface to configure Windows event log monitor inputs because it is
  easy to mistype the values for event log channels.
* Note: The WinEventLog stanza is for local systems ONLY. To define event log
  monitor inputs for remote machines, use wmi.conf.

start_from = <string>
* Specifies how Splunk should chronologically read the event log channels.
* Setting this attribute to 'oldest' tells Splunk to start reading Windows event logs
  from oldest to newest.
* Setting this attribute to 'newest' tells Splunk to start reading Windows event logs
  in reverse, from newest to oldest.  Once the input consumes the backlog of events,
  it will stop.
* 'newest' is not supported in combination with current_only = 1 (This
    combination does not make much sense.)
* Defaults to oldest.

current_only = [0|1]
* If set to 1, the input will only acquire events that arrive while Splunk is
  running and the input is enabled.  Data which was stored in the Windows Event
  Log while splunk was not running will not be read.
  This means that there will be gaps in data if splunk is restarted, or
  experiences downtime.
  * current_only = 1 is not supported with start_from = 'newest'. (It would
    not really make sense.)

batch_size = <integer>
* Controls how many windows event log items to read per request.
* If troubleshooting identifies that the eventlog input is a bottleneck in
  acquiring data, increasing this value may help.
  * NOTE: Splunk Support has seen cases where large values can result in a
    stall in the Microsoft-provided windows event log subsystem.
    If increasing this value significantly, monitor closely for trouble.
* In local testing and in customer acceptance testing, 10 worked well for both
  throughput and reliability.
* The default value is 10.

* If set to 0, the input will first get all existing events already stored in
  the log which have higher event IDs (arrived more recently) than the most
  recent events acquired, and then continue to monitor events arriving in real
  time.
* Defaults to 0 (false), gathering stored events first before monitoring live events.

checkpointInterval = <integer>
* Sets how frequently the Windows Event Log input should save a checkpoint.
* Checkpoints store the eventID of acquired events. This allows Splunk to continue
  monitoring at the correct event after a shutdown or outage.
* The default value is 5.

disabled = [0|1]
* Specifies whether or not the input is enabled.
* 1 to disable the input, 0 to enable it.
* The default is 0 (enabled).

evt_resolve_ad_obj = [1|0]
* Specifies how Splunk should interact with Active Directory while indexing Windows
  Event Log events.
* A value of 1 tells Splunk to resolve the Active Directory Security IDentifier
(SID) objects to their canonical names for a specific Windows event log channel.
* When you set this value to 1, you can optionally specify the Domain Controller name
  and/or DNS name of the domain to bind to with the 'evt_dc_name' attribute. Splunk connects
  to that server to resolve the AD objects.
* A value of 0 tells Splunk not to attempt any resolution.
* By default, this attribute is disabled (0) for all channels.
* If you enable it, you can negatively impact the rate at which Splunk Enterprise
  reads events on high-traffic Event Log channels. You can also cause Splunk Enterprise
  to experience high latency when acquiring these events. This is due to the overhead
  involved in performing translations.

evt_dc_name = <string>
* Tells Splunk which Active Directory domain controller it should bind to in order to
  resolve AD objects.
* Prefixing with a dollar sign (i.e. $my_domain_controller) will interpret this as
  an environment variable. If the environment variable does not exist, it will be the
  same as leaving this field blank.
* Optional. This parameter can be left empty.
* This name can be the NetBIOS name of the domain controller or the fully-
qualified DNS name of the domain controller. Either name type can, optionally,
be preceded by two backslash characters.  The following examples represent
correctly formatted domain controller names:

    * "FTW-DC-01"
    * "\\FTW-DC-01"
    * "FTW-DC-01.splunk.com"
    * "\\FTW-DC-01.splunk.com"
    * $my_domain_controller

evt_dns_name = <string>
* Tells Splunk the fully-qualified DNS name of the domain it should bind to in order to
  resolve AD objects.
* Optional. This parameter can be left empty.

evt_resolve_ad_ds =[auto|PDC]
* Indicates how to chose domain controller. This setting is optional.
* If set to PDC, only the PRIMARY domain controller is contacted.
* If set to auto, Splunk will let Windows chose the "best" domain controller. (default)
* If evt_dc_name is set, this setting is ignored.

evt_ad_cache_disabled = [0|1]
* Enables or disables AD object cache.
* Default: 0.

evt_ad_cache_exp = <time in seconds>
* Indicates expiraiton time for AD object cache entries. This setting is optional.
* Default: 3600 secs. Minimum: 10 secs, maximum: 1 year.

evt_ad_cache_exp_neg = <time in seconds>
* Indicates expiraiton time for negative AD object cache entries. This setting is optional.
* Default: 10 secs. Minimum: 10 secs, maximum: 1 year.

evt_ad_cache_max_entries = <number of entries>
* Indicates maximum number of AD object cache entries. This setting is optional.
* Default: 1000 entries. Minimum: 10, maximum: 40000.

evt_sid_cache_disabled = [0|1]
* Enables or disables account sid cache.
* This setting is global, e.g. affects all Windows Event Log stanzas.
* Default: 0.

evt_sid_cache_exp = <time in seconds>
* Indicates expiraiton time for account sid cache entries. This setting is optional.
* This setting is global, e.g. affects all Windows Event Log stanzas.
* Default: 3600 secs. Minimum: 10 secs, maximum: 1 year.

evt_sid_cache_exp_neg = <time in seconds>
* Indicates expiraiton time for negative account sid cache entries. This setting is optional.
* This setting is global, e.g. affects all Windows Event Log stanzas.
* Default: 10 secs. Minimum: 10 secs, maximum: 1 year.

evt_sid_cache_max_entries = <number of entries>
* Indicates maximum number of account sid cache entries. This setting is optional.
* This setting is global, e.g. affects all Windows Event Log stanzas.
* Default: 1000 entries. Minimum: 10, maximum: 40000.

index = <string>
* Specifies the index that this input should send the data to.
* This attribute is optional.
* If no value is present, defaults to the default index.

# EventLog filtering
#
# Filtering at the input layer is desirable to reduce the total processing load
# in network transfer and computation on the Splunk nodes acquiring and
# processing the data.

whitelist = <list of eventIDs> | key=regex [key=regex]
blacklist = <list of eventIDs> | key=regex [key=regex]

whitelist1 = <list of eventIDs> | key=regex [key=regex]
whitelist2 = <list of eventIDs> | key=regex [key=regex]
whitelist3 = <list of eventIDs> | key=regex [key=regex]
whitelist4 = <list of eventIDs> | key=regex [key=regex]
whitelist5 = <list of eventIDs> | key=regex [key=regex]
whitelist6 = <list of eventIDs> | key=regex [key=regex]
whitelist7 = <list of eventIDs> | key=regex [key=regex]
whitelist8 = <list of eventIDs> | key=regex [key=regex]
whitelist9 = <list of eventIDs> | key=regex [key=regex]
blacklist1 = <list of eventIDs> | key=regex [key=regex]
blacklist2 = <list of eventIDs> | key=regex [key=regex]
blacklist3 = <list of eventIDs> | key=regex [key=regex]
blacklist4 = <list of eventIDs> | key=regex [key=regex]
blacklist5 = <list of eventIDs> | key=regex [key=regex]
blacklist6 = <list of eventIDs> | key=regex [key=regex]
blacklist7 = <list of eventIDs> | key=regex [key=regex]
blacklist8 = <list of eventIDs> | key=regex [key=regex]
blacklist9 = <list of eventIDs> | key=regex [key=regex]

* These settings are optional.
* Both numbered and unnumbered whitelists and blacklists support two formats: A
  comma-separated list of event IDs and a list of key=regular expression pairs.

* These two formats cannot be combined, only one may be used in a specific line.

* Numbered whitelist settings are permitted from 1 to 9, so whitelist1 through
  whitelist9 and blacklist1 through blacklist9 are supported.

* If no white or blacklist rules are present, all events will be read.

# Formats:

* Event ID list format:
  * A comma-seperated list of terms.
  * Terms may be a single event ID (e.g. 6) or range of event IDs (e.g. 100-200)
  * Example: 4,5,7,100-200
    * This would apply to events with IDs 4, 5, 7, or any event ID between 100
      and 200, inclusive.
  * Provides no additional functionality over the key=regex format, but may be
    easier to understand than the equivalent:
    List format:      4,5,7,100-200
    Regex equivalent: EventCode=%^(4|5|7|1..|200)$%

* key=regex format
  * A whitespace-separated list of event log components to match, and
    regexes to match against against them.
  * There can be one match expression or multiple per line.
  * The key must belong to the set of valid keys provided below.
  * The regex consists of a leading delimiter, the regex expression, and a
    trailing delimeter. Examples: %regex%, *regex*, "regex"
  * When multiple match expressions are present, they are treated as a
    logical AND.  In other words, all expressions must match for the line to
    apply to the event.
  * If the value represented by the key does not exist, it is not considered
    a match, regardless of the regex.
  * Example:
    whitelist = EventCode=%^200$% User=%jrodman%
    Include events only if they have EventCode 200 and relate to User jrodman

# Valid keys for the regex format:

* The following keys are equivalent to the fields which appear in the text of
  the acquired events: Category CategoryString ComputerName EventCode
  EventType Keywords LogName Message OpCode RecordNumber Sid SidType
  SourceName TaskCategory Type User
* There are two special keys that do not appear literally in the event.
  * $TimeGenerated : The time that the computer generated the event
  * $Timestamp: The time that the event was received and recorded by the
                Event Log service.
* EventType is only available on Server 2003 / XP and earlier
* Type is only available on Server 2008 / Vista and later
* For a more full definition of these keys, see the web documentation:
  http://docs.splunk.com/Documentation/Splunk/latest/Data/MonitorWindowsdata#Create_advanced_filters_with_.27whitelist.27_and_.27blacklist.27



suppress_text = [0|1]
* Tells Splunk whether or not to include the description of the event text
  for a given Event Log event.
* Optional. This parameter can be left empty.
* A value of 1 suppresses the inclusion of the event text description.
* A value of 0 includes the event text description.
* If no value is present, defaults to 0.

renderXml= [true|false]
* Controls if the Event data is returned as XML or plain text
* Defaults to false.

###
# Active Directory Monitor
###

[admon://<name>]

* This section explains possible attribute/value pairs for configuring
  Splunk's Active Directory Monitor.
* Each admon:// stanza represents an individually configured Active
  Directory monitoring input. If you configure the input with Splunk Web,
  then the value of "$NAME" will match what was specified there. While
  you can add Active Directory monitor inputs manually, Splunk recommends
  that you use the Manager interface to configure Active Directory monitor
  inputs because it is easy to mistype the values for Active Directory
  monitor objects.

targetDc = <string>
* Specifies a fully qualified domain name of a valid, network-accessible
  Active Directory domain controller.
* If not specified, Splunk obtains the local computer's DC by default, and
  binds to its root Distinguished Name (DN).

startingNode = <string>
* Tells Splunk where in the Active Directory directory tree to start
  monitoring.
* If not specified, Splunk attempts to start at the root of the directory
  tree.
* The user that you configure Splunk to run as at installation determines
  where Splunk starts monitoring.

monitorSubtree = [0|1]
* Tells Splunk whether or not to monitor the subtree(s) of a given Active
  Directory tree path.
* Defaults to 1 (monitor subtrees of a given directory tree path).

disabled = [0|1]
* Tells Splunk whether or not the input is enabled.
* Defaults to 0 (enabled.)

index = <string>
* Tells Splunk which index to store incoming data into for this input.
* This field is optional.
* Defaults to the default index.

printSchema = [0|1]
* Tells Splunk whether or not to print the Active Directory schema.
* Defaults to 1 (print schema of Active Directory).

baseline = [0|1]
* Tells Splunk whether or not to query baseline objects.
* Baseline objects are objects which currently reside in Active Directory.
* Baseline objects also include previously deleted objects.
* Defaults to 0 (do not query baseline objects).

### 
# Windows Registry Monitor
###

[WinRegMon://<name>]

* This section explains possible attribute/value pairs for configuring
  Splunk's Windows Registry Monitor.
* Each WinRegMon:// stanza represents an individually configured WinRegMon
  monitoring input.
* If you configure the inputs with Splunk Web, the value of "$NAME" will
  match what was specified there. While you can add event log monitor inputs
  manually, recommends that you use the Manager interface to configure
  Windows registry monitor inputs because it is easy to mistype the values
  for Registry hives and keys.
* Note: WinRegMon is for local systems ONLY.

proc = <string>
* Tells Splunk which processes this input should monitor for Registry access.
* If set, matches against the process name which performed the Registry
  access.
* Events generated by processes that do not match the regular expression get
  filtered out.
* Events generated by processes that match the regular expression pass
  through.
* There is no default.

hive = <string>
* Tells Splunk the Registry hive(s) that this input should monitor for Registry access.
* If set, matches against the Registry key which was accessed.
* Events that contain hives that do not match the regular expression get
  filtered out.
* Events that contain hives that match the regular expression pass
  through.
* There is no default.

type = <string>
* A regular expression that specifies the type(s) of Registry event(s)
  that you want Splunk to monitor.
* There is no default.

baseline = [0|1]
* Specifies whether or not Splunk should get a baseline of Registry events when it starts.
* If set to 1, the input will capture a baseline for the specified hive when the input
  starts for the first time.
* Defaults to 0 (do not baseline the specified hive first before monitoring live events).

baseline_interval = <integer>
* Specifies how often, in seconds, that the Registry Monitor input should capture a baseline
  for a specific Registry hive or key.
* Defaults to 0 (do not establish a baseline).

disabled = [0|1]
* Specifies whether or not the input is enabled.
* 1 to disable the input, 0 to enable it.
* Defaults to 0 (enabled).

index = <string>
* Specifies the index that this input should send the data to.
* This attribute is optional.
* If no value is present, defaults to the default index.

###
# Windows Host Monitoring
###

[WinHostMon://<name>]

* This section explains possible attribute/value pairs for configuring
  Splunk's Windows host monitor.
* Each WinHostMon:// stanza represents an WinHostMon monitoring input.
  If you configure the input in SPlunk web, the value of "$NAME" will
  match what was specified there.
* Note: WinHostMon is for local Windows systems ONLY. You can not monitor
  Windows host information remotely.

type = <semicolon-separated strings>
* An expression that specifies the type(s) of host inputs
  that you want Splunk to monitor.
* Type can be Computer;Process;Processor;NetworkAdapter;Service;OperatingSystem;Disk;Driver;Roles

interval = <integer>
* Specifies the interval, in seconds, between when the input runs to gather
  Windows host information.

disabled = [0|1]
* Specifies whether or not the input is enabled.
* 1 to disable the input, 0 to enable it.
* Defaults to 0 (enabled).

index = <string>
* Specifies the index that this input should send the data to.
* This attribute is optional.
* If no value is present, defaults to the default index.

[WinPrintMon://<name>]

* This section explains possible attribute/value pairs for configuring
  Splunk's Windows print Monitor.
* Each WinPrintMon:// stanza represents an WinPrintMon monitoring input.
  The value of "$NAME" will match what was specified in Splunk Web.
* Note: WinPrintMon is for local systems ONLY.

type = <semicolon-separated strings>
* An expression that specifies the type(s) of print inputs
  that you want Splunk to monitor.

baseline = [0|1]
* If set to 1, the input will baseline the current print objects when the
  input is turned on for the first time.
* Defaults to 0 (false), not baseline.

disabled = [0|1]
* Specifies whether or not the input is enabled.
* 1 to disable the input, 0 to enable it.
* Defaults to 0 (enabled).

index = <string>
* Specifies the index that this input should send the data to.
* This attribute is optional.
* If no value is present, defaults to the default index.

[WinNetMon://<name>]

* This section explains possible attribute/value pairs for configuring
  Splunk's Network Monitor.
* Each WinNetMon:// stanza represents an individually configured network
  monitoring input.  The value of "$NAME" will match what was specified
  in Splunk Web. Splunk recommends that you use the Manager interface to
  configure Network Monitor inputs because it is easy to mistype the values
  for Network Monitor monitor objects, counters and instances.

remoteAddress = <regular expression>
* If set, matches against the remote address.
* Events with remote addresses that do not match the regular expression get
  filtered out.
* Events with remote addresses that match the regular expression pass
  through.
* Example: 192\.163\..*
* Default (missing or empty setting) includes all events

process = <regular expression>
* If set, matches against the process/application name which performed
  network access
* Events generated by processes that do not match the regular expression are
  filtered out.
* Events generated by processes that match the regular expression are passed
  through.
* Default (missing or empty proc setting) includes all
  processes/applications

user = <regular expression>
* If set, matches against the user name which performed network access
* Events generated by users that do not match the regular expression are
  filtered out.
* Events generated by users that match the regular expression are passed
  through.
* Default (missing or empty user setting) includes access by all users

addressFamily = ipv4;ipv6
* If set, matches against address family.
* Accepts semicolon separated values, e.g. ipv4;ipv6
* Default (missing or empty address family setting) includes ipv4 and ipv6
  traffic

packetType = connect;accept;transport.
* If set, matches against packet type
* Accepts semicolon separated values, e.g. connect;transport
* Default (missing or empty setting) includes all types

direction = inbound;outbound
* If set, matches against direction.
* Accepts semicolon separated values, e.g. incoming;outgoing
* Default (missing or empty setting) includes all types

protocol = tcp;udp
* If set, matches against protocol ids.
* Accepts semicolon separated values
* Protocol are defined in http://www.ietf.org/rfc/rfc1700.txt
* Example of protocol ids: tcp;udp
* Default (missing or empty setting) includes all types

readInterval = <integer>
* Read network driver every readInterval milliseconds.
* Advanced option. We recommend that the default value is used unless there
  is a problem with input performance.
* Allows adjusting frequency of calls into kernel driver driver. Higher
  frequencies may affect network performance, while lower frequencies can
  cause event loss.
* Default value: 100 msec
* Minumum: 10 msec, maximum: 1 sec

driverBufferSize = <integer>
* Keep maximum number of network packets in network driver buffer.
* Advanced option. We recommend that the default value is used unless there
  is a problem with input performance.
* Controls amount of packets cached in the driver. Lower values may result
  in event loss. Higher values may increase the size of non-paged memory.
* Default: 32768 packets.
* Minumum: 128 packets, maximum: 32768 packets

userBufferSize = <integer>
* Maximum size in MB of user mode event buffer.
* Advanced option. We recommend that the default value is used unless there
  is a problem with input performance.
* Controls amount of packets cached in the the usre mode. Lower values may
  result in event loss. Higher values may increase the size of Splunk
  network monitor memory.
* Default: 20 MB.
* Minumum: 5 MB, maximum: 500 MB.

mode = single,multikv
* Specifies output mode. Output each event individually or in multikv
  format.
* Default: single.

multikvMaxEventCount = <integer>
* Advanced option. When multikv mode is used output at most
  multikvMaxEventCount events.
* Default: 100 events
* Minumum: 10 events, maximum: 500 events

multikvMaxTimeMs = <integer>
* Advanced option. When multikv mode is used output no later than
  multikvMaxTimeMs milliseconds.
* Default: 1000 ms
* Minumum: 100 ms, maximum: 5000 ms

sid_cache_disabled = [0|1]
* Enables or disables account sid cache.
* This setting is global, e.g. affects all Windows network monitor stanzas.
* Default: 0.

sid_cache_exp = <time in seconds>
* Indicates expiraiton time for account sid cache entries. This setting is optional.
* This setting is global, e.g. affects all Windows network monitor stanzas.
* Default: 3600 secs. Minimum: 10 secs, maximum: 1 year.

sid_cache_exp_neg = <time in seconds>
* Indicates expiraiton time for negative account sid cache entries. This setting is optional.
* This setting is global, e.g. affects all Windows network monitor stanzas.
* Default: 10 secs. Minimum: 10 secs, maximum: 1 year.

sid_cache_max_entries = <number of entries>
* Indicates maximum number of account sid cache entries. This setting is optional.
* This setting is global, e.g. affects all Windows network monitor stanzas.
* Default: 1000 entries. Minimum: 10, maximum: 40000.

disabled = [0|1]
* Tells Splunk whether or not the input is enabled.
* Defaults to 0 (enabled.)

index = <string>
* Tells Splunk which index to store incoming data into for this stanza.
* This field is optional.
* Defaults to the default index.

[powershell://<name>]
* Executes Windows PowerShell v3 script.

script = <command>
* A powershell command-line script or ps1 script file that will be executed.

schedule = [<number>|<cron schedule>]
* How often to execute the specified command (in seconds), or a valid cron
  schedule.
* If blank, the script will only execute once.

[powershell2://<name>]
* Executes Windows PowerShell v2 script.

script = <command>
* A powershell command-line script or ps1 script file that will be executed

schedule = <schedule>
* A cron schedule for executing the script. If blank, the script will only
  execute once.
