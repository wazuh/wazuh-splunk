define([
  '../../module',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/inputs/dropdown-input', 
], function (
  app,
  ColumnChart,
  PieChart,
  Table,
  TimePicker,
  Dropdown
  ) {
    
    'use strict'
    
    app.controller('agentsGdprCtrl', function ($urlTokenModel, $currentDataService, $scope ,$state, agent) {
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
        'rule.gdpr{}',
        '$form.gdpr$',
        'dropDownInput'
        )
        const dropdownInstance = dropdown.getElement()
        dropdownInstance.on("change", function(newValue){
          if (newValue && dropdownInstance)
          $urlTokenModel.handleValueChange(dropdownInstance)
        })  
        
        $scope.agent = agent.data.data
        $scope.getAgentStatusClass = agentStatus => agentStatus === "Active" ? "teal" : "red";
        $scope.formatAgentStatus = agentStatus => {
          return ['Active', 'Disconnected'].includes(agentStatus) ? agentStatus : 'Never connected';
        }
        
        $scope.gdprTabs = false
        
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
          /**
          * Visualizations
          */
          new ColumnChart('gdprRequirementsVizz',
          `${filters} sourcetype=wazuh rule.gdpr{}=\"$gdpr$\"  | stats count by rule.gdpr{}`,
          'gdprRequirementsVizz'),
          new PieChart('groupsVizz',
          `${filters} sourcetype=wazuh rule.gdpr{}=\"$gdpr$\" | stats count by rule.groups`,
          'groupsVizz'),
          new PieChart('agentsVizz',
          `${filters} sourcetype=wazuh rule.gdpr{}=\"$gdpr$\" | stats count by agent.name`,
          'agentsVizz'),
          new ColumnChart('requirementsByAgentVizz',
          `${filters} sourcetype=wazuh rule.gdpr{}=\"$gdpr$\" agent.name=*| chart  count(rule.gdpr{}) by rule.gdpr{},agent.name`,
          'requirementsByAgentVizz'),
          new Table('alertsSummaryVizz',
          `${filters} sourcetype=wazuh rule.gdpr{}=\"$gdpr$\" | stats count sparkline by agent.name, rule.gdpr{}, rule.description | sort count DESC | rename agent.name as \"Agent Name\", rule.gdpr{} as Requirement, rule.description as \"Rule description\", count as Count`,
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
    