define([
  '../../module',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/map/map',
  '../../../services/visualizations/inputs/time-picker',
], function (
  app,
  PieChart,
  AreaChart,
  Table,
  Map,
  TimePicker,
  ) {
    
    'use strict'
    
    app.controller('awsCtrl', function ($urlTokenModel, $scope, $currentDataService, $state) {
      let filters = $currentDataService.getSerializedFilters()
      const timePicker = new TimePicker('#timePicker')
      const timePickerInstance = timePicker.get()
      
      timePickerInstance.on("change", function (newValue) {
        if (newValue && timePickerInstance)
        $urlTokenModel.handleValueChange(timePickerInstance)
      })
      
      const launchSearches = () => {
        filters = $currentDataService.getSerializedFilters()
        $state.reload();
      }
      
      $scope.$on('deletedFilter', () => {
        launchSearches()
      })
      
      $scope.$on('barFilter', () => {
        launchSearches()
      })
      
      const vizz = [
      /**
      * Visualizations
      */
      new PieChart('topAddrs',`${filters} sourcetype=wazuh | top data.aws.source_ip_address`,'topAddrs'),
      new AreaChart('alertsOverTime',`${filters} sourcetype=wazuh | timechart count`,'alertsOverTime'),
      new PieChart('topInstances',`${filters} sourcetype=wazuh | top data.aws.requestParameters.instanceId`,'topInstances'),
      new PieChart('mostCommonEvents',`${filters} sourcetype=wazuh | top data.aws.eventName limit=5`,'mostCommonEvents'),
      new Map('map',`${filters} sourcetype=wazuh | geostats latfield="data.aws.service.action.portProbeAction.portProbeDetails.remoteIpDetails.geoLocation.lat" longfield="data.aws.service.action.portProbeAction.portProbeDetails.remoteIpDetails.geoLocation.lon" count`,'map'),
      new Table('topBuckets',`${filters} sourcetype=wazuh | top "data.aws.source" limit=5`,'topBuckets'),
      new PieChart('topSources',`${filters} sourcetype=wazuh | top "data.aws.log_info.s3bucket"`,'topSources'),
      new Table('topRules',`${filters} sourcetype=wazuh | top rule.id, rule.description limit=5`,'topRules')
      ]
      
      /**
      * On controller destroy
      */
      $scope.$on('$destroy', () => {
        timePicker.destroy()
        vizz.map( (vizz) => vizz.destroy())
      })
    })
  })