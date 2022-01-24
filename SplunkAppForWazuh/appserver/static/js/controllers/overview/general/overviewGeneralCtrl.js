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
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/search/search-handler',
  '../../../services/rawTableData/rawTableDataService'
], function(
  app,
  DashboardMain,
  LinearChart,
  PieChart,
  Table,
  SearchHandler,
  RawTableDataService
) {
  'use strict'

  class OverviewGeneral extends DashboardMain {
    /**
     * Class Overview General
     * @param {*} $urlTokenModel
     * @param {*} $scope
     * @param {*} $currentDataService
     * @param {*} $state
     * @param {*} $notificationService
     * @param {*} $requestService
     * @param {Object} pollingState
     * @param {*} $reportingService
     * @param {*} $rootScope
     * @param {*} reportingEnabled
     * @param {*} awsExtensionEnabled
     */
    constructor(
      $urlTokenModel,
      $scope,
      $currentDataService,
      $state,
      $notificationService,
      $requestService,
      pollingState,
      $reportingService,
      $rootScope,
      reportingEnabled,
      awsExtensionEnabled,
    ) {
      super(
        $scope,
        $reportingService,
        $state,
        $currentDataService,
        $urlTokenModel
      )
      this.rootScope = $rootScope
      this.scope.reportingEnabled = reportingEnabled
      this.scope.awsExtensionEnabled = awsExtensionEnabled
      this.apiReq = $requestService.apiReq
      this.notification = $notificationService

      try {
        this.pollingEnabled =
          pollingState &&
          pollingState.data &&
          (pollingState.data.error || pollingState.data.disabled === 'true')
            ? false
            : true
      } catch (error) {
        console.error('e', error)
      }

      this.scope.expandArray = [false, false, false, false, false, false]

      this.filters = this.getFilters()

      this.vizz = [
        /**
         * Metrics
         */
        new SearchHandler(
          `totalAlerts`,
          `${this.filters} | stats count`,
          `totalAlertsToken`,
          '$result.count$',
          'totalAlerts',
          this.submittedTokenModel,
          this.scope,
          undefined,
          undefined,
          this.notification
        ),
        new SearchHandler(
          `searchLevel12`,
          `${this.filters} "rule.level">=12 | chart count`,
          `level12token`,
          '$result.count$',
          'levelTwelve',
          this.submittedTokenModel,
          this.scope,
          undefined,
          undefined,
          this.notification
        ),
        new SearchHandler(
          `searchAuthFailure`,
          `${this.filters} "rule.groups{}"="authentication_fail*" | stats count`,
          `authFailureToken`,
          '$result.count$',
          'authFailure',
          this.submittedTokenModel,
          this.scope,
          undefined,
          undefined,
          this.notification
        ),
        new SearchHandler(
          `searchAuthSuccess`,
          `${this.filters}  "rule.groups{}"="authentication_success" | stats count`,
          `authSuccessToken`,
          '$result.count$',
          'authSuccess',
          this.submittedTokenModel,
          this.scope,
          undefined,
          undefined,
          this.notification
        ),
        /**
         * Visualizations
         */
        new LinearChart(
          'alertLevEvoVizz',
          `${this.filters} rule.level=*`,
          'alertLevEvoVizz',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new LinearChart(
          'alertsVizz',
          `${this.filters} | timechart span=2h count  `,
          'alertsVizz',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new PieChart(
          'alertsEvoTop5Agents',
          `${this.filters} index=wazuh  | stats count by agent.name`,
          'alertsEvoTop5Agents',
          this.scope
        ),
        new PieChart(
          'top5ruleGroups',
          `${this.filters} | top rule.groups{} limit=5`,
          'top5ruleGroups',
          this.scope
        ),
        new Table(
          'agentsSummaryVizz',
          `${this.filters} |stats count sparkline by rule.id, rule.description, rule.level | sort count DESC  | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,
          'agentsSummaryVizz',
          this.scope
        ),
        (this.agentsSummaryTable = new RawTableDataService(
          'agentsSummaryTable',
          `${this.filters} |stats count sparkline by rule.id, rule.description, rule.level | sort count DESC  | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,
          'agentsSummaryTableToken',
          '$result$',
          this.scope,
          'Agents Summary'
        ))
      ]
    }

    /**
     * On controller loads
     */
    $onInit() {
      try {
        if (!this.pollingEnabled) {
          this.scope.wzMonitoringEnabled = false
          this.apiReq(`/agents/summary/status`)
            .then(data => {
              this.scope.agentsCountTotal = data.data.data.total
              this.scope.agentsCountActive = data.data.data.active
              this.scope.agentsCountDisconnected = data.data.data.disconnected
              this.scope.agentsCountNeverConnected =
                data.data.data.never_connected
              this.scope.agentsCoverity = this.scope.agentsCountTotal
                ? (this.scope.agentsCountActive / this.scope.agentsCountTotal) *
                  100
                : 0
              this.scope.$applyAsync()
            })
            .catch(error => {
              this.notification.showErrorToast(
                `Cannot fetch agent status data: ${error}`
              )
            })
        } else {
          this.scope.wzMonitoringEnabled = true

          //Filters for agents Status
          try {
            this.clusOrMng = Object.keys(
              this.currentDataService.getFilters()[0]
            )[0]

            if (this.clusOrMng == 'manager.name') {
              this.mngName = this.currentDataService.getFilters()[0][
                'manager.name'
              ]
              this.agentsStatusFilter = `manager.name=${this.mngName} index=wazuh-monitoring*`
            } else {
              this.clusName = this.currentDataService.getFilters()[0][
                'cluster.name'
              ]
              this.agentsStatusFilter = `cluster.name=${this.clusName} index=wazuh-monitoring*`
            }
          } catch (error) {} //eslint-disable-line

          this.spanTime = '15m'
          this.vizz.push(
            new LinearChart(
              `agentStatusHistory`,
              `${this.agentsStatusFilter} id!=000 status=* | timechart span=${this.spanTime} cont=FALSE count by status usenull=f`,
              `agentStatus`,
              this.scope,
              { customAxisTitleX: 'Time span' }
            )
          )
        }

        this.scope.startVis2Png = () =>
          this.reportingService.startVis2Png(
            'overview-general',
            'Security events',
            this.filters,
            [
              'alertLevEvoVizz',
              'alertsVizz',
              'alertsEvoTop5Agents',
              'top5ruleGroups',
              'agentsSummaryVizz'
            ],
            this.reportMetrics,
            this.tableResults
          )
      } catch (error) {
        console.error('error on init ', error)
      }
    }

    /**
     * Set report metrics
     */
    setReportMetrics() {
      this.reportMetrics = {
        Alerts: this.scope.totalAlerts,
        'Level 12 or above alerts': this.scope.levelTwelve,
        'Authentication failure': this.scope.authFailure,
        'Authentication success': this.scope.authSuccess
      }
    }
  }

  app.controller('overviewGeneralCtrl', OverviewGeneral)
})
