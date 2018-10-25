define([
  '../../module',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/time-picker/time-picker',
  '../../../services/visualizations/search/search-handler',
], function (
  app,
  ColumnChart,
  PieChart,
  AreaChart,
  Table,
  LinearChart,
  TimePicker,
  SearchHandler
  ) {
    
    'use strict'
    
    app.controller('overviewFimCtrl', function ($urlTokenModel, $scope, $currentDataService, $state) {
      let filters = $currentDataService.getSerializedFilters()
      console.log('filters ',filters)
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
      new PieChart('deletedFiles',`${filters} sourcetype=wazuh syscheck.event=deleted | top agent.name limit=5`,'deletedFiles'),
      new ColumnChart('whodataUsage',`${filters} sourcetype=wazuh
      | eval WHODATA=if(isnotnull('syscheck.audit.effective_user.id'), "WHODATA", "NOWHO")
      | stats count BY WHODATA
      | addcoltotals count labelfield=WHODATA label=Total
      | where NOT WHODATA="NOWHO"`,'whodataUsage'),
      new PieChart('alertsVolume',`${filters} sourcetype=wazuh | eval SYSCHECK=if(isnotnull('syscheck.event'), "SYSCHECK", "NO")
      | stats count BY SYSCHECK
      | addcoltotals count labelfield=SYSCHECK label=Total
      | where NOT SYSCHECK="NO"`,'alertsVolume'),
      new PieChart('newFiles',`${filters} sourcetype=wazuh syscheck.event=added | top agent.name limit=5`,'newFiles'),
      new PieChart('modifiedFiles',`${filters} sourcetype=wazuh syscheck.event=modified | top agent.name limit=5`,'modifiedFiles'),
      new LinearChart('eventsSummary',`${filters} sourcetype=wazuh | timechart count`,'eventsSummary'),
      new Table('topRules',`${filters} sourcetype=wazuh |stats count sparkline by rule.id, rule.description | sort count DESC | head 5 | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,'topRules'),
      new Table('topUsers',`${filters} sourcetype=wazuh syscheck.audit.effective_user.id=* | top syscheck.audit.effective_user.name limit=5`,'topUsers')
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