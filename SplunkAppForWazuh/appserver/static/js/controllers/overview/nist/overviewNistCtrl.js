define([
  '../../module',
  '../../../dashboardMain',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/chart/single-value',
  '../../../services/visualizations/inputs/dropdown-input',
  '../../../services/rawTableData/rawTableDataService',
], function (
  app,
  DashboardMain,
  LinearChart,
  ColumnChart,
  PieChart,
  Table,
  SingleValue,
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
     * @param {*} $notificationService
     * @param {*} nistTabs
     * @param {*} reportingEnabled
     * @param {*} gdprExtensionEnabled
     * @param {*} hipaaExtensionEnabled
     */
    constructor(
      $urlTokenModel,
      $scope,
      $currentDataService,
      $state,
      $reportingService,
      $notificationService,
      nistTabs,
      reportingEnabled,
      pciExtensionEnabled,
      gdprExtensionEnabled,
      hipaaExtensionEnabled
    ) {
      super(
        $scope,
        $reportingService,
        $state,
        $currentDataService,
        $urlTokenModel,
        $notificationService
      )
      this.notification = $notificationService
      this.scope.reportingEnabled = reportingEnabled
      this.scope.pciExtensionEnabled = pciExtensionEnabled
      this.scope.gdprExtensionEnabled = gdprExtensionEnabled
      this.scope.hipaaExtensionEnabled = hipaaExtensionEnabled
      this.scope.nistTabs = nistTabs ? nistTabs : false

      this.scope.expandArray = [false, false, false, false, false]
      this.filters = this.getFilters()

      this.dropdown = new Dropdown(
        'dropDownInput',
        `${this.filters} rule.nist_800_53{}="*"| stats count by "rule.nist_800_53{}" | sort "rule.nist_800_53{}" ASC | fields - count | rename count as "Count", rule.nist_800_53{} as "Requirements"`,
        'rule.nist_800_53{}',
        '$form.nist$',
        'dropDownInput',
        this.scope
      )
      this.dropdownInstance = this.dropdown.getElement()

      this.dropdownInstance.on('change', (newValue) => {
        if (newValue && this.dropdownInstance)
          $urlTokenModel.handleValueChange(this.dropdownInstance)
      })

      this.vizz = [
        new PieChart(
          'mostActiveAgents',
          `${this.filters} rule.nist_800_53{}="$nist$" | top limit=10 agent.name | rename agent.name as "Agent name"`,
          'mostActiveAgents',
          this.scope
        ),
        new LinearChart(
          'topRequirementsOverTime',
          `${this.filters} rule.nist_800_53{}="*" | timechart count by rule.nist_800_53{}`,
          'topRequirementsOverTime',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new PieChart(
          'top10Requirements',
          `${this.filters} rule.nist_800_53{}="$nist$" | top limit=10 rule.nist_800_53{} | rename count as "Count", rule.nist_800_53{} as Requirement`,
          'top10Requirements',
          this.scope
        ),
        new ColumnChart(
          'requirementsDistributionByAgent',
          `${this.filters} rule.nist_800_53{}="$nist$" agent.name=* | chart count(rule.nist_800_53{}) by agent.name,rule.nist_800_53{} | rename count as "Count" , agent.name as "Agent name", rule.nist_800_53{} as "Requirement"`,
          'requirementsDistributionByAgent',
          this.scope,
          { stackMode: 'stacked' }
        ),
        new SingleValue(
          'maxRuleLevel',
          `${this.filters} rule.hipaa{}="$hipaa$" | top rule.level | sort - rule.level`,
          'maxRuleLevel',
          this.scope
        ),
        new SingleValue(
          'totalAlerts',
          `${this.filters} rule.hipaa{}="$hipaa$" | stats count`,
          'totalAlerts',
          this.scope
        ),
        new ColumnChart(
          'alertsVolumeByAgent',
          `${this.filters} rule.nist_800_53{}="$nist$" agent.name=* | chart count by agent.id,rule.nist_800_53{} | rename agent.id as "Agent ID", rule.nist_800_53{} as "Requirement", count as "Count"`,
          'alertsVolumeByAgent',
          this.scope,
          { stackMode: 'stacked' }
        ),
        new Table(
          'alertsSummary',
          `${this.filters} rule.nist_800_53{}="$nist$" | stats count by agent.name,rule.nist_800_53{},rule.level,rule.description | sort count DESC | rename agent.name as "Agent", rule.nist_800_53{} as "Requirement", rule.level as "Level", rule.description as "Description", count as "Count"`,
          'alertsSummary',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryTable',
          `${this.filters} rule.nist_800_53{}="$nist$" | stats count by agent.name,rule.nist_800_53{},rule.level,rule.description | sort count DESC | rename agent.name as "Agent", rule.nist_800_53{} as "Requirement", rule.level as "Level", rule.description as "Description", count as "Count"`,
          'alertsSummaryTableToken',
          '$result$',
          this.scope,
          'Alerts Summary'
        ),
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
              'topRequirementsOverTime',
              'top10Requirements',
              'mostActiveAgents',
              'requirementsDistributionByAgent',
              'maxRuleLevel',
              'totalAlerts',
              'alertsVolumeByAgent',
              'alertsSummary',
            ],
            {}, //Metrics
            this.tableResults
          )
      } catch (error) {
        this.notification.showErrorToast(error.message || error)
      }
    }
  }
  app.controller('overviewNistCtrl', Nist)
})
