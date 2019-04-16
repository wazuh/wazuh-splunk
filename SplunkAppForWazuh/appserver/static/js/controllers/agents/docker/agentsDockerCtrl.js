/*
 * Wazuh app - Agents controller
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
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/rawTableData/rawTableDataService'
], function (app, PieChart, LinearChart, Table, TimePicker, RawTableDataService) {
  'use strict'

  class DockerAgents {
    /**
     * Class Agents Docker
     * @param {Object} $urlTokenModel
     * @param {Object} $state
     * @param {Object} $scope
     * @param {Object} $currentDataService
     * @param {Object} $notificationService
     * @param {Object} agent
     * @param {*} $reportingService
     */

    constructor(
      $urlTokenModel,
      $scope,
      agent,
      $notificationService,
      $currentDataService,
      $state,
      $reportingService,
      reportingEnabled,
      extensions
    ) {
      this.state = $state
      this.currentDataService = $currentDataService
      this.scope = $scope
      this.scope.reportingEnabled = reportingEnabled
      this.scope.extensions = extensions
      this.urlTokenModel = $urlTokenModel
      this.notification = $notificationService
      this.tableResults = {}
      this.reportingService = $reportingService
      this.currentDataService.addFilter(
        `{"rule.groups{}":"docker", "implicit":true}`
      )
      this.scope.expandArray = [false, false, false, false, false]
      this.scope.expand = (i, id) => this.expand(i, id)
      this.agent = agent
      if (
        this.agent &&
        this.agent.data &&
        this.agent.data.data &&
        this.agent.data.data.id
      )
        this.currentDataService.addFilter(
          `{"agent.id":"${this.agent.data.data.id}", "implicit":true}`
        )
      this.filters = this.currentDataService.getSerializedFilters()
      this.timePicker = new TimePicker(
        '#timePicker',
        this.urlTokenModel.handleValueChange
      )

      this.scope.$on('deletedFilter', (event) => {
        event.stopPropagation()
        this.launchSearches()
      })

      this.scope.$on('barFilter', (event) => {
        event.stopPropagation()
        this.launchSearches()
      })

      this.vizz = [
        //`${this.filters} sourcetype=wazuh | timechart span=1h count`,
        /**
         * Visualizations
         */
        new PieChart(
          'top5images',
          `${this.filters} sourcetype=wazuh | stats count by data.docker.id`,
          'top5images',
          this.scope
        ),
        new LinearChart(
          'eventsOcurred',
          `${
          this.filters
          } sourcetype=wazuh | timechart span=1h count by data.docker.Action`,
          'eventsOcurred',
          this.scope
        ),
        new PieChart(
          'top5actions',
          `${this.filters} sourcetype=wazuh  | top data.docker.Action limit=5`,
          'top5actions',
          this.scope
        ),
        new Table(
          'alertsSummary',
          `${
          this.filters
          } sourcetype=wazuh  | stats count sparkline by data.docker.Actor.Attributes.image, data.docker.Actor.Attributes.name, data.docker.Action, timestamp | sort count DESC | rename data.docker.Actor.Attributes.image as Image, data.docker.Actor.Attributes.name as Name, data.docker.Action as Action, timestamp as Date, count as Count, sparkline as Sparkline`,
          'alertsSummary',
          this.scope
        ),
        new LinearChart(
          'resourceUsage',
          `${
          this.filters
          } sourcetype=wazuh  | timechart span=1h count by data.docker.Type`,
          'resourceUsage',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryRawTable',
          `${
          this.filters
          } sourcetype=wazuh  | stats count sparkline by data.docker.Actor.Attributes.image, data.docker.Actor.Attributes.name, data.docker.Action, timestamp | sort count DESC | rename data.docker.Actor.Attributes.image as Image, data.docker.Actor.Attributes.name as Name, data.docker.Action as Action, timestamp as Date, count as Count`,
          'alertsSummaryRawTableToken',
          '$result$',
          this.scope,
          'Alerts summary'
        )
      ]

      // Set agent info
      try {
        this.agentReportData = {
          ID: this.agent.data.data.id,
          Name: this.agent.data.data.name,
          IP: this.agent.data.data.ip,
          Version: this.agent.data.data.version,
          Manager: this.agent.data.data.manager,
          OS: this.agent.data.data.os.name,
          dateAdd: this.agent.data.data.dateAdd,
          lastKeepAlive: this.agent.data.data.lastKeepAlive,
          group: this.agent.data.data.group.toString()
        }
      } catch (error) {
        this.agentReportData = false
      }


      // Set agent info
      try {
        this.agentReportData = {
          ID: this.agent.data.data.id,
          Name: this.agent.data.data.name,
          IP: this.agent.data.data.ip,
          Version: this.agent.data.data.version,
          Manager: this.agent.data.data.manager,
          OS: this.agent.data.data.os.name,
          dateAdd: this.agent.data.data.dateAdd,
          lastKeepAlive: this.agent.data.data.lastKeepAlive,
          group: this.agent.data.data.group.toString()
        }
      } catch (error) {
        this.agentReportData = false
      }

      /**
       * Generates report
       */
      this.scope.startVis2Png = () =>
        this.reportingService.startVis2Png(
          'ag-docker',
          'Docker',
          this.filters,
          [
            'top5images',
            'eventsOcurred',
            'top5actions',
            'resourceUsage',
          ],
          {}, //Metrics
          this.tableResults,
          this.agentReportData
        )

      this.scope.$on('loadingReporting', (event, data) => {
        this.scope.loadingReporting = data.status
      })

      this.scope.$on('checkReportingStatus', () => {
        this.vizzReady = !this.vizz.filter(v => {
          return v.finish === false
        }).length
        if (this.vizzReady) {
          this.scope.loadingVizz = false
        } else {
          this.vizz.map(v => {
            if (v.constructor.name === 'RawTableData') {
              this.tableResults[v.name] = v.results
            }
          })
          this.scope.loadingVizz = true
        }
        if (!this.scope.$$phase) this.scope.$digest()
      })

      /*
       * When controller is destroyed
       */
      this.scope.$on('$destroy', () => {
        this.timePicker.destroy()
        this.vizz.map(vizz => vizz.destroy())
      })
    }

    /**
     * On controller loads
     */
    $onInit() {
      this.scope.agent =
        this.agent && this.agent.data && this.agent.data.data
          ? this.agent.data.data
          : { error: true }

      this.scope.getAgentStatusClass = agentStatus =>
        agentStatus === 'Active' ? 'teal' : 'red'
      this.scope.formatAgentStatus = agentStatus => {
        return ['Active', 'Disconnected'].includes(agentStatus)
          ? agentStatus
          : 'Never connected'
      }
    }

    /**
     * Get filters and launches the search
     */
    launchSearches() {
      this.filters = this.currentDataService.getSerializedFilters()
      this.state.reload()
    }

    expand(i, id) {
      this.scope.expandArray[i] = !this.scope.expandArray[i]
      let vis = $(
        '#' + id + ' .panel-body .splunk-view .shared-reportvisualizer'
      )
      this.scope.expandArray[i]
        ? vis.css('height', 'calc(100vh - 200px)')
        : vis.css('height', '250px')

      let vis_header = $('.wz-headline-title')
      vis_header.dblclick(e => {
        if (this.scope.expandArray[i]) {
          this.scope.expandArray[i] = !this.scope.expandArray[i]
          this.scope.expandArray[i]
            ? vis.css('height', 'calc(100vh - 200px)')
            : vis.css('height', '250px')
          this.scope.$applyAsync()
        } else {
          e.preventDefault()
        }
      })
    }
  }

  app.controller('agentsDockerCtrl', DockerAgents)
})
