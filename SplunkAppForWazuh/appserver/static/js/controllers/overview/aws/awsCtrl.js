define([
  '../../module',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/map/map',
  '../../../services/visualizations/time-picker/time-picker',
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
      
      /**
      * Visualizations
      */
      const topAddrs = new PieChart('topAddrs',`${filters} sourcetype=wazuh | top data.aws.source_ip_address`,'topAddrs')
      const alertsOverTime = new AreaChart('alertsOverTime',`${filters} sourcetype=wazuh | timechart count`,'alertsOverTime')
      const topInstances = new PieChart('topInstances',`${filters} sourcetype=wazuh | top data.aws.requestParameters.instanceId`,'topInstances')
      
      const mostCommonEvents = new PieChart('mostCommonEvents',`${filters} sourcetype=wazuh | top data.aws.eventName limit=5`,'mostCommonEvents')
      const map = new Map('map',`${filters} sourcetype=wazuh | geostats latfield="data.aws.service.action.portProbeAction.portProbeDetails.remoteIpDetails.geoLocation.lat" longfield="data.aws.service.action.portProbeAction.portProbeDetails.remoteIpDetails.geoLocation.lon" count`,'map')
      const topBuckets = new Table('topBuckets',`${filters} sourcetype=wazuh | top "data.aws.source" limit=5`,'topBuckets')
      const topSources= new PieChart('topSources',`${filters} sourcetype=wazuh | top "data.aws.log_info.s3bucket"`,'topSources')
      const topRules = new Table('topRules',`${filters} sourcetype=wazuh | top rule.id, rule.description limit=5`,'topRules')
      
      /**
      * On controller destroy
      */
      $scope.$on('$destroy', () => {
        timePicker.destroy()
        topAddrs.destroy()
        alertsOverTime.destroy()
        topInstances.destroy()
        mostCommonEvents.destroy()
        map.destroy()
        topBuckets.destroy()
        topSources.destroy()
        topRules.destroy()
      })
    })
  })