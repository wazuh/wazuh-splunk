define([
  '../../module',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/inputs/dropdown-input',
  '../../../services/visualizations/search/search-handler',
], function (
  app,
  LinearChart,
  ColumnChart,
  PieChart,
  AreaChart,
  Table,
  TimePicker,
  Dropdown,
  SearchHandler,
  ) {
    
    'use strict'
    
    class OpenSCAP{
      constructor($urlTokenModel, $scope, $currentDataService, $state) {
        this.scope = $scope
        this.state = $state
        this.getFilters = $currentDataService.getSerializedFilters
        this.filters = this.getFilters()
        this.submittedTokenModel = $urlTokenModel.getSubmittedTokenModel()
        this.scope.$on('deletedFilter', () => {
          this.launchSearches()
        })
        
        this.scope.$on('barFilter', () => {
          this.launchSearches()
        })
        
        this.scope.$on('$destroy', () => {
          this.timePicker.destroy()
          this.vizz.map( (vizz) => vizz.destroy())
        })
        this.timePicker = new TimePicker('#timePicker',$urlTokenModel.handleValueChange)
        this.dropdown = new Dropdown('dropDownInput',`${this.filters} sourcetype=wazuh  rule.groups=\"oscap\" rule.groups!=\"syslog\" oscap.scan.profile.title=* | stats count by oscap.scan.profile.title | sort oscap.scan.profile.title ASC|fields - count`,'oscap.scan.profile.title','$form.profile$','dropDownInput')
        this.vizz = [
          /**
          * Metrics
          */
          new SearchHandler(`lastScapScore`,`${this.filters} sourcetype=wazuh oscap.scan.score=* | stats latest(oscap.scan.score)`,`latestScapScore`,'$result.latest(oscap.scan.score)$','scapLastScore',this.submittedTokenModel,this.scope),
          new SearchHandler(`maxScapScore`,`${this.filters} sourcetype=wazuh oscap.scan.score=* | stats max(oscap.scan.score)`,`maxScapScore`,'$result.max(oscap.scan.score)$','scapHighestScore',this.submittedTokenModel,this.scope),
          new SearchHandler(`scapLowest`,`${this.filters} sourcetype=wazuh oscap.scan.score=* | stats min(oscap.scan.score)`,`minScapScore`,'$result.min(oscap.scan.score)$','scapLowestScore',this.submittedTokenModel,this.scope),
          
          /**
          * Visualizations
          */
          new PieChart('agentsVizz',
          `${this.filters} sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" rule.groups!=\"syslog\" oscap.scan.profile.title=\"$profile$\" | top agent.name`,
          'agentsVizz'),
          new LinearChart('profilesVizz',
          `${this.filters} sourcetype=wazuh rule.level=*| timechart count by rule.level`,
          'profilesVizz'),
          new ColumnChart('contentVizz',
          `${this.filters} sourcetype=wazuh | timechart span=2h count`,
          'contentVizz'),
          new PieChart('severityVizz',
          `${this.filters} sourcetype=wazuh | top agent.name`,
          'severityVizz'),
          new AreaChart('top5AgentsVizz',
          `${this.filters} sourcetype=wazuh | timechart span=1h limit=5 useother=f count by agent.name`,
          'top5AgentsVizz'),
          new PieChart('top10AlertsVizz',
          `${this.filters} sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" rule.groups=\"oscap-result\" oscap.scan.profile.title=\"$profile$\" | top oscap.check.title`,
          'top10AlertsVizz'),
          new PieChart('top10HRisk',
          `${this.filters} sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" rule.groups=\"oscap-result\"  oscap.check.severity=\"high\" oscap.scan.profile.title=\"$profile$\" | top oscap.check.title`,
          'top10HRisk'),
          new Table('alertsSummaryVizz',
          `${this.filters} sourcetype=wazuh |stats count sparkline by rule.id, rule.description, rule.level | sort rule.level DESC | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,
          'alertsSummaryVizz')
        ]
        this.dropdownInstance = this.dropdown.getElement()
        this.dropdownInstance.on("change", function(newValue){
          if (newValue && this.dropdownInstance)
          $urlTokenModel.handleValueChange(this.dropdownInstance)
        })
        
      }
      launchSearches(){
        this.filters = this.getFilters()
        this.state.reload()
      }
    }
    app.controller('overviewOpenScapCtrl', OpenSCAP)
  })