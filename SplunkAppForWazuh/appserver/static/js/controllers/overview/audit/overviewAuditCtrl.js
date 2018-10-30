define([
  '../../module',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/search/search-handler',
], function (
  app,
  ColumnChart,
  PieChart,
  AreaChart,
  Table,
  TimePicker,
  SearchHandler
  ) {
    
    'use strict'
    
    app.controller('overviewAuditCtrl', function ($urlTokenModel, $scope, $currentDataService, $state) {
      let filters = $currentDataService.getSerializedFilters()
      const timePicker = new TimePicker('#input1',$urlTokenModel.handleValueChange)
      const submittedTokenModel = $urlTokenModel.getSubmittedTokenModel()
      
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
      new SearchHandler(`filesAddedSearch`,`${filters} sourcetype=wazuh rule.id=80790 | stats count`,`filesAddedToken`,'$result.count$','newFiles',submittedTokenModel,$scope),
      new SearchHandler(`readFilesSearch`,`${filters} sourcetype=wazuh rule.id=80784 | stats count`,`readFilesToken`,'$result.count$','readFiles',submittedTokenModel,$scope),
      new SearchHandler(`modifiedFiles`,`${filters} sourcetype=wazuh rule.id=80781 | stats count`,`filesModifiedToken`,'$result.count$','filesModifiedToken',submittedTokenModel,$scope),
      new SearchHandler(`deletedFiles`,`${filters} sourcetype=wazuh rule.id=80791 | stats count`,'filesDeletedToken','$result.count$','filesDeleted',submittedTokenModel,$scope),
      /**
      * Visualizations
      */
      new PieChart('groupsElement',`${filters} sourcetype=wazuh rule.groups=\"audit\" | top rule.groups`,'groupsElement'),
      new ColumnChart('agentsElement',`${filters} sourcetype=wazuh rule.groups=\"audit\" agent.name=* | top agent.name`,'agentsElement'),
      new PieChart('directoriesElement',`${filters} sourcetype=wazuh rule.groups=\"audit\" data.audit.directory.name=* | top data.audit.directory.name`,'directoriesElement'),
      new PieChart('filesElement',`${filters} sourcetype=wazuh rule.groups=\"audit\" data.audit.file.name=* | top data.audit.file.name`,'filesElement'),
      new AreaChart('alertsOverTime',`${filters} sourcetype=wazuh rule.groups=\"audit\" | timechart limit=10 count by rule.description`,'alertsOverTimeElement'),
      new PieChart('fileReadAccess',`${filters} sourcetype=wazuh rule.groups=\"audit\" rule.id=80784 | top data.audit.file.name`,'fileReadAccessElement'),
      new PieChart('fileWriteAccess',`${filters} sourcetype=wazuh rule.groups=\"audit\" rule.id=80781 | top data.audit.file.name`,'fileWriteAccessElement'),
      new ColumnChart('commands',`${filters} sourcetype=wazuh rule.groups=\"audit\" | top data.audit.command`,'commandsElement'),
      new ColumnChart('createdFiles',`${filters} sourcetype=wazuh rule.groups=\"audit\" rule.id=80790 | top data.audit.file.name`,'createdFilesElement'),
      new PieChart('removedFiles',`${filters} sourcetype=wazuh rule.groups=\"audit\" rule.id=80791 | top data.audit.file.name`,'removedFilesElement'),
      new Table('alertsSummary',`${filters} sourcetype=wazuh rule.groups=\"audit\" | stats count sparkline by agent.name,rule.description, data.audit.exe, data.audit.type, data.audit.euid | sort count DESC | rename agent.name as \"Agent name\", rule.description as Description, data.audit.exe as Command, data.audit.type as Type, data.audit.euid as \"Effective user id\"`,'alertsSummaryElement')
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