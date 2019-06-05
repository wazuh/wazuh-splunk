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

  class Nist extends DashboardMain {
    /**
     * Class Nist 800-53
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
      nistTabs,
      reportingEnabled,
      pciExtensionEnabled,
      gdprExtensionEnabled,
      hipaaExtensionEnabled,
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
      this.scope.gdprExtensionEnabled = gdprExtensionEnabled
      this.scope.hipaaExtensionEnabled = hipaaExtensionEnabled
      this.scope.nistTabs = nistTabs ? nistTabs : false

      this.scope.expandArray = [false, false, false, false, false]
      this.filters = this.getFilters()

      this.dropdown = new Dropdown(
        'dropDownInput',
        `${
          this.filters
        } sourcetype=wazuh rule.nist_800_53{}="*"| stats count by "rule.nist_800_53{}" | sort "rule.nist_800_53{}" ASC | fields - count | rename count as "Count", rule.nist_800_53{} as "Requirements"`,
        'rule.nist_800_53{}',
        '$form.nist$',
        'dropDownInput',
        this.scope
      )
      this.dropdownInstance = this.dropdown.getElement()

      this.dropdownInstance.on('change', newValue => {
        if (newValue && this.dropdownInstance)
          $urlTokenModel.handleValueChange(this.dropdownInstance)
      })

      this.vizz = [
        new ColumnChart(
          'nistReqVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.nist_800_53{}="$nist$"  | stats count by rule.nist_800_53{} | rename count as "Count", rule.nist_800_53{} as "Requirements"`,
          'nistReqVizz',
          this.scope
        ),
        new LinearChart(
          'evoVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.nist_800_53{}="*" | timechart count by rule.nist_800_53{} | rename count as "Count", rule.nist_800_53{} as "Requirements"`,
          'evoVizz',
          this.scope
        ),
        new PieChart(
          'agentsVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.nist_800_53{}="$nist$" | stats count by agent.name | rename count as "Count", rule.nist_800_53{} as "Requirements"`,
          'agentsVizz',
          this.scope
        ),
        new ColumnChart(
          'requirementsByAgentVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.nist_800_53{}="$nist$" agent.name=*| chart  count(rule.nist_800_53{}) by rule.nist_800_53{},agent.name | rename count as "Count", rule.nist_800_53{} as "Requirements"`,
          'requirementsByAgentVizz',
          this.scope
        ),
        new Table(
          'alertsSummaryViz',
          `${
            this.filters
          } sourcetype=wazuh rule.nist_800_53{}="$nist$" | stats count sparkline by agent.name, rule.nist_800_53{}, rule.description | sort count DESC | rename agent.name as "Agent Name", rule.nist_800_53{} as "Requirements", rule.description as "Rule description", count as Count`,
          'alertsSummaryViz',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryTable',
          `${
            this.filters
          } sourcetype=wazuh rule.nist_800_53{}="$nist$" | stats count sparkline by agent.name, rule.nist_800_53{}, rule.description | sort count DESC | rename agent.name as "Agent Name", rule.nist_800_53{} as "Requirements", rule.description as "Rule description", count as Count`,
          'alertsSummaryTableToken',
          '$result$',
          this.scope,
          'Alerts Summary'
        )
      ]
    }

    $onInit() {
      try {
        this.scope.loadingVizz = true
        /**
         * Generates report
         */
        this.scope.startVis2Png = () =>
          this.reportingService.startVis2Png(
            'overview-nist',
            'NIST 800-53',
            this.filters,
            [
              'nistReqVizz',
              'agentsVizz',
              'evoVizz',
              'requirementsByAgentVizz',
              'alertsSummaryViz'
            ],
            {}, //Metrics
            this.tableResults
          )
      } catch (error) {}
    }


  }
  app.controller('overviewNistCtrl', Nist)
})
