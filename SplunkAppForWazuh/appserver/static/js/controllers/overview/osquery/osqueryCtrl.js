define([
  '../../module',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker'
], function(app, PieChart, AreaChart, Table, TimePicker) {
  'use strict'

  class Osquery {
    /**
     * Class Osquery
     * @param {*} $urlTokenModel 
     * @param {*} $scope 
     * @param {*} $currentDataService 
     * @param {*} $state 
     * @param {*} $notificationService 
     * @param {*} osquery 
     * @param {*} $reportingService 
     */
    constructor(
      $urlTokenModel,
      $scope,
      $currentDataService,
      $state,
      $notificationService,
      osquery,
      $reportingService
    ) {
      this.scope = $scope
      this.osquery = osquery
      this.state = $state
      this.currentDataService = $currentDataService
      this.reportingService = $reportingService
      this.currentDataService.addFilter(
        `{"rule.groups":"osquery", "implicit":true}`
      )
      this.getFilters = this.currentDataService.getSerializedFilters
      this.filters = this.getFilters()
      this.scope.osqueryWodle = false
      this.scope.$on('deletedFilter', () => {
        this.launchSearches()
      })

      this.scope.$on('barFilter', () => {
        this.launchSearches()
      })

      this.timePicker = new TimePicker(
        '#timePicker',
        $urlTokenModel.handleValueChange
      )
      this.toast = $notificationService.showSimpleToast
      this.vizz = [
        /**
         * Visualizations
         */
        new AreaChart(
          'alertsOverTime',
          `${this.filters} sourcetype=wazuh | timechart span=1h count`,
          'alertsOverTime'
        ),
        new AreaChart(
          'alertsEvolution',
          `${
            this.filters
          } sourcetype=wazuh | timechart span=1h limit=5 useother=f count by agent.name`,
          'alertsEvolution'
        ),
        new PieChart(
          'mostCommonEvents',
          `${this.filters} sourcetype=wazuh  | top data.osquery.name limit=5`,
          'mostCommonEvents'
        ),
        new Table(
          'topPacks',
          `${this.filters} sourcetype=wazuh  | top "data.osquery.pack" limit=5`,
          'topPacks'
        ),
        new Table(
          'topRules',
          `${
            this.filters
          } sourcetype=wazuh  | top rule.id, rule.description limit=5`,
          'topRules'
        )
      ]

      /**
       * Generates report
       */
      this.scope.startVis2Png = () =>
      this.reportingService.startVis2Png('osquery', 'Osquery', this.filters, [
        'alertsOverTime',
        'mostCommonEvents',
        'alertsEvolution',
        'topPacks',
        'topRules'
      ])

      this.scope.$on('loadingReporting', (event, data) => {
        this.scope.loadingReporting = data.status
      })

      /**
       * On controller destroy
       */
      this.scope.$on('$destroy', () => {
        this.timePicker.destroy()
        this.vizz.map(vizz => vizz.destroy())
      })
    }

    /**
     * On controller loads
     */
    $onInit() {
      try {
        const wodles = this.osquery.data.data.wmodules
        this.scope.osqueryWodle = wodles.filter(item => item.osquery)[0].osquery
      } catch (err) {
        this.toast(
          'Cannot load wodle configuration. Osquery is not configured.'
        )
      }
    }

    /**
     * Get filters and launches search
     */
    launchSearches() {
      this.filters = this.getFilters()
      this.state.reload()
    }
  }

  app.controller('osqueryCtrl', Osquery)
})
