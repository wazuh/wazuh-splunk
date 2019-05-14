define([
  '../../module',
  '../../../dashboardMain',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/dropdown-input'
], function (
  app,
  DashboardMain,
  LinearChart,
  ColumnChart,
  PieChart,
  Table,
  Dropdown
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
       */
      constructor(
        $urlTokenModel,
        $scope,
        $currentDataService,
        $state,
        $reportingService,
        gdprTabs,
        reportingEnabled,
        pciExtensionEnabled
      ) {
        super(
          $scope,
          $reportingService,
          $state,
          $currentDataService,
          $urlTokenModel,
        )
        this.scope.reportingEnabled = reportingEnabled
        this.scope.pciExtensionEnabled = pciExtensionEnabled
        this.scope.gdprTabs = gdprTabs ? gdprTabs : false

        this.dropdown = new Dropdown(
          'dropDownInputAgent',
          `${
          this.filters
          } sourcetype=wazuh rule.gdpr{}="*"| stats count by "rule.gdpr{}" | spath "rule.gdpr{}" | fields - count`,
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
            `${
            this.filters
            } sourcetype=wazuh rule.gdpr{}="$gdpr$"  | stats count by rule.gdpr{}`,
            'gdprRequirements',
            this.scope
          ),
          new LinearChart(
            'evoViz',
            `${
            this.filters
            } sourcetype=wazuh rule.gdpr{}="*" | timechart count by rule.gdpr{}`,
            'evoViz',
            this.scope
          ),
          new PieChart(
            'agentsViz',
            `${
            this.filters
            } sourcetype=wazuh rule.gdpr{}="$gdpr$" | stats count by agent.name`,
            'agentsViz',
            this.scope
          ),
          new ColumnChart(
            'requirementsByAgents',
            `${
            this.filters
            } sourcetype=wazuh rule.gdpr{}="$gdpr$" agent.name=*| chart  count(rule.gdpr{}) by rule.gdpr{},agent.name`,
            'requirementsByAgents',
            this.scope
          ),
          new Table(
            'alertsSummaryViz',
            `${
            this.filters
            } sourcetype=wazuh rule.gdpr{}="$gdpr$" | stats count sparkline by agent.name, rule.gdpr{}, rule.description | sort count DESC | rename agent.name as "Agent Name", rule.gdpr{} as Requirement, rule.description as "Rule description", count as Count`,
            'alertsSummaryViz',
            this.scope
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
        } catch (error) { } //eslint-disable-line
      }
    }
    app.controller('overviewGdprCtrl', OverviewGDPR)
  })
