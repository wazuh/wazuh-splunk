/*
 * Wazuh app - Mitre Ids controller
--
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
  '../../../dashboardMain',
  './lib/mitre-techniques',
  './lib/discover-search-helper',
  'FileSaver',
], function (app, DashboardMain, mitre_techniques, SearchHelper) {
  'use strict'

  class OverviewMitreIds extends DashboardMain {
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
      $reportingService,
      $requestService,
      $csvRequestService,
      $tableFilterService,
      mitre_tactics,
      $mdDialog,
      $groupHandler,
      $dateDiffService
    ) {
      super(
        $scope,
        $reportingService,
        $state,
        $currentDataService,
        $urlTokenModel
      )
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

        this.scope.tactics = { ...mitre_tactics }
        this.scope.sortedTactics = Object.entries(this.scope.tactics)
        this.scope.techniques = { ...mitre_techniques }
        this.scope.sortedTechniques = Object.entries(this.scope.techniques)
        this.filters = this.getFilters();

        if (this.clusterInfo && this.clusterInfo.status === 'enabled') {
          this.scope.searchBarModel.node_name = nodes || []
        }
      } catch (error) { } //eslint-disable-line

      this.tacticsSearch = new SearchHelper({
        id: 'tacticsCount',
        search: `index=wazuh ${this.filters} rule.mitre.id{}=* | stats count by rule.mitre.tactic{} | sort - count`,
        onData: this.onDataTactics,
        scope: this.scope
      })

      this.techniquesSearch = new SearchHelper({
        id: 'techniquesCount',
        search: `index=wazuh ${this.filters} rule.mitre.id{}=* | stats count by rule.mitre.id{} | sort - count`,
        onData: this.onDataTechniques,
        scope: this.scope
      })
      this.scope.$applyAsync()
    }
    onDataTactics(rows) {
      rows.forEach(row => {
        this.scope.tactics[row[0]] = parseInt(row[1]);
      });
      this.scope.sortedTactics = Object.entries(this.scope.tactics).sort((a, b) => {
        return (b[1] || 0) - (a[1] || 0);
      });
      this.scope.$applyAsync();
    }
    
    onDataModalEvents(rows) {
      this.scope.onDataModalEvents = rows;
      this.scope.$applyAsync();
    }

    onDataTechniques(rows) {
      rows.forEach(row => {
        this.scope.techniques[row[0]].count = parseInt(row[1]);
      });
      this.scope.sortedTechniques = Object.entries(this.scope.techniques).sort((a, b) => {
        return (b[1].count || 0) - (a[1].count || 0);
      });
      this.scope.$applyAsync();
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
      this.scope.$on('$destroy', () => {this.destroy()})
      this.scope.reloadList = () => this.reloadList()
      this.scope.offsetTimestamp = (text, time) => {
        try {
          return text + this.setBrowserOffset(time)
        } catch (error) {
          return ''
        }
      }        
    }

    destroy() {
      this.tacticsSearch.destroy()
      this.techniquesSearch.destroy()
      this.modalSearch.destroy()
    }

    loadRegistryValueDetails = async (item) => {
      try {

        const modalSearch = new SearchHelper({
          id: 'tacticsCountTable',
          search: `index=wazuh ${this.filters} "rule.mitre.id{}"="${item[0]}" | fields + rule.description, rule.mitre.id{}, rule.mitre.tactic{}, rule.mitre.technique{}`,
          onData: this.onDataModalEvents,
          scope: this.scope
        })

        const newRequestMitre = await this.apiReq(`/mitre`, { q: `id=${item[0]}` })
        const mitreData = newRequestMitre.data.data.affected_items[0];

        var parentEl = angular.element(document.body);
        this.$mdDialog.show({
          parent: parentEl,
          template:
            `<md-dialog aria-label="List dialog" style="max-width: 75%;">
            <h3 class="wz-headline-title boldText">Technique ${item[1].name}</h3>
            <md-divider class="wz-margin-top-10"></md-divider>
            <md-dialog-content class="_md flex wazuh-column wz-margin-top-10">
              <div class="modalFlexData">            
                <p><b>Id: </b>${mitreData.id}</p>  
                <p><b>Tactic: </b>${mitreData.phase_name}</p>
              </div>
              <div class="modalFlexData">
                <p><b>Platform: </b>${mitreData.platform_name}</p>  
                <p><b>Version: </b>${mitreData.json.x_mitre_version}</p>
              </div>
              
              <p><b>Data sources: </b>${mitreData.json.x_mitre_data_sources}</p>

              <p><b>Description: </b>${mitreData.json.description}</p>

              <table>
                <tr>
                  <th>Time</th>
                  <th>Agent</th>
                  <th>Agent name</th>
                  <th>Technique(s)</th>
                  <th>Tactic(s)</th>
                  <th>Level</th>
                  <th>Rule ID</th>
                  <th>Description</th>
                </tr>
                <tr>
                  <td>May 10, 2021 @ 17:03:12.919</td>
                  <td>005</td>
                  <td>RHEL7</td>
                  <td>T1110</td>
                  <td>Credential Access</td>
                  <td>10</td>
                  <td>5720</td>
                  <td>	
                  syslog: User missed the password more than one time</td>          
                </tr>                             
              </table>

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
          this.closeDialog = () => {
            modalSearch.destroy()
            $mdDialog.hide()
          }
        }
      } catch (err) {
        console.error(err);
      }
    }

    async downloadCsv() {
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
     * Reload list of agents
     */
    reloadList() {
      this.scope.$broadcast('reloadSearchFilterBar', {})
    }


  }
  app.controller('overviewMitreIdsCtrl', OverviewMitreIds)
})