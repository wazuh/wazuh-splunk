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
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/chart/bar-chart',
  '../../../services/rawTableData/rawTableDataService',
], function (
  app,
  DashboardMain,
  ColumnChart,
  AreaChart,
  PieChart,
  Table,
  LinearChart,
  BarChart,
  RawTableDataService
) {
  'use strict'

  class OverviewVirusTotal extends DashboardMain {
    /**
     * Class Overview Virus Total
     * @param {*} $scope
     * @param {*} $urlTokenModel
     * @param {*} $currentDataService
     * @param {*} $state
     * @param {*} $reportingService
     * @param {*} reportingEnabled
     * @param {*} extensions
     */
    constructor(
      $scope,
      $urlTokenModel,
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
        `{"rule.groups{}":"virustotal", "implicit":true}`
      )
      this.scope.expandArray = [false, false, false, false, false]

      this.filters = this.getFilters()

      this.vizz = [
        /**
         * Visualizations
         */
        new ColumnChart(
          'top10AgentsPositive',
          `${this.filters}  | stats count(data.virustotal.positives) by agent.name | rename agent.name as "Agent name", count(data.virustotal.positives) as "Positives"`,
          'top10AgentsPositive',
          this.scope
        ),
        new PieChart(
          'top10AgentsNoPositive',
          `${this.filters} rule.id=87104 | top agent.name limit=5`,
          'top10AgentsNoPositive',
          this.scope
        ),
        new AreaChart(
          'maliciousEventsOverTimeElement',
          `${this.filters} data.virustotal.malicious="*" | timechart span=12h count by data.virustotal.malicious`,
          'maliciousEventsOverTimeElement',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new PieChart(
          'lastScannedFiles',
          `${this.filters} | top limit=5 data.virustotal.source.file`,
          'lastScannedFiles',
          this.scope
        ),
        new Table(
          'top5Rules',
          `${this.filters} |stats count sparkline by rule.id, rule.description | sort count DESC | head 5 | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,
          'top5Rules',
          this.scope
        ),
        new Table(
          'MaliciousFilesPerAgent',
          `${this.filters}| stats count(data.virustotal.malicious) by agent.name,data.virustotal.source.md5 | rename agent.name as "Agent name", count(data.virustotal.malicious)  as Count, data.virustotal.source.md5 as md5`,
          'MaliciousFilesPerAgent',
          this.scope
        ),
        new RawTableDataService(
          'MaliciousFilesPerAgentTable',
          `${this.filters}| stats count(data.virustotal.malicious) by agent.name,data.virustotal.source.md5 | rename agent.name as "Agent name", count(data.virustotal.malicious)  as Count, data.virustotal.source.md5 as md5`,
          'MaliciousFilesPerAgentTableToken',
          '$result$',
          this.scope,
          'Unique malicious files per agent'
        ),
        new LinearChart(
          'eventsSummary',
          `${this.filters} | timechart count`,
          'eventsSummary',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new BarChart(
          'alertsPerAgent',
          `${this.filters} | top agent.name`,
          'alertsPerAgent',
          this.scope
        ),
        new Table(
          'lastFiles',
          `${this.filters} | stats count by data.virustotal.source.file,data.virustotal.permalink | sort count DESC | rename  data.virustotal.source.file as File,data.virustotal.permalink as Link, count as Count`,
          'lastFiles',
          this.scope
        ),
        new RawTableDataService(
          'lastFilesTable',
          `${this.filters} | stats count by data.virustotal.source.file,data.virustotal.permalink | sort count DESC | rename  data.virustotal.source.file as File,data.virustotal.permalink as Link, count as Count`,
          'lastFilesToken',
          '$result$',
          this.scope,
          'Last Files'
        ),
        new RawTableDataService(
          'top5RulesTable',
          `${this.filters} |stats count sparkline by rule.id, rule.description | sort count DESC | head 5 | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,
          'top5RulesTableToken',
          '$result$',
          this.scope,
          'Top 5 Rules'
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
            'overview-virustotal',
            'VirusTotal',
            this.filters,
            [
              'lastFiles',
              'maliciousEventsOverTimeElement',
              'MaliciousFilesPerAgent',
              'lastScannedFiles',
              'top10AgentsPositive',
              'eventsSummary',
              'top10AgentsNoPositive',
              'alertsPerAgent',
              'top5Rules',
            ],
            {}, //Metrics
            this.tableResults
          )
      } catch (error) {} //eslint-disable-line
    }
  }
  app.controller('overviewVirusTotal', OverviewVirusTotal)
})
