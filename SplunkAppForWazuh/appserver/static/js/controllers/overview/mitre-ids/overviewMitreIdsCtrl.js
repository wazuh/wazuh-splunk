/*
 * Wazuh app - Mitre Ids controller
 * Copyright (C) 2015-2019 Wazuh, Inc.
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
  // '../../../services/visualizations/search/search-handler',
  './lib/mitre_techniques',
  "splunkjs/mvc/searchmanager",
  'FileSaver',
], function(app, /*SearchHandler,*/ mitre_techniques, SearchManager) {
  'use strict'

  class OverviewMitreIds {
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

    constructor(
      $urlTokenModel,
      $scope,
      $currentDataService,
      $state,
      $notificationService,
      $requestService,
      $csvRequestService,
      $tableFilterService,
      mitre_tactics,
      $mdDialog,
      $groupHandler,
      $dateDiffService
    ) {
      this.scope = $scope
      this.submittedTokenModel = $urlTokenModel.getSubmittedTokenModel()
      this.submittedTokenModel.set('activeAgentToken', '-')
      this.currentDataService = $currentDataService
      this.api = this.currentDataService.getApi()
      this.apiReq = $requestService.apiReq
      this.state = $state
      this.notification = $notificationService
      this.currentClusterInfo = this.currentDataService.getClusterInfo()
      this.filters = this.currentDataService.getSerializedFilters()
      this.csvReq = $csvRequestService
      this.wzTableFilter = $tableFilterService
      this.$mdDialog = $mdDialog
      this.groupHandler = $groupHandler
      this.setBrowserOffset = $dateDiffService.setBrowserOffset
      try {
        
        this.scope.tactics = mitre_tactics
        this.scope.techniques = Object.entries(mitre_techniques)

        if (this.clusterInfo && this.clusterInfo.status === 'enabled') {
          this.scope.searchBarModel.node_name = nodes || []
        }
      } catch (error) { } //eslint-disable-line

      const mysearch = new SearchManager({
        id: "search1",
        preview: true,
        cache: false,
        status_buckets: 300,
        search: `index=wazuh ${this.filters} rule.mitre.tactic{}=* | stats count by rule.mitre.tactic{}`
      });
      const myResults = mysearch.data("preview", {});
      myResults.on("data", () => {
        if (myResults.hasData())
          this.scope.countTactics = myResults.collection().raw.rows;
          console.log(this.scope.countTactics);
      });

      this.scope.$applyAsync()
    }

    /**
     * On controller loads
     */
    $onInit() {      
      this.scope.addingAgents = false
      this.scope.query = (query, search) => this.query(query, search)
      this.scope.showAgent = agent => this.showAgent(agent)
      this.scope.loadRegistryValueDetails = item => this.loadRegistryValueDetails(item)
      this.scope.isClusterEnabled = this.clusterInfo && this.clusterInfo.status === 'enabled'
      this.scope.status = 'all'
      this.scope.osPlatform = 'all'
      this.scope.version = 'all'
      this.scope.node_name = 'all'
      this.scope.versionModel = 'all'
      this.scope.downloadCsv = () => this.downloadCsv()
      this.scope.showMitreTechniqueModal = (technique) => this.showMitreTechniqueModal(technique)
      this.scope.$on('$destroy', () => {
        this.topAgent.destroy()
      })
      this.scope.reloadList = () => this.reloadList()

      this.scope.addNewAgent = () => this.addNewAgent()
      this.scope.closeAddAgent = () => this.closeAddAgent()

      this.scope.offsetTimestamp = (text, time) => {
        try {
          return text + this.setBrowserOffset(time)
        } catch (error) {
          return ''
        }
      }

    }

    /**
     * Exports the table in CSV format
     */
    showMitreTechniqueModal(technique) {
      console.log(technique)
    }

    loadRegistryValueDetails = async (item) => {
      console.log(item);
      var parentEl = angular.element(document.body);
      this.$mdDialog.show({
        parent: parentEl,
        template:
          `<md-dialog aria-label="List dialog">
          <h3 class="wz-headline-title boldText">Technique ${item[1].name}</h3>
          <md-divider class="wz-margin-top-10"></md-divider>
          <md-dialog-content>
            
           
          </md-dialog-content>
          <md-dialog-actions>
            <md-button ng-click="ctrl.closeDialog()" class="splButton-primary">
              Close
            </md-button>
          </md-dialog-actions>
        </md-dialog>;`,
        locals: {
          items: item
        },
        controller: DialogController,
        controllerAs: 'ctrl'
     })
     function DialogController($mdDialog) {
       this.closeDialog = function() {
         $mdDialog.hide()
       }
     }
    }

    async downloadCsv() {
      try {
        this.notification.showSimpleToast(
          'Your download should begin automatically...'
        )

        const filters = this.wzTableFilter.get()
        filters.push({
          name: "q",
          value: "id!=000"
        })
        const currentApi = this.api['_key']
        const output = await this.csvReq.fetch(
          '/agents',
          currentApi,
          filters
        )
        const blob = new Blob([output], { type: 'text/csv' }) // eslint-disable-line
        saveAs(blob, 'agents.csv') // eslint-disable-line
        return
      } catch (error) {
        this.notification.showErrorToast('Error downloading CSV')
      }
      return
    }

    /**
     * Launches the query
     * @param {String} query
     * @param {String} search
     */
    query(query, search) {
      this.scope.$broadcast('wazuhQuery', { query, search })
    }

    /**
     * Selects an agent
     * @param {String} agent
     */
    async showAgent(agent) {
      // try {
      //   if (agent) {
      //     const agentName = typeof agent === 'object' ? agent.name : agent
      //     const agentInfo = await this.apiReq(`/agents`, { name: agentName })
      //     if (
      //       !agentInfo ||
      //       !agentInfo.data ||
      //       !agentInfo.data.data ||
      //       agentInfo.data.error
      //     ) {
      //       throw Error('Error fetching agent data')
      //     }

      //   } else {
      //     throw Error('Cannot fetch agent name')
      //   }
      // } catch (err) {
      //   this.notification.showErrorToast(
      //     err.message || 'Error fetching agent data'
      //   )
      // }
    }

    /**
     * Switchs view to add a new agent
     */
    addNewAgent() {
      this.scope.addingAgents = true
      this.scope.$applyAsync()
    }

    /**
     * Switchs view to cancel the process to add a new agent
     */
    closeAddAgent() {
      this.scope.addingAgents = false
      this.scope.$applyAsync()
    }

    /**
     * Reload list of agents
     */
    reloadList() {
      this.scope.$broadcast('reloadSearchFilterBar', {})
    }


  }
  app.controller('overviewMitreIdsCtrl', OverviewMitreIds)
})