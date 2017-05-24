#   Version 6.4.0
#
# This file contains possible attributes and values for configuring a
# deployment client to receive content (apps and configurations) from a
# deployment server.
#
# To customize the way a deployment client behaves, place a
# deploymentclient.conf in $SPLUNK_HOME/etc/system/local/ on that Splunk
# instance. Configure what apps or configuration content is deployed to a
# given deployment client in serverclass.conf.  Refer to
# serverclass.conf.spec and serverclass.conf.example for more information.
#
# You must restart Splunk for changes to this configuration file to take
# effect.
#
# To learn more about configuration files (including precedence) please see
# the documentation located at
# http://docs.splunk.com/Documentation/Splunk/latest/Admin/Aboutconfigurationfiles

#***************************************************************************
# Configure a Splunk deployment client.
#
# Note: At a minimum the [deployment-client] stanza is required in
# deploymentclient.conf for deployment client to be enabled.
#***************************************************************************

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

[deployment-client]

disabled = [false|true]
* Defaults to false
* Enable/Disable deployment client.

clientName = deploymentClient
* Defaults to deploymentClient.
* A name that the deployment server can filter on.
* Takes precedence over DNS names.

workingDir = $SPLUNK_HOME/var/run
* Temporary folder used by the deploymentClient to download apps and
  configuration content.

repositoryLocation = $SPLUNK_HOME/etc/apps
* The location into which content is installed after being downloaded from a
  deployment server.
* Apps and configuration content must be installed into the default location
  ($SPLUNK_HOME/etc/apps) or it will not be recognized by
  the Splunk instance on the deployment client.
    * Note: Apps and configuration content to be deployed may be located in
      an alternate location on the deployment server. Set both
      repositoryLocation and serverRepositoryLocationPolicy explicitly to
      ensure that the content is installed into the correct location
      ($SPLUNK_HOME/etc/apps) on the deployment clientr
    * The deployment client uses the 'serverRepositoryLocationPolicy'
      defined below to determine which value of repositoryLocation to use.

serverRepositoryLocationPolicy = [acceptSplunkHome|acceptAlways|rejectAlways]
* Defaults to acceptSplunkHome.
* acceptSplunkHome - accept the repositoryLocation supplied by the
                     deployment server, only if it is rooted by
                     $SPLUNK_HOME.
* acceptAlways - always accept the repositoryLocation supplied by the
                 deployment server.
* rejectAlways - reject the server supplied value and use the
                 repositoryLocation specified in the local
                 deploymentclient.conf.

endpoint=$deploymentServerUri$/services/streams/deployment?name=$serverClassName$:$appName$
* The HTTP endpoint from which content should be downloaded.
* Note: The deployment server may specify a different endpoint from which to
  download each set of content (individual apps, etc).
* The deployment client will use the serverEndpointPolicy defined below to
  determine which value to use.
* $deploymentServerUri$ will resolve to targetUri defined in the
  [target-broker] stanza below.
* $serverClassName$ and $appName$ mean what they say.

serverEndpointPolicy = [acceptAlways|rejectAlways]
* defaults to acceptAlways
* acceptAlways - always accept the endpoint supplied by the server.
* rejectAlways - reject the endpoint supplied by the server. Always use the
                 'endpoint' definition above.

phoneHomeIntervalInSecs = <number in seconds>
* Defaults to 60.
* Fractional seconds are allowed.
* This determines how frequently this deployment client should check for new
  content.

handshakeRetryIntervalInSecs = <number in seconds>
* Defaults to one fifth of phoneHomeIntervalInSecs
* Fractional seconds are allowed.
* This sets the handshake retry frequency.
* Could be used to tune the initial connection rate on a new server

handshakeReplySubscriptionRetry = <integer>
* Defaults to 10
* If splunk is unable to complete the handshake, it will retry subscribing to
  the handshake channel after this many handshake attempts

appEventsResyncIntervalInSecs = <number in seconds>
* Defaults to 10*phoneHomeIntervalInSecs
* Fractional seconds are allowed.
* This sets the interval at which the client reports back its app state to the server.

# Advanced!
# You should use this property only when you have a hierarchical deployment
# server installation, and have a Splunk instance that behaves as both a
# DeploymentClient and a DeploymentServer.

# NOTE: hierarchical deployment servers are not a currently recommended
# configuration.  Splunk has seen problems in the field that have not yet
# been resolved with this type of configuration.

reloadDSOnAppInstall = [false|true]
* Defaults to false
* Setting this flag to true will cause the deploymentServer on this Splunk
  instance to be reloaded whenever an app is installed by this
  deploymentClient.

# The following stanza specifies deployment server connection information

[target-broker:deploymentServer]

targetUri= <deploymentServer>:<mgmtPort>
* URI of the deployment server.

phoneHomeIntervalInSecs = <nonnegative number>
* see phoneHomeIntervalInSecs above
