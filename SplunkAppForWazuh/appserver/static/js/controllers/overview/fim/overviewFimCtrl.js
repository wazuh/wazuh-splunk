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
      const deletedFiles = new PieChart('deletedFiles',`${filters} sourcetype=wazuh syscheck.event=deleted | top agent.name limit=5`,'deletedFiles')
      const whodataUsage = new ColumnChart('whodataUsage',`${filters} sourcetype=wazuh syscheck
      | eval WHODATA=if(isnotnull('syscheck.audit.effective_user.id'), "WHODATA", "NOWHO")
      | stats count BY WHODATA
      | addcoltotals count labelfield=WHODATA label=Total
      | where NOT WHODATA="NOWHO"`,'whodataUsage')
      const alertsVolume = new PieChart('alertsVolume',`${filters} sourcetype=wazuh | eval SYSCHECK=if(isnotnull('syscheck.event'), "SYSCHECK", "NO")
      | stats count BY SYSCHECK
      | addcoltotals count labelfield=SYSCHECK label=Total
      | where NOT SYSCHECK="NO"`,'alertsVolume')
      const newFiles = new PieChart('newFiles',`${filters} sourcetype=wazuh syscheck.event=added | top agent.name limit=5`,'newFiles')
      const modifiedFiles = new AreaChart('modifiedFiles',`${filters} sourcetype=wazuh syscheck.event=modified | top agent.name limit=5`,'modifiedFiles')
      const eventsSummary = new LinearChart('eventsSummary',`${filters} sourcetype=wazuh syscheck | timechart count`,'eventsSummary')
      const topRules = new Table('topRules',`${filters} sourcetype=wazuh syscheck |stats count sparkline by rule.id, rule.description | sort count DESC | head 5 | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,'topRules')
      const topUsers = new Table('topUsers',`${filters} sourcetype=wazuh syscheck.audit.effective_user.id=* | top syscheck.audit.effective_user.name limit=5`,'topUsers')
      
      /**
      * On controller destroy
      */
      $scope.$on('$destroy', () => {
        timePicker.destroy()
        deletedFiles.destroy()
        whodataUsage.destroy()
        alertsVolume.destroy()
        newFiles.destroy()
        modifiedFiles.destroy()
        eventsSummary.destroy()
        topRules.destroy()
        topUsers.destroy()
      })
    })
  })