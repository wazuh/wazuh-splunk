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
  Dropdown,
  ) {
    
    'use strict'
    
    app.controller('overviewPciCtrl', function ($urlTokenModel, $scope, $currentDataService, $state) {
      let filters = $currentDataService.getSerializedFilters()
      const timePicker = new TimePicker('#timePicker',$urlTokenModel.handleValueChange)

      const dropdown = new Dropdown(
        'dropDownInput',
        `${filters} sourcetype=wazuh rule.pci_dss{}=\"*\"| stats count by \"rule.pci_dss{}\" | sort \"rule.pci_dss{}\" ASC | fields - count`,
        'rule.pci_dss{}',
        '$form.pci$',
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
          new ColumnChart('pciReqVizz',
          `${filters} sourcetype=wazuh rule.pci_dss{}=\"$pci$\"  | stats count by rule.pci_dss{}`,
          'pciReqVizz'
          ),
          new PieChart('groupsVizz',
          `${filters} sourcetype=wazuh rule.pci_dss{}=\"$pci$\" | stats count by rule.groups`,
          'groupsVizz'
          ),
          new PieChart('agentsVizz',
          `${filters} sourcetype=wazuh rule.pci_dss{}=\"$pci$\" | stats count by agent.name`,
          'agentsVizz'),
          new ColumnChart('requirementsByAgentVizz',
          `${filters} sourcetype=wazuh rule.pci_dss{}=\"$pci$\" agent.name=*| chart  count(rule.pci_dss{}) by rule.pci_dss{},agent.name`,
          'requirementsByAgentVizz'),
          new Table('alertsSummaryViz',
          `${filters} sourcetype=wazuh rule.pci_dss{}=\"$pci$\" | stats count sparkline by agent.name, rule.pci_dss{}, rule.description | sort count DESC | rename agent.name as \"Agent Name\", rule.pci_dss{} as Requirement, rule.description as \"Rule description\", count as Count`,
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
    