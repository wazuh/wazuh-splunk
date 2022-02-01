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
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/rawTableData/rawTableDataService',
], function (
  app,
  DashboardMain,
  PieChart,
  Table,
  LinearChart,
  RawTableDataService
) {
  'use strict'

  class OverviewFIM extends DashboardMain {
    /**
     * Class File Integrity Monitoring (syscheck)
     * @param {*} $urlTokenModel
     * @param {*} $scope
     * @param {*} $currentDataService
     * @param {*} $state
     * @param {*} $reportingService
     * @param {*} reportingEnabled
     * @param {*} awsExtensionEnabled
     */
    constructor(
      $urlTokenModel,
      $scope,
      $currentDataService,
      $state,
      $reportingService,
      reportingEnabled,
      awsExtensionEnabled,
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
      this.scope.awsExtensionEnabled = awsExtensionEnabled
      this.currentDataService.addFilter(
        `{"rule.groups{}":"syscheck", "implicit":true, "onlyShow":true}`
      )

      this.scope.expandArray = [false, false, false, false, false, false, false]

      this.filters = this.getFilters()

      this.vizz = [
        /**
         * Visualizations
         */
        new LinearChart(
          'alertsByActionOverTime',
          `${this.filters} rule.groups{}=syscheck  | timechart count by syscheck.event`,
          'alertsByActionOverTime',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new PieChart(
          'top5Agents',
          `${this.filters} rule.groups{}=syscheck  | top agent.name limit=5`,
          'top5Agents',
          this.scope
        ),
        new LinearChart(
          'eventsSummary',
          `${this.filters} rule.groups{}=syscheck  | timechart count`,
          'eventsSummary',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new PieChart(
          'ruleDistribution',
          `${this.filters} rule.groups{}=syscheck  | top limit=5 rule.description`,
          'ruleDistribution',
          this.scope
        ),
        new PieChart(
          'topActions',
          `${this.filters} rule.groups{}=syscheck  | top limit=5 syscheck.event`,
          'topActions',
          this.scope
        ),
        new Table(
          'topUsers',
          `${this.filters} rule.groups{}=syscheck  | top limit=5 agent.id,agent.name,syscheck.uname_after | rename agent.id as "Agent ID", agent.name as "Agent name", syscheck.uname_after as "Top User", count as "Count"`,
          'topUsers',
          this.scope
        ),
        new RawTableDataService(
          'topUsersTable',
          `${this.filters} rule.groups{}=syscheck  | top limit=5 agent.id,agent.name,syscheck.uname_after | rename agent.id as "Agent ID", agent.name as "Agent name", syscheck.uname_after as "Top User", count as "Count"`,
          'topUsersTableToken',
          '$result$',
          this.scope,
          'Top users'
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
            'overview-fim',
            'File integrity monitoring',
            this.filters,
            [
              'alertsByActionOverTime',
              'top5Agents',
              'eventsSummary',
              'ruleDistribution',
              'topActions',
              'topUsers',
            ],
            {}, //Metrics
            this.tableResults
          )
      } catch (error) {
        console.error('error on init ', error)
      }
    }
  }

  app.controller('overviewFimCtrl', OverviewFIM)
})
