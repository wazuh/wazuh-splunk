define([
  '../../module',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/time-picker/time-picker',
], function (
  app,
  PieChart,
  AreaChart,
  Table,
  TimePicker,
  ) {
    
    'use strict'
    
    app.controller('osqueryCtrl', function ($urlTokenModel, $scope, $currentDataService, $state, osquery) {
      let filters = $currentDataService.getSerializedFilters()
      const timePicker = new TimePicker('#timePicker')
      const timePickerInstance = timePicker.get()
      $scope.osqueryWodle = false
      try {
        const wodles = osquery.data.data.wmodules
        $scope.osqueryWodle = wodles.filter(item => item.osquery)[0].osquery
      } catch (err) {
        $notificationService.showSimpleToast('Cannot load wodle configuration. Osquery is not configured.')
      }
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
      const alertsOverTime = new AreaChart('alertsOverTime',`${filters} sourcetype=wazuh | timechart span=1h count`,'alertsOverTime')
      const alertsEvolution = new AreaChart('alertsEvolution',`${filters} sourcetype=wazuh | timechart span=1h limit=5 useother=f count by agent.name`,'alertsEvolution')
      const mostCommonEvents = new PieChart('mostCommonEvents',`${filters} sourcetype=wazuh  | top data.osquery.name limit=5`,'mostCommonEvents')
      const topPacks = new Table('topPacks',`${filters} sourcetype=wazuh  | top "data.osquery.pack" limit=5`,'topPacks')
      const topRules = new Table('topRules',`${filters} sourcetype=wazuh  | top rule.id, rule.description limit=5`,'topRules')
      
      /**
      * On controller destroy
      */
      $scope.$on('$destroy', () => {
        timePicker.destroy()
        alertsOverTime.destroy()
        alertsEvolution.destroy()
        mostCommonEvents.destroy()
        topPacks.destroy()
        topRules.destroy()
      })
    })
  })