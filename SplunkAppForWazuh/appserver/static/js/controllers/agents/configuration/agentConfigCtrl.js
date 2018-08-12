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

define(['../../module'], function (modules) {

  'use strict'

  modules.controller('agentConfigCtrl', function ($scope, $currentDataService, config) {
    const vm = this
    console.log('config ', config)
    vm.config = config
    const globalAgent = shareAgent.getAgent();
    vm.configurationError = false;
    vm.load = true;

    const id = commonData.checkLocationAgentId(false, globalAgent)

    const data       = await apiReq.request('GET', `/agents/${id}`, {});
    vm.agent     = data.data.data;
    vm.groupName = vm.agent.group;

    if(!vm.groupName){

        vm.configurationError = true;
        vm.load = false;
        if(!vm.$$phase) vm.$digest();
        return;
    }

    const configurationData   = await apiReq.request('GET', `/agents/groups/${vm.groupName}/configuration`, {});
    vm.groupConfiguration = configurationData.data.data.items[0];
    vm.rawJSON            = beautifier.prettyPrint(configurationData.data.data.items);

    const agentGroups = await Promise.all([
        apiReq.request('GET', `/agents/groups?search=${vm.groupName}`, {}),
        apiReq.request('GET', `/agents/groups/${vm.groupName}`, {})
    ]);


    const groupMergedSum  = agentGroups[0].data.data.items.filter(item => item.name === vm.groupName);
    vm.groupMergedSum = (groupMergedSum.length) ? groupMergedSum[0].mergedSum : 'Unknown';

    const agentMergedSum  = agentGroups[1].data.data.items.filter(item => item.id === vm.agent.id);
    vm.agentMergedSum = (agentMergedSum.length) ? agentMergedSum[0].mergedSum : 'Unknown';

    vm.isSynchronized = ((vm.agentMergedSum === vm.groupMergedSum) && !([vm.agentMergedSum,vm.groupMergedSum].includes('Unknown')) ) ? true : false;

    vm.load = false;

    /**
     * When controller is destroyed
     */
    vm.$on('$destroy', () => {

    })

  })
})