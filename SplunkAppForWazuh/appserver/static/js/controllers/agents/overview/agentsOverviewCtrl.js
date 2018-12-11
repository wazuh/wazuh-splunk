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

define(['../../module'], function (app) {
  'use strict'

  class AgentsOverview {
    constructor(
      $stateParams,
      extensions,
      $scope,
      $requestService,
      $state,
      $notificationService,
      agent
    ) {
      this.stateParams = $stateParams
      this.scope = $scope
      this.requestService = $requestService
      this.state = $state
      this.notificationService = $notificationService
      this.agent = agent
      this.extensions = extensions
    }

    $onInit() {
      if (this.agent.length && typeof this.agent[0] === 'object' && this.agent[0].data && typeof this.agent[0].data.data === 'object') {
        this.scope.agent = this.agent[0].data.data
        //Check OS type
        this.scope.isLinux = this.agent[0].data.data.os.uname.includes("Linux") ? true : false
        if (this.scope.agent.status == 'Never connected') {
          this.scope.agent.os = { name: 'Unknown', codename: 'Unknown', version: 'Unknown' }
          this.scope.agent.group = null
          this.scope.agent.lastKeepAlive = 'Never connected'
        }
      } else {
        this.scope.agent = { group: null, name: 'Unknown', id: null, status: null, ip: 'Unknown', os: { name: 'Unknown', codename: 'Unknown', version: 'Unknown' }, version: 'Unknown', dateAdd: 'Unknown', lastKeepAlive: 'Unknown' }
        if (this.agent[0].data.error) {
          this.scope.agent.error = this.agent[0].data.message || this.agent[0].data.error
        } else {
          this.scope.agent.error = 'Unable to load agent data from API'
        }
      }

      this.scope.agentOS = `${this.scope.agent.os.name || '-'} ${this.scope.agent.os.codename || '-'} ${this.scope.agent.os.version || '-'}`
      this.scope.syscheck = (this.agent.length > 0 && typeof this.agent[1] === 'object' && typeof this.agent[1].data === 'object' && !this.agent[1].data.error) ? this.agent[1].data.data : this.scope.syscheck = { start: 'Unknown', end: 'Unknown' }
      this.scope.id = this.stateParams.id
      this.scope.rootcheck = (this.agent.length > 1 && typeof this.agent[2] === 'object' && typeof this.agent[2].data === 'object' && !this.agent[2].data.error) ? this.agent[2].data.data : { start: 'Unknown', end: 'Unknown' }
      if (!this.scope.agent.error) {
        const keys = Object.keys(this.extensions)
        keys.map(key =>
          this.extensions[key] === 'true'
            ? (this.scope[key] = key)
            : (this.scope[key] = null)
        )

        this.scope.formatAgentStatus = agentStatus => this.formatAgentStatus(agentStatus)
        this.scope.getAgentStatusClass = agentStatus => this.getAgentStatusClass(agentStatus)
        this.scope.goGroups = group => this.goGroups(group)
      }

    }

    async goGroups(group) {
      try {
        this.groupInfo = await this.requestService.apiReq(`/agents/groups/`)
        if (typeof this.groupInfo.data === 'object' && typeof this.groupInfo.data.data === 'object') {
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
        this.notificationService.showSimpleToast('Error fetching group data.', err.message || err)
      }
    }

    formatAgentStatus(agentStatus) {
      return ['Active', 'Disconnected'].includes(agentStatus)
        ? agentStatus
        : 'Never connected'
    }

    getAgentStatusClass(agentStatus) {
      agentStatus === 'Active' ? 'teal' : 'red'
    }
  }

  app.controller('agentsOverviewCtrl', AgentsOverview)
})
