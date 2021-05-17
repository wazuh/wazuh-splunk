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
  './lib/mitre-techniques',
  './lib/discover-search-helper',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  'FileSaver',
], function (app, mitre_techniques, SearchHelper, Table, TimePicker) {
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
     * @param {*} $reportingService
     */

    constructor(
      $scope,
      $currentDataService,
      $state,
      $notificationService,
      $requestService,
      mitre_tactics,
      $mdDialog,
      $dateDiffService,
      $urlTokenModel
    ) {
      this.scope = $scope
      this.currentDataService = $currentDataService
      this.currentDataService.addFilter(
        `{"rule.mitre.id{}":"*", "implicit":true, "onlyShow":true}`
      )
      this.modalOpen = false
      this.api = this.currentDataService.getApi()
      this.apiReq = $requestService.apiReq
      this.state = $state
      this.notification = $notificationService
      this.currentClusterInfo = this.currentDataService.getClusterInfo()
      this.filters = this.currentDataService.getSerializedFilters()
      this.mitre_tactics = mitre_tactics
      this.mitre_techniques = mitre_techniques
      this.$mdDialog = $mdDialog
      this.urlTokenModel = $urlTokenModel
      this.setBrowserOffset = $dateDiffService.setBrowserOffset
      this.reloadFilters = this.reloadFilters.bind(this)
      this.vizz = []

      try {
        this.scope.loadingModalData = false
        // Initialize time tokens to default
        if (
          !this.urlTokenModel.has('earliest') &&
          !this.urlTokenModel.has('latest')
        ) {
          this.urlTokenModel.set({ earliest: '0', latest: '' })
        }
        this.timePicker = new TimePicker(
          '#timePicker',
          this.reloadFilters
        )
        // this.scope.tactics = { ...mitre_tactics }
        // this.scope.sortedTactics = Object.entries(this.scope.tactics)
        // this.scope.techniques = { ...mitre_techniques }
        // this.scope.sortedTechniques = Object.entries(this.scope.techniques)
        // this.filters = this.getFilters();

        if (this.clusterInfo && this.clusterInfo.status === 'enabled') {
          this.scope.searchBarModel.node_name = nodes || []
        }
      } catch (error) { } //eslint-disable-line



      // this.tacticsSearch = new SearchHelper({
      //   id: 'tacticsCount',
      //   search: `index=wazuh ${this.filters} rule.mitre.id{}=* | stats count by rule.mitre.tactic{} | sort - count`,
      //   onData: this.onDataTactics,
      //   scope: this.scope
      // })

      // this.techniquesSearch = new SearchHelper({
      //   id: 'techniquesCount',
      //   search: `index=wazuh ${this.filters} rule.mitre.id{}=* | stats count by rule.mitre.id{} | sort - count`,
      //   onData: this.onDataTechniques,
      //   scope: this.scope
      // })
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

    onDataTechniques(rows) {
      rows.forEach(row => {
        this.scope.techniques[row[0]].count = parseInt(row[1]);
      });
      this.scope.sortedTechniques = Object.entries(this.scope.techniques).sort((a, b) => {
        return (b[1].count || 0) - (a[1].count || 0);
      });
      this.scope.$applyAsync();
    }

    loadModalEventsTable() {
      this.vizz.push(
        new Table(
          'mitre-technique-details-vizz',
          `index=wazuh ${this.filters} sourcetype=wazuh |stats count sparkline by rule.id, rule.description, rule.level | sort count DESC  | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,
          'mitre-technique-details-vizz',
          this.scope
        )
      )
      this.scope.loadingModalData = false
    }
    /**
     * Loas Main Tactics and Techniques
     */
    loadTacticsTechniques(earliest_time, latest_time) {
      this.scope.loadingVizz = true
      this.scope.tactics = { ...this.mitre_tactics }
      this.scope.sortedTactics = Object.entries(this.scope.tactics)
      this.scope.techniques = { ...this.mitre_techniques }
      this.scope.sortedTechniques = Object.entries(this.scope.techniques)
      this.tacticsSearch = new SearchHelper({
        id: 'tacticsCount',
        search: `index=wazuh ${this.filters} rule.mitre.id{}=* | stats count by rule.mitre.tactic{} | sort - count`,
        onData: this.onDataTactics,
        scope: this.scope,
        earliest_time, 
        latest_time
      })

      this.techniquesSearch = new SearchHelper({
        id: 'techniquesCount',
        search: `index=wazuh ${this.filters} rule.mitre.id{}=* | stats count by rule.mitre.id{} | sort - count`,
        onData: this.onDataTechniques,
        scope: this.scope,
        earliest_time, 
        latest_time
      })
    }
    reloadFilters(input, newValue) {
      console.log(input)
      const {earliest_time, latest_time} = newValue;
      this.filters = this.currentDataService.getSerializedFilters()
      this.destroy()
      this.loadTacticsTechniques(earliest_time, latest_time)
      if (this.modalOpen) {
        this.loadModalEventsTable()
      }
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
      this.scope.$on('$destroy', () => {
        this.destroy()
        this.timePicker.destroy()
      })
      this.scope.reloadList = () => this.reloadList()
      this.loadTacticsTechniques()

      // Listeners
      this.scope.$on('deletedFilter', event => {
        event.stopPropagation()
        this.filters = this.currentDataService.getSerializedFilters()
        this.destroy()
        this.loadTacticsTechniques()
        if (this.modalOpen) {
          this.loadModalEventsTable()
        }
      })

      this.scope.$on('barFilter', event => {
        event.stopPropagation()
        this.reloadFilters()
      })
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
      this.vizz.forEach(vizz => {
        angular.element(vizz.element.el).empty()
        vizz.destroy()
      })
      this.vizz = []
    }

    loadRegistryValueDetails = async (item) => {
      //display loading spinner while information is loading
      this.scope.loadingModalData = true;

      this.scope.selectedItem = item;

      try {
        const newRequestMitre = await this.apiReq(`/mitre`, { q: `id=${this.scope.selectedItem[0]}` })
        const mitreData = newRequestMitre.data.data.affected_items[0];
        var parentEl = angular.element(document.body);
        const ParentCtrl = this;
        //hide spinner when the informations has been loaded
        this.scope.loadingModalData = false;

        this.$mdDialog.show({

          parent: parentEl,
          scope: this.scope,
          preserveScope: true,
          template:
            `<md-dialog aria-label="List dialog" style="max-width: 75%;">
          <h3 class="wz-headline-title boldText">Technique ${this.scope.selectedItem[1].name}</h3>
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
              <h6 class="wz-headline-title">Events</h6>
              <md-divider class="wz-margin-top-10"></md-divider>
              <wazuh-bar></wazuh-bar>
              <md-divider class="wz-margin-top-10"></md-divider>
              <div id='mitre-technique-details-vizz'></div>
          </md-dialog-content>
          <md-dialog-actions>
            <md-button ng-click="ctrl.closeDialog()" class="splButton-primary">
              Close
            </md-button>
          </md-dialog-actions>
        </md-dialog>;`,
          locals: {
            items: this.scope.selectedItem
          },
          onComplete: () => {
            this.modalOpen = true
            this.loadModalEventsTable()
          },
          controller: DialogController,
          controllerAs: 'ctrl'
        })
        function DialogController($mdDialog, $scope) {

          this.$scope = $scope
          this.closeDialog = () => {
            ParentCtrl.modalOpen = false
            ParentCtrl.vizz.map(vizz => vizz.destroy())
            ParentCtrl.vizz = []
            $mdDialog.hide()
          }
        }

        this.scope.$applyAsync();

      } catch (err) {
        console.error(err);
      }
    }
  }
  app.controller('overviewMitreIdsCtrl', OverviewMitreIds)
})