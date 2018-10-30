define([
  '../../module',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
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
      const timePicker = new TimePicker('#timePicker',$urlTokenModel.handleValueChange)
      $scope.osqueryWodle = false
      try {
        const wodles = osquery.data.data.wmodules
        $scope.osqueryWodle = wodles.filter(item => item.osquery)[0].osquery
      } catch (err) {
        $notificationService.showSimpleToast('Cannot load wodle configuration. Osquery is not configured.')
      }

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
      new AreaChart('alertsOverTime',`${filters} sourcetype=wazuh | timechart span=1h count`,'alertsOverTime'),
      new AreaChart('alertsEvolution',`${filters} sourcetype=wazuh | timechart span=1h limit=5 useother=f count by agent.name`,'alertsEvolution'),
      new PieChart('mostCommonEvents',`${filters} sourcetype=wazuh  | top data.osquery.name limit=5`,'mostCommonEvents'),
      new Table('topPacks',`${filters} sourcetype=wazuh  | top "data.osquery.pack" limit=5`,'topPacks'),
      new Table('topRules',`${filters} sourcetype=wazuh  | top rule.id, rule.description limit=5`,'topRules')
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