# Change Log
All notable changes to the Wazuh app for Splunk project will be documented in this file.
## Wazuh v3.6.1 - Splunk Enterprise v7.1.2 - Splunk app v3.6.0-rev-14
- Support for Wazuh 3.6.1
- Minor fixes.

## Wazuh v3.6.0 - Splunk Enterprise v7.1.2 - Splunk app v3.6.0-rev-13
- Minor fixes ([#229](https://github.com/wazuh/wazuh-splunk/pull/229))

## Wazuh v3.6.0 - Splunk Enterprise v7.1.2 - Splunk app v3.6.0-rev-12
- Support for Wazuh 3.6.0

## Wazuh v3.5.0 - Splunk Enterprise v7.1.2 - Splunk app v3.5.0-rev-11
- Minor fixes ([#211](https://github.com/wazuh/wazuh-splunk/pull/211))

## Wazuh v3.5.0 - Splunk Enterprise v7.1.2 - Splunk app v3.5.0-rev-10
- Support for Wazuh v3.5.0

## Wazuh v3.4.0 - Splunk Enterprise v7.1.2 - Splunk app v3.4.0-rev-9
There are no changes for Splunk app for Wazuh in this version.

## Wazuh v3.3.0/v3.3.1 - Splunk Enterprise v7.1.1 - Splunk app v3.3.0-rev-8
### Added
- Support for Wazuh v3.3.1
- Redesigned agents summary dashboard ([#115](https://github.com/wazuh/wazuh-splunk/pull/115))
- Manager status dashboard redesigned ([#117](https://github.com/wazuh/wazuh-splunk/pull/117))
- Manager configuration dashboard redesigned ([#120](https://github.com/wazuh/wazuh-splunk/pull/120))
- Agent group configuration dashboard redesigned ([#122](https://github.com/wazuh/wazuh-splunk/pull/122))
- Groups configuration dashboard redesigned ([#125](https://github.com/wazuh/wazuh-splunk/pull/125))
- Rules and decoders dashboards redesigned ([#128](https://github.com/wazuh/wazuh-splunk/pull/128))
- Logs dashboard redesigned ([#130](https://github.com/wazuh/wazuh-splunk/pull/130))
- Settings dashboard redesigned ([#133](https://github.com/wazuh/wazuh-splunk/pull/133))

### Fixed
- Fixed Firefox bug ([#114](https://github.com/wazuh/wazuh-splunk/pull/114))
- Fixed table filters ([#131](https://github.com/wazuh/wazuh-splunk/pull/131))
- Minor fixes ([#136](https://github.com/wazuh/wazuh-splunk/pull/136))

## Wazuh v3.3.0 - Splunk Enterprise v7.1.1 - Splunk app v3.3.0-rev-7
### Added
- Polling and index agent status data ([#101](https://github.com/wazuh/wazuh-splunk/pull/101))
### Changed
- Selecting 'wazuh' index when any other is selected ([#100](https://github.com/wazuh/wazuh-splunk/issues/100))
### Fixed
- Extending response timeout in checking connection endpoint ([#509cb7b](https://github.com/wazuh/wazuh-splunk/pull/101/commits/509cb7bab923294dcd5c5d2f93fff9425356f056))
- Deprecated interval field in manager configuration cluster section ([#93](https://github.com/wazuh/wazuh-splunk/issues/93))

## Wazuh v3.2.4 - Splunk Enterprise v7.1.1 - Splunk app v3.2.4-rev-6
There are no changes for Splunk app for Wazuh in this version.

## Wazuh v3.2.3 - Splunk Enterprise v7.1.1 - Splunk app v3.2.3-rev-6
### Added
- New About tab ([#67](https://github.com/wazuh/wazuh-splunk/pull/67))
- New GDPR tabs ([#66](https://github.com/wazuh/wazuh-splunk/pull/66))
- New multi Index support ([#79](https://github.com/wazuh/wazuh-splunk/pull/79))
### Changed
- Multi-API support ([#65](https://github.com/wazuh/wazuh-splunk/pull/65))
### Fixed
- First API inserted is now selected by default [#47a1fe7](https://github.com/wazuh/wazuh-splunk/commit/47a1fe71f8b32c27b2ac51c3134b93447bd8d6f4)
- Any API will be inserted if it hasn't connectivity [#47a1fe7](https://github.com/wazuh/wazuh-splunk/commit/47a1fe71f8b32c27b2ac51c3134b93447bd8d6f4)
- Make General dashboard the default one [#2e59564](https://github.com/wazuh/wazuh-splunk/commit/2e595642295b117de67d76e4cd2cc863fa9c5ea7)
- Fixed the case when an already selected index is deleted from cookie [#3024da4](https://github.com/wazuh/wazuh-splunk/commit/3024da4f68b28ab8463c3a5628980138305adb7f)
- Fixed warning message in agent group configuration [#27ab703](https://github.com/wazuh/wazuh-splunk/commit/27ab7033f61476241a4b72bf2af770321a8c853c)
- Added style and alignment to the current selected API and index [#89](https://github.com/wazuh/wazuh-splunk/issues/89)

## Wazuh v3.2.3 - Splunk Enterprise v7.1.1 - Splunk app v3.2.3-rev-5
There are no changes for Splunk app for Wazuh in this version.
## Wazuh v3.2.2 - Splunk Enterprise v7.1.1 - Splunk app v3.2.2
### Added
- Wazuh secured API connections are now supported ([#51](https://github.com/SplunkAppForWazuh/SplunkAppForWazuh-splunk/pull/51)).
- Error notifications with toasts ([#54](https://github.com/SplunkAppForWazuh/SplunkAppForWazuh-splunk/pull/54)).
- New agent group configuration tab added ([#50](https://github.com/SplunkAppForWazuh/SplunkAppForWazuh-splunk/pull/50)).
- Inputs need to be validated before being submitted ([#52](https://github.com/SplunkAppForWazuh/SplunkAppForWazuh-splunk/pull/52)).
### Changed
- Styling improvements ([#57](https://github.com/SplunkAppForWazuh/SplunkAppForWazuh-splunk/pull/57)).
- Users can't navigate over the app without API successful connection.
- Controllers logic refactor.
### Fixed
- Navigation navbar background color fixed.

## Wazuh v3.2.1 - Splunk Enterprise > v6.6.0 - Splunk app v2.2.0
### Added
- New Manager Configuration tab ([#32](https://github.com/SplunkAppForWazuh/SplunkAppForWazuh-splunk/pull/32))
- Dynamic tables([#37](https://github.com/SplunkAppForWazuh/SplunkAppForWazuh-splunk/pull/37))
  - Now the app uses dynamic tables improving the pagination and filtering.
  - Backend endpoints were adapted to pagination and better interaction with Wazuh API.

### Changed
- Performance improvements:
  - Event listeners and unused dependencies were removed
  - Useless tokens deleted
- API Configuration:
  - IP base and port are not required anymore.
  - Status led added in order to check connection.
  - Password field is not shown now.
- View controllers transpiled to ES6 syntax
- Wazuh copyright on each javascript and python file
- Tab distribution redesigned:
  - Deleted redundant Agents summary views and compact them in just one tab
  - Deleted Search on Rules and Search on Decoders tab and compacting all functionalities in Ruleset and Decoders tabs
  - Tab names were renamed
### Fixed
- Ruleset and Decoders search tabs now are able to filter properly.
- SSL Verification Error in lab environment fixed
- Groups: now the content of each individual configuration file is showed up in pretty JSON format properly.
- Splunk queries fixed:
  - Now a query is executed when a Splunk element such tables and tags are clicked
## Wazuh v3.2.1 - Splunk Enterprise > v6.6.0 -  Splunk app v2.1.0
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

## Wazuh v3.2.1 - Splunk Enterprise > v6.6.0 -  Splunk app v2.0.0
### Added
- New Manager Logs tab ([#6](https://github.com/SplunkAppForWazuh/SplunkAppForWazuh-splunk/pull/6)):
  - New module implemented to show Manager logs.
  - Data is fetched directly from Wazuh API.
- Back-end ([#14](https://github.com/SplunkAppForWazuh/SplunkAppForWazuh-splunk/pull/14))
  - Now the Splunk App has its own backend in order to modularize any REST routes it might need.
  -  Several code refactoring for a better handling of possible use cases.
  -  All queries along the App where bootstrapped in order to use the new back-end instead using indexes.

### Changed
- Ruleset and Decoders data will be fetched from API ([#12](https://github.com/SplunkAppForWazuh/SplunkAppForWazuh-splunk/pull/12)):
  - Now the app will avoid indexing Ruleset and Decoders data.
- Manager info will be fetched from API ([#14](https://github.com/SplunkAppForWazuh/SplunkAppForWazuh-splunk/pull/14)):
  - Now the app will avoid indexing Manager info data.
- Agents data will be fetched from API ([#15](https://github.com/SplunkAppForWazuh/SplunkAppForWazuh-splunk/pull/15)):
  - Now the app will avoid indexing Agents info data.
- And the best thing, it's no longer needed any extra index and the TA-wazuh-api-connector anymore.
