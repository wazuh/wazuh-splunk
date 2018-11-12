define([
  '../../module',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/search/search-handler',
], function (
  app,
  ColumnChart,
  LinearChart,
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
        this.timePicker = new TimePicker('#timePicker',$urlTokenModel.handleValueChange)
        
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
          new SearchHandler(`lastNotChecked`,`${this.filters} sourcetype=wazuh rule.id=80790 | stats count`,`filesAddedToken`,'$result.count$','lastNotChecked',this.submittedTokenModel,this.scope),
          new SearchHandler(`lastPass`,`${this.filters} sourcetype=wazuh rule.id=80784 | stats count`,`readFilesToken`,'$result.count$','lastPass',this.submittedTokenModel,this.scope),
          new SearchHandler(`lastScanScore`,`${this.filters} sourcetype=wazuh rule.id=80781 | stats count`,`filesModifiedToken`,'$result.count$','lastScanScore',this.submittedTokenModel,this.scope),
          new SearchHandler(`lastScanDate`,`${this.filters} sourcetype=wazuh rule.id=80791 | stats count`,'filesDeletedToken','$result.count$','lastScanDate',this.submittedTokenModel,this.scope),
          new SearchHandler(`lastErrors`,`${this.filters} sourcetype=wazuh rule.id=80791 | stats count`,'filesDeletedToken','$result.count$','lastErrors',this.submittedTokenModel,this.scope),
          new SearchHandler(`lastFails`,`${this.filters} sourcetype=wazuh rule.id=80791 | stats count`,'filesDeletedToken','$result.count$','lastFails',this.submittedTokenModel,this.scope),
          new SearchHandler(`lastUknown`,`${this.filters} sourcetype=wazuh rule.id=80791 | stats count`,'filesDeletedToken','$result.count$','lastUknown',this.submittedTokenModel,this.scope),
          new SearchHandler(`lastScanBenchmark`,`${this.filters} sourcetype=wazuh rule.id=80791 | stats count`,'filesDeletedToken','$result.count$','lastScanBenchmark',this.submittedTokenModel,this.scope),
          /**
          * Visualizations
          */
          new ColumnChart('topCiscatGroups',`${this.filters} sourcetype=wazuh rule.groups=\"audit\" | top rule.groups`,'topCiscatGroups'),
          new LinearChart('scanResultEvolution',`${this.filters} sourcetype=wazuh rule.groups=\"audit\" agent.name=* | top agent.name`,'scanResultEvolution'),
          new Table('alertsSummary',`${this.filters} sourcetype=wazuh rule.groups=\"ciscat\" | stats count sparkline by count sparkline by data.cis.rule_title, data.cis.remediation,data.cis.group | sort count desc`,'alertsSummaryElement')
        ]
      }
    }
    app.controller('ciscatCtrl', Audit)
  })