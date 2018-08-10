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

define(['../../module'], function (controllers) {

  'use strict'

  controllers.controller('agentsOverviewCtrl', function ($stateParams, agent) {
    const vm = this
    vm.agent = agent[0].data.data
    vm.agentOS = `${vm.agent.os.name} ${vm.agent.os.codename} ${vm.agent.os.version}`
    vm.syscheck = agent[1].data.data
    vm.id = $stateParams.id
    vm.rootcheck = agent[2].data.data
    vm.formatAgentStatus = agentStatus => {
      return ['Active', 'Disconnected'].includes(agentStatus) ? agentStatus : 'Never connected';
    }
    vm.getAgentStatusClass = agentStatus => agentStatus === "Active" ? "teal" : "red";
  })
})