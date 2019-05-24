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
  '../../../dashboardMain',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/search/search-handler',
  '../../../services/rawTableData/rawTableDataService'
], function (
  app,
  DashboardMain,
  PieChart,
  AreaChart,
  Table,
  SearchHandler,
  RawTableDataService
) {
    'use strict'

    class AgentsAudit extends DashboardMain {
      /**
       * Class constructor
       * @param {Object} $urlTokenModel
       * @param {Object} $scope
       * @param {Object} $currentDataService
       * @param {Object} $state
       * @param {Object} agent
       * @param {*} $reportingService
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
        super(
          $scope,
          $reportingService,
          $state,
          $currentDataService,
          $urlTokenModel,
        )

        this.scope.reportingEnabled = reportingEnabled
        this.scope.extensions = extensions
        this.agent = agent
        this.currentDataService.addFilter(
          `{"rule.groups{}":"audit", "implicit":true}`
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
          false,
          false,
          false
        ]


        if (
          this.agent &&
          this.agent.data &&
          this.agent.data.data &&
          this.agent.data.data.id
        )
          this.currentDataService.addFilter(
            `{"agent.id":"${this.agent.data.data.id}", "implicit":true}`
          )

        this.filters = this.getFilters()

        this.vizz = [
          /**
           * Metrics
           */
          new SearchHandler(
            `filesAddedSearch`,
            `${this.filters} sourcetype=wazuh rule.id=80790 | stats count`,
            `filesAddedToken`,
            '$result.count$',
            'newFiles',
            this.submittedTokenModel,
            this.scope
          ),
          new SearchHandler(
            `readFilesSearch`,
            `${this.filters} sourcetype=wazuh rule.id=80784 | stats count`,
            `readFilesToken`,
            '$result.count$',
            'readFiles',
            this.submittedTokenModel,
            this.scope
          ),
          new SearchHandler(
            `modifiedFiles`,
            `${this.filters} sourcetype=wazuh rule.id=80781 | stats count`,
            `filesModifiedToken`,
            '$result.count$',
            'filesModifiedToken',
            this.submittedTokenModel,
            this.scope
          ),
          new SearchHandler(
            `deletedFiles`,
            `${this.filters} sourcetype=wazuh rule.id=80791 | stats count`,
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
            `${this.filters} sourcetype=wazuh | top rule.groups{}`,
            'groupsVizz',
            this.scope
          ),
          new PieChart(
            'commandsVizz',
            `${this.filters} sourcetype=wazuh | top limit=5 data.audit.command`,
            'commandsVizz',
            this.scope
          ),
          new PieChart(
            'filesVizz',
            `${
            this.filters
            } sourcetype=wazuh audit.file.name=* | top audit.file.name`,
            'filesVizz',
            this.scope
          ),
          new AreaChart(
            'alertsOverTimeVizz',
            `${
            this.filters
            } sourcetype=wazuh | timechart limit=10 count by rule.description`,
            'alertsOverTimeVizz',
            this.scope
          ),
          new Table(
            'alertsSummaryVizz',
            `${
            this.filters
            } sourcetype=wazuh | stats count sparkline by agent.name,rule.description, audit.exe, audit.type, audit.euid | sort count DESC | rename agent.name as "Agent name", rule.description as Description, audit.exe as Command, audit.type as Type, audit.euid as "Effective user id"`,
            'alertsSummaryVizz',
            this.scope
          ),
          new RawTableDataService(
            'alertsSummaryTable',
            `${
            this.filters
            } sourcetype=wazuh | stats count sparkline by agent.name,rule.description, audit.exe, audit.type, audit.euid | sort count DESC | rename agent.name as "Agent name", rule.description as Description, audit.exe as Command, audit.type as Type, audit.euid as "Effective user id"`,
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
            'agents-audit',
            'Audit',
            this.filters,
            [
              'groupsVizz',
              'commandsVizz',
              'filesVizz',
              'alertsOverTimeVizz',
              'alertsSummaryVizz'
            ],
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
            ? this.agent.data.data
            : { error: true }
        this.scope.formatAgentStatus = agentStatus =>
          this.formatAgentStatus(agentStatus)
        this.scope.getAgentStatusClass = agentStatus =>
          this.getAgentStatusClass(agentStatus)
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
          'New files': this.scope.newFiles,
          'Read files': this.scope.readFiles,
          'Modified files': this.scope.filesModifiedToken,
          'Removed files': this.scope.filesDeleted
        }
      }
    }
    app.controller('agentsAuditCtrl', AgentsAudit)
  })
