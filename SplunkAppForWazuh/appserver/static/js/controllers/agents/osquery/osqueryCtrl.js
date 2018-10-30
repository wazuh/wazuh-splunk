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
    
    app.controller('osqueryAgentCtrl', function ($urlTokenModel, $scope, agent, $notificationService, $currentDataService, $state, osquery) {
      if (!$currentDataService.getCurrentAgent()) { $state.go('overview') }
      let filters = $currentDataService.getSerializedFilters()
      const timePicker = new TimePicker('#timePicker')
      const timePickerInstance = timePicker.get()

      timePickerInstance.on("change", function (newValue) {
        if (newValue && timePickerInstance)
        $urlTokenModel.handleValueChange(timePickerInstance)
      })
      
      $scope.agent = agent.data.data
      $scope.getAgentStatusClass = agentStatus => agentStatus === "Active" ? "teal" : "red";
      $scope.formatAgentStatus = agentStatus => {
        return ['Active', 'Disconnected'].includes(agentStatus) ? agentStatus : 'Never connected';
      }

      $scope.osqueryWodle = null

      try {
        $currentDataService.addFilter(`{"rule.groups":"osquery", "implicit":true}`)
        const wodles = osquery.data.data.wmodules
        $scope.osqueryWodle = wodles.filter(item => item.osquery)[0].osquery
      } catch (err) {
        $notificationService.showSimpleToast('Cannot load wodle configuration. Osquery not configured.')
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
      
      const vizz= [
        /**
        * Visualizations
        */
        new PieChart('mostCommonPacks',
        `${filters} sourcetype=wazuh  | top data.osquery.pack limit=5`,
        'mostCommonPacks'),
        new AreaChart('alertsPacksOverTime',
        `${filters} sourcetype=wazuh | timechart span=1h count by data.osquery.pack`,
        'alertsPacksOverTime'),
        new PieChart('mostCommonActions',
        `${filters} sourcetype=wazuh  | top "data.osquery.action" limit=5`,
        'mostCommonActions'),
        new Table('topRules',
        `${filters} sourcetype=wazuh  | top rule.id, rule.description limit=5`,
        'topRules'),
        new AreaChart('alertsOverTime',
        `${filters} sourcetype=wazuh | timechart span=1h count`,
        'alertsOverTime')
      ]
      
      /*
      * When controller is destroyed
      */
      $scope.$on('$destroy', () => {
        timePicker.destroy()
        vizz.map( (vizz) => vizz.destroy())
      })

    })
  })
  
  