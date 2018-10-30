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
    
    app.controller('overviewOpenScapCtrl', function ($urlTokenModel, $scope, $currentDataService, $state ) {
      let filters = $currentDataService.getSerializedFilters()
      const timePicker = new TimePicker('#timePicker',$urlTokenModel.handleValueChange)

      const dropdown = new Dropdown(
        'dropDownInput',
        `${filters} sourcetype=wazuh  rule.groups=\"oscap\" rule.groups!=\"syslog\" oscap.scan.profile.title=* | stats count by oscap.scan.profile.title | sort oscap.scan.profile.title ASC|fields - count`,
        'oscap.scan.profile.title',
        '$form.profile$',
        'dropDownInput'
      )
      const dropdownInstance = dropdown.getElement()
      const submittedTokenModel = $urlTokenModel.getSubmittedTokenModel()
      dropdownInstance.on("change", function(newValue){
        if (newValue && dropdownInstance)
        $urlTokenModel.handleValueChange(dropdownInstance)
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
      * Metrics
      */
      new SearchHandler(`lastScapScore`,
        `${filters} sourcetype=wazuh oscap.scan.score=* | stats latest(oscap.scan.score)`,
        `latestScapScore`,
        '$result.latest(oscap.scan.score)$',
        'scapLastScore',
        submittedTokenModel,
        $scope),
      new SearchHandler(`maxScapScore`,
        `${filters} sourcetype=wazuh oscap.scan.score=* | stats max(oscap.scan.score)`,
        `maxScapScore`,
        '$result.max(oscap.scan.score)$',
        'scapHighestScore',
        submittedTokenModel,
        $scope),
      new SearchHandler(`scapLowest`,
      `${filters} sourcetype=wazuh oscap.scan.score=* | stats min(oscap.scan.score)`,
      `minScapScore`,
      '$result.min(oscap.scan.score)$',
      'scapLowestScore',
      submittedTokenModel,
      $scope),
      
      /**
      * Visualizations
      */
      new PieChart('agentsVizz',
      `${filters} sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" rule.groups!=\"syslog\" oscap.scan.profile.title=\"$profile$\" | top agent.name`,
      'agentsVizz'),
      new LinearChart('profilesVizz',
      `${filters} sourcetype=wazuh rule.level=*| timechart count by rule.level`,
      'profilesVizz'),
      new ColumnChart('contentVizz',
      `${filters} sourcetype=wazuh | timechart span=2h count`,
      'contentVizz'),
      new PieChart('severityVizz',
      `${filters} sourcetype=wazuh | top agent.name`,
      'severityVizz'),
      new AreaChart('top5AgentsVizz',
      `${filters} sourcetype=wazuh | timechart span=1h limit=5 useother=f count by agent.name`,
      'top5AgentsVizz'),
      new PieChart('top10AlertsVizz',
      `${filters} sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" rule.groups=\"oscap-result\" oscap.scan.profile.title=\"$profile$\" | top oscap.check.title`,
      'top10AlertsVizz'),
      new PieChart('top10HRisk',
      `${filters} sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" rule.groups=\"oscap-result\"  oscap.check.severity=\"high\" oscap.scan.profile.title=\"$profile$\" | top oscap.check.title`,
      'top10HRisk'),
      new Table('alertsSummaryVizz',
      `${filters} sourcetype=wazuh |stats count sparkline by rule.id, rule.description, rule.level | sort rule.level DESC | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,
      'alertsSummaryVizz')
      ]

      /**
      * On controller destroy
      */
      $scope.$on('$destroy', () => {
        timePicker.destroy()
        dropdown.destroy()
        vizz.map( (vizz) => vizz.destroy())
      })
    })
  })