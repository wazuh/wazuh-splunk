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
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/chart/bar-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/inputs/dropdown-input',
  '../../../services/visualizations/search/search-handler',
  '../../../services/rawTableData/rawTableDataService'
], function(
  app,
  PieChart,
  AreaChart,
  BarChart,
  Table,
  TimePicker,
  Dropdown,
  SearchHandler,
  RawTableDataService
) {
  'use strict'

  class AgentsOpenScap {
    /**
     * Class Agents-OpenSCAP
     * @param {Object} $urlTokenModel
     * @param {Object} $scope
     * @param {Object} $currentDataService
     * @param {Object} $state
     * @param {*} $reportingService
     * @param {Object} agent
     */

    constructor(
      $urlTokenModel,
      $scope,
      $currentDataService,
      $state,
      agent,
      $reportingService,
      reportingEnabled,
      extensions
    ) {
      this.urlTokenModel = $urlTokenModel
      this.scope = $scope
      this.scope.reportingEnabled = reportingEnabled
      this.currentDataService = $currentDataService
      this.reportingService = $reportingService
      this.scope.extensions = extensions
      this.tableResults = {}
      this.state = $state
      this.agent = agent
      this.currentDataService.addFilter(
        `{"rule.groups{}":"oscap", "implicit":true}`
      )

      this.scope.expandArray = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]
      this.scope.expand = (i, id) => this.expand(i, id)
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
      this.dropdown = new Dropdown(
        'dropDownInput',
        `${
          this.filters
        } sourcetype=wazuh rule.groups{}!="syslog" data.oscap.scan.profile.title=* | stats count by data.oscap.scan.profile.title | sort data.oscap.scan.profile.title ASC|fields - count`,
        'data.oscap.scan.profile.title',
        '$form.profile$',
        'dropDownInput',
        this.scope
      )
      this.dropdownInstance = this.dropdown.getElement()
      this.submittedTokenModel = this.urlTokenModel.getSubmittedTokenModel()
      this.dropdownInstance.on('change', newValue => {
        if (newValue && this.dropdownInstance) {
          this.urlTokenModel.handleValueChange(this.dropdownInstance)
        }
      })

      this.vizz = [
        /**
         * Metrics
         */
        new SearchHandler(
          `lastScapScore`,
          `${
            this.filters
          } sourcetype=wazuh data.oscap.scan.score=* | stats latest(data.oscap.scan.score)`,
          `latestScapScore`,
          '$result.latest(data.oscap.scan.score)$',
          'scapLastScore',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `maxScapScore`,
          `${
            this.filters
          } sourcetype=wazuh data.oscap.scan.score=* | stats max(data.oscap.scan.score)`,
          `maxScapScore`,
          '$result.max(data.oscap.scan.score)$',
          'scapHighestScore',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `scapLowest`,
          `${
            this.filters
          } sourcetype=wazuh data.oscap.scan.score=* | stats min(data.oscap.scan.score)`,
          `minScapScore`,
          '$result.min(data.oscap.scan.score)$',
          'scapLowestScore',
          this.submittedTokenModel,
          this.scope
        ),

        /**
         * Visualizations
         */
        new PieChart(
          'top5Scans',
          `${
            this.filters
          } sourcetype=wazuh data.oscap.check.result="fail" rule.groups{}!="syslog" data.oscap.scan.profile.title="$profile$" | top limit=5 data.oscap.scan.id`,
          'top5Scans',
          this.scope
        ),
        new PieChart(
          'profilesVizz',
          `${
            this.filters
          } sourcetype=wazuh data.oscap.check.result="fail" rule.groups{}!="syslog" data.oscap.scan.profile.title="$profile$" | top limit=5 data.oscap.scan.profile.title`,
          'profilesVizz',
          this.scope
        ),
        new BarChart(
          'contentVizz',
          `${
            this.filters
          } sourcetype=wazuh data.oscap.check.result="fail" rule.groups{}!="syslog" data.oscap.scan.profile.title="$profile$" | top limit=5 data.oscap.scan.content`,
          'contentVizz',
          this.scope
        ),
        new PieChart(
          'severityVizz',
          `${
            this.filters
          } sourcetype=wazuh data.oscap.check.result="fail" rule.groups{}!="syslog" data.oscap.scan.profile.title="$profile$" | top limit=5 data.oscap.check.severity`,
          'severityVizz',
          this.scope
        ),
        new AreaChart(
          'top5AgentsSHVizz',
          `${
            this.filters
          } sourcetype=wazuh data.oscap.scan.profile.title="$profile$" data.oscap.check.severity="high" | chart count by agent.name`,
          'top5AgentsSHVizz',
          this.scope
        ),
        new PieChart(
          'top5AlertsVizz',
          `${
            this.filters
          } sourcetype=wazuh data.oscap.check.result="fail" rule.groups{}="oscap-result" data.oscap.scan.profile.title="$profile$" | top limit=5 data.oscap.check.title`,
          'top5AlertsVizz',
          this.scope
        ),
        new PieChart(
          'top5HRAlertsVizz',
          `${
            this.filters
          } sourcetype=wazuh data.oscap.check.result="fail" rule.groups{}="oscap-result"  data.oscap.check.severity="high" data.oscap.scan.profile.title="$profile$" | top limit=5 data.oscap.check.title`,
          'top5HRAlertsVizz',
          this.scope
        ),
        new Table(
          'alertsSummaryVizz',
          `${
            this.filters
          } sourcetype=wazuh data.oscap.check.result="fail" data.oscap.scan.profile.title="$profile$" | stats count by agent.name, data.oscap.check.title, data.oscap.scan.profile.title, data.oscap.scan.id, data.oscap.scan.content | sort count DESC | rename agent.name as "Agent name", data.oscap.check.title as Title, data.oscap.scan.profile.title as Profile, data.oscap.scan.id as "Scan ID", data.oscap.scan.content as Content`,
          'alertsSummaryVizz',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryTable',
          `${
            this.filters
          } sourcetype=wazuh data.oscap.check.result="fail" data.oscap.scan.profile.title="$profile$" | stats count by agent.name, data.oscap.check.title, data.oscap.scan.profile.title, data.oscap.scan.id, data.oscap.scan.content | sort count DESC | rename agent.name as "Agent name", data.oscap.check.title as Title, data.oscap.scan.profile.title as Profile, oscap.scan.id as "Scan ID", data.oscap.scan.content as Content`,
          'alertsSummaryTableToken',
          '$result$',
          this.scope,
          'Alerts Summary'
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

      /**
       * Generates report
       */
      this.scope.startVis2Png = () =>
        this.reportingService.startVis2Png(
          'agents-openscap',
          'Open SCAP',
          this.filters,
          [
            'top5Scans',
            'profilesVizz',
            'contentVizz',
            'severityVizz',
            'top5AgentsSHVizz',
            'top5AlertsVizz',
            'top5HRAlertsVizz',
            'alertsSummaryVizz'
          ],
          this.reportMetrics,
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
          this.setReportMetrics()
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

      /**
       * When controller is destroyed
       */
      this.scope.$on('$destroy', () => {
        this.timePicker.destroy()
        this.dropdown.destroy()
        this.vizz.map(vizz => vizz.destroy())
      })
    }

    /**
     * On controller loads
     */
    $onInit() {
      this.scope.loadingVizz = true
      this.scope.agent =
        this.agent && this.agent.data && this.agent.data.data
          ? this.agent.data.data
          : { error: true }
      this.scope.getAgentStatusClass = agentStatus =>
        this.getAgentStatusClass(agentStatus)
      this.scope.formatAgentStatus = agentStatus =>
        this.formatAgentStatus(agentStatus)
    }

    /**
     * Checks and returns agent status
     * @param {Array} agentStatus
     */
    formatAgentStatus(agentStatus) {
      return ['Active', 'Disconnected'].includes(agentStatus)
        ? agentStatus
        : 'Never connected'
    }

    /**
     * Returns a class depending of the agent state
     * @param {String} agentStatus
     */
    getAgentStatusClass(agentStatus) {
      return agentStatus === 'Active' ? 'teal' : 'red'
    }

    /**
     * Set report metrics
     */
    setReportMetrics() {
      this.reportMetrics = {
        'Last score': this.scope.scapLastScore,
        'Highest score': this.scope.scapHighestScore,
        'Lowest score': this.scope.scapLowestScore
      }
    }

    /**
     * Gets filters and launches search
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

  app.controller('agentsOpenScapCtrl', AgentsOpenScap)
})
