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
      data,
      agent
    ) {
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
      this.excludeModulesByOs = {
        'linux': [],
        'windows': ['audit', 'oscap', 'vuls', 'docker'],
        'darwing': ['audit', 'oscap', 'vuls', 'docker'],
        'other': ['audit', 'oscap', 'vuls', 'docker']
      }
    }

    /**
     * On controller loads
     */
    $onInit() {
      this.$scope.showingInfo = false
      this.setAgentPlatform()
      this.$scope.showInfo = () => this.showInfo()
      this.$scope.goToEdition = false
      this.$scope.agent =
        this.agent && this.agent.data && this.agent.data.data
          ? this.agent.data.data
          : { error: true }

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

    /**
     * Sets the agent's platform
     */
    setAgentPlatform() {
      try {
        this.$scope.agentPlatform = 'other'
        if (this.agent.data.data.os.uname.includes('Linux')) {
          this.$scope.agentPlatform = 'linux'
        }
        if (this.agent.data.data.os.platform === 'windows') {
          this.$scope.agentPlatform = 'windows'
        }
        if (this.agent.data.data.os.platform === 'darwing') {
          this.$scope.agentPlatform = 'darwing'
        }
      } catch (error) {
        this.errorHandler.showErrorToast('Cannot set OS platform.')
      }
    }
  }

  controllers.controller('configurationAgentCtrl', ConfigurationController)
})
