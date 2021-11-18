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
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/search/search-handler',
  '../../../services/rawTableData/rawTableDataService'
], function(
  app,
  DashboardMain,
  ColumnChart,
  PieChart,
  AreaChart,
  Table,
  SearchHandler,
  RawTableDataService
) {
  'use strict'
  class OverviewVulnerabilities extends DashboardMain {
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
        `{"rule.groups{}":"vulnerability-detector", "implicit":true, "onlyShow":true}`
      )

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
        new PieChart(
          'affectedAgents',
          `${this.filters} rule.groups{}=vulnerability-detector | top agent.name limit=5`,
          'affectedAgents',
          this.scope
        ),
        new AreaChart(
          'alertsEvolution',
          `${this.filters} rule.groups{}=vulnerability-detector data.vulnerability.severity=* | timechart count by data.vulnerability.severity`,
          'alertsEvolution',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new ColumnChart(
          'severityDist',
          `${this.filters} data.vulnerability.severity=*  | spath "agent.name"  | search "agent.name"=*   | rename agent.id AS RootObject.agent.id agent.ip AS RootObject.agent.ip agent.name AS RootObject.agent.name data.vulnerability.cve AS RootObject.data.vulnerability.cve data.vulnerability.package.condition AS RootObject.data.vulnerability.package.condition data.vulnerability.package.name AS RootObject.data.vulnerability.package.name data.vulnerability.package.version AS RootObject.data.vulnerability.package.version data.vulnerability.published AS RootObject.data.vulnerability.published data.vulnerability.references AS RootObject.data.vulnerability.references data.vulnerability.severity AS RootObject.data.vulnerability.severity data.vulnerability.state AS RootObject.data.vulnerability.state data.vulnerability.title AS RootObject.data.vulnerability.title data.vulnerability.updated AS RootObject.data.vulnerability.updated date_hour AS RootObject.date_hour date_mday AS RootObject.date_mday date_minute AS RootObject.date_minute date_month AS RootObject.date_month date_second AS RootObject.date_second date_wday AS RootObject.date_wday date_year AS RootObject.date_year date_zone AS RootObject.date_zone decoder.name AS RootObject.decoder.name id AS RootObject.id index AS RootObject.index linecount AS RootObject.linecount location AS RootObject.location manager.name AS RootObject.manager.name rule.description AS RootObject.rule.description rule.firedtimes AS RootObject.rule.firedtimes "rule.gdpr{}" AS "RootObject.rule.gdpr{}" rule.groups{} AS RootObject.rule.groups{} "rule.groups{}{}" AS "RootObject.rule.groups{}{}" rule.id AS RootObject.rule.id rule.level AS RootObject.rule.level rule.mail AS RootObject.rule.mail splunk_server AS RootObject.splunk_server timeendpos AS RootObject.timeendpos timestamp AS RootObject.timestamp timestartpos AS RootObject.timestartpos | fields "_time" "host" "source" "sourcetype" "RootObject.agent.id" "RootObject.agent.ip" "RootObject.agent.name" "RootObject.data.vulnerability.cve" "RootObject.data.vulnerability.package.condition" "RootObject.data.vulnerability.package.name" "RootObject.data.vulnerability.package.version" "RootObject.data.vulnerability.published" "RootObject.data.vulnerability.references" "RootObject.data.vulnerability.severity" "RootObject.data.vulnerability.state" "RootObject.data.vulnerability.title" "RootObject.data.vulnerability.updated" "RootObject.date_hour" "RootObject.date_mday" "RootObject.date_minute" "RootObject.date_month" "RootObject.date_second" "RootObject.date_wday" "RootObject.date_year" "RootObject.date_zone" "RootObject.decoder.name" "RootObject.id" "RootObject.index" "RootObject.linecount" "RootObject.location" "RootObject.manager.name" "RootObject.rule.description" "RootObject.rule.firedtimes" ""RootObject.rule.gdpr{}"" "RootObject.rule.groups{}" ""RootObject.rule.groups{}{}"" "RootObject.rule.id" "RootObject.rule.level" "RootObject.rule.mail" "RootObject.splunk_server" "RootObject.timeendpos" "RootObject.timestamp" "RootObject.timestartpos" | eval "RootObject.data.vulnerability.severity"='RootObject.data.vulnerability.severity', "agent.name"='RootObject.agent.name' | chart dedup_splitvals=t limit=100 useother=t count AS "Count of 1532686833.50"  by agent.name RootObject.data.vulnerability.severity format=$$VAL$$:::$$AGG$$ | sort limit=100 RootObject.agent.name | fields - _span  | fields agent.name *`,
          'severityDist',
          this.scope
        ),
        new PieChart(
          'commonAffectedPackages',
          `${this.filters} | top 5 data.vulnerability.package.name`,
          'commonAffectedPackages',
          this.scope
        ),
        new PieChart(
          'commonCves',
          `${this.filters} rule.groups{}=vulnerability-detector | top data.vulnerability.cve limit=5`,
          'commonCves',
          this.scope
        ),
        new PieChart(
          'commonCwes',
          `${this.filters} rule.groups{}=vulnerability-detector | top data.vulnerability.cwe_reference limit=5`,
          'commonCwes',
          this.scope
        ),
        new Table(
          'alertsSummary',
          `${this.filters} | stats count sparkline by data.vulnerability.title, data.vulnerability.severity, data.vulnerability.references | sort count DESC  | rename data.vulnerability.title as Title, data.vulnerability.severity as Severity, data.vulnerability.references as Reference, count as Count, sparkline as Sparkline`,
          'alertsSummary',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryTable',
          `${this.filters} | stats count sparkline by data.vulnerability.title, data.vulnerability.severity, data.vulnerability.references | sort count DESC  | rename data.vulnerability.title as Title, data.vulnerability.severity as Severity, data.vulnerability.references as Reference, count as Count, sparkline as Sparkline`,
          'alertsSummaryTableToken',
          '$result$',
          this.scope,
          'Alerts Summary'
        )
      ]
    }

    $onInit() {
      try {
        /**
         * Generates report
         */
        this.scope.startVis2Png = () =>
          this.reportingService.startVis2Png(
            'overview-vulnerabilities',
            'Vulnerabilities',
            this.filters,
            [
              'affectedAgents',
              'alertsEvolution',
              'severityDist',
              'commonAffectedPackages',
              'commonCves',
              'commonCwes',
              'alertsSummary'
            ],
            {}, //Metrics
            this.tableResults
          )
      } catch (error) {} //eslint-disable-line
    }
  }

  app.controller('overviewVulnerabilitiesCtrl', OverviewVulnerabilities)
})
