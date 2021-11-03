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
  '../../../dashboardMain',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/table/table',
  '../../../services/rawTableData/rawTableDataService'
], function(
  app,
  DashboardMain,
  PieChart,
  AreaChart,
  Table,
  RawTableDataService
) {
  'use strict'

  class AgentsPM extends DashboardMain {
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
      $reportingService,
      $requestService,
      $notificationService,
      $csvRequestService,
      $tableFilterService,
      reportingEnabled,
      extensions,
      requirementsList
    ) {
      super(
        $scope,
        $reportingService,
        $state,
        $currentDataService,
        $urlTokenModel
      )
      console.log(requirementsList)
      this.rootScope = $rootScope
      this.scope.reportingEnabled = reportingEnabled
      this.scope.extensions = extensions
      this.apiReq = $requestService.apiReq
      this.scope.showPolicies = false
      this.agent = agent
      this.notification = $notificationService
      this.api = $currentDataService.getApi()
      this.csvReq = $csvRequestService
      this.wzTableFilter = $tableFilterService
      this.currentDataService.addFilter(
        `{"rule.groups{}":"rootcheck", "implicit":true}`
      )
      this.scope.expandArray = [false, false, false, false, false]
      if (
        this.agent &&
        this.agent.data &&
        this.agent.data.data &&
        this.agent.data.data.affected_items &&
        this.agent.data.data.affected_items.length &&
        this.agent.data.data.affected_items.length
      )
        this.currentDataService.addFilter(
          `{"agent.id":"${this.agent.data.data.affected_items[0].id}", "implicit":true}`
        )

      this.filters = this.getFilters()

      this.vizz = [
        /**
         * Visualizations
         */
        new AreaChart(
          'elementOverTime',
          `${this.filters} rule.description=* | timechart span=1h count by rule.description  `,
          'elementOverTime',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new PieChart(
          'ruleDistribution',
          `${this.filters} rule.description=* | top rule.description`,
          'ruleDistribution',
          this.scope
        ),
        new PieChart(
          'topPciDss',
          `${this.filters} rule.pci_dss{}=* | top  rule.pci_dss{}`,
          'topPciDss',
          this.scope
        ),
        new AreaChart(
          'eventsPerAgent',
          `${this.filters} | timechart span=2h count by agent.name  `,
          'eventsPerAgent',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new Table(
          'alertsSummary',
          `${this.filters} |stats count sparkline by agent.name, rule.description, title | sort count DESC | rename rule.description as "Rule description", agent.name as Agent, title as Control`,
          'alertsSummary',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryTable',
          `${this.filters} |stats count sparkline by agent.name, rule.description, title | sort count DESC | rename rule.description as "Rule description", agent.name as Agent, title as Control`,
          'alertsSummaryTableToken',
          '$result$',
          this.scope,
          'Alerts Summary'
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
          'agents-pm',
          'Policity monitoring',
          this.filters,
          [
            'elementOverTime',
            'ruleDistribution',
            'eventsPerAgent',
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
      this.scope.launchRootcheckScan = () => this.launchRootcheckScan()
      this.scope.launchSyscheckScan = () => this.launchSyscheckScan()

      this.scope.agent =
        this.agent && this.agent.data && this.agent.data.data
          ? this.agent.data.data.affected_items[0]
          : { error: true }

      // Capitalize Status
      if(this.scope.agent && this.scope.agent.status){
        this.scope.agent.status = this.scope.agent.status.charAt(0).toUpperCase() + this.scope.agent.status.slice(1)
      }

      
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
     * Launches a rootcheck scan
     */
    async launchRootcheckScan() {
      try {
        const result = await this.apiReq(
          `/rootcheck/${this.scope.agent.id}`,
          {},
          'PUT'
        )
        if (result && result.data && result.data.error === 0) {
          this.notification.showSuccessToast(
            `Policy monitoring scan launched successfully on agent ${this.scope.agent.id}`
          )
        }
      } catch (error) {
        this.notification.showErrorToast(error.message || error)
      }
    }
  }
  app.controller('agentsPolicyMonitoringCtrl', AgentsPM)
})
