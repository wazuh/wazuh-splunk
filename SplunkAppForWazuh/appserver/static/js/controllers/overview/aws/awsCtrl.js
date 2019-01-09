define([
  '../../module',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/map/map',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/inputs/dropdown-input'
], function (app, PieChart, AreaChart, ColumnChart, Table, Map, TimePicker, Dropdown) {
  'use strict'

  class AWS {
    /**
     * Class constructor
     * @param {*} $rootScope 
     * @param {*} $scope 
     * @param {*} $currentDataService 
     * @param {*} $state 
     * @param {*} $notificationService 
     */
    constructor($urlTokenModel, $scope, $currentDataService, $state, $notificationService) {
      this.scope = $scope
      this.urlTokenModel = $urlTokenModel
      this.state = $state
      this.toast = $notificationService.showSimpleToast
      this.currentDataService = $currentDataService
      this.currentDataService.addFilter(
        `{"rule.groups":"amazon", "implicit":true}`
      )
      this.getFilters = this.currentDataService.getSerializedFilters
      this.filters = this.getFilters()
      this.submittedTokenModel = this.urlTokenModel.getSubmittedTokenModel()
      this.timePicker = new TimePicker(
        '#timePicker',
        this.urlTokenModel.handleValueChange
      )
//data.aws.log_info.s3bucket
      this.vizz = [
        /**
         * Visualizations
         */
        new AreaChart(
          'eventsBySourceVizz',
          `${this.filters} sourcetype=wazuh | timechart count by data.aws.source usenull=f`,
          'eventsBySourceVizz'
        ),
        new ColumnChart(
          'eventsByS3BucketsVizz',
          `${this.filters} sourcetype=wazuh | timechart count by data.aws.log_info.s3bucket usenull=f`,
          'eventsByS3BucketsVizz'
        ),
        new PieChart(
          'sourcesVizz',
          `${this.filters} sourcetype=wazuh | stats count BY data.aws.source`,
          'sourcesVizz'
        ),
        new PieChart(
          'accountsVizz',
          `${this.filters} sourcetype=wazuh | top data.aws.responseElements.instancesSet.items.instanceId`,
          'accountsVizz'
        ),
        new PieChart(
          's3BucketsVizz',
          `${this.filters} sourcetype=wazuh | stats count by data.aws.log_info.s3bucket`,
          's3BucketsVizz'
        ),
        new PieChart(
          'regionsVizz',
          `${this.filters} sourcetype=wazuh | top data.aws.awsRegion`,
          'regionsVizz'
        ),
        new Table(
          'top5Buckets',
          `${this.filters} sourcetype=wazuh | top data.aws.source limit=5`,
          'top5Buckets'
        ),
        new Table(
          'top5Rules',
          `${this.filters} sourcetype=wazuh | top rule.id, rule.description limit=5`,
          'top5Rules'
        )
      ]

      this.scope.$on('deletedFilter', () => {
        this.launchSearches()
      })

      this.scope.$on('barFilter', () => {
        this.launchSearches()
      })

      /**
       * On controller destroy
       */
      this.scope.$on('$destroy', () => {
        this.timePicker.destroy()
        this.dropdown.destroy()
        this.vizz.map(vizz => vizz.destroy())
      })

    }

    /**
     * Gets filters and launches search
     */
    launchSearches() {
      this.filters = this.getFilters()
      this.state.reload()
    }
  }

  app.controller('awsCtrl', AWS)
})
