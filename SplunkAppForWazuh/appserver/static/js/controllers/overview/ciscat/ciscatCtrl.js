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
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/search/search-handler',
  '../../../services/rawTableData/rawTableDataService'
], function (
  app,
  DashboardMain,
  ColumnChart,
  LinearChart,
  Table,
  SearchHandler,
  RawTableDataService
) {
  'use strict'
  class Ciscat extends DashboardMain {
    /**
     * Class CIS-CAT
     * @param {*} $urlTokenModel
     * @param {*} $scope
     * @param {*} $currentDataService
     * @param {*} $state
     */
    constructor(
      $urlTokenModel,
      $scope,
      $currentDataService,
      $state,
      $reportingService,
      reportingEnabled,
      extensions,
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
      this.scope.extensions = extensions
      this.addFilter = $currentDataService.addFilter
      this.scope.expandArray = [false, false, false]

      this.filters = this.getFilters()

      this.vizz = [
        /**
         * Metrics
         */
        new SearchHandler(
          `lastNotChecked`,
          `${this.filters} | search data.cis.notchecked=* | table data.cis.notchecked | head 1`,
          `filesAddedToken`,
          '$result.data.cis.notchecked$',
          'lastNotChecked',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastPass`,
          `${this.filters} | search data.cis.pass=* | table data.cis.pass | head 1`,
          `lastPass`,
          '$result.data.cis.pass$',
          'lastPass',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastScanScore`,
          `${this.filters} | search data.cis.score=* | table data.cis.score | head 1`,
          `lastScanScore`,
          '$result.data.cis.score$',
          'lastScanScore',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastScanDate`,
          `${this.filters}  | search data.cis.timestamp=* | table data.cis.timestamp | head 1`,
          'lastScanDate',
          '$result.data.cis.timestamp$',
          'lastScanDate',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastErrors`,
          `${this.filters} | search data.cis.error=* | table data.cis.error | head 1`,
          'lastErrors',
          '$result.data.cis.error$',
          'lastErrors',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastFails`,
          `${this.filters} | search data.cis.fail=* | table data.cis.fail | head 1`,
          'lastFails',
          '$result.data.cis.fail$',
          'lastFails',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastUnknown`,
          `${this.filters} | search data.unknown.fail=* | table data.cis.unknown | head 1`,
          'lastUnknown',
          '$result.data.cis.unknown$',
          'lastUnknown',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastScanBenchmark`,
          `${this.filters} rule.groups{}=ciscat | search data.cis.benchmark=* | table data.cis.benchmark | head 1`,
          'lastScanBenchmark',
          '$result.data.cis.benchmark$',
          'lastScanBenchmark',
          this.submittedTokenModel,
          this.scope
        ),
        /**
         * Visualizations
         */
        new ColumnChart(
          'topCiscatGroups',
          `${this.filters} rule.groups{}="ciscat" | top data.cis.group`,
          'topCiscatGroups',
          this.scope
        ),
        new LinearChart(
          'scanResultEvolution',
          `${this.filters} rule.groups{}="ciscat" | timechart count by data.cis.result usenull=f`,
          'scanResultEvolution',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new Table(
          'alertsSummary',
          `${this.filters} rule.groups{}="ciscat" | stats count sparkline by data.cis.rule_title, data.cis.remediation,data.cis.group | sort count desc | rename "data.cis.rule_title" as "Title",  "data.cis.remediation" as "Remediation",  "data.cis.group" as "Group" `,
          'alertsSummary',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryTable',
          `${this.filters} rule.groups{}="ciscat" | stats count sparkline by data.cis.rule_title, data.cis.remediation,data.cis.group | sort count desc | rename "data.cis.rule_title" as "Title",  "data.cis.remediation" as "Remediation",  "data.cis.group" as "Group" `,
          'alertsSummaryTableToken',
          '$result$',
          this.scope,
          'Alerts Summary'
        )
      ]
    }

    /**
     * On controller loads
     */
    $onInit() {
      try {
        this.addFilter(`{"rule.groups{}":"ciscat", "implicit":true}`)
        /**
         * Generates report
         */
        this.scope.startVis2Png = () =>
          this.reportingService.startVis2Png(
            'overview-ciscat',
            'CIS-CAT',
            this.filters,
            ['topCiscatGroups', 'scanResultEvolution', 'alertsSummary'],
            this.reportMetrics,
            this.tableResults
          )
      } catch (error) {
        console.error('Error onInit ', error)
      }
    }

    /**
     * Set report metrics
     */
    setReportMetrics() {
      this.reportMetrics = {
        'Last not checked': this.scope.lastNotChecked,
        'Last pass': this.scope.lastPass,
        'Last scan score': this.scope.lastScanScore,
        'Last scan date': this.scope.lastScanDate,
        'Last errors': this.scope.lastErrors,
        'Last fails': this.scope.lastFails,
        'Last unknown': this.scope.lastUnknown,
        'Last scan benchmark': this.scope.lastScanBenchmark
      }
    }
  }
  app.controller('ciscatCtrl', Ciscat)
})
