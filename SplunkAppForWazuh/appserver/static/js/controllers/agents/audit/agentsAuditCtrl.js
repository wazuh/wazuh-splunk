define([
  '../../module',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/chart/bar-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/search/search-handler',
], function (
  app,
  ColumnChart,
  PieChart,
  AreaChart,
  BarChart,
  Table,
  TimePicker,
  SearchHandler
  ) {
    
    'use strict'
    
    app.controller('agentsAuditCtrl', function ($urlTokenModel, $scope, $currentDataService, $state, agent) {
      let filters = $currentDataService.getSerializedFilters()
      const timePicker = new TimePicker('#timePicker')
      const timePickerInstance = timePicker.get()
      const submittedTokenModel = $urlTokenModel.getSubmittedTokenModel()

      timePickerInstance.on("change", function (newValue) {
        if (newValue && timePickerInstance)
        $urlTokenModel.handleValueChange(timePickerInstance)
      })
      
      $scope.agent = agent.data.data
      
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
        * Metrics
        */
       new SearchHandler(`filesAddedSearch`,`${filters} sourcetype=wazuh rule.groups=\"audit\" rule.id=80790 | stats count`,
       `filesAddedToken`,'$result.count$','newFiles',submittedTokenModel,$scope),
       new SearchHandler(`readFilesSearch`,`${filters} sourcetype=wazuh rule.groups=\"audit\" rule.id=80784 | stats count`,
       `readFilesToken`,'$result.count$','readFiles',submittedTokenModel,$scope),
       new SearchHandler(`modifiedFiles`,`${filters} sourcetype=wazuh rule.groups=\"audit\" rule.id=80781 | stats count`,
       `filesModifiedToken`,'$result.count$','filesModifiedToken',submittedTokenModel,$scope),
       new SearchHandler(`deletedFiles`,`${filters} sourcetype=wazuh rule.groups=\"audit\" rule.id=80791 | stats count`,
       'filesDeletedToken','$result.count$','filesDeleted',submittedTokenModel,$scope),
        /**
        * Visualizations
        */
        new PieChart('groupsVizz',
        `${filters} sourcetype=wazuh rule.groups=\"audit\" | top rule.groups`,
        'groupsVizz'),
        new ColumnChart('agentsVizz',
        `${filters} sourcetype=wazuh rule.groups=\"audit\" agent.name=* | top agent.name`,
        'agentsVizz'),
        new PieChart('directoriesVizz',
        `${filters} sourcetype=wazuh rule.groups=\"audit\" audit.directory.name=* | top audit.directory.name`,
        'directoriesVizz'),
        new PieChart('filesVizz',
        `${filters} sourcetype=wazuh rule.groups=\"audit\" audit.file.name=* | top audit.file.name`,
        'filesVizz'),
        new AreaChart('alertsOverTimeVizz',
        `${filters} sourcetype=wazuh rule.groups=\"audit\" | timechart limit=10 count by rule.description`,
        'alertsOverTimeVizz'),
        new PieChart('fileReadAccessVizz',
        `${filters} sourcetype=wazuh rule.groups=\"audit\" rule.id=80784 | top audit.file.name`,
        'fileReadAccessVizz'),
        new PieChart('fileWriteAccessVizz',
        `${filters} sourcetype=wazuh rule.groups=\"audit\" rule.id=80781 | top audit.file.name`,
        'fileWriteAccessVizz'),
        new BarChart('comandsVizz',
        `${filters} sourcetype=wazuh rule.groups=\"audit\" | top audit.command`,
        'comandsVizz'),
        new BarChart('createdVizz',
        `${filters} sourcetype=wazuh rule.groups=\"audit\" rule.id=80790 | top audit.file.name`,
        'createdVizz'),
        new PieChart('removedFilesVizz',
        `${filters} sourcetype=wazuh rule.groups=\"audit\" rule.id=80791 | top audit.file.name`,
        'removedFilesVizz'),
        new Table('alertsSummaryVizz',
        `${filters} sourcetype=wazuh rule.groups=\"audit\" | stats count sparkline by agent.name,rule.description, audit.exe, audit.type, audit.euid | sort count DESC | rename agent.name as \"Agent name\", rule.description as Description, audit.exe as Command, audit.type as Type, audit.euid as \"Effective user id\"`,
        'alertsSummaryVizz')
      ]
      
      /**
      * When controller is destroyed
      */
      $scope.$on('$destroy', () => {
        timePicker.destroy()
        vizz.map( (vizz) => vizz.destroy())
      })
    })
  })
  