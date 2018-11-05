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
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
], function (
  app,
  LinearChart,
  ColumnChart,
  PieChart,
  Table,
  TimePicker,
  ) {
    'use strict'
    
    class AgentsGeneral{
      
      /**
      * Class constructor
      * @param {Object} $scope 
      * @param {Object} $currentDataService
      * @param {Object} $urlTokenModel
      * @param {Object} $requestService
      * @param {Object} $notificationService
      * @param {Object} $stateParams
      * @param {Object} $state
      * @param {Object} agent
      */
      
      constructor($urlTokenModel, $scope, $requestService, $notificationService, $stateParams, $currentDataService, agent, $state){
        this.state = $state
        if (!$currentDataService.getCurrentAgent()) { this.state.go('overview') }
        
        this.urlTokenModel = $urlTokenModel
        this.scope = $scope
        this.requestService = $requestService
        this.notificationService = $notificationService
        this.stateParams = $stateParams
        this.agent = agent
        
        this.filters = $currentDataService.getSerializedFilters()
        this.timePicker = new TimePicker('#timePicker', this.urlTokenModel.handleValueChange)

        this.agentInfo = {
          name: this.agent[0].data.data.name,
          id: this.agent[0].data.data.id,
          status: this.agent[0].data.data.status,
          ip: this.agent[0].data.data.ip,
          version: this.agent[0].data.data.version,
          group: this.agent[0].data.data.group,
          lastKeepAlive: this.agent[0].data.data.lastKeepAlive,
          dateAdd: this.agent[0].data.data.dateAdd,
          agentOS: `${this.agent[0].data.data.os.name} ${this.agent[0].data.data.os.codename} ${this.agent[0].data.data.os.version}`,
          syscheck: this.agent[1].data.data,
          rootcheck: this.agent[2].data.data
        }

        this.scope.agentInfo = this.agentInfo
      
        this.scope.agent = this.agent[0].data.data
        this.scope.id = this.stateParams.id
        
        this.scope.goGroups = async (group) => {
          try {
            this.groupInfo = await this.requestService.apiReq(`/agents/groups/`)
            this.groupData = this.groupInfo.data.data.items.filter( item => item.name === group)
            if (!this.groupInfo || !this.groupInfo.data || !this.groupInfo.data.data || this.groupInfo.data.error) {
              throw Error('Missing fields')
            }
            this.state.go(`mg-groups`, { group: this.groupData[0] } )
          } catch (err) {
            this.notificationService.showSimpleToast('Error fetching group data')
          }
        }
        
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
         new PieChart('top5AlertsVizz',
         `${this.filters} sourcetype=wazuh | top \"rule.description\" limit=5`,
         'top5AlertsVizz'),
         new PieChart('top5GroupsVizz',
         `${this.filters} sourcetype=wazuh | top rule.groups limit=5`,
         'top5GroupsVizz'),
         new PieChart('top5PCIreqVizz',
         `${this.filters} sourcetype=wazuh | top rule.pci_dss{} limit=5`,
         'top5PCIreqVizz'),
         new LinearChart('alertLevelEvoVizz',
         `${this.filters} sourcetype=wazuh rule.level=*| timechart count by rule.level`,
         'alertLevelEvoVizz'),
         new ColumnChart('alertsVizz',
         `${this.filters} sourcetype=wazuh | timechart span=2h count`,
         'alertsVizz'),
         new Table('agentsSummaryVizz',
         `${this.filters} sourcetype=wazuh |stats count sparkline by rule.id, rule.description, rule.level | sort rule.level DESC | rename rule.id as \"Rule ID\", rule.description as \"Description\", rule.level as Level, count as Count`,
         'agentsSummaryVizz')
        ]
        
        /**
        * When controller is destroyed
        */
        this.scope.$on('$destroy', () => {
          this.timePicker.destroy()
          this.vizz.map( (vizz) => vizz.destroy())
        })        

      }

      launchSearches(){
        this.filters = $currentDataService.getSerializedFilters()
        this.state.reload()
      }

    }
    
    app.controller('agentsGeneralCtrl', AgentsGeneral)
    
  })
  
  