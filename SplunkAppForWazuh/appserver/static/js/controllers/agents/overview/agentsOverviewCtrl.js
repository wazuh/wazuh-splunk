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
  
  app.controller('agentsOverviewCtrl', function ($stateParams, $scope, $requestService, $state, $notificationService ,agent) {
    try {
      $scope.agent = agent[0].data.data
      $scope.agentOS = `${$scope.agent.os.name || '-'} ${$scope.agent.os.codename || '-'} ${$scope.agent.os.version || '-'}`
      $scope.syscheck = agent[1].data.data
      $scope.id = $stateParams.id
      $scope.rootcheck = agent[2].data.data
    } catch (err) {
      $state.go('agents')
    }
    
    $scope.goGroups = async (group) => {
      try {
        const groupInfo = await $requestService.apiReq(`/agents/groups/`)
        const groupData = groupInfo.data.data.items.filter( item => item.name === group)
        if (!groupInfo || !groupInfo.data || !groupInfo.data.data || groupInfo.data.error) {
          throw Error('Missing fields')
        }
        $state.go(`mg-groups`, { group: groupData[0] } )
      } catch (err) {
        $notificationService.showSimpleToast('Error fetching group data')
      }
    }
    
    $scope.formatAgentStatus = agentStatus => {
      return ['Active', 'Disconnected'].includes(agentStatus) ? agentStatus : 'Never connected';
    }
    $scope.getAgentStatusClass = agentStatus => agentStatus === "Active" ? "teal" : "red";
  })
})