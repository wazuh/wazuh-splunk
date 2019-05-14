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
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/rawTableData/rawTableDataService',
  'FileSaver'
], function (
  app,
  DashboardMain,
  ColumnChart,
  PieChart,
  Table,
  AreaChart,
  RawTableDataService
) {
    'use strict'

    class AgentsFim extends DashboardMain {
      /**
       * Class constructor
       * @param {Object} $urlTokenModel
       * @param {Object} $state
       * @param {Object} $scope
       * @param {Object} $currentDataService
       * @param {Object} agent
       * @param {Object} $notificationService
       * @param {*} $reportingService
       */

      constructor(
        $urlTokenModel,
        $state,
        $scope,
        $currentDataService,
        agent,
        $tableFilterService,
        $csvRequestService,
        $notificationService,
        $reportingService,
        reportingEnabled
      ) {
        super(
          $scope,
          $reportingService,
          $state,
          $currentDataService,
          $urlTokenModel,
        )
        this.wzTableFilter = $tableFilterService
        this.agent = agent
        this.api = this.currentDataService.getApi()
        this.csvReq = $csvRequestService
        this.notification = $notificationService
        this.scope.reportingEnabled = reportingEnabled
        this.showFiles = false
        this.scope.showFiles = this.showFiles
        this.currentDataService.addFilter(
          `{"rule.groups{}":"syscheck", "implicit":true, "onlyShow":true}`
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
        if (
          this.agent &&
          this.agent.data &&
          this.agent.data.data &&
          this.agent.data.data.id
        )
          this.currentDataService.addFilter(
            `{"agent.id":"${this.agent.data.data.id}", "implicit":true}`
          )

        this.vizz = [
          /**
           * Visualizations
           */
          new AreaChart(
            'eventsOverTimeElement',
            `${
            this.filters
            } sourcetype="wazuh"  "rule.groups{}"="syscheck" | timechart span=12h count by rule.description`,
            'eventsOverTimeElement',
            this.scope
          ),
          new ColumnChart(
            'topGroupOwnersElement',
            `${
            this.filters
            } sourcetype="wazuh" uname_after syscheck.gname_after!=""| top limit=20 "syscheck.gname_after"`,
            'topGroupOwnersElement',
            this.scope
          ),
          new PieChart(
            'topUserOwnersElement',
            `${
            this.filters
            } sourcetype="wazuh" uname_after| top limit=20 "syscheck.uname_after"`,
            'topUserOwnersElement',
            this.scope
          ),
          new PieChart(
            'topActions',
            `${
            this.filters
            } sourcetype="wazuh" | stats count by "syscheck.event"`,
            'topActions',
            this.scope
          ),
          new PieChart(
            'topFileChangesElement',
            `${
            this.filters
            } sourcetype="wazuh" "Integrity checksum changed" location!="syscheck-registry" syscheck.path="*" | top syscheck.path`,
            'topFileChangesElement',
            this.scope
          ),
          new PieChart(
            'rootUserFileChangesElement',
            `${
            this.filters
            } sourcetype="wazuh" "Integrity checksum changed" location!="syscheck-registry" syscheck.path="*" | search root | top limit=10 syscheck.path`,
            'rootUserFileChangesElement',
            this.scope
          ),
          new PieChart(
            'wordWritableFilesElement',
            `${
            this.filters
            } sourcetype="wazuh" rule.groups{}="syscheck" "syscheck.perm_after"=* | top "syscheck.perm_after" showcount=false showperc=false | head 1`,
            'wordWritableFilesElement',
            this.scope
          ),
          new Table(
            'eventsSummaryElement',
            `${
            this.filters
            } sourcetype="wazuh" rule.groups{}="syscheck"  |stats count sparkline by agent.name, syscheck.path syscheck.event, rule.description | sort count DESC | rename agent.name as Agent, syscheck.path as File, syscheck.event as Event, rule.description as Description, count as Count`,
            'eventsSummaryElement',
            this.scope
          ),
          new RawTableDataService(
            'eventsSummaryTable',
            `${
            this.filters
            } sourcetype="wazuh" rule.groups{}="syscheck"  |stats count sparkline by agent.name, syscheck.path syscheck.event, rule.description | sort count DESC | rename agent.name as Agent, syscheck.path as File, syscheck.event as Event, rule.description as Description, count as Count`,
            'eventsSummaryTableToken',
            '$result$',
            this.scope,
            'Events Summary'
          ),
          new PieChart(
            'topNewFiles',
            `${
            this.filters
            } sourcetype=wazuh syscheck.event=added  | stats count by syscheck.path | top syscheck.path limit=5`,
            'topNewFiles',
            this.scope
          ),
          new PieChart(
            'topModifiedFiles',
            `${
            this.filters
            } sourcetype=wazuh syscheck.event=modified  | stats count by syscheck.path | top syscheck.path limit=5`,
            'topModifiedFiles',
            this.scope
          ),
          new PieChart(
            'topDeletedFiles',
            `${
            this.filters
            } sourcetype=wazuh syscheck.event=deleted  | stats count by syscheck.path | top syscheck.path limit=5`,
            'topDeletedFiles',
            this.scope
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
            'agents-fim',
            'File integrity monitoring',
            this.filters,
            [
              'topNewFiles',
              'topModifiedFiles',
              'topDeletedFiles',
              'eventsOverTimeElement',
              'topGroupOwnersElement',
              'topActions',
              'topUserOwnersElement',
              'topFileChangesElement',
              'rootUserFileChangesElement',
              'eventsSummaryElement'
            ],
            {}, //Metrics,
            this.tableResults,
            this.agentReportData
          )
      }

      /**
       * On controller loads
       */
      $onInit() {
        this.show()
        this.scope.show = () => this.show()
        this.scope.agent =
          this.agent && this.agent.data && this.agent.data.data
            ? this.agent.data.data
            : { error: true }
        this.scope.search = term => {
          this.scope.$broadcast('wazuhSearch', { term })
        }
        this.scope.formatAgentStatus = agentStatus =>
          this.formatAgentStatus(agentStatus)
        this.scope.getAgentStatusClass = agentStatus =>
          this.getAgentStatusClass(agentStatus)
        this.scope.downloadCsv = (path, name) => this.downloadCsv(path, name)
      }

      /**
       * Shows/Hides alerts section of the view
       */
      show() {
        this.showFiles = !this.showFiles
        this.scope.showFiles = this.showFiles
        if (!this.scope.$$phase) this.scope.$digest()
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
       * Exports the table in CSV format
       */
      async downloadCsv(path, name) {
        try {
          this.notification.showSimpleToast(
            'Your download should begin automatically...'
          )
          const currentApi = this.api['_key']
          const output = await this.csvReq.fetch(
            path,
            currentApi,
            this.wzTableFilter.get()
          )
          const blob = new Blob([output], { type: 'text/csv' }) // eslint-disable-line
          saveAs(blob, name) // eslint-disable-line
          return
        } catch (error) {
          this.notification.showErrorToast('Error downloading CSV')
        }
        return
      }
    }
    app.controller('agentsFimCtrl', AgentsFim)
  })
