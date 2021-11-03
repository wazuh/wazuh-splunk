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
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/inputs/dropdown-input',
  '../../../services/rawTableData/rawTableDataService'
], function(
  app,
  DashboardMain,
  ColumnChart,
  PieChart,
  Table,
  TimePicker,
  Dropdown,
  RawTableDataService
) {
  'use strict'

  class AgentsGdpr extends DashboardMain {
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
      $currentDataService,
      $scope,
      $state,
      agent,
      $reportingService,
      gdprTabs,
      reportingEnabled,
      pciExtensionEnabled,
      hipaaExtensionEnabled,
      nistExtensionEnabled,
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
      this.scope.reportingEnabled = reportingEnabled
      this.scope.pciExtensionEnabled = pciExtensionEnabled
      this.scope.hipaaExtensionEnabled = hipaaExtensionEnabled
      this.scope.nistExtensionEnabled = nistExtensionEnabled
      this.state = $state
      this.currentDataService = $currentDataService
      this.reportingService = $reportingService
      this.tableResults = {}
      this.agent = agent
      this.scope.expandArray = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]

      if (
        this.agent &&
        this.agent.data &&
        this.agent.data.data &&
        this.agent.data.data.affected_items[0].id
      )
        this.currentDataService.addFilter(
          `{"agent.id":"${this.agent.data.data.affected_items[0].id}", "implicit":true}`
        )

      this.dropdown = new Dropdown(
        'dropDownInput',
        `${this.filters} rule.gdpr{}="*"| stats count by "rule.gdpr{}" | spath "rule.gdpr{}" | fields - count`,
        'rule.gdpr{}',
        '$form.gdpr$',
        'dropDownInput',
        this.scope
      )
      this.dropdownInstance = this.dropdown.getElement()
      this.dropdownInstance.on('change', newValue => {
        if (newValue && this.dropdownInstance) {
          $urlTokenModel.handleValueChange(this.dropdownInstance)
        }
      })
      this.scope.gdprTabs = gdprTabs ? gdprTabs : false

      this.filters = this.getFilters()

      this.vizz = [
        /**
         * Visualizations
         */
        new ColumnChart(
          'gdprRequirementsVizz',
          `${this.filters} rule.gdpr{}="$gdpr$"  | stats count by rule.gdpr{}  | rename count as "Count", rule.gdpr{} as "Requirements"`,
          'gdprRequirementsVizz',
          this.scope
        ),
        new PieChart(
          'groupsVizz',
          `${this.filters} rule.gdpr{}="$gdpr$" | top limit=5 rule.groups{} | rename count as "Count", rule.gdpr{} as "Requirements"`,
          'groupsVizz',
          this.scope
        ),
        new PieChart(
          'top5GDPR',
          `${this.filters} rule.gdpr{}="$gdpr$" | top limit=5 rule.gdpr{} | rename count as "Count", rule.gdpr{} as "Requirements" `,
          'top5GDPR',
          this.scope
        ),
        new PieChart(
          'rulesVizz',
          `${this.filters}  | top limit=5 rule.description | rename count as "Count", rule.gdpr{} as "Requirements" `,
          'rulesVizz',
          this.scope
        ),
        new PieChart(
          'agentsVizz',
          `${this.filters} rule.gdpr{}="$gdpr$" | stats count by agent.name | rename count as "Count", rule.gdpr{} as "Requirements"`,
          'agentsVizz',
          this.scope
        ),
        new ColumnChart(
          'requirementsByAgentVizz',
          `${this.filters} rule.gdpr{}="$gdpr$" agent.name=*| chart  count(rule.gdpr{}) by rule.gdpr{},agent.name | rename count as "Count", rule.gdpr{} as "Requirements"`,
          'requirementsByAgentVizz',
          this.scope
        ),
        new Table(
          'alertsSummaryVizz',
          `${this.filters} rule.gdpr{}="$gdpr$" | stats count sparkline by agent.name, rule.gdpr{}, rule.description | sort count DESC | rename agent.name as "Agent Name", rule.gdpr{} as Requirement, rule.description as "Rule description", count as Count`,
          'alertsSummaryVizz',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryTable',
          `${this.filters} rule.gdpr{}="$gdpr$" | stats count sparkline by agent.name, rule.gdpr{}, rule.description | sort count DESC | rename agent.name as "Agent Name", rule.gdpr{} as Requirement, rule.description as "Rule description", count as Count`,
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
          OS: this.agent.data.data.os.affected_items[0].name,
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
          'agents-gdpr',
          'GDPR',
          this.filters,
          [
            'gdprRequirementsVizz',
            'groupsVizz',
            'top5GDPR',
            'rulesVizz',
            'agentsVizz',
            'requirementsByAgentVizz',
            'alertsSummaryVizz'
          ],
          {}, //Metrics,
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
  }
  app.controller('agentsGdprCtrl', AgentsGdpr)
})
