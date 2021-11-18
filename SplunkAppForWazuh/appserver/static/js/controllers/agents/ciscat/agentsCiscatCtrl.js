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
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/search/search-handler',
  '../../../services/rawTableData/rawTableDataService'
], function(
  app,
  DashboardMain,
  ColumnChart,
  LinearChart,
  Table,
  SearchHandler,
  RawTableDataService
) {
  'use strict'

  class AgentsCiscat extends DashboardMain {
    /**
     *
     * @param {*} $urlTokenModel
     * @param {*} $scope
     * @param {*} $state
     * @param {*} $currentDataService
     * @param {Object} agent
     * @param {*} $reportingService
     * @param {*} reportingEnabled
     * @param {*} extensions
     * @param {*} $security_service
     */
    constructor(
      $urlTokenModel,
      $scope,
      $state,
      $currentDataService,
      agent,
      $reportingService,
      reportingEnabled,
      extensions,
      $security_service
    ) {
      super(
        $scope,
        $reportingService,
        $state,
        $currentDataService,
        $urlTokenModel
      )
      this.currentDataService.addFilter(
        `{"rule.groups{}":"ciscat", "implicit":true, "onlyShow":true}`
      )

      if (!this.currentDataService.getCurrentAgent()) {
        this.state.go('overview')
      }

      this.scope.reportingEnabled = reportingEnabled
      this.scope.extensions = extensions
      this.scope.userHasPermissions = $security_service.userHasPermissions.bind($security_service)
      this.agent = agent
      this.scope.expandArray = [false, false, false]

      if (
        this.agent &&
        this.agent.data &&
        this.agent.data.data &&
        this.agent.data.data.affected_items[0].id
      )
        this.currentDataService.addFilter(
          `{"agent.id":"${this.agent.data.data.affected_items[0].id}", "implicit":true}`
        )

      this.filters = this.getFilters()

      this.vizz = [
        /**
         * Metrics
         */
        new SearchHandler(
          `lastNotChecked`,
          `${this.filters} | search data.cis.notchecked=* | table data.cis.notchecked | head 1`,
          `filesAddedToken`,
          '$result.data.cis.notchecked$',
          'lastNotChecked',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastPass`,
          `${this.filters} | search data.cis.pass=* | table data.cis.pass | head 1`,
          `lastPass`,
          '$result.data.cis.pass$',
          'lastPass',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastScanScore`,
          `${this.filters} | search data.cis.score=* | table data.cis.score | head 1`,
          `lastScanScore`,
          '$result.data.cis.score$',
          'lastScanScore',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastScanDate`,
          `${this.filters}  | search data.cis.timestamp=* | table data.cis.timestamp | head 1`,
          'lastScanDate',
          '$result.data.cis.timestamp$',
          'lastScanDate',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastErrors`,
          `${this.filters} | search data.cis.error=* | table data.cis.error | head 1`,
          'lastErrors',
          '$result.data.cis.error$',
          'lastErrors',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastFails`,
          `${this.filters} | search data.cis.fail=* | table data.cis.fail | head 1`,
          'lastFails',
          '$result.data.cis.fail$',
          'lastFails',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastUnknown`,
          `${this.filters} | search data.unknown.fail=* | table data.cis.unknown | head 1`,
          'lastUnknown',
          '$result.data.cis.unknown$',
          'lastUnknown',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastScanBenchmark`,
          `${this.filters} rule.groups{}=ciscat | search data.cis.benchmark=* | table data.cis.benchmark | head 1`,
          'lastScanBenchmark',
          '$result.data.cis.benchmark$',
          'lastScanBenchmark',
          this.submittedTokenModel,
          this.scope
        ),
        /**
         * Visualizations
         */
        new ColumnChart(
          'topCiscatGroups',
          `${this.filters} rule.groups{}="ciscat" | top data.cis.group`,
          'topCiscatGroups',
          this.scope
        ),
        new LinearChart(
          'scanResultEvolution',
          `${this.filters} rule.groups{}="ciscat" | timechart count by data.cis.result usenull=f`,
          'scanResultEvolution',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new Table(
          'alertsSummary',
          `${this.filters} rule.groups{}="ciscat" | stats count sparkline by data.cis.rule_title, data.cis.remediation,data.cis.group | sort count desc | rename "data.cis.rule_title" as "Title",  "data.cis.remediation" as "Remediation",  "data.cis.group" as "Group" `,
          'alertsSummary',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryTable',
          `${this.filters} rule.groups{}="ciscat" | stats count sparkline by data.cis.rule_title, data.cis.remediation,data.cis.group | sort count desc | rename "data.cis.rule_title" as "Title",  "data.cis.remediation" as "Remediation",  "data.cis.group" as "Group" `,
          'alertsSummaryTableToken',
          '$result$',
          this.scope,
          'Alerts Summary'
        )
      ]

      // Set agent info
      try {
        this.agentReportData = {
          ID: this.agent.data.data.affected_items[0].id,
          Name: this.agent.data.data.affected_items[0].name,
          IP: this.agent.data.data.affected_items[0].ip,
          Version: this.agent.data.data.affected_items[0].version,
          Manager: this.agent.data.data.affected_items[0].manager,
          OS: this.agent.data.data.affected_items[0].os.name,
          dateAdd: this.agent.data.data.affected_items[0].dateAdd,
          lastKeepAlive: this.agent.data.data.affected_items[0].lastKeepAlive,
          group: this.agent.data.data.affected_items[0].group.toString()
        }
      } catch (error) {
        this.agentReportData = false
      }

      /**
       * Generates report
       */
      this.scope.startVis2Png = () =>
        this.reportingService.startVis2Png(
          'agents-ciscat',
          'CIS-CAT',
          this.filters,
          ['topCiscatGroups', 'scanResultEvolution', 'alertsSummary'],
          this.reportMetrics,
          this.tableResults,
          this.agentReportData
        )
    }

    /**
     * On controller loads
     */
    $onInit() {
      this.scope.agent =
        this.agent && this.agent.data && this.agent.data.data
          ? this.agent.data.data.affected_items[0]
          : { error: true }
      // Capitalize Status
      if(this.scope.agent && this.scope.agent.status){
        this.scope.agent.status = this.scope.agent.status.charAt(0).toUpperCase() + this.scope.agent.status.slice(1)
      }

        
      this.scope.formatAgentStatus = agentStatus =>
        this.formatAgentStatus(agentStatus)
      this.scope.getAgentStatusClass = agentStatus =>
        this.getAgentStatusClass(agentStatus)
      this.scope.$on('deletedFilter', event => {
        event.stopPropagation()
        this.launchSearches()
      })
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
     * Returns a class depending of the agent state
     * @param {String} agentStatus
     */
    getAgentStatusClass(agentStatus) {
      return agentStatus === 'Active' ? 'teal' : 'red'
    }

    /**
     * Set report metrics
     */
    setReportMetrics() {
      this.reportMetrics = {
        'Last not checked': this.scope.lastNotChecked,
        'Last pass': this.scope.lastPass,
        'Last scan score': this.scope.lastScanScore,
        'Last scan date': this.scope.lastScanDate,
        'Last errores': this.scope.lastErrors,
        'Last fails': this.scope.lastFails,
        'Last unknown': this.scope.lastUnknown,
        'Last scan benchmark': this.scope.lastScanBenchmark
      }
    }
  }
  app.controller('agentsCiscatCtrl', AgentsCiscat)
})
