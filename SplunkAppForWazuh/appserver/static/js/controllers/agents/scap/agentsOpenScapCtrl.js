define([
  '../../module',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/chart/bar-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/inputs/dropdown-input',
  '../../../services/visualizations/search/search-handler',
], function (
  app,
  PieChart,
  AreaChart,
  BarChart,
  Table,
  TimePicker,
  Dropdown,
  SearchHandler,
  ) {
    
    'use strict'
    
    app.controller('agentsOpenScapCtrl', function ($urlTokenModel, $scope, $currentDataService, agent) {
      let filters = $currentDataService.getSerializedFilters()
      const timePicker = new TimePicker('#timePicker')
      const timePickerInstance = timePicker.get()
      timePickerInstance.on("change", function (newValue) {
        if (newValue && timePickerInstance)
        $urlTokenModel.handleValueChange(timePickerInstance)
      })
      
      $scope.agent = agent.data.data
      
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
          new PieChart('profilesVizz',
          `${filters} sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" rule.groups!=\"syslog\" oscap.scan.profile.title=\"$profile$\" | top oscap.scan.profile.title`,
          'profilesVizz'),
          new BarChart('contentVizz',
          `${filters} sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" rule.groups!=\"syslog\" oscap.scan.profile.title=\"$profile$\" | top oscap.scan.content`,
          'contentVizz'),
          new PieChart('severityVizz',
          `${filters} sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" rule.groups!=\"syslog\" oscap.scan.profile.title=\"$profile$\" | top oscap.check.severity`,
          'severityVizz'),
          new AreaChart('top5AgentsSHVizz',
          `${filters} sourcetype=wazuh rule.groups=\"oscap\" oscap.scan.profile.title=\"$profile$\" oscap.check.severity=\"high\" | chart count by agent.name`,
          'top5AgentsSHVizz'),
          new PieChart('top10AleertsVizz',
          `${filters} sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" rule.groups=\"oscap-result\" oscap.scan.profile.title=\"$profile$\" | top oscap.check.title`,
          'top10AleertsVizz'),
          new PieChart('top10HRAlertsVizz',
          `${filters} sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" rule.groups=\"oscap-result\"  oscap.check.severity=\"high\" oscap.scan.profile.title=\"$profile$\" | top oscap.check.title`,
          'top10HRAlertsVizz'),
          new Table('alertsSummaryVizz',
          `${filters} sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" oscap.scan.profile.title=\"$profile$\" | stats count by agent.name, oscap.check.title, oscap.scan.profile.title, oscap.scan.id, oscap.scan.content | sort count DESC | rename agent.name as \"Agent name\", oscap.check.title as Title, oscap.scan.profile.title as Profile, oscap.scan.id as \"Scan ID\", oscap.scan.content as Content`,
          'alertsSummaryVizz')
        ]
        
        /**
        * When controller is destroyed
        */
        $scope.$on('$destroy', () => {
          timePicker.destroy()
          dropdown.destroy()
          vizz.map( (vizz) => vizz.destroy())
        })
      })
    })  