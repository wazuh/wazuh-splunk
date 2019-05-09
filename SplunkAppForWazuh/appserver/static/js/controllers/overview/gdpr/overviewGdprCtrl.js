define([
  '../../module',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/inputs/dropdown-input'
], function(
  app,
  LinearChart,
  ColumnChart,
  PieChart,
  Table,
  TimePicker,
  Dropdown
) {
  'use strict'
  class OverviewGDPR {
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
      this.scope = $scope
      ;(this.scope.reportingEnabled = reportingEnabled),
        (this.scope.pciExtensionEnabled = pciExtensionEnabled)
      this.state = $state
      this.getFilters = $currentDataService.getSerializedFilters
      this.reportingService = $reportingService
      this.tableResults = {}
      this.filters = this.getFilters()
      this.scope.gdprTabs = gdprTabs ? gdprTabs : false
      this.scope.$on('deletedFilter', event => {
        event.stopPropagation()
        this.launchSearches()
      })

      this.scope.$on('barFilter', event => {
        event.stopPropagation()
        this.launchSearches()
      })

      this.timePicker = new TimePicker(
        '#timePicker',
        $urlTokenModel.handleValueChange
      )
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
      this.scope.expand = (i, id) => this.expand(i, id)

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

        this.scope.$on('loadingReporting', (event, data) => {
          this.scope.loadingReporting = data.status
        })

        this.scope.$on('checkReportingStatus', () => {
          this.vizzReady = !this.vizz.filter(v => {
            return v.finish === false
          }).length
          if (this.vizzReady) {
            this.scope.loadingVizz = false
          } else {
            this.scope.loadingVizz = true
          }
          if (!this.scope.$$phase) this.scope.$digest()
        })

        /**
         * When controller is destroyed
         */
        this.scope.$on('$destroy', () => {
          this.timePicker.destroy()
          this.dropdown.destroy()
          this.vizz.map(vizz => vizz.destroy())
        })
      } catch (error) {}
    }

    /**
     * Get filters and launches the search
     */
    launchSearches() {
      this.filters = this.getFilters()
      this.state.reload()
    }

    expand(i, id) {
      this.scope.expandArray[i] = !this.scope.expandArray[i]
      let vis = $(
        '#' + id + ' .panel-body .splunk-view .shared-reportvisualizer'
      )
      this.scope.expandArray[i]
        ? vis.css('height', 'calc(100vh - 200px)')
        : vis.css('height', '250px')

      let vis_header = $('.wz-headline-title')
      vis_header.dblclick(e => {
        if (this.scope.expandArray[i]) {
          this.scope.expandArray[i] = !this.scope.expandArray[i]
          this.scope.expandArray[i]
            ? vis.css('height', 'calc(100vh - 200px)')
            : vis.css('height', '250px')
          this.scope.$applyAsync()
        } else {
          e.preventDefault()
        }
      })
    }
  }
  app.controller('overviewGdprCtrl', OverviewGDPR)
})
