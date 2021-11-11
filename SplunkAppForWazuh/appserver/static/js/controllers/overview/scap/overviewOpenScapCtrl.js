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
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/inputs/dropdown-input',
  '../../../services/visualizations/search/search-handler',
  '../../../services/rawTableData/rawTableDataService'
], function(
  app,
  DashboardMain,
  LinearChart,
  ColumnChart,
  PieChart,
  AreaChart,
  Table,
  TimePicker,
  Dropdown,
  SearchHandler,
  RawTableDataService
) {
  'use strict'

  class OpenSCAP extends DashboardMain {
    /**
     * OpenSCAP class
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
      this.currentDataService.addFilter(
        `{"rule.groups{}":"oscap", "implicit":true}`
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

      this.dropdown = new Dropdown(
        'dropDownInput',
        `${this.filters}  rule.groups{}="oscap" rule.groups{}!="syslog" oscap.scan.profile.title=* | stats count by oscap.scan.profile.title | sort oscap.scan.profile.title ASC|fields - count`,
        'oscap.scan.profile.title',
        '$form.profile$',
        'dropDownInput',
        this.scope
      )

      this.dropdownInstance = this.dropdown.getElement()

      this.dropdownInstance.on('change', newValue => {
        if (newValue && this.dropdownInstance)
          $urlTokenModel.handleValueChange(this.dropdownInstance)
      })

      this.filters = this.getFilters()

      this.vizz = [
        /**
         * Metrics
         */
        new SearchHandler(
          `lastScapScore`,
          `${this.filters} oscap.scan.score=* | stats latest(oscap.scan.score)`,
          `latestScapScore`,
          '$result.latest(oscap.scan.score)$',
          'scapLastScore',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `maxScapScore`,
          `${this.filters} oscap.scan.score=* | stats max(oscap.scan.score)`,
          `maxScapScore`,
          '$result.max(oscap.scan.score)$',
          'scapHighestScore',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `scapLowest`,
          `${this.filters} oscap.scan.score=* | stats min(oscap.scan.score)`,
          `minScapScore`,
          '$result.min(oscap.scan.score)$',
          'scapLowestScore',
          this.submittedTokenModel,
          this.scope
        ),

        /**
         * Visualizations
         */
        new PieChart(
          'agentsVizz',
          `${this.filters} oscap.check.result="fail" rule.groups{}="oscap" rule.groups{}!="syslog" oscap.scan.profile.title="$profile$" | top agent.name`,
          'agentsVizz',
          this.scope
        ),
        new LinearChart(
          'profilesVizz',
          `${this.filters} rule.level=*`,
          'profilesVizz',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new ColumnChart(
          'contentVizz',
          `${this.filters} | timechart span=2h count`,
          'contentVizz',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new PieChart(
          'severityVizz',
          `${this.filters} | top agent.name`,
          'severityVizz',
          this.scope
        ),
        new AreaChart(
          'top5AgentsVizz',
          `${this.filters} | timechart span=1h limit=5 useother=f count by agent.name`,
          'top5AgentsVizz',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new PieChart(
          'top10AlertsVizz',
          `${this.filters} oscap.check.result="fail" rule.groups{}="oscap" rule.groups{}="oscap-result" oscap.scan.profile.title="$profile$" | top oscap.check.title`,
          'top10AlertsVizz',
          this.scope
        ),
        new PieChart(
          'top10HRisk',
          `${this.filters} oscap.check.result="fail" rule.groups{}="oscap" rule.groups{}="oscap-result"  oscap.check.severity="high" oscap.scan.profile.title="$profile$" | top oscap.check.title`,
          'top10HRisk',
          this.scope
        ),
        new Table(
          'alertsSummaryVizz',
          `${this.filters} |stats count sparkline by rule.id, rule.description, rule.level | sort count DESC  | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,
          'alertsSummaryVizz',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryTable',
          `${this.filters} |stats count sparkline by rule.id, rule.description, rule.level | sort count DESC  | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,
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
            'overview-oscap',
            'Open SCAP',
            this.filters,
            [
              'agentsVizz',
              'profilesVizz',
              'contentVizz',
              'severityVizz',
              'top5AgentsVizz',
              'top10AlertsVizz',
              'top10HRisk',
              'alertsSummaryVizz'
            ],
            this.reportMetrics,
            this.tableResults
          )
      } catch (error) {}
    }

    /**
     * Set report metrics
     */
    setReportMetrics() {
      this.reportMetrics = {
        'Last score': this.scope.scapLastScore,
        'Highest score': this.scope.scapHighestScore,
        'Lowest score': this.scope.scapLowestScore
      }
    }
  }
  app.controller('overviewOpenScapCtrl', OpenSCAP)
})
