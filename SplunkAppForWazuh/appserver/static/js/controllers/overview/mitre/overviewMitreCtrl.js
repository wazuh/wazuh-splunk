/*
 * Wazuh app - Agents controller
 * Copyright (C) 2015-2022 Wazuh, Inc.
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
], function (app, DashboardMain, LinearChart, PieChart, ColumnChart) {
  'use strict'

  class OverviewMitre extends DashboardMain {
    /**
     * Class Overview Mitre
     * @param {*} $urlTokenModel
     * @param {*} $scope
     * @param {*} $currentDataService
     * @param {*} $state
     * @param {*} $notificationService
     * @param {*} $reportingService
     * @param {*} $rootScope
     * @param {*} reportingEnabled
     * @param {*} extensions
     */
    constructor(
      $urlTokenModel,
      $scope,
      $currentDataService,
      $state,
      $notificationService,
      $reportingService,
      $rootScope,
      reportingEnabled,
      extensions
    ) {
      super(
        $scope,
        $reportingService,
        $state,
        $currentDataService,
        $urlTokenModel,
        $notificationService
      )
      this.rootScope = $rootScope
      this.state = $state
      this.scope.reportingEnabled = reportingEnabled
      this.scope.extensions = extensions
      this.notification = $notificationService

      this.currentDataService.addFilter(
        `{"rule.mitre.id{}":"*", "implicit":true, "onlyShow":true}`
      )
      this.scope.expandArray = [false, false, false, false, false]

      this.filters = this.getFilters()

      this.vizz = [
        /**
         * Visualizations
         */
        new LinearChart(
          'alertTecEvoVizz',
          `${this.filters} sourcetype=wazuh rule.mitre.technique{}=* | timechart count | rename count as "Count" rule.mitre.technique{} as "Techniques"`,
          'alertTecEvoVizz',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new PieChart(
          'alertsTop10Tactic',
          `${this.filters} index=wazuh sourcetype=wazuh | stats count by rule.mitre.tactic{} | rename count as "Count" rule.mitre.tactic{} as "Tactics"`,
          'alertsTop10Tactic',
          this.scope
        ),
        new ColumnChart(
          'alertsTechnique',
          `${this.filters} index=wazuh sourcetype=wazuh rule.mitre.technique{}=* rule.mitre.tactic{}=* | chart count over rule.mitre.technique{} by rule.mitre.tactic{} | rename rule.mitre.tactic{} as "Tactic", rule.mitre.technique{} as "Technique"`,
          'alertsTechnique',
          this.scope,
          { stackMode: 'stacked' }
        ),
        new ColumnChart(
          'topTacticsByAgent',
          `${this.filters} sourcetype=wazuh rule.mitre.tactic{}=* agent.name=* | chart count(rule.mitre.tactic{}) by agent.name,rule.mitre.tactic{} | rename count as "Count", agent.name as "Agent name", rule.mitre.tactic{} as "Tactics" | sort count DESC limit=10`,
          'topTacticsByAgent',
          this.scope,
          { stackMode: 'stacked' }
        ),
        new ColumnChart(
          'techniquesByAgent',
          `${this.filters} sourcetype=wazuh rule.mitre.technique{}=* agent.name=* | chart count(rule.mitre.technique{}) by agent.name,rule.mitre.technique{} | rename count as "Count", agent.name as "Agent name", rule.mitre.technique{} as "Techniques" | sort count DESC limit=10`,
          'techniquesByAgent',
          this.scope,
          { stackMode: 'stacked100' }
        ),
      ]
    }

    /**
     * On controller loads
     */
    $onInit() {
      try {
        this.scope.goToInventory = () => {
          this.goToInventory()
        }
        this.scope.startVis2Png = () =>
          this.reportingService.startVis2Png(
            'overview-mitre',
            'MITRE ATT&CK',
            this.filters,
            [
              'alertTecEvoVizz',
              'alertsTop10Tactic',
              'alertsTechnique',
              'topTacticsByAgent',
              'techniquesByAgent',
            ]
          )
      } catch (error) {
        console.error('error on init ', error)
      }
    }

    /**
     * Link to Mitre Inventory
     */
    goToInventory() {
      this.state.go('ow-mitre-ids', {})
    }
  }

  app.controller('overviewMitreCtrl', OverviewMitre)
})
