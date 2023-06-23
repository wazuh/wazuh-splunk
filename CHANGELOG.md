# Change Log

All notable changes to the Wazuh App for Splunk project will be documented in this file.

<<<<<<< HEAD
## Wazuh v4.6.0 - Splunk Enterprise v8.1.[1-10], v8.2.x - Revision 4600

### Added
- Added support for Wazuh 4.6.0.
- Added Files and Registries limits sections in configurations [#1395](https://github.com/wazuh/wazuh-splunk/pull/1395)

=======
>>>>>>> b76f12d1 (Update CHANGELOG)
## Wazuh v4.5.1 - Splunk Enterprise v8.1.[1-10], v8.2.x - Revision 4502

### Added
- Added support for Wazuh 4.5.1.

## Wazuh v4.5.0 - Splunk Enterprise v8.1.[1-10], v8.2.x - Revision 4501

### Added
- Added support for Wazuh 4.6.0.
- Added Files and Registries limits sections in configurations [#1395](https://github.com/wazuh/wazuh-splunk/pull/1395)

## Wazuh v4.4.5 - Splunk Enterprise v8.1.[1-10], v8.2.x - Revision 4405

### Added
- Added support for Wazuh 4.4.5.

## Wazuh v4.4.4 - Splunk Enterprise v8.1.[1-10], v8.2.x - Revision 4404

### Added
- Added support for Wazuh 4.4.4.

## Wazuh v4.4.3 - Splunk Enterprise v8.1.[1-10], v8.2.x - Revision 4403

### Added
- Added support for Wazuh 4.4.3.

### Changed
- Fixed macOS agent install and restart command  [#1407](https://github.com/wazuh/wazuh-splunk/pull/1407)

## Wazuh v4.4.2 - Splunk Enterprise v8.1.[1-10], v8.2.x - Revision 4402

### Added
- Added support for Wazuh 4.4.2.

## Wazuh v4.4.1 - Splunk Enterprise v8.1.[1-10], v8.2.x - Revision 4401

### Added
- Added support for Wazuh 4.4.1.

## Wazuh v4.4.0 - Splunk Enterprise v8.1.[1-10], v8.2.x - Revision 4400

### Added
- Added agent's synchronization statistics. [#1355](https://github.com/wazuh/wazuh-splunk/pull/1355)

### Changed
- Updated the response handlers for the `/agents/summary/status` endpoint. [#1355](https://github.com/wazuh/wazuh-splunk/pull/1355)

## Wazuh v4.3.11 - Splunk Enterprise v8.1.[1-10], v8.2.x - Revision 4314
### Added

- Support for Wazuh 4.3.11

## Wazuh v4.3.10 - Splunk Enterprise v8.1.[1-10], v8.2.x - Revision 4313
### Added

- Support for Wazuh 4.3.10

## Wazuh v4.3.9 - Splunk Enterprise v8.1.[1-10], v8.2.x - Revision 4312
### Added

- Support for Wazuh 4.3.9
- Support for Splunk 8.2.7.1 & 8.2.8

## Wazuh v4.3.8 - Splunk Enterprise v8.1.[1-10], v8.2.x - Revision 4311
### Added

- Support for Wazuh 4.3.8

## Wazuh v4.3.7 - Splunk Enterprise v8.1.[1-10], v8.2.x - Revision 4310
### Added

- Support for Wazuh 4.3.7

### Fixed
- Fixed the API console suggestions, as they were not working in 4.3.6. [#1359](https://github.com/wazuh/wazuh-splunk/pull/1359)


## Wazuh v4.3.6 - Splunk Enterprise v8.1.[1-10], v8.2.x - Revision 4309
### Added

- Support for Wazuh 4.3.6

### Fixed
- Fixed broken links that did not redirect correctly to the documentation [#1351](https://github.com/wazuh/wazuh-splunk/pull/1351)
- Fixed an error on the DevTools where the payload was not being sent, causing the request to fail. [#1296](https://github.com/wazuh/wazuh-splunk/pull/1296)

### Changed
- Updated documentation links to match their respective title at the Wazuh documentation page [#1351](https://github.com/wazuh/wazuh-splunk/pull/1351)
- Re-allow the use of all tags to filter Wazuh Server logs [#1354](https://github.com/wazuh/wazuh-splunk/pull/1354)

## Wazuh v4.3.5 - Splunk Enterprise v8.1.[1-10], v8.2.x - Revision 4308

### Added
- Support for Wazuh 4.3.5

### Fixed
- Outdated documentation links have been updated [#1290](https://github.com/wazuh/wazuh-splunk/pull/1290)
- The Alerts view from the MITRE section has been hardened in case of errors during the requests to the API (for example timeouts) [#1343](https://github.com/wazuh/wazuh-splunk/pull/1343)

### Changed
- Added the status `Pending` to the Agents sections. [#1292](https://github.com/wazuh/wazuh-splunk/pull/1292)
- Added a disabled state to the `Apply changes` button on the Agents group editor when no changes on the group are made. [#1276](https://github.com/wazuh/wazuh-splunk/pull/1276)

## Wazuh v4.3.4 - Splunk Enterprise v8.1.[1-10], v8.2.x - Revision 4307

### Added
- Support for Wazuh 4.3.4

### Changed
- Improved Splunk search-handler event management to avoid forwarder toast error mis-interpretation. [#1327](https://github.com/wazuh/wazuh-splunk/pull/1327)

### Fixed
- Fixed unhandled expired session when requesting Splunk DB documents. [#1329](https://github.com/wazuh/wazuh-splunk/pull/1329)

## Wazuh v4.3.3 - Splunk Enterprise v8.1.[1-10], v8.2.x - Revision 4306

### Added
- Support for Wazuh 4.3.3

## Wazuh v4.3.2 - Splunk Enterprise v8.1.[1-10], v8.2.x - Revision 4305

### Added
- Support for Wazuh 4.3.2



## Wazuh v4.3.1 - Splunk Enterprise v8.1.[1-10], v8.2.x - Revision 4304

### Added

- Added PowerShell version warning to Windows agent installation wizard [#1322](https://github.com/wazuh/wazuh-splunk/pull/1322)
- Added cursor pointer to Agents table -> SCA [#1328](https://github.com/wazuh/wazuh-splunk/pull/1328)

### Changed

- The compability checks of the App has been changed in order to simplify our release flow. [#1323](https://github.com/wazuh/wazuh-splunk/pull/1323)

### Fixed

- Fixed the render condition of a toast message related to the forwarder when there is no data of agents and the agent deployment guide is displayed in the `Agents` section [#1320](https://github.com/wazuh/wazuh-splunk/pull/1320)
- Fixed the access to `Management/Configuration` due to missing permissions when the manager cluster is disabled [#1318](https://github.com/wazuh/wazuh-splunk/pull/1318)

## Wazuh v4.3.0 - Splunk Enterprise v8.1.4, v8.2.2, v8.2.4 - Revision 4303

### Added

- Support for Wazuh 4.3.0
- Added Alias field to API to facilitate distinguishing between different managers [#1166](https://github.com/wazuh/wazuh-splunk/pull/1166)
- Ensure backwards compatibility [#1126](https://github.com/wazuh/wazuh-splunk/pull/1226)
- Added a Security Section to manage security related configurations [#1148](https://github.com/wazuh/wazuh-splunk/issues/1148)
- Added Crud Policies on security section. [#1171](https://github.com/wazuh/wazuh-splunk/pull/1171)
- Added Crud Roles on security section. [#1168](https://github.com/wazuh/wazuh-splunk/pull/1168)
- Added Crud Role Mapping on security section. [#1169](https://github.com/wazuh/wazuh-splunk/pull/1169)
- Added Crud Users on security section. [#1173](https://github.com/wazuh/wazuh-splunk/pull/1173)
- Created a permissions validation service. [#1147](https://github.com/wazuh/wazuh-splunk/issues/1147)
- Implemented the access control on the App's views. [1164](https://github.com/wazuh/wazuh-splunk/issues/1164)
- Implemented a service to fetch Wazuh's users and its roles. [#1155](https://github.com/wazuh/wazuh-splunk/issues/1155)
- Implemented a server to fetch Splunk's users and its roles. [#1156](https://github.com/wazuh/wazuh-splunk/issues/1156)
- Added a run_as checkbox to the API configuration [#1149](https://github.com/wazuh/wazuh-splunk/issues/1149)
- Added the ability to use the Authorization Context login method. [#1174](https://github.com/wazuh/wazuh-splunk/pull/1174)
- Extensions now can only be changed by Splunk Admins [#1228](https://github.com/wazuh/wazuh-splunk/issues/1228)

### Changed

- Wazuh rebranding [#1186](https://github.com/wazuh/wazuh-splunk/pull/1186)
- Updated deprecated authd options [#1172](https://github.com/wazuh/wazuh-splunk/pull/1172)
- Refactored branding color styles to improve maintainability [#1236](https://github.com/wazuh/wazuh-splunk/pull/1236)
- Changed Wazuh API's name to its alias in the quick settings selector [#1243](https://github.com/wazuh/wazuh-splunk/pull/1243)
- Changed register windows agent command [#1315](https://github.com/wazuh/wazuh-splunk/pull/1315)
- Extended the MITRE alerts section [#1234](https://github.com/wazuh/wazuh-splunk/issues/1234)

### Fixed

- Fixed agent's name overflow in the overview [#1137](https://github.com/wazuh/wazuh-splunk/pull/1137)
- Fixed on save rules or decoders files [#1138](https://github.com/wazuh/wazuh-splunk/pull/1138)
- Fixed unnecessary table requests when resizing browser window [#1141](https://github.com/wazuh/wazuh-splunk/pull/1141)
- Agent counters are now centered [#1215](https://github.com/wazuh/wazuh-splunk/pull/1215)
- Fixed being able to add an agent without create permissions [#1216](https://github.com/wazuh/wazuh-splunk/pull/1216)
- Fixed the underlapping navigation bar for Security options [#1217](https://github.com/wazuh/wazuh-splunk/pull/1217)
- Fixed error when agents view is re-initialized [#1223](https://github.com/wazuh/wazuh-splunk/pull/1223)
- Fixed not being able to see actions after adding first API [#1230](https://github.com/wazuh/wazuh-splunk/pull/1230)
- Fixed agent status chart data disappearing [#1232](https://github.com/wazuh/wazuh-splunk/pull/1232)
- Added data validation to the group creation process [#1256](https://github.com/wazuh/wazuh-splunk/pull/1256)
- Implemented data validation on the CDB lists [#1261](https://github.com/wazuh/wazuh-splunk/pull/1261)
- Fixed the agent status graph so that it shows the correct amount of agents [#1237](https://github.com/wazuh/wazuh-splunk/pull/1237) [#1244](https://github.com/wazuh/wazuh-splunk/pull/1244)
- Fix the sorting on the Groups table columns [#1258](https://github.com/wazuh/wazuh-splunk/pull/1258)
- Fixed non-sortable columns on the Security section tables [1260](https://github.com/wazuh/wazuh-splunk/pull/1260)
- Fixed group report disabled configuration parameter error[#1271](https://github.com/wazuh/wazuh-splunk/pull/1271)
- Fixed import CDB list file [#1266](https://github.com/wazuh/wazuh-splunk/pull/1266)
- Fixed header menu height style issue [#1282](https://github.com/wazuh/wazuh-splunk/pull/1282)
- Fixed an error on the search string used on the Alerts Summary table on the Overview > Vulnerability section, causing the table to showno data [#1283](https://github.com/wazuh/wazuh-splunk/issues/1264)
- Fixed not allowing to see view settings without permission [#1316](https://github.com/wazuh/wazuh-splunk/pull/1316)

## Wazuh v4.2.6 - Splunk Enterprise v8.1.4, v8.2.2 - Revision 4207

### Added

- Support for Wazuh 4.2.6
## Wazuh v4.2.5 - Splunk Enterprise v8.1.4, v8.2.2 - Revision 4206

### Added

- Support for Wazuh 4.2.5

## Wazuh v4.2.4 - Splunk Enterprise v8.1.4, v8.2.2 - Revision 4205

### Added

- Support for Wazuh 4.2.4

## Wazuh v4.2.3 - Splunk Enterprise v8.1.4, v8.2.2 - Revision 4204

### Added

- Support for Wazuh 4.2.3

## Wazuh v4.2.2 - Splunk Enterprise v8.1.4, v8.2.2 - Revision 4203

### Added 

- Added MITRE ATT&CK Framework integration [#1083](https://github.com/wazuh/wazuh-splunk/pull/1083)
- Added MITRE ATT&CK Dashboard integration [#1076](https://github.com/wazuh/wazuh-splunk/pull/1076)
- Added CVE Dashboard [#1109](https://github.com/wazuh/wazuh-splunk/pull/1109)
- Support for Splunk v8.1.4
- Added new source type selector to customize queries used by dashboards [#1104](https://github.com/wazuh/wazuh-splunk/pull/1104)
- Added quick settings to improve the view and selection of API, index, and source type [#1107](https://github.com/wazuh/wazuh-splunk/pull/1107)
- Added requirement service [#1162](https://github.com/wazuh/wazuh-splunk/pull/1162)
- Support for Splunk v8.2.2

### Changed 

- Upgrades jQuery version from 2.1.0 to 3.5.0 [#1118](https://github.com/wazuh/wazuh-splunk/pull/1118)

### Fixed

- Cannot pin search filters on Edge - Chip style collapses [#1070](https://github.com/wazuh/wazuh-splunk/pull/1070)
- Tables without server side pagination [#1074](https://github.com/wazuh/wazuh-splunk/pull/1074)
- Fixed gear icon in fim table [#1077](https://github.com/wazuh/wazuh-splunk/pull/1077)
- Added cache control [#1078](https://github.com/wazuh/wazuh-splunk/pull/1078)
- Fixed error where tables unset their loading state before finishing API calls [#1084](https://github.com/wazuh/wazuh-splunk/pull/1084)
- Fixed search bar queries with spaces  [#1083](https://github.com/wazuh/wazuh-splunk/pull/1083)
- Fixed pinned fields ending with curly brackets [#1083](https://github.com/wazuh/wazuh-splunk/pull/1083)
- Fixed issues for Splunk Cloud compatibility [#1099](https://github.com/wazuh/wazuh-splunk/pull/1099)
- Fixed expand row feature in Agent File Integrity Monitoring [#1112](https://github.com/wazuh/wazuh-splunk/pull/1112)

## Wazuh v4.2.1 - Splunk Enterprise v8.1.2, v8.1.3 - Revision 4202

### Added 

- Support for Wazuh 4.2.1

## Wazuh v4.2.0 - Splunk Enterprise v8.1.2, v8.1.3 - Revision 4201

### Added

- Added error toast in search handler when the connection with forwarder fails [#1021](https://github.com/wazuh/wazuh-splunk/pull/1021)
- Changed query to show alert evolution on discover [#1024](https://github.com/wazuh/wazuh-splunk/pull/1024)
- Added link to agent view in Group Agents table [#1066](https://github.com/wazuh/wazuh-splunk/pull/1066)
- Support for Splunk 8.1.3

### Changed

- Support for Python3 compatibility, deleted deprecated Python2 [#1052](https://github.com/wazuh/wazuh-splunk/pull/1052)
- Applied latest Wazuh API changes to create group request [#1058](https://github.com/wazuh/wazuh-splunk/pull/1058)
### Fixed

- Apply Wazuh tools name changing to the wazuh-splunk [#944](https://github.com/wazuh/wazuh-splunk/issues/944)
- Apply Wazuh daemons name changing to wazuh-splunk [#945](https://github.com/wazuh/wazuh-splunk/issues/945)
- Fixed token cache duration [#1020](https://github.com/wazuh/wazuh-splunk/pull/1020)
- Fixed issue with dynamic columns width for agents PDF report [#1042](https://github.com/wazuh/wazuh-splunk/pull/1042)
- Fixed blocked app when there isn't connection with the API [#1045](https://github.com/wazuh/wazuh-splunk/pull/1045)
- Fixed success toast saving agent configuration file with bad style [#1046](https://github.com/wazuh/wazuh-splunk/pull/1046)
- Minor style fixes [#1059](https://github.com/wazuh/wazuh-splunk/pull/1059)
- Added new error handler to Alerts Configuration views [#1063](https://github.com/wazuh/wazuh-splunk/pull/1063)
- Fixed uncontrolled message error when add api fails [#1069](https://github.com/wazuh/wazuh-splunk/pull/1069)

## Wazuh v4.1.5 - Splunk Enterprise v8.1.2, v8.1.3, v8.1.4 - Revision 71

### Added

- Support for Wazuh v4.1.5
- Support for Splunk v8.1.2
- Support for Splunk v8.1.3
- Support for Splunk v8.1.4
- Added new source type selector to customize queries used by dashboards [#1104](https://github.com/wazuh/wazuh-splunk/pull/1104)
- Added quick settings to improve the view and selection of API, index, and source type [#1107](https://github.com/wazuh/wazuh-splunk/pull/1107)
- Added persitence to modules in overview panel [#1134](https://github.com/wazuh/wazuh-splunk/pull/1134) [#1135](https://github.com/wazuh/wazuh-splunk/pull/1135) [#1146](https://github.com/wazuh/wazuh-splunk/pull/1146)
- Added Agent status visualization on Agents main view [#1140](https://github.com/wazuh/wazuh-splunk/pull/1140)
- Added validation service to compare user permissions to requirements [#1158](https://github.com/wazuh/wazuh-splunk/pull/1158)

### Fixed 

- Fixed missing node name for agent overview [#1103](https://github.com/wazuh/wazuh-splunk/pull/1103)
- Fixed missing columns for some tables in reports [#1103](https://github.com/wazuh/wazuh-splunk/pull/1103)
- Fixed multiple Wazuh API token cache [#1136](https://github.com/wazuh/wazuh-splunk/pull/1136)
- Fixed visualizations buttons tooltip positioning [#1144](https://github.com/wazuh/wazuh-splunk/pull/1144)

## Wazuh v4.1.4 - Splunk Enterprise v8.1.2 - Revision 68

### Added

- Support for Wazuh v4.1.4
- Support for Splunk v8.1.2

### Changed

**Adapt for Wazuh 4.0**
- Support Wazuh API JWT authentication and authorization
- Adapt for deprecated Wazuh API endpoints in 4.0 - #950
- Adapt for Manager endpoints
- Several cosmetic fixes

**Adapt for Wazuh 4.1**
- Adapt for new Manager and Cluster Configuration endpoints
- Adapt for new Ruleset files endpoints
- Adapt for new `syscheck` registry types
- Added registry values for registry key inventory in FIM
- Fixed regex field in Decoder detail
- Fixed search bar on Agents table

## Wazuh v3.13.6 - Splunk Enterprise v8.0.4.1 - Revision 70

### Added

- Support for Wazuh v3.13.6


## Wazuh v3.13.5 - Splunk Enterprise v8.0.4.1 - Revision 69

### Added

- Support for Wazuh v3.13.5


## Wazuh v3.13.4 - Splunk Enterprise v8.0.4.1 - Revision 68

### Added

- Support for Wazuh v3.13.4

## Wazuh v3.13.2 - Splunk Enterprise v8.0.4.1 - Revision 67

### Added

- Support for Wazuh v3.13.2

## Wazuh v3.13.1 - Splunk Enterprise v8.0.4.1 - Revision 65

### Added

- Support for Wazuh v3.13.1
- Support for Splunk v8.0.4

### Fixed

- Update references of the field `vulnerability.reference` to `vulnerability.references` [#931](https://github.com/wazuh/wazuh-splunk/pull/931)
- Fixed wazuh-monitoring indices on Splunk 8.0+ version [#927](https://github.com/wazuh/wazuh-splunk/issues/927)

## Wazuh v3.13.0 - Splunk Enterprise v8.0.2.1 - Revision 63

### Added

- Support for Wazuh v3.13.0


## Wazuh v3.12.3 - Splunk Enterprise v8.0.2.1 - Revision 61

### Added

- Support for Wazuh v3.12.3


## Wazuh v3.12.2 - Splunk Enterprise v8.0.2.1 - Revision 59

### Added

- Support for Wazuh v3.12.2


## Wazuh v3.12.1 - Splunk Enterprise v8.0.2.1 - Revision 58

### Added

- Support for Wazuh v3.12.1
- Added new FIM settings on configuration on demand. [#912](https://github.com/wazuh/wazuh-splunk/issues/912)


## Wazuh v3.12.0 - Splunk Enterprise v8.0.2.1 - Revision 56

### Added

- Support for Wazuh v3.12.0
- Support for Splunk 8.0.2.1
- Added azure-logs wodle configuration section [#860](https://github.com/wazuh/wazuh-splunk/issues/860)
- Added new condition field to SCA tab [#861](https://github.com/wazuh/wazuh-splunk/issues/861)

### Changed

- Changed some ambiguous messages in configuration section [#879](https://github.com/wazuh/wazuh-splunk/issues/879)


## Wazuh v3.11.4 - Splunk Enterprise v8.0.1 - Revision 54

### Added

- Support for Wazuh v3.11.4

## Wazuh v3.11.3 - Splunk Enterprise v8.0.1 - Revision 52

### Added

- Support for Wazuh v3.11.3


## Wazuh v3.11.2 - Splunk Enterprise v8.0.1 - Revision 50

### Added

- Support for Wazuh v3.11.2
- Support for Splunk v8.0.1


## Wazuh v3.11.1 - Splunk Enterprise v7.3.2, v8.0.0 - Revision 48

### Added

- Support for Wazuh v3.11.1


## Wazuh v3.11.0 - Splunk Enterprise v7.3.2, v8.0.0 - Revision 46

### Added

- Support for Wazuh v3.11.0
- Support for Splunk 8.0.0
- Allow upload rules/decoders/CDB-lists files [#828](https://github.com/wazuh/wazuh-splunk/issues/828)
- Added new field for Log collection configuration section  [#845](https://github.com/wazuh/wazuh-splunk/issues/845)

### Changed

- Changed labels configuration table [#846](https://github.com/wazuh/wazuh-splunk/issues/846)
- Adapt Vulnerability Configuration section to its new format [#853](https://github.com/wazuh/wazuh-splunk/issues/853)

### Fixed

- Fixed error when opening empty files [#839](https://github.com/wazuh/wazuh-splunk/issues/839)
- CDB lists section is now showing the correct name of the list [#841](https://github.com/wazuh/wazuh-splunk/issues/841)
- Fix error when exporting group configuration [#834](https://github.com/wazuh/wazuh-splunk/issues/834)
- Fix missing custom integrations [#855](https://github.com/wazuh/wazuh-splunk/issues/855)
- Fix Monitored directories table in agent report [#888](https://github.com/wazuh/wazuh-splunk/issues/888)

## Wazuh v3.10.2 - Splunk Enterprise v8.0.0 - Revision 45

### Added

- Support for Wazuh v3.10.2
- Support for Splunk 8.0.0

## Wazuh v3.10.2 - Splunk Enterprise v7.3.0 / v7.3.1 - Revision 44

### Added

- Support for Wazuh v3.10.2

## Wazuh v3.10.1 - Splunk Enterprise v7.3.0 / v7.3.1 - Revision 43

### Added

- Support for Wazuh v3.10.1

## Wazuh v3.10.0 - Splunk Enterprise v7.3.0 / v7.3.1 - Revision 42

### Added

- Support for Wazuh v3.10.0
- New design and several UI/UX changes. [#726](https://github.com/wazuh/wazuh-splunk/issues/726)
- Adapt Wazuh Splunk APP for Microsoft Edge Browser. [#813](https://github.com/wazuh/wazuh-splunk/issues/813)
- Added an interactive guide for registering agents, things are now easier for the user, guiding it through the steps needed ending in a copy & paste snippet for deploying his agent [#623](https://github.com/wazuh/wazuh-splunk/issues/623)
- Added new dashboards for the recently added regulatory compliance groups into the Wazuh core. They are HIPAA and NIST-800-53. [#705](https://github.com/wazuh/wazuh-splunk/issues/705)
- Export all the information of a Wazuh group and its related agents in a PDF document. [#641](https://github.com/wazuh/wazuh-splunk/issues/641)
- Export the configuration of a certain agent as a PDF document. Supports granularity for exporting just certain sections of the configuration [#640](https://github.com/wazuh/wazuh-splunk/issues/640)
- Added debug level for app logs [#637](https://github.com/wazuh/wazuh-splunk/issues/637)

### Changed
- Improved app performance [#798](https://github.com/wazuh/wazuh-splunk/issues/798)
- APP navigation have been improved using nested states [#669](https://github.com/wazuh/wazuh-splunk/issues/669)
- Reduced Agents preview load time using the new API endpoint /summary/agents [#798](https://github.com/wazuh/wazuh-splunk/issues/798)
- Replaced the requirements slider component with a new styled component [805(https://github.com/wazuh/wazuh-splunk/issues/805)
- Modules are just being shown only when supported by the agent OS. [#753](https://github.com/wazuh/wazuh-splunk/issues/753)

### Fixed
- API sensitive information is now hidden on every transition [#792](https://github.com/wazuh/wazuh-splunk/issues/792)
- Fixed NULL labels in visualizations [#783](https://github.com/wazuh/wazuh-splunk/issues/783)
- Agent data is now being shown correctly when the agent is not active [#748](https://github.com/wazuh/wazuh-splunk/issues/748)
- Devtools content is now successfully loaded [#734](https://github.com/wazuh/wazuh-splunk/issues/734)
- Filters are correctly applied in the search bar [#732](https://github.com/wazuh/wazuh-splunk/issues/732)
- Removed duplicated Log box [#740](https://github.com/wazuh/wazuh-splunk/issues/740)
- Applied the right sorting order on lists [#721](https://github.com/wazuh/wazuh-splunk/issues/721)
- Fixed blank page in Management->Cluster [#734](https://github.com/wazuh/wazuh-splunk/issues/734)
- Cluster is properly validated [#699](https://github.com/wazuh/wazuh-splunk/issues/699)
- Fixed Agents tab navigation using the breadcrumb [#810](https://github.com/wazuh/wazuh-splunk/issues/810)


## Wazuh v3.9.5 - Splunk Enterprise v7.3.0 - Revision 36

### Added

- Support for Wazuh v3.9.5

## Wazuh v3.9.4 - Splunk Enterprise v7.3.0 - Revision 35

### Added

- Support for Wazuh v3.9.4
- Rules and decoders tables now show the path column. [#788](https://github.com/wazuh/wazuh-splunk/issues/788)
- Make level and path clickable columns, then it adds a filter for the table. (Rules/Decoders) [#788](https://github.com/wazuh/wazuh-splunk/issues/788)
- Click on filename to open its content (Ruleset). [#788](https://github.com/wazuh/wazuh-splunk/issues/788)

### Changed
- Overview -> SCA dashboard has been removed. [#788](https://github.com/wazuh/wazuh-splunk/issues/788)
- Overview/Agents -> Policy monitoring dashboards have been refactored. [#788](https://github.com/wazuh/wazuh-splunk/issues/788)

### Fixed
- Fixed error when adding a filter with spaces. [#793](https://github.com/wazuh/wazuh-splunk/issues/793)
- Fixed downloading tables as CSV. [#788](https://github.com/wazuh/wazuh-splunk/issues/788)
- Fixed flick in CDB lists table when deleting a list. [#788](https://github.com/wazuh/wazuh-splunk/issues/788)
- Hide API password from check-connection requests [#792](https://github.com/wazuh/wazuh-splunk/issues/792)

## Wazuh v3.9.3 - Splunk Enterprise v7.3.0 - Revision 34

### Added

- Support for Wazuh v3.9.3

### Changed

 - Extend information for syscollector [#785](https://github.com/wazuh/wazuh-splunk/issues/785)

### Fixed

- Fixed agent bar that was not applying filters correctly when refreshing [#743](https://github.com/wazuh/wazuh-splunk/pull/743).
- Fixed incorrect fields in never connected agents [#750](https://github.com/wazuh/wazuh-splunk/pull/750).
- Box editors without delimited bottom have been fixed [#750](https://github.com/wazuh/wazuh-splunk/pull/750).
- Fixed error message when the app detects an unexpected Wazuh version [#750](https://github.com/wazuh/wazuh-splunk/pull/750).
- Fix Agents > Inventory [#745](https://github.com/wazuh/wazuh-splunk/pull/745).
- Fix Invalid Date message in some browsers dates [e1ccb55](https://github.com/wazuh/wazuh-splunk/commit/e1ccb556c75a807947e3987fbe7a38a0f14ae699).
- Fix ignored in the configuration ondemand [#780](https://github.com/wazuh/wazuh-splunk/pull/780).

## Wazuh v3.9.2 - Splunk Enterprise v7.3.0 - Revision 28

### Added

- Support for Wazuh v3.9.2
- Added overall metrics for Agents > Overview [#725](https://github.com/wazuh/wazuh-splunk/pull/725).

### Fixed

- Fixed visualization for Agents > Overview [#718](https://github.com/wazuh/wazuh-splunk/pull/718).
- Fix error when adding an api with invalid fields format [#729](https://github.com/wazuh/wazuh-splunk/pull/729).
- Fix missing parameters in Dev Tools request [#731](https://github.com/wazuh/wazuh-splunk/pull/731).

## Wazuh v3.9.1 - Splunk Enterprise v7.2.6 / v7.3.0 - Revision 26

### Added

- Support for Splunk Enterprise v7.3.0

### Changed

- Improve dynamic height for configuration editor [#700](https://github.com/wazuh/wazuh-splunk/pull/700).
- Changed the way the app validates the version matching between Wazuh API and the app [#693](https://github.com/wazuh/wazuh-splunk/pull/693).

### Fixed

- Prevent error when `kvStore` is not ready yet [#695](https://github.com/wazuh/wazuh-splunk/pull/695).
- Several UI/UX improvements and fixes for the 3.9.0 latest changes [#686](https://github.com/wazuh/wazuh-splunk/pull/686), [#692](https://github.com/wazuh/wazuh-splunk/pull/692).
- Fixed handled but not shown error messages from rule editor [#697](https://github.com/wazuh/wazuh-splunk/pull/697).
- Fixed infinite API log fetching [#704](https://github.com/wazuh/wazuh-splunk/pull/704).

## Wazuh v3.9.0 - Splunk Enterprise v7.2.4 / v7.2.5 / v7.2.6 - Revision 25

### Added

- Support for Wazuh v3.9.0
- Edit master and worker configuration (
  [#525](https://github.com/wazuh/wazuh-splunk/pull/525),
  [#534](https://github.com/wazuh/wazuh-splunk/pull/534)
  [#572](https://github.com/wazuh/wazuh-splunk/pull/572)
  ).
- Edit local rules, local decoders and CDB lists (
  [#525](https://github.com/wazuh/wazuh-splunk/pull/525),
  [#532](https://github.com/wazuh/wazuhsplunk/pull/532),
  [#501](https://github.com/wazuh/wazuhsplunk/pull/501)
  [#572](https://github.com/wazuh/wazuh-splunk/pull/572)
  )
- Dev Tools additions
- Added hotkey `[shift] + [enter]` for sending query ([#503](https://github.com/wazuh/wazuh-splunk/pull/503)).
- Added `Export JSON` button for the Dev Tools ([#503](https://github.com/wazuh/wazuh-splunk/pull/503)).
- Added configuration assessment information in "Agent > Configuration Assessments" ([#505](https://github.com/wazuh/wazuh-splunk/pull/505)).
- Restart master and worker nodes (
  [#564](https://github.com/wazuh/wazuh-splunk/pull/564)
  [#545](https://github.com/wazuh/wazuh-splunk/pull/545)
  [#535](https://github.com/wazuh/wazuh-splunk/pull/535)
  [#563](https://github.com/wazuh/wazuh-splunk/pull/563)
  ).
- Restart agents ([#556](https://github.com/wazuh/wazuh-splunk/pull/556)).
- Discover function on each section ([#529](https://github.com/wazuh/wazuh-splunk/pull/529)).
- Can pined filters (
  [#529](https://github.com/wazuh/wazuh-splunk/pull/529)
  [#618](https://github.com/wazuh/wazuh-splunk/pull/618)).
- Expand visualizations on the dashboard ([#570](https://github.com/wazuh/wazuh-splunk/pull/570)).
- Reporting as admin extension ([#585](https://github.com/wazuh/wazuh-splunk/pull/585)).
- Delete rules, decoders and CDB lists files ([#589](https://github.com/wazuh/wazuh-splunk/pull/589)).
- Prevent overwrite a existing file ([#589](https://github.com/wazuh/wazuh-splunk/pull/589)).
- Unescape back slash for JSON raw content ([#599](https://github.com/wazuh/wazuh-splunk/pull/599)).
- Capability to edit rules and decoders files (
  [#597](https://github.com/wazuh/wazuh-splunk/pull/597)
  [#613](https://github.com/wazuh/wazuh-splunk/pull/613)
  ).
- Allow navigation throught url ([#596](https://github.com/wazuh/wazuh-splunk/pull/596)).
- Enable back button ([#596](https://github.com/wazuh/wazuh-splunk/pull/596)).
- Capability to hide or show columns (
  [#566](https://github.com/wazuh/wazuh-splunk/pull/566)
  [#614](https://github.com/wazuh/wazuh-splunk/pull/614)
  ).
- Can resize columns (
  [#566](https://github.com/wazuh/wazuh-splunk/pull/566)
  [#614](https://github.com/wazuh/wazuh-splunk/pull/614)
  ).
- Cabability to expand visualizations ([#567](https://github.com/wazuh/wazuh-splunk/pull/567)).
- Set the browser time zone to the report ([#619](https://github.com/wazuh/wazuh-splunk/pull/619)).
- View no local rules/decoders XML files ([#667](https://github.com/wazuh/wazuh-splunk/pull/667)).
- Added some Angular charts in Agents Preview and Agents SCA sections ([#668](https://github.com/wazuh/wazuh-splunk/pull/668)).
- Added Docker listener settings in configuration views ([#665](https://github.com/wazuh/wazuh-splunk/pull/665)).
- Added Docker dashboards for both Agents and Overview ([#665](https://github.com/wazuh/wazuh-splunk/pull/665)).
- New server module, it's a job queue so we can add delayed jobs to be run in background, this iteration only accepts delayed Wazuh API calls ([#629](https://github.com/wazuh/wazuh-splunk/pull/629)).
- Added a dynamic table columns selecto ([#668](https://github.com/wazuh/wazuh-splunk/pull/668)).
- Added resizable columns by dragging in tables ([#668](https://github.com/wazuh/wazuh-splunk/pull/668)).
- Added an info bar when Wazuh is not ready yet in order to prevent App fails. ([#636](https://github.com/wazuh/wazuh-splunk/pull/636)).
- Show follow symbolic link in the configuration ondemand ([#685](https://github.com/wazuh/wazuh-splunk/pull/685)).

### Changed

- Changed empty results message for Wazuh tables ([#487](https://github.com/wazuh/wazuh-splunk/pull/487)).
- Escape XML special characters ([#496](https://github.com/wazuh/wazuh-splunk/pull/496)).
- Allowing the same query multiple times on the Dev Tools ([#503](https://github.com/wazuh/wazuh-splunk/pull/503)).
- Using full height for all containers when possible ([#575](https://github.com/wazuh/wazuh-splunk/pull/575)).
- Changed some visualizations for FIM, GDPR, PCI, Vulnerability and Security Events ([#527](https://github.com/wazuh/wazuh-splunk/pull/527)).
- New design for agent header view ([#575](https://github.com/wazuh/wazuh-splunk/pull/575)).
- Not fetching data the very first time the Dev Tools are opened ([#503](https://github.com/wazuh/wazuh-splunk/pull/503)).
- Store the API database into Splunk KVstore ([#537](https://github.com/wazuh/wazuh-splunk/pull/537)).
- Notification toast types and style([#570](https://github.com/wazuh/wazuh-splunk/pull/570)).
- UI changes for editing groups ([#478](https://github.com/wazuh/wazuh-splunk/pull/478)).
- Use new meaningful toasters ([#591](https://github.com/wazuh/wazuh-splunk/pull/591)).
- Change several descriptions ([#597](https://github.com/wazuh/wazuh-splunk/pull/597)).
- Redisign configuration view ([#597](https://github.com/wazuh/wazuh-splunk/pull/597)).
- Updated autocomplete list in DevTools ([#538](https://github.com/wazuh/wazuh-splunk/pull/538)).
- Modularize some functions ([#601](https://github.com/wazuh/wazuh-splunk/pull/601)).
- View logs as raw text ([#604](https://github.com/wazuh/wazuh-splunk/pull/604)).
- Show logs in a text box ([#604](https://github.com/wazuh/wazuh-splunk/pull/604)).
- Reviewed Osquery dashboards ([#668](https://github.com/wazuh/wazuh-splunk/pull/668)).
- Improve audit dashboards ([#668](https://github.com/wazuh/wazuh-splunk/pull/668)).

### Fixed

- Permit special charsets in API credentials([#578](https://github.com/wazuh/wazuh-splunk/pull/578)).
- Can download API response in Devtools ([#559](https://github.com/wazuh/wazuh-splunk/pull/559)).
- Do not lose the focus of the navbar ([#558](https://github.com/wazuh/wazuh-splunk/pull/558)).
- Polling agents state ([#548](https://github.com/wazuh/wazuh-splunk/pull/548)).
- Reporting ([#504](https://github.com/wazuh/wazuh-splunk/pull/504)).
- Refresh rule info afeter edit it ([#589](https://github.com/wazuh/wazuh-splunk/pull/589)).
- Change the selected index ([#580](https://github.com/wazuh/wazuh-splunk/pull/580)).
- More descriptive error when savinga file and get an error ([#601](https://github.com/wazuh/wazuh-splunk/pull/601)).
- Show success message when group configuration is saved ([#601](https://github.com/wazuh/wazuh-splunk/pull/601)).
- Error when trying to download a CSV file ([#604](https://github.com/wazuh/wazuh-splunk/pull/604)).
- Do not show pagination for one-page tables ([#668](https://github.com/wazuh/wazuh-splunk/pull/668)).
- Show email configuration on the configuration on demand ([#672](https://github.com/wazuh/wazuh-splunk/pull/672)).
- Unify timezone ([#673](https://github.com/wazuh/wazuh-splunk/pull/673)).
- Properly handling long messages on notifier service, until now, they were using out of the card space, also we replaced some API messages with more meaningful messages ([#570](https://github.com/wazuh/wazuh-splunk/pull/570)).
- Adapted Wazuh icon for multiple browsers where it was gone ([#475](https://github.com/wazuh/wazuh-splunk/pull/475)).

## Wazuh v3.8.2 - Splunk Enterprise v7.2.3 - Revision 22

### Added

- Support for Wazuh v3.8.2

### Changed

- Close configuration editor only if it was successfully updated ([7879144c](https://github.com/wazuh/wazuh-splunk/pull/520/commits/7879144ce61ab86b28586cc752ca56723733915c)).

## Wazuh v3.8.1 - Splunk Enterprise v7.2.3 - Revision 21

### Added

- Support for Wazuh v3.8.1

### Changed

- Moved monitored/ignored Windows registry entries to "FIM > Monitored" and "FIM > Ignored" to avoid user confusion ([#508](https://github.com/wazuh/wazuh-splunk/pull/508)).
- Excluding manager from agent monitoring script ([#509](https://github.com/wazuh/wazuh-splunk/pull/509)).

## Wazuh v3.8.0 - Splunk Enterprise v7.2.3 - Revision 20

### Added

- Added group management features such as:
  - Edit the group configuration ([#441](https://github.com/wazuh/splunk/pull/441)).
  - Add/remove groups to/from an agent ([#441](https://github.com/wazuh/splunk/pull/441)).
  - Add/remove agents to/from a group ([#478](https://github.com/wazuh/splunk/pull/478)).
- Add the selected agent to groups from the Agent dashboard ([#414](https://github.com/wazuh/splunk/pull/414)).
- Auto-complete endpoints in Dev Tools section ([#430](https://github.com/wazuh/wazuh-splunk/pull/430)).
- XML editor for group configurations ([#432](https://github.com/wazuh/wazuh-splunk/pull/432)).
- Multi-selector for attaching agents to groups dynamically ([#432](https://github.com/wazuh/wazuh-splunk/pull/432)).
- Generate PDF reports from dashboards ([#446](https://github.com/wazuh/wazuh-splunk/pull/446)).
- New directive for tables that don't need external data sources ([#400](https://github.com/wazuh/wazuh-splunk/pull/400)).
- New search bar directive with interactive filters and suggestions ([#399](https://github.com/wazuh/wazuh-splunk/pull/399)).
- Resizable columns by dragging in Dev-tools ([#430](https://github.com/wazuh/wazuh-splunk/pull/430)).
- Added `audit_key` (Who-data Audit keys) for configuration tab ([#444](https://github.com/wazuh/wazuh-splunk/pull/444)).
- Added app info to settings about section 3.8 enhancement ([#448](https://github.com/wazuh/wazuh-splunk/pull/448)).
- Added maild option to read data from ([#477](https://github.com/wazuh/wazuh-splunk/pull/477)).

### Changed

- Tiny AWS rework ([#450](https://github.com/wazuh/wazuh-splunk/pull/450)).
- Added a new table (network addresses) for agent inventory tab ([#452](https://github.com/wazuh/wazuh-splunk/pull/452)).
- Improved code quality: ESLint convention for JavaScript and pep257 / flake8 for Python ([#416](https://github.com/wazuh/wazuh-splunk/pull/416)).
- Deleted blue loading ring ([#426](https://github.com/wazuh/wazuh-splunk/pull/426)).
- Disabled several extensions by default ([#445](https://github.com/wazuh/wazuh-splunk/pull/445)).
- Updated localfile values in the configuration of an agent ([#451](https://github.com/wazuh/wazuh-splunk/pull/451)).
- Dev tools is now showing the response as it is, like curl does ([#461](https://github.com/wazuh/wazuh-splunk/pull/461)).
- Removed `unknown` as valid node name ([#477](https://github.com/wazuh/wazuh-splunk/pull/477)).
- Agents header. ([#518](https://github.com/wazuh/wazuh-splunk/pull/518)).

### Fixed

- Fixed for mutex methods in database modules ([#442](https://github.com/wazuh/wazuh-splunk/pull/442)).
- UX improvements and fixes ([#434](https://github.com/wazuh/wazuh-splunk/pull/434)).
- Fixed unhandled error with trim() method ([#427](https://github.com/wazuh/wazuh-splunk/pull/427)).
- Fixed undefined error in the agents search bar ([#425](https://github.com/wazuh/wazuh-splunk/pull/425)).
- UX enhancements ([#433](https://github.com/wazuh/wazuh-splunk/pull/433)).
- Fixed schema for `wazuh-monitoring-3x` index ([#436](https://github.com/wazuh/wazuh-splunk/pull/436)).
- Fix overlapped play button in Dev-tools when the input box has a scrollbar ([#430](https://github.com/wazuh/wazuh-splunk/pull/430)).
- Fix Dev-tools behavior when parse json invalid blocks ([#430](https://github.com/wazuh/wazuh-splunk/pull/430)).
- Fix rule details for `list` and `info` parameters ([#477](https://github.com/wazuh/wazuh-splunk/pull/477)).

## Wazuh v3.7.2 - Splunk Enterprise v7.2.1 - Revision 19

There are no changes for Splunk app for Wazuh in this version.

## Wazuh v3.7.1 - Splunk Enterprise v7.2.1 - Revision 18

### Added

- Added administrator mode for Dev Tools module ([#353](https://github.com/wazuh/wazuh-splunk/pull/353)).
- Added extension management features ([#330](https://github.com/wazuh/wazuh-splunk/pull/330)).
- Added native Angular.js md-tooltips ([#362](https://github.com/wazuh/wazuh-splunk/pull/362)).
- Added export as CSV option for multiple tables ([#348](https://github.com/wazuh/wazuh-splunk/pull/348)).
- Added VirusTotal integration ([#340](https://github.com/wazuh/wazuh-splunk/pull/340)).
- Added CIS-CAT integration ([#342](https://github.com/wazuh/wazuh-splunk/pull/342)).
- Added Discover section ([#331](https://github.com/wazuh/wazuh-splunk/pull/331)).

### Changed

- Increased number of rows for syscollector tables ([#358](https://github.com/wazuh/wazuh-splunk/pull/358)).
- Refactored all the configuration sections ([#363](https://github.com/wazuh/wazuh-splunk/pull/363)).
- Improved Overview dashboard cards ([#372](https://github.com/wazuh/wazuh-splunk/pull/372)).

### Fixes

- Fix a bug when using the Agent status monitoring alerts ([#361](https://github.com/wazuh/wazuh-splunk/pull/361)).
- Added missing fields for syscollector network tables ([#359](https://github.com/wazuh/wazuh-splunk/pull/359)).
- Fixed wrong value in a variable from the agents module ([#374](https://github.com/wazuh/wazuh-splunk/pull/374)).
- Updated searches for AWS section ([#374](https://github.com/wazuh/wazuh-splunk/pull/374)).

## Wazuh v3.7.0 - Splunk Enterprise v7.2.0 / Splunk Enterprise v7.2.1 - Revision 17

### Added

- Osquery integration ([#252](https://github.com/wazuh/wazuh-splunk/pull/252)).
- Cluster monitoring ([#246](https://github.com/wazuh/wazuh-splunk/pull/246)).
- Added a node selector for _Management > Status_ section when Wazuh cluster is enabled ([#291](https://github.com/wazuh/wazuh-splunk/pull/291)).
- Added a node selector for _Management > Logs_ section when Wazuh cluster is enabled ([#299](https://github.com/wazuh/wazuh-splunk/pull/299)).

### Changed

- Configuration section ([#261](https://github.com/wazuh/wazuh-splunk/pull/261)).
- FIM section ([#255](https://github.com/wazuh/wazuh-splunk/pull/255)).
- Settings section ([#265](https://github.com/wazuh/wazuh-splunk/pull/265)).
- The `wz-table` directive now checks if a request is aborted ([#301](https://github.com/wazuh/wazuh-splunk/pull/301)).

### Fixes

- Minor fixes.

## Wazuh v3.6.1 - Splunk Enterprise v7.1.3 - Revision 16

### Added

- AWS integration ([#247](https://github.com/wazuh/wazuh-splunk/pull/247)).

### Fixes

- Support for SSL with reverse proxy configuration ([#248](https://github.com/wazuh/wazuh-splunk/pull/248)).
- Minor fixes.

## Wazuh v3.6.1 - Splunk Enterprise v7.1.3 - Revision 15

### Added

- App log section ([#237](https://github.com/wazuh/wazuh-splunk/pull/237)).
- Support for reverse proxy configuration ([#239](https://github.com/wazuh/wazuh-splunk/pull/239)).
- Dev tools ([#233](https://github.com/wazuh/wazuh-splunk/pull/233)).
- Agent inventory section ([#238](https://github.com/wazuh/wazuh-splunk/pull/238)).

### Fixes

- Minor fixes ([#241](https://github.com/wazuh/wazuh-splunk/pull/241)).

## Wazuh v3.6.1 - Splunk Enterprise v7.1.2 - Revision 14

- Support for Wazuh 3.6.1
- Minor fixes.

## Wazuh v3.6.0 - Splunk Enterprise v7.1.2 - Revision 13

- Minor fixes ([#229](https://github.com/wazuh/wazuh-splunk/pull/229)).

## Wazuh v3.6.0 - Splunk Enterprise v7.1.2 - Revision 12

- Support for Wazuh 3.6.0

## Wazuh v3.5.0 - Splunk Enterprise v7.1.2 - Revision 11

- Minor fixes ([#211](https://github.com/wazuh/wazuh-splunk/pull/211)).

## Wazuh v3.5.0 - Splunk Enterprise v7.1.2 - Revision 10

- Support for Wazuh v3.5.0

## Wazuh v3.4.0 - Splunk Enterprise v7.1.2 - Revision 9

There are no changes for Splunk app for Wazuh in this version.

## Wazuh v3.3.0/v3.3.1 - Splunk Enterprise v7.1.1 - Revision 8

### Added

- Support for Wazuh v3.3.1
- Redesigned agents summary dashboard ([#115](https://github.com/wazuh/wazuh-splunk/pull/115)).
- Manager status dashboard redesigned ([#117](https://github.com/wazuh/wazuh-splunk/pull/117)).
- Manager configuration dashboard redesigned ([#120](https://github.com/wazuh/wazuh-splunk/pull/120)).
- Agent group configuration dashboard redesigned ([#122](https://github.com/wazuh/wazuh-splunk/pull/122)).
- Groups configuration dashboard redesigned ([#125](https://github.com/wazuh/wazuh-splunk/pull/125)).
- Rules and decoders dashboards redesigned ([#128](https://github.com/wazuh/wazuh-splunk/pull/128)).
- Logs dashboard redesigned ([#130](https://github.com/wazuh/wazuh-splunk/pull/130)).
- Settings dashboard redesigned ([#133](https://github.com/wazuh/wazuh-splunk/pull/133)).

### Fixed

- Fixed Firefox bug ([#114](https://github.com/wazuh/wazuh-splunk/pull/114)).
- Fixed table filters ([#131](https://github.com/wazuh/wazuh-splunk/pull/131)).
- Minor fixes ([#136](https://github.com/wazuh/wazuh-splunk/pull/136)).

## Wazuh v3.3.0 - Splunk Enterprise v7.1.1 - Revision 7

### Added

- Polling and index agent status data ([#101](https://github.com/wazuh/wazuh-splunk/pull/101)).

### Changed

- Selecting 'wazuh' index when any other is selected ([#100](https://github.com/wazuh/wazuh-splunk/issues/100)).

### Fixed

- Extending response timeout in checking connection endpoint ([#509cb7b](https://github.com/wazuh/wazuh-splunk/pull/101/commits/509cb7bab923294dcd5c5d2f93fff9425356f056)).
- Deprecated interval field in manager configuration cluster section ([#93](https://github.com/wazuh/wazuh-splunk/issues/93)).

## Wazuh v3.2.4 - Splunk Enterprise v7.1.1 - Revision 6

There are no changes for Splunk app for Wazuh in this version.

## Wazuh v3.2.3 - Splunk Enterprise v7.1.1 - Revision 6

### Added

- New About tab ([#67](https://github.com/wazuh/wazuh-splunk/pull/67)).
- New GDPR tabs ([#66](https://github.com/wazuh/wazuh-splunk/pull/66)).
- New multi Index support ([#79](https://github.com/wazuh/wazuh-splunk/pull/79)).

### Changed

- Multi-API support ([#65](https://github.com/wazuh/wazuh-splunk/pull/65)).

### Fixed

- First API inserted is now selected by default [#47a1fe7](https://github.com/wazuh/wazuh-splunk/commit/47a1fe71f8b32c27b2ac51c3134b93447bd8d6f4)
- Any API will be inserted if it hasn't connectivity [#47a1fe7](https://github.com/wazuh/wazuh-splunk/commit/47a1fe71f8b32c27b2ac51c3134b93447bd8d6f4)
- Make General dashboard the default one [#2e59564](https://github.com/wazuh/wazuh-splunk/commit/2e595642295b117de67d76e4cd2cc863fa9c5ea7)
- Fixed the case when an already selected index is deleted from cookie [#3024da4](https://github.com/wazuh/wazuh-splunk/commit/3024da4f68b28ab8463c3a5628980138305adb7f)
- Fixed warning message in agent group configuration [#27ab703](https://github.com/wazuh/wazuh-splunk/commit/27ab7033f61476241a4b72bf2af770321a8c853c)
- Added style and alignment to the current selected API and index [#89](https://github.com/wazuh/wazuh-splunk/issues/89)

## Wazuh v3.2.3 - Splunk Enterprise v7.1.1 - Revision 5

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

- New Manager Configuration tab ([#32](https://github.com/SplunkAppForWazuh/SplunkAppForWazuh-splunk/pull/32)).
- Dynamic tables([#37](https://github.com/SplunkAppForWazuh/SplunkAppForWazuh-splunk/pull/37)).
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

## Wazuh v3.2.1 - Splunk Enterprise > v6.6.0 - Splunk app v2.1.0

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
- Some unused tabs were deleted (Splunk and Tools)

### Fixed

- Ruleset and Decoders search tabs now are able to filter properly.

## Wazuh v3.2.1 - Splunk Enterprise > v6.6.0 - Splunk app v2.0.0

### Added

- New Manager Logs tab ([#6](https://github.com/SplunkAppForWazuh/SplunkAppForWazuh-splunk/pull/6)):.
  - New module implemented to show Manager logs.
  - Data is fetched directly from Wazuh API.
- Back-end ([#14](https://github.com/SplunkAppForWazuh/SplunkAppForWazuh-splunk/pull/14)).
  - Now the Splunk App has its own backend in order to modularize any REST routes it might need.
  - Several code refactoring for a better handling of possible use cases.
  - All queries along the App where bootstrapped in order to use the new back-end instead using indexes.

### Changed

- Ruleset and Decoders data will be fetched from API ([#12](https://github.com/SplunkAppForWazuh/SplunkAppForWazuh-splunk/pull/12)):.
  - Now the app will avoid indexing Ruleset and Decoders data.
- Manager info will be fetched from API ([#14](https://github.com/SplunkAppForWazuh/SplunkAppForWazuh-splunk/pull/14)):.
  - Now the app will avoid indexing Manager info data.
- Agents data will be fetched from API ([#15](https://github.com/SplunkAppForWazuh/SplunkAppForWazuh-splunk/pull/15)):.
  - Now the app will avoid indexing Agents info data.
- And the best thing, it's no longer needed any extra index and the TA-wazuh-api-connector anymore.
