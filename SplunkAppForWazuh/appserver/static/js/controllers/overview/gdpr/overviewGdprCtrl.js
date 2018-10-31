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
    
    app.controller('overviewGdprCtrl', function ($urlTokenModel, $scope, $currentDataService, $state) {
      let filters = $currentDataService.getSerializedFilters()
      const timePicker = new TimePicker('#timePicker',$urlTokenModel.handleValueChange)

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
          * Visualizations
          */
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
    