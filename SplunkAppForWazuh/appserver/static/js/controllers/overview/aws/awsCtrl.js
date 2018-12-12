define([
  '../../module',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/map/map',
  '../../../services/visualizations/inputs/time-picker'
], function(app, PieChart, AreaChart, Table, Map, TimePicker) {
  'use strict'

  class AWS {
    /**
     * Class AWS
     * @param {*} $urlTokenModel 
     * @param {*} $scope 
     * @param {*} $currentDataService 
     * @param {*} $state 
     */
    constructor($urlTokenModel, $scope, $currentDataService, $state) {
      this.scope = $scope
      this.state = $state
      this.currentDataService = $currentDataService
      this.currentDataService.addFilter(
        `{"rule.groups":"amazon", "implicit":true}`
      )
      this.getFilters = this.currentDataService.getSerializedFilters
      this.filters = this.getFilters()
      this.submittedTokenModel = $urlTokenModel.getSubmittedTokenModel()
      this.timePicker = new TimePicker(
        '#timePicker',
        $urlTokenModel.handleValueChange
      )
      this.vizz = [
        /**
         * Visualizations
         */
        new PieChart(
          'topAddrs',
          `${this.filters} sourcetype=wazuh | top data.aws.source_ip_address`,
          'topAddrs'
        ),
        new AreaChart(
          'alertsOverTime',
          `${this.filters} sourcetype=wazuh | timechart count`,
          'alertsOverTime'
        ),
        new PieChart(
          'topInstances',
          `${
            this.filters
          } sourcetype=wazuh | top data.aws.requestParameters.instanceId`,
          'topInstances'
        ),
        new PieChart(
          'mostCommonEvents',
          `${this.filters} sourcetype=wazuh | top data.aws.eventName limit=5`,
          'mostCommonEvents'
        ),
        new Map(
          'map',
          `${
            this.filters
          } sourcetype=wazuh | geostats latfield="data.aws.service.action.portProbeAction.portProbeDetails.remoteIpDetails.geoLocation.lat" longfield="data.aws.service.action.portProbeAction.portProbeDetails.remoteIpDetails.geoLocation.lon" count`,
          'map'
        ),
        new Table(
          'topBuckets',
          `${this.filters} sourcetype=wazuh | top "data.aws.source" limit=5`,
          'topBuckets'
        ),
        new PieChart(
          'topSources',
          `${this.filters} sourcetype=wazuh | top "data.aws.log_info.s3bucket"`,
          'topSources'
        ),
        new Table(
          'topRules',
          `${
            this.filters
          } sourcetype=wazuh | top rule.id, rule.description limit=5`,
          'topRules'
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
        this.vizz.map(vizz => vizz.destroy())
      })
    }

    /**
     * Get filters and launches the search
     */
    launchSearches() {
      this.filters = this.getFilters()
      this.state.reload()
    }
  }
  app.controller('awsCtrl', AWS)
})
