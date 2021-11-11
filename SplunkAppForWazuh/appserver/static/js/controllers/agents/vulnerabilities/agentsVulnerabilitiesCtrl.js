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
  '../../../services/visualizations/search/search-handler',
  '../../../services/rawTableData/rawTableDataService'
], function(
  app,
  DashboardMain,
  PieChart,
  AreaChart,
  Table,
  SearchHandler,
  RawTableDataService
) {
  'use strict'

  class AgentsVulnerabilities extends DashboardMain {
    /**
     * Class constructor
     * @param {Object} $urlTokenModel
     * @param {Object} $scope
     * @param {Object} $currentDataService
     * @param {Object} $state
     * @param {Object} agent
     * @param {*} $reportingService
     */

    constructor(
      $urlTokenModel,
      $scope,
      $currentDataService,
      $state,
      agent,
      $reportingService,
      reportingEnabled,
      extensions,
      rbacRequirements
    ) {
      super(
        $scope,
        $reportingService,
        $state,
        $currentDataService,
        $urlTokenModel
      )
      console.log(rbacRequirements)
      this.scope.reportingEnabled = reportingEnabled
      this.scope.extensions = extensions
      this.currentDataService.addFilter(
        `{"rule.groups{}":"vulnerability-detector", "implicit":true, "onlyShow":true}`
      )

      this.agent = agent
      this.scope.expandArray = [false, false, false, false, false, false]

      if (
        this.agent &&
        this.agent.data &&
        this.agent.data.data &&
        this.agent.data.data.affected_items[0].id
      )
        this.currentDataService.addFilter(
          `{"agent.id":"${this.agent.data.data.affected_items[0].id}", "implicit":true}`
        )
      if (!this.currentDataService.getCurrentAgent()) {
        this.state.go('overview')
      }

      this.filters = this.getFilters()

      this.vizz = [
        /**
         * Metrics
         */
        new SearchHandler(
          `criticalSeveritySearch`,
          `${this.filters} data.vulnerability.severity=critical | stats count`,
          `criticalSeverityToken`,
          `$result.count$`,
          `criticalSeverity`,
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `highSeveritySeach`,
          `${this.filters} data.vulnerability.severity=high | stats count`,
          `highSeverityToken`,
          `$result.count$`,
          `highSeverity`,
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `mediumSeveritySeach`,
          `${this.filters} data.vulnerability.severity=medium | stats count`,
          `mediumSeverityToken`,
          `$result.count$`,
          `mediumSeverity`,
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lowSeveritySeach`,
          `${this.filters} data.vulnerability.severity=low | stats count`,
          `lowSeverityToken`,
          `$result.count$`,
          `lowSeverity`,
          this.submittedTokenModel,
          this.scope
        ),
        /**
         * Visualizations
         */
        new AreaChart(
          'alertsSeverityOverTimeVizz',
          `${this.filters} rule.groups{}=vulnerability-detector data.vulnerability.severity=* | timechart count by data.vulnerability.severity`,
          'alertsSeverityOverTimeVizz',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new Table(
          'commonRules',
          `${this.filters} rule.groups{}="vulnerability-detector" | top rule.id,rule.description limit=5 | rename rule.id as "Rule ID", rule.description as "Rule Description", count as Count, percent as Percent`,
          'commonRules',
          this.scope
        ),
        new PieChart(
          'commonCves',
          `${this.filters} rule.groups{}="vulnerability-detector" | top data.vulnerability.cve limit=5`,
          'commonCves',
          this.scope
        ),
        new PieChart(
          'severityDistribution',
          `${this.filters} rule.groups{}="vulnerability-detector" | top data.vulnerability.severity limit=5`,
          'severityDistribution',
          this.scope
        ),
        new PieChart(
          'commonlyAffectedPackVizz',
          `${this.filters} | top 5 data.vulnerability.package.name`,
          'commonlyAffectedPackVizz',
          this.scope
        ),
        new Table(
          'alertsSummaryVizz',
          `${this.filters} | stats count sparkline by data.vulnerability.title, data.vulnerability.severity | sort count DESC  | rename data.vulnerability.title as Title, data.vulnerability.severity as Severity, count as Count, sparkline as Sparkline `,
          'alertsSummaryVizz',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryTable',
          `${this.filters} | stats count sparkline by data.vulnerability.title, data.vulnerability.severity | sort count DESC  | rename data.vulnerability.title as Title, data.vulnerability.severity as Severity, count as Count, sparkline as Sparkline `,
          'alertsSummaryTableToken',
          '$result$',
          this.scope,
          'Alerts Summary'
        ),
        new RawTableDataService(
          'commonRulesTable',
          `${this.filters} rule.groups{}="vulnerability-detector" | top rule.id,rule.description limit=5 | rename rule.id as "Rule ID", rule.description as "Rule description", count as Count, percent as Percent`,
          'commonRulesTableToken',
          '$result$',
          this.scope,
          'Common Rules'
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
          'agents-vulnerabilities',
          'Vulnerabilities',
          this.filters,
          [
            'alertsSeverityOverTimeVizz',
            'commonRules',
            'commonCves',
            'severityDistribution',
            'commonlyAffectedPackVizz',
            'alertsSummaryVizz'
          ],
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
     * Returns a class depending on the agent state
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
        'Critical severity alerts': this.scope.criticalSeverity,
        'High severity alerts': this.scope.highSeverity,
        'Medium severity alerts': this.scope.mediumSeverity,
        'Low severity alerts': this.scope.lowSeverity
      }
    }
  }
  app.controller('agentsVulnerabilitiesCtrl', AgentsVulnerabilities)
})
