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

  modules.controller('agentConfigCtrl', function ($scope, config, $beautifierJson) {
    const vm = this
    vm.config = config
    vm.configurationError = false
    vm.load = true
    vm.agent = config.response.data.data
    vm.groupName = vm.agent.group

    // const configurationData   = await apiReq.request('GET', `/agents/groups/${vm.groupName}/configuration`, {})
    vm.groupConfiguration = config.responseAll[0].data.data.items[0]
    vm.rawJSON = $beautifierJson.prettyPrint(config.responseAll[0].data.data.items)

    const groupMergedSum = config.responseAll[1].data.data.items.filter(item => item.name === vm.groupName)
    vm.groupMergedSum = (groupMergedSum.length) ? groupMergedSum[0].mergedSum : 'Unknown'

    
    if(!vm.groupName){
      vm.configurationError = true
      vm.load = false
      if(!$scope.$$phase) $scope.$digest()
      return
  }

    const agentMergedSum = config.responseAll[2].data.data.items.filter(item => item.id === vm.agent.id)
    vm.agentMergedSum = (agentMergedSum.length) ? agentMergedSum[0].mergedSum : 'Unknown'

    vm.isSynchronized = ((vm.agentMergedSum === vm.groupMergedSum) && !([vm.agentMergedSum, vm.groupMergedSum].includes('Unknown'))) ? true : false

    vm.load = false

    /**
     * When controller is destroyed
     */
    $scope.$on('$destroy', () => {

    })

  })
})