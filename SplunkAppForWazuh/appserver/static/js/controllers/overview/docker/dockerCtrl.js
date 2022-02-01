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
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/table/table',
  '../../../services/rawTableData/rawTableDataService',
], function (
  app,
  DashboardMain,
  PieChart,
  LinearChart,
  Table,
  RawTableDataService
) {
  'use strict'

  class Docker extends DashboardMain {
    /**
     * Class Docker
     * @param {*} $urlTokenModel
     * @param {*} $scope
     * @param {*} $currentDataService
     * @param {*} $state
     * @param {*} $notificationService
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
      extensions
    ) {
      super(
        $scope,
        $reportingService,
        $state,
        $currentDataService,
        $urlTokenModel
      )
      this.scope.reportingEnabled = reportingEnabled
      this.scope.extensions = extensions
      this.currentDataService.addFilter(
        `{"rule.groups{}":"docker", "implicit":true}`
      )
      this.scope.expandArray = [false, false, false, false]
      this.filters = this.getFilters()

      this.vizz = [
        /**
         * Visualizations
         */
        new PieChart(
          'top5images',
          `${this.filters} | stats count by data.docker.id`,
          'top5images',
          this.scope
        ),
        new LinearChart(
          'eventsOcurred',
          `${this.filters} data.docker.Action="*" | timechart span=1h count by data.docker.Action`,
          'eventsOcurred',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new PieChart(
          'top5actions',
          `${this.filters}  | top data.docker.Action limit=5`,
          'top5actions',
          this.scope
        ),
        new Table(
          'alertsSummary',
          `${this.filters}  | stats count sparkline by data.docker.Actor.Attributes.image, data.docker.Actor.Attributes.name, data.docker.Action, timestamp | sort count DESC | rename data.docker.Actor.Attributes.image as Image, data.docker.Actor.Attributes.name as Container, data.docker.Action as Action, timestamp as Date, count as Count, sparkline as Sparkline`,
          'alertsSummary',
          this.scope
        ),
        new LinearChart(
          'resourceUsage',
          `${this.filters} data.docker.Type="*" | timechart span=1h count by data.docker.Type`,
          'resourceUsage',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new RawTableDataService(
          'alertsSummaryRawTable',
          `${this.filters}  | stats count sparkline by data.docker.Actor.Attributes.image, data.docker.Actor.Attributes.name, data.docker.Action, timestamp | sort count DESC | rename data.docker.Actor.Attributes.image as Image, data.docker.Actor.Attributes.name as Container, data.docker.Action as Action, timestamp as Date, count as Count, sparkline as Sparkline`,
          'alertsSummaryRawTableToken',
          '$result$',
          this.scope,
          'Alerts summary'
        ),
      ]
    }

    /**
     * On controller loads
     */
    $onInit() {
      try {
        /**
         * Generates report
         */
        this.scope.startVis2Png = () =>
          this.reportingService.startVis2Png(
            'ow-docker',
            'Docker',
            this.filters,
            ['top5images', 'eventsOcurred', 'top5actions', 'resourceUsage'],
            {}, //Metrics
            this.tableResults
          )
      } catch (error) {
        console.error('Error onInit ', error)
      }
    }
  }

  app.controller('dockerCtrl', Docker)
})
