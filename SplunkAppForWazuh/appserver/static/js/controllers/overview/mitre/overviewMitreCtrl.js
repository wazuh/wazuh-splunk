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
  '../../../services/visualizations/chart/column-chart',
], function(
  app,
  DashboardMain,
  LinearChart,
  PieChart,
  ColumnChart,
) {
  'use strict'

  class OverviewMitre extends DashboardMain {
    /**
     * Class Overview Mitre
     * @param {*} $urlTokenModel
     * @param {*} $scope
     * @param {*} $currentDataService
     * @param {*} $state
     * @param {*} $notificationService
     * @param {*} $requestService
     * @param {Object} pollingState
     * @param {*} $reportingService
     * @param {*} $rootScope
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
         * Visualizations
         */
        new LinearChart(
          'alertTecEvoVizz',
          `${this.filters} sourcetype=wazuh rule.mitre.technique{}=* | timechart count`,
          'alertTecEvoVizz',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new PieChart(
          'alertsTop10Tactic',
          `${this.filters} index=wazuh  sourcetype=wazuh | stats count by rule.mitre.tactic{}`,
          'alertsTop10Tactic',
          this.scope
        ),
        new ColumnChart(
          'alertsTechnique',
          `${this.filters} index=wazuh  sourcetype=wazuh | chart count over rule.mitre.tactic{} by rule.mitre.technique{}`,
          'alertsTechnique',
          this.scope
        ),
        new ColumnChart(
          'topTacticsByAgent',
          `${this.filters} sourcetype=wazuh | chart count over rule.mitre.tactic{} by agent.name limit=10`,
          'topTacticsByAgent',
          this.scope
        ),
        new ColumnChart(
          'techniquesByAgent',
          `${this.filters} sourcetype=wazuh | chart count over rule.mitre.technique{} by agent.name limit=10`,
          'techniquesByAgent',
          this.scope
        )
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
          // this.vizz.push(
          //   new LinearChart(
          //     `agentStatusHistory`,
          //     `${this.agentsStatusFilter} id!=000 status=* | timechart span=${this.spanTime} cont=FALSE count by status usenull=f`,
          //     `agentStatus`,
          //     this.scope,
          //     { customAxisTitleX: 'Time span' }
          //   )
          // )
        }

        this.scope.startVis2Png = () =>
          this.reportingService.startVis2Png(
            'overview-mitre',
            'MITRE ATT&CK',
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

  app.controller('overviewMitreCtrl', OverviewMitre)
})
