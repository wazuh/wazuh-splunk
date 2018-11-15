/*
* Wazuh app - Agents controller
* Copyright (C) 2018 Wazuh, Inc.
*
* This program is free software you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation either version 2 of the License, or
* (at your option) any later version.
*
* Find more information about this on the LICENSE file.
*/

define([
  '../../module',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
], function (
  app,
  PieChart,
  AreaChart,
  Table,
  TimePicker,l
  ) {
    
    'use strict'
    
    class AgentsPM {
      
      /**
      * Class constructor
      * @param {Object} $urlTokenModel 
      * @param {Object} $scope 
      * @param {Object} $state 
      * @param {Object} $currentDataService 
      * @param {Object} agent
      */
      
      constructor($urlTokenModel, $scope, $state, $currentDataService, agent) {
        
        this.urlTokenModel = $urlTokenModel 
        this.scope = $scope 
        this.state = $state 
        this.currentDataService = $currentDataService 
        this.agent = agent
        
        if (!this.currentDataService.getCurrentAgent()) { this.state.go('overview') }
        
        this.filters = this.currentDataService.getSerializedFilters()
        this.timePicker = new TimePicker('#timePicker', this.urlTokenModel.handleValueChange)
        
        this.scope.agent = agent.data.data
                
        this.scope.$on('deletedFilter', () => {
          this.launchSearches()
        })
        
        this.scope.$on('barFilter', () => {
          this.launchSearches()
        })
        
        this.vizz = [
          /**
          * Visualizations
          */
          new AreaChart('elementOverTime',
          `${this.filters} sourcetype=wazuh \"rule.groups\"=\"rootcheck\" rule.description=* | timechart span=1h count by rule.description`,
          'elementOverTime'),
          new PieChart('cisRequirements',
          `${this.filters} sourcetype=wazuh \"rule.groups\"=\"rootcheck\" rule.cis{}=* | top  rule.cis{}`,
          'cisRequirements'),
          new PieChart('topPciDss',
          `${this.filters} sourcetype=wazuh \"rule.groups\"=\"rootcheck\" rule.pci_dss{}=* | top  rule.pci_dss{}`,
          'topPciDss'),
          new AreaChart('eventsPerAgent',
          `${this.filters} sourcetype=wazuh \"rule.groups\"=\"rootcheck\" | timechart span=2h count by agent.name`,
          'eventsPerAgent'),
          new Table('alertsSummary',
          `${this.filters} sourcetype=wazuh \"rule.groups\"=\"rootcheck\" |stats count sparkline by agent.name, rule.description, title | sort count DESC | rename rule.description as \"Rule description\", agent.name as Agent, title as Control`,
          'alertsSummary')
        ]    
        
        /**
        * When controller is destroyed
        */
        this.scope.$on('$destroy', () => {
          this.timePicker.destroy()
          this.vizz.map( (vizz) => vizz.destroy())
        })
        
      }
      
      $onInit(){
        this.scope.getAgentStatusClass = agentStatus => agentStatus === "Active" ? "teal" : "red";
        this.scope.formatAgentStatus = agentStatus => {
          return ['Active', 'Disconnected'].includes(agentStatus) ? agentStatus : 'Never connected';
        }
      }

      launchSearches(){
        this.filters = $currentDataService.getSerializedFilters()
        this.state.reload()
      }
      
    }
    
    app.controller('agentsPolicyMonitoringCtrl', AgentsPM)
    
  })
  