/*
 * Wazuh app - Overview SCA controller
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
  '../../../dashboardMain',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/gauge-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/table/table'
], function(
  app,
  DashboardMain,
  ColumnChart,
  GaugeChart,
  PieChart,
  AreaChart,
  LinearChart,
  Table
) {
  'use strict'

  class overviewSCA extends DashboardMain {
    /**
     * Class Overview SCA
     * @param {Object} $urlTokenModel
     * @param {Object} $scope
     * @param {Object} $state
     * @param {Object} $currentDataService
     * @param {*} $reportingService
     * @param {*} $requestService
     * @param {*} $notificationService
     * @param {*} $csvRequestService
     * @param {*} $tableFilterService
     * @param {*} reportingEnabled
     * @param {*} BASE_URL
     * @param {*} extensions
     */

    constructor(
      $urlTokenModel,
      $rootScope,
      $scope,
      $state,
      $currentDataService,
      $reportingService,
      $requestService,
      $notificationService,
      $csvRequestService,
      $tableFilterService,
      reportingEnabled,
      BASE_URL,
      extensions,
    ) {
      super(
        $scope,
        $reportingService,
        $state,
        $currentDataService,
        $urlTokenModel
      )
      this.rootScope = $rootScope
      this.notification = $notificationService
      this.scope.reportingEnabled = reportingEnabled
      this.scope.extensions = extensions
      this.apiReq = $requestService.apiReq
      this.api = $currentDataService.getApi()
      this.csvReq = $csvRequestService
      this.wzTableFilter = $tableFilterService
      this.baseUrl = BASE_URL
      this.scope.noScansPng = `${this.baseUrl}/static/app/SplunkAppForWazuh/css/images/sca_no_scans.png`
      this.currentDataService.addFilter(
        `{"rule.groups{}":"sca", "implicit":true}`
      )
      this.scope.expandArray = [false, false, false, false, false, false, false]

      this.filters = this.getFilters()

      this.vizz = [
        /**
         * Visualizations
         */
        new GaugeChart(
          'scoreByPolicy',
          `${this.filters}  | stats values(data.sca.score) by data.sca.policy_id `,
          'scoreByPolicy',
          {
            trellisEnabled: true,
            gaugeType: 'radialGauge'
          },
          this.scope
        ),
        new PieChart(
          'resultDistribution',
          `${this.filters}  | stats count by data.sca.check.result `,
          'resultDistribution',
          this.scope
        ),
        new ColumnChart(
          'resultDistributionByPolicy',
          `${this.filters} | stats sum(data.sca.failed) as failed, sum(data.sca.passed) as passed  by data.sca.policy`,
          'resultDistributionByPolicy',
          this.scope
        ),
        new PieChart(
          'top5Passed',
          `${this.filters}  data.sca.check.result="passed"  | top limit=5 data.sca.check.title`,
          'top5Passed',
          this.scope
        ),
        new PieChart(
          'top5Failed',
          `${this.filters}  data.sca.check.result="failed"  | top limit=5 data.sca.check.title`,
          'top5Failed',
          this.scope
        ),
        new PieChart(
          'top5Agents',
          `${this.filters}  | top agent.name limit=5`,
          'top5Agents',
          this.scope
        ),
        new AreaChart(
          'alertLevelEvolution',
          `${this.filters} | timechart span=1h count by rule.level`,
          'alertLevelEvolution',
          this.scope
        ),
        new LinearChart(
          'overTimePolicy',
          `${this.filters} | timechart count by data.sca.policy`,
          'overTimePolicy',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new Table(
          'alertsSummary',
          `${this.filters} | stats count by data.sca.policy,data.sca.passed,data.sca.failed | fields - count | rename data.sca.policy as Policy data.sca.passed as Passed data.sca.failed as Failed | sort - Passed`,
          'alertsSummary',
          this.scope
        )
      ]
      /**
       * Generates report
       */
      this.scope.startVis2Png = () =>
        this.reportingService.startVis2Png(
          'overview-sca',
          'Configuration assessment',
          this.filters,
          [
            'scoreByPolicy',
            'resultDistribution',
            'alertsOverTime',
            'resultDistributionByPolicy',
            'top5Failed',
            'top5Passed',
            'alertsSummary'
          ],
          {}, //Metrics,
          this.tableResults,
          this.agentReportData
        )
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
     * Loads policies checks
     */
    async loadPolicyChecks(id, name) {
      this.scope.showPolicyChecks = name
      this.scope.policyId = id
      const agentId = this.agent.data.data.id
      this.scope.wzTablePath = `/sca/${agentId}/checks/${id}`
    }
  }
  app.controller('overviewSCACtrl', overviewSCA)
})
