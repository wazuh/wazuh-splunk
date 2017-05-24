#   Version 6.4.0
#
# This file contains possible attributes and values you can use to configure
# Splunk's web interface.
#
# There is a web.conf in $SPLUNK_HOME/etc/system/default/.  To set custom
# configurations, place a web.conf in $SPLUNK_HOME/etc/system/local/.  For
# examples, see web.conf.example.  You must restart Splunk to enable
# configurations.
#
# To learn more about configuration files (including precedence) please see
# the documentation located at
# http://docs.splunk.com/Documentation/Splunk/latest/Admin/Aboutconfigurationfiles


[settings]
* Set general SplunkWeb configuration options under this stanza name.
* Follow this stanza name with any number of the following attribute/value
  pairs.
* If you do not specify an entry for each attribute, Splunk will use the
  default value.

startwebserver = [0 | 1]
* Set whether or not to start SplunkWeb.
* 0 disables SplunkWeb, 1 enables it.
* Defaults to 1.

httpport = <port_number>
* Must be present for SplunkWeb to start.
* If omitted or 0 the server will NOT start an http listener.
* If using SSL, set to the HTTPS port number.
* Defaults to 8000.

mgmtHostPort = <IP:port>
* Location of splunkd.
* Don't include http[s]:// -- just the IP address.
* Defaults to 127.0.0.1:8089.

appServerPorts = <one or more port numbers>
* Port number(s) for the python-based application server to listen on.
  This port is bound only on the loopback interface -- it is not
  exposed to the network at large.
* If set to "0", this will prevent the application server from
  being run from splunkd.  Instead, splunkweb will be started as
  a separate python-based service which directly listens to the
  'httpport'.  This is how Splunk 6.1.X and earlier behaved.
* Generally, you should only set one port number here.  For most
  deployments a single application server won't be a performance
  bottleneck.  However you can provide a comma-separated list of
  port numbers here and splunkd will start a load-balanced
  application server on each one.
* It is recommended that this be set to a non-zero value.  Setting
  this to "0" should only be done if you experience a compatibility
  problem.  The new separate application server configuration is faster
  and supports more configuration options.  Also, setting this to
  "0" may cause problems with new functionality, such as using the 
  Search Head Clustering feature.
  (see the [shclustering] stanza in server.conf)
* Defaults to 8065.

splunkdConnectionTimeout = <integer>
* Number of seconds to wait before timing out when communicating with
  splunkd
* Must be at least 30
* Values smaller than 30 will be ignored, resulting in the use of the
  default value
* Defaults to 30

enableSplunkWebSSL = [True | False]
* Toggle between http or https.
* Set to true to enable https and SSL.
* Defaults to False.

privKeyPath = <path>
* The path to the file containing the web server's SSL certificate's private
  key
* Relative paths are interpreted as relative to $SPLUNK_HOME
  * Relative paths may not refer outside of $SPLUNK_HOME (eg. no ../somewhere)
* An absolute path can also be specified to an external key
* See also enableSplunkWebSSL and caCertPath

caCertPath = <path>
* The path to the file containing the SSL certificate for the splunk web
  server
* The file may also contain root and intermediate certificates, if required
  They should be listed sequentially in the order:
    [ Server's SSL certificate ]
    [ One or more intermediate certificates, if required ]
    [ Root certificate, if required ]
* Relative paths are interpreted as relative to $SPLUNK_HOME
  * Relative paths may not refer outside of $SPLUNK_HOME (eg. no ../somewhere)
* An absolute path can also be specified to an external certificate
* See also enableSplunkWebSSL and privKeyPath

serviceFormPostURL = http://docs.splunk.com/Documentation/Splunk
* This attribute is deprecated since 5.0.3

userRegistrationURL = https://www.splunk.com/page/sign_up
updateCheckerBaseURL = http://quickdraw.Splunk.com/js/
docsCheckerBaseURL = http://quickdraw.splunk.com/help
* These are various Splunk.com urls that are configurable.
* Setting updateCheckerBaseURL to 0 will stop the SplunkWeb from pinging
  Splunk.com for new versions of itself.

enable_insecure_login = [True | False]
* Indicates if the GET-based /account/insecurelogin endpoint is enabled
* Provides an alternate GET-based authentication mechanism
* If True, the /account/insecurelogin?username=USERNAME&password=PASSWD is
  available
* If False, only the main /account/login endpoint is available
* Defaults to False

simple_error_page = [True | False]
   * If set to True a simplified error page will be displayed for errors (404, 500, etc.) only containing the status
   * If set to False a more verbose error page will be displayed containing homelink, message, more_results_link, crashes, referrer, debug output and byline
   * Defaults to False

login_content = <content_string>
* Add custom content to the login page
* Supports any text including html

sslVersions = <list of ssl versions string>
* Comma-separated list of SSL versions to support
* The versions available are "ssl3", "tls1.0", "tls1.1", and "tls1.2"
* The special version "*" selects all supported versions.  The version "tls"
  selects all versions tls1.0 or newer
* If a version is prefixed with "-" it is removed from the list
* SSLv2 is always disabled; "-ssl2" is accepted in the version list but does nothing
* When appServerPorts=0 only supported values are  "all", "ssl3, tls" 
  and "tls"
* When configured in FIPS mode ssl3 is always disabled regardless
  of this configuration
* Defaults to "ssl3, tls".  (anything newer than SSLv2)
* NOTE: this setting only takes effect when appServerPorts is set to a
  non-zero value

supportSSLV3Only = [True | False]
* When appServerPorts is set to a non-zero value (the default mode),
  this setting is DEPRECATED.  SSLv2 is now always disabled.
  The exact set of SSL versions allowed is now configurable via the
  "sslVersions" setting above.
* When appServerPorts is set to zero, this controls whether we disallow SSLv2
  connections.

cipherSuite = <cipher suite string>
* If set, uses the specified cipher string for the HTTP server.
* If not set, uses the default cipher string provided by OpenSSL.  This is
  used to ensure that the server does not accept connections using weak
  encryption protocols.
* Must specify 'dhFile' to enable any Diffie-Hellman ciphers.

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

dhFile = <path>
* The path to the Diffie-Hellman parameter file.
* Relative paths are interpreted as relative to $SPLUNK_HOME.
* Relative paths may not refer outside of $SPLUNK_HOME (eg. no ../somewhere).
* An absolute path can also be specified to an external key.
* Not set by default.

root_endpoint = <URI_prefix_string>
* Defines the root URI path on which the appserver will listen
* Default setting is '/'
* Ex: if you want to proxy the splunk UI at http://splunk:8000/splunkui,
  then set root_endpoint = /splunkui

static_endpoint = <URI_prefix_string>
* Path to static content
* The path here is automatically appended to root_endpoint defined above
* Default is /static

static_dir = <relative_filesystem_path>
* The directory that actually holds the static content
* This can be an absolute url if you want to put it elsewhere
* Default is share/splunk/search_mrsparkle/exposed

rss_endpoint = <URI_prefix_string>
* Path to static rss content
* The path here is automatically appended to root_endpoint defined above
* Default is /rss

embed_uri = <URI>
* Optional URI scheme/host/port prefix for embedded content
* This presents an optional strategy for exposing embedded shared
  content that does not require authentication in reverse proxy/SSO
  environment.
* Default is empty and will resolve to the client
  window.location.protocol + "//" + window.location.host

embed_footer = <html_string>
* chunk of html to define the footer for an embedded report.
* Defaults to "splunk>" but can be changed to whatever the user would like.

tools.staticdir.generate_indexes = [1 | 0]
* Indicates if the webserver will serve a directory listing for static
  directories
* Defaults to 0 (false)

template_dir = <relative_filesystem_path>
* Base path to mako templates
* Defaults to share/splunk/search_mrsparkle/templates

module_dir = <relative_filesystem_path>
* Base path to UI module assets
* Defaults to share/splunk/search_mrsparkle/modules

enable_gzip = [True | False]
* Determines if webserver applies gzip compression to responses
* Defaults to True

use_future_expires = [True | False]
* Determines if the Expires header of /static files is set to a far-future date
* Defaults to True

flash_major_version = <integer>
flash_minor_version = <integer>
flash_revision_version = <integer>
* Specifies the minimum Flash plugin version requirements
* Flash support, broken into three parts.
* We currently require a min baseline of Shockwave Flash 9.0 r124

override_JSON_MIME_type_with_text_plain = [True | False]
* Specifies whether or not to override the MIME type for JSON data served up
  by splunkweb endpoints with content-type="text/plain; charset=UTF-8"
* If True, splunkweb endpoints (other than proxy) that serve JSON data will
  serve as "text/plain; charset=UTF-8"
* If False, splunkweb endpoints that serve JSON data will serve as "application/json; charset=UTF-8"

enable_proxy_write = [True | False]
* Indicates if the /splunkd proxy endpoint allows POST operations
* If True, both GET and POST operations are proxied through to splunkd
* If False, only GET operations are proxied through to splunkd
* Setting this to False will prevent many client-side packages (such as the
  Splunk JavaScript SDK) from working correctly
* Defaults to True

js_logger_mode = [None | Firebug | Server]
* JavaScript Logger mode
* Available modes: None, Firebug, Server
* Mode None: Does not log anything
* Mode Firebug: Use firebug by default if it exists or defer to the older
  less promiscuous version of firebug lite
* Mode Server: Log to a defined server endpoint
* See js/logger.js Splunk.Logger.Mode for mode implementation details and if
  you would like to author your own
* Defaults to None

js_logger_mode_server_end_point = <URI_relative_path>
* Specifies the server endpoint to post javascript log messages
* Used when js_logger_mode = Server
* Defaults to util/log/js

js_logger_mode_server_poll_buffer = <integer>
* Specifieds the interval in milliseconds to check, post and cleanse the javascript log buffer
* Defaults to 1000

js_logger_mode_server_max_buffer = <integer>
* Specifies the maximum size threshold to post and cleanse the javascript log buffer
* Defaults to 100

ui_inactivity_timeout = <integer>
* Specifies the length of time lapsed (in minutes) for notification when
  there is no user interface clicking, mouseover, scrolling or resizing.
* Notifies client side pollers to stop, resulting in sessions expiring at
  the tools.sessions.timeout value.
* If less than 1, results in no timeout notification ever being triggered
  (Sessions will stay alive for as long as the browser is open).
* Defaults to 60 minutes

js_no_cache = [True | False]
* Toggle js cache control
* Defaults to False

cacheBytesLimit = <integer>
* When appServerPorts is set to a non-zero value, splunkd can keep a
  small cache of static assets in memory.  When the total size of the
  objects in cache grows larger than this, we begin the process of ageing
  entries out.
* Defaults to 4194304 (i.e. 4 Megabytes)
* If set to zero, this cache is completely disabled

cacheEntriesLimit = <integer>
* When appServerPorts is set to a non-zero value, splunkd can keep a
  small cache of static assets in memory.  When the number of the objects
  in cache grows larger than this, we begin the process of ageing
  entries out.
* Defaults to 16384
* If set to zero, this cache is completely disabled

staticCompressionLevel = <integer>
* When appServerPorts is set to a non-zero value, splunkd can keep a
  small cache of static assets in memory.  These are stored
  compressed and can usually be served directly to the web browser
  in compressed format.
* This level can be a number between 1 and 9.  Lower numbers use less
  CPU time to compress objects, but the resulting compressed objects
  will be larger.
* Defaults to 9.  Usually not much CPU time is spent compressing these
  objects so there is not much benefit to decreasing this.

enable_autocomplete_login = [True | False]
* Indicates if the main login page allows browsers to autocomplete the username
* If True, browsers may display an autocomplete drop down in the username field
* If False, browsers are instructed not to show autocomplete drop down in the username field
* Defaults to False

verifyCookiesWorkDuringLogin = [True | False]
* Normally, the login page will make an attempt to see if cookies work
  properly in the user's browser before allowing them to log in.  If
  this is set to False, this check is skipped.
* Defaults to True.  It is recommended that this be left on.
* NOTE: this setting only takes effect when appServerPorts is set to a
        non-zero value

minify_js = [True | False]
* Indicates whether the static JS files for modules are consolidated and minified
* Enabling improves client-side performance by reducing the number of HTTP
  requests and the size of HTTP responses

minify_css = [True | False]
* Indicates whether the static CSS files for modules are consolidated and
  minified
* Enabling improves client-side performance by reducing the number of HTTP
  requests and the size of HTTP responses
* Due to browser limitations, disabling this when using IE9 and earlier may
  result in display problems.

trap_module_exceptions = [True | False]
* Toggle whether the JS for individual modules is wrapped in a try/catch
* If True, syntax errors in individual modules will not cause the UI to
  hang, other than when using the module in question
* Set this to False when developing apps.

enable_pivot_adhoc_acceleration = [True | False]
* Toggle whether the pivot interface will use its own ad-hoc acceleration
  when a data model is not accelerated.
* If True, this ad-hoc acceleration will be used to make reporting in pivot
  faster and more responsive.
* In situations where data is not stored in time order or where the majority
  of events are far in the past, disabling this behavior can improve the
  pivot experience.
* DEPRECATED in version 6.1 and later, use pivot_adhoc_acceleration_mode
  instead

pivot_adhoc_acceleration_mode = [Elastic | AllTime | None]
* Specify the type of ad-hoc acceleration used by the pivot interface when a
  data model is not accelerated.
* If Elastic, the pivot interface will only accelerate the time range
  specified for reporting, and will dynamically adjust when this time range
  is changed.
* If AllTime, the pivot interface will accelerate the relevant data over all
  time.  This will make the interface more responsive to time-range changes
  but places a larger load on system resources.
* If None, the pivot interface will not use any acceleration.  This means
  any change to the report will require restarting the search.
* Defaults to Elastic

jschart_test_mode = [True | False]
* Toggle whether JSChart module runs in Test Mode
* If True, JSChart module attaches HTML classes to chart elements for
  introspection
* This will negatively impact performance, so should be disabled unless
  actively in use.

#
# JSChart data truncation configuration
# To avoid negatively impacting browser performance, the JSChart library
# places a limit on the number of points that will be plotted by an
# individual chart.  This limit can be configured here either across all
# browsers or specifically per-browser.  An empty or zero value will disable
# the limit entirely.
#

jschart_truncation_limit = <int>
* Cross-broswer truncation limit, if defined takes precedence over the
  browser-specific limits below

jschart_truncation_limit.chrome = <int>
* Chart truncation limit for Chrome only
* Defaults to 20000

jschart_truncation_limit.firefox = <int>
* Chart truncation limit for Firefox only
* Defaults to 20000

jschart_truncation_limit.safari = <int>
* Chart truncation limit for Safari only
* Defaults to 20000

jschart_truncation_limit.ie11 = <int>
* Chart truncation limit for Internet Explorer 11 only
* Defaults to 20000

jschart_truncation_limit.ie10 = <int>
* Chart truncation limit for Internet Explorer 10 only
* Defaults to 20000

jschart_truncation_limit.ie9 = <int>
* Chart truncation limit for Internet Explorer 9 only
* Defaults to 20000

jschart_truncation_limit.ie8 = <int>
* Chart truncation limit for Internet Explorer 8 only
* Defaults to 2000

jschart_truncation_limit.ie7 = <int>
* Chart truncation limit for Internet Explorer 7 only
* Defaults to 2000

max_view_cache_size = <integer>
* Specifies the maximum number of views to cache in the appserver.
* Defaults to 300.

pdfgen_is_available = [0 | 1]
* Specifies whether Integrated PDF Generation is available on this search
  head
* This is used to bypass an extra call to splunkd 
* Defaults to 1 on platforms where node is supported, defaults to 0
  otherwise

version_label_format = <printf_string>
* Internal config
* Used to override the version reported by the UI to *.splunk.com resources
* Defaults to: %s

auto_refresh_views = [0 | 1]
* Specifies whether the following actions cause the appserver to ask splunkd
  to reload views from disk.
  * Logging in via the UI
  * Switching apps
  * Clicking the Splunk logo
* Defaults to 0.

#
# Splunk bar options
#
# Internal config. May change without notice.
# Only takes effect if instanceType is 'cloud'.
#

showProductMenu = [True | False]
    * Used to indicate visibility of product menu.
    * Defaults to False.

productMenuUriPrefix = <string>
    * The domain product menu links to.
    * Required if showProductMenu is set to True.

productMenuLabel = <string>
    * Used to change the text label for product menu.
    * Defaults to 'My Splunk'.

showUserMenuProfile = [True | False]
    * Used to indicate visibility of 'Profile' link within user menu.
    * Defaults to False.


#
# Header options
#
x_frame_options_sameorigin = [True | False]
* adds a X-Frame-Options header set to "SAMEORIGIN" to every response served
* by cherrypy
* Defaults to True

#
# SSO
#

remoteUser = <http_header_string>
* Remote user HTTP header sent by the authenticating proxy server.
* This header should be set to the authenticated user.
* Defaults to 'REMOTE_USER'.
* Caution: There is a potential security concern regarding Splunk's
  treatment of HTTP headers.
* Your proxy provides the selected username as an HTTP header as specified
  above.
* If the browser or other http agent were to specify the value of this
  header, probably any proxy would overwrite it, or in the case that the
  username cannot be determined, refuse to pass along the request or set
  it blank.
* However, Splunk (cherrypy) will normalize headers containing the dash,
  and the underscore to the same value.  For example USER-NAME and
  USER_NAME will be treated as the same in SplunkWeb.
* This means that if the browser provides REMOTE-USER and splunk accepts
  REMOTE_USER, theoretically the browser could dictate the username.
* In practice, however, in all our testing, the proxy adds its headers
  last, which causes them to take precedence, making the problem moot.
* See also the 'remoteUserMatchExact' setting which can enforce more exact
  header matching when running with appServerPorts enabled.

remoteUserMatchExact = [0 | 1]
* IMPORTANT: this setting only takes effect when appServerPorts is set to a
  non-zero value
* When matching the remoteUser header, consider dashes and underscores
  distinct (so "Remote-User" and "Remote_User" will be considered different
  headers
* Defaults to "0" for compatibility with older versions of Splunk, but
  setting to "1" is a good idea when setting up SSO with appServerPorts
  enabled

SSOMode = [permissive | strict]
* Allows SSO to behave in either permissive or strict mode.
* Permissive: Requests to Splunk Web that originate from an untrusted IP
  address are redirected to a login page where they can log into Splunk
  without using SSO.
* Strict: All requests to splunkweb will be restricted to those originating
  from a trusted IP except those to endpoints not requiring authentication.
* Defaults to "strict"

trustedIP = <ip_address>
* Trusted IP.  This is the IP address of the authenticating proxy.
* Splunkweb verifies it is receiving data from the proxy host for all
  SSO requests.
* Uncomment and set to a valid IP address to enable SSO.
* Disabled by default.  Normal value is '127.0.0.1'
* If appServerPorts is set to a non-zero value, this setting can accept a
  richer set of configurations, using the same format as the "acceptFrom"
  setting.

allowSsoWithoutChangingServerConf = [0 | 1]
* IMPORTANT: this setting only takes effect when appServerPorts is set to a
  non-zero value
* Usually when configuring SSO, a trustedIP needs to be set both here
  in web.conf and also in server.conf.  If this is set to "1" then we will
  enable web-based SSO without a trustedIP in server.conf
* Defaults to 0

testing_endpoint = <relative_uri_path>
* Specifies the root URI path on which to serve splunkweb unit and
  integration testing resources.
* Development only setting
* Defaults to '/testing'

testing_dir = <relative_file_path>
* Specifies the path relative to $SPLUNK_HOME that contains the testing
  files to be served at endpoint defined by 'testing_endpoint'.
* Development only setting
* Defaults to 'share/splunk/testing'

ssoAuthFailureRedirect = <scheme>://<URL>
   * Used to set the redirect URL if SSO authentication fails.
     Examples:
     http://www.example.com
     https://www.example.com
   * Defaults to an empty value and will show the default unauthorized error
     page if SSO authentication fails.

# Results export server config

export_timeout = <integer>
* When exporting results, the number of seconds the server waits before 
* closing the connection with splunkd. If you do not set a value for 
* export_timeout, the value in splunkdConnectionTimeout is used. 
* We recommend that you set export_timeout to a value greater than 30

#
# cherrypy HTTP server config
#

server.thread_pool = <integer>
* Specifies the minimum number of threads the appserver is allowed to
  maintain
* Defaults to 20

server.thread_pool_max = <integer>
* Specifies the maximum number of threads the appserver is allowed to
  maintain
* Defaults to -1 (unlimited)

server.thread_pool_min_spare = <integer>
* Specifies the minimum number of spare threads the appserver keeps idle
* Defaults to 5

server.thread_pool_max_spare = <integer>
* Specifies the maximum number of spare threads the appserver keeps idle
* Defaults to 10

server.socket_host = <ip_address>
* Host values may be any IPv4 or IPv6 address, or any valid hostname.
* The string 'localhost' is a synonym for '127.0.0.1' (or '::1', if your
  hosts file prefers IPv6). The string '0.0.0.0' is a special IPv4 entry
  meaning "any active interface" (INADDR_ANY), and '::' is the similar
  IN6ADDR_ANY for IPv6.
* Defaults to 0.0.0.0 if listenOnIPv6 is set to no, else ::

server.socket_timeout = <integer>
* The timeout in seconds for accepted connections between the browser and
  splunkweb
* Defaults to 10

listenOnIPv6 = <no | yes | only>
* By default, splunkweb will listen for incoming connections using 
  IPv4 only
* To enable IPv6 support in splunkweb, set this to "yes".  Splunkweb
  will simultaneously listen for connections on both IPv4 and IPv6
* To disable IPv4 entirely, set this to "only", which will cause splunkweb
* to exclusively accept connections over IPv6.
* You will also want to set server.socket_host (use "::"
  instead of "0.0.0.0") if you wish to listen on an IPv6 address

max_upload_size = <integer>
* Specifies the hard maximum size of uploaded files in MB
* Defaults to 500

log.access_file = <filename>
* Specifies the HTTP access log filename
* Stored in default Splunk /var/log directory
* Defaults to web_access.log

log.access_maxsize = <integer>
* Specifies the maximum size the web_access.log file should be allowed to
  grow to (in bytes)
* Comment out or set to 0 for unlimited file size
* File will be rotated to web_access.log.0 after max file size is reached
* See log.access_maxfiles to limit the number of backup files created
* Defaults to unlimited file size

log.access_maxfiles = <integer>
* Specifies the maximum number of backup files to keep after the
  web_access.log file has reached its maximum size
* Warning: setting this to very high numbers (eg. 10000) may impact
  performance during log rotations
* Defaults to 5 if access_maxsize is set

log.error_maxsize = <integer>
* Specifies the maximum size the web_service.log file should be allowed to
  grow to (in bytes)
* Comment out or set to 0 for unlimited file size
* File will be rotated to web_service.log.0 after max file size is reached
* See log.error_maxfiles to limit the number of backup files created
* Defaults to unlimited file size

log.error_maxfiles = <integer>
* Specifies the maximum number of backup files to keep after the
  web_service.log file has reached its maximum size
* Warning: setting this to very high numbers (eg. 10000) may impact
           performance during log rotations
* Defaults to 5 if access_maxsize is set

log.screen = [True | False]
* Indicates if runtime output is displayed inside an interactive tty
* Defaults to True

request.show_tracebacks = [True | False]
* Indicates if a an exception traceback is displayed to the user on fatal
  exceptions
* Defaults to True

engine.autoreload_on = [True | False]
* Indicates if the appserver will auto-restart if it detects a python file
  has changed
* Defaults to False

tools.sessions.on = True
* Indicates if user session support is enabled
* Should always be True

tools.sessions.timeout = <integer>
* Specifies the number of minutes of inactivity before a user session is
  expired
* The countdown is effectively reset by browser activity minute until
  ui_inactivity_timeout inactivity timeout is reached.
* Use a value of 2 or higher, as a value of 1 will race with the browser
  refresh, producing unpredictable behavior.
  (Low values aren't very useful though except for testing.)
* Defaults to 60

tools.sessions.restart_persist = [True | False]
* If set to False then the session cookie will be deleted from the browser
  when the browser quits
* Defaults to True - Sessions persist across browser restarts
  (assuming the tools.sessions.timeout limit hasn't been reached)

tools.sessions.httponly = [True | False]
* If set to True then the session cookie will be made unavailable
  to running javascript scripts, increasing session security
* Defaults to True

tools.sessions.secure = [True | False]
* If set to True and Splunkweb is configured to server requests using HTTPS
  (see the enableSplunkWebSSL setting) then the browser will only transmit
  the session cookie over HTTPS connections, increasing session security
* Defaults to True

response.timeout = <integer>
* Specifies the number of seconds to wait for the server to complete a
  response
* Some requests such as uploading large files can take a long time
* Defaults to 7200

tools.sessions.storage_type = [file]
tools.sessions.storage_path = <filepath>
* Specifies the session information storage mechanisms
* Comment out the next two lines to use RAM based sessions instead
* Use an absolute path to store sessions outside of the splunk tree
* Defaults to storage_type=file, storage_path=var/run/splunk

tools.decode.on = [True | False]
* Indicates if all strings that come into Cherrpy controller methods are
  decoded as unicode (assumes UTF-8 encoding).
* WARNING: Disabling this will likely break the application, as all incoming
           strings are assumed to be unicode.
* Defaults to True

tools.encode.on = [True | False]
* Encodes all controller method response strings into UTF-8 str objects in
  Python.
* WARNING: Disabling this will likely cause high byte character encoding to
  fail.
* Defaults to True

tools.encode.encoding = <codec>
* Force all outgoing characters to be encoded into UTF-8.
* This only works with tools.encode.on set to True.
* By setting this to utf-8, Cherrypy's default behavior of observing the
* Accept-Charset header is overwritten and forces utf-8 output. Only change
  this if you know a particular browser installation must receive some other
  character encoding (Latin-1 iso-8859-1, etc)
* WARNING: Change this at your own risk.
* Defaults to utf08

tools.proxy.on = [True | False]
* Used for running Apache as a proxy for Splunk UI, typically for SSO
  configuration. See http://tools.cherrypy.org/wiki/BehindApache for more
  information.
* For Apache 1.x proxies only. Set this attribute to "true". This
  configuration instructs CherryPy (the Splunk Web HTTP server) to look for
  an incoming X-Forwarded-Host header and to use the value of that header to
  construct canonical redirect URLs that include the proper host name. For
  more information, refer to the CherryPy documentation on running behind an
  Apache proxy. This setting is only necessary for Apache 1.1 proxies. For
  all other proxies, the setting must be "false", which is the default.
* Defaults to False

tools.proxy.base = <scheme>://<URL>
* Used for setting the proxy base url in Splunk
* Defaults to an empty value

pid_path = <filepath>
* Specifies the path to the PID file
* Equals precisely and only var/run/splunk/splunkweb.pid
* NOTE: Do not change this parameter.

enabled_decomposers = <intention> [, <intention>]...
* Added in Splunk 4.2 as a short term workaround measure for apps which
  happen to still require search decomposition, which is deprecated
  with 4.2.
* Search decomposition will be entirely removed in a future release.
* Comma separated list of allowed intentions.
* Modifies search decomposition, which is a splunk-web internal behavior.
* Can be controlled on a per-app basis.
* If set to the empty string, no search decomposition occurs, which causes
  some usability problems with report builder.
* The current possible values are: addcommand, stats, addterm, addtermgt,
  addtermlt, setfields, excludefields, audit, sort, plot
* Default is 'plot', leaving only the plot intention enabled.
* When you need a good mulch, we recommend antibeethoven.
* However, for a traditional compost, antimozart is preferred.

simple_xml_perf_debug = [True | False]
* If True, simple xml dashboards will log some performance metrics to the
  browser console
* Defaults to False

job_min_polling_interval = <integer>
* Minimum polling interval for job in miliseconds (ms)
* The default value is 100
* This is the intial time wait for fetching results
* The poll period increases gradually from min interval to max interval when
  search is in queued state or parsing state (and not running state) for a
  some time.
* Set this value between 100 to job_max_polling_interval

job_max_polling_interval = <integer>
* Maximum polling interval for job in miliseconds (ms)
* The default value is 1000
* This is the maximum time wait for fetching results
* The recommended maximum value is 3000

acceptFrom = <network_acl> ...
* IMPORTANT: this setting only takes effect when appServerPorts is set to a
  non-zero value
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
* Defaults to "*" (accept from anywhere)

maxThreads = <int>
* NOTE: this setting only takes effect when appServerPorts is set to a
        non-zero value
* Number of threads that can be used by active HTTP transactions.
  This can be limited to constrain resource usage.
* If set to 0 (the default) a limit will be automatically picked
  based on estimated server capacity.
* If set to a negative number, no limit will be enforced.

maxSockets = <int>
* NOTE: this setting only takes effect when appServerPorts is set to a
        non-zero value
* Number of simultaneous HTTP connections that we accept simultaneously.
  This can be limited to constrain resource usage.
* If set to 0 (the default) a limit will be automatically picked
  based on estimated server capacity.
* If set to a negative number, no limit will be enforced.

forceHttp10 = auto|never|always
* NOTE: this setting only takes effect when appServerPorts is set to a
  non-zero value
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
* IMPORTANT: this setting only takes effect when appServerPorts is set to a
  non-zero value
* List of HTTP Origins for which to return Access-Control-Allow-* (CORS) headers
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

allowSslCompression = true|false
* IMPORTANT: this setting only takes effect when appServerPorts is set
  to a non-zero value.  When appServerPorts is zero or missing, this setting
  will always act as if it is set to "true"
* If set to true, the server will allow clients to negotiate
  SSL-layer data compression.
* Defaults to false.  The HTTP layer has its own compression layer
  which is usually sufficient.

allowSslRenegotiation = true|false
* IMPORTANT: this setting only takes effect when appServerPorts is set to a
  non-zero value
* In the SSL protocol, a client may request renegotiation of the connection
  settings from time to time.
* Setting this to false causes the server to reject all renegotiation
  attempts, breaking the connection.  This limits the amount of CPU a
  single TCP connection can use, but it can cause connectivity problems
  especially for long-lived connections.
* Defaults to true

sendStrictTransportSecurityHeader = true|false
* IMPORTANT: this setting only takes effect when appServerPorts is set to a
  non-zero value
* If set to true, the REST interface will send a "Strict-Transport-Security"
  header with all responses to requests made over SSL.
* This can help avoid a client being tricked later by a Man-In-The-Middle
  attack to accept a non-SSL request.  However, this requires a commitment
  that no non-SSL web hosts will ever be run on this hostname on any port.
  For example, if splunkweb is in default non-SSL mode this can break the
  ability of browser to connect to it.  Enable with caution.
* Defaults to false

dedicatedIoThreads = <int>
* If set to zero, HTTP I/O will be performed in the same thread
  that accepted the TCP connection.
* If set set to a non-zero value, separate threads will be run
  to handle the HTTP I/O, including SSL encryption.
* Defaults to "0"
* Typically this does not need to be changed.  For most usage
  scenarios using the same the thread offers the best performance.
* NOTE: this setting only takes effect when appServerPorts is set to a
  non-zero value

termsOfServiceDirectory = <directory>
  * If set, we will look in this directory for a "Terms Of Service" document
    which each user must accept before logging into the UI
  * Inside the directory the TOS should have a filename in the format "<number>.html"
    Where <number> is in the range 1 to 18446744073709551615.  The active TOS is the
    filename with the larger number.  For instance if there are two files in the
    directory named "123.html" and "456.html", then 456 will be the active TOS version.
  * If a user hasn't accepted the current version of the TOS, they'll be required to
    the next time they try to log in.  The acceptance times will be recorded inside
    a "tos.conf" file inside an app called "tos"
  * The TOS file can either be a full HTML document or plain text, but it must have the
    ".html" suffix
  * It is not necessary to restart Splunk when adding files to the TOS directory
  * Defaults to empty (no TOS)
  * NOTE: this setting only takes effect when appServerPorts is set to a non-zero value

appServerProcessShutdownTimeout = <nonnegative integer>[smhd]
  * IMPORTANT: this setting only takes effect when appServerPorts is set to a non-zero value.
  * The amount of time splunkd will wait "politely" for a Python-based application server process to handle outstanding/existing requests.
  * If a Python-based application server process "outlives" this timeout, the process is forcibly killed.
  * Defaults to '10m'

enableWebDebug = true|false
* Controls the visibility of the debug endpoints (i.e., /debug/**splat).
* Defaults to false

allowableTemplatePaths =  <directory> [, <directory>]...
* A comma separated list of template paths that may be added tp template lookup white list. 
* Paths are relative to $SPLUNK_HOME.
* Defaults to empty

enable_risky_command_check = <bool>
* Enable checks for data-exfiltrating search commands.
* default true

[framework]
# Put App Framework settings here
django_enable = [True | False]
* Specifies whether Django should be enabled or not
* Defaults to True
* Django will not start unless an app requires it

django_path = <filepath>
* Specifies the root path to the new App Framework files, 
  relative to $SPLUNK_HOME
* Defaults to etc/apps/framework

django_force_enable = [True | False]
* Specifies whether to force Django to start, even if no app requires it
* Defaults to False


#
# custom cherrypy endpoints
#

[endpoint:<python_module_name>]
* registers a custom python CherryPy endpoint
* The expected file must be located at:
  $SPLUNK_HOME/etc/apps/<APP_NAME>/appserver/controllers/<PYTHON_NODULE_NAME>.py
* This module's methods will be exposed at /custom/<APP_NAME>/<PYTHON_NODULE_NAME>/<METHOD_NAME>

#
# exposed splunkd REST endpoints
#
[expose:<unique_name>]
* Registers a splunkd-based endpoint that should be made available to the UI
  under the "/splunkd" and "/splunkd/__raw" hierarchies
* The name of the stanza doesn't matter as long as it starts with "expose:"
  Each stanza name must be unique, however

pattern = <url_pattern>
* Pattern to match under the splunkd /services hierarchy.  For instance,
  "a/b/c" would match URIs "/services/a/b/c" and "/servicesNS/*/*/a/b/c"
* The pattern should not include leading or trailing slashes
* Inside the pattern an element of "*" will match a single path element.
  For example, "a/*/c" would match "a/b/c" but not "a/1/2/c"
* A path element of "**" will match any number of elements.  For example,
  "a/**/c" would match both "a/1/c" and "a/1/2/3/c"
* A path element can end with a "*" to match a prefix.  For example,
  "a/elem-*/b" would match "a/elem-123/c"

methods = <method_lists>
* Comma separated list of methods to allow from the web browser 
  (example: "GET,POST,DELETE")
* If not included, defaults to "GET"

oidEnabled = [0 | 1]
* If set to 1 indicates that the endpoint is capable of taking an embed-id
  as a query parameter
* Defaults to 0
* This is only needed for some internal splunk endpoints, you probably
  should not specify this for app-supplied endpoints

skipCSRFProtection = [0 | 1]
* If set to 1, tells splunkweb that it is safe to post to this endpoint
  without applying CSRF protection
* Defaults to 0
* This should only be set on the login endpoint (which already contains
  sufficient auth credentials to avoid CSRF problems)
