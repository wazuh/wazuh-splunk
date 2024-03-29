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

define(['../../module'], function (app) {
  'use strict'

  class AgentsOverview {
    /**
     * Class Agents Overview
     * @param {*} $stateParams
     * @param {*} extensions
     * @param {*} $scope
     * @param {*} $requestService
     * @param {*} $state
     * @param {*} $notificationService
     * @param {Object} agent
     * @param {Object} groups
     * @param {Object} $mdDialog
     * @param {Object} $groupHandler
     * @param {Object} $dateDiffService
     * @param {Object} $currentDataService
     * @param {Object} $security_service
     */
    constructor(
      $stateParams,
      extensions,
      $scope,
      $requestService,
      $state,
      $notificationService,
      agent,
      groups,
      $mdDialog,
      $groupHandler,
      $dateDiffService,
      $currentDataService,
      $security_service
    ) {
      this.stateParams = $stateParams
      this.scope = $scope
      this.requestService = $requestService
      this.state = $state
      this.notification = $notificationService
      this.agent = agent
      this.extensions = extensions
      this.scope.extensions = angular.copy(this.extensions) // eslint-disable-line
      this.dateDiffService = $dateDiffService
      this.scope.editGroup = false
      this.scope.showRootcheckScan = false
      this.scope.addingGroupToAgent = false
      this.groups = groups
      this.$mdDialog = $mdDialog
      this.groupHandler = $groupHandler
      this.scope.restartInProgress = false
      this.currentDataService = $currentDataService
      this.currentApi = this.currentDataService.getApi()
      this.api = this.currentApi['_key']
      this.scope.extensionsLists = {
        security: false,
        auditing: false,
        threadDetection: false,
        regulatory: false,
      }
      this.excludeModulesByOs = {
        linux: [],
        windows: ['audit', 'oscap', 'docker'],
        darwin: ['audit', 'oscap', 'vuls', 'docker'],
        other: ['audit', 'oscap', 'vuls', 'docker'],
      }

      /* RBAC flags */
      this.isAllowed = (action, resource, params = ['*']) => {
        return $security_service.getPolicy(action, resource, params).isAllowed
      }
      this.scope.canRestartAgent = this.isAllowed(
        'AGENT_RESTART',
        ['AGENT_ID', 'AGENT_GROUP'],
        [this.agent.id]
      )
      this.scope.canModifyGroup = this.isAllowed(
        'AGENT_MODIFY_GROUP',
        ['AGENT_ID', 'AGENT_GROUP'],
        [this.agent.id]
      )
    }

    /**
     * On controller loads
     */
    $onInit() {
      try {
        this.scope.confirmingRestart = false
        this.setAgentPlatform()
        if (
          this.agent &&
          typeof this.agent === 'object' &&
          this.agent.data &&
          typeof this.agent.data.data === 'object'
        ) {
          this.scope.agent = this.agent.data.data.affected_items[0]

          // Capitalize Status
          if (this.scope.agent && this.scope.agent.status) {
            this.scope.agent.status =
              this.scope.agent.status.charAt(0).toUpperCase() +
              this.scope.agent.status.slice(1)
          }

          this.scope.agentOS =
            this.scope.agent &&
            this.scope.agent.os &&
            this.scope.agent.os.name &&
            this.scope.agent.os.version
              ? `${this.scope.agent.os.name || '-'} ${
                  this.scope.agent.os.codename || '-'
                } ${this.scope.agent.os.version || '-'}`
              : 'Unknown'
          this.scope.id = this.stateParams.id
          if (!this.scope.agent.error) {
            this.refreshExtensions()

            this.scope.groups = this.groups.error
              ? []
              : this.groups.data.data.affected_items
                  .map((item) => item.name)
                  .filter(
                    (item) =>
                      this.scope.agent.group &&
                      !this.scope.agent.group.includes(item)
                  )
            this.scope.formatAgentStatus = (agentStatus) =>
              this.formatAgentStatus(agentStatus)
            this.scope.getAgentStatusClass = (agentStatus) =>
              this.getAgentStatusClass(agentStatus)
            this.scope.goGroups = (group) => this.goGroups(group)

            this.scope.searchRootcheck = (term, specificFilter) =>
              this.scope.$broadcast('wazuhSearch', { term, specificFilter })

            this.scope.checkModules = (module) => this.checkModules(module)

            this.scope.switchGroupEdit = () => {
              this.scope.addingGroupToAgent = false
              this.switchGroupEdit()
            }

            this.scope.showConfirmAddGroup = (group) => {
              this.scope.addingGroupToAgent = this.scope.addingGroupToAgent
                ? false
                : group
            }

            this.scope.offsetTimestamp = (text, time) => {
              try {
                return text + this.dateDiffService.setBrowserOffset(time)
              } catch (error) {
                return ''
              }
            }

            this.scope.cancelAddGroup = () =>
              (this.scope.addingGroupToAgent = false)

            this.scope.restart = () => this.restartAgent()
            this.scope.switchRestart = () => this.switchRestart()
            this.scope.showExtensionsLists = (card) =>
              this.showExtensionsLists(card)
            this.scope.toggleExtension = (extension, state) =>
              this.toggleExtension(extension, state)

            this.scope.confirmAddGroup = (group) => {
              this.groupHandler
                .addAgentToGroup(group, this.scope.agent.id)
                .then(() =>
                  this.requestService.apiReq(
                    `/agents?agents_list=${this.scope.agent.id}`
                  )
                )
                .then((response) => {
                  const agent = response.data.data.affected_items[0]
                  this.scope.agent.group = agent.group
                  this.scope.groups = this.scope.groups.filter(
                    (item) => !agent.group.includes(item)
                  )
                  this.scope.addingGroupToAgent = false
                  this.scope.editGroup = false
                  this.notification.showSuccessToast(
                    `Agent ${this.scope.agent.name}(${this.scope.agent.id}) has been added to group ${group}.`
                  )
                  this.scope.$applyAsync()
                })
                .catch((error) => {
                  if (!this.scope.agent) {
                    if ((error || {}).status === -1) {
                      this.scope.emptyAgent = 'Wazuh API timeout.'
                    }
                  }
                  this.scope.editGroup = false
                  this.scope.addingGroupToAgent = false
                  this.notification.showErrorToast(error.message || error)
                })
            }
          }

          if (this.scope.agent.status == 'Never connected') {
            this.scope.agent.os = {
              name: 'Unknown',
              codename: 'Unknown',
              version: 'Unknown',
            }
            this.scope.agent.group = null
            this.scope.agent.lastKeepAlive = 'Never connected'
          }
        } else {
          this.scope.agent = {
            group: null,
            name: 'Unknown',
            id: null,
            status: null,
            ip: 'Unknown',
            os: { name: 'Unknown', codename: 'Unknown', version: 'Unknown' },
            version: 'Unknown',
            dateAdd: 'Unknown',
            lastKeepAlive: 'Unknown',
          }
          if (this.agent.data.error) {
            this.scope.agent.error =
              this.agent.data.message || this.agent.data.error
          } else {
            this.scope.agent = {
              group: null,
              name: 'Unknown',
              id: null,
              status: null,
              ip: 'Unknown',
              os: { name: 'Unknown', codename: 'Unknown', version: 'Unknown' },
              version: 'Unknown',
              dateAdd: 'Unknown',
              lastKeepAlive: 'Unknown',
            }
            if (this.agent.data.error) {
              this.scope.agent.error =
                this.agent.data.message || this.agent.data.error
            } else {
              this.scope.agent.error = 'Unable to load agent data from API'
            }
          }
        }
      } catch (err) {
        console.error(err)
        this.scope.load = false
        this.notification.showErrorToast('Error loading agent data.')
        this.scope.$applyAsync()
      }
    }

    /**
     * Go to a group
     * @param {String} group
     */
    async goGroups(group) {
      try {
        this.groupInfo = await this.requestService.apiReq(`/groups`)
        if (
          typeof this.groupInfo.data === 'object' &&
          typeof this.groupInfo.data.data === 'object'
        ) {
          this.groupData = this.groupInfo.data.data.affected_items.filter(
            (item) => item.name === group
          )
        } else if (
          !this.groupInfo ||
          !this.groupInfo.data ||
          !this.groupInfo.data.data ||
          this.groupInfo.data.error
        ) {
          throw Error('Cannot load group data')
        }
        this.state.go(`mg-groups`, { group: this.groupData[0] })
      } catch (err) {
        this.notification.showErrorToast(
          'Error fetching group data.',
          err.message || err
        )
      }
    }

    /**
     * Checks and returns agent status
     * @param {Array} agentStatus
     */
    formatAgentStatus(agentStatus) {
      return ['Active', 'Disconnected'].includes(agentStatus)
        ? agentStatus
        : 'Never connected'
    }

    /**
     * Returns a class depending of the agent state
     * @param {String} agentStatus
     */
    getAgentStatusClass(agentStatus) {
      return agentStatus === 'Active' ? 'teal' : 'red'
    }

    /**
     * Switch editing group
     */
    switchGroupEdit() {
      this.scope.editGroup = !!!this.scope.editGroup
      this.scope.$applyAsync()
    }

    /**
     * Restart the agent
     */
    async restartAgent() {
      try {
        this.scope.restartInProgress = true
        const id = this.scope.agent.id
        const name = this.scope.agent.name
        const result = await this.requestService.apiReq(
          `/agents/${id}/restart`,
          {},
          'PUT'
        )
        if (result && result.data.error === 0 && !result.data.failed_ids) {
          this.notification.showSimpleToast(
            `Agent ${name}(${id}) is restarting.`
          )
        } else {
          this.notification.showErrorToast(
            `Agent ${name}(${id}) could not be restarted.`
          )
        }
        this.scope.restartInProgress = false
      } catch (error) {
        this.scope.restartInProgress = false
        this.notification.showErrorToast(`Error restarting agent: ${error}`)
      }
    }

    switchRestart() {
      this.scope.confirmingRestart = !this.scope.confirmingRestart
      this.scope.$applyAsync()
    }

    /**
     * Shows the extensions list to enable or disable them
     */
    showExtensionsLists(card) {
      try {
        this.scope.extensionsLists[card]
          ? (this.scope.extensionsLists[card] = false)
          : (this.scope.extensionsLists[card] = true)
      } catch (error) {
        console.error('Error showing or hiding the extensions list ', error)
      }
    }

    /**
     * Enable or disable extension
     * @param {String} extension
     * @param {String} state
     */
    toggleExtension(extension, state) {
      try {
        this.extensions[extension] = state.toString()
        this.currentDataService.setExtensionsById(this.api, this.extensions)
        this.extensions = this.currentDataService.getExtensionsById(this.api)
        this.refreshExtensions()
      } catch (error) {
        console.error(error)
        this.notification.showErrorToast(error)
      }
    }

    /**
     * Sets the agent's platform
     */
    setAgentPlatform() {
      try {
        this.scope.agentPlatform = 'other'
        const agentInfo =
          ((((this.agent || []).data || {}).data || {}).affected_items ||
            [])[0] || {}
        let agentPlatformLinux = ((agentInfo || {}).os || {}).uname
        let agentPlatformOther = ((agentInfo || {}).os || {}).platform
        if (agentPlatformLinux && agentPlatformLinux.includes('Linux')) {
          this.scope.agentPlatform = 'linux'
        }
        if (agentPlatformOther && agentPlatformOther === 'windows') {
          this.scope.agentPlatform = 'windows'
        }
        if (agentPlatformOther && agentPlatformOther === 'darwin') {
          this.scope.agentPlatform = 'darwin'
        }
      } catch (error) {
        this.notification.showErrorToast('Cannot set OS platform.')
      }
    }

    /**
     * Refresh the extensions
     */
    refreshExtensions() {
      const keys = Object.keys(this.extensions)
      keys.map(
        (key) => (this.scope.extensions[key] = this.extensions[key] === 'true')
      )
      /*
      keys.map(key =>
        this.scope.extensions[key] =  this.extensions[key] === 'true'
      )
      */
      this.scope.$applyAsync()
    }
    /**
     * Checks if the module is enabled
     * @param {String} module
     */
    checkModules(module) {
      const enable =
        !this.excludeModulesByOs[this.scope.agentPlatform].includes(module)
      return enable
    }
  }

  app.controller('agentsOverviewCtrl', AgentsOverview)
})
