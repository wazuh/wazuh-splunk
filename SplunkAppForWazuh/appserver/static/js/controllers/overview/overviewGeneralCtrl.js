define([
  '../module',
  "../../services/visualizations/chart/linear-chart",
  "../../services/visualizations/chart/column-chart",
  "../../services/visualizations/chart/pie-chart",
  "../../services/visualizations/chart/area-chart",
  "../../services/visualizations/table/table",
  "../../services/visualizations/time-picker/time-picker",
], function (
  controllers,
  LinearChart,
  ColumnChart,
  PieChart,
  AreaChart,
  Table,
  TimePicker
  ) {
    'use strict'
    
    controllers.controller('overviewGeneralCtrl', function ($urlTokenModel, $scope, $currentDataService, $state, $notificationService, $requestService, pollingState) {
      const vm = this
      let filters = $currentDataService.getSerializedFilters()
      const timePicker = new TimePicker('#input1')
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
      const totalAlerts = new LinearChart('overviewElement5',`${filters} sourcetype=wazuh rule.level=*| timechart count by rule.level`,'overviewElement5')
      const totalAlertsColumn = new ColumnChart('overviewElement',`${filters} sourcetype=wazuh | timechart span=2h count`,'overviewElement6')
      const topAgentName = new PieChart('overviewElement7',`${filters} sourcetype=wazuh | top \"agent.name\"`,'overviewElement7')
      const timechartAgentName = new AreaChart('overviewElement8',`${filters} sourcetype=wazuh | timechart span=1h limit=5 useother=f count by agent.name`,'overviewElement8')
      const tableSummary = new Table('overviewElement14',`${filters} sourcetype=wazuh |stats count sparkline by rule.id, rule.description, rule.level | sort rule.level DESC | rename rule.id as \"Rule ID\", rule.description as \"Description\", rule.level as Level, count as Count`,'overviewElement14')
      /**
      * On controller destroy
      */
      $scope.$on('$destroy', () => {
        console.log('destroying controller')
        totalAlerts.destroy()
        totalAlertsColumn.destroy()
        topAgentName.destroy()
        timePicker.destroy()
        tableSummary.destroy()
        timechartAgentName.destroy()  
      })
    })
  })
  
  