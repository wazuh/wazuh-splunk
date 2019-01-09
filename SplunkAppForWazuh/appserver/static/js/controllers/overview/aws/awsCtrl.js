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
      
      this.vizz = [
        /**
         * Visualizations
         */
        new AreaChart(
          'eventsByIdOverTime',
          `${this.filters} sourcetype=wazuh | timechart count by data.aws.responseElements.instancesSet.items.instanceId usenull=f`,
          'eventsByIdOverTime'
        ),
        new ColumnChart(
          'eventsByRegionOverTime',
          `${this.filters} sourcetype=wazuh | timechart count by data.aws.awsRegion usenull=f`,
          'eventsByRegionOverTime'
        ),
        new PieChart(
          'topEventsByServiceName',
          `${this.filters} sourcetype=wazuh | stats count BY data.aws.source`,
          'topEventsByServiceName'
        ),
        new PieChart(
          'topEventsByInstanceId',
          `${this.filters} sourcetype=wazuh | top data.aws.responseElements.instancesSet.items.instanceId limit=5`,
          'topEventsByInstanceId'
        ),
        new PieChart(
          'topEventsByResourceType',
          `${this.filters} sourcetype=wazuh | top data.aws.resourceType limit=5`,
          'topEventsByResourceType'
        ),
        new PieChart(
          'topEventsByRegion',
          `${this.filters} sourcetype=wazuh | top data.aws.awsRegion limit=5`,
          'topEventsByRegion'
        ),
        new Map(
          'map',
          `${
          this.filters
          } sourcetype=wazuh | geostats latfield="data.aws.service.action.portProbeAction.portProbeDetails.remoteIpDetails.geoLocation.lat" longfield="data.aws.service.action.portProbeAction.portProbeDetails.remoteIpDetails.geoLocation.lon" count`,
          'map'
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
