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
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/search/search-handler',
  '../../../services/rawTableData/rawTableDataService',
], function (
  app,
  DashboardMain,
  LinearChart,
  ColumnChart,
  PieChart,
  Table,
  SearchHandler,
  RawTableDataService
) {
  'use strict'

  class AgentsGeneral extends DashboardMain {
    /**
     * Class constructor
     * @param {Object} $urlTokenModel
     * @param {Object} $scope
     * @param {Object} $requestService
     * @param {Object} $notificationService
     * @param {Object} $stateParams
     * @param {Object} $currentDataService
     * @param {Object} agent
     * @param {Object} $state
     * @param {Object} $dateDiffService
     * @param {*} $reportingService
     * @param {*} reportingEnabled
     */

    constructor(
      $urlTokenModel,
      $scope,
      $requestService,
      $notificationService,
      $stateParams,
      $currentDataService,
      agent,
      $state,
      $dateDiffService,
      $reportingService,
      reportingEnabled
    ) {
      super(
        $scope,
        $reportingService,
        $state,
        $currentDataService,
        $urlTokenModel,
        $notificationService
      )
      
      const DEFAULT_METRIC_VALUES = '-'
      this.scope.totalAlerts = DEFAULT_METRIC_VALUES
      this.scope.levelTwelve = DEFAULT_METRIC_VALUES
      this.scope.authFailure = DEFAULT_METRIC_VALUES
      this.scope.authSuccess = DEFAULT_METRIC_VALUES

      this.scope.reportingEnabled = reportingEnabled
      this.requestService = $requestService
      this.notification = $notificationService
      this.stateParams = $stateParams
      this.agent = agent
      this.scope.expandArray = [false, false, false, false, false, false, false]
      this.agentData = this.getAgentInfo()

      if (
        this.agent &&
        this.agent.length &&
        this.agent[0].data &&
        this.agentData &&
        this.agentData.id
      )
        this.currentDataService.addFilter(
          `{"agent.id":"${this.agentData.id}", "implicit":true}`
        )
      this.dateDiffService = $dateDiffService

      this.filters = this.getFilters()

      this.vizz = [
        /**
         * Metrics
         */
        new SearchHandler(
          `totalAlerts`,
          `${this.filters} | stats count`,
          `totalAlertsToken`,
          '$result.count$',
          'totalAlerts',
          this.submittedTokenModel,
          this.scope,
          undefined,
          undefined,
          this.notification
        ),
        new SearchHandler(
          `searchLevel12`,
          `${this.filters} "rule.level">=12 | chart count`,
          `level12token`,
          '$result.count$',
          'levelTwelve',
          this.submittedTokenModel,
          this.scope,
          undefined,
          undefined,
          this.notification
        ),
        new SearchHandler(
          `searchAuthFailure`,
          `${this.filters} "rule.groups{}"="authentication_fail*" | stats count`,
          `authFailureToken`,
          '$result.count$',
          'authFailure',
          this.submittedTokenModel,
          this.scope,
          undefined,
          undefined,
          this.notification
        ),
        new SearchHandler(
          `searchAuthSuccess`,
          `${this.filters}  "rule.groups{}"="authentication_success" | stats count`,
          `authSuccessToken`,
          '$result.count$',
          'authSuccess',
          this.submittedTokenModel,
          this.scope,
          undefined,
          undefined,
          this.notification
        ),
        /**
         * Visualizations
         */
        new PieChart(
          'top5AlertsVizz',
          `${this.filters} | top "rule.description" limit=5`,
          'top5AlertsVizz',
          this.scope
        ),
        new PieChart(
          'top5GroupsVizz',
          `${this.filters} | top rule.groups{} limit=5`,
          'top5GroupsVizz',
          this.scope
        ),
        new PieChart(
          'top5PCIreqVizz',
          `${this.filters} | top rule.pci_dss{} limit=5`,
          'top5PCIreqVizz',
          this.scope
        ),
        new LinearChart(
          'alertGroupEvoVizz',
          `${this.filters} rule.level=*| timechart count by rule.groups{}  `,
          'alertGroupEvoVizz',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new ColumnChart(
          'alertsVizz',
          `${this.filters} | timechart span=2h count  `,
          'alertsVizz',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new Table(
          'agentsSummaryVizz',
          `${this.filters} |stats count sparkline by rule.id, rule.description, rule.level | sort count DESC  | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,
          'agentsSummaryVizz',
          this.scope
        ),
        new Table(
          'groupsSummaryVizz',
          `${this.filters} | stats count by rule.groups{} | sort count DESC  | rename rule.groups{} as "Group", count as Count`,
          'groupsSummaryVizz',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryTable',
          `${this.filters} |stats count sparkline by rule.id, rule.description, rule.level | sort count DESC  | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,
          'alertsSummaryTableToken',
          '$result$',
          this.scope,
          'Alerts Summary'
        ),
        new RawTableDataService(
          'groupsSummaryTable',
          `${this.filters} | stats count by rule.groups{} | sort count DESC  | rename rule.groups{} as "Group", count as Count`,
          'groupsSummaryTableToken',
          '$result$',
          this.scope,
          'Groups Summary'
        ),
      ]
    }

    /**
     * On controller loads
     */
    $onInit() {
      try {
        this.agentInfo = {
          name: this.agentData.name,
          id: this.agentData.id,
          status: this.agentData.status,
          ip: this.agentData.ip,
          version: this.agentData.version,
          group: this.agentData.group,
          lastKeepAlive: this.agentData.lastKeepAlive,
          dateAdd: this.agentData.dateAdd,
          agentOS: `${this.agentData.os.name} ${this.agentData.os.codename} ${this.agentData.os.version}`,
          syscheck: this.agent[1].data.data.affected_items[0],
          rootcheck: this.agent[2].data.data || {},
        }

        this.agentInfo.syscheck.duration = this.dateDiffService.getDateDiff(
          this.agentInfo.syscheck.start,
          this.agentInfo.syscheck.end
        ).duration
        this.agentInfo.rootcheck.duration = this.dateDiffService.getDateDiff(
          this.agentInfo.rootcheck.start || null,
          this.agentInfo.rootcheck.end || null
        ).duration
        this.agentInfo.syscheck.inProgress = this.dateDiffService.getDateDiff(
          this.agentInfo.syscheck.start,
          this.agentInfo.syscheck.end
        ).inProgress
        this.agentInfo.rootcheck.inProgress = this.dateDiffService.getDateDiff(
          this.agentInfo.rootcheck.start || null,
          this.agentInfo.rootcheck.end || null
        ).inProgress

        this.scope.agentInfo = this.agentInfo
        this.scope.id = this.stateParams.id

        /**
         * Generates report
         */

        // Set agent info
        try {
          this.agentReportData = {
            ID: this.agentInfo.id,
            Name: this.agentInfo.name,
            IP: this.agentInfo.ip,
            Version: this.agentInfo.version,
            Manager: this.agentData.manager,
            OS: this.agentInfo.agentOS,
            dateAdd: this.agentInfo.dateAdd,
            lastKeepAlive: this.agentInfo.lastKeepAlive,
            group: this.agentInfo.group.toString(),
          }
        } catch (error) {
          this.agentReportData = false
        }
        this.agentMetricsGroup = []
        this.agentInfo.group.map((g) => this.agentMetricsGroup.push(g))
        this.reportMetrics = {
          'Last syscheck scan': this.agentInfo.syscheck.end
            ? this.agentInfo.syscheck.end
            : 'Unknown',
          'Last rootcheck scan': this.agentInfo.rootcheck.end
            ? this.agentInfo.rootcheck.end
            : 'Unknown',
        }

        this.scope.startVis2Png = () =>
          this.reportingService.startVis2Png(
            'agents-general',
            'Security events',
            this.filters,
            [
              'top5AlertsVizz',
              'top5GroupsVizz',
              'top5PCIreqVizz',
              'alertGroupEvoVizz',
              'alertsVizz',
              'agentsSummaryVizz',
              'groupsSummaryVizz',
            ],
            this.reportMetrics,
            this.tableResults,
            this.agentReportData
          )
      } catch (err) {
        this.agentInfo = {}
        this.agentInfo.id =
          this.agent &&
          this.agent.length &&
          this.agent[0] &&
          this.agent[0].data &&
          this.agentData
            ? this.agentData.id
            : null
        this.agentInfo.name =
          this.agent &&
          this.agent.length &&
          this.agent[0] &&
          this.agent[0].data &&
          this.agentData
            ? this.agentData.name
            : null

        this.scope.agentInfo = {
          id: this.agentInfo.id,
          name: this.agentInfo.name,
          status: this.agentData.status,
        }
        this.agentInfo.id && this.agentInfo.name
          ? (this.agentInfo.error = false)
          : (this.agentInfo.error = 'Unable to load agent data')
      }

      this.scope.goGroups = (group) => this.goGroups(group)
      this.scope.getAgentStatusClass = (agentStatus) =>
        this.getAgentStatusClass(agentStatus)
      this.scope.formatAgentStatus = (agentStatus) =>
        this.formatAgentStatus(agentStatus)
    }
    /**
     * Navigates to a group
     * @param {String} group
     */
    async goGroups(group) {
      try {
        this.groupInfo = await this.requestService.apiReq(`/groups/`)
        this.groupData = this.groupInfo.data.data.affected_items.filter(
          (item) => item.name === group
        )
        if (
          !this.groupInfo ||
          !this.groupInfo.data ||
          !this.groupInfo.data.data ||
          this.groupInfo.data.error
        ) {
          throw Error('Missing fields')
        }
        this.state.go(`mg-groups`, { group: this.groupData[0] })
      } catch (err) {
        this.notification.showErrorToast('Error fetching group data')
      }
    }

    /**
     * Returns a class depending of the agent state
     * @param {String} agentStatus
     */
    getAgentStatusClass(agentStatus) {
      return agentStatus === 'Active' ? 'teal' : 'red'
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
     * Returns the Agent Information
     */
    getAgentInfo() {
      if (!this.agent[0].data.data.error) {
        // Capitalize Status
        if (
          this.agent[0].data.data.affected_items &&
          this.agent[0].data.data.affected_items[0].status
        ) {
          this.agent[0].data.data.affected_items[0].status =
            this.agent[0].data.data.affected_items[0].status
              .charAt(0)
              .toUpperCase() +
            this.agent[0].data.data.affected_items[0].status.slice(1)
        }

        return this.agent[0].data.data.affected_items[0]
      }

      return {}
    }
  }

  app.controller('agentsGeneralCtrl', AgentsGeneral)
})
