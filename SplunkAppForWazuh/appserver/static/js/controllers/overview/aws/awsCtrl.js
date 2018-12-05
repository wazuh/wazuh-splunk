define([
  '../../module',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/map/map',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/inputs/dropdown-input'
], function(app, PieChart, AreaChart, ColumnChart, Table, Map, TimePicker, Dropdown) {
  'use strict'

  class AWS {
    constructor($urlTokenModel, $scope, $currentDataService, $state) {
      this.scope = $scope
      this.state = $state
      this.currentDataService = $currentDataService
      this.currentDataService.addFilter(`{"rule.groups":"amazon", "implicit":true}`)
      this.getFilters = this.currentDataService.getSerializedFilters
      this.filters = this.getFilters()
      this.submittedTokenModel = $urlTokenModel.getSubmittedTokenModel()
      this.timePicker = new TimePicker(
        '#timePicker',
        $urlTokenModel.handleValueChange
      )

      this.dropdown = new Dropdown(
        'dropDownInput',
        `${this.filters} sourcetype=wazuh data.aws.source=* | stats by data.aws.source | fields data.aws.source | sort data.aws.source ASC`,
        'data.aws.source',
        '$form.awsSource$',
        'dropDownInput'
      )
      this.dropdownInstance = this.dropdown.getElement()
      this.dropdownInstance.on('change', newValue => {
        if (newValue && this.dropdownInstance)
          $urlTokenModel.handleValueChange(this.dropdownInstance)
      })

      this.vizz = [
        /**
         * Visualizations
         */
        new AreaChart(
          'eventsByIdOverTime',
          `${this.filters} sourcetype=wazuh data.aws.source=$awsSource$ | timechart count by data.aws.resource.instanceDetails.instanceId usenull=f`,
          'eventsByIdOverTime'
        ),
        new ColumnChart(
          'eventsByRegionOverTime',
          `${this.filters} sourcetype=wazuh data.aws.source=$awsSource$ | timechart count by data.aws.awsRegion usenull=f`,
          'eventsByRegionOverTime'
        ),
        new PieChart(
          'topEventsByServiceName',
          `${this.filters} sourcetype=wazuh data.aws.source=$awsSource$ | stats count BY data.aws.source`,
          'topEventsByServiceName'
        ),
        new PieChart(
          'topEventsByInstanceId',
          `${this.filters} sourcetype=wazuh data.aws.source=$awsSource$ | top data.aws.resource.instanceDetails.instanceId limit=5`,
          'topEventsByInstanceId'
        ),
        new PieChart(
          'topEventsByResourceType',
          `${this.filters} sourcetype=wazuh data.aws.source=$awsSource$ | top data.aws.resource.resourceType limit=5`,
          'topEventsByResourceType'
        ),
        new PieChart(
          'topEventsByRegion',
          `${this.filters} sourcetype=wazuh data.aws.source=$awsSource$ | top data.aws.awsRegion limit=5`,
          'topEventsByRegion'
        ),
        new Map(
          'map',
          `${
            this.filters
          } sourcetype=wazuh data.aws.source=$awsSource$ | geostats latfield="data.aws.service.action.portProbeAction.portProbeDetails.remoteIpDetails.geoLocation.lat" longfield="data.aws.service.action.portProbeAction.portProbeDetails.remoteIpDetails.geoLocation.lon" count`,
          'map'
        ),
        new Table(
          'top5Buckets',
          `${this.filters} sourcetype=wazuh data.aws.source=$awsSource$ | top data.aws.source limit=5`,
          'top5Buckets'
        ),
        new Table(
          'top5Rules',
          `${this.filters} sourcetype=wazuh data.aws.source=$awsSource$ | top rule.id, rule.description limit=5`,
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
    launchSearches() {
      this.filters = this.getFilters()
      this.state.reload()
    }
  }
  app.controller('awsCtrl', AWS)
})
