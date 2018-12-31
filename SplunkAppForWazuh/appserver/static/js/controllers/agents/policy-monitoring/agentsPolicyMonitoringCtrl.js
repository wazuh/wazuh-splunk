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
  '../../../services/rawTableData/rawTableDataService'
], function(app, PieChart, AreaChart, Table, TimePicker, rawTableDataService) {
  'use strict'

  class AgentsPM {
    /**
     * Class Agents Policy-Monitoring
     * @param {Object} $urlTokenModel
     * @param {Object} $scope
     * @param {Object} $state
     * @param {Object} $currentDataService
     * @param {Object} agent
     * @param {*} $reportingService 
     */

    constructor($urlTokenModel, $scope, $state, $currentDataService, agent, $reportingService) {
      this.urlTokenModel = $urlTokenModel
      this.scope = $scope
      this.state = $state
      this.reportingService = $reportingService
      this.tableResults = {}
      this.currentDataService = $currentDataService
      this.agent = agent
      this.currentDataService.addFilter(
        `{"rule.groups":"rootcheck", "implicit":true}`
      )
      if (
        this.agent &&
        this.agent.data &&
        this.agent.data.data &&
        this.agent.data.data.id
      )
        this.currentDataService.addFilter(
          `{"agent.id":"${this.agent.data.data.id}", "implicit":true}`
        )
      this.filters = this.currentDataService.getSerializedFilters()
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
        new AreaChart(
          'elementOverTime',
          `${
            this.filters
          } sourcetype=wazuh rule.description=* | timechart span=1h count by rule.description`,
          'elementOverTime',
          this.scope
        ),
        new PieChart(
          'cisRequirements',
          `${this.filters} sourcetype=wazuh rule.cis{}=* | top  rule.cis{}`,
          'cisRequirements',
          this.scope
        ),
        new PieChart(
          'topPciDss',
          `${
            this.filters
          } sourcetype=wazuh rule.pci_dss{}=* | top  rule.pci_dss{}`,
          'topPciDss',
          this.scope
        ),
        new AreaChart(
          'eventsPerAgent',
          `${
            this.filters
          } sourcetype=wazuh | timechart span=2h count by agent.name`,
          'eventsPerAgent',
          this.scope
        ),
        new Table(
          'alertsSummary',
          `${
            this.filters
          } sourcetype=wazuh |stats count sparkline by agent.name, rule.description, title | sort count DESC | rename rule.description as "Rule description", agent.name as Agent, title as Control`,
          'alertsSummary',
          this.scope
        )
      ]

      this.alertsSummaryTable = new rawTableDataService(
        'alertsSummaryTable',
        `${
          this.filters
        } sourcetype=wazuh |stats count sparkline by agent.name, rule.description, title | sort count DESC | rename rule.description as "Rule description", agent.name as Agent, title as Control`,
        'alertsSummaryTableToken',
        '$result$',
        this.submittedTokenModel,
        this.scope
      )
      this.vizz.push(this.alertsSummaryTable)

      this.alertsSummaryTable.getSearch().on('result', (result) => {
        this.tableResults['Alerts Summary'] = result
      })

      /**
       * Generates report
       */
      this.scope.startVis2Png = () =>
      this.reportingService.startVis2Png('agents-pm', 'Policity monitoring', this.filters, [
        'elementOverTime',
        'cisRequirements',
        'topPciDss',
        'eventsPerAgent',
        'alertsSummary'
      ],
      {},//Metrics,
      this.tableResults)

      this.scope.$on('loadingReporting', (event, data) => {
        this.scope.loadingReporting = data.status
      })      

      this.scope.$on("checkReportingStatus", () => {
        this.vizzReady = !this.vizz.filter( v => {
          return v.finish === false
        }).length
        if (this.vizzReady) { 
          this.scope.loadingVizz = false
        } else { 
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
     * Gets filters and launches search
     */
    launchSearches() {
      this.filters = this.currentDataService.getSerializedFilters()
      this.state.reload()
    }
  }

  app.controller('agentsPolicyMonitoringCtrl', AgentsPM)
})
