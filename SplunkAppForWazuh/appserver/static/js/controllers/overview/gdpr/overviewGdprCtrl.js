define([
  '../../module',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/inputs/dropdown-input', 
], function (
  app,
  ColumnChart,
  PieChart,
  TimePicker,
  Dropdown,
  ) {
    
    'use strict'
    
    app.controller('overviewGdprCtrl', function ($scope, $currentDataService, $state, $urlTokenModel) {
      let filters = $currentDataService.getSerializedFilters()
      const timePicker = new TimePicker('#timePicker')
      const timePickerInstance = timePicker.get()
      timePickerInstance.on("change", function (newValue) {
        if (newValue && timePickerInstance)
        $urlTokenModel.handleValueChange(timePickerInstance)
      })
      
      const dropdown = new Dropdown(
        'dropDownInput',
        `${filters} sourcetype=wazuh rule.gdpr{}=\"*\"| stats count by \"rule.gdpr{}\" | spath \"rule.gdpr{}\" | fields - count`,
        '"rule.gdpr{}"',
        'dropDownInput'
        )
        const dropdownInstance = dropdown.getElement()
        const submittedTokenModel = $urlTokenModel.getSubmittedTokenModel()
        dropdownInstance.on("change", function(newValue){
          if (newValue && dropdownInstance)
          $urlTokenModel.handleValueChange(dropdownInstance)
        })  
        
        /**
        * Fires all the queries
        */
        const launchSearches = () => {
          filters = $currentDataService.getSerializedFilters()
          $state.reload();
          // searches.map(search => search.startSearch())
        }
        
        $scope.$on('deletedFilter', () => {
          launchSearches()
        })
        
        $scope.$on('barFilter', () => {
          launchSearches()
        })
        
        const vizz = [
          new ColumnChart('gdprRequirements',
          `${filters} sourcetype=wazuh rule.gdpr{}=\"$gdpr$\"  | stats count by rule.gdpr{}`,
          'gdprRequirements'),
          new PieChart('groupsViz',
          `${filters} sourcetype=wazuh rule.gdpr{}=\"$gdpr$\" | stats count by rule.groups`,
          'groupsViz'),
          new PieChart('agentsViz',
          `${filters} sourcetype=wazuh rule.gdpr{}=\"$gdpr$\" | stats count by agent.name`,
          'agentsViz'),
          new ColumnChart('requirementsByAgents',
          `${filters} sourcetype=wazuh rule.gdpr{}=\"$gdpr$\" agent.name=*| chart  count(rule.gdpr{}) by rule.gdpr{},agent.name`,
          'requirementsByAgents'),
          new ColumnChart('alertsSummaryViz',
          `${filters} sourcetype=wazuh rule.gdpr{}=\"$gdpr$\" | stats count sparkline by agent.name, rule.gdpr{}, rule.description | sort count DESC | rename agent.name as \"Agent Name\", rule.gdpr{} as Requirement, rule.description as \"Rule description\", count as Count`,
          'alertsSummaryViz')
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
    