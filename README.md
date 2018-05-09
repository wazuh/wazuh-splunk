# Wazuh App for Splunk

[![Slack](https://img.shields.io/badge/slack-join-blue.svg)](https://goo.gl/forms/M2AoZC4b2R9A9Zy12)
[![Email](https://img.shields.io/badge/email-join-blue.svg)](https://groups.google.com/forum/#!forum/wazuh)
[![Documentation](https://img.shields.io/badge/docs-view-green.svg)](https://documentation.wazuh.com)
[![Documentation](https://img.shields.io/badge/web-view-green.svg)](https://wazuh.com)

###  Wazuh App for Splunk

Wazuh app for Splunk offers an option to visualize _Wazuh Alerts_ and _API data_. Wazuh helps you to gain deeper security visibility into your infrastructure by monitoring hosts at an operating system and application level.
* * *
### Requirements

1. You need to install and setup a __Splunk Universal Forwarder__ where the Wazuh's manager is installed from the official Splunk platform. 
2. An already installed Wazuh Manager with access to the API via HTTP (usually on port 55000).
3. User and password (credentials) for api basic authentication.
4. Set the indexers to `manager receiving`. (Check bottom).

### Quick Install

#### Forwarder

1. You must install Splunk Forwarder on your Wazuh Manager.
2. Go to `$SPLUNK_HOME/etc/system/local`. 
3. Edit the file __inputs.conf__. If it doesn't exist, create it:

	```
	[monitor:///var/ossec/logs/alerts/alerts.json]
	disabled = 0
	host = wazuhmanager
	index = wazuh
	sourcetype = wazuh
	```
   - `host = wazuhmanager`, hostname of Wazuh Manager.
   - `index = wazuh`, index by default to store alerts.
   - `sourcetype = wazuh` sourcetype by default to alerts received.
4. Edit the file and add the following stanza on __props.conf__. If it doesn't exist, create it:

	```
	[wazuh]
	DATETIME_CONFIG = 
	INDEXED_EXTRACTIONS = json
	KV_MODE = none
	NO_BINARY_CHECK = true
	category = Application
	disabled = false
	pulldown_type = true
	```
5. Point the _output_ to the Wazuh's Indexer (or indexers):
    ```
	$SPLUNK_HOME/bin/splunk add forward-server <host name or ip address>:<listening port>
	```
	- `host name or IP address` IP address of Splunk Indexer
	- `listening port` By default on port `9997`.
	-  Remember that `Splunk username/password` are: `admin/changeme` by default. 
	
    If you have multiple indexers, please set __outputs.conf__ like this:
    ```
	[tcpout]
	defaultGroup=indexer1,indexer2
 	
	[tcpout:indexer1]
	server=IP_FIRST_INDEXER:9997
 
 	[tcpout:indexer2]
 	server=IP_SECOND_INDEXER:9997
 	```
6. Restart Splunk services (Windows Service, Linux).
    ```
	$SPLUNK_HOME/bin/splunk restart
	```
7. Test on Splunk:
	`index=wazuh *`
####  Setup  Receiving (indexers)
1. Specify the TCP port you want the receiver to listen on (the listening port, also known as the receiving port). For example, if you enter "9997," the receiver listens for connections from forwarders on port 9997. You can specify any unused port. You can use a tool like netstat to determine what ports are available on your system. Make sure the port you select is not in use by splunkweb or splunkd. 

    ###### CLI mode:
    Add a new receiving configuration editing __$SPLUNK_HOME/etc/apps/launcher/local/inputs.conf__ file, adding the following lines:
     ```
	[splunktcp://9997]
	connection_host = ip
	```
    ###### Web GUI
    ```
	1. Click Settings > Forwarding and receiving.
    2. At Configure receiving, click Add new.
    3. Set the chosen port
	```
2. After this Splunk software starts listening for incoming data on the port you specified.
***
#### Search head
1. Install our app Wazuh on each search head that you have.
    ######  CLI mode:
    ```
    $SPLUNK_HOME/bin/splunk install app Wazuh.tgz
    ```
    ######  Web GUI:
    ```
    Apps -> Manage apps -> install app from file
    ```
* This app creates a new index named `wazuh`.

2. Configure credentials:
  - Open the Wazuh App for Splunk after installing it.
  - Add API credentials in Configuration -> API
    - API IP: Address of Wazuh API server.
    - API Port: Port of Wazuh API server, usually 55000.
    - Api User: Username for Wazuh API authorization, usually 'foo'.
    - Api Password: Password for Wazuh API authorization, usually 'bar'.


#### More info

##### Forwarder config

Configuration to install on distribuited environment. 

More info at [Splunk Documentation](https://docs.splunk.com/Documentation/SplunkCloud/6.6.1/Forwarding/Enableareceiver)
[Check our Github Repo.](https://github.com/wazuh/wazuh-splunk)

