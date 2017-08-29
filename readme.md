# wazuh-splunk

## SplunkAppForWazuh

App for Splunk. Requires TA-Wazuh-API-Connector

## TA-Wazuh

Technology Addon. Build to ingest REST API data.

## TA development project

Project to adjust development env. Build on Splunk app addon builder. Very useful.

## Forwarder config

Configuration to install on distribuited environment. 

* * *

### Splunk App for Wazuh

Splunk App for Splunk offers an option to visualize _Wazuh Alerts_ and _API data_. Wazuh helps you to gain deeper security visibility into your infrastructure by monitoring hosts at an operating system and application level.

### Requirements

1. You must install the __TA Wazuh Connector__ from our [_Github Repo_](https://github.com/wazuh/wazuh-splunk/releases/download/1.0-beta1/TA-wazuh-api-connector.tgz). After installed, needs to be configured.
2. Also, you need to install and setup a __Splunk Universal Forwarder__ where the Wazuh's manager is installed. 
3. A Wazuh Manager with access to the API via HTTP (usually on port 55000).
4. User and password (credentials) for api basic authentication (usually _foo_ and _bar_)
5. Set the indexers to `manager receiving`. (Check bottom).

### Quick Install

#### Splunk Servers

1. Create a new index named __wazuh_api__.
2. Install the __TA Wazuh API Connector__ on each indexer.
3. Install our app __SplunkAppForWazuh__ on each search head that you have.
    * This app creates a new index named `wazuh`.
4. On Splunk, Go to `Settings` --> `Data Inputs` and edit the four new local inputs with prefix `wazuh*` one by one (Remember to use your API URL and API credentials).
	* Click on `api_server` section.
	* Set `username`, `password`, `Wazuh Manager IP + API HTTP PORT`.
	* Click on `More settings`.
	* Adjust the index to be `wazuh_api`

	Repeat the process on each _Data input_ (four in total).
5. Wait a couple of minutes to have data in your `wazuh_api` index.

#### Wazuh Manager

1. You must install Splunk Forwarder on your Wazuh Manager.
2. Go to `$SPLUNK_HOME/etc/system/local`. 
3. Edit the file _inputs.conf_:

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
4. Edit the file and add the following stanza on _props.conf_:

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
	`$SPLUNK_HOME/bin/splunk add forward-server <host name or ip address>:<listening port>`
	- `host name or IP address` IP address of Splunk Indexer
	- `listening port` By default on port `9997`.
	-  Remember that `Splunk username/password` are: `admin/changeme` at forwarder level. 
6. Restart Splunk services (Windows Service, Linux).
7. Test on Splunk:
	`index=wazuh *`
	
#### Setup Manager Receiving 

1. Log into the receiver as admin or an administrative equivalent.
2. Click Settings > Forwarding and receiving.
3. At Configure receiving, click Add new.
4. Specify the TCP port you want the receiver to listen on (the listening port, also known as the receiving port). For example, if you enter "9997," the receiver listens for connections from forwarders on port 9997. You can specify any unused port. You can use a tool like netstat to determine what ports are available on your system. Make sure the port you select is not in use by splunkweb or splunkd.
5. Click Save. Splunk software starts listening for incoming data on the port you specified.

	More info at [Splunk Documentation](https://docs.splunk.com/Documentation/SplunkCloud/6.6.1/Forwarding/Enableareceiver)

#### More info

[Check our Github Repo.](https://github.com/wazuh/wazuh-splunk)
