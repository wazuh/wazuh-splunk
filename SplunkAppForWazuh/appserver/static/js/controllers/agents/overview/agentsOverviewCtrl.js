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
  'use strict';

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
      this.stateParams = $stateParams;
      this.scope = $scope;
      this.requestService = $requestService;
      this.state = $state;
      this.notificationService = $notificationService;
      this.agent = agent;
      this.extensions = extensions;

      try {
        this.scope.agent = this.agent[0].data.data;
        this.scope.agentOS = `${this.scope.agent.os.name || '-'} ${this.scope
          .agent.os.codename || '-'} ${this.scope.agent.os.version || '-'}`;
        this.scope.syscheck = this.agent[1].data.data;
        this.scope.id = this.stateParams.id;
        this.scope.rootcheck = this.agent[2].data.data;
      } catch (err) {
        this.state.go('agents');
      }
    }

    $onInit() {
      const keys = Object.keys(this.extensions);
      keys.map(
        key =>
          this.extensions[key] === 'true'
            ? (this.scope[key] = key)
            : (this.scope[key] = null)
      );

      this.scope.goGroups = async group => {
        try {
          this.groupInfo = await this.requestService.apiReq(`/agents/groups/`);
          this.groupData = this.groupInfo.data.data.items.filter(
            item => item.name === group
          );
          if (
            !this.groupInfo ||
            !this.groupInfo.data ||
            !this.groupInfo.data.data ||
            this.groupInfo.data.error
          ) {
            throw Error('Missing fields');
          }
          this.state.go(`mg-groups`, { group: this.groupData[0] });
        } catch (err) {
          this.notificationService.showSimpleToast('Error fetching group data');
        }
      };

      this.scope.formatAgentStatus = agentStatus => {
        return ['Active', 'Disconnected'].includes(agentStatus)
          ? agentStatus
          : 'Never connected';
      };
      this.scope.getAgentStatusClass = agentStatus =>
        agentStatus === 'Active' ? 'teal' : 'red';
    }
  }

  app.controller('agentsOverviewCtrl', AgentsOverview);
});
