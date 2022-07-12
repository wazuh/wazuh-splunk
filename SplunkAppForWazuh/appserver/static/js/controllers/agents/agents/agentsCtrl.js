/*
 * Wazuh app - Agents controller
 * Copyright (C) 2015-2021 Wazuh, Inc.
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
  '../../../services/visualizations/chart/linear-chart',
  'FileSaver',
], function (app, SearchHandler, LinearChart) {
  'use strict'

  class Agents {
    /**
     * Class constructor
     * @param {Object} $urlTokenModel
     * @param {Object} $scope
     * @param {Object} $currentDataService
     * @param {Object} $state
     * @param {Object} $notificationService
     * @param {Object} $requestService
     * @param $csvRequestService
     * @param $tableFilterService
     * @param {Object} $security_service
     * @param {Object} agentData
     * @param clusterInfo
     * @param $mdDialog
     * @param $groupHandler
     * @param $dateDiffService
     */

    constructor(
      $urlTokenModel,
      $scope,
      $currentDataService,
      $state,
      $notificationService,
      $requestService,
      $csvRequestService,
      $tableFilterService,
      $security_service,
      agentData,
      clusterInfo,
      $mdDialog,
      $groupHandler,
      $dateDiffService
    ) {
      this.scope = $scope
      this.submittedTokenModel = $urlTokenModel.getSubmittedTokenModel()
      this.submittedTokenModel.set('activeAgentToken', '-')
      this.currentDataService = $currentDataService
      this.api = this.currentDataService.getApi()
      this.apiReq = $requestService.apiReq
      this.state = $state
      this.notification = $notificationService
      this.clusterInfo = clusterInfo
      this.filters = this.currentDataService.getSerializedFilters()
      this.csvReq = $csvRequestService
      this.wzTableFilter = $tableFilterService
      this.$mdDialog = $mdDialog
      this.groupHandler = $groupHandler
      this.setBrowserOffset = $dateDiffService.setBrowserOffset
      try {
        const parsedResult = agentData.data.data
        let summary = this.formatAgentStatusData(parsedResult.agent_status.connection)
        let agentSynced = this.formatAgentStatusData(parsedResult.agent_status.configuration)
        let lastAgent = parsedResult.last_registered_agent[0]
        let groups = parsedResult.groups

        this.scope.noAgents = summary.Total < 1

        // When there are agents, the view will display the agents details (table, stat: most active agent).
        // Only when the most active agent indicator will be displayed, the search should be started.
        if (!this.scope.noAgents) {
          this.topAgent = new SearchHandler(
            'searchTopAgent',
            `${this.filters} earliest=-1w NOT agent.id=000 | top agent.name`,
            'activeAgentToken',
            '$result.agent.name$',
            'mostActiveAgent',
            this.submittedTokenModel,
            this.scope,
            true,
            'loadingSearch',
            this.notification
          )
        }

        this.scope.agentsCountActive = summary.Active
        this.scope.lastAgent = lastAgent || 'Unknown'
        const os = parsedResult.agent_os
          ? parsedResult.agent_os
              .map((item) => item.os)
              .filter((item) => !!item)
          : false
        const versions = parsedResult.agent_version
          ? parsedResult.agent_version
              .map((item) => item.version)
              .filter((item) => !!item)
          : false
        const nodes =
          parsedResult.nodes && parsedResult.nodes
            ? parsedResult.nodes
                .map((item) => item['node_name'])
                .filter((item) => !!item)
            : false
        groups = groups
          ? groups.map((item) => item.name).filter((item) => !!item)
          : false
        this.scope.agentsCountDisconnected = summary.Disconnected
        this.scope.agentsCountNeverConnected = summary.Never_connected
        this.scope.agentsCountPending = summary.Pending
        const agentsCountTotal = summary.Total
        this.scope.agentsCoverity = agentsCountTotal
          ? (this.scope.agentsCountActive / agentsCountTotal) * 100
          : 0
        this.scope.agentsSynced = agentSynced
          ? (agentSynced.Synced / agentSynced.Total) * 100
          : 0

        this.scope.searchBarModel = {
          name: [],
          status: ['active', 'pending', 'disconnect', 'never_connected'],
          group: groups
            ? groups.sort((a, b) => {
                return a.toString().localeCompare(b.toString())
              })
            : [],
          version: versions
            ? versions.sort((a, b) => {
                return a.toString().localeCompare(b.toString(), undefined, {
                  numeric: true,
                  sensitivity: 'base',
                })
              })
            : [],
          'os.platform': os
            ? os
                .map((x) => x.platform)
                .sort((a, b) => {
                  return a.toString().localeCompare(b.toString())
                })
            : [],
          'os.version': os
            ? os
                .map((x) => x.version)
                .sort((a, b) => {
                  return a.toString().localeCompare(b.toString(), undefined, {
                    numeric: true,
                    sensitivity: 'base',
                  })
                })
            : [],
          'os.name': os
            ? os
                .map((x) => x.name)
                .sort((a, b) => {
                  return a.toString().localeCompare(b.toString())
                })
            : [],
        }

        if (
          this.clusterInfo &&
          this.clusterInfo.enabled === 'yes' &&
          this.clusterInfo.running === 'yes'
        ) {
          this.scope.searchBarModel.node_name = nodes || []
        }
      } catch (error) {} //eslint-disable-line

      /* RBAC flags */
      this.isAllowed = (action, resource, params = ['*']) => {
        return $security_service.getPolicy(action, resource, params).isAllowed
      }
      this.scope.canReadAgents = this.isAllowed('AGENT_READ', [
        'AGENT_ID',
        'AGENT_GROUP',
      ])
      this.scope.canAddAgents = this.isAllowed('AGENT_CREATE', ['RESOURCELESS'])

      this.scope.expandChartAgent = false
      this.scope.$applyAsync()
    }

    /**
     * On controller loads
     */
    $onInit() {
      this.scope.addingAgents = false
      this.scope.query = (query, search) => this.query(query, search)
      this.scope.showAgent = (agent) => this.showAgent(agent)
      this.scope.isClusterEnabled =
        this.clusterInfo && this.clusterInfo.status === 'enabled'
      this.scope.status = 'all'
      this.scope.osPlatform = 'all'
      this.scope.version = 'all'
      this.scope.node_name = 'all'
      this.scope.versionModel = 'all'
      this.scope.downloadCsv = () => this.downloadCsv()
      this.scope.$on('$destroy', () => {
        this.linearChartAgent && this.linearChartAgent.destroy()
        this.topAgent && this.topAgent.destroy()
      })
      this.scope.reloadList = () => this.reloadList()

      this.scope.addNewAgent = () => this.addNewAgent()
      this.scope.closeAddAgent = () => this.closeAddAgent()

      this.scope.offsetTimestamp = (text, time) => {
        try {
          return text + this.setBrowserOffset(time)
        } catch (error) {
          return ''
        }
      }

      this.scope.loadCharts = (id) => {
        setTimeout(() => {
          // eslint-disable-next-line no-undef
          const chart = new Chart(document.getElementById(id), {
            type: 'doughnut',
            data: {
              labels: ['Active', 'Pending', 'Disconnected', 'Never connected' ],
              datasets: [
                {
                  backgroundColor: ['#46BFBD', '#FFD35E', '#F7464A', '#949FB1'],
                  data: [
                    this.scope.agentsCountActive,
                    this.scope.agentsCountPending,
                    this.scope.agentsCountDisconnected,
                    this.scope.agentsCountNeverConnected,
                  ],
                },
              ],
            },
            options: {
              cutoutPercentage: 85,
              legend: {
                display: true,
                position: 'right',
              },
              tooltips: {
                displayColors: false,
              },
            },
          })
          chart.update()
        }, 250)
      }

      this.scope.getAgentStatus = () => {
        try {
          const [filters] = this.currentDataService.getFilters()
          const nodeType = Object.keys(filters)[0]
          let agentsStatusFilter = false

          if (nodeType === 'manager.name') {
            const managerName = filters['manager.name']
            agentsStatusFilter = `manager.name=${managerName} index=wazuh-monitoring*`
          } else {
            const clusterName = filters['cluster.name']
            agentsStatusFilter = `cluster.name=${clusterName} index=wazuh-monitoring*`
          }

          if (agentsStatusFilter != false) {
            const spanTime = '1m'
            this.linearChartAgent = new LinearChart(
              `agentStatusChartHistory`,
              `${agentsStatusFilter} id!=000 status=* | timechart span=${spanTime} cont=FALSE count by status usenull=f`,
              `agentStatusChart`,
              this.scope,
              { customAxisTitleX: 'Time span' }
            )
          }
        } catch (error) {
          this.notification.showErrorToast(
            'Error fetching agents status ' + (error.message || error)
          )
        }
      }

      /**
       * Expands the visualizations
       * @param {String} id
       */
      this.scope.expand = (id) => {
        this.scope.expandChartAgent = !this.scope.expandChartAgent
        let vis = $(
          '#' + id + ' .panel-body .splunk-view .shared-reportvisualizer'
        )
        this.scope.expandChartAgent
          ? vis.css('height', 'calc(100vh - 200px)')
          : vis.css('height', '250px')

        document.querySelectorAll('[role="main"]')[0].style.zIndex = this.scope
          .expandChartAgent
          ? 900
          : ''

        let vis_header = $('.wz-headline-title')
        vis_header.dblclick((e) => {
          if (this.scope.expandChartAgent) {
            this.scope.expandChartAgent = !this.scope.expandChartAgent
            this.scope.expandChartAgent
              ? vis.css('height', 'calc(100vh - 200px)')
              : vis.css('height', '250px')
            this.scope.$applyAsync()
          } else {
            e.preventDefault()
          }
        })
      }
    }

    /**
     * Exports the table in CSV format
     */
    async downloadCsv() {
      try {
        this.notification.showSimpleToast(
          'Your download should begin automatically...'
        )

        const filters = this.wzTableFilter.get()
        filters.push({
          name: 'q',
          value: 'id!=000',
        })
        const currentApi = this.api['_key']
        const output = await this.csvReq.fetch('/agents', currentApi, filters)
        const blob = new Blob([output], { type: 'text/csv' })
        saveAs(blob, 'agents.csv') // eslint-disable-line
        return
      } catch (error) {
        this.notification.showErrorToast('Error downloading CSV')
      }
      return
    }

    /**
     * Launches the query
     * @param {String} query
     * @param {String} search
     */
    query(query, search) {
      this.scope.$broadcast('wazuhQuery', { query, search })
    }

    /**
     * Selects an agent
     * @param {String} agent
     */
    async showAgent(agent) {
      try {
        if (agent) {
          const agentName = typeof agent === 'object' ? agent.name : agent
          const agentInfo = await this.apiReq(`/agents`, { name: agentName })
          if (
            !agentInfo ||
            !agentInfo.data ||
            !agentInfo.data.data ||
            agentInfo.data.error
          ) {
            throw Error('Error fetching agent data')
          }
          if (agentInfo.data.data.affected_items[0].id !== '000') {
            this.state.go(`agent-overview`, {
              id: agentInfo.data.data.affected_items[0].id,
            })
          }
        } else {
          throw Error('Cannot fetch agent name')
        }
      } catch (err) {
        this.notification.showErrorToast(
          err.message || 'Error fetching agent data'
        )
      }
    }

    /**
     * Switchs view to add a new agent
     */
    addNewAgent() {
      this.linearChartAgent && this.linearChartAgent.destroy()
      this.scope.addingAgents = true
      this.scope.$applyAsync()
    }

    /**
     * Switchs view to cancel the process to add a new agent
     */
    closeAddAgent() {
      this.scope.addingAgents = false
      this.scope.$applyAsync()
    }

    /**
     * Reload list of agents
     */
    reloadList() {
      this.scope.$broadcast('reloadSearchFilterBar', {})
    }

    /** Parsed Agent Stats */
    formatAgentStatusData(status) {
      let statusObj = {}

      for (let key of Object.keys(status)) {
        statusObj[key.charAt(0).toUpperCase() + key.slice(1)] = status[key]
      }

      return statusObj
    }
  }
  app.controller('agentsCtrl', Agents)
})
