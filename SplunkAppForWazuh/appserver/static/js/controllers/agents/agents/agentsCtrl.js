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

define([
  '../../module',
  'splunkjs/mvc',
  'splunkjs/mvc/simplexml/searcheventhandler',
  'splunkjs/mvc/searchmanager',
  "splunkjs/mvc/utils"
], function (modules, mvc, SearchEventHandler, SearchManager, utils) {

  'use strict'

  modules.controller('agentsCtrl', function ($scope, $currentDataService, $state, $notificationService, $requestService, data) {
    const vm = this
    let submittedTokenModel = mvc.Components.getInstance('submitted', { create: true })
    submittedTokenModel.set("activeAgentToken", '-')
    vm.loadingSearch = true

    vm.search = term => {
      $scope.$broadcast('wazuhSearch', { term })
    }

    vm.filter = filter => {
      $scope.$broadcast('wazuhFilter', { filter })
    }

    vm.showAgent = async (agent) => {
      try {
        const agentInfo = await $requestService.apiReq(`/agents`, { name: agent })
        if (!agentInfo || !agentInfo.data || !agentInfo.data.data || agentInfo.data.error)
          throw Error('Error')
        $state.go(`agent-overview`, { id: agentInfo.data.data.id })
      } catch (err) {
        console.error('err', err)
        $notificationService.showSimpleToast('Error fetching agent data')
      }
    }

    vm.isClusterEnabled = ($currentDataService.getClusterInfo() && $currentDataService.getClusterInfo().status === 'enabled')
    vm.loading = true

    vm.status = 'all'
    vm.osPlatform = 'all'
    vm.version = 'all'
    vm.osPlatforms = []
    vm.versions = []
    vm.groups = []
    vm.nodes = []
    vm.node_name = 'all'
    vm.mostActiveAgent = {
      name: '',
      id: ''
    }

    const clusterInfo = $currentDataService.getClusterInfo()

    const epoch = (new Date).getTime()
    const filters = $currentDataService.getSerializedFilters()
    let searchTopAgent = new SearchManager({
      "id": `searchTopAgent${epoch}`,
      "cancelOnUnload": true,
      "sample_ratio": 1,
      "earliest_time": "$when.earliest$",
      "status_buckets": 0,
      "search": `${filters} | top agent.name`,
      "latest_time": "$when.latest$",
      "app": utils.getCurrentApp(),
      "auto_cancel": 90,
      "preview": true,
      "tokenDependencies": {
      },
      "runWhenTimeIsUndefined": true
    }, { tokens: true, tokenNamespace: "submitted" })

    let handlerTopAgent = new SearchEventHandler({
      managerid: `searchTopAgent${epoch}`,
      event: "done",
      conditions: [
        {
          attr: "any",
          value: "*",
          actions: [
            { "type": "set", "token": "activeAgentToken", "value": "$result.agent.name$" },
          ]
        }
      ]
    })

    searchTopAgent.on('search:progress', () => {
      vm.loadingSearch = true
    })
    searchTopAgent.on('search:done', () => {
      vm.loadingSearch = false
      const activeAgentTokenJS = submittedTokenModel.get("activeAgentToken")
      if (activeAgentTokenJS) {
        vm.loadingSearch = false
        vm.mostActiveAgent = `${activeAgentTokenJS}`
        if (!$scope.$$phase) $scope.$digest()
      }
    })

    submittedTokenModel.on("change:activeAgentToken", function (model, activeAgentToken, options) {
      if (submittedTokenModel) {
        const activeAgentTokenJS = submittedTokenModel.get("activeAgentToken")
        if (activeAgentTokenJS) {
          vm.loadingSearch = false
          vm.mostActiveAgent = `${activeAgentTokenJS}`
          if (!$scope.$$phase) $scope.$digest()
        }
      }
    })

    const summary = data[0].data.data
    const lastAgent = data[1].data.data.items[0]

    // Building operating system filter
    const rawPlatforms = data[2].data.data.items.map(agent => agent.os)
    vm.osPlatforms = [... new Set(rawPlatforms.filter(one => !!one))]
    // Building version filter
    const rawVersions = data[2].data.data.items.map(one => one.version);
    vm.versions = [... new Set(rawVersions.filter(one => !!one))]

    vm.lastAgent = lastAgent
    vm.agentsCountActive = summary.Active - 1
    vm.agentsCountDisconnected = summary.Disconnected
    vm.agentsCountNeverConnected = summary['Never connected']
    vm.agentsCountTotal = summary.Total - 1
    vm.agentsCoverity = vm.agentsCountTotal ? (vm.agentsCountActive / vm.agentsCountTotal) * 100 : 0

    vm.loading = false
    if (!$scope.$$phase) $scope.$digest()

    /**
     * When controller is destroyed
     */
    $scope.$on('$destroy', () => {
      searchTopAgent.cancel()
      searchTopAgent = null
      handlerTopAgent = null
    })

  })
})