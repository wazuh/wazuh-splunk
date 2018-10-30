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
  '../../../services/visualizations/search/search-handler',
], function (
  app,
  SearchHandler
  ) {

  'use strict'

  app.controller('agentsCtrl', function ($urlTokenModel, $scope, $currentDataService, $state, $notificationService, $requestService, data) {
    const submittedTokenModel = $urlTokenModel.getSubmittedTokenModel()

    $scope.search = term => {
      $scope.$broadcast('wazuhSearch', { term })
    }

    $scope.filter = filter => {
      $scope.$broadcast('wazuhFilter', { filter })
    }

    $scope.showAgent = async (agent) => {
      try {
        const agentInfo = await $requestService.apiReq(`/agents`, { name: agent })
        if (!agentInfo || !agentInfo.data || !agentInfo.data.data || agentInfo.data.error)
          throw Error('Error')
        if (agentInfo.data.data.id !== '000')
          $state.go(`agent-overview`, { id: agentInfo.data.data.id })
      } catch (err) {
        $notificationService.showSimpleToast('Error fetching agent data')
      }
    }

    $scope.isClusterEnabled = ($currentDataService.getClusterInfo() && $currentDataService.getClusterInfo().status === 'enabled')
    $scope.loading = true

    $scope.status = 'all'
    $scope.osPlatform = 'all'
    $scope.version = 'all'
    $scope.osPlatforms = []
    $scope.versions = []
    $scope.groups = []
    $scope.nodes = []
    $scope.node_name = 'all'
    $scope.mostActiveAgent = {
      name: '',
      id: ''
    }

    const clusterInfo = $currentDataService.getClusterInfo()

    const filters = $currentDataService.getSerializedFilters()

    const topAgent = new SearchHandler(
      `searchTopAgent`,
      `${filters} | top agent.name`,
      `searchTopAgentToken`,
      '$result.agent.name$',
      'mostActiveAgent',
      submittedTokenModel,
      $scope,
      true,
      `loadingSearch`
    )

    const summary = data[0].data.data
    const lastAgent = data[1].data.data.items[0]

    // Building operating system filter
    const rawPlatforms = data[2].data.data.items.map(agent => agent.os)
    $scope.osPlatforms = [... new Set(rawPlatforms.filter(one => !!one))]
    // Building version filter
    const rawVersions = data[2].data.data.items.map(one => one.version)
    $scope.versions = [... new Set(rawVersions.filter(one => !!one))]

    $scope.lastAgent = lastAgent
    $scope.agentsCountActive = summary.Active - 1
    $scope.agentsCountDisconnected = summary.Disconnected
    $scope.agentsCountNeverConnected = summary['Never connected']
    $scope.agentsCountTotal = summary.Total - 1
    $scope.agentsCoverity = $scope.agentsCountTotal ? ($scope.agentsCountActive / $scope.agentsCountTotal) * 100 : 0

    $scope.loading = false
    if (!$scope.$$phase) $scope.$digest()

    /**
     * When controller is destroyed
     */
    $scope.$on('$destroy', () => {
      topAgent.destroy()
    })

  })
})