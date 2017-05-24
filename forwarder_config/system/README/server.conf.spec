#   Version 6.4.0
#
# This file contains the set of attributes and values you can use to
# configure server options in server.conf.
#
# There is a server.conf in $SPLUNK_HOME/etc/system/default/.  To set custom
# configurations, place a server.conf in $SPLUNK_HOME/etc/system/local/.
# For examples, see server.conf.example.  You must restart Splunk to enable
# configurations.
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
#     multiple definitions of the same attribute, the last definition in the
#     file wins.
#   * If an attribute is defined at both the global level and in a specific
#     stanza, the value in the specific stanza takes precedence.

############################################################################
# General Server Configuration
############################################################################
[general]
serverName = <ASCII string>
* The name used to identify this Splunk instance for features such as
  distributed search.
* Defaults to <hostname>-<user running splunk>.
* Shall not be an empty string
* May contain environment variables
* After any environment variables have been expanded, the server name
  (if not an IPv6 address) can only contain letters, numbers, underscores,
  dots, and dashes; and it must start with a letter, number, or an
  underscore.

hostnameOption = <ASCII string>
* The option used to specify the detail in the server name used to identify
  this Splunk instance.
* Can be one of "fullyqualifiedname" , "clustername", "shortname"
* Is applicable to Windows only
* Shall not be an empty string

sessionTimeout = <nonnegative integer>[smhd]
* The amount of time before a user session times out, expressed as a
  search-like time range
* Examples include '24h' (24 hours), '3d' (3 days),
  '7200s' (7200 seconds, or two hours)
* Defaults to '1h' (1 hour)

trustedIP = <IP address>
* All logins from this IP address are trusted, meaning password is no longer
  required
* Only set this if you are using Single Sign On (SSO)

allowRemoteLogin = always|never|requireSetPassword
* Controls remote management by restricting general login. Note that this
  does not apply to trusted SSO logins from trustedIP.
* If 'always', enables authentication so that all remote login attempts are
  allowed.
* If 'never', only local logins to splunkd will be allowed. Note that this
  will still allow remote management through splunkweb if splunkweb is on
  the same server.
* If 'requireSetPassword' (default):
  * In the free license, remote login is disabled.
  * In the pro license, remote login is only disabled for "admin" user if
    default password of "admin" has not been changed.

access_logging_for_phonehome = true|false
* Enables/disables logging to splunkd_access.log for client phonehomes
* defaults to true (logging enabled)

hangup_after_phonehome = true|false
* Controls whether or not the (deployment) server hangs up the connection
  after the phonehome is done.
* By default we use persistent HTTP 1.1 connections with the server to
  handle phonehomes. This may show higher memory usage for a large number of
  clients.
* In case we have more than maximum concurrent tcp connection number of
  deployment clients, persistent connections do not help with the reuse of
  connections anyway, so setting this to false helps bring down memory
* usage.
* defaults to false (persistent connections for phonehome)

pass4SymmKey = <password>
* Authenticates traffic between:
  * License master and its license slaves.
  * Members of a cluster; see Note 1 below.
  * Deployment server (DS) and its deployment clients (DCs); see Note 2
    below.
* Note 1: Clustering may override the passphrase specified here, in
  the [clustering] stanza.  A clustering searchhead connecting to multiple
  masters may further override in the [clustermaster:stanza1] stanza.
* Note 2: By default, DS-DCs passphrase auth is disabled.  To enable DS-DCs
  passphrase auth, you must *also* add the following line to the
  [broker:broker] stanza in restmap.conf:
     requireAuthentication = true
* In all scenarios, *every* node involved must set the same passphrase in
  the same stanza(s) (i.e. [general] and/or [clustering]); otherwise,
  respective communication (licensing and deployment in case of [general]
  stanza, clustering in case of [clustering] stanza) will not proceed.

listenOnIPv6 = no|yes|only
* By default, splunkd will listen for incoming connections (both REST and
  TCP inputs) using IPv4 only
* To enable IPv6 support in splunkd, set this to 'yes'.  splunkd will
  simultaneously listen for connections on both IPv4 and IPv6
* To disable IPv4 entirely, set this to 'only', which will cause splunkd
  to exclusively accept connections over IPv6.  You will probably also
  need to change mgmtHostPort in web.conf (use '[::1]' instead of '127.0.0.1')
* Note that any setting of SPLUNK_BINDIP in your environment or
  splunk-launch.conf will override this value.  In that case splunkd will
  listen on the exact address specified.

connectUsingIpVersion = auto|4-first|6-first|4-only|6-only
* When making outbound TCP connections (for forwarding eventdata, making
  distributed search requests, etc) this controls whether the connections
  will be made via IPv4 or IPv6.
* If a host is available over both IPv4 and IPv6 and this is set to
  '4-first', then we will connect over IPv4 first and fallback to IPv6 if
  the connection fails.
* If it is set to '6-first' then splunkd will try IPv6 first and fallback to
  IPv4 on failure
* If this is set to '4-only' then splunkd will only attempt to make
  connections over IPv4.
* Likewise, if this is set to '6-only', then splunkd will only attempt to
  connect to the IPv6 address.
* The default value of 'auto' will select a reasonable value based on
  listenOnIPv6 setting.  If that value is set to 'no' it will act like
  '4-only'.  If it is set to 'yes' it will act like '6-first' and if it is
  set to 'only' it will act like '6-only'.
* Note that connections to literal addresses are unaffected by this.  For
  example, if a forwarder is configured to connect to "10.1.2.3" the
  connection will be made over IPv4 regardless of this setting.

guid = <globally unique identifier for this instance>
* This setting now (as of 5.0) belongs in the [general] stanza of
  SPLUNK_HOME/etc/instance.cfg file; please see specfile of instance.cfg for
  more information.

useHTTPServerCompression = true|false
* Whether splunkd HTTP server should support gzip content encoding. For more
  info on how content encoding works, see
  http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html (section 14.3).
* Defaults to true.

defaultHTTPServerCompressionLevel = <integer>
* If useHTTPServerCompression is enabled, this setting constrols the
  compression "level" we attempt
* This number must be in the range 1 through 9
* Higher numbers produce smaller compressed results but require more CPU
  usage
* The default value of 6 is appropriate for most environments

skipHTTPCompressionAcl = <network_acl>
* Lists a set of networks or addresses to skip compressing data for.
  These are addresses that are considered so close that network speed is
  never an issue, so any CPU time spent compressing a response is wasteful.
* Note that the server may still respond with compressed data if it
  already has a compressed version of the data available.
* These rules are separated by commas or spaces
* Each rule can be in the following forms:
    1. A single IPv4 or IPv6 address (examples: "10.1.2.3", "fe80::4a3")
    2. A CIDR block of addresses (examples: "10/8", "fe80:1234/32")
    3. A DNS name, possibly with a '*' used as a wildcard (examples:
       "myhost.example.com", "*.splunk.com")
    4. A single '*' which matches anything
* Entries can also be prefixed with '!' to negate their meaning.
* Defaults to localhost addresses.

site = <site-id>
* Specifies the site that this splunk instance belongs to when multisite is
  enabled.
* Valid values for site-id include site1 to site63

useHTTPClientCompression = true|false|on-http|on-https
* Whether gzip compression should be supported when Splunkd acts as a client
  (including distributed searches). Note that  in order for the content to
  be compressed, the HTTP server that the client is connecting to should
  also support compression.
* If the connection is being made over https and
  useClientSSLCompression=true (see below), then setting this option to true
  would result in double compression work without much compression gain. It
  is recommended that this value be set to on-http (or to true, and
  useClientSSLCompression to false).
* Defaults to false.

embedSecret = <string>
* When using report embedding, normally the generated URLs can only
  be used on the search head they were generated on
* If "embedSecret" is set, then the token in the URL will be encrypted
  with this key.  Then other search heads with the exact same setting
  can also use the same URL.
* This is needed if you want to use report embedding across multiple
  nodes on a search head pool.

parallelIngestionPipelines = <integer>
* Data being loaded into splunk, whether for indexing or forwarding,
  progresses through a series of steps arranged into "pipelines".
  By setting this to more than one, more processor threads can be set up
  to perform this work.
* Defaults to 1.
* NOTE: Be careful when changing this.  By increasing the CPU used by
  data ingestion, less is available for other tasks such as searching.
  For most installs the default setting is optimal.
* NOTE: Please note that enabling multiple ingestion pipelines could 
  change the behaviour of some of the settings in limits.conf file. 
  Each ingestion pipeline will enforce these limits independently. 
    1. maxKBps
    2. max_fd  
    3. maxHotBuckets
    4. maxHotSpanSecs

instanceType = <string>
* Should not be modified by users.
* Informs components (such as the SplunkWeb Manager section) which
  environment Splunk is running in, to allow for more customized behaviors.
* Defaults to "download", meaning no special behaviors.

requireBootPassphrase = <bool>
* Prompt the user for a boot passphrase when starting Splunk.
* Splunk uses this passphrase to grant itself access to platform-provided
  secret storage facilities, like the GNOME keyring.
* For more information about secret storage, see the [secrets] stanza in
  $SPLUNK_HOME/etc/system/README/authentication.conf.spec.
* Defaults to true if Common Criteria mode is enabled.
* Defaults to false if Common Criteria mode is disabled.

############################################################################
# Deployment Configuration details
############################################################################

[deployment]
pass4SymmKey = <password>
    * Authenticates traffic between Deployment server (DS) and its deployment 
      clients (DCs).
    * By default, DS-DCs passphrase auth is disabled. To enable DS-DCs 
      passphrase auth, you must *also* add the following line to the 
      [broker:broker] stanza in restmap.conf:
          requireAuthentication = true
    * If it is not set in the deployment stanza, the key will be looked in
      the general stanza

############################################################################
# SSL Configuration details
############################################################################

[sslConfig]
* Set SSL for communications on Splunk back-end under this stanza name.
  * NOTE: To set SSL (eg HTTPS) for Splunk Web and the browser, use
          web.conf.
* Follow this stanza name with any number of the following attribute/value
  pairs.
* If you do not specify an entry for each attribute, Splunk will use the
  default value.

enableSplunkdSSL = true|false
* Enables/disables SSL on the splunkd management port (8089) and KV store
  port (8191).
* Defaults to true.
* Note: Running splunkd without SSL is not generally recommended.
* Distributed search will often perform better with SSL enabled.

useClientSSLCompression = true|false
* Turns on HTTP client compression.
* Server-side compression is turned on by default; setting this on the
  client side enables compression between server and client.
* Enabling this potentially gives you much faster distributed searches
  across multiple Splunk instances.
* Defaults to true.

useSplunkdClientSSLCompression = true|false
* Controls whether SSL compression would be used when splunkd is acting as
  an HTTP client, usually during certificate exchange, bundle replication,
  remote calls etc.
* NOTE: this setting is effective if, and only if, useClientSSLCompression
        is set to true
* NOTE: splunkd is not involved in data transfer in distributed search, the
        search in a separate process is.
* Defaults to true.

sslVersions = <versions_list>
* Comma-separated list of SSL versions to support for incoming connections.
* The versions available are "ssl3", "tls1.0", "tls1.1", and "tls1.2".
* The special version "*" selects all supported versions.  The version "tls"
  selects all versions tls1.0 or newer.
* If a version is prefixed with "-" it is removed from the list.
* SSLv2 is always disabled; "-ssl2" is accepted in the version list but does nothing.
* When configured in FIPS mode, ssl3 is always disabled regardless
  of this configuration.
* Defaults to "*,-ssl2" (anything newer than SSLv2).

sslVersionsForClient = <versions_list>
* Comma-separated list of SSL versions to support for outgoing HTTP connections
  from splunkd.  This includes distributed search, deployment client, etc.
* This is usually less critical, since SSL/TLS will always pick the highest
  version both sides support.  However, this can be used to prohibit making
  connections to remote servers that only support older protocols.
* The syntax is the same as the sslVersions setting above
* Note that for forwarder connections, there is a separate "sslVersions"
  setting in outputs.conf.  For connections to SAML servers, there is a
  separate "sslVersions" setting in authentication.conf.
* Defaults to "*,-ssl2" (anything newer than SSLv2).

supportSSLV3Only = true|false
* DEPRECATED.  SSLv2 is now always disabled.  The exact set of
  SSL versions allowed is now configurable via the "sslVersions" setting
  above

sslVerifyServerCert = true|false
* Used by distributed search: when making a search request to another
  server in the search cluster.
* Used by distributed deployment clients: when polling a deployment
  server.
* If this is set to true, you should make sure that the server that is
  being connected to is a valid one (authenticated).  Both the common
  name and the alternate name of the server are then checked for a
  match if they are specified in this configuration file.  A
  certificiate is considered verified if either is matched.
* Default is false.

sslCommonNameToCheck = <commonName>
* If this value is set, and 'sslVerifyServerCert' is set to true,
  splunkd will limit most outbound HTTPS connections to hosts which use
  a cert with this common name.
* 'sslCommonNameList' is a multivalue extension of this setting, certs
  which match 'sslCommonNameList' or 'sslCommonNameToCheck' will be
  accepted.
* The most important scenario is distributed search.
* This feature does not work with the deployment server and client
  communication over SSL.
* Optional.  Defaults to no common name checking.

sslCommonNameList = <commonName1>, <commonName2>, ...
* If this value is set, and 'sslVerifyServerCert' is set to true,
  splunkd will limit most outbound HTTPS connections to hosts which use
  a cert with one of the listed common names.
* The most important scenario is distributed search.
* Optional.  Defaults to no common name checking.

sslAltNameToCheck = <alternateName1>, <alternateName2>, ...
* If this value is set, and 'sslVerifyServerCert' is set to true,
  splunkd will also be willing to verify certificates which have a
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

requireClientCert = true|false
* Requires that any HTTPS client that connects to splunkd internal HTTPS
  server has a certificate that was signed by our CA (certificate
  authority).
* Used by distributed search: Splunk indexing instances must be
  authenticated to connect to another splunk indexing instance.
* Used by distributed deployment: the deployment server requires that
  deployment clients are authenticated before allowing them to poll for new
  configurations/applications.
* If true, a client can connect ONLY if a certificate created by our
  certificate authority was used on that client.
* Default is false.

cipherSuite = <cipher suite string>
* If set, Splunk uses the specified cipher string for the HTTP server.
* If not set, Splunk uses the default cipher string provided by OpenSSL.
  This is used to ensure that the server does not accept connections using
  weak encryption protocols.
* Must specify 'dhFile' to enable any Diffie-Hellman ciphers.

ecdhCurveName = <string>
* DEPRECATED, Use 'ecdhCurves' to specify one or more ec curves instead.
* ECDH curve to use for ECDH key negotiation
* We only support named curves specified by their SHORT name.
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

sslKeysfile = <filename>
* Server certificate file.
* Certificates are auto-generated by splunkd upon starting Splunk.
* You may replace the default cert with your own PEM format file.
* Certs are stored in caPath (see below).
* Default is server.pem.

sslKeysfilePassword = <password>
* Server certificate password.
* Default is password.

sslRootCAPath = <path>
* Full path to the operating system's root CA (Certificate Authority)
  certificate store.
* The <path> must refer to a PEM format file containing one or more root CA
  certificates concatenated together.
* Required for Common Criteria.
* This setting is not used on Windows.
* Default is unset.

caCertFile = <filename>
* DEPRECATED; use 'sslRootCAPath' instead.
* Used only when 'sslRootCAPath' is unset.
* File name (relative to 'caPath') of the root CA (Certificate Authority)
  certificate store.
* The <filename> must refer to a PEM format file containing one or more root CA
  certificates concatenated together.
* Default is cacert.pem.

dhFile = <filename>
* PEM format Diffie-Hellman parameter file name.
* DH group size should be no less than 2048bits.
* This file is required in order to enable any Diffie-Hellman ciphers.
* It must be stored in 'caPath' (see below).
* Not set by default.

caPath = <path>
* Path where all these certs are stored.
* Default is $SPLUNK_HOME/etc/auth.

certCreateScript = <script name>
* Creation script for generating certs on startup of Splunk.

sendStrictTransportSecurityHeader = true|false
* If set to true, the REST interface will send a "Strict-Transport-Security"
  header with all responses to requests made over SSL.
* This can help avoid a client being tricked later by a Man-In-The-Middle
  attack to accept a non-SSL request.  However, this requires a commitment that
  no non-SSL web hosts will ever be run on this hostname on any port.  For
  example, if splunkweb is in default non-SSL mode this can break the
  ability of browser to connect to it.  Enable with caution.
* Defaults to false

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

############################################################################
# Splunkd HTTP server configuration
############################################################################

[httpServer]
* Set stand-alone HTTP settings for Splunk under this stanza name.
* Follow this stanza name with any number of the following attribute/value
  pairs.
* If you do not specify an entry for each attribute, Splunk uses the default
  value.

atomFeedStylesheet = <string>
* Defines the stylesheet relative URL to apply to default Atom feeds.
* Set to 'none' to stop writing out xsl-stylesheet directive.
* Defaults to /static/atom.xsl.

max-age = <nonnegative integer>
* Set the maximum time (in seconds) to cache a static asset served off of
  the '/static' directory.
* This value is passed along in the 'Cache-Control' HTTP header.
* Defaults to 3600.

follow-symlinks = true|false
* Toggle whether static file handler (serving the '/static' directory)
  follow filesystem symlinks when serving files.
* Defaults to false.

disableDefaultPort = true|false
* If true, turns off listening on the splunkd management port
  (8089 by default)
* This setting is not recommended:
  * This is the general communication path to splunkd.  If it is disabled,
    there is no way to communicate with a running splunk.
  * This means many command line splunk invocations cannot function,
    splunkweb cannot function, the REST interface cannot function, etc.
  * If you choose to disable the port anyway, understand that you are
    selecting reduced Splunk functionality.
* Default value is 'false'.

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

streamInWriteTimeout = <positive number>
* When uploading data to http server, if http server is unable to write data
  to receiver for configured streamInWriteTimeout seconds, it aborts write
  operation.
* Defaults to 5 seconds.

max_content_length = <int>
* Measured in bytes
* HTTP requests over this size will rejected.
* Exists to avoid allocating an unreasonable amount of memory from web
  requests
* Defaulted to 838860800 or 800MB
* In environments where indexers have enormous amounts of RAM, this
  number can be reasonably increased to handle large quantities of
  bundle data.

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

forceHttp10 = auto|never|always
* When set to "always", the REST HTTP server will not use some
  HTTP 1.1 features such as persistent connections or chunked
  transfer encoding.
* When set to "auto" it will do this only if the client sent no
  User-Agent header, or if the user agent is known to have bugs
  in its HTTP/1.1 support.
* When set to "never" it always will allow HTTP 1.1, even to
  clients it suspects may be buggy.
* Defaults to "auto"

crossOriginSharingPolicy = <origin_acl> ...
* List of the HTTP Origins for which to return Access-Control-Allow-* (CORS)
  headers.
* These headers tell browsers that we trust web applications at those sites
  to make requests to the REST interface
* The origin is passed as a URL without a path component (for example
  "https://app.example.com:8000")
* This setting can take a list of acceptable origins, separated
  by spaces and/or commas
* Each origin can also contain wildcards for any part.  Examples:
    *://app.example.com:*  (either HTTP or HTTPS on any port)
    https://*.example.com  (any host under example.com, including example.com itself)
* An address can be prefixed with a '!' to negate the match, with
  the first matching origin taking precedence.  For example,
  "!*://evil.example.com:* *://*.example.com:*" to not avoid
  matching one host in a domain
* A single "*" can also be used to match all origins
* By default the list is empty

x_frame_options_sameorigin = true|false
* Adds a X-Frame-Options header set to "SAMEORIGIN" to every response served by splunkd
* Defaults to true

allowEmbedTokenAuth = true|false
* If set to false, splunkd will not allow any access to artifacts
  that previously had been explicitly shared to anonymous users.
* This effectively disables all use of the "embed" feature.
* Defaults to true

cliLoginBanner = <string>
* Sets a message which will be added to the HTTP reply headers
  of requests for authentication, and to the "server/info" endpoint
* This will be printed by the Splunk CLI before it prompts
  for authentication credentials.  This can be used to print
  access policy information.
* If this string starts with a '"' character, it is treated as a
  CSV-style list with each line comprising a line of the message.
  For example: "Line 1","Line 2","Line 3"
* Defaults to empty (no message)

allowBasicAuth = true|false
* Allows clients to make authenticated requests to the splunk
  server using "HTTP Basic" authentication in addition to the
  normal "authtoken" system
* This is useful for programmatic access to REST endpoints and
  for accessing the REST API from a web browser.  It is not
  required for the UI or CLI.
* Defaults to true

basicAuthRealm = <string>
* When using "HTTP Basic" authenitcation, the 'realm' is a
  human-readable string describing the server.  Typically, a web
  browser will present this string as part of its dialog box when
  asking for the username and password.
* This can be used to display a short message describing the
  server and/or its access policy.
* Defaults to "/splunk"

allowCookieAuth = true|false
* Allows clients to request an HTTP cookie from the /services/server/auth
  endpoint which can then be used to authenticate future requests
* Defaults to true

cookieAuthHttpOnly = true|false
* When using cookie based authentication, mark returned cookies
  with the "httponly" flag to tell the client not to allow javascript
  code to access its value
* Defaults to true
* NOTE: has no effect if allowCookieAuth=false

cookieAuthSecure = true|false
* When using cookie based authentication, mark returned cookies
  with the "secure" flag to tell the client never to send it over
  an unencrypted HTTP channel
* Defaults to true
* NOTE: has no effect if allowCookieAuth=false OR the splunkd REST
  interface has SSL disabled

dedicatedIoThreads = <int>
* If set to zero, HTTP I/O will be performed in the same thread
  that accepted the TCP connection.
* If set set to a non-zero value, separate threads will be run
  to handle the HTTP I/O, including SSL encryption.
* Defaults to "0"
* Typically this does not need to be changed.  For most usage
  scenarios using the same the thread offers the best performance.

############################################################################
# Splunkd HTTPServer listener configuration
############################################################################

[httpServerListener:<ip:><port>]
* Enable the splunkd REST HTTP server to listen on an additional port number
  specified by <port>.  If a non-empty <ip> is included (for example:
  "[httpServerListener:127.0.0.1:8090]") the listening port will be
  bound only to a specific interface.
* Multiple "httpServerListener" stanzas can be specified to listen on
  more ports.
* Normally, splunkd listens only on the single REST port specified in
  web.conf's "mgmtHostPort" setting, and none of these stanzas need to
  be present.  Add these stanzas only if you want the REST HTTP server
  to listen to more than one port.

ssl = true|false
* Toggle whether this listening ip:port will use SSL or not.
* Default value is 'true'.
* If the main REST port is SSL (the "enableSplunkdSSL" setting in this
  file's [sslConfig] stanza) and this stanza is set to "ssl=false" then
  clients on the local machine such as the CLI may connect to this port.

listenOnIPv6 = no|yes|only
* Toggle whether this listening ip:port will listen on IPv4, IPv6, or both.
* If not present, the setting in the [general] stanza will be used

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
* Defaults to the setting in the [httpServer] stanza above

############################################################################
# Static file handler MIME-type map
############################################################################

[mimetype-extension-map]
* Map filename extensions to MIME type for files served from the static file
  handler under this stanza name.

<file-extension> = <MIME-type>
* Instructs the HTTP static file server to mark any files ending
  in 'file-extension' with a header of 'Content-Type: <MIME-type>'.
* Defaults to:
    [mimetype-extension-map]
    gif = image/gif
    htm = text/html
    jpg = image/jpg
    png = image/png
    txt = text/plain
    xml = text/xml
    xsl = text/xml

############################################################################
# Remote applications configuration (e.g. SplunkBase)
############################################################################

[applicationsManagement]
* Set remote applications settings for Splunk under this stanza name.
* Follow this stanza name with any number of the following attribute/value
  pairs.
* If you do not specify an entry for each attribute, Splunk uses the default
  value.

allowInternetAccess = true|false
* Allow Splunk to access the remote applications repository.

url = <URL>
* Applications repository.
* Defaults to https://apps.splunk.com/api/apps

loginUrl = <URL>
* Applications repository login.
* Defaults to https://apps.splunk.com/api/account:login/

detailsUrl = <URL>
* Base URL for application information, keyed off of app ID.
* Defaults to https://apps.splunk.com/apps/id

useragent = <splunk-version>-<splunk-build-num>-<platform>
* User-agent string to use when contacting applications repository.
* <platform> includes information like operating system and CPU architecture.

updateHost = <URL>
* Host section of URL to check for app updates, e.g. https://apps.splunk.com

updatePath = <URL>
* Path section of URL to check for app updates
  For example: /api/apps:resolve/checkforupgrade

updateTimeout = <time range string>
* The minimum amount of time Splunk will wait between checks for app updates
* Examples include '24h' (24 hours), '3d' (3 days),
  '7200s' (7200 seconds, or two hours)
* Defaults to '24h'

caCertFile = <filename>
* Root CA cert for validating SSL certificate from https://apps.splunk.com/

sslCommonNameList = <commonName1>, <commonName2>, ...
* If this value is set, splunkd will limit most outbound HTTPS connections 
  to hosts which use a cert with one of the listed common names.
* Defaults to 'apps.splunk.com'

cipherSuite = <cipher suite string>
* If set, uses the specified cipher string for making outbound HTTPS connection.

############################################################################
# Misc. configuration
############################################################################

[scripts]

initialNumberOfScriptProcesses = <num>
* The number of pre-forked script processes that are launched when the
  system comes up.  These scripts are reused when script REST endpoints
  *and* search scripts are executed.
  The idea is to eliminate the performance overhead of launching the script
  interpreter every time it is invoked.  These processes are put in a pool.
  If the pool is completely busy when a script gets invoked, a new processes
  is fired up to handle the new invocation - but it disappears when that
  invocation is finished.


############################################################################
# Disk usage settings (for the indexer, not for Splunk log files)
############################################################################

[diskUsage]

minFreeSpace = <num>
* Specified in megabytes.
* The default setting is 5000 (approx 5GB)
* Specifies a safe amount of space that must exist for splunkd to continue
  operating.
* Note that this affects search and indexing
* For search:
  * Before attempting to launch a search, splunk will require this amount of
    free space on the filesystem where the dispatch directory is stored,
    $SPLUNK_HOME/var/run/splunk/dispatch
  * Applied similarly to the search quota values in authorize.conf and
    limits.conf.
* For indexing:
  * Periodically, the indexer will check space on all partitions
    that contain splunk indexes as specified by indexes.conf.  Indexing
    will be paused and a ui banner + splunkd warning posted to indicate
    need to clear more disk space.

pollingFrequency = <num>
* After every pollingFrequency events indexed, the disk usage is checked.
* The default frequency is every 100000 events.

pollingTimerFrequency = <num>
* After every pollingTimerFrequency seconds, the disk usage is checked
* The default value is 10 seconds

############################################################################
# Queue settings
############################################################################
[queue]

maxSize = [<integer>|<integer>[KB|MB|GB]]
* Specifies default capacity of a queue.
* If specified as a lone integer (for example, maxSize=1000), maxSize
  indicates the maximum number of events allowed in the queue.
* If specified as an integer followed by KB, MB, or GB (for example,
  maxSize=100MB), it indicates the maximum RAM allocated for queue.
* The default is 500KB.

cntr_1_lookback_time = [<integer>[s|m]]
* The lookback counters are used to track the size and count (number of
  elements in the queue) variation of the queues using an exponentially
  moving weighted average technique. Both size and count variation
  has 3 sets of counters each. The set of 3 counters is provided to be able
  to track short, medium and long term history of size/count variation. The
  user can customize the value of these counters or lookback time.
* Specifies how far into history should the size/count variation be tracked
  for counter 1.
* It must be an integer followed by [s|m] which stands for seconds and
  minutes respectively.
* The default value for counter 1 is set to 60 seconds.

cntr_2_lookback_time = [<integer>[s|m]]
* See above for explanation and usage of the lookback counter.
* Specifies how far into history should the size/count variation be tracked
  for counter 2.
* The default value for counter 2 is set to 600 seconds.

cntr_3_lookback_time = [<integer>[s|m]]
* See above for explanation and usage of the lookback counter..
* Specifies how far into history should the size/count variation be tracked
  for counter 3.
* The default value for counter 3 is set to 900 seconds.

sampling_interval = [<integer>[s|m]]
* The lookback counters described above collects the size and count
  measurements for the queues.  This specifies at what interval the
  measurement collection will happen. Note that for a particular queue all
  the counters sampling interval is same.
* It needs to be specified via an integer followed by [s|m] which stands for
  seconds and minutes respectively.
* The default sampling_interval value is 1 second.

[queue=<queueName>]

maxSize = [<integer>|<integer>[KB|MB|GB]]
* Specifies the capacity of a queue. It overrides the default capacity
  specified in [queue].
* If specified as a lone integer (for example, maxSize=1000), maxSize
  indicates the maximum number of events allowed in the queue.
* If specified as an integer followed by KB, MB, or GB (for example,
  maxSize=100MB), it indicates the maximum RAM allocated for queue.
* The default is inherited from maxSize value specified in [queue]

cntr_1_lookback_time = [<integer>[s|m]]
* Same explanation as mentioned in [queue].
* Specifies the lookback time for the specific queue for counter 1.
* The default value is inherited from cntr_1_lookback_time value specified
  in [queue].

cntr_2_lookback_time = [<integer>[s|m]]
* Specifies the lookback time for the specific queue for counter 2.
* The default value is inherited from cntr_2_lookback_time value specified
  in [queue].

cntr_3_lookback_time = [<integer>[s|m]]
* Specifies the lookback time for the specific queue for counter 3.
* The default value is inherited from cntr_3_lookback_time value specified
  in [queue].

sampling_interval = [<integer>[s|m]]
* Specifies the sampling interval for the specific queue.
* The default value is inherited from sampling_interval value specified
  in [queue].

############################################################################
# PubSub server settings for the http endpoint.
############################################################################

[pubsubsvr-http]

disabled = true|false
* If disabled, then http endpoint is not registered. Set this value to
  'false' to expose PubSub server on http.
* Defaults to 'true'

stateIntervalInSecs = <seconds>
* The number of seconds before a connection is flushed due to inactivity.
  The connection is not closed, only messages for that connection are
  flushed.
* Defaults to 300 seconds (5 minutes).

############################################################################
# General file input settings.
############################################################################

[fileInput]

outputQueue = <queue name>
* The queue that input methods should send their data to.  Most users will
  not need to change this value.
* Defaults to parsingQueue.

############################################################################
# Settings controlling the behavior of 'splunk diag', the diagnostic tool
############################################################################

[diag]

# These settings provide defaults for invocations of the splunk diag
# command.  Generally these can be further modified by command line flags to
# the diag command.

EXCLUDE-<class> = <glob expression>
* Specifies a glob / shell pattern to be excluded from diags generated on
  this Splunk instance.
  * Example: */etc/secret_app/local/*.conf
* Further excludes can be added at the splunk diag command line, but there
  is no facility to disable configuration-based excludes at the command
  line.
* There is one exclude by default, for the splunk.secret file.

# the following commands can be overridden entirely by their command-line
# equivalents.

components = <comma separated list>
* Specifies which components of the diag should be gathered.
* This allows the disabling and enabling, categorically, of entire portions
  of diag functionality.
* All of these components are further subject to the exclude feature (see
  above), and component-specific filters (see below).
* Currently, with no configuration, all components except 'rest' are enabled
  by default.
* Available components are:
  * index_files   : Files from the index that indicate their health
                    (Hosts|Sources|Sourcetypes.data and bucketManifests).
                    User data is not collected.
  * index_listing : Directory listings of the index contents are
                    gathered, in order to see filenames, directory names,
                    sizes, timestamps and the like.
  * etc           : The entire contents of the $SPLUNK_HOME/etc
                    directory.  In other words, the configuration files.
  * log           : The contents of $SPLUNK_HOME/var/log/...
  * pool          : If search head pooling is enabled, the contents of the
                    pool dir.
  * dispatch      : Search artifacts, without the actual results,
                    In other words var/run/splunk/dispatch, but not the
                    results or events files
  * searchpeers   : Directory listings of knowledge bundles replicated for
                    distributed search
                    In other words: $SPLUNK_HOME/var/run/searchpeers
  * consensus     : Consensus protocol files produced by search head clustering
                    In other words: $SPLUNK_HOME/var/run/splunk/_raft
  * conf_replication_summary : Directory listing of configuration
                    replication summaries produced by search head clustering
                    In other words: $SPLUNK_HOME/var/run/splunk/snapshot
  * rest          : The contents of a variety of splunkd endpoints
                    Includes server status messages (system banners),
                    licenser banners, configured monitor inputs & tailing
                    file status (progress reading input files).
                    * On cluster masters, also gathers master info, fixups,
                      current peer list, clustered index info, current
                      generation, & buckets in bad stats
                    * On cluster slaves, also gathers local buckets & local
                      slave info, and the master information remotely from
                      the configured master.
  * kvstore       : Directory listings of the KV Store data directory
                    contents are gathered, in order to see filenames,
                    directory names, sizes, and timestamps.
  * file_validate : Produce list of files that were in the install media
                    which have been changed.  Generally this should be an
                    empty list.

* The special value 'all' is also supported, enabling everything explicitly.
* Further controlling the components from the command line:
    * The switch --collect replaces this list entirely.
        * Example: --collect log,etc
          This would set the componets to log and etc only, regardless of
           onfig
    * The switch --enable adds a specific component to this list.
        * Example: --enable pool
          This would ensure that pool data is collected, regardless of
          config
    * The switch --disable removes a specific component from this list.
        * Example: --disable pool
          This would ensure that pool data is *NOT* collected, regardless of
          config
* Currently, the default is to collect all components, save "rest".
* In the future there many be additional components which are not in the
  default set.
  * This may occur for new components that are expensive (large and/or slow)
  * This may occur for new components that are preceived as sensitive

# Data filters; these further refine what is collected
# most of the existing ones are designed to limit the size and collection
# time to pleasant values.

# note that most values here use underscores '_' while the command line uses
# hyphens '-'

all_dumps = <bool>
* This setting currently is irrelevant on Unix platforms.
* Affects the 'log' component of diag. (dumps are written to the log dir
  on Windows)
* Can be overridden with the --all-dumps command line flag.
* Normally, Splunk diag will gather only three .DMP (crash dump) files on
  Windows to limit diag size.
* If this is set to true, splunk diag will collect *all* .DMP files from
  the log directory.
* Defaults to unset / false (equivalent).

index_files = [full|manifests]
* Selects a detail level for the 'index_files' component.
* Can be overridden with the --index-files command line flag.
* 'manifests' limits the index file-content collection to just
  .bucketManifest files which give some information about Splunks idea of
  the general state of buckets in an index.
* 'full' adds the collection of Hosts.data, Sources.data, and
  Sourcetypes.data which indicate the breakdown of count of items by those
  categories per-bucket, and the timespans of those category entries
    * 'full' can take quite some time on very large index sizes, especially
      when slower remote storage is involved.
* Defaults to 'manifests'

index_listing = [full|light]
* Selects a detail level for the 'index_listing' component.
* Can be overridden with the --index-listing command line flag.
* 'light' gets directory listings (ls, or dir) of the hot/warm and cold
  container directory locations of the indexes, as well as listings of each
  hot bucket.
* 'full' gets a recursive directory listing of all the contents of every
  index location, which should mean all contents of all buckets.
  * 'full' may take significant time as well with very large bucket counts,
    espeically on slower storage.
* Defaults to 'light'

etc_filesize_limit = <non-negative integer in kilobytes>
* This filters the 'etc' component
* Can be overridden with the --etc-filesize-limit command line flag
* This value is specified in kilobytes.
    * Example: 2000 - this would be approximately 2MB.
* Files in the $SPLUNK_HOME/etc directory which are larger than this limit
  will not be collected in the diag.
* Diag will produce a message stating that a file has been skipped for size
  to the console. (In practice we found these large files are often a
  surprise to the administrator and indicate problems).
* If desired, this filter may be entirely disabled by setting the value
  to 0.
* Defaults to 10000 or 10MB.

log_age = <non-negative integer in days>
* This filters the 'log' component
* Can be overridden with the --log-age command line flag
* This value is specified in days
  * Example: 75 - this would be 75 days, or about 2.5 months.
* If desired, this filter may be entirely disabled by setting the value to 0.
* The idea of this default filter is that data older than this is rarely
  helpful in troubleshooting cases in any event.
* Defaults to 60, or approximately 2 months.


############################################################################
# License manager settings for configuring the license pool(s)
############################################################################

[license]
master_uri = [self|<uri>]
* An example of <uri>: <scheme>://<hostname>:<port>

active_group = Enterprise | Trial | Forwarder | Free
# these timeouts only matter if you have a master_uri set to remote master
connection_timeout = 30
* Maximum time (in seconds) to wait before connection to master times out

send_timeout = 30
* Maximum time (in seconds) to wait before sending data to master times out

receive_timeout = 30
* Maximum time (in seconds) to wait before receiving data from master times
  out

squash_threshold = <positive integer>
* Advanced setting.  Periodically the indexer must report to license manager
  the data indexed broken down by source, sourcetype, host, and index.  If
  the number of distinct (source,sourcetype,host,index) tuples grows over
  the squash_threshold, we squash the {host,source} values and only report a
  breakdown by {sourcetype,index}.  This is to prevent explosions in
  memory + license_usage.log lines.  Set this only after consulting a Splunk
  Support engineer.
* Default: 2000

report_interval = <nonnegative integer>[s|m|h]
* Selects a time period for reporting in license usage to the license
  master.
* This value is intended for very large deployments (hundreds of indexers)
  where a large number of indexers may overwhelm the license server.
* The maximum permitted interval is 1 hour, and the minimum permitted
  interval is 1 minute.
* May be expressed as a positive number of seconds, minutes or hours.
* If no time unit is provided, seconds will be assumed.
* Defaults to 1 minute, or 1m.

strict_pool_quota = <boolean>
* Toggles strict pool quota enforcement
* If set to true, members of pools will receive warnings for a given day if
  usage exceeds pool size regardless of whether overall stack quota was
  exceeded
* If set to false, members of pool will only receive warnings if both pool
  usage exceeds pool size AND overall stack usage exceeds stack size
* Defaults to true

pool_suggestion = <string>
* Defaults to empty, which means this feature is disabled
* Suggest a pool to the master for this slave.
* The master will use this suggestion if the master doesn't have an explicit
  rule mapping the slave to a given pool (ie...no slave list for the
  relevant license stack contains this slave explictly)
* If the pool name doesn't match any existing pool, it will be ignored, no
  error will be generated
* This setting is intended to give an alternative management option for
  pool/slave mappings.  When onboarding an indexer, it may be easier to
  manage the mapping on the indexer itself via this setting rather than
  having to update server.conf on master for every addition of new indexer
* NOTE: If you have multiple stacks and a slave maps to multiple pools, this
        feature is limitted in only allowing a suggestion of a single pool;
        This is not a common scenario however.

[lmpool:auto_generated_pool_forwarder]
* This is the auto generated pool for the forwarder stack

description = <textual description of this license pool>
quota = MAX|<maximum amount allowed by this license>
* MAX indicates the total capacity of the license. You may have only 1 pool
  with MAX size in a stack
* The quota can also be specified as a specific size eg. 20MB, 1GB etc

slaves = *|<slave list>
* An asterix(*) indicates that any slave can connect to this pool
* You can also specifiy a comma separated slave guid list

stack_id = forwarder
* The stack to which this pool belongs

[lmpool:auto_generated_pool_free]
* This is the auto generated pool for the free stack
* Field descriptions are the same as that for
  the "lmpool:auto_generated_pool_forwarder"

[lmpool:auto_generated_pool_enterprise]
* This is the auto generated pool for the enterprise stack
* Field descriptions are the same as that for
  the "lmpool:auto_generated_pool_forwarder"


[lmpool:auto_generated_pool_fixed-sourcetype_<sha256 hash of srctypes>]
* This is the auto generated pool for the enterprise fixed srctype stack
* Field descriptions are the same as that for
  the "lmpool:auto_generated_pool_forwarder"

[lmpool:auto_generated_pool_download_trial]
* This is the auto generated pool for the download trial stack
* Field descriptions are the same as that for
  the "lmpool:auto_generated_pool_forwarder"

############################################################################
#
# Search head pooling configuration
#
# Changes to a search head's pooling configuration must be made to:
#
#     $SPLUNK_HOME/etc/system/local/server.conf
#
# In other words, you may not deploy the [pooling] stanza via an app, either
# on local disk or on shared storage.
#
# This is because these values are read before the configuration system
# itself has been completely initialized. Take the value of "storage", for
# example.  This value cannot be placed within an app on shared storage
# because Splunk must use this value to find shared storage in the first
# place!
#
############################################################################

[pooling]

state = [enabled|disabled]
* Enables or disables search head pooling.
* Defaults to disabled.

storage = <path to shared storage>
* All members of a search head pool must have access to shared storage.
* Splunk will store configurations and search artifacts here.
* On *NIX, this should be an NFS mount.
* On Windows, this should be a UNC path to a Samba/CIFS share.

app_update_triggers = true|false|silent
* Should this search head run update triggers for apps modified by other
  search heads in the pool?
* For more information about update triggers specifically, see the
  [triggers] stanza in $SPLUNK_HOME/etc/system/README/app.conf.spec.
* If set to true, this search head will attempt to reload inputs, indexes,
  custom REST endpoints, etc. stored within apps that are installed,
  updated, enabled, or disabled by other search heads.
* If set to false, this search head will not run any update triggers. Note
  that this search head will still detect configuration changes and app
  state changes made by other search heads. It simply will not reload any
  components within Splunk that might care about those changes, like input
  processors or the HTTP server.
* Setting a value of "silent" is like setting a value of "true", with one
  difference: update triggers will never result in restart banner messages
  or restart warnings in the UI. Any need to restart will instead by
  signaled only by messages in splunkd.log.
* Defaults to true.

lock.timeout = <time range string>
* Timeout for acquiring file-based locks on configuration files.
* Splunk will wait up to this amount of time before aborting a configuration
  write.
* Defaults to '10s' (10 seconds).

lock.logging = true|false
* When acquiring a file-based lock, log information into the locked file.
* This information typically includes:
  * Which host is acquiring the lock
  * What that host intends to do while holding the lock
* There is no maximum filesize or rolling policy for this logging. If you
  enable this setting, you must periodically truncate the locked file
  yourself to prevent unbounded growth.
* The information logged to the locked file is intended for debugging
  purposes only. Splunk makes no guarantees regarding the contents of the
  file. It may, for example, write padding NULs to the file or truncate the
  file at any time.
* Defaults to false.

# The following two intervals interelate; the longest possible time for a
# state change to travel from one search pool member to the rest should be
# approximately the sum of these two timers.
poll.interval.rebuild = <time range string>
* Rebuild or refresh in-memory configuration data structures at most this
  often.
* Defaults to '1m' (1 minute).

poll.interval.check = <time range string>
* Check on-disk configuration files for changes at most this often.
* Defaults to '1m' (1 minute).

poll.blacklist.<name> = <regex>
* Do not check configuration files for changes if they match this regular
  expression.
* Example: Do not check vim swap files for changes -- .swp$


############################################################################
# High availability clustering configuration
############################################################################

[clustering]

mode = [master|slave|searchhead|disabled]
* Sets operational mode for this cluster node.
* Only one master may exist per cluster.
* Defaults to disabled.

master_uri = [<uri> | clustermaster:stanzaName1, clustermaster:stanzaName2]
* Only valid for mode=slave or searchhead
* URI of the cluster master that this slave or searchhead should connect to.
* An example of <uri>: <scheme>://<hostname>:<port>
* Only for mode=searchhead - If the searchhead is a part of multiple
  clusters, the master uris can be specified by a comma separated list.

advertised_disk_capacity = <integer>
* Acceptable value range is 10 to 100.
* Percentage to use when advertising disk capacity to the cluster master.
  This is useful for modifying weighted load balancing in indexer discovery.
* For example, if you set this attribute to 50 for an indexer with a 500GB disk,
  the indexer will advertise its disk size as 250GB, not 500GB.
* Defaults to 100.

pass4SymmKey = <password>
* Secret shared among the nodes in the cluster to prevent any
  arbitrary node from connecting to the cluster. If a slave or
  searchhead is not configured with the same secret as the master,
  it will not be able to communicate with the master.
* Not set by default.
* If it is not set in the clustering stanza, the key will be looked in the
  general stanza

service_interval = <positive integer>
* Only valid for mode=master
* Specifies, in seconds, how often the master runs its service
  loop. In its service loop, the master checks the state of the
  peers and the buckets in the cluster and also schedules
  corrective action, if possible, for buckets that are not in
  compliance with replication policies.
* Defaults to 1

cxn_timeout = <seconds>
* Lowlevel timeout for establishing connection between cluster nodes.
* Defaults to 60s.

send_timeout = <seconds>
* Lowlevel timeout for sending data between cluster nodes.
* Defaults to 60s.

rcv_timeout = <seconds>
* Lowlevel timeout for receiving data between cluster nodes.
* Defaults to 60s.

rep_cxn_timeout = <seconds>
* Lowlevel timeout for establishing connection for replicating data.
* Defaults to 5s.

rep_send_timeout = <seconds>
* Lowlevel timeout for sending replication slice data between cluster nodes.
* This is a soft timeout. When this timeout is triggered on source peer,
  it tries to determine if target is still alive. If it is still alive, it
  reset the timeout for another rep_send_timeout interval and continues.  If
  target has failed or cumulative timeout has exceeded rep_max_send_timeout,
  replication fails.
* Defaults to 5s.

rep_rcv_timeout = <seconds>
* Lowlevel timeout for receiving acknowledgement data from peers.
* This is a soft timeout. When this timeout is triggered on source peer,
  it tries to determine if target is still alive. If it is still alive,
  it reset the timeout for another rep_send_timeout interval and continues.
* If target has failed or cumulative timeout has exceeded
  rep_max_rcv_timeout, replication fails.
* Defaults to 10s.

search_files_retry_timeout = <seconds>
* Timeout after which request for search files from a peer is aborted.
* To make a bucket searchable, search specific files are copied from another
  source peer with search files. If search files on source peers are
  undergoing chances, it asks requesting peer to retry after some time. If
  cumulative retry period exceeds specified timeout, the requesting peer
  aborts the request and requests search files from another peer in the
  cluster that may have search files.
* Defaults to 600s.

rep_max_send_timeout = <seconds>
* Maximum send timeout for sending replication slice data between cluster
  nodes.
* On rep_send_timeout source peer determines if total send timeout has
  exceeded rep_max_send_timeout. If so, replication fails.
* If cumulative rep_send_timeout exceeds rep_max_send_timeout, replication
  fails.
* Defaults to 600s.

rep_max_rcv_timeout = <seconds>
* Maximum cumulative receive timeout for receiving acknowledgement data from
  peers.
* On rep_rcv_timeout source peer determines if total receive timeout has
  exceeded rep_max_rcv_timeout. If so, replication fails.
* Defaults to 600s.

multisite = [true|false]
* Turns on the multisite feature for this master.
* Make sure you set site parameters on the peers when you turn this to true.
* Defaults to false.

replication_factor = <positive integer>
* Only valid for mode=master.
* Determines how many copies of rawdata are created in the cluster.
* Use site_replication_factor instead of this in case multisite is turned
  on.
* Must be greater than 0.
* Defaults to 3

site_replication_factor = <comma-separated string>
* Only valid for mode=master and is only used if multisite is true.
* This specifies the per-site replication policy for any given
  bucket represented as a comma-separated list of per-site entries.
* Currently specified globally and applies to buckets in all
  indexes.
* Each entry is of the form <site-id>:<positive integer> which
  represents the number of copies to make in the specified site
* Valid site-ids include two mandatory keywords and optionally
  specific site-ids from site1 to site63
* The mandatory keywords are:
  - origin: Every bucket has a origin site which is the site of
  the peer that originally created this bucket. The notion of
  'origin' makes it possible to specify a policy that spans across
  multiple sites without having to enumerate it per-site.
  - total: The total number of copies we want for each bucket.
* When a site is the origin, it could potentially match both the
  origin and a specific site term. In that case, the max of the
  two is used as the count for that site.
* The total must be greater than or equal to sum of all the other
  counts (including origin).
* The difference between total and the sum of all the other counts
  is distributed across the remaining sites.
* Example 1: site_replication_factor = origin:2, total:3
  Given a cluster of 3 sites, all indexing data, every site has 2
  copies of every bucket ingested in that site and one rawdata
  copy is put in one of the other 2 sites.
* Example 2: site_replication_factor = origin:2, site3:1, total:3
  Given a cluster of 3 sites, 2 of them indexing data, every
  bucket has 2 copies in the origin site and one copy in site3. So
  site3 has one rawdata copy of buckets ingested in both site1 and
  site2 and those two sites have 2 copies of their own buckets.
* Defaults to origin:2, total:3

search_factor = <positive integer>
* Only valid for mode=master
* Determines how many buckets will have index structures pre-built.
* Must be less than or equal to replication_factor and greater than 0.
* Defaults to 2.

site_search_factor = <comma-separated string>
* Only valid for mode=master and is only used if multisite is true.
* This specifies the per-site policy for searchable copies for any
  given bucket represented as a comma-separated list of per-site
  entries.
* This is similar to site_replication_factor. Please see that
  entry for more information on the syntax.
* Defaults to origin:1, total:2

available_sites = <comma-separated string>
* Only valid for mode=master and is only used if multisite is true.
* This is a comma-separated list of all the sites in the cluster.
* Defaults to an empty string. So if multisite is turned on this needs
  to be explicitly set

heartbeat_timeout = <positive integer>
* Only valid for mode=master
* Determines when the master considers a slave down.  Once a slave
  is down, the master will initiate fixup steps to replicate
  buckets from the dead slave to its peers.
* Defaults to 60s.

access_logging_for_heartbeats = <bool>
* Only valid for mode=master
* Enables/disables logging to splunkd_access.log for peer heartbeats
* defaults to false (logging disabled)
* NOTE: you do not have to restart master to set this config parameter.
  Simply run the cli command on master:
    % splunk edit cluster-config -access_logging_for_heartbeats <true|false>


restart_timeout = <positive integer>
* Only valid for mode=master
* This is the amount of time the master waits for a peer to come
  back when the peer is restarted (to avoid the overhead of
  trying to fixup the buckets that were on the peer).
* Note that this only works with the offline command or if the peer
  is restarted vi the UI.
* Defaults to 60s.

quiet_period = <positive integer>
* Only valid for mode=master
* This determines the amount of time for which the master is quiet
  right after it starts. During this period the master does not
  initiate any action but is instead waiting for the slaves to
  register themselves. At the end of this time period, it builds
  its view of the cluster based on the registered information and
  starts normal processing.
* Defaults to 60s.

generation_poll_interval = <positive integer>
* Only valid if mode=master or mode=searchhead
* Determines how often the searchhead polls the master for generation
  information.
* Defaults to 60s.

max_peer_build_load = <integer>
* This is the maximum number of concurrent tasks to make buckets
  searchable that can be assigned to a peer.
* Defaults to 2.

max_peer_rep_load = <integer>
* This is the maximum number of concurrent non-streaming
  replications that a peer can take part in as a target.
* Defaults to 5.

max_peer_sum_rep_load = <integer>
* This is the maximum number of concurrent summary replications
  that a peer can take part in as either a target or source.
* Defaults to 5.

max_replication_errors = <integer>
* Currently only valid for mode=slave
* This is the maximum number of consecutive replication errors
  (currently only for hot bucket replication) from a source peer
  to a specific target peer. Until this limit is reached, the
  source continues to roll hot buckets on streaming failures to
  this target. After the limit is reached, the source will no
  longer roll hot buckets if streaming to this specific target
  fails. This is reset if at least one successful (hot bucket)
  replication occurs to this target from this source.
* Defaults to 3.
* The special value of 0 turns off this safeguard; so the source
  always rolls hot buckets on streaming error to any target.

searchable_targets = true|false
* Only valid for mode=master
* Tells the master to make some replication targets searchable
  even while the replication is going on. This only affects
  hot bucket replication for now.
* Defaults to true

searchable_target_sync_timeout = <integer>
* Only valid for mode=slave
* If a hot bucket replication connection is inactive for this time
  (in seconds), a searchable target flushes out any pending search
  related in-memory files.
* Note that regular syncing - when the data is flowing through
  regularly and the connection is not inactive - happens at a
  faster rate (default of 5 secs controlled by
  streamingTargetTsidxSyncPeriodMsec in indexes.conf).
* The special value of 0 turns off this timeout behaviour.
* Defaults to 60 (seconds)

target_wait_time = <positive integer>
* Only valid for mode=master.
* Specifies the time that the master waits for the target of a replication
  to register itself before it services the bucket again and potentially
  schedules another fixup.
* Defaults to 150s

summary_wait_time = <positive integer>
* Only valid for mode=master and summary_replication=true.
* Specifies the time that the master waits before scheduling fixups for a
  newly 'done' summary that transitioned from 'hot_done'. This allows for
  other copies of the 'hot_done' summary to also make their transition into
  'done', avoiding unnecessary replications.
* Defaults to 660s

commit_retry_time = <positive integer>
* Only valid for mode=master
* Specifies the interval after which, if the last generation commit failed,
  the master forces a retry. A retry is usually automatically kicked off
  after the appropriate events. This is just a backup to make sure that the
  master does retry no matter what.
* Defaults to 300s

percent_peers_to_restart = <integer between 0-100>
* Suggested percentage of maximum peers to restart for rolling-restart.
* Actual percentage may vary due to lack of granularity for smaller peer
  sets.
* Regardless of setting, a minimum of 1 peer will be restarted per round

auto_rebalance_primaries = <bool>
* Only valid for mode=master
* Specifies if the master should automatically rebalance bucket
  primaries on certain triggers. Currently the only defined
  trigger is when a peer registers with the master. When a peer
  registers, the master redistributes the bucket primaries so the
  cluster can make use of any copies in the incoming peer.
* Defaults to true.

idle_connections_pool_size = <int>
* Only valid for mode=master
* Specifies how many idle http(s) connections we should keep alive to reuse.
  Reusing connections improves the time it takes to send messages to peers
  in the cluster.
* -1 (default) corresponds to "auto", letting the master determine the
  number of connections to keep around based on the number of peers in the
  cluster.

use_batch_mask_changes = <bool>
* Only valid for mode=master
* Specifies if the master should process bucket mask changes in
  batch or inidividually one by one.
* Defaults to true.
* Set to false when there are 6.1 peers in the cluster for backwards compatibility.

service_jobs_msec = <positive integer>
* Only valid for mode=master
* Max time in milliseconds cluster master spends in servicing finished jobs
  per service call. Increase this if metrics.log has very high current_size
  values.
* Defaults to 100ms.

summary_replication = true|false
* Only valid for mode=master.
* Turns on or off summary replication.
* Defaults to false.

register_replication_address = <IP address, or fully qualified machine/domain name>
* Only valid for mode=slave
* This is the address on which a slave will be available for accepting
  replication data. This is useful in the cases where a slave host machine
  has multiple interfaces and only one of them can be reached by another
  splunkd instance

register_forwarder_address = <IP address, or fully qualified machine/domain name>
* Only valid for mode=slave
* This is the address on which a slave will be available for accepting
  data from forwarder.This is useful in the cases where a splunk host
  machine has multiple interfaces and only one of them can be reached by
  another splunkd instance.

register_search_address = <IP address, or fully qualified machine/domain name>
* Only valid for mode=slave
* This is the address on which a slave will be available as search head.
  This is useful in the cases where a splunk host machine has multiple
  interfaces and only one of them can be reached by another splunkd
  instance.

executor_workers = <positive integer>
* Only valid if mode=master or mode=slave
* Number of threads that can be used by the clustering threadpool.
* Defaults to 10. A value of 0 will default to 1.

heartbeat_period = <non-zero positive integer>
* Only valid for mode=slave
* Controls the frequency the slave attempts to send heartbeats

notify_scan_period = <non-zero positive integer>
* Controls the frequency that the indexer scans summary folders for summary updates.
* Only used when summary_replication is enabled on the Master.
* Defaults to 10 seconds.

enableS2SHeartbeat = true|false
* Only valid for mode=slave
* Splunk will monitor each replication connection for presence of heartbeat,
  and if the heartbeat is not seen for s2sHeartbeatTimeout seconds, it will
  close the connection.
* Defaults to true.

s2sHeartbeatTimeout = <seconds>
* This specifies the global timeout value for monitoring heartbeats on
  replication connections.
* Splunk will will close a replication connection if heartbeat is not seen
  for s2sHeartbeatTimeout seconds.
* Defaults to 600 seconds (10 minutes). Replication source sends heartbeat
  every 30 second.

throwOnBucketBuildReadError = true|false
* Valid only for mode=slave
* If set to true, index clustering slave throws an exception if it encounters journal read error
  while building the bucket for a new searchable copy. It also throws all the search & other
  files generated so far in this particular bucket build.
* If set to false, index clustering slave just logs the error and preserves all the search & other
  files generated so far & finalizes them as it cannot proceed further with this bucket.
* Defaults to false

cluster_label = <string>
* This specifies the label of the indexer cluster

[clustermaster:stanza1]
* Only valid for mode=searchhead when the searchhead is a part of multiple
  clusters.

master_uri = <uri>
* Only valid for mode=searchhead when present in this stanza.
* URI of the cluster master that this searchhead should connect to.

pass4SymmKey = <password>
* Secret shared among the nodes in the cluster to prevent any
  arbitrary node from connecting to the cluster. If a searchhead
  is not configured with the same secret as the master,
  it will not be able to communicate with the master.
* Not set by default.
* If it is not present here, the key in the clustering stanza will be used.
  If it is not present in the clustering stanza, the value in the general
  stanza will be used.

site = <site-id>
* Specifies the site this searchhead belongs to for this particular master
  when multisite is enabled (see below).
* Valid values for site-id include site1 to site63.

multisite = [true|false]
* Turns on the multisite feature for this master_uri for the searchhead.
* Make sure the master has the multisite feature turned on.
* Make sure you specify the site in case this is set to true. If no
  configuration is found in the clustermaster stanza, we default to any
  value for site that might be defined in the [general]
  stanza.
* Defaults to false.

[replication_port://<port>]
# Configure Splunk to listen on a given TCP port for replicated data from
# another cluster member.
# If mode=slave is set in the [clustering] stanza at least one
# replication_port must be configured and not disabled.

disabled = true|false
* Set to true to disable this replication port stanza.
* Defaults to false.

listenOnIPv6 = no|yes|only
* Toggle whether this listening port will listen on IPv4, IPv6, or both.
* If not present, the setting in the [general] stanza will be used.

acceptFrom = <network_acl> ...
* Lists a set of networks or addresses to accept connections from.  These
  rules are separated by commas or spaces
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
* Defaults to "*" (accept replication data from anywhere)

[replication_port-ssl://<port>]
* This configuration is same as replication_port stanza above but uses SSL.

disabled = true|false
* Set to true to disable this replication port stanza.
* Defaults to false.

listenOnIPv6 = no|yes|only
* Toggle whether this listening port will listen on IPv4, IPv6, or both.
* If not present, the setting in the [general] stanza will be used.

acceptFrom = <network_acl> ...
* This setting is same as setting in replication_port stanza defined above.

serverCert = <path>
* Full path to file containing private key and server certificate.
* There is no default value.

password = <password>
* Server certificate password, if any.
* There is no default value.

rootCA = <path>
* DEPRECATED; use server.conf/[sslConfig]/sslRootCAPath instead.
* Used only when 'sslRootCAPath' is unset.
* Full path to the root CA (Certificate Authority) certificate store.
* The <path> must refer to a PEM format file containing one or more root CA
  certificates concatenated together.
* Default is unset.

cipherSuite = <cipher suite string>
* If set, uses the specified cipher string for the SSL connection.
* If not set, uses the default cipher string.
* provided by OpenSSL.  This is used to ensure that the server does not
  accept connections using weak encryption protocols.
* Must specify 'dhFile' to enable any Diffie-Hellman ciphers.

sslVersions = <versions_list>
* Comma-separated list of SSL versions to support.
* The versions available are "ssl3", "tls1.0", "tls1.1", and "tls1.2".
* The special version "*" selects all supported versions.  The version "tls"
  selects all versions tls1.0 or newer.
* If a version is prefixed with "-" it is removed from the list.
* SSLv2 is always disabled; "-ssl2" is accepted in the version list but does nothing.
* When configured in FIPS mode, ssl3 is always disabled regardless
  of this configuration.
* Defaults to "*,-ssl2" (anything newer than SSLv2).

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

supportSSLV3Only = true|false
* DEPRECATED.  SSLv2 is now always disabled.  The exact set of
  SSL versions allowed is now configurable via the "sslVersions" setting
  above

compressed = true|false
* If true, it enables compression on SSL.
* Default is true.

requireClientCert = true|false
* Requires that any peer that connects to replication port has a certificate
  that can be validated by certificate authority specified in rootCA.
* Default is false.

allowSslRenegotiation = true|false
* In the SSL protocol, a client may request renegotiation of the connection
  settings from time to time.
* Setting this to false causes the server to reject all renegotiation
  attempts, breaking the connection.  This limits the amount of CPU a
  single TCP connection can use, but it can cause connectivity problems
  especially for long-lived connections.
* Defaults to true.

sslCommonNameToCheck = <commonName1>, <commonName2>, ...
* Optional. Defaults to no common name checking.
* Check the common name of the client's certificate against this list of names.
* requireClientCert must be set to true for this setting to work.

sslAltNameToCheck =  <alternateName1>, <alternateName2>, ...
* Optional. Defaults to no alternate name checking.
* Check the alternate name of the client's certificate against this list of names.
* If there is no match, assume that Splunk is not authenticated against this
  server.
* requireClientCert must be set to true for this setting to work.

############################################################################
# Introspection settings
############################################################################

[introspection:generator:disk_objects]
* For 'introspection_generator_addon', packaged with Splunk; provides the
  data ("i-data") consumed, and reported on, by 'introspection_viewer_app'
  (due to ship with a future release).
* This stanza controls the collection of i-data about: indexes; bucket
  superdirectories (homePath, coldPath, ...); volumes; search dispatch
  artifacts.
* On universal forwaders the collection of index, volumes and dispatch disk
  objects is disabled unless explicitly enabled in following stanzas:
     * introspection:generator:disk_objects__indexes
     * introspection:generator:disk_objects__volumes
     * introspection:generator:disk_objects__dispatch

acquireExtra_i_data = true | false
* If true, extra Disk Objects i-data is emitted; you can gain more insight
  into your site, but at the cost of greater resource consumption both
  directly (the collection itself) and indirectly (increased disk and
  bandwidth utilization, to store the produced i-data).
* Please consult documentation for list of regularly emitted Disk Objects
  i-data, and extra Disk Objects i-data, appropriate to your release.
* Defaults to: false.

collectionPeriodInSecs = <positive integer>
* Controls frequency of Disk Objects i-data collection; higher frequency
  (hence, smaller period) gives a more accurate picture, but at the cost of
  greater resource consumption both directly (the collection itself) and
  indirectly (increased disk and bandwidth utilization, to store the
  produced i-data).
* Defaults to: 600 (10 minutes).

[introspection:generator:disk_objects__indexes]
  * This stanza controls the collection of i-data about indexes.
  * Inherits the values of 'acquireExtra_i_data' and 'collectionPeriodInSecs'
    attributes from the 'introspection:generator:disk_objects' stanza, but
    may be enabled/disabled independently of it.
  * This stanza should only be used to force collection of i-data about 
    indexes on dedicated forwarders.
  * By default this data collection is disabled on universal forwarders and 
    enabled on all other installations.

[introspection:generator:disk_objects__volumes]
  * This stanza controls the collection of i-data about volumes.
  * Inherits the values of 'acquireExtra_i_data' and 'collectionPeriodInSecs'
    attributes from the 'introspection:generator:disk_objects' stanza, but
    may be enabled/disabled independently of it.
  * This stanza should only be used to force collection of i-data about 
    volumes on dedicated forwarders.
  * By default this data collection is disabled on universal forwarders and 
    enabled on all other installations.

[introspection:generator:disk_objects__dispatch]
  * This stanza controls the collection of i-data about search dispatch artifacts.
  * Inherits the values of 'acquireExtra_i_data' and 'collectionPeriodInSecs' 
    attributes from the 'introspection:generator:disk_objects' stanza, but 
    may be enabled/disabled independently of it.
  * This stanza should only be used to force collection of i-data about 
    search dispatch artifacts on dedicated forwarders.
  * By default this data collection is disabled on universal forwarders and 
    enabled on all other installations.

[introspection:generator:disk_objects__fishbucket]
* This stanza controls the collection of i-data about:
  $SPLUNK_DB/fishbucket, where we persist per-input status of file-based
  inputs.
* Inherits the values of 'acquireExtra_i_data' and 'collectionPeriodInSecs'
  attributes from the 'introspection:generator:disk_objects' stanza, but may
  be enabled/disabled independently of it.

[introspection:generator:disk_objects__bundle_replication]
* This stanza controls the collection of i-data about:
  bundle replication metrics of distributed search
* Inherits the values of 'acquireExtra_i_data' and 'collectionPeriodInSecs'
  attributes from the 'introspection:generator:disk_objects' stanza, but may
  be enabled/disabled independently of it.

[introspection:generator:disk_objects__partitions]
* This stanza controls the collection of i-data about: disk partition space
  utilization.
* Inherits the values of 'acquireExtra_i_data' and 'collectionPeriodInSecs'
  attributes from the 'introspection:generator:disk_objects' stanza, but may
  be enabled/disabled independently of it.

[introspection:generator:disk_objects__summaries]
* Introspection data about summary disk space usage. Summary disk usage 
  includes both data model and report summaries. The usage is collected
  per summaryId, locally at each indexer.

disabled = true | false
* If not specified, inherits the value from
  'introspection:generator:disk_objects' stanza.

collectionPeriodInSecs = <positive integer>
* Controls frequency of Disk Objects - summaries collection; higher frequency
  (hence, smaller period) gives a more accurate picture, but at the cost of
  greater resource consumption directly (the summaries collection itself);
  it is not recommended for a period less than 15 minutes.
* If you enable summary collection, the first collection happens 5 minutes
  after the Splunk instance is started. For every subsequent collection, this
  setting is honored.
* If 'collectionPeriodInSecs' smaller than 5 * 60, it will be set back to
  30 minutes internally.
* Set to (N*300) seconds. Any remainder is ignored.
* Defaults to: 1800 (30 minutes).

[introspection:generator:resource_usage]
* For 'introspection_generator_addon', packaged with Splunk; provides the
  data ("i-data") consumed, and reported on, by 'introspection_viewer_app'
  (due to ship with a future release).
* "Resource Usage" here refers to: CPU usage; scheduler overhead; main
  (physical) memory; virtual memory; pager overhead; swap; I/O; process
  creation (a.k.a. forking); file descriptors; TCP sockets; receive/transmit
  networking bandwidth.
* Resource Usage i-data is collected at both hostwide and per-process
  levels; the latter, only for processes associated with this SPLUNK_HOME.
* Per-process i-data for Splunk search processes will include additional,
  search-specific, information.

acquireExtra_i_data = true | false
* If true, extra Resource Usage i-data is emitted; you can gain more insight
  into your site, but at the cost of greater resource consumption both
  directly (the collection itself) and indirectly (increased disk and
  bandwidth utilization, to store the produced i-data).
* Please consult documentation for list of regularly emitted Resource Usage
  i-data, and extra Resource Usage i-data, appropriate to your release.
* Defaults to: false.

collectionPeriodInSecs = <positive integer>
* Controls frequency of Resource Usage i-data collection; higher frequency
  (hence, smaller period) gives a more accurate picture, but at the cost of
  greater resource consumption both directly (the collection itself) and
  indirectly (increased disk and bandwidth utilization, to store the
  produced i-data).
* Defaults to: 600 (10 minutes) on UFs, 10 (1/6th of a minute) on non-UFs.

[introspection:generator:resource_usage__iostats]
* This stanza controls the collection of i-data about: IO Statistics data
* "IO Statistics" here refers to: read/write requests; read/write sizes; 
  io service time; cpu usage during service 
* IO Statistics i-data is sampled over the collectionPeriodInSecs
* Does not inherit the value of the 'collectionPeriodInSecs' attribute from the 
  'introspection:generator:resource_usage' stanza, and may be enabled/disabled 
  independently of it.

collectionPeriodInSecs = <positive integer>
* Controls interval of IO Statistics i-data collection; higher intervals
  gives a more accurate picture, but at the cost of greater resource consumption 
  both directly (the collection itself) and indirectly (increased disk and 
  bandwidth utilization, to store the produced i-data).
* Defaults to: 60 (1 minute)

[introspection:generator:kvstore]
* For 'introspection_generator_addon', packaged with Splunk
* "KV Store" here refers to: statistics information about KV Store process.

serverStatsCollectionPeriodInSecs = <positive integer>
* Controls frequency of KV Store server status collection
* Defaults to: 27 seconds.

collectionStatsCollectionPeriodInSecs = <positive integer>
* Controls frequency of KV Store db statistics collection
* Defaults to: 600 seconds.

profilingStatsCollectionPeriodInSecs = <positive integer>
* Controls frequency of KV Store profiling data collection
* Defaults to: 5 seconds

rsStatsCollectionPeriodInSecs = <positive integer>
* Controls frequency of KV Store replica set stats collectiok
* Defaults to: 60 seconds

############################################################################
# Settings used to control commands started by Splunk
############################################################################

[commands:user_configurable]

prefix = <path>
* All non-internal commands started by splunkd will be prefixed with this
  string, allowing for "jailed" command execution.
* Should be only one word.  In other words, commands are supported, but
  commands and arguments are not.
* Applies to commands such as: search scripts, scripted inputs, SSL
  certificate generation scripts.  (Any commands that are
  user-configurable).
* Does not apply to trusted/non-configurable command executions, such as:
  splunk search, splunk-optimize, gunzip.
* Default is empty (no prefix).

############################################################################
# search head clustering configuration
############################################################################

[shclustering]
disabled = true|false
* Disables or enables search head clustering on this instance.
* Defaults to true; that is, disabled.
* When enabled, the captain needs to be selected via a
  bootstrap mechanism. Once bootstrapped, further captain
  selections are made via a dynamic election mechanism.
* When enabled, you will also need to specify the cluster member's own server
  address / management uri for identification purpose. This can be
  done in 2 ways: by specifying the mgmt_uri attribute individually on
  each member or by specifying pairs of 'GUID, mgmt-uri' strings in the
  servers_list attribute.

mgmt_uri = [ mgmt-URI ]
* The management uri is used to identify the cluster member's own address to
  itself.
* Either mgmt_uri or servers_list is necessary.
* mgmt_uri is simpler to author but is unique for each member.
* servers_list is more involved, but can be copied as a config string to
  all members in the cluster.

servers_list = [ <(GUID, mgmt-uri);>+ ]
* A semicolon separated list of instance GUIDs and management URIs.
* Each member will use its GUID to identify its own management URI.

adhoc_searchhead = <bool>
* This setting configures a member as an adhoc searchhead; i.e., the member
  will not run any scheduled jobs.
* Use the setting captain_is_adhoc_searchhead to reduce compute load on the
  captain.
* Defaults to false.

no_artifact_replications = <bool>
* prevent this Search Head Cluster member to be selected as a target for replications.
* This is an advanced setting, and not to be changed without proper understanding of the implications.
* Defaults to false

captain_is_adhoc_searchhead = <bool>
* This setting prohibits the captain from running scheduled jobs. Captain
  will be dedicated to controlling the activities of the cluster, but can
  also run adhoc search jobs from clients.
* Defaults to false.

replication_factor = <positive integer>
* Determines how many copies of search artifacts are created in the cluster.
* This must be set to the same value on all members.
* Defaults to 3.

pass4SymmKey = <password>
* Secret shared among the members in the search head cluster to prevent any
  arbitrary instance from connecting to the cluster.
* All members must use the same value.
* If set in the [shclustering] stanza, it takes precedence over any setting
  in the [general] stanza.
* Defaults to 'changeme' from the [general] stanza in the default
  server.conf.

async_replicate_on_proxy = <bool>
* If the jobs/${sid}/results REST endpoint had to be proxied to a different
  member due to missing local replica, this attribute will automatically
  schedule an async replication to that member when set to true.
* Default is true.

master_dump_service_periods = <int>
* If SHPMaster info is switched on in log.cfg, then captain statistics will
  be dumped in splunkd.log after the specified number of service periods.
  Purely a debugging aid.
* Default is 500.

long_running_jobs_poll_period = <int>
* Long running delegated jobs will be polled by the captain every
  "long_running_jobs_poll_period" seconds to ascertain whether they are
  still running, in order to account for potential node/member failure.
* Default is 600, i.e. 10 minutes

scheduling_heuristic = <string>
* This setting configures the job distribution heuristic on the captain.
* There are currently two supported strategies: 'round_robin' or
  'scheduler_load_based'.
* Default is 'scheduler_load_based'.

id = <GUID>
* Unique identifier for this cluster as a whole, shared across all cluster
  members.
* By default, Splunk will arrange for a unique value to be generated and
  shared across all members.

cxn_timeout = <seconds>
* Low-level timeout for establishing connection between cluster members.
* Defaults to 60s.

send_timeout = <seconds>
* Low-level timeout for sending data between search head cluster members.
* Defaults to 60s.

rcv_timeout = <seconds>
* Low-level timeout for receiving data between search head cluster members.
* Defaults to 60s.

cxn_timeout_raft = <seconds>
* Low-level timeout for establishing connection between search head cluster
  members for the raft protocol.
* Defaults to 2s.

send_timeout_raft = <seconds>
* Low-level timeout for sending data between search head cluster members for
  the raft protocol.
* Defaults to 5s.

rcv_timeout_raft = <seconds>
* Low-level timeout for receiving data between search head cluster members
  for the raft protocol.
* Defaults to 5s.


rep_cxn_timeout = <seconds>
* Low-level timeout for establishing connection for replicating data.
* Defaults to 5s.

rep_send_timeout = <seconds>
* Low-level timeout for sending replication slice data between cluster
  members.
* This is a soft timeout. When this timeout is triggered on source peer,
  it tries to determine if target is still alive. If it is still alive,
  it reset the timeout for another rep_send_timeout interval and continues.
  If target has failed or cumulative timeout has exceeded
  rep_max_send_timeout, replication fails.
* Defaults to 5s.

rep_rcv_timeout = <seconds>
* Low-level timeout for receiving acknowledgement data from members.
* This is a soft timeout. When this timeout is triggered on source member,
  it tries to determine if target is still alive. If it is still alive,
  it reset the timeout for another rep_send_timeout interval and continues.
  If target has failed or cumulative timeout has exceeded
  rep_max_rcv_timeout, replication fails.
* Defaults to 10s.

rep_max_send_timeout = <seconds>
* Maximum send timeout for sending replication slice data between cluster
  members.
* On rep_send_timeout source peer determines if total send timeout has
  exceeded rep_max_send_timeout. If so, replication fails.
* If cumulative rep_send_timeout exceeds rep_max_send_timeout, replication
  fails.
* Defaults to 600s.

rep_max_rcv_timeout = <seconds>
* Maximum cumulative receive timeout for receiving acknowledgement data from
  members.
* On rep_rcv_timeout source member determines if total receive timeout has
  exceeded rep_max_rcv_timeout. If so, replication fails.
* Defaults to 600s.

log_heartbeat_append_entries = <bool>
* If true, Splunk will log the the low-level heartbeats between members in
  splunkd_access.log  . These heartbeats are used to maintain the authority
  of the captain authority over other members.
* Defaults to false.

election_timeout_ms = <positive_integer>
* The amount of time that a member will wait before trying to become the
  captain.
* Half of this value is the heartbeat period.
* A very low value of election_timeout_ms can lead to unnecessary captain
  elections.
* The default is 60000ms, or 1 minute.

election_timeout_2_hb_ratio = <positive_integer>
* The ratio between the election timeout and the heartbeat time.
* A typical ratio between 5 - 20 is desirable. Default is 12 to keep the
  heartbeat time at 5s.
* This ratio determines the number of heartbeat attempts that would fail
  before a member starts to timeout and tries to become the captain.

heartbeat_timeout = <positive integer>
* Determines when the captain considers a member down. Once a member
  is down, the captain will initiate fixup steps to replicate
  artifacts from the dead member to its peers.
* Defaults to 60s.

access_logging_for_heartbeats = <bool>
* Only valid on captain
* Enables/disables logging to splunkd_access.log for member heartbeats
* Defaults to false (logging disabled)
* NOTE: you do not have to restart captain to set this config parameter.
  Simply run the cli command on master:

  % splunk edit shcluster-config -access_logging_for_heartbeats <true|false>

restart_timeout = <positive integer>
* This is the amount of time the captain waits for a member to come
  back when the instance is restarted (to avoid the overhead of
  trying to fixup the artifacts that were on the peer).

quiet_period = <positive integer>
* This determines the amount of time for which a newly elected
  captain waits for members to join. During this period the
  captain does not initiate any fixups but instead waits for the
  members to register themselves. Job scheduling and conf
  replication still happen as usual during this time. At the end
  of this time period, the captain builds its view of the cluster
  based on the registered peers and starts normal
  processing.
* Defaults to 60s.

max_peer_rep_load = <integer>
* This is the maximum number of concurrent replications that a
  member can take part in as a target.
* Defaults to 5.

target_wait_time = <positive integer>
* Specifies the time that the captain waits for the target of a replication
  to register itself before it services the artifact again and potentially
  schedules another fixup.
* Defaults to 150s.

percent_peers_to_restart = <integer between 0-100>
* The percentage of members to restart at one time during rolling restarts.
* Actual percentage may vary due to lack of granularity for smaller peer
  sets regardless of setting, a minimum of 1 peer will be restarted per
  round.
* Do not set this attribute to a value greater than 20%. Otherwise, issues
  can arise during the captain election process.

rolling_restart_with_captaincy_exchange = <bool>
* If this boolean is turned on, captain will try to exchange captaincy with another
* node during rolling restart
* Default = true
* if you change it to false, captain will restart and captaincy will transfer to 
* some other node

register_replication_address = <IP address, or fully qualified machine/domain name>
* This is the address on which a member will be available for accepting
  replication data. This is useful in the cases where a member host machine
  has multiple interfaces and only one of them can be reached by another
  splunkd instance.

executor_workers = <positive integer>
* Number of threads that can be used by the search head clustering
  threadpool.
* Defaults to 10. A value of 0 will be interpreted as 1.

heartbeat_period = <non-zero positive integer>
* Controls the frequency with which the member attempts to send heartbeats.

enableS2SHeartbeat = true|false
* Splunk will monitor each replication connection for presence of heartbeat.
  If the heartbeat is not seen for s2sHeartbeatTimeout seconds, it will
  close the connection.
* Defaults to true.

s2sHeartbeatTimeout = <seconds>
* This specifies the global timeout value for monitoring heartbeats on
  replication connections.
* Splunk will will close a replication connection if heartbeat is not seen
  for s2sHeartbeatTimeout seconds.
* Replication source sends heartbeat every 30 second.
* Defaults to 600 seconds (10 minutes).

captain_uri = [ static-captain-URI ]
* The management uri of static captain is used to identify the cluster captain for a static captain.
election = <bool>
* This is used to classify a cluster as static or dynamic (RAFT based). 
* election = false means static captain, which is used for DR situation.
* election = true means dynamic captain election enabled through RAFT protocol 
mode = <member>
* Accepted values are captain and member, mode is used to identify the function of a node in 
     static search head cluster. Setting mode as captain assumes it to function as both captain and a member.  
#proxying related
sid_proxying = <bool>
* Enable or disable search artifact proxying. Changing this will impact the
  proxying of search results, and jobs feed will not be cluster-aware.
* Only for internal/expert use.
* Defaults to true.

ss_proxying = <bool>
* Enable or disable saved search proxying to captain. Changing this will
  impact the behavior of Searches and Reports Page.
* Only for internal/expert use.
* Defaults to true.

ra_proxying = <bool>
* Enable or disable saved report acceleration summaries proxying to captain.
  Changing this will impact the behavior of report acceleration summaries
  page.
* Only for internal/expert use.
* Defaults to true.

alert_proxying = <bool>
* Enable or disable alerts proxying to captain. Changing this will impact
  the behavior of alerts, and essentially make them not cluster-aware.
* Only for internal/expert use.
* Defaults to true.

csv_journal_rows_per_hb = <int>
* Controls how many rows of CSV from the delta-journal are sent per hb 
* Used for both alerts and suppressions
* Do not alter this value without contacting splunk support.
* Defaults to 10000

conf_replication_period = <int>
* Controls how often a cluster member replicates configuration changes.
* A value of 0 disables automatic replication of configuration changes.

conf_replication_max_pull_count = <int>
* Controls the maximum number of configuration changes a member will
  replicate from the captain at one time.
* A value of 0 disables any size limits.
* Defaults to 1000.

conf_replication_max_push_count = <int>
* Controls the maximum number of configuration changes a member will
  replicate to the captain at one time.
* A value of 0 disables any size limits.
* Defaults to 100.

conf_replication_include.<conf_file_name> = <bool>
* Controls whether Splunk replicates changes to a particular type of *.conf
  file, along with any associated permissions in *.meta files.
* Defaults to false.

conf_replication_summary.whitelist.<name> = <whitelist_pattern>
* Whitelist files to be included in configuration replication summaries.

conf_replication_summary.blacklist.<name> = <blacklist_pattern>
* Blacklist files to be excluded from configuration replication summaries.

conf_replication_summary.concerning_file_size = <int>
* Any individual file within a configuration replication summary that is
  larger than this value (in MB) will trigger a splunkd.log warning message.
* Defaults to 50.

conf_replication_summary.period = <timespan>
* Controls how often configuration replication summaries are created.
* Defaults to '1m' (1 minute).

conf_replication_purge.eligibile_count = <int>
* Controls how many configuration changes must be present before any become
  eligible for purging.
* In other words: controls the minimum number of configuration changes
  Splunk will remember for replication purposes.
* Defaults to 20000.

conf_replication_purge.eligibile_age = <timespan>
* Controls how old a configuration change must be before it is eligible for
  purging.
* Defaults to '1d' (1 day).

conf_replication_purge.period = <timespan>
* Controls how often configuration changes are purged.
* Defaults to '1h' (1 hour).

conf_deploy_repository = <path>
* Full path to directory containing configurations to deploy to cluster
  members.

conf_deploy_staging = <path>
* Full path to directory where preprocessed configurations may be written
  before being deployed cluster members.

conf_deploy_concerning_file_size = <int>
* Any individual file within <conf_deploy_repository> that is larger than
  this value (in MB) will trigger a splunkd.log warning message.
* Defaults to: 50

conf_deploy_fetch_url = <URL>
* Specifies the location of the deployer from which members fetch the
  configuration bundle.
* This value must be set to a <URL> in order for the configuration bundle to
  be fetched.
* Defaults to empty.

conf_deploy_fetch_mode = auto|replace|none
* Controls configuration bundle fetching behavior when the member starts up.
* When set to "replace", a member checks for a new configuration bundle on
  every startup.
* When set to "none", a member does not fetch the configuration bundle on
  startup.
* Regarding "auto":
  * If no configuration bundle has yet been fetched, "auto" is equivalent
    to "replace".
  * If the configuration bundle has already been fetched, "auto" is
    equivalent to "none".
* Defaults to "replace".

artifact_status_fields = <field> ...
    * Give a comma separated fields to pick up values from status.csv and info.csv for each search artifacts.
    * These fields will be shows in cli/rest endpoint splunk list shcluster-member-artifacts
    * Default values user, app, label

encrypt_fields = <field> ...
    * These are the fields that need to be re-encrypted when Search Head Cluster 
      does its own first time run on syncing all members with a new splunk.secret key 
    * Give a comma separated fields as a triple elements <conf-file>:<stanza-prefix>:<key elem> 
    * Default values include storage/passwords, secret key for clustering/shclustering, server ssl config 
enable_jobs_data_lite = <bool> 
*This is for memory reduction on the captain for Search head clustering, leads to lower memory 
* in captain while slaves send the artifacts status.csv as a string. 
* Default : false

shcluster_label = <string>
* This specifies the label of the search head cluster


[replication_port://<port>]
# Configures the member to listen on a given TCP port for replicated data
# from another cluster member.
* At least one replication_port must be configured and not disabled.

disabled = true|false
* Set to true to disable this replication port stanza.
* Defaults to false.

listenOnIPv6 = no|yes|only
* Toggle whether this listening port will listen on IPv4, IPv6, or both.
* If not present, the setting in the [general] stanza will be used.

acceptFrom = <network_acl> ...
* Lists a set of networks or addresses to accept connections from. These
  rules are separated by commas or spaces.
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
* Defaults to "*" (accept replication data from anywhere)

[replication_port-ssl://<port>]
* This configuration is same as replication_port stanza above but uses SSL.

disabled = true|false
* Set to true to disable this replication port stanza.
* Defaults to false.

listenOnIPv6 = no|yes|only
* Toggle whether this listening port will listen on IPv4, IPv6, or both.
* If not present, the setting in the [general] stanza will be used.

acceptFrom = <network_acl> ...
* This setting is same as setting in replication_port stanza defined above.

serverCert = <path>
* Full path to file containing private key and server certificate.
* There is no default value.

password = <password>
* Server certificate password, if any.
* There is no default value.

rootCA = <string>
* DEPRECATED; use server.conf/[sslConfig]/sslRootCAPath instead.
* Used only when 'sslRootCAPath' is unset.
* The path to the file containing the SSL certificate for root certifying
  authority.
* The file may also contain root and intermediate certificates, if required.
* There is no default value.

cipherSuite = <cipher suite string>
* If set, uses the specified cipher string for the SSL connection.
* If not set, uses the default cipher string.
* provided by OpenSSL.  This is used to ensure that the server does not
  accept connections using weak encryption protocols.

supportSSLV3Only = true|false
* DEPRECATED.  SSLv2 is now always disabled.  The exact set of
  SSL versions allowed is now configurable via the "sslVersions" setting
  above

compressed = true|false
* If true, it enables compression on SSL.
* Default is true.

requireClientCert = true|false
* Requires that any peer that connects to replication port has a certificate
  that can be validated by certificate authority specified in rootCA.
* Default is false.

allowSslRenegotiation = true|false
* In the SSL protocol, a client may request renegotiation of the connection
  settings from time to time.
* Setting this to false causes the server to reject all renegotiation
  attempts, breaking the connection.  This limits the amount of CPU a
  single TCP connection can use, but it can cause connectivity problems
  especially for long-lived connections.
* Defaults to true.

############################################################################
# KV Store configuration
############################################################################
[kvstore]

disabled = true|false
* Set to true to disable the KV Store process on the current server. To
  completely disable KV Store in a deployment with search head clustering or
  search head pooling, you must also disable KV Store on each individual
  server.
* Defaults to false.

port = <port>
* Port to connect to the KV Store server.
* Defaults to 8191.

replicaset = <replset>
* Replicaset name.
* Defaults to splunkrs.

distributedLookupTimeout = <seconds>
* This setting has been removed, as it is no longer needed

shutdownTimeout = <seconds>
* Time in seconds to wait for a clean shutdown of the KV Store. If this time
  is reached after signaling for a shutdown, KV Store will be terminated
  forcibly.
* Defaults to 100 seconds.

initAttempts = <int>
* The maximum number of attempts to initialize the KV Store when starting
  splunkd.
* Defaults to 300.

replication_host = <host>
* The host name to access the KV Store.
* This setting has no effect on a single Splunk instance.
* When using search head clustering, if the "replication_host" value is not
  set in the [kvstore] stanza, the host you specify for
  "mgmt_uri" in the [shclustering] stanza is used for KV
  Store connection strings and replication.
* In search head pooling, this host value is a requirement for using KV
  Store.
* This is the address on which a kvstore will be available for accepting
  remotely.

verbose = true|false
* Set to true to enable verbose logging.
* Defaults to false.

verboseLevel = <nonnegative integer>
* When verbose logging is enabled specify verbose level for logging
  from 0 to 5, where 5 is the most verbose.
* Defaults to 2.

dbPath = <path>
* Path where KV Store data is stored.
* Changing this directory after initial startup does not move existing data.
  The contents of the directory should be manually moved to the new
  location.
* Defaults to $SPLUNK_DB/kvstore.

oplogSize = <int>
* The size of the replication operation log, in MB, for environments
  with search head clustering or search head pooling.
  In a standalone environment, 20% of this size is used.
* Defaults to 1000MB (1GB).
* Once the KV Store has created the oplog for the first time, changing this
  setting will NOT affect the size of the oplog. A full backup and restart
  of the KV Store will be required.
* Do not change this setting without first consulting with Splunk Support.

replicationWriteTimeout = <int>
* The time to wait, in seconds, for replication to complete while saving KV store
  operations. When the value is 0, the process never times out.
* Used for replication environments (search head clustering or search
  head pooling).
* Defaults to 1800 seconds (30 minutes).

caCertPath = <filepath>
* DEPRECATED; use [sslConfig]/sslRootCAPath instead.
* Used only when 'sslRootCAPath' is unset.
* Public key of the signing Certificate Authority (CA).
* If specified, it will be used in KV Store SSL connections and
  authentication.
* Only used when Common Criteria is enabled (SPLUNK_COMMON_CRITERIA=1)
  or FIPS is enabled (i.e. SPLUNK_FIPS=1).

sslKeysPath = <filepath>
* A certificate file signed by the signing authority specified above by
  caCertPath.
* In search head clustering or search head pooling, the certificates at
  different members must share the same ‘subject'.
* The Distinguished Name (DN) found in the certificate’s subject, must
  specify a non-empty value for at least one of the following attributes:
  Organization (O), the Organizational Unit (OU) or the
  Domain Component (DC).
* Only used when Common Criteria is enabled (SPLUNK_COMMON_CRITERIA=1)
  or FIPS is enabled (i.e. SPLUNK_FIPS=1).

sslKeysPassword = <password>
* Password of the private key in the file specified by sslKeysPath above.
* Must be specified if FIPS is enabled (i.e. SPLUNK_FIPS=1), otherwise, KV
  Store will not be available. There is no default value.
* Only used when Common Criteria is enabled (SPLUNK_COMMON_CRITERIA=1)
  or FIPS is enabled (i.e. SPLUNK_FIPS=1).

sslCRLPath = <filepath>
* Certificate Revocation List file.
* Optional. Defaults to no Revocation List.
* Only used when Common Criteria is enabled (SPLUNK_COMMON_CRITERIA=1)
  or FIPS is enabled (i.e. SPLUNK_FIPS=1).

modificationsReadIntervalMillisec = <int>
* Specifies how often, in milliseconds, to check for modifications to KV Store
  collections in order to replicate changes for distributed searches.
* Defaults to 1000.

modificationsMaxReadSec = <int>
* Maximum time interval KVStore can spend while checking for modifications
  before it produces collection dumps for distributed searches.
* Defaults to 30.

[indexer_discovery]
pass4SymmKey = <password>
* Security key shared between master node and forwarders.
* If specified here, the same value must also be specified on all forwarders
  connecting to this master.

polling_rate = <integer>
* A value between 1 to 10. This value affects the forwarder polling frequency to
  achieve the desired polling rate. The number of connected forwarders is also
  taken into consideration.
* The formula used to determine effective polling interval, in Milliseconds, is:
(number_of_forwarders/polling_rate + 30 seconds) * 1000
* Defaults to 10.

indexerWeightByDiskCapacity = <bool>
* If set to true, it instructs the forwarders to use weighted load balancing.
  In weighted load balancing, load balancing is based on the total disk capacity
  of the target indexers, with the forwarder streaming more data to indexers
  with larger disks.
*  The traffic sent to each indexer is based on the ratio of:
   indexer_disk_capacity/total_disk_capacity_of_indexers_combined
* Defaults to false.

############################################################################
# Raft Statemachine configuration
############################################################################
[raft_statemachine]

disabled = true|false
* Set to true to disable the raft statemachine.
* This feature require search head clustering to be enabled.
* Any consensus replication among search heads use this feature 
* Defaults to true.

replicate_search_peers = true|false
* Add/remove search-server request is applied on all members 
  of a search head cluster, when this value to set to true.
* Require a healty search head cluster with a captain.
