/*
 * Wazuh app - Agents controller
 * Copyright (C) 2015-2022 Wazuh, Inc.
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
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/rawTableData/rawTableDataService',
], function (
  app,
  DashboardMain,
  PieChart,
  Table,
  AreaChart,
  RawTableDataService
) {
  'use strict'

  class AgentsVirusTotal extends DashboardMain {
    /**
     * Class Virus Total
     * @param {Object} $urlTokenModel
     * @param {Object} $state
     * @param {Object} $scope
     * @param {Object} $currentDataService
     * @param {Object} agent
     * @param {*} $reportingService
     * @param {*} reportingEnabled
     * @param {*} extensions
     */

    constructor(
      $urlTokenModel,
      $state,
      $scope,
      $currentDataService,
      agent,
      $reportingService,
      reportingEnabled,
      extensions,
      $notificationService
    ) {
      super(
        $scope,
        $reportingService,
        $state,
        $currentDataService,
        $urlTokenModel,
        $notificationService
      )
      this.scope.reportingEnabled = reportingEnabled
      this.scope.extensions = extensions
      //Add filer for VirusTotal
      this.currentDataService.addFilter(
        `{"rule.groups{}":"virustotal", "implicit":true}`
      )
      this.agent = agent
      this.scope.expandArray = [false, false, false, false, false]
      if (
        this.agent &&
        this.agent.data &&
        this.agent.data.data &&
        this.agent.data.data.affected_items[0].id
      )
        this.currentDataService.addFilter(
          `{"agent.id":"${this.agent.data.data.affected_items[0].id}", "implicit":true}`
        )

      this.filters = this.getFilters()

      this.vizz = [
        /**
         * Visualizations
         */

        new PieChart(
          'lastScannedFiles',
          `${this.filters} | top limit=5 data.virustotal.source.file`,
          'lastScannedFiles',
          this.scope
        ),
        new AreaChart(
          'maliciousEventsOverTimeElement',
          `${this.filters} data.virustotal.positives="*" | timechart span=12h count by data.virustotal.positives  `,
          'maliciousEventsOverTimeElement',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new Table(
          'lastFiles',
          `${this.filters} | stats count by data.virustotal.source.file,data.virustotal.permalink | sort count DESC | rename  data.virustotal.source.file as File,data.virustotal.permalink as Link, count as Count`,
          'lastFiles',
          this.scope
        ),
        new RawTableDataService(
          'lastFilesTable',
          `${this.filters} | stats count by data.virustotal.source.file,data.virustotal.permalink | sort count DESC | rename  data.virustotal.source.file as File,data.virustotal.permalink as Link, count as Count`,
          'lastFilesToken',
          '$result$',
          this.scope,
          'Last Files'
        ),
      ]

      // Set agent info
      try {
        this.agentReportData = {
          ID: this.agent.data.data.affected_items[0].id,
          Name: this.agent.data.data.affected_items[0].name,
          IP: this.agent.data.data.affected_items[0].ip,
          Version: this.agent.data.data.affected_items[0].version,
          Manager: this.agent.data.data.affected_items[0].manager,
          OS: this.agent.data.data.affected_items[0].os.name,
          dateAdd: this.agent.data.data.affected_items[0].dateAdd,
          lastKeepAlive: this.agent.data.data.affected_items[0].lastKeepAlive,
          group: this.agent.data.data.affected_items[0].group.toString(),
        }
      } catch (error) {
        this.agentReportData = false
      }

      /**
       * Generates report
       */
      this.scope.startVis2Png = () =>
        this.reportingService.startVis2Png(
          'agents-virustotal',
          'VirusTotal',
          this.filters,
          ['lastScannedFiles', 'maliciousEventsOverTimeElement', 'lastFiles'],
          this.reportMetrics,
          this.tableResults,
          this.agentReportData
        )
    }

    /**
     * On controller loads
     */
    $onInit() {
      this.scope.agent =
        this.agent && this.agent.data && this.agent.data.data
          ? this.agent.data.data.affected_items[0]
          : { error: true }
      // Capitalize Status
      if (this.scope.agent && this.scope.agent.status) {
        this.scope.agent.status =
          this.scope.agent.status.charAt(0).toUpperCase() +
          this.scope.agent.status.slice(1)
      }

      this.scope.getAgentStatusClass = (agentStatus) =>
        agentStatus === 'Active' ? 'teal' : 'red'
      this.scope.formatAgentStatus = (agentStatus) => {
        return ['Active', 'Disconnected'].includes(agentStatus)
          ? agentStatus
          : 'Never connected'
      }
    }

    /**
     * Set report metrics
     */
    setReportMetrics() {
      this.reportMetrics = {
        'Files added': this.scope.filesAdded,
        'Files modified': this.scope.filesModified,
        'Files deleted': this.scope.filesDeleted,
      }
    }
  }
  app.controller('agentsVirusTotalCtrl', AgentsVirusTotal)
})
