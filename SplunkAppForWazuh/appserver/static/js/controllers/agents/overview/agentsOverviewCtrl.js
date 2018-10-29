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
  
  app.controller('agentsOverviewCtrl', function ($stateParams, $requestService, $state, $notificationService ,agent) {
    const vm = this
    try {
      vm.agent = agent[0].data.data
      vm.agentOS = `${vm.agent.os.name || '-'} ${vm.agent.os.codename || '-'} ${vm.agent.os.version || '-'}`
      vm.syscheck = agent[1].data.data
      vm.id = $stateParams.id
      vm.rootcheck = agent[2].data.data
    } catch (err) {
      $state.go('agents')
    }
    
    vm.goGroups = async (group) => {
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
    
    vm.formatAgentStatus = agentStatus => {
      return ['Active', 'Disconnected'].includes(agentStatus) ? agentStatus : 'Never connected';
    }
    vm.getAgentStatusClass = agentStatus => agentStatus === "Active" ? "teal" : "red";
  })
})