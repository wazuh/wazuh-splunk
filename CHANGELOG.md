# Change Log
All notable changes to the Wazuh app for Splunk project will be documented in this file.

## Wazuh v3.2.x - Splunk app v2.0.0
### Added
- New Manager Logs tab ([#6](https://github.com/wazuh/wazuh-splunk/pull/6)):
  - New module implemented to show Manager logs.
  - Data is fetched directly from Wazuh API.
- Back-end ([#14](https://github.com/wazuh/wazuh-splunk/pull/14))
  - Now the Splunk App has its own backend in order to modularize any REST routes it might need.
  -  Several code refactoring for a better handling of possible use cases.
  -  All queries along the App where bootstrapped in order to use the new back-end instead using indexes.

### Changed
- Ruleset and Decoders data will be fetched from API ([#12](https://github.com/wazuh/wazuh-splunk/pull/12)):
  - Now the app will avoid indexing Ruleset and Decoders data.
- Manager info will be fetched from API ([#14](https://github.com/wazuh/wazuh-splunk/pull/14)):
  - Now the app will avoid indexing Manager info data.
- Agents data will be fetched from API ([#15](https://github.com/wazuh/wazuh-splunk/pull/15)):
  - Now the app will avoid indexing Agents info data.
- And the best thing, it's no longer needed any extra index and the TA-wazuh-api-connector anymore.
