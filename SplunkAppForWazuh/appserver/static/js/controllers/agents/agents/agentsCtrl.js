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
  '../../../services/visualizations/search/search-handler',
  'FileSaver'
],function (
  app,
  SearchHandler,
  FileSaver
  ){
    
    'use strict'
    
    class Agents{

      /**
      * Class constructor
      * @param {Object} $urlTokenModel 
      * @param {Object} $scope 
      * @param {Object} $currentDataService 
      * @param {Object} $state 
      * @param {Object} $notificationService 
      * @param {Object} $requestService 
      * @param {Object} agentData 
      */
     
      constructor($urlTokenModel, $scope, $currentDataService, $state, $notificationService, $requestService, $csvRequestService,$tableFilterService, agentData){
        this.scope = $scope
        this.submittedTokenModel = $urlTokenModel.getSubmittedTokenModel()
        this.submittedTokenModel.set('activeAgentToken', '-')
        this.api = $currentDataService.getApi()
        this.apiReq = $requestService.apiReq
        this.state = $state
        this.toast = $notificationService.showSimpleToast
        this.currentClusterInfo = $currentDataService.getClusterInfo()
        this.filters = $currentDataService.getSerializedFilters()
        this.csvReq = $csvRequestService
        this.wzTableFilter = $tableFilterService
        const parsedResult = agentData.map(item => item && item.data && item.data.data ? item.data.data : false)
        
        const [
          summary,
          lastAgent,
          platforms,
          versions,
          nodes,
          groups
        ] = parsedResult
        
        this.scope.agentsCountActive = summary.Active - 1
        this.scope.lastAgent = lastAgent.items[0]
        this.scope.os = platforms.items
        this.scope.versions = versions.items
        this.scope.nodes = nodes && nodes.items ? nodes.items : false
        this.scope.groups = groups.items
        this.scope.agentsCountDisconnected = summary.Disconnected
        this.scope.agentsCountNeverConnected = summary['Never connected']
        this.scope.agentsCountTotal = summary.Total - 1
        this.scope.agentsCoverity = this.scope.agentsCountTotal ? (this.scope.agentsCountActive / this.scope.agentsCountTotal) * 100 : 0
        this.topAgent = new SearchHandler('searchTopAgent',`index=wazuh ${this.filters} | top agent.name`,'activeAgentToken','$result.agent.name$','mostActiveAgent',this.submittedTokenModel,this.scope,true,'loadingSearch')
        if (!this.scope.$$phase) this.scope.$digest() 
      }
      
      /**
      * On controller loads
      */
      $onInit(){
        this.scope.search = term => this.search(term)
        this.scope.filter = filter => this.filter(filter)
        this.scope.showAgent = agent => this.showAgent(agent)
        this.scope.isClusterEnabled = (this.clusterInfo && this.clusterInfo.status === 'enabled')
        this.scope.loading = false
        this.scope.status = 'all'
        this.scope.osPlatform = 'all'
        this.scope.version = 'all'
        this.scope.node_name = 'all'
        this.scope.versionModel = 'all'
        this.scope.downloadCsv = () => this.downloadCsv()
        this.scope.$on('$destroy', () => {
          this.topAgent.destroy()
        })
      }
      
      /**
       * Exports the table in CSV format
       */
      async downloadCsv() {
        try {
          this.toast('Your download should begin automatically...')
          const currentApi = this.api.id
          const output = await this.csvReq.fetch(
            '/agents',
            currentApi,
            this.wzTableFilter.get()
          )
          const blob = new Blob([output], { type: 'text/csv' }) // eslint-disable-line
          saveAs(blob, 'agents.csv')
          return
        } catch (error) {
          console.error('error ',error)
          this.toast('Error downloading CSV')
        }
        return
      }

      /**
      * Searches by a term
      * @param {String} term 
      */
      search(term){
        this.scope.$broadcast('wazuhSearch', { term })
      }
      
      /**
      * Filters by a term
      * @param {String} filter 
      */
      filter(filter){
        this.scope.$broadcast('wazuhFilter', { filter })
      }
      
      /**
      * Selects an agent
      * @param {String} agent 
      */
      async showAgent(agent){
        try {
          const agentInfo = await this.apiReq(`/agents`, { name: agent })
          if (!agentInfo || !agentInfo.data || !agentInfo.data.data || agentInfo.data.error)
          throw Error('Error')
          if (agentInfo.data.data.id !== '000')
          this.state.go(`agent-overview`, { id: agentInfo.data.data.id })
        } catch (err) {
          this.toast('Error fetching agent data')
        }
      }
      
    }
    app.controller('agentsCtrl',Agents)
  })