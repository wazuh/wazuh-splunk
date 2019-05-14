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
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/table/table',
  '../../../services/rawTableData/rawTableDataService'
], function (
  app,
  DashboardMain,
  PieChart,
  LinearChart,
  Table,
  RawTableDataService
) {
    'use strict'

    class DockerAgents extends DashboardMain {
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
        super(
          $scope,
          $reportingService,
          $state,
          $currentDataService,
          $urlTokenModel,
        )
        this.scope.reportingEnabled = reportingEnabled
        this.scope.extensions = extensions
        this.notification = $notificationService
        this.currentDataService.addFilter(
          `{"rule.groups{}":"docker", "implicit":true}`
        )
        this.scope.expandArray = [false, false, false, false, false]
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
            } sourcetype=wazuh  | stats count sparkline by data.docker.Actor.Attributes.image, data.docker.Actor.Attributes.name, data.docker.Action, timestamp | sort count DESC | rename data.docker.Actor.Attributes.image as Image, data.docker.Actor.Attributes.name as Container, data.docker.Action as Action, timestamp as Date, count as Count, sparkline as Sparkline`,
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
            } sourcetype=wazuh  | stats count sparkline by data.docker.Actor.Attributes.image, data.docker.Actor.Attributes.name, data.docker.Action, timestamp | sort count DESC | rename data.docker.Actor.Attributes.image as Image, data.docker.Actor.Attributes.name as Container, data.docker.Action as Action, timestamp as Date, count as Count`,
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
            ['top5images', 'eventsOcurred', 'top5actions', 'resourceUsage'],
            {}, //Metrics
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

        this.scope.getAgentStatusClass = agentStatus =>
          agentStatus === 'Active' ? 'teal' : 'red'
        this.scope.formatAgentStatus = agentStatus => {
          return ['Active', 'Disconnected'].includes(agentStatus)
            ? agentStatus
            : 'Never connected'
        }
      }
    }
    app.controller('agentsDockerCtrl', DockerAgents)
  })
