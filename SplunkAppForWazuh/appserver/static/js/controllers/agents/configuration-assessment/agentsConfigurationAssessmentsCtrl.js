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
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/inputs/time-picker',
], function(
  app,
  PieChart,
  AreaChart,
  TimePicker,
) {
  'use strict'

  class AgentsCA {
    /**
     * Class Agents Policy-Monitoring
     * @param {Object} $urlTokenModel
     * @param {Object} $scope
     * @param {Object} $state
     * @param {Object} $currentDataService
     * @param {Object} agent
     * @param {*} $reportingService
     * @param {*} $requestService
     * @param {*} $notificationService
     * @param {*} $csvRequestService
     */

    constructor(
      $urlTokenModel,
      $rootScope,
      $scope,
      $state,
      $currentDataService,
      agent,
      configAssess,
      $reportingService,
      $requestService,
      $notificationService,
      $csvRequestService,
      $tableFilterService,
      reportingEnabled,
      BASE_URL,
      extensions
    ) {
      this.urlTokenModel = $urlTokenModel
      this.rootScope = $rootScope
      this.scope = $scope
      this.scope.reportingEnabled = reportingEnabled
      this.scope.extensions = extensions
      this.apiReq = $requestService.apiReq
      this.state = $state
      this.reportingService = $reportingService
      this.tableResults = {}
      this.currentDataService = $currentDataService
      this.agent = agent
      this.configAssess = configAssess
      this.notification = $notificationService
      this.api = $currentDataService.getApi()
      this.csvReq = $csvRequestService
      this.wzTableFilter = $tableFilterService
      this.baseUrl = BASE_URL
      this.scope.noScansPng = `${
        this.baseUrl
      }/static/app/SplunkAppForWazuh/css/images/sca_no_scans.png`
      this.currentDataService.addFilter(
        `{"rule.groups{}":"sca", "implicit":true}`
      )
      this.scope.expandArray = [false, false, false, false, false]
      this.scope.expand = (i, id) => this.expand(i, id)

      if (
        this.agent &&
        this.agent.data &&
        this.agent.data.data &&
        this.agent.data.data.id
      )
        this.currentDataService.addFilter(
          `{"agent.id":"${this.agent.data.data.id}", "implicit":true}`
        )

      if (
        this.configAssess &&
        this.configAssess.data &&
        this.configAssess.data.data &&
        this.configAssess.data.data.items &&
        this.configAssess.data.error === 0
      ) {
        this.configAssess = this.configAssess.data.data.items
        this.scope.configAssess = this.configAssess
      }

      this.filters = this.currentDataService.getSerializedFilters()
      this.timePicker = new TimePicker(
        '#timePicker',
        this.urlTokenModel.handleValueChange
      )

      this.scope.$on('deletedFilter', (event) => {
        event.stopPropagation()
        this.launchSearches()
      })

      this.scope.$on('barFilter', (event) => {
        event.stopPropagation()
        this.launchSearches()
      })

      this.vizz = [
        /**
         * Visualizations
         */
        new PieChart(
          'resultDistribution',
          `${
            this.filters
          }  rule.groups{}="sca" | stats count by data.sca.check.result `,
          'resultDistribution',
          this.scope
        ),
        new AreaChart(
          'resultsOverTime',
          `${
            this.filters
          }  rule.groups{}="sca" | timechart span=1h count by data.sca.check.result`,
          'resultsOverTime',
          this.scope
        ),
        new AreaChart(
          'alertLevelEvolution',
          `${
            this.filters
          }  rule.groups{}="sca" | timechart span=1h count by rule.level`,
          'alertLevelEvolution',
          this.scope
        )
      ]

      // Set agent info
      try {
        this.agentReportData = {
          ID: this.agent.data.data.id,
          Name: this.agent.data.data.name,
          IP: this.agent.data.data.ip,
          Version: this.agent.data.data.version,
          Manager: this.agent.data.data.manager,
          OS: this.agent.data.data.os.name,
          dateAdd: this.agent.data.data.dateAdd,
          lastKeepAlive: this.agent.data.data.lastKeepAlive,
          group: this.agent.data.data.group.toString()
        }
      } catch (error) {
        this.agentReportData = false
      }

      /**
       * Generates report
       */
      this.scope.startVis2Png = () =>
        this.reportingService.startVis2Png(
          'agents-ca',
          'Configuration assessment',
          this.filters,
          [
            'resultDistribution',
            'alertsOverTime',
            'alertLevelEvolution'
          ],
          {}, //Metrics,
          this.tableResults,
          this.agentReportData
        )

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
            if (v.constructor.name === 'RawTableData') {
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

    $onInit() {
      this.scope.searchRootcheck = (term, specificFilter) =>
        this.scope.$broadcast('wazuhSearch', { term, specificFilter })
      this.scope.downloadCsv = () => this.downloadCsv()

      this.scope.switchVisualizations = () => this.switchVisualizations()
      this.scope.loadPolicyChecks = (id, name) =>
        this.loadPolicyChecks(id, name)
      this.scope.backToConfAssess = () => this.backToConfAssess()

      this.scope.agent =
        this.agent && this.agent.data && this.agent.data.data
          ? this.agent.data.data
          : { error: true }
      this.scope.getAgentStatusClass = agentStatus =>
        this.getAgentStatusClass(agentStatus)
      this.scope.formatAgentStatus = agentStatus =>
        this.formatAgentStatus(agentStatus)
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
     * Exports the table in CSV format
     */
    async downloadCsv() {
      try {
        this.notification.showSimpleToast(
          'Your download should begin automatically...'
        )
        const currentApi = this.api.id
        const output = await this.csvReq.fetch(
          '/agents',
          currentApi,
          this.wzTableFilter.get()
        )
        const blob = new Blob([output], { type: 'text/csv' }) // eslint-disable-line
        saveAs(blob, 'agents.csv') // eslint-disable-line
        return
      } catch (error) {
        this.notification.showErrorToast('Error downloading CSV')
      }
      return
    }

    /**
     * Gets filters and launches search
     */
    launchSearches() {
      this.filters = this.currentDataService.getSerializedFilters()
      this.state.reload()
    }

    /**
     * Loads policies checks
     */
    async loadPolicyChecks(id, name) {
      this.scope.showPolicyChecks = name
      this.scope.policyId = id
      const agentId = this.agent.data.data.id
      this.scope.wzTablePath = `/sca/${agentId}/checks/${id}`
    }

    expand(i, id) {
      this.scope.expandArray[i] = !this.scope.expandArray[i]
      let vis = $(
        '#' + id + ' .panel-body .splunk-view .shared-reportvisualizer'
      )
      this.scope.expandArray[i]
        ? vis.css('height', 'calc(100vh - 200px)')
        : vis.css('height', '250px')

      let vis_header = $('.wz-headline-title')
      vis_header.dblclick(e => {
        if (this.scope.expandArray[i]) {
          this.scope.expandArray[i] = !this.scope.expandArray[i]
          this.scope.expandArray[i]
            ? vis.css('height', 'calc(100vh - 200px)')
            : vis.css('height', '250px')
          this.scope.$applyAsync()
        } else {
          e.preventDefault()
        }
      })
    }

  }
  app.controller('agentsConfigurationAssessmentsCtrl', AgentsCA)
})
