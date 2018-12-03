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
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/chart/bar-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/search/search-handler'
], function(
  app,
  ColumnChart,
  PieChart,
  AreaChart,
  BarChart,
  Table,
  TimePicker,
  SearchHandler
) {
  'use strict'

  class AgentsAudit {
    /**
     * Class constructor
     * @param {Object} $urlTokenModel
     * @param {Object} $scope
     * @param {Object} $currentDataService
     * @param {Object} $state
     * @param {Object} agent
     */

    constructor($urlTokenModel, $scope, $currentDataService, $state, agent) {
      this.state = $state
      this.currentDataService = $currentDataService
      this.scope = $scope
      this.urlTokenModel = $urlTokenModel
      this.timePicker = new TimePicker(
        '#timePicker',
        this.urlTokenModel.handleValueChange
      )
      this.submittedTokenModel = this.urlTokenModel.getSubmittedTokenModel()
      this.agent = agent
      this.filters = this.currentDataService.getSerializedFilters()
      this.currentDataService.addFilter(`{"rule.groups":"audit", "implicit":true}`)
      if (this.agent && this.agent.data && this.agent.data.data && this.agent.data.data.id) this.currentDataService.addFilter(`{"agent.id":"${this.agent.data.data.id}", "implicit":true}`) 
      this.scope.$on('deletedFilter', () => {
        this.launchSearches()
      })

      this.scope.$on('barFilter', () => {
        this.launchSearches()
      })

      this.vizz = [
        /**
         * Metrics
         */
        new SearchHandler(
          `filesAddedSearch`,
          `${
            this.filters
          } sourcetype=wazuh rule.id=80790 | stats count`,
          `filesAddedToken`,
          '$result.count$',
          'newFiles',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `readFilesSearch`,
          `${
            this.filters
          } sourcetype=wazuh rule.id=80784 | stats count`,
          `readFilesToken`,
          '$result.count$',
          'readFiles',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `modifiedFiles`,
          `${
            this.filters
          } sourcetype=wazuh rule.id=80781 | stats count`,
          `filesModifiedToken`,
          '$result.count$',
          'filesModifiedToken',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `deletedFiles`,
          `${
            this.filters
          } sourcetype=wazuh rule.id=80791 | stats count`,
          'filesDeletedToken',
          '$result.count$',
          'filesDeleted',
          this.submittedTokenModel,
          this.scope
        ),
        /**
         * Visualizations
         */
        new PieChart(
          'groupsVizz',
          `${
            this.filters
          } sourcetype=wazuh | top rule.groups`,
          'groupsVizz'
        ),
        new ColumnChart(
          'agentsVizz',
          `${
            this.filters
          } sourcetype=wazuh agent.name=* | top agent.name`,
          'agentsVizz'
        ),
        new PieChart(
          'directoriesVizz',
          `${
            this.filters
          } sourcetype=wazuh audit.directory.name=* | top audit.directory.name`,
          'directoriesVizz'
        ),
        new PieChart(
          'filesVizz',
          `${
            this.filters
          } sourcetype=wazuh audit.file.name=* | top audit.file.name`,
          'filesVizz'
        ),
        new AreaChart(
          'alertsOverTimeVizz',
          `${
            this.filters
          } sourcetype=wazuh | timechart limit=10 count by rule.description`,
          'alertsOverTimeVizz'
        ),
        new PieChart(
          'fileReadAccessVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.id=80784 | top audit.file.name`,
          'fileReadAccessVizz'
        ),
        new PieChart(
          'fileWriteAccessVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.id=80781 | top audit.file.name`,
          'fileWriteAccessVizz'
        ),
        new BarChart(
          'comandsVizz',
          `${
            this.filters
          } sourcetype=wazuh | top audit.command`,
          'comandsVizz'
        ),
        new BarChart(
          'createdVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.id=80790 | top audit.file.name`,
          'createdVizz'
        ),
        new PieChart(
          'removedFilesVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.id=80791 | top audit.file.name`,
          'removedFilesVizz'
        ),
        new Table(
          'alertsSummaryVizz',
          `${
            this.filters
          } sourcetype=wazuh | stats count sparkline by agent.name,rule.description, audit.exe, audit.type, audit.euid | sort count DESC | rename agent.name as \"Agent name\", rule.description as Description, audit.exe as Command, audit.type as Type, audit.euid as \"Effective user id\"`,
          'alertsSummaryVizz'
        )
      ]

      /**
       * When controller is destroyed
       */
      this.scope.$on('$destroy', () => {
        this.timePicker.destroy()
        this.vizz.map(vizz => vizz.destroy())
      })
    }

    $onInit(){
      this.scope.agent = (this.agent && this.agent.data && this.agent.data.data) ? this.agent.data.data : {error:true}
      this.scope.formatAgentStatus = agentStatus => this.formatAgentStatus(agentStatus)
      this.scope.getAgentStatusClass = agentStatus => this.getAgentStatusClass(agentStatus)
    }

    formatAgentStatus(agentStatus) {
      return ['Active', 'Disconnected'].includes(agentStatus)
        ? agentStatus
        : 'Never connected'
    }

    getAgentStatusClass(agentStatus) {
      agentStatus === 'Active' ? 'teal' : 'red'
    }
    
    launchSearches() {
      this.filters = this.currentDataService.getSerializedFilters()
      this.state.reload()
    }
  }
  app.controller('agentsAuditCtrl', AgentsAudit)
})
