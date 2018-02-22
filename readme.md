# Splunk App for Wazuh

[![Slack](https://img.shields.io/badge/slack-join-blue.svg)](https://goo.gl/forms/M2AoZC4b2R9A9Zy12)
[![Email](https://img.shields.io/badge/email-join-blue.svg)](https://groups.google.com/forum/#!forum/wazuh)
[![Documentation](https://img.shields.io/badge/docs-view-green.svg)](https://documentation.wazuh.com)
[![Documentation](https://img.shields.io/badge/web-view-green.svg)](https://wazuh.com)


### Splunk App for Wazuh

Splunk App for Splunk offers an option to visualize _Wazuh Alerts_ and _API data_. Wazuh helps you to gain deeper security visibility into your infrastructure by monitoring hosts at an operating system and application level.
* * *
### Requirements

1. You must install the __TA Wazuh Connector__ from our [_Github Repo_](https://github.com/wazuh/wazuh-splunk/releases). Configuration is detailed below.
2. Also, you need to install and setup a __Splunk Universal Forwarder__ where the Wazuh's manager is installed from the official Splunk platform. 
3. An already installed Wazuh Manager with access to the API via HTTP (usually on port 55000).
4. User and password (credentials) for api basic authentication (usually _foo_ and _bar_)
5. Set the indexers to `manager receiving`. (Check bottom).

### Quick Install

#### Indexers

1. Create a new index named __wazuh_api__.

    ###### CLI mode:
    
    ```
    $SPLUNK_HOME/bin/splunk add index wazuh_api
    ```
    
    ###### Web GUI:
    
    ```
    Settings -> Indexes -> New Index
    ```
2. Install the __TA Wazuh API Connector__ on each indexer.
    ###### CLI mode:
    ```
    $SPLUNK_HOME/bin/splunk install app TA-wazuh-api-connector.tgz
    ```
    ###### Web GUI:
    ```
    Apps -> Manage apps -> install app from file
    ```
3.  Edit Inputs:
    ######  CLI mode:
    Edit __$SPLUNK_HOME/etc/apps/TA-wazuh-api-connector/local/inputs.conf__ file as the following example:
    ```
    [wazuh_api_agents://api_server]
	base_url = http://IP_WAZUH_SERVER:WAZUH_SERVER_API_PORT (usually 55000)
	index = wazuh_api
	interval = 30
	password = // Wazuh API auth password, usually bar
	sourcetype = wazuh:api:agents
	username = // Wazuh API auth username, usually foo
	
	[wazuh_api_decoders://api_server]
	base_url = http://IP_WAZUH_SERVER:WAZUH_SERVER_API_PORT (usually 55000)
	index = wazuh_api
	interval = 30
	password = // Wazuh API auth password, usually bar
	sourcetype = wazuh:api:decoders
	username = // Wazuh API auth username, usually foo
	
	[wazuh_api_info_basic://api_server]
	base_url = http://IP_WAZUH_SERVER:WAZUH_SERVER_API_PORT (usually 55000)
	index = wazuh_api
	interval = 30
	password = // Wazuh API auth password, usually bar
	sourcetype = wazuh:api:info:basic
	username = // Wazuh API auth username, usually foo
	
	[wazuh_api_rules://api_server]
	base_url = http://IP_WAZUH_SERVER:WAZUH_SERVER_API_PORT (usually 55000)
	index = wazuh_api
	interval = 30
	password = // Wazuh API auth password, usually bar
	sourcetype = wazuh:api:rules
	username = // Wazuh API auth username, usually foo
	
	[splunktcp://9997]
	connection_host = ip
	```
    ###### Web GUI:
	Go to `Settings` --> `Data Inputs` and edit the four new local inputs with prefix `wazuh*` one by one (Remember to use     your API URL and API credentials).
	* Click on `api_server` section.
	* Set `username`, `password`, `Wazuh Manager IP + API HTTP PORT`.
	* Click on `More settings`.
	* Adjust the index to be `wazuh_api`

	Repeat the process on each _Data input_ (four in total).
	
4. Clear __passwords.conf__ and write admin credentials. With default credentials must  look like this :
    ```
	[credential:admin:]
	password = changeme
	```
5. Restart Splunk service and wait a couple of minutes to have data in your wazuh_api index.
    ```
	$SPLUNK_HOME/bin/splunk restart
	```
6. After that you can delete 'username' and 'password' in __passwords.conf__

#### Search head
1. Install our app SplunkAppForWazuh on each search head that you have.
    ######  CLI mode:
    ```
    $SPLUNK_HOME/bin/splunk install app SplunkAppForWazuh.tgz
    ```
    ######  Web GUI:
    ```
    Apps -> Manage apps -> install app from file
    ```
* This app creates a new index named `wazuh`.
#### Forwarders

1. You must install Splunk Forwarder on your Wazuh Manager.
2. Go to `$SPLUNK_HOME/etc/system/local`. 
3. Edit the file __inputs.conf__:

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
	DATETIME_CONFIG = $SPLUNK_HOME/etc/datetime.xml
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
    Add a new receiving configuration editing __inputs.conf__ file, adding the following lines:
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
4. After this Splunk software starts listening for incoming data on the port you specified.
***
#### More info
App for Splunk requires TA-Wazuh-API-Connector
##### TA-Wazuh-API-connector

Technology Addon. Build to ingest REST API data.

##### TA development project

Project to adjust development env. Build on Splunk app addon builder. Very useful.

##### Forwarder config

Configuration to install on distribuited environment. 

More info at [Splunk Documentation](https://docs.splunk.com/Documentation/SplunkCloud/6.6.1/Forwarding/Enableareceiver)
[Check our Github Repo.](https://github.com/wazuh/wazuh-splunk)

