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
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/search/search-handler'
], function(app, PieChart, AreaChart, Table, TimePicker, SearchHandler) {
  'use strict'

  class AgentsVulnerabilities {
    /**
     * Class constructor
     * @param {Object} $urlTokenModel
     * @param {Object} $scope
     * @param {Object} $currentDataService
     * @param {Object} $state
     * @param {Object} agent
     */

    constructor($urlTokenModel, $scope, $currentDataService, $state, agent) {
      this.urlTokenModel = $urlTokenModel
      this.scope = $scope
      this.currentDataService = $currentDataService
      this.state = $state
      this.agent = agent
      if (
        this.agent &&
        this.agent.data &&
        this.agent.data.data &&
        this.agent.data.data.id
      )
        this.currentDataService.addFilter(
          `{"agent.id":"${this.agent.data.data.id}", "implicit":true}`
        )
      if (!this.currentDataService.getCurrentAgent()) {
        this.state.go('overview')
      }
      this.filters = this.currentDataService.getSerializedFilters()
      this.timePicker = new TimePicker(
        '#timePicker',
        this.urlTokenModel.handleValueChange
      )
      this.submittedTokenModel = this.urlTokenModel.getSubmittedTokenModel()

      this.scope.$on('deletedFilter', () => {
        this.launchSearches()
      })

      this.scope.$on('barFilter', () => {
        this.launchSearches()
      })

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
          `${
            this.filters
          } sourcetype=wazuh rule.groups=vulnerability-detector data.vulnerability.severity=* | timechart count by data.vulnerability.severity`,
          'alertsSeverityOverTimeVizz'
        ),
        new Table(
          'commonRules',
          `${
            this.filters
          } rule.groups="vulnerability-detector" | top rule.id,rule.description limit=5`,
          'commonRules'
        ),
        new PieChart(
          'commonCves',
          `${
            this.filters
          } rule.groups="vulnerability-detector" | top data.vulnerability.cve limit=5`,
          'commonCves'
        ),
        new PieChart(
          'severityDistribution',
          `${
            this.filters
          } rule.groups="vulnerability-detector" | top data.vulnerability.severity limit=5`,
          'severityDistribution'
        ),
        new PieChart(
          'commonlyAffectedPackVizz',
          `${this.filters} | top 5 data.vulnerability.package.name`,
          'commonlyAffectedPackVizz'
        ),
        new Table(
          'alertsSummaryVizz',
          `${
            this.filters
          } | stats count sparkline by data.vulnerability.title, data.vulnerability.severity, data.vulnerability.reference`,
          'alertsSummaryVizz'
        )
      ]

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
      this.scope.agent =
        this.agent && this.agent.data && this.agent.data.data
          ? this.agent.data.data
          : { error: true }
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
      agentStatus === 'Active' ? 'teal' : 'red'
    }

    /**
     * Gets filters and launches search
     */
    launchSearches() {
      this.filters = this.currentDataService.getSerializedFilters()
      this.state.reload()
    }
  }

  app.controller('agentsVulnerabilitiesCtrl', AgentsVulnerabilities)
})
