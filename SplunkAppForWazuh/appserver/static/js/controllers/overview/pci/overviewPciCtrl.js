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

  class PCI extends DashboardMain {
    /**
     * Class PCI-DSS
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
      pciTabs,
      reportingEnabled,
      gdprExtensionEnabled
    ) {
      super(
        $scope,
        $reportingService,
        $state,
        $currentDataService,
        $urlTokenModel
      )
      this.scope.reportingEnabled = reportingEnabled
      this.scope.gdprExtensionEnabled = gdprExtensionEnabled
      this.scope.pciTabs = pciTabs ? pciTabs : false

      this.scope.expandArray = [false, false, false, false, false]

      this.dropdown = new Dropdown(
        'dropDownInput',
        `${
          this.filters
        } sourcetype=wazuh rule.pci_dss{}="*"| stats count by "rule.pci_dss{}" | sort "rule.pci_dss{}" ASC | fields - count`,
        'rule.pci_dss{}',
        '$form.pci$',
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
        new ColumnChart(
          'pciReqVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.pci_dss{}="$pci$"  | stats count by rule.pci_dss{}`,
          'pciReqVizz',
          this.scope
        ),
        new LinearChart(
          'evoVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.pci_dss{}="*" | timechart count by rule.pci_dss{}`,
          'evoVizz',
          this.scope
        ),
        new PieChart(
          'agentsVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.pci_dss{}="$pci$" | stats count by agent.name`,
          'agentsVizz',
          this.scope
        ),
        new ColumnChart(
          'requirementsByAgentVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.pci_dss{}="$pci$" agent.name=*| chart  count(rule.pci_dss{}) by rule.pci_dss{},agent.name`,
          'requirementsByAgentVizz',
          this.scope
        ),
        new Table(
          'alertsSummaryViz',
          `${
            this.filters
          } sourcetype=wazuh rule.pci_dss{}="$pci$" | stats count sparkline by agent.name, rule.pci_dss{}, rule.description | sort count DESC | rename agent.name as "Agent Name", rule.pci_dss{} as Requirement, rule.description as "Rule description", count as Count`,
          'alertsSummaryViz',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryTable',
          `${
            this.filters
          } sourcetype=wazuh rule.pci_dss{}="$pci$" | stats count sparkline by agent.name, rule.pci_dss{}, rule.description | sort count DESC | rename agent.name as "Agent Name", rule.pci_dss{} as Requirement, rule.description as "Rule description", count as Count`,
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
            'overview-pci',
            'PCI DSS',
            this.filters,
            [
              'pciReqVizz',
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

  app.controller('overviewPciCtrl', PCI)
})
