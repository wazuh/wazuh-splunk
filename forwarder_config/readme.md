#### Splunk suggested configuration to send `alerts.json` from Wazuh Manager to Splunk indexers

- Workdir: `$SPLUNK_FORWARDER_HOME/etc/system`


- If you have multiple indexers, please set `outputs.conf` like this:

	```
	[tcpout]
	defaultGroup=indexer1,indexer2
	
	[tcpout:indexer1]
	server=IP_FIRST_INDEXER:9997
	
	[tcpout:indexer2]
	server=IP_SECOND_INDEXER:9997
	```
