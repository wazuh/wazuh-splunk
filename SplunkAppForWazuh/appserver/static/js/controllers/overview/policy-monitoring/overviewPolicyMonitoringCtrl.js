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
    
    app.controller('overviewPolicyMonitoringCtrl', function ($urlTokenModel, $scope, $currentDataService, $state) {
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
      new AreaChart('elementOverTime',`${filters} sourcetype=wazuh \"rule.groups\"=\"rootcheck\" rule.description=* | timechart span=1h count by rule.description`,'elementOverTime'),
      new PieChart('cisRequirements',`${filters} sourcetype=wazuh \"rule.groups\"=\"rootcheck\" rule.cis{}=* | top  rule.cis{}`,'cisRequirements'),
      new PieChart('topPciDss',`${filters} sourcetype=wazuh \"rule.groups\"=\"rootcheck\" rule.pci_dss{}=* | top  rule.pci_dss{}`,'topPciDss'),
      new AreaChart('eventsPerAgent',`${filters} sourcetype=wazuh \"rule.groups\"=\"rootcheck\" | timechart span=2h count by agent.name`,'eventsPerAgent'),
      new Table('alertsSummary',`${filters} sourcetype=wazuh \"rule.groups\"=\"rootcheck\" |stats count sparkline by agent.name, rule.description, title | sort count DESC | rename rule.description as \"Rule description\", agent.name as Agent, title as Control`,'alertsSummary')
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