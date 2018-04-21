# Change Log
All notable changes to the Wazuh app for Splunk project will be documented in this file.

## Wazuh v3.2.x - Splunk app v2.2.0
### Added
- New Manager Configuration tab ([#32](https://github.com/wazuh/wazuh-splunk/pull/32))
- Dynamic tables([#37](https://github.com/wazuh/wazuh-splunk/pull/37))
  - Now the app uses dynamic tables improving the pagination and filtering.
  - Backend endpoints were adapted to pagination and better interaction with Wazuh API.

### Changed
- Performance improvings:
  - Event listeners and unused dependencies were removed
- API Configuration:
  - IP base and port are not required anymore.
  - Status led added in order to check connection.
  - Password field is not shown now.
- View controllers transpiled to ES6 syntax
- Tab distribution redesigned:
  - Deleted redundant Agents summary views and compact them in just one tab
  - Deleted Search on Rules and Search on Decoders tab and compacting all functionalities in Ruleset and Decoders tabs
  - Tab names were renamed
### Fixed
- Ruleset and Decoders search tabs now are able to filter properly.
- SSL Verification Error in lab environment fixed
- Groups: now the content of each individual configuration file is showed up in pretty JSON format properly.

## Wazuh v3.2.x - Splunk app v2.1.0
### Added
- New Configuration tab:
  - Now the whole configuration that the app needs is made by inputs.
  - Extern configuration files are not needed anymore.
- Back-end refactor:
  - Each controller is now parameterized, not any hardcoded values anymore.
  - Endpoints now work with GET params.

### Changed
- Each view was converted from SimpleXML to HTML+JS in order to gain the whole SplunkJS SDK functionality.
- Credentials are now stored in KVStore database, values are getting from ajax when needed.
- Each query now send parameters to streaming commands.
- The app is now called 'Wazuh' instead 'SplunkAppForWazuh'.
- Some unused tabs were deleted (Splunk and Tools).
### Fixed
- Ruleset and Decoders search tabs now are able to filter properly.

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
