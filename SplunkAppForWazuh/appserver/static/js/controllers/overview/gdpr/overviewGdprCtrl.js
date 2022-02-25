define([
  '../../module',
  '../../../dashboardMain',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/dropdown-input',
  '../../../services/rawTableData/rawTableDataService',
], function (
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
  class OverviewGDPR extends DashboardMain {
    /**
     * Class GDPR
     * @param {*} $urlTokenModel
     * @param {*} $scope
     * @param {*} $currentDataService
     * @param {*} $state
     * @param {*} $reportingService
     * @param {*} gdprTabs
     * @param {*} reportingEnabled
     * @param {*} pciExtensionEnabled
     * @param {*} nistExtensionEnabled
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
      nistExtensionEnabled,
      $notificationService
    ) {
      super(
        $scope,
        $reportingService,
        $state,
        $currentDataService,
        $urlTokenModel,
        $notificationService
      )
      this.scope.reportingEnabled = reportingEnabled
      this.scope.pciExtensionEnabled = pciExtensionEnabled
      this.scope.hipaaExtensionEnabled = hipaaExtensionEnabled
      this.scope.nistExtensionEnabled = nistExtensionEnabled
      this.scope.gdprTabs = gdprTabs ? gdprTabs : false

      this.dropdown = new Dropdown(
        'dropDownInputAgent',
        `${this.filters} rule.gdpr{}="*"| stats count by "rule.gdpr{}" | spath "rule.gdpr{}" | fields - count`,
        'rule.gdpr{}',
        '$form.gdpr$',
        'dropDownInput',
        this.scope
      )

      this.dropdownInstance = this.dropdown.getElement()
      this.dropdownInstance.on('change', (newValue) => {
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
          `${this.filters} rule.gdpr{}="$gdpr$"  | stats count by rule.gdpr{} | rename count as "Count", rule.gdpr{} as "Requirements"`,
          'gdprRequirements',
          this.scope
        ),
        new LinearChart(
          'evoViz',
          `${this.filters} rule.gdpr{}="*" | timechart count by rule.gdpr{} | rename count as "Count", rule.gdpr{} as "Requirements"  `,
          'evoViz',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new PieChart(
          'agentsViz',
          `${this.filters} rule.gdpr{}="$gdpr$" | stats count by agent.name | rename count as "Count", rule.gdpr{} as "Requirements"`,
          'agentsViz',
          this.scope
        ),
        new ColumnChart(
          'requirementsByAgents',
          `${this.filters} rule.gdpr{}="$gdpr$" agent.name=*| chart  count(rule.gdpr{}) by rule.gdpr{},agent.name | rename count as "Count", rule.gdpr{} as "Requirements"`,
          'requirementsByAgents',
          this.scope
        ),
        new Table(
          'alertsSummaryViz',
          `${this.filters} rule.gdpr{}="$gdpr$" | stats count sparkline by agent.name, rule.gdpr{}, rule.description | sort count DESC | rename agent.name as "Agent Name", rule.gdpr{} as Requirement, rule.description as "Rule description", count as Count`,
          'alertsSummaryViz',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryVizTable',
          `${this.filters} rule.gdpr{}="$gdpr$" | stats count sparkline by agent.name, rule.gdpr{}, rule.description | sort count DESC | rename agent.name as "Agent Name", rule.gdpr{} as Requirement, rule.description as "Rule description", count as Count`,
          'alertsSummaryVizTableToken',
          '$result$',
          this.scope,
          'Alerts Summary'
        ),
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
              'alertsSummaryViz',
            ],
            {}, //Metrics,
            this.tableResults
          )
      } catch (error) {} //eslint-disable-line
    }
  }

  app.controller('overviewGdprCtrl', OverviewGDPR)
})
