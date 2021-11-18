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
  '../../../services/rawTableData/rawTableDataService'
], function(
  app,
  DashboardMain,
  PieChart,
  AreaChart,
  Table,
  RawTableDataService
) {
  'use strict'

  class OsqueryAgents extends DashboardMain {
    /**
     * Class Agents Osquery
     * @param {Object} $urlTokenModel
     * @param {Object} $scope
     * @param {Object} agent
     * @param {Object} $notificationService
     * @param {Object} $currentDataService
     * @param {Object} $state
     * @param {Object} osquery
     * @param {*} $reportingService
     * @param {*} reportingEnabled
     * @param {*} extensions
     * @param {*} $security_service
     */

    constructor(
      $urlTokenModel,
      $scope,
      agent,
      $notificationService,
      $currentDataService,
      $state,
      osquery,
      $reportingService,
      reportingEnabled,
      extensions,
      $security_service
    ) {
      super(
        $scope,
        $reportingService,
        $state,
        $currentDataService,
        $urlTokenModel
      )
      this.scope.reportingEnabled = reportingEnabled
      this.scope.extensions = extensions
      this.scope.userHasPermissions = $security_service.userHasPermissions.bind($security_service)
      this.notification = $notificationService
      this.osquery = osquery
      this.currentDataService.addFilter(
        `{"rule.groups{}":"osquery", "implicit":true}`
      )
      this.scope.expandArray = [false, false, false, false, false]
      this.agent = agent
      if (
        this.agent &&
        this.agent.data &&
        this.agent.data.data &&
        this.agent.data.data.affected_items[0].id
      )
        this.currentDataService.addFilter(
          `{"agent.id":"${this.agent.data.data.affected_items[0].id}", "implicit":true}`
        )

      this.scope.osqueryWodle = null

      this.filters = this.getFilters()

      this.vizz = [
        /**
         * Visualizations
         */
        new PieChart(
          'mostCommonPacks',
          `${this.filters}  | top data.osquery.pack limit=5`,
          'mostCommonPacks',
          this.scope
        ),
        new AreaChart(
          'alertsPacksOverTime',
          `${this.filters} data.osquery.pack="*" | timechart span=1h count by data.osquery.pack`,
          'alertsPacksOverTime',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new PieChart(
          'mostCommonActions',
          `${this.filters}  | top data.osquery.action limit=5`,
          'mostCommonActions',
          this.scope
        ),
        new Table(
          'topRules',
          `${this.filters}  | top rule.id, rule.description limit=5 | rename rule.id as "Rule ID", rule.description as "Rule description", count as Count, percent as Percent`,
          'topRules',
          this.scope
        ),
        new AreaChart(
          'alertsOverTime',
          `${this.filters} | timechart span=1h count`,
          'alertsOverTime',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new Table(
          'alertsSummary',
          `${this.filters}  | stats count by data.osquery.name, data.osquery.action,agent.name,data.osquery.pack | rename data.osquery.name as Name, data.osquery.action as Action, agent.name as Agent, data.osquery.pack as Pack, count as Count`,
          'alertsSummary',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryTable',
          `${this.filters}  | stats count by data.osquery.name, data.osquery.action,agent.name,data.osquery.pack | rename data.osquery.name as Name, data.osquery.action as Action, agent.name as Agent, data.osquery.pack as Pack, count as Count`,
          'alertsSummaryTableToken',
          '$result$',
          this.scope,
          'Alerts summary'
        )
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
          group: this.agent.data.data.affected_items[0].group.toString()
        }
      } catch (error) {
        this.agentReportData = false
      }

      /**
       * Generates report
       */
      this.scope.startVis2Png = () =>
        this.reportingService.startVis2Png(
          'agents-osquery',
          'Osquery',
          this.filters,
          [
            'mostCommonPacks',
            'alertsPacksOverTime',
            'mostCommonActions',
            'topRules',
            'alertsOverTime',
            'alertsSummary'
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
      this.scope.agent =
        this.agent && this.agent.data && this.agent.data.data
          ? this.agent.data.data.affected_items[0]
          : { error: true }

      // Capitalize Status
      if(this.scope.agent && this.scope.agent.status){
        this.scope.agent.status = this.scope.agent.status.charAt(0).toUpperCase() + this.scope.agent.status.slice(1)
      }
        
      try {
        this.wodles = this.osquery.data.data.wmodules
        this.scope.osqueryWodle = this.wodles.filter(
          item => item.osquery
        )[0].osquery
      } catch (err) {
        this.notification.showErrorToast(
          'Cannot load wodle configuration. Osquery not configured.'
        )
      }

      this.scope.getAgentStatusClass = agentStatus =>
        agentStatus === 'Active' ? 'teal' : 'red'
      this.scope.formatAgentStatus = agentStatus => {
        return ['Active', 'Disconnected'].includes(agentStatus)
          ? agentStatus
          : 'Never connected'
      }
    }
  }
  app.controller('osqueryAgentCtrl', OsqueryAgents)
})
