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
  class Audit extends DashboardMain {
    /**
     * Class Audit
     * @param {*} $urlTokenModel
     * @param {*} $scope
     * @param {*} $currentDataService
     * @param {*} $state
     * @param {*} $reportingService
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
      this.currentDataService.addFilter(
        `{"rule.groups{}":"audit", "implicit":true, "onlyShow":true}`
      )

      this.scope.expandArray = [
        false,
        false,
        false,
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
          `filesAddedSearch`,
          `${this.filters} rule.id=80790 | stats count`,
          `filesAddedToken`,
          '$result.count$',
          'newFiles',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `readFilesSearch`,
          `${this.filters} rule.id=80784 | stats count`,
          `readFilesToken`,
          '$result.count$',
          'readFiles',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `modifiedFiles`,
          `${this.filters} rule.id=80781 | stats count`,
          `filesModifiedToken`,
          '$result.count$',
          'filesModifiedToken',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `deletedFiles`,
          `${this.filters} rule.id=80791 | stats count`,
          'filesDeletedToken',
          '$result.count$',
          'filesDeleted',
          this.submittedTokenModel,
          this.scope
        ),
        /**
         * Visualizations
         */
        new PieChart(
          'groupsElement',
          `${this.filters} rule.groups{}="audit" | top limit=5 rule.groups{}`,
          'groupsElement',
          this.scope
        ),
        new ColumnChart(
          'agentsElement',
          `${this.filters} rule.groups{}="audit" agent.name=* | top  limit=5  agent.name`,
          'agentsElement',
          this.scope
        ),
        new PieChart(
          'commandsVizz',
          `${this.filters} rule.groups{}="audit" | top limit=5 data.audit.command`,
          'commandsVizz',
          this.scope
        ),
        new PieChart(
          'filesElement',
          `${this.filters} rule.groups{}="audit" data.audit.file.name=* | top limit=5 data.audit.file.name`,
          'filesElement',
          this.scope
        ),
        new AreaChart(
          'alertsOverTime',
          `${this.filters} rule.groups{}="audit" | timechart limit=10 count by rule.description`,
          'alertsOverTimeElement',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new Table(
          'alertsSummary',
          `${this.filters} rule.groups{}="audit" | stats count sparkline by agent.name,rule.description, data.audit.exe, data.audit.type, data.audit.euid | sort count DESC | rename agent.name as "Agent name", rule.description as Description, data.audit.exe as Command, data.audit.type as Type, data.audit.euid as "Effective user id"`,
          'alertsSummaryElement',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryTable',
          `${this.filters} rule.groups{}="audit" | stats count sparkline by agent.name,rule.description, data.audit.exe, data.audit.type, data.audit.euid | sort count DESC | rename agent.name as "Agent name", rule.description as Description, data.audit.exe as Command, data.audit.type as Type, data.audit.euid as "Effective user id"`,
          'alertsSummaryTableToken',
          '$result$',
          this.scope,
          'Alerts Summary'
        )
      ]
    }

    $onInit() {
      try {
        this.reportMetrics = {
          'New files': this.scope.newFiles,
          'Read files': this.scope.readFiles,
          'Modified files': this.scope.filesModifiedToken,
          'Deleted files': this.scope.filesDeleted
        }

        /**
         * Generates report
         */
        this.scope.startVis2Png = () =>
          this.reportingService.startVis2Png(
            'overview-audit',
            'Audit',
            this.filters,
            [
              'groupsElement',
              'agentsElement',
              'commandsVizz',
              'filesElement',
              'alertsOverTimeElement',
              'alertsSummaryElement'
            ],
            this.reportMetrics,
            this.tableResults
          )
      } catch (error) {}
    }
  }
  app.controller('overviewAuditCtrl', Audit)
})
