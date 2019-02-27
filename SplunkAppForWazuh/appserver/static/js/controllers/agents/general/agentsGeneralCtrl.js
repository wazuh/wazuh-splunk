/*
 * Wazuh app - Agents controller
 * Copyright (C) 2015-2019 Wazuh, Inc.
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
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/rawTableData/rawTableDataService'
], function(
  app,
  LinearChart,
  ColumnChart,
  PieChart,
  Table,
  TimePicker,
  RawTableDataService
) {
  'use strict'

  class AgentsGeneral {
    /**
     * Class constructor
     * @param {Object} $scope
     * @param {Object} $currentDataService
     * @param {Object} $urlTokenModel
     * @param {Object} $requestService
     * @param {Object} $notificationService
     * @param {Object} $stateParams
     * @param {Object} $state
     * @param {Object} agent
     * @param {*} $reportingService
     */

    constructor(
      $urlTokenModel,
      $scope,
      $requestService,
      $notificationService,
      $stateParams,
      $currentDataService,
      agent,
      $state,
      $dateDiffService,
      $reportingService,
      reportingEnabled
    ) {
      this.state = $state
      this.urlTokenModel = $urlTokenModel
      this.scope = $scope
      this.scope.reportingEnabled = reportingEnabled
      this.requestService = $requestService
      this.tableResults = {}
      this.notificationService = $notificationService
      this.stateParams = $stateParams
      this.agent = agent
      this.currentDataService = $currentDataService
      this.reportingService = $reportingService
      this.scope.expandArray = [false,false,false,false,false,false]
            this.scope.expand = (i,id) => this.expand(i,id)
      if (
        this.agent &&
        this.agent.length &&
        this.agent[0].data &&
        this.agent[0].data.data &&
        this.agent[0].data.data.id
      )
        this.currentDataService.addFilter(
          `{"agent.id":"${this.agent[0].data.data.id}", "implicit":true}`
        )
      this.filters = this.currentDataService.getSerializedFilters()
      this.dateDiffService = $dateDiffService
      this.timePicker = new TimePicker(
        '#timePicker',
        this.urlTokenModel.handleValueChange
      )

      this.scope.$on('deletedFilter', () => {
        this.launchSearches()
      })

      this.scope.$on('barFilter', () => {
        this.launchSearches()
      })

      this.vizz = [
        /**
         * Visualizations
         */
        new PieChart(
          'top5AlertsVizz',
          `${this.filters} sourcetype=wazuh | top "rule.description" limit=5`,
          'top5AlertsVizz',
          this.scope
        ),
        new PieChart(
          'top5GroupsVizz',
          `${this.filters} sourcetype=wazuh | top rule.groups limit=5`,
          'top5GroupsVizz',
          this.scope
        ),
        new PieChart(
          'top5PCIreqVizz',
          `${this.filters} sourcetype=wazuh | top rule.pci_dss{} limit=5`,
          'top5PCIreqVizz',
          this.scope
        ),
        new LinearChart(
          'alertLevelEvoVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.level=*| timechart count by rule.level`,
          'alertLevelEvoVizz',
          this.scope
        ),
        new ColumnChart(
          'alertsVizz',
          `${this.filters} sourcetype=wazuh | timechart span=2h count`,
          'alertsVizz',
          this.scope
        ),
        new Table(
          'agentsSummaryVizz',
          `${
            this.filters
          } sourcetype=wazuh |stats count sparkline by rule.id, rule.description, rule.level | sort rule.level DESC | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,
          'agentsSummaryVizz',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryTable',
          `${
            this.filters
          } sourcetype=wazuh |stats count sparkline by rule.id, rule.description, rule.level | sort rule.level DESC | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,
          'alertsSummaryTableToken',
          '$result$',
          this.scope,
          'Alerts Summary'
        )
      ]

      this.scope.$on('loadingReporting', (event, data) => {
        this.scope.loadingReporting = data.status
      })

      this.scope.$on('checkReportingStatus', () => {
        this.vizzReady = !this.vizz.filter(v => {
          return v.finish === false
        }).length
        if (this.vizzReady) {
          this.scope.loadingVizz = false
        } else {
          this.vizz.map(v => {
            if (v.constructor.name === 'RawTableData'){
              this.tableResults[v.name] = v.results
            }
          })
          this.scope.loadingVizz = true
        }
        if (!this.scope.$$phase) this.scope.$digest()
      })

      /**
       * When controller is destroyed
       */
      this.scope.$on('$destroy', () => {
        this.timePicker.destroy()
        this.vizz.map(vizz => vizz.destroy())
      })
    }

    /**
     * On controller loads
     */
    $onInit() {
      try {
        this.agentInfo = {
          name: this.agent[0].data.data.name,
          id: this.agent[0].data.data.id,
          status: this.agent[0].data.data.status,
          ip: this.agent[0].data.data.ip,
          version: this.agent[0].data.data.version,
          group: this.agent[0].data.data.group,
          lastKeepAlive: this.agent[0].data.data.lastKeepAlive,
          dateAdd: this.agent[0].data.data.dateAdd,
          agentOS: `${this.agent[0].data.data.os.name} ${
            this.agent[0].data.data.os.codename
          } ${this.agent[0].data.data.os.version}`,
          syscheck: this.agent[1].data.data,
          rootcheck: this.agent[2].data.data
        }

        this.agentInfo.syscheck.duration = this.dateDiffService.getDateDiff(
          this.agentInfo.syscheck.start,
          this.agentInfo.syscheck.end
        ).duration
        this.agentInfo.rootcheck.duration = this.dateDiffService.getDateDiff(
          this.agentInfo.rootcheck.start,
          this.agentInfo.rootcheck.end
        ).duration
        this.agentInfo.syscheck.inProgress = this.dateDiffService.getDateDiff(
          this.agentInfo.syscheck.start,
          this.agentInfo.syscheck.end
        ).inProgress
        this.agentInfo.rootcheck.inProgress = this.dateDiffService.getDateDiff(
          this.agentInfo.rootcheck.start,
          this.agentInfo.rootcheck.end
        ).inProgress

        this.scope.agentInfo = this.agentInfo
        this.scope.id = this.stateParams.id

        /**
         * Generates report
         */

        // Set agent info
        try {
          this.agentReportData = {
            ID: this.agentInfo.id,
            Name: this.agentInfo.name,
            IP: this.agentInfo.ip,
            Version: this.agentInfo.version,
            Manager: this.agent[0].data.data.manager,
            OS: this.agentInfo.agentOS,
            dateAdd: this.agentInfo.dateAdd,
            lastKeepAlive: this.agentInfo.lastKeepAlive,
            group: this.agentInfo.group.toString()
          }
        } catch (error) {
          this.agentReportData = false
        }
        this.agentMetricsGroup = []
        this.agentInfo.group.map(g => this.agentMetricsGroup.push(g))
        this.reportMetrics = {
          'Last syscheck scan': this.agentInfo.syscheck.end
            ? this.agentInfo.syscheck.end
            : 'Unknown',
          'Last rootcheck scan': this.agentInfo.rootcheck.end
            ? this.agentInfo.rootcheck.end
            : 'Unknown'
        }

        this.scope.startVis2Png = () =>
          this.reportingService.startVis2Png(
            'agents-general',
            'Security events',
            this.filters,
            [
              'top5AlertsVizz',
              'top5GroupsVizz',
              'top5PCIreqVizz',
              'alertLevelEvoVizz',
              'alertsVizz',
              'agentsSummaryVizz'
            ],
            this.reportMetrics,
            this.tableResults,
            this.agentReportData
          )
      } catch (err) {
        this.agentInfo = {}
        this.agentInfo.id =
          this.agent &&
          this.agent.length &&
          this.agent[0] &&
          this.agent[0].data &&
          this.agent[0].data.data
            ? this.agent[0].data.data.id
            : null
        this.agentInfo.name =
          this.agent &&
          this.agent.length &&
          this.agent[0] &&
          this.agent[0].data &&
          this.agent[0].data.data
            ? this.agent[0].data.data.name
            : null

        this.scope.agentInfo = {
          id: this.agentInfo.id,
          name: this.agentInfo.name,
          status: 'Never connected'
        }
        this.agentInfo.id && this.agentInfo.name
          ? (this.agentInfo.error = false)
          : (this.agentInfo.error = 'Unable to load agent data')
      }

      this.scope.goGroups = group => this.goGroups(group)
      this.scope.getAgentStatusClass = agentStatus =>
        this.getAgentStatusClass(agentStatus)
      this.scope.formatAgentStatus = agentStatus =>
        this.formatAgentStatus(agentStatus)
    }
    /**
     * Navigates to a group
     * @param {String} group
     */
    async goGroups(group) {
      try {
        this.groupInfo = await this.requestService.apiReq(`/agents/groups/`)
        this.groupData = this.groupInfo.data.data.items.filter(
          item => item.name === group
        )
        if (
          !this.groupInfo ||
          !this.groupInfo.data ||
          !this.groupInfo.data.data ||
          this.groupInfo.data.error
        ) {
          throw Error('Missing fields')
        }
        this.state.go(`mg-groups`, { group: this.groupData[0] })
      } catch (err) {
        this.notificationService.showSimpleToast('Error fetching group data')
      }
    }

    /**
     * Returns a class depending of the agent state
     * @param {String} agentStatus
     */
    getAgentStatusClass(agentStatus) {
      return agentStatus === 'Active' ? 'teal' : 'red'
    }

    /**
     * Checks and returns agent status
     * @param {Array} agentStatus
     */
    formatAgentStatus(agentStatus) {
      return ['Active', 'Disconnected'].includes(agentStatus)
        ? agentStatus
        : 'Never connected'
    }

    /**
     * Gets filters and launches search
     */
    launchSearches() {
      this.filters = this.currentDataService.getSerializedFilters()
      this.state.reload()
    } 

    expand(i, id) {
      this.scope.expandArray[i] = !this.scope.expandArray[i];
      let vis = $('#' + id + ' .panel-body .splunk-view .shared-reportvisualizer')
      this.scope.expandArray[i] ? vis.css('height', 'calc(100vh - 200px)') : vis.css('height', '250px')
    }

  }

  app.controller('agentsGeneralCtrl', AgentsGeneral)
})
