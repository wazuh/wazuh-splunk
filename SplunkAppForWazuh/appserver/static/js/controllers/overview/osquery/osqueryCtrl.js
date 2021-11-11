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

  class Osquery extends DashboardMain {
    /**
     * Class Osquery
     * @param {*} $urlTokenModel
     * @param {*} $scope
     * @param {*} $currentDataService
     * @param {*} $state
     * @param {*} $notificationService
     * @param {*} osquery
     * @param {*} $reportingService
     */
    constructor(
      $urlTokenModel,
      $scope,
      $currentDataService,
      $state,
      $notificationService,
      osquery,
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
      this.osquery = osquery
      this.currentDataService.addFilter(
        `{"rule.groups{}":"osquery", "implicit":true}`
      )
      this.scope.osqueryWodle = false
      this.scope.expandArray = [false, false, false, false]
      this.notification = $notificationService

      this.filters = this.getFilters()

      this.vizz = [
        /**
         * Visualizations
         */
        new AreaChart(
          'alertsPacksOverTime',
          `${this.filters} | timechart span=1h count by data.osquery.pack`,
          'alertsPacksOverTime',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new PieChart(
          'topOsqueryAdded',
          `${this.filters} data.osquery.action="added"  | top data.osquery.name limit=5`,
          'topOsqueryAdded',
          this.scope
        ),
        new PieChart(
          'topOsqueryRemoved',
          `${this.filters} data.osquery.action="removed"  | top data.osquery.name limit=5`,
          'topOsqueryRemoved',
          this.scope
        ),
        new PieChart(
          'mostCommonPacks',
          `${this.filters}  | top data.osquery.pack limit=5`,
          'mostCommonPacks',
          this.scope
        ),
        new Table(
          'alertsSummary',
          `${this.filters}  | stats count by data.osquery.name, data.osquery.action,agent.name,data.osquery.pack | rename data.osquery.name as Name, data.osquery.action as Action, agent.name as Agent, data.osquery.pack as Pack, count as Count`,
          'alertsSummary',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryTable',
          `${this.filters}  | stats count by data.osquery.name, data.osquery.action,agent.name,data.osquery.pack | rename data.osquery.name as Name, data.osquery.action as Action, agent.name as Agent, data.osquery.pack as Pack, count as Count`,
          'alertsSummaryTableToken',
          '$result$',
          this.scope,
          'Alerts summary'
        ),
        new Table(
          'topRules',
          `${this.filters}  | top rule.id, rule.description limit=5 | rename rule.id as "Rule ID", rule.description as "Rule description", count as Count, percent as Percent`,
          'topRules',
          this.scope
        ),

        new RawTableDataService(
          'topRulesTable',
          `${this.filters}  | top rule.id, rule.description limit=5 | rename rule.id as "Rule ID", rule.description as "Rule description", count as Count, percent as Percent`,
          'topRulesTableToken',
          '$result$',
          this.scope,
          'Top 5 Rules'
        )
      ]
    }

    /**
     * On controller loads
     */
    $onInit() {
      try {
        const wodles = this.osquery.data.data.wmodules
        this.scope.osqueryWodle = wodles.filter(item => item.osquery)[0].osquery
        /**
         * Generates report
         */
        this.scope.startVis2Png = () =>
          this.reportingService.startVis2Png(
            'ow-osquery',
            'Osquery',
            this.filters,
            [
              'alertsPacksOverTime',
              'topOsqueryAdded',
              'topOsqueryRemoved',
              'mostCommonPacks',
              'alertsSummary',
              'topRules'
            ],
            {}, //Metrics
            this.tableResults
          )
      } catch (err) {
        this.notification.showErrorToast(
          'Cannot load wodle configuration. Osquery is not configured.'
        )
      }
    }
  }

  app.controller('osqueryCtrl', Osquery)
})
