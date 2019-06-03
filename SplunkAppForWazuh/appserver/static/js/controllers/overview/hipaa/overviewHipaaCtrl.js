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

  class Hipaa extends DashboardMain {
    /**
     * Class Hipaa
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
      hipaaTabs,
      reportingEnabled,
      pciExtensionEnabled,
      gdprExtensionEnabled,
      nistExtensionEnabled,
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
      this.scope.nistExtensionEnabled = nistExtensionEnabled
      this.scope.hipaaTabs = hipaaTabs ? hipaaTabs : false


      this.filters = this.getFilters()

      this.scope.expandArray = [false, false, false, false, false]

      this.dropdown = new Dropdown(
        'dropDownInput',
        `${
          this.filters
        } sourcetype=wazuh rule.hipaa{}="*"| stats count by "rule.hipaa{}" | sort "rule.hipaa{}" ASC | fields - count`,
        'rule.hipaa{}',
        '$form.hipaa$',
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
          'hipaaReqVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.hipaa{}="$hipaa$"  | stats count by rule.hipaa{}`,
          'hipaaReqVizz',
          this.scope
        ),
        new LinearChart(
          'evoVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.hipaa{}="*" | timechart count by rule.hipaa{}`,
          'evoVizz',
          this.scope
        ),
        new PieChart(
          'agentsVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.hipaa{}="$hipaa$" | stats count by agent.name`,
          'agentsVizz',
          this.scope
        ),
        new ColumnChart(
          'requirementsByAgentVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.hipaa{}="$hipaa$" agent.name=*| chart  count(rule.hipaa{}) by rule.hipaa{},agent.name`,
          'requirementsByAgentVizz',
          this.scope
        ),
        new Table(
          'alertsSummaryViz',
          `${
            this.filters
          } sourcetype=wazuh rule.hipaa{}="$hipaa$" | stats count sparkline by agent.name, rule.hipaa{}, rule.description | sort count DESC | rename agent.name as "Agent Name", rule.hipaa{} as Requirement, rule.description as "Rule description", count as Count`,
          'alertsSummaryViz',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryTable',
          `${
            this.filters
          } sourcetype=wazuh rule.hipaa{}="$hipaa$" | stats count sparkline by agent.name, rule.hipaa{}, rule.description | sort count DESC | rename agent.name as "Agent Name", rule.hipaa{} as Requirement, rule.description as "Rule description", count as Count`,
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
            'overview-hipaa',
            'HIPAA',
            this.filters,
            [
              'hipaaReqVizz',
              'groupsVizz',
              'agentsVizz',
              'requirementsByAgentVizz',
              'alertsSummaryViz'
            ],
            {}, //Metrics
            this.tableResults
          )

    

      } catch (error) {}
    }
  }
  app.controller('overviewHipaaCtrl', Hipaa)
})
