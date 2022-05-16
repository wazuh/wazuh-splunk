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
  '../../../services/rawTableData/rawTableDataService',
], function (
  app,
  DashboardMain,
  PieChart,
  AreaChart,
  Table,
  RawTableDataService
) {
  'use strict'
  class PM extends DashboardMain {
    /**
     *
     * @param {*} $urlTokenModel
     * @param {*} $scope
     * @param {*} $currentDataService
     * @param {*} $state
     * @param {*} $reportingService
     * @param {*} reportingEnabled
     * @param {*} extensions
     */
    constructor(
      $urlTokenModel,
      $scope,
      $currentDataService,
      $state,
      $reportingService,
      reportingEnabled,
      extensions,
      $notificationService
    ) {
      super(
        $scope,
        $reportingService,
        $state,
        $currentDataService,
        $urlTokenModel,
        $notificationService
      )
      this.scope.reportingEnabled = reportingEnabled
      this.scope.extensions = extensions
      $currentDataService.addFilter(
        `{"rule.groups{}":"rootcheck", "implicit":true}`
      )

      this.scope.expandArray = [false, false, false, false, false]

      this.filters = this.getFilters()

      this.vizz = [
        /**
         * Visualizations
         */
        new AreaChart(
          'elementOverTime',
          `${this.filters} rule.description=* | timechart span=1h count by rule.description`,
          'elementOverTime',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new PieChart(
          'ruleDistribution',
          `${this.filters} rule.level=* | top rule.level`,
          'ruleDistribution',
          this.scope
        ),
        new PieChart(
          'topAgents',
          `${this.filters} agent.name=* | top agent.name`,
          'topAgents',
          this.scope
        ),
        new AreaChart(
          'eventsPerAgent',
          `${this.filters} | timechart span=2h count by data.title`,
          'eventsPerAgent',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new Table(
          'alertsSummary',
          `${this.filters} |stats count sparkline by agent.name, rule.description,data.title | sort count DESC | rename rule.description as "Rule description", agent.name as Agent, title as Control`,
          'alertsSummary',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryTable',
          `${this.filters} |stats count sparkline by agent.name, rule.description,data.title | sort count DESC | rename rule.description as "Rule description", agent.name as Agent, title as Control`,
          'alertsSummaryTableToken',
          '$result$',
          this.scope,
          'Alerts Summary'
        ),
      ]
    }

    $onInit() {
      try {
        /**
         * Generates report
         */
        this.scope.startVis2Png = () =>
          this.reportingService.startVis2Png(
            'overview-pm',
            'Policity monitoring',
            this.filters,
            [
              'elementOverTime',
              'ruleDistribution',
              'topAgents',
              'eventsPerAgent',
              'alertsSummary',
            ],
            {}, //Metrics
            this.tableResults
          )
      } catch (error) {} //eslint-disable-line
    }
  }
  app.controller('overviewPolicyMonitoringCtrl', PM)
})
