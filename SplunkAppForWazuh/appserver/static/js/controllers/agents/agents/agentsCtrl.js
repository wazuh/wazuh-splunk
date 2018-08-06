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

// import beautifier from '../utils/json-beautifier'
// import { uiModules } from 'ui/modules'
// import FilterHandler from '../utils/filter-handler'
// import generateMetric from '../utils/generate-metric'
// import TabNames from '../utils/tab-names'
// import { metricsAudit, metricsVulnerability, metricsScap, metricsCiscat, metricsVirustotal } from '../utils/agents-metrics'
// import * as FileSaver from '../services/file-saver'

// import DataFactory from '../services/data-factory'
// import TabDescription from '../../server/reporting/tab-description'

// const app = uiModules.get('app/wazuh', [])

define(['../../module'], function (controllers) {

  'use strict'

controllers.controller('agentsController',  function ($scope, $location, $rootScope, $apiRequest, shareAgent, $dataService) {
    const agentFactory = new $dataService($apiRequest, '/agents')
    $scope.TabDescription = TabDescription

    $rootScope.reportStatus = false

    $location.search('_a', null)
    $scope.extensions = extensions


    let tabHistory = []
    if ($scope.tab !== 'configuration' && $scope.tab !== 'welcome' && $scope.tab !== 'syscollector') tabHistory.push($scope.tab)

    // Tab names
    $scope.tabNames = TabNames

    .assign('agents')

    $scope.hostMonitoringTabs = ['general', 'fim', 'configuration', 'syscollector']
    $scope.systemAuditTabs = ['pm', 'audit', 'oscap', 'ciscat']
    $scope.securityTabs = ['vuls', 'virustotal']
    $scope.complianceTabs = ['pci', 'gdpr']

    $scope.inArray = (item, array) => item && Array.isArray(array) && array.includes(item)

    // Switch subtab
    $scope.switchSubtab = async (subtab, force = false, onlyAgent = false, sameTab = true, preserveDiscover = false) => {
      try {
        if ($scope.tabView === subtab && !force) return

        $location.search('tabView', subtab)
        const localChange = (subtab === 'panels' && $scope.tabView === 'discover') && sameTab
        $scope.tabView = subtab

        if (subtab === 'panels' && $scope.tab !== 'configuration' && $scope.tab !== 'welcome' && $scope.tab !== 'syscollector') {
          const condition = !changeAgent && localChange || !changeAgent && preserveDiscover
          changeAgent = false
        } else {
          $rootScope.$emit('changeTabView', { tabView: $scope.tabView })
        }

        checkMetrics($scope.tab, subtab)

        return

      } catch (error) {
        console.error('Agents',error)
        return
      }
    }


    let changeAgent = false

    // Switch tab
    $scope.switchTab = (tab, force = false) => {
      if (tab !== 'configuration' && tab !== 'welcome' && tab !== 'syscollector') tabHistory.push(tab)
      if (tabHistory.length > 2) tabHistory = tabHistory.slice(-2)
      .setTab(tab)
      if ($scope.tab === tab && !force) return
      const onlyAgent = $scope.tab === tab && force
      const sameTab = $scope.tab === tab
      $location.search('tab', tab)
      const preserveDiscover = tabHistory.length === 2 && tabHistory[0] === tabHistory[1] && !force
      $scope.tab = tab

      if ($scope.tab === 'configuration') {
        firstLoad()
      } else {
        $scope.switchSubtab('panels', true, onlyAgent, sameTab, preserveDiscover)
      }
    }

    // Agent data
    $scope.getAgentStatusClass = agentStatus => agentStatus === "Active" ? "teal" : "red"

    $scope.formatAgentStatus = agentStatus => {
      return ['Active', 'Disconnected'].includes(agentStatus) ? agentStatus : 'Never connected'
    }

    const validateRootCheck = () => {
      const result = commonData.validateRange($scope.agent.rootcheck)
      $scope.agent.rootcheck = result
    }

    const validateSysCheck = () => {
      const result = commonData.validateRange($scope.agent.syscheck)
      $scope.agent.syscheck = result
    }

    $scope.getAgent = async newAgentId => {
      try {
        $scope.load = true
        changeAgent = true

        const globalAgent = shareAgent.getAgent()

        if ($scope.tab === 'configuration') {
          return $scope.getAgentConfig(newAgentId)
        }

        const id = commonData.checkLocationAgentId(newAgentId, globalAgent)

        const data = await Promise.all([
          $apiRequest.request(`/agents/${id}`, {},false),
          $apiRequest.request(`/syscheck/${id}/last_scan`, {},false),
          $apiRequest.request(`/rootcheck/${id}/last_scan`, {},false),
          $apiRequest.request(`/syscollector/${id}/hardware`, {},false),
          $apiRequest.request(`/syscollector/${id}/os`, {}, false)
        ])

        // Agent
        $scope.agent = data[0].data.data
        if ($scope.agent.os) {
          $scope.agentOS = $scope.agent.os.name + ' ' + $scope.agent.os.version
        }
        else { $scope.agentOS = 'Unknown' }

        // Syscheck
        $scope.agent.syscheck = data[1].data.data
        validateSysCheck()

        // Rootcheck
        $scope.agent.rootcheck = data[2].data.data
        validateRootCheck()

        $scope.switchTab($scope.tab, true)

        if (!data[3] || !data[3].data || !data[3].data.data || typeof data[3].data.data !== 'object' || !Object.keys(data[3].data.data).length ||
          !data[4] || !data[4].data || !data[4].data.data || typeof data[4].data.data !== 'object' || !Object.keys(data[4].data.data).length) {
          $scope.syscollector = null
        } else {
          $scope.syscollector = {
            hardware: data[3].data.data,
            os: data[4].data.data
          }
        }

        $scope.load = false
        if (!$scope.$$phase) $scope.$digest()
        return
      } catch (error) {
        console.error('Agents',error)
      }
      return
    }

    $scope.goGroups = agent => {
      visFactoryService.clearAll()
      shareAgent.setAgent(agent)
      $location.search('tab', 'groups')
      $location.path('/manager')
    }

    $scope.analyzeAgents = search => {
      agentFactory.items = []
      agentFactory.addFilter('search', search)
      return agentFactory.fetch({ nonull: true })
        .then(data => data.items)
        .catch(error => console.error('Agents'),error)

    }

    //Destroy
    $scope.$on("$destroy", () => {
      visFactoryService.clearAll()
    })

    // PCI and GDPR requirements
    Promise.all([commonData.getPCI(), commonData.getGDPR()])
      .then(data => {
        $scope.pciTabs = data[0]
        $scope.selectedPciIndex = 0
        $scope.gdprTabs = data[1]
        $scope.selectedGdprIndex = 0
      })
      .catch(error => console.error('Agents'),error)

    $scope.isArray = Array.isArray

    $scope.getAgentConfig = newAgentId => {
      if (newAgentId) {
        $location.search('agent', newAgentId)
      }
      firstLoad()
    }

    $scope.goGroup = () => {
      shareAgent.setAgent($scope.agent)
      $location.path('/manager/groups')
    }

    const firstLoad = async () => {
      try {
        const globalAgent = shareAgent.getAgent()
        $scope.configurationError = false
        $scope.load = true

        const id = commonData.checkLocationAgentId(false, globalAgent)

        const data = await $apiRequest.request(`/agents/${id}`, {},false)
        $scope.agent = data.data.data
        $scope.groupName = $scope.agent.group

        if (!$scope.groupName) {

          $scope.configurationError = true
          $scope.load = false
          if (!$scope.$$phase) $scope.$digest()
          return
        }

        const configurationData = await $apiRequest.request(`/agents/groups/${$scope.groupName}/configuration`, {},false)
        $scope.groupConfiguration = configurationData.data.data.items[0]
        $scope.rawJSON = beautifier.prettyPrint(configurationData.data.data.items)

        const agentGroups = await Promise.all([
          $apiRequest.request(`/agents/groups?search=${$scope.groupName}`, {},false),
          $apiRequest.request(`/agents/groups/${$scope.groupName}`, {},false)
        ])


        const groupMergedSum = agentGroups[0].data.data.items.filter(item => item.name === $scope.groupName)
        $scope.groupMergedSum = (groupMergedSum.length) ? groupMergedSum[0].mergedSum : 'Unknown'

        const agentMergedSum = agentGroups[1].data.data.items.filter(item => item.id === $scope.agent.id)
        $scope.agentMergedSum = (agentMergedSum.length) ? agentMergedSum[0].mergedSum : 'Unknown'

        $scope.isSynchronized = (($scope.agentMergedSum === $scope.groupMergedSum) && !([$scope.agentMergedSum, $scope.groupMergedSum].includes('Unknown'))) ? true : false

        $scope.load = false

        if ($scope.tab !== 'configuration') $scope.switchTab($scope.tab, true)

        if (!$scope.$$phase) $scope.$digest()
        return
      } catch (error) {
        console.error('Agents',error)
      }
      return
    }
    /** End of agent configuration */

    $scope.search = (term, specificPath) => $scope.$broadcast('wazuhSearch', { term, specificPath })

    //Load
    try {
      $scope.getAgent()
    } catch (e) {
      errorHandler.handle('Unexpected exception loading controller', 'Agents')
    }

  })
})