#   Version 6.4.0
#
# Forwarders require outputs.conf; non-forwarding Splunk instances do not
# use it.  It determines how the forwarder sends data to receiving Splunk
# instances, either indexers or other forwarders.
#
# To configure forwarding, create an outputs.conf file in
# $SPLUNK_HOME/etc/system/local/.  For examples of its use, see
# outputs.conf.example.
#
# You must restart Splunk to enable configurations.
#
# To learn more about configuration files (including precedence) please see
# the documentation located at
# http://docs.splunk.com/Documentation/Splunk/latest/Admin/Aboutconfigurationfiles
#
# NOTE: To learn more about forwarding, see the documentation at
# http://docs.splunk.com/Documentation/Splunk/latest/Deploy/Aboutforwardingandreceivingdata

# GLOBAL SETTINGS
# Use the [default] stanza to define any global settings.
#   * You can also define global settings outside of any stanza, at the top
#     of the file.
#   * Each conf file should have at most one default stanza. If there are
#     multiple default stanzas, attributes are combined. In the case of
#     multiple definitions of the same attribute, the last definition in the
#     file wins.
#   * If an attribute is defined at both the global level and in a specific
#     stanza, the value in the specific stanza takes precedence.

############
TCP Output stanzas
############
# There are three levels of TCP Output stanzas:
# * Global: [tcpout]
# * Target group: [tcpout:<target_group>]
# * Single server: [tcpout-server://<ip address>:<port>]
#
# Settings at more specific levels override settings at higher levels. For
# example, an attribute set for a single server overrides the value of that
# attribute, if any, set at that server's target group stanza. See the
# online documentation on configuring forwarders for details.
#
# This spec file first describes the three levels of stanzas (and any
# attributes unique to a particular level).  It then describes the optional
# attributes, which can be set at any  of the three levels.


#----TCP Output Global Configuration -----
# The global configurations specified here in the [tcpout] stanza can be
# overwritten in stanzas for specific target groups, as described later.
# Note that the defaultGroup and indexAndForward attributes can only be set
# here, at the global level.
#
# Starting with 4.2, the [tcpout] stanza is no longer required.

[tcpout]

defaultGroup = <target_group>, <target_group>, ...
* Comma-separated list of one or more target group names, specified later 
  in [tcpout:<target_group>] stanzas.
* The forwarder sends all data to the specified groups.
* If you don't want to forward data automatically, don't set this attribute.
* Can be overridden by an inputs.conf _TCP_ROUTING setting, which in turn
  can be overridden by a props.conf/transforms.conf modifier.
* Starting with 4.2, this attribute is no longer required.

indexAndForward = [true|false]
* Index all data locally, in addition to forwarding it.
* This is known as an "index-and-forward" configuration.
* This attribute is only available for heavy forwarders.
* This attribute is available only at the top level [tcpout] stanza. It
  cannot be overridden in a target group.
* Defaults to false.

#----Target Group Configuration -----

# If multiple servers are specified in a target group, the forwarder
# performs auto load-balancing, sending data alternately to each available
# server in the group. For example, assuming you have three servers
# (server1, server2, server3) and autoLBFrequency=30, the forwarder sends
# all data to server1 for 30 seconds, then it sends all data to server2 for
# the next 30 seconds, then all data to server3 for the next 30 seconds,
# finally cycling back to server1.
#
# You can have as many target groups as you want.
# If more than one target group is specified, the forwarder sends all data
# to each target group.
# This is known as "cloning" the data.


[tcpout:<target_group>]

server = [<ip>|<servername>]:<port>, [<ip>|<servername>]:<port>, ...
* Required if indexerDiscovery is not set.
* Takes a comma separated list of one or more systems to send data to over a
  tcp socket.
* Typically used to specify receiving splunk systems, although it can be
  used to send data to non-splunk systems (see sendCookedData setting).
* For each mentioned system, the following are required:
  * IP or servername where one or system is listening.
  * Port on which syslog server is listening.

blockWarnThreshold = <integer>
* Optional
* Default value is 100
* Sets the output pipleline send failure count threshold after which a
  failure message will be displayed as banner on UI
* To disable any warnings to be sent to UI on blocked output queue
  condition, set this to a large value (2 million for example)

indexerDiscovery = <name>
* Instructs the forwarder to fetch the list of indexers from the master node
  specified in the corresponding [indexer_discovery:<name>] stanza.

token = <string>
* Optional
* If an access token is configured for receiving Splunk system, that token
  is populated here. Note that if receiver is configured with an access token
  and that token is not specified here, then data sent to it will be
  rejected.
#----Single server configuration -----

# You can define specific configurations for individual indexers on a
# server-by-server basis.  However, each server must also be part of a
# target group.

[tcpout-server://<ip address>:<port>]
* Optional.  There is no requirement to have any tcpout-server stanzas.

############
#----TCPOUT ATTRIBUTES----
############
# These attributes are optional and can appear in any of the three stanza levels.

[tcpout<any of above>]

#----General Settings----

sendCookedData = [true|false]
* If true, events are cooked (have been processed by Splunk).
* If false, events are raw and untouched prior to sending.
* Set to false if you are sending to a third-party system.
* Defaults to true.

heartbeatFrequency = <integer>
* How often (in seconds) to send a heartbeat packet to the receiving server.
* Heartbeats are only sent if sendCookedData=true.
* Defaults to 30 (seconds).

blockOnCloning = [true|false]
* If true, TcpOutputProcessor blocks till at least one of the cloned group
  gets events. This will not drop events when all the cloned groups are
  down.
* If false, TcpOutputProcessor will drop events when all the cloned groups
  are down and queues for the cloned groups are full. When at least one of
  the cloned groups is up and queues are not full, the events are not
  dropped.
* Defaults to true.

compressed = [true|false]
* Applies to non-SSL forwarding only. For SSL useClientSSLCompression
  setting is used.
* If true, forwarder sends compressed data.
* If set to true, the receiver port must also have compression turned on (in
  its inputs.conf file).
* Defaults to false.

negotiateNewProtocol = [true|false]
* When setting up a connection to an indexer, try to negotiate the use of
  the new forwarder protocol.
* If set to false, the forwarder will not query the indexer for support for
  the new protocol, and the connection will fall back on the traditional
  protocol.
* Defaults to true.

channelReapInterval = <integer>
* Controls how often, in milliseconds, channel codes are reaped, i.e. made
  available for re-use.
* This value sets the minimum time between reapings; in practice,
  consecutive reapings may be separated by greater
  than <channelReapInterval> milliseconds.
* Defaults to 60000 (1 minute)

channelTTL = <integer>
* Controls how long, in milliseconds, a channel may remain "inactive" before
  it is reaped, i.e. before its code is made available for re-use by a
  different channel.
* Defaults to 300000 (5 minutes)

channelReapLowater = <integer>
* If the number of active channels is above <channelReapLowater>, we reap
  old channels in order to make their channel codes available for re-use.
* If the number of active channels is below <channelReapLowater>, we do not
  reap channels, no matter how old they are.
* This value essentially determines how many active-but-old channels we keep
  "pinned" in memory on both sides of a splunk-to-splunk connection.
* A non-zero value helps ensure that we do not waste network resources by
  "thrashing" channels in the case of a forwarder sending a trickle of data.
* Defaults to 10.

socksServer = [<ip>|<servername>]:<port>
* IP or servername of Socks5 server.
* Port on which socks server is listening on. You must specify the port.
* Note: Only Socks5 is supported.

socksUsername = <username>
* Optional
* Socks username to use when authenticating against socks server

socksPassword = <password>
* Optional
* Socks password to use when authenticating against socks server

socksResolveDNS = <bool>
* Optional
* If set to true, forwarder will not attempt to resolve indexer's DNS, and
* will forward the indexer's DNS as is to let socks server resolve it.

#----Queue Settings----

maxQueueSize = [<integer>|<integer>[KB|MB|GB]|auto]
* This attribute sets the maximum size of the forwarder's output queue.
* The size can be limited based on the number of entries, or on the total
  memory used by the items in the queue.
* If specified as a lone integer (for example, maxQueueSize=100),
  maxQueueSize indicates the maximum count of queued items.
* If specified as an integer followed by KB, MB, or GB
  (for example, maxQueueSize=100MB), maxQueueSize indicates the maximum RAM
  size of all the items in the queue.
* If set to auto, chooses a value depending on whether useACK is enabled.
  * If useACK=false, uses 500KB
  * If useACK=true, uses 7MB
* If the useACK setting is enabled, the maximum size of the wait queue is
  set to to 3x this value.
  * Although the wait queue and the output queue sizes are both controlled
    by this attribute, they are separate.
* Limiting the queue sizes by quantity is largely historical.  However,
  should you choose to configure queues based on quantity, keep the
  following in mind:
  * Queued items can be events or blocks of data.
    * Non-parsing forwarders, such as universal forwarders, will send
      blocks, which may be up to 64KB.
    * Parsing forwarders, such as heavy forwarders, will send events, which
      will be the size of the events.  For some events these are as small as
      a few hundred bytes.  In unusual cases (data dependent), customers may
      arrange to produce events that are multiple megabytes.
* Defaults to auto
  * If useACK is enabled, effectively defaults the wait queue to 21MB

dropEventsOnQueueFull = <integer>
* If set to a positive number, wait <integer> seconds before throwing out
  all new events until the output queue has space.
* Setting this to -1 or 0 will cause the output queue to block when it gets
  full, causing further blocking up the processing chain.
* If any target group's queue is blocked, no more data will reach any other
  target group.
* Using auto load-balancing is the best way to minimize this condition,
  because, in that case, multiple receivers must be down (or jammed up)
  before queue blocking can occur.
* Defaults to -1 (do not drop events).
* DO NOT SET THIS VALUE TO A POSITIVE INTEGER IF YOU ARE MONITORING FILES!

dropClonedEventsOnQueueFull = <integer>
* If set to a positive number, do not block completely, but wait up to
  <integer> seconds to queue events to a group. If it cannot enqueue to a
  group for more than <integer> seconds, begin dropping events for the
  group. It makes sure that at least one group in the cloning configuration
  will get events. It blocks if event cannot be delivered to any of the
  cloned groups.
* If set to -1, the TcpOutputProcessor will make sure that each group will
  get all of the events.  If one of the groups is down, then Splunk will
  block everything.
* Defaults to 5.

#----Backoff Settings When Unable To Send Events to Indexer----
# The settings in this section determine forwarding behavior when there are
# repeated failures in sending events to an indexer ("sending failures").

maxFailuresPerInterval = <integer>
* Specifies the maximum number failures allowed per interval before backoff
  takes place. The interval is defined below.
* Defaults to 2.

secsInFailureInterval = <integer>
* Number of seconds in an interval. If the number of write failures exceeds
  maxFailuresPerInterval in the specified secsInFailureInterval seconds, the
  forwarder applies backoff. The backoff time period range is
  1-10 * autoLBFrequency.
* Defaults to 1.

backoffOnFailure = <positive integer>
* Number of seconds a forwarder will wait before attempting another
  connection attempt.
* Defaults to 30

maxConnectionsPerIndexer = <integer>
* Maximum number of allowed connections per indexer. In presence of
  failures, the max number of connection attempt per indexer at any point in
  time.
* Defaults to 2.

connectionTimeout = <integer>
* Time out period if connection establishment does not finish in <integer>
  seconds.
* Defaults to 20 seconds.

readTimeout = <integer>
* Time out period if read from socket does not finish in <integer> seconds.
* This timeout is used to read acknowledgment when indexer acknowledgment is
  used (useACK=true).
* Defaults to 300 seconds.

writeTimeout = <integer>
* Time out period if write on socket does not finish in <integer> seconds.
* Defaults to 300 seconds.

tcpSendBufSz = <integer>
* TCP send buffer size in <integer> bytes.
* Useful to improve thruput with small size events like windows events.
* Only set this value if you are a TCP/IP expert.
* Defaults to system default.

ackTimeoutOnShutdown = <integer>
* Time out period if ACKs not received in <integer> seconds during forwarder shutdown.
* Defaults to 30 seconds.

dnsResolutionInterval = <integer>
* Specifies base time interval in seconds at which indexer dns names will be
  resolved to ip address.  This is used to compute runtime
  dnsResolutionInterval as follows:
  runtime interval = dnsResolutionInterval + (number of indexers in server settings - 1)*30.
  DNS resolution interval is extended by 30 second for each additional
  indexer in server setting.
* Defaults to 300 seconds.

forceTimebasedAutoLB = [true|false]
* Will force existing streams to switch to newly elected indexer every
  AutoLB cycle.
* Defaults to false

#----Index Filter Settings.
# These attributes are only applicable under the global [tcpout] stanza.
# This filter does not work if it is created under any other stanza.
forwardedindex.<n>.whitelist = <regex>
forwardedindex.<n>.blacklist = <regex>
* These filters determine which events get forwarded, based on the indexes
  the events belong are targetting.
* This is an ordered list of whitelists and blacklists, which together
  decide if events should be forwarded to an index.
* The order is determined by <n>. <n> must start at 0 and continue with
  positive integers, in sequence. There cannot be any gaps in the sequence.
  * For example:
    forwardedindex.0.whitelist, forwardedindex.1.blacklist, forwardedindex.2.whitelist, ...
* The filters can start from either whitelist or blacklist. They are tested
  from forwardedindex.0 to forwardedindex.<max>.
* If both forwardedindex.<n>.whitelist and forwardedindex.<n>.blacklist are
  present for the same value of n, then forwardedindex.<n>.whitelist is
  honored. forwardedindex.<n>.blacklist is ignored in this case.
* You should not normally need to change these filters from their default
  settings in $SPLUNK_HOME/system/default/outputs.conf.
* Filtered out events are not indexed if local indexing is not enabled.

forwardedindex.filter.disable = [true|false]
* If true, disables index filtering. Events for all indexes are then
  forwarded.
* Defaults to false.

#----Automatic Load-Balancing 
autoLB = true
* Automatic load balancing is the only way to forward data. Round-robin
  method is not supported anymore.
* Defaults to true.

autoLBFrequency = <seconds>
* Every autoLBFrequency seconds, a new indexer is selected randomly from the
  list of indexers provided in the server attribute of the target group
  stanza.
* Defaults to 30 (seconds).

#----SSL Settings----

# To set up SSL on the forwarder, set the following attribute/value pairs.
# If you want to use SSL for authentication, add a stanza for each receiver
# that must be certified.

sslPassword = <password>
* The password associated with the CAcert.
* The default Splunk CAcert uses the password "password".
* There is no default value.

sslCertPath = <path>
* If specified, this connection will use SSL.
* This is the path to the client certificate.
* There is no default value.

sslCipher = <string>
* If set, uses the specified cipher string for the input processors.
* If not set, the default cipher string is used.
* Provided by OpenSSL. This is used to ensure that the server does not
  accept connections using weak encryption protocols.

ecdhCurveName = <string>
* DEPRECATED, Use 'ecdhCurves' to specify one or more ec curves instead.
* ECDH curve to use for ECDH key negotiation
* We only support named curves specified by their SHORT name.
  (see struct ASN1_OBJECT in asn1.h)
* The list of valid named curves by their short/long names can be obtained
  by executing this command:
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

sslRootCAPath = <path>
* DEPRECATED; use server.conf/[sslConfig]/sslRootCAPath instead.
* Used only when server.conf's 'sslRootCAPath' is unset.
* Full path to the root CA (Certificate Authority) certificate store.
* The <path> must refer to a PEM format file containing one or more root CA
  certificates concatenated together.
* Default is unset.

sslVerifyServerCert = [true|false]
* If true, you must make sure that the server you are connecting to is a
  valid one (authenticated).
* Both the common name and the alternate name of the server are then checked
  for a match.
* Defaults to false.

tlsHostname = [<string>]
* TLS extension that allows sending an identifier with SSL Client Hello
* Defaults to empty string

sslCommonNameToCheck = <commonName1>, <commonName2>, ... 
* Optional. Defaults to no common name checking.
* Check the common name of the server's certificate against this name.
* If there is no match, assume that Splunk is not authenticated against this
  server.
* 'sslVerifyServerCert' must be set to true for this setting to work.

sslAltNameToCheck = <alternateName1>, <alternateName2>, ...
* Optional. Defaults to no alternate name checking.
* Check the alternate name of the server's certificate against this list of names.
* If there is no match, assume that Splunk is not authenticated against this
  server.
* 'sslVerifyServerCert' must be set to true for this setting to work.

useClientSSLCompression = [true|false]
* Enables compression on SSL.
* Defaults to value of useClientSSLCompression from [sslConfig] stanza in
  server.conf.

sslQuietShutdown = [true|false]
* Enables quiet shutdown mode in SSL
* Defaults to false

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

#----Indexer Acknowledgment ----
# Indexer acknowledgment ensures that forwarded data is reliably delivered
# to the receiver.
# If the receiver is an indexer, it indicates that the indexer has received
# the data, indexed it, and written it to the file system. If the receiver
# is an intermediate forwarder, it indicates that the intermediate forwarder
# has successfully forwarded the data to the terminating indexer and has
# received acknowledgment from  that indexer.

# Important: Indexer acknowledgment is a complex feature that requires
# careful planning. Before using it, read the online topic describing it in
# the Distributed Deployment manual.

useACK = [true|false]
* When set to true, the forwarder will retain a copy of each sent event,
  until the receiving system sends an acknowledgement.
  * The receiver will send an acknowledgement when it has fully handled it
    (typically written it to disk in indexing)
  * In the event of receiver misbehavior (acknowledgement is not received),
    the data will be re-sent to an alternate receiver.
  * Note: the maximum memory used for the outbound data queues will increase
    significantly by default (500KB ->  28MB) when useACK is enabled. This
    is intended for correctness and performance.
* When set to false, the forwarder will consider the data fully processed
  when it finishes writing it to the network socket.
* This attribute can be set at the [tcpout] or [tcpout:<target_group>]
  stanza levels. You cannot set it for individual servers at the
  [tcpout-server: ...] stanza level.
* Defaults to false.

############
#----Syslog output----
############
# The syslog output processor is not available for universal or light
# forwarders.

# The following configuration is used to send output using syslog:

[syslog]
defaultGroup = <target_group>, <target_group>, ...

[syslog:<target_group>]

#----REQUIRED SETTINGS----
# Required settings for a syslog output group:

server = [<ip>|<servername>]:<port>
* IP or servername where syslog server is running.
* Port on which server is listening. You must specify the port. Syslog, by
  default, uses 514.

#----OPTIONAL SETTINGS----

# Optional settings for syslog output:

type = [tcp|udp]
* Protocol used.
* Default is udp.

priority = <priority_value> | NO_PRI
* The priority_value should specified as "<integer>" (an integer surrounded
  by angle brackets). For example, specify  a priority of 34 like this: <34>
* The integer must be one to three digits in length.
* The value you enter will appear in the syslog header.
* Mimics the number passed via syslog interface call, documented via man
  syslog.
* The integer can be computed as (<facility> * 8) + <severity>. For example,
  if <facility> is 4 (security/authorization messages) and <severity> is 2
  (critical conditions), the priority will be 34 = (4 * 8) + 2. Set the
  attribute to: <34>
* The table of facility and severity (and their values) can be referenced in
  RFC3164, eg http://www.ietf.org/rfc/rfc3164.txt section 4.1.1
* Defaults to <13>, or a facility of "user" or typically unspecified
  application, and severity of "Notice".
* If you do not wish to add priority, set 'NO_PRI' as priority value.
    * Example: priority = NO_PRI
* The table is reproduced briefly here, some of these are archaic.
  Facility:
     0 kernel messages
     1 user-level messages
     2 mail system
     3 system daemons
     4 security/authorization messages
     5 messages generated internally by syslogd
     6 line printer subsystem
     7 network news subsystem
     8 UUCP subsystem
     9 clock daemon
    10 security/authorization messages
    11 FTP daemon
    12 NTP subsystem
    13 log audit
    14 log alert
    15 clock daemon
    16 local use 0  (local0)
    17 local use 1  (local1)
    18 local use 2  (local2)
    19 local use 3  (local3)
    20 local use 4  (local4)
    21 local use 5  (local5)
    22 local use 6  (local6)
    23 local use 7  (local7)
  Severity:
    0  Emergency: system is unusable
    1  Alert: action must be taken immediately
    2  Critical: critical conditions
    3  Error: error conditions
    4  Warning: warning conditions
    5  Notice: normal but significant condition
    6  Informational: informational messages
    7  Debug: debug-level messages

syslogSourceType = <string>
* Specifies an additional rule for handling data, in addition to that 
  provided by the 'syslog' source type.
* This string is used as a substring match against the sourcetype key.  For
  example, if the string is set to 'syslog', then all source types
  containing the string 'syslog' will receive this special treatment.
* To match a source type explicitly, use the pattern
  "sourcetype::sourcetype_name".
    * Example: syslogSourceType = sourcetype::apache_common
* Data which is 'syslog' or matches this setting is assumed to already be in 
  syslog format. 
* Data which does not match the rules has a header, optionally a timestamp 
  (if defined in 'timestampformat'), and a hostname added to the front of 
  the event. This is how Splunk causes arbitrary log data to match syslog 
  expectations.
* Defaults to unset.

timestampformat = <format>
* If specified, the formatted timestamps are added to the start of events 
  forwarded to syslog.
* As above, this logic is only applied when the data is not syslog, or the 
  syslogSourceType.
* If the data is not in syslog-compliant format and timestampformat is 
  not specified, the output produced will not be RFC3164-compliant.
* The format is a strftime-style timestamp formatting string. This is the 
  same implementation used in the 'eval' search command, splunk logging, and 
  other places in splunkd.
  * For example: %b %e %H:%M:%S for RFC3164-compliant output
    * %b - Abbreviated month name (Jan, Feb, ...)
    * %e - Day of month
    * %H - Hour
    * %M - Minute
    * %s - Second
* For a more exhaustive list of the formatting specifiers, refer to the
  online documentation.
* Note that the string is not quoted.
* Defaults to unset, which means that no timestamp will be inserted into the
  front of events.

dropEventsOnQueueFull = <integer>
* If set to a positive number, wait <integer> seconds before throwing out
  all new events until the output queue has space.
* Setting this to -1 or 0 will cause the output queue to block when it gets
  full, causing further blocking up the processing chain.
* If any target group's queue is blocked, no more data will reach any other
  target group.
* Defaults to -1 (do not drop events).

maxEventSize = <integer>
* If specified, sets the maximum size of an event that splunk will transmit.
* All events excedding this size will be truncated.
* Defaults to 1024 bytes.

#---- Routing Data to Syslog Server -----
# To route data to syslog server:
# 1) Decide which events to route to which servers.
# 2) Edit the props.conf, transforms.conf, and outputs.conf files on the
#    forwarders.

# Edit $SPLUNK_HOME/etc/system/local/props.conf and set a TRANSFORMS-routing
# attribute as shown here:

 [<spec>]
 TRANSFORMS-routing=<unique_stanza_name>

* <spec> can be:
  * <sourcetype>, the source type of an event
  * host::<host>, where <host> is the host for an event
  * source::<source>, where <source> is the source for an event

* Use the <unique_stanza_name> when creating your entry in transforms.conf.

# Edit $SPLUNK_HOME/etc/system/local/transforms.conf and set rules to match your props.conf stanza: 

  [<unique_stanza_name>]
  REGEX=<your_regex>
  DEST_KEY=_SYSLOG_ROUTING
  FORMAT=<unique_group_name>

* <unique_stanza_name> must match the name you created in props.conf.
* Enter the regex rules in <your_regex> to determine which events get
  conditionally routed.
* DEST_KEY should be set to _SYSLOG_ROUTING to send events via SYSLOG.
* Set FORMAT to <unique_group_name>. This should match the syslog group name
  you create in outputs.conf.

############
#----IndexAndForward Processor-----
############
# The IndexAndForward processor determines the default behavior for indexing
# data on full Splunk. It has the "index" property, which determines whether
# indexing occurs.
#
# When Splunk is not configured as a forwarder, "index" is set to "true".
# That is, the Splunk instance indexes data by default.
#
# When Splunk is configured as a forwarder, the processor turns "index" to
# "false". That is, the Splunk instance does not index data by default.
#
# The IndexAndForward processor has no effect on the universal forwarder,
# which can never index data.
#
# If the [tcpout] stanza configures the indexAndForward attribute, the value
# of that attribute overrides the default value of "index". However, if you
# set "index" in the [indexAndForward] stanza, described below, it
# supersedes any value set in [tcpout].

[indexAndForward]
index = [true|false]
* If set to true, data is indexed.
* If set to false, data is not indexed.
* Default depends on whether the Splunk instance is configured as a
  forwarder, modified by any value configured for the indexAndForward
  attribute in [tcpout].

selectiveIndexing = [true|false]
* When index is 'true', all events are indexed. Setting selectiveIndexing to
  'true' allows you to index only specific events that has key
  '_INDEX_AND_FORWARD_ROUTING' set.
* '_INDEX_AND_FORWARD_ROUTING' can be set in inputs.conf as:
  [<input_stanza>]
  _INDEX_AND_FORWARD_ROUTING = local
* Defaults to false.

[indexer_discovery:<name>]

pass4SymmKey = <password>
* Security key shared between indexer_discovery and forwarders.
* If specified here, the same value must also be specified on the master node identified by master_uri.

send_timeout = <seconds>
* Low-level timeout for sending messages to the master node.
* Fractional seconds are allowed.
* Default is 30.

rcv_timeout = <seconds>
* Low-level timeout for receiving messages from the master node.
* Fractional seconds are allowed.
* Default is 30.

cxn_timeout = <seconds>
* Low-level timeout for connecting to the master node.
* Fractional seconds are allowed.
* Default is 30.

master_uri = <uri>
* URI and management port of the cluster master used in indexer discovery.
* Example: https://SplunkMaster01.example.com:8089
