/*
 * Wazuh app - Agents controller
 * Copyright (C) 2018 Wazuh, Inc.
 *
 * This program is free software you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

define(['../../module'], function(app) {
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
      $groupHandler
    ) {
      this.stateParams = $stateParams
      this.scope = $scope
      this.requestService = $requestService
      this.state = $state
      this.notificationService = $notificationService
      this.agent = agent
      this.extensions = extensions
      this.scope.editGroup = false
      this.groups = groups
      this.$mdDialog = $mdDialog
      this.groupHandler = $groupHandler
    }

    /**
     * On controller loads
     */
    $onInit() {
      if (
        this.agent.length &&
        typeof this.agent[0] === 'object' &&
        this.agent[0].data &&
        typeof this.agent[0].data.data === 'object'
      ) {
        this.scope.agent = this.agent[0].data.data
        //Check OS type
        if (this.agent[0].data.data && this.agent[0].data.data.os && this.agent[0].data.data.os.uname) {
          this.scope.isLinux = this.agent[0].data.data.os.uname.includes("Linux")
        }
        if (this.scope.agent.status == 'Never connected') {
          this.scope.agent.os = {
            name: 'Unknown',
            codename: 'Unknown',
            version: 'Unknown'
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
          lastKeepAlive: 'Unknown'
        }
        if (this.agent[0].data.error) {
          this.scope.agent.error =
            this.agent[0].data.message || this.agent[0].data.error
        } else {
          this.scope.agent.error = 'Unable to load agent data from API'
        }
      }

      this.scope.agentOS = `${this.scope.agent.os.name || '-'} ${this.scope
        .agent.os.codename || '-'} ${this.scope.agent.os.version || '-'}`
      this.scope.syscheck =
        this.agent.length > 0 &&
        typeof this.agent[1] === 'object' &&
        typeof this.agent[1].data === 'object' &&
        !this.agent[1].data.error
          ? this.agent[1].data.data
          : (this.scope.syscheck = { start: 'Unknown', end: 'Unknown' })
      this.scope.id = this.stateParams.id
      this.scope.rootcheck =
        this.agent.length > 1 &&
        typeof this.agent[2] === 'object' &&
        typeof this.agent[2].data === 'object' &&
        !this.agent[2].data.error
          ? this.agent[2].data.data
          : { start: 'Unknown', end: 'Unknown' }
      if (!this.scope.agent.error) {
        const keys = Object.keys(this.extensions)
        keys.map(key =>
          this.extensions[key] === 'true'
            ? (this.scope[key] = key)
            : (this.scope[key] = null)
        )

        this.scope.groups = this.groups.data.data.items.map(item => item.name).filter(item => this.scope.agent.group && !this.scope.agent.group.includes(item))
        this.scope.formatAgentStatus = agentStatus =>
          this.formatAgentStatus(agentStatus)
        this.scope.getAgentStatusClass = agentStatus =>
          this.getAgentStatusClass(agentStatus)
        this.scope.goGroups = group => this.goGroups(group)
        this.scope.switchGroupEdit = () => this.switchGroupEdit()

        this.scope.showConfirm = (ev, group) => {
      
          const confirm = this.$mdDialog
            .confirm()
            .title(`Add group "${group}" to agent "${this.scope.agent.id}"?`)
            .targetEvent(ev)
            .ok('Agree')
            .cancel('Cancel')
    
            this.$mdDialog.show(confirm).then(
            () => {
              this.groupHandler.addAgentToGroup(group,this.scope.agent.id)
              .then(() => this.requestService.apiReq(`/agents/${this.scope.agent.id}`))
              .then(agent => {
                this.scope.agent.group = agent.data.data.group
                this.scope.groups = this.scope.groups.filter(item => !agent.data.data.group.includes(item))
                if(!this.scope.$$phase) this.scope.$digest()
              })
              .catch(error =>
                this.$notificationService.showSimpleToast(
                  error.message || error
                )
              )
            },
            () => {}
          )
        }
      }
    }

    /**
     * Go to a group
     * @param {String} group 
     */
    async goGroups(group) {
      try {
        this.groupInfo = await this.requestService.apiReq(`/agents/groups/`)
        if (
          typeof this.groupInfo.data === 'object' &&
          typeof this.groupInfo.data.data === 'object'
        ) {
          this.groupData = this.groupInfo.data.data.items.filter(
            item => item.name === group
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
        this.notificationService.showSimpleToast(
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
      agentStatus === 'Active' ? 'teal' : 'red'
    }

    switchGroupEdit() {
      this.scope.editGroup = !!!this.scope.editGroup
      if(!this.scope.$$phase) this.scope.$digest()
    }

  }

  app.controller('agentsOverviewCtrl', AgentsOverview)
})
