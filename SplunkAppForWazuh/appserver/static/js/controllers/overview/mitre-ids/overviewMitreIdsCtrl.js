// /*
//  * Wazuh app - Agents controller
//  * Copyright (C) 2015-2019 Wazuh, Inc.
//  *
//  * This program is free software you can redistribute it and/or modify
//  * it under the terms of the GNU General Public License as published by
//  * the Free Software Foundation either version 2 of the License, or
//  * (at your option) any later version.
//  *
//  * Find more information about this on the LICENSE file.
//  */

// define([
//   '../../module',
//   '../../../dashboardMain',
//   '../../../services/visualizations/chart/linear-chart',
//   '../../../services/visualizations/chart/pie-chart',
//   '../../../services/visualizations/chart/column-chart',
//   '../../../services/rawTableData/rawTableDataService'
// ], function(
//   app,
//   DashboardMain,
//   LinearChart,
//   PieChart,
//   ColumnChart,
//   RawTableDataService
// ) {
//   'use strict'

//   class OverviewMitreIds extends DashboardMain {
//     /**
//      * Class Overview Mitre
//      * @param {*} $urlTokenModel
//      * @param {*} $scope
//      * @param {*} $currentDataService
//      * @param {*} $state
//      * @param {*} $notificationService
//      * @param {*} $reportingService
//      * @param {*} $rootScope
//      * @param {Object} $requestService
//      */
//     constructor(
//       $urlTokenModel,
//       $scope,
//       $currentDataService,
//       $state,
//       $notificationService,
//       $reportingService,
//       $rootScope,
//       reportingEnabled,
//       $requestService,
//       extensions
//     ) {
//       super(
//         $scope,
//         $reportingService,
//         $state,
//         $currentDataService,
//         $urlTokenModel
//       )
//       this.rootScope = $rootScope
//       this.scope.reportingEnabled = reportingEnabled
//       this.scope.extensions = extensions
//       this.notification = $notificationService
//       this.genericReq = $requestService.httpReq

//             this.scope.reportingEnabled = reportingEnabled
//       this.scope.pciExtensionEnabled = pciExtensionEnabled
//       this.scope.hipaaExtensionEnabled = hipaaExtensionEnabled
//       this.scope.nistExtensionEnabled = nistExtensionEnabled
//       this.scope.gdprTabs = gdprTabs ? gdprTabs : false

//       this.scope.expandArray = [false, false, false, false, false]

//       this.filters = this.getFilters()

//       this.vizz = [
        
//         /**
//          * Visualizations
//          */
//         //  new RawTableDataService(
//         //   'alertsSummaryVizTable',
//         //   `${this.filters} sourcetype=wazuh rule.mitre.id{}="$mitre$" | stats count sparkline by agent.name, rule.mitre.id{}, rule.description | sort count DESC | rename agent.name as "Agent Name", rule.mitre.id{} as Requirement, rule.description as "Rule description", count as Count`,
//         //   'alertsSummaryVizTableToken',
//         //   '$result$',
//         //   this.scope,
//         //   'Alerts Summary'
//         // )
//         new RawTableDataService(
//           'alertsSummaryVizTable',
//           `${this.filters} sourcetype=wazuh rule.gdpr{}="$gdpr$" | stats count sparkline by agent.name, rule.gdpr{}, rule.description | sort count DESC | rename agent.name as "Agent Name", rule.gdpr{} as Requirement, rule.description as "Rule description", count as Count`,
//           'alertsSummaryVizTableToken',
//           '$result$',
//           this.scope,
//           'Alerts Summary'
//         )
//       ]
//     }

//     /**
//      * On controller loads
//      */
//      $onInit() {
//       try {
//         /**
//          * Generates report
//          */
//         this.scope.startVis2Png = () =>
//           this.reportingService.startVis2Png(
//             'overview-gdpr',
//             'GDPR',
//             this.filters,
//             [
//               'gdprRequirements',
//               'groupsViz',
//               'agentsViz',
//               'requirementsByAgents',
//               'alertsSummaryViz'
//             ],
//             {}, //Metrics,
//             this.tableResults
//           )
//       } catch (error) {} //eslint-disable-line
//     }
//   }

//   app.controller('overviewMitreIdsCtrl', OverviewMitreIds)
// })























define([
  '../../module',
  '../../../dashboardMain',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/dropdown-input',
  '../../../services/rawTableData/rawTableDataService'
], function(
  app,
  DashboardMain,
  LinearChart,
  ColumnChart,
  PieChart,
  Table,
  Dropdown,
  RawTableDataService
) {
  'use strict'
  class OverviewMitreIds extends DashboardMain {
    /**
     * Class GDPR
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
      gdprTabs,
      reportingEnabled,
      pciExtensionEnabled,
      hipaaExtensionEnabled,
      nistExtensionEnabled
    ) {
      super(
        $scope,
        $reportingService,
        $state,
        $currentDataService,
        $urlTokenModel
      )
      this.scope.reportingEnabled = reportingEnabled
      this.scope.pciExtensionEnabled = pciExtensionEnabled
      this.scope.hipaaExtensionEnabled = hipaaExtensionEnabled
      this.scope.nistExtensionEnabled = nistExtensionEnabled
      this.scope.gdprTabs = gdprTabs ? gdprTabs : false

      this.dropdown = new Dropdown(
        'dropDownInputAgent',
        `${this.filters} sourcetype=wazuh rule.gdpr{}="*"| stats count by "rule.gdpr{}" | spath "rule.gdpr{}" | fields - count`,
        'rule.gdpr{}',
        '$form.gdpr$',
        'dropDownInput',
        this.scope
      )

      this.dropdownInstance = this.dropdown.getElement()
      this.dropdownInstance.on('change', newValue => {
        if (newValue && this.dropdownInstance) {
          $urlTokenModel.handleValueChange(this.dropdownInstance)
        }
      })

      this.scope.expandArray = [false, false, false, false, false]

      this.filters = this.getFilters()

      this.vizz = [
        /**
         * Visualizations
         */
        new ColumnChart(
          'gdprRequirements',
          `${this.filters} sourcetype=wazuh rule.gdpr{}="$gdpr$"  | stats count by rule.gdpr{} | rename count as "Count", rule.gdpr{} as "Requirements"`,
          'gdprRequirements',
          this.scope
        ),
        new LinearChart(
          'evoViz',
          `${this.filters} sourcetype=wazuh rule.gdpr{}="*" | timechart count by rule.gdpr{} | rename count as "Count", rule.gdpr{} as "Requirements"  `,
          'evoViz',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new PieChart(
          'agentsViz',
          `${this.filters} sourcetype=wazuh rule.gdpr{}="$gdpr$" | stats count by agent.name | rename count as "Count", rule.gdpr{} as "Requirements"`,
          'agentsViz',
          this.scope
        ),
        new ColumnChart(
          'requirementsByAgents',
          `${this.filters} sourcetype=wazuh rule.gdpr{}="$gdpr$" agent.name=*| chart  count(rule.gdpr{}) by rule.gdpr{},agent.name | rename count as "Count", rule.gdpr{} as "Requirements"`,
          'requirementsByAgents',
          this.scope
        ),
        new Table(
          'alertsSummaryViz',
          `${this.filters} sourcetype=wazuh rule.gdpr{}="$gdpr$" | stats count sparkline by agent.name, rule.gdpr{}, rule.description | sort count DESC | rename agent.name as "Agent Name", rule.gdpr{} as Requirement, rule.description as "Rule description", count as Count`,
          'alertsSummaryViz',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryVizTable',
          `${this.filters} sourcetype=wazuh rule.gdpr{}="$gdpr$" | stats count sparkline by agent.name, rule.gdpr{}, rule.description | sort count DESC | rename agent.name as "Agent Name", rule.gdpr{} as Requirement, rule.description as "Rule description", count as Count`,
          'alertsSummaryVizTableToken',
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
            'overview-gdpr',
            'GDPR',
            this.filters,
            [
              'gdprRequirements',
              'groupsViz',
              'agentsViz',
              'requirementsByAgents',
              'alertsSummaryViz'
            ],
            {}, //Metrics,
            this.tableResults
          )
      } catch (error) {} //eslint-disable-line
    }
  }

  app.controller('overviewMitreIdsCtrl', OverviewMitreIds)
})
