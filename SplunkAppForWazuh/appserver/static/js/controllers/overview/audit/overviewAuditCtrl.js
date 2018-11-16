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
    class Audit{
      constructor($urlTokenModel, $scope, $currentDataService, $state) {
        this.scope = $scope
        this.state = $state
        this.getFilters = $currentDataService.getSerializedFilters
        this.filters = this.getFilters()
        this.submittedTokenModel = $urlTokenModel.getSubmittedTokenModel()
        this.timePicker = new TimePicker('#input1',$urlTokenModel.handleValueChange)
        
        this.scope.$on('deletedFilter', () => {
          this.launchSearches()
        })
        
        this.scope.$on('barFilter', () => {
          this.launchSearches()
        })
        
        /**
        * On controller destroy
        */
        this.scope.$on('$destroy', () => {
          this.timePicker.destroy()
          this.vizz.map( (vizz) => vizz.destroy())
        })
        
        this.vizz = [
          /**
          * Metrics
          */
          new SearchHandler(`filesAddedSearch`,`${this.filters} sourcetype=wazuh rule.id=80790 | stats count`,`filesAddedToken`,'$result.count$','newFiles',this.submittedTokenModel,this.scope),
          new SearchHandler(`readFilesSearch`,`${this.filters} sourcetype=wazuh rule.id=80784 | stats count`,`readFilesToken`,'$result.count$','readFiles',this.submittedTokenModel,this.scope),
          new SearchHandler(`modifiedFiles`,`${this.filters} sourcetype=wazuh rule.id=80781 | stats count`,`filesModifiedToken`,'$result.count$','filesModifiedToken',this.submittedTokenModel,this.scope),
          new SearchHandler(`deletedFiles`,`${this.filters} sourcetype=wazuh rule.id=80791 | stats count`,'filesDeletedToken','$result.count$','filesDeleted',this.submittedTokenModel,this.scope),
          /**
          * Visualizations
          */
          new PieChart('groupsElement',`${this.filters} sourcetype=wazuh rule.groups=\"audit\" | top rule.groups`,'groupsElement'),
          new ColumnChart('agentsElement',`${this.filters} sourcetype=wazuh rule.groups=\"audit\" agent.name=* | top agent.name`,'agentsElement'),
          new PieChart('directoriesElement',`${this.filters} sourcetype=wazuh rule.groups=\"audit\" data.audit.directory.name=* | top data.audit.directory.name`,'directoriesElement'),
          new PieChart('filesElement',`${this.filters} sourcetype=wazuh rule.groups=\"audit\" data.audit.file.name=* | top data.audit.file.name`,'filesElement'),
          new AreaChart('alertsOverTime',`${this.filters} sourcetype=wazuh rule.groups=\"audit\" | timechart limit=10 count by rule.description`,'alertsOverTimeElement'),
          new PieChart('fileReadAccess',`${this.filters} sourcetype=wazuh rule.groups=\"audit\" rule.id=80784 | top data.audit.file.name`,'fileReadAccessElement'),
          new PieChart('fileWriteAccess',`${this.filters} sourcetype=wazuh rule.groups=\"audit\" rule.id=80781 | top data.audit.file.name`,'fileWriteAccessElement'),
          new ColumnChart('commands',`${this.filters} sourcetype=wazuh rule.groups=\"audit\" | top data.audit.command`,'commandsElement'),
          new ColumnChart('createdFiles',`${this.filters} sourcetype=wazuh rule.groups=\"audit\" rule.id=80790 | top data.audit.file.name`,'createdFilesElement'),
          new PieChart('removedFiles',`${this.filters} sourcetype=wazuh rule.groups=\"audit\" rule.id=80791 | top data.audit.file.name`,'removedFilesElement'),
          new Table('alertsSummary',`${this.filters} sourcetype=wazuh rule.groups=\"audit\" | stats count sparkline by agent.name,rule.description, data.audit.exe, data.audit.type, data.audit.euid | sort count DESC | rename agent.name as \"Agent name\", rule.description as Description, data.audit.exe as Command, data.audit.type as Type, data.audit.euid as \"Effective user id\"`,'alertsSummaryElement')
        ]
      }
      launchSearches(){
        this.filters = $currentDataService.getSerializedFilters()
        this.state.reload()
      }
    }
    app.controller('overviewAuditCtrl', Audit)
  })