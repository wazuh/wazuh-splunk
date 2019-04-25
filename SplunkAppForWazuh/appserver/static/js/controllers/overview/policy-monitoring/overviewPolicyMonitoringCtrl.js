define([
  '../../module',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/rawTableData/rawTableDataService'
], function(app, PieChart, AreaChart, Table, TimePicker, RawTableDataService) {
  'use strict'
  class PM {
    /**
     *
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
      reportingEnabled,
      extensions
    ) {
      this.scope = $scope
      this.scope.reportingEnabled = reportingEnabled
      this.scope.extensions = extensions
      this.urlTokenModel = $urlTokenModel
      this.state = $state
      this.reportingService = $reportingService
      this.tableResults = {}
      $currentDataService.addFilter(
        `{"rule.groups{}":"rootcheck", "implicit":true}`
      )
      this.getFilters = $currentDataService.getSerializedFilters
      this.filters = this.getFilters()
      this.timePicker = new TimePicker(
        '#timePicker',
        this.urlTokenModel.handleValueChange
      )
      this.scope.expandArray = [false, false, false, false, false]
      this.scope.expand = (i, id) => this.expand(i, id)

      this.vizz = [
        /**
         * Visualizations
         */
        new AreaChart(
          'elementOverTime',
          `${
            this.filters
          } sourcetype=wazuh rule.description=* | timechart span=1h count by rule.description`,
          'elementOverTime',
          this.scope
        ),
        new PieChart(
          'cisRequirements',
          `${this.filters} sourcetype=wazuh rule.cis{}=* | top  rule.cis{}`,
          'cisRequirements',
          this.scope
        ),
        new PieChart(
          'topPciDss',
          `${
            this.filters
          } sourcetype=wazuh rule.pci_dss{}=* | top  rule.pci_dss{}`,
          'topPciDss',
          this.scope
        ),
        new AreaChart(
          'eventsPerAgent',
          `${
            this.filters
          } sourcetype=wazuh | timechart span=2h count by agent.name`,
          'eventsPerAgent',
          this.scope
        ),
        new Table(
          'alertsSummary',
          `${
            this.filters
          } sourcetype=wazuh |stats count sparkline by agent.name, rule.description, title | sort count DESC | rename rule.description as "Rule description", agent.name as Agent, title as Control`,
          'alertsSummary',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryTable',
          `${
            this.filters
          } sourcetype=wazuh |stats count sparkline by agent.name, rule.description, title | sort count DESC | rename rule.description as "Rule description", agent.name as Agent, title as Control`,
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
        this.scope.$on('deletedFilter', event => {
          event.stopPropagation()
          this.launchSearches()
        })
  
        this.scope.$on('barFilter', event => {
          event.stopPropagation()
          this.launchSearches()
        })
        /**
         * On controller destroy
         */
        this.scope.$on('$destroy', () => {
          this.timePicker.destroy()
          this.vizz.map(vizz => vizz.destroy())
        })
  
        /**
         * Generates report
         */
        this.scope.startVis2Png = () =>
          this.reportingService.startVis2Png(
            'overview-pm',
            'Policity monitoring',
            this.filters,
            [
              'elementOverTime',
              'cisRequirements',
              'topPciDss',
              'eventsPerAgent',
              'alertsSummary'
            ],
            {}, //Metrics
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
            this.vizz.map(v => {
              if (v.constructor.name === 'RawTableData') {
                this.tableResults[v.name] = v.results
              }
            })
            this.scope.loadingVizz = true
          }
          if (!this.scope.$$phase) this.scope.$digest()
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
  app.controller('overviewPolicyMonitoringCtrl', PM)
})
