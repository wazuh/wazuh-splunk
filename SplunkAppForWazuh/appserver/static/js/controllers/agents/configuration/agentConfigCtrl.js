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

define(['../../module', '../../../utils/config-handler'], function (
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
      this.$scope.currentAgent = this.agent.data.data.affected_items[0]
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
        data &&
        data.data &&
        data.data.data &&
        data.data.data.affected_items &&
        data.data.data.affected_items.length &&
        data.data.data.affected_items[0].synced
      this.excludeModulesByOs = {
        linux: [],
        windows: ['audit', 'oscap', 'docker'],
        darwin: ['audit', 'oscap', 'vuls', 'docker'],
        other: ['audit', 'oscap', 'vuls', 'docker'],
      }

      this.$scope.selectedOptions = {
        globalConf: true,
        communicationConf: true,
        antiFloodingConf: true,
        labels: true,
        pmConf: true,
        openscapConf: true,
        ciscatConf: true,
        osqueryConf: true,
        inventoryConf: true,
        activeResponseConf: true,
        commandsConf: true,
        dockerListenerConf: true,
        logCollectionConf: true,
        integrityMonitoringConf: true,
      }

      this.$scope.isManager = false
      this.$scope.canReadAgents = true // controlled on the parent view (agents)
      this.$scope.$on('loadingReporting', (event, data) => {
        this.$scope.loadingReporting = data.status
      })
    }

    /**
     * On controller loads
     */
    $onInit() {
      this.$scope.showingInfo = false
      this.setAgentPlatform()
      this.$scope.showInfo = () => this.showInfo()
      this.$scope.showModulesToExport = () => this.showModulesToExport()
      this.$scope.selectAll = (value) => this.selectAll(value)
      this.$scope.checkAllDisabled = () => this.checkAllDisabled()
      this.$scope.keyEquivalences = (key) => this.keyEquivalences(key)
      this.$scope.showConfigCheck = (key) => this.showConfigCheck(key)
      this.$scope.goToEdition = false
      this.$scope.agent =
        this.agent && this.agent.data && this.agent.data.data
          ? this.agent.data.data.affected_items[0]
          : { error: true }

      // Capitalize Status
      if (this.$scope.agent && this.$scope.agent.status) {
        this.$scope.agent.status =
          this.$scope.agent.status.charAt(0).toUpperCase() +
          this.$scope.agent.status.slice(1)
      }

      this.$scope.getAgentStatusClass = (agentStatus) =>
        agentStatus === 'Active' ? 'teal' : 'red'
      this.$scope.formatAgentStatus = (agentStatus) => {
        return ['Active', 'Disconnected'].includes(agentStatus)
          ? agentStatus
          : 'Never connected'
      }
      this.$scope.getXML = () => this.configurationHandler.getXML(this.$scope)
      this.$scope.getJSON = () => this.configurationHandler.getJSON(this.$scope)
      this.$scope.isString = (item) => typeof item === 'string'
      this.$scope.hasSize = (obj) =>
        obj && typeof obj === 'object' && Object.keys(obj).length
      this.$scope.switchConfigTab = (configurationTab, sections) =>
        this.configurationHandler.switchConfigTab(
          configurationTab,
          sections,
          this.$scope,
          this.id, // Send the agent id
          false // Send node as false
        )
      this.$scope.switchWodle = (wodleName) =>
        this.configurationHandler.switchWodle(wodleName, this.$scope, this.id)
      this.$scope.switchConfigurationTab = async (configurationTab) => {
        if (configurationTab === 'welcome') {
          this.$scope.isSynchronized = await this.checkAgentSync()
        }
        this.configurationHandler.switchConfigurationTab(
          configurationTab,
          this.$scope
        )
      }

      this.$scope.switchConfigurationSubTab = (configurationSubTab) =>
        this.configurationHandler.switchConfigurationSubTab(
          configurationSubTab,
          this.$scope
        )
      this.$scope.updateSelectedItem = (i) => (this.$scope.selectedItem = i)
      this.$scope.getIntegration = (list) =>
        this.configurationHandler.getIntegration(list, this.$scope)
      this.$scope.goGroups = (group) => this.goGroups(group)

      this.$scope.initReportConfig = () => this.initReportConfig()
    }

    /**
     * Navigates to a group
     * @param {String} group
     */
    async goGroups(group) {
      try {
        const groupInfo = await this.apiReq.apiReq(`/groups/`)
        const groupData = groupInfo.data.data.affected_items.filter(
          (item) => item.name === group
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
     * Shows the popover to select the modules
     */
    showModulesToExport() {
      this.$scope.exportConfig = !this.$scope.exportConfig
      this.$scope.$applyAsync()
    }

    /**
     * Initializes the report
     */
    async initReportConfig() {
      /*
      this.selectedOptions = {'globalConf' : 1,
      'communicationConf' : 1,
      'antiFloodingConf' : 1,
      'labels' : 1,
      'pmConf' : 1,
      'configAssessment' :1,
      'openscapConf' : 1,
      'ciscatConf' : 1,
      'osqueryConf' : 1,
      'inventoryConf' : 1,
      'activeResponseConf' : 1,
      'commandsConf' : 1,
      'dockerListenerConf' : 1,
      'logCollectionConf' : 1,
      'integrityMonitoringConf' : 1}
*/

      /**
       * If it's not Linux, docker and openscape are set to false by default so these configurations are not printed.
       */
      if (this.$scope.agentPlatform !== 'linux') {
        this.$scope.selectedOptions['dockerListenerConf'] = false
        this.$scope.selectedOptions['openscapConf'] = false
      }

      if (!this.$scope.loadingReporting)
        this.reportingService.reportAgentConfiguration(
          this.id,
          this.$scope.selectedOptions,
          this.api
        )
      this.$scope.exportConfig = false
    }

    /**
     * Selects all the modules to export the configuration
     */
    selectAll(value) {
      try {
        Object.keys(this.$scope.selectedOptions).forEach((key) => {
          this.$scope.selectedOptions[key] = value
        })
      } catch (error) {
        this.$notificationService.showErrorToast('Cannot select the modules')
      }
    }

    checkAllDisabled() {
      try {
        let result = false
        Object.keys(this.$scope.selectedOptions).forEach((key) => {
          if (this.$scope.selectedOptions[key]) {
            result = true
          }
        })
        return !result
      } catch (error) {
        this.$notificationService.showErrorToast(
          'Error checking selected options'
        )
      }
    }

    /**
     * Checks if the agent is synchronized
     */
    async checkAgentSync() {
      try {
        const sync = await this.apiReq.apiReq(
          `/agents/${this.$scope.agent.id}/group/is_sync`
        )
        return sync.data.data.affected_items[0].synced
      } catch (error) {
        return false
      }
    }

    /**
     * Sets the agent's platform
     */
    setAgentPlatform() {
      try {
        this.$scope.agentPlatform = 'other'
        let agentPlatformLinux = (
          ((((this.agent || {}).data || {}).data || {}).affected_items[0] || {})
            .os || {}
        ).uname
        let agentPlatformOther = (
          ((((this.agent || {}).data || {}).data || {}).affected_items[0] || {})
            .os || {}
        ).platform
        if (agentPlatformLinux && agentPlatformLinux.includes('Linux')) {
          this.$scope.agentPlatform = 'linux'
        }
        if (agentPlatformOther && agentPlatformOther === 'windows') {
          this.$scope.agentPlatform = 'windows'
        }
        if (agentPlatformOther && agentPlatformOther === 'darwin') {
          this.$scope.agentPlatform = 'darwin'
        }
      } catch (error) {
        this.errorHandler.showErrorToast('Cannot set OS platform.')
      }
    }

    /*
     * Returns true
     */
    showConfigCheck(key) {
      if (key === 'dockerListenerConf' || key === 'openscapConf') {
        if (this.$scope.agentPlatform === 'linux') {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    }

    /*
     * Get the key equivalences
     */
    keyEquivalences(key) {
      const options = {
        globalConf: 'Global configuration',
        communicationConf: 'Communication',
        antiFloodingConf: 'Anti-flooding settings',
        labels: 'Labels',
        pmConf: 'Policy monitoring',
        openscapConf: 'OpenSCAP',
        ciscatConf: 'CIS-CAT',
        osqueryConf: 'Osquery',
        inventoryConf: 'Inventory data',
        activeResponseConf: 'Active response',
        commandsConf: 'Commands',
        dockerListenerConf: 'Docker listener',
        logCollectionConf: 'Log collection',
        integrityMonitoringConf: 'Integrity monitoring',
      }
      return options[key] || key
    }
  }

  controllers.controller('configurationAgentCtrl', ConfigurationController)
})
