/*
 * Wazuh app - Agents controller
 * Copyright (C) 2015-2019 Wazuh, Inc.
 *
 * This program is free software you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

define(['../../module', '../../../utils/config-handler'], function(
  controllers,
  ConfigHandler
) {
  'use strict'

  class ConfigurationController {
    /**
     *
     * @param {*} $scope
     * @param {*} $requestService
     * @param {*} $state
     * @param {*} $stateParams
     * @param {*} $currentDataService
     * @param {*} $beautifierJson
     * @param {*} $notificationService
     * @param {*} $reportingService
     * @param {Object} data
     * @param {Object} agent
     */
    constructor(
      $scope,
      $requestService,
      $state,
      $stateParams,
      $currentDataService,
      $beautifierJson,
      $notificationService,
      $reportingService,
      data,
      agent
    ) {
      this.api = $currentDataService.getApi()
      this.reportingService = $reportingService
      this.$scope = $scope
      this.agent = agent
      this.$scope.currentAgent = this.agent.data.data
      this.errorHandler = $notificationService
      this.apiReq = $requestService
      this.state = $state
      this.$scope.load = false
      this.id = $stateParams.id || $currentDataService.getCurrentAgent()
      this.$scope.isArray = Array.isArray
      this.configurationHandler = new ConfigHandler(
        this.apiReq,
        $beautifierJson,
        this.errorHandler
      )
      this.$scope.currentConfig = null
      this.$scope.configurationTab = ''
      this.$scope.configurationSubTab = ''
      this.$scope.integrations = {}
      this.$scope.selectedItem = 0
      this.$scope.isSynchronized =
        data && data.data && data.data.data && data.data.data.synced
    }

    /**
     * On controller loads
     */
    $onInit() {
      this.$scope.showingInfo = false
      this.$scope.showInfo = () => this.showInfo()
      this.$scope.goToEdition = false
      this.$scope.agent =
        this.agent && this.agent.data && this.agent.data.data
          ? this.agent.data.data
          : { error: true }
      if (
        this.agent.data.data &&
        this.agent.data.data.os &&
        this.agent.data.data.os.uname
      ) {
        this.$scope.isLinux = this.agent.data.data.os.uname.includes('Linux')
      }

      this.$scope.getAgentStatusClass = agentStatus =>
        agentStatus === 'Active' ? 'teal' : 'red'
      this.$scope.formatAgentStatus = agentStatus => {
        return ['Active', 'Disconnected'].includes(agentStatus)
          ? agentStatus
          : 'Never connected'
      }
      this.$scope.getXML = () => this.configurationHandler.getXML(this.$scope)
      this.$scope.getJSON = () => this.configurationHandler.getJSON(this.$scope)
      this.$scope.isString = item => typeof item === 'string'
      this.$scope.hasSize = obj =>
        obj && typeof obj === 'object' && Object.keys(obj).length
      this.$scope.switchConfigTab = (configurationTab, sections) =>
        this.configurationHandler.switchConfigTab(
          configurationTab,
          sections,
          this.$scope,
          this.id, // Send the agent id
          false // Send node as false
        )
      this.$scope.switchWodle = wodleName =>
        this.configurationHandler.switchWodle(wodleName, this.$scope, this.id)
      this.$scope.switchConfigurationTab = async configurationTab => {
        if (configurationTab === 'welcome') {
          this.$scope.isSynchronized = await this.checkAgentSync()
        }
        this.configurationHandler.switchConfigurationTab(
          configurationTab,
          this.$scope
        )
      }

      this.$scope.switchConfigurationSubTab = configurationSubTab =>
        this.configurationHandler.switchConfigurationSubTab(
          configurationSubTab,
          this.$scope
        )
      this.$scope.updateSelectedItem = i => (this.$scope.selectedItem = i)
      this.$scope.getIntegration = list =>
        this.configurationHandler.getIntegration(list, this.$scope)
      this.$scope.goGroups = group => this.goGroups(group)

      this.$scope.initReportConfig = () => this.initReportConfig()
    }

    /**
     * Navigates to a group
     * @param {String} group
     */
    async goGroups(group) {
      try {
        const groupInfo = await this.apiReq.apiReq(`/agents/groups/`)
        const groupData = groupInfo.data.data.items.filter(
          item => item.name === group
        )
        if (
          !groupInfo ||
          !groupInfo.data ||
          !groupInfo.data.data ||
          groupInfo.data.error
        ) {
          throw Error('Missing fields')
        }
        this.state.go(`mg-groups`, { group: groupData[0] })
      } catch (err) {
        this.errorHandler.showSimpleToast('Error fetching group data')
      }
    }

    /**
     * Show or hide sidebar with info
     */
    showInfo() {
      this.$scope.showingInfo = !this.$scope.showingInfo
      this.$scope.$applyAsync()
    }


    /**
     * 
     */
    async initReportConfig(){
      const data = {
        configurations: [

          {
            title: 'Main configurations',
            sections: [
              {
                subtitle: 'Global configuration',
                desc: 'Logging settings that apply to the agent',
                config: [{ component: 'com', configuration: 'logging' }],
                labels : {
                  plain: 'Write internal logs in plain text',
                  json: 'Write internal logs in JSON format',
                  server: 'List of managers to connect',
                  address: "Address",
                  port : "Port",
                  protocol : "Protocol"
                }
              },
              {
                subtitle: 'Communication',
                desc: 'Settings related to the connection with the manager',
                config: [{ component: 'agent', configuration: 'client' }],
                labels :{
                  crypto_method: 'Method used to encrypt communications',
                  auto_restart:
                    'Auto-restart the agent when receiving valid configuration from manager',
                  notify_time:
                    'Time (in seconds) between agent checkings to the manager',
                  'time-reconnect':
                    'Time (in seconds) before attempting to reconnect',
                  server: 'List of managers to connect',
                  'config-profile': 'Configuration profiles',
                  remote_conf: 'Remote configuration is enabled'
                }
              },
              {
                subtitle: 'Anti-flooding settings',
                desc: 'Agent bucket parameters to avoid event flooding',
                config: [{ component: 'agent', configuration: 'buffer' }],
                labels : {
                  disabled: 'Buffer enabled',
                  queue_size: 'Queue size',
                  events_per_second: 'Events per second'
                }
              },
              {
                subtitle: 'Labels',
                desc:
                  'User-defined information about the agent included in alerts',
                config: [{ component: 'agent', configuration: 'labels' }]
              }
            ]
          },
          {
            title: 'Auditing and policy monitoring',
            sections: [
              {
                subtitle: 'Policy monitoring',
                desc:
                  'Configuration to ensure compliance with security policies, standards and hardening guides',
                config: [
                  { component: 'syscheck', configuration: 'rootcheck' },
                  { component: 'wmodules', configuration: 'wmodules' }
                ],
                labels : {
                  system_audit: 'System audit',
                  disabled: 'Policy monitoring service enabled',
                  base_directory: 'Base directory',
                  rootkit_files: 'Rootkit files database path',
                  rootkit_trojans: 'Rootkit trojans database path',
                  scanall: 'Scan the entire system',
                  skip_nfs: 'Skip scan on CIFS/NFS mounts',
                  frequency: 'Frequency (in seconds) to run the scan',
                  check_dev: 'Check /dev path',
                  check_files: 'Check files',
                  check_if: 'Check network interfaces',
                  check_pids: 'Check processes IDs',
                  check_ports: 'Check network ports',
                  check_sys: 'Check anomalous system objects',
                  check_trojans: 'Check trojans',
                  check_unixaudit: 'Check UNIX audit',
                  enabled: 'Security configuration assessment enabled',
                  scan_on_start: 'Scan on start',
                  interval: 'Interval',
                  policies: 'Policies'
                }
              },
                  {
                    subtitle: 'Configuration assessment',
                    desc:
                      'Configuration Assessment',
                    wodle : 'sca',
                    labels : {
                      enabled: 'Security configuration assessment enabled',
                      scan_on_start: 'Scan on start',
                      interval: 'Interval',
                      policies: 'Policies',
                      skip_nfs: 'Skip nfs',
                    }       
                  },
              {
                subtitle: 'OpenSCAP',
                desc:
                  'Configuration assessment and automation of compliance monitoring using SCAP checks',
                wodle: 'open-scap',
                labels : {
                  content: 'Evaluations',
                  disabled: 'OpenSCAP integration enabled',
                  'scan-on-start': 'Scan on start',
                  interval: 'Interval',
                  timeout: 'Timeout (in seconds)'
                }
              },
              {
                subtitle: 'CIS-CAT',
                desc:
                  'Configuration assessment using CIS scanner and SCAP checks',
                wodle: 'cis-cat',
                labels : {
                  disabled: 'CIS-CAT integration enabled',
                  'scan-on-start': 'Scan on start',
                  interval: 'Interval',
                  java_path: 'Path to Java executable directory',
                  ciscat_path: 'Path to CIS-CAT executable directory',
                  timeout: 'Timeout (in seconds)',
                  content: 'Benchmarks',
                  wday : 'Day of the week to run scans',
                  time : 'Time of the day to run scans'
                }
              }
            ]
          },
          {
            title: 'System threats and incident response',
            sections: [
              {
                subtitle: 'Osquery',
                desc:
                  'Expose an operating system as a high-performance relational database',
                wodle: 'osquery',
                labels : {
                  disabled: 'Osquery integration enabled',
                  run_daemon: 'Auto-run the Osquery daemon',
                  add_labels: 'Use defined labels as decorators',
                  log_path: 'Path to the Osquery results log file',
                  config_path: 'Path to the Osquery configuration file'
                }
              },
              {
                subtitle: 'Inventory data',
                desc:
                  'Gather relevant information about system OS, hardware, networking and packages',
                wodle: 'syscollector',
                labels : {
                  disabled: 'Syscollector integration enabled',
                  'scan-on-start': 'Scan on start',
                  interval: 'Interval',
                  network: 'Scan network interfaces',
                  os: 'Scan operating system info',
                  hardware: 'Scan hardware info',
                  packages: 'Scan installed packages',
                  ports: 'Scan listening network ports',
                  ports_all: 'Scan all network ports',
                  processes: 'Scan current processes'
                }
              },
              {
                subtitle: 'Active response',
                desc: 'Active threat addressing by inmmediate response',
                config: [{ component: 'com', configuration: 'active-response' }],
                labels : {
                  disabled: 'Active response enabled',
                  ca_store: 'Use the following list of root CA certificates',
                  ca_verification: 'Validate WPKs using root CA certificate'
                }
              },
              {
                subtitle: 'Commands',
                desc: 'Configuration options of the Command wodle',
                wodle: 'command',
                labels : {
                  disabled: 'Command enabled',
                  run_on_start: 'Run on start',
                  ignore_output: 'Ignore command output',
                  skip_verification: 'Ignore checksum verification',
                  interval: 'Interval',
                  tag: 'Command name',
                  command: 'Command to execute',
                  verify_md5: 'Verify MD5 sum',
                  verify_sha1: 'Verify SHA1 sum',
                  verify_sha256: 'Verify SHA256 sum'
                }
              },
              {
                subtitle: 'Docker listener',
                desc:
                  'Monitor and collect the activity from Docker containers such as creation, running, starting, stopping or pausing events',
                wodle: 'docker-listener',
                labels : {
                  disabled: 'Docker listener enabled',
                  run_on_start:
                    'Run the listener immediately when service is started',
                  interval: 'Waiting time to rerun the listener in case it fails',
                  attempts: 'Number of attempts to execute the listener'
                }
              }
            ]
          },
          {
            title: 'Log data analysis',
            sections: [
              {
                subtitle: 'Log collection',
                desc:
                  'Log analysis from text files, Windows events or syslog outputs',
                config: [
                  { component: 'logcollector', configuration: 'localfile', filterBy : 'logformat' },
                  { component: 'logcollector', configuration: 'socket' }
                ],
                labels : {
                  logformat: 'Log format',
                  command: 'Command',
                  syslog : 'Logs',
                  full_command : "Full command",
                  alias: 'Command alias',
                  ignore_binaries: 'Ignore binaries',
                  target: 'Targets',
                  frequency: 'Frequency',
                  file: 'Log location'
                }
              },
              {
                subtitle: 'Integrity monitoring',
                desc:
                  'Identify changes in content, permissions, ownership, and attributes of files',
                config: [{ component: 'syscheck', configuration: 'syscheck' }],
                labels : {
                  disabled: 'Integrity monitoring enabled',
                  frequency: 'Interval (in seconds) to run the integrity scan',
                  skip_nfs: 'Skip scan on CIFS/NFS mounts',
                  scan_on_start: 'Scan on start',
                  directories: 'Monitored directories',
                  nodiff: 'No diff directories',
                  ignore: 'Ignored files and directories',
                  restart_audit: 'Restart audit',
                  startup_healthcheck: 'Startup healthcheck',
                  whodata : 'Whodata'
                }
              }
            ]
          }
        ]
      }


      this.reportingService.reportAgentConfiguration(this.id,data,this.api)



    }

    /**
     * Checks if the agent is synchronized
     */
    async checkAgentSync() {
      try {
        const sync = await this.apiReq.apiReq(
          `/agents/${this.$scope.agent.id}/group/is_sync`
        )
        return sync.data.data.synced
      } catch (error) {
        return false
      }
    }
  }

  controllers.controller('configurationAgentCtrl', ConfigurationController)
})
