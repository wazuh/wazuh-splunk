# Splunk app for Wazuh

[![Slack](https://img.shields.io/badge/slack-join-blue.svg)](https://goo.gl/forms/M2AoZC4b2R9A9Zy12)
[![Email](https://img.shields.io/badge/email-join-blue.svg)](https://groups.google.com/forum/#!forum/wazuh)
[![Documentation](https://img.shields.io/badge/docs-view-green.svg)](https://documentation.wazuh.com)
[![Documentation](https://img.shields.io/badge/web-view-green.svg)](https://wazuh.com)

Wazuh app for Splunk offers an option to visualize _Wazuh Alerts_ and _API data_. Wazuh helps you to gain deeper security visibility into your infrastructure by monitoring hosts at an operating system and application level.
* * *
![](https://imgur.com/a/KehDBjp)
### Documentation

-   [Full Wazuh documentation](https://documentation.wazuh.com)
-   [Wazuh app for Splunk installation guide](https://documentation.wazuh.com/current/installation-guide/installing-splunk/index.htm)


### Requisites
1. An already installed Wazuh Manager with access to the API.
2. __Splunk Universal Forwarder__ where Wazuh Manager is installed.
3. At least one __Splunk Enterprise indexer__.

## Installation

| Splunk version | Wazuh version | Installation                                                                                               |
| :------------: | :---------------: | :--------------------------------------------------------------------------------------------------------- |
|      7.0.1     |       3.2.1       |<https://github.com/wazuh/wazuh-splunk/releases/tag/v3.2.1-7.0.1> |
|      7.0.3     |       3.2.1       | <https://github.com/wazuh/wazuh-splunk/releases/tag/v3.2.1-7.0.3> |
|      7.1.0     |       3.2.2       | <https://github.com/wazuh/wazuh-splunk/releases/tag/v3.2.2-7.1.0> |

## Upgrade

Remove the app using splunk plugin tool

    $SPLUNK_HOME/bin/splunk remove app SplunkAppForWazuh

Install the app

     $SPLUNK_HOME/bin/splunk install app <last package file>

## Contribute

If you want to contribute to our project please don't hesitate to send a pull request. You can also join our users [mailing list](https://groups.google.com/d/forum/wazuh), by sending an email to <mailto:wazuh+subscribe@googlegroups.com>, to ask questions and participate in discussions.

## Copyright & License

Copyright (C) 2018 Wazuh, Inc.

This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.

Find more information about this on the [LICENSE](LICENSE) file.

## References

-   [Wazuh website](https://wazuh.com)
-   [Wazuh documentation](https://documentation.wazuh.com)
-   [Splunk documentation](http://docs.splunk.com/Documentation)
