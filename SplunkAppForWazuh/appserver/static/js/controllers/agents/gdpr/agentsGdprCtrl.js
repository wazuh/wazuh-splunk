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
    
    class AgentsGdpr {
      
      /**
      * Class constructor
      * @param {Object} $urlTokenModel 
      * @param {Object} $scope 
      * @param {Object} $currentDataService 
      * @param {Object} $state 
      * @param {Object} agent
      */
      
      constructor($urlTokenModel, $currentDataService, $scope ,$state, agent) {
        this.state = $state
        if (!$currentDataService.getCurrentAgent()) { this.state.go('overview') }
        this.urlTokenModel = $urlTokenModel
        this.scope = $scope
        this.agent = agent
        this.filters = $currentDataService.getSerializedFilters()
        this.timePicker = new TimePicker('#timePicker',this.urlTokenModel.handleValueChange)
        
        this.dropdown = new Dropdown(
          'dropDownInput',
          `${this.filters} sourcetype=wazuh rule.gdpr{}=* | stats count by rule.gdpr{} | spath rule.gdpr{} | fields - count`,
          'rule.gdpr{}',
          '$form.gdpr$',
          'dropDownInput'
          )
          
          this.dropdownInstance = this.dropdown.getElement()
          this.dropdownInstance.on("change", function(newValue){
            if (newValue && this.dropdownInstance){
              this.urlTokenModel.handleValueChange(this.dropdownInstance)
            }
          })  
          
          this.scope.agent = this.agent.data.data
          
          this.scope.gdprTabs = false
          
          this.launchSearches = () => {
            this.filters = $currentDataService.getSerializedFilters()
            this.state.reload();
            // searches.map(search => search.startSearch())
          }
          this.scope.$on('deletedFilter', () => {
            launchSearches()
          })
          
          this.scope.$on('barFilter', () => {
            launchSearches()
          })
          
          this.vizz = [
            /**
            * Visualizations
            */
            new ColumnChart('gdprRequirementsVizz',
            `${this.filters} sourcetype=wazuh rule.gdpr{}=\"$gdpr$\"  | stats count by rule.gdpr{}`,
            'gdprRequirementsVizz'),
            new PieChart('groupsVizz',
            `${this.filters} sourcetype=wazuh rule.gdpr{}=\"$gdpr$\" | stats count by rule.groups`,
            'groupsVizz'),
            new PieChart('agentsVizz',
            `${this.filters} sourcetype=wazuh rule.gdpr{}=\"$gdpr$\" | stats count by agent.name`,
            'agentsVizz'),
            new ColumnChart('requirementsByAgentVizz',
            `${this.filters} sourcetype=wazuh rule.gdpr{}=\"$gdpr$\" agent.name=*| chart  count(rule.gdpr{}) by rule.gdpr{},agent.name`,
            'requirementsByAgentVizz'),
            new Table('alertsSummaryVizz',
            `${this.filters} sourcetype=wazuh rule.gdpr{}=\"$gdpr$\" | stats count sparkline by agent.name, rule.gdpr{}, rule.description | sort count DESC | rename agent.name as \"Agent Name\", rule.gdpr{} as Requirement, rule.description as \"Rule description\", count as Count`,
            'alertsSummaryVizz')
          ]
          
          /**
          * When controller is destroyed
          */
          this.scope.$on('$destroy', () => {
            this.timePicker.destroy()
            this.dropdown.destroy()
            this.vizz.map( (vizz) => vizz.destroy())
          })
        }
        
        $onInit(){
          this.scope.getAgentStatusClass = agentStatus => agentStatus === "Active" ? "teal" : "red";
          this.scope.formatAgentStatus = agentStatus => {
            return ['Active', 'Disconnected'].includes(agentStatus) ? agentStatus : 'Never connected';
          }
        }
        
      }
      app.controller('agentsGdprCtrl', AgentsGdpr)
    })
    