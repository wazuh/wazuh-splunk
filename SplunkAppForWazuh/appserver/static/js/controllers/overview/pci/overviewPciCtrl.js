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
    
    class PCI{
      constructor($urlTokenModel, $scope, $currentDataService, $state) {
        this.scope = $scope
        this.state = $state
        this.getFilters = $currentDataService.getSerializedFilters
        this.filters = this.getFilters()
        this.submittedTokenModel = $urlTokenModel.getSubmittedTokenModel()
        
        this.$on('deletedFilter', () => {
          this.launchSearches()
        })
        
        this.$on('barFilter', () => {
          this.launchSearches()
        })
        
        this.scope.$on('$destroy', () => {
          this.timePicker.destroy()
          this.vizz.map( (vizz) => vizz.destroy())
        })
        this.timePicker = new TimePicker('#timePicker',$urlTokenModel.handleValueChange)
        this.dropdown = new Dropdown('dropDownInput',`${this.filters} sourcetype=wazuh rule.pci_dss{}=\"*\"| stats count by \"rule.pci_dss{}\" | sort \"rule.pci_dss{}\" ASC | fields - count`,'rule.pci_dss{}','$form.pci$','dropDownInput')
        this.dropdownInstance = this.dropdown.getElement()
        this.vizz = [
          new ColumnChart('pciReqVizz',
          `${this.filters} sourcetype=wazuh rule.pci_dss{}=\"$pci$\"  | stats count by rule.pci_dss{}`,
          'pciReqVizz'
          ),
          new PieChart('groupsVizz',
          `${this.filters} sourcetype=wazuh rule.pci_dss{}=\"$pci$\" | stats count by rule.groups`,
          'groupsVizz'
          ),
          new PieChart('agentsVizz',
          `${this.filters} sourcetype=wazuh rule.pci_dss{}=\"$pci$\" | stats count by agent.name`,
          'agentsVizz'),
          new ColumnChart('requirementsByAgentVizz',
          `${this.filters} sourcetype=wazuh rule.pci_dss{}=\"$pci$\" agent.name=*| chart  count(rule.pci_dss{}) by rule.pci_dss{},agent.name`,
          'requirementsByAgentVizz'),
          new Table('alertsSummaryViz',
          `${this.filters} sourcetype=wazuh rule.pci_dss{}=\"$pci$\" | stats count sparkline by agent.name, rule.pci_dss{}, rule.description | sort count DESC | rename agent.name as \"Agent Name\", rule.pci_dss{} as Requirement, rule.description as \"Rule description\", count as Count`,
          'alertsSummaryViz')
        ]
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
    app.controller('overviewPciCtrl', PCI)
  })
  