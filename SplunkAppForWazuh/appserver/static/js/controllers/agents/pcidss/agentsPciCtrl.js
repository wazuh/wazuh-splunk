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
  '../../../services/visualizations/inputs/dropdown-input',
  '../../../services/rawTableData/rawTableDataService'
], function (
  app,
  DashboardMain,
  ColumnChart,
  PieChart,
  Table,
  Dropdown,
  RawTableDataService
) {
    'use strict'

    class AgentsPCI extends DashboardMain {
      /**
       * Class Agents PCI-DSS
       * @param {*} $urlTokenModel
       * @param {*} $scope
       * @param {*} $state
       * @param {*} $currentDataService
       * @param {Object} agent
       * @param {*} $reportingService
       */
      constructor(
        $urlTokenModel,
        $scope,
        $state,
        $currentDataService,
        agent,
        $reportingService,
        pciTabs,
        reportingEnabled,
        gdprExtensionEnabled
      ) {
        super(
          $scope,
          $reportingService,
          $state,
          $currentDataService,
          $urlTokenModel,
        )
        this.scope.reportingEnabled = reportingEnabled
        this.scope.gdprExtensionEnabled = gdprExtensionEnabled
        this.scope.pciTabs = pciTabs ? pciTabs : false

        this.scope.expandArray = [false, false, false, false, false]

        this.dropdown = new Dropdown(
          'dropDownInput',
          `${
          this.filters
          } sourcetype=wazuh rule.pci_dss{}="*"| stats count by "rule.pci_dss{}" | sort "rule.pci_dss{}" ASC | fields - count`,
          'rule.pci_dss{}',
          '$form.pci$',
          'dropDownInput',
          this.scope
        )
        this.dropdownInstance = this.dropdown.getElement()
        this.dropdownInstance.on('change', newValue => {
          if (newValue && this.dropdownInstance)
            $urlTokenModel.handleValueChange(this.dropdownInstance)
        })
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

        this.filters = this.getFilters()

        this.vizz = [
          /**
           * Visualizations
           */
          new ColumnChart(
            'pciReqSearchVizz',
            `${
            this.filters
            } sourcetype=wazuh rule.pci_dss{}="$pci$"  | stats count by rule.pci_dss{}`,
            'pciReqSearchVizz',
            this.scope
          ),
          new PieChart(
            'groupsVizz',
            `${
            this.filters
            } sourcetype=wazuh rule.pci_dss{}="$pci$" | top limit=5 rule.groups{}`,
            'groupsVizz',
            this.scope
          ),
          new PieChart(
            'topRules',
            `${
            this.filters
            } sourcetype=wazuh rule.pci_dss{}="$pci$" | top limit=5 rule.description`,
            'topRules',
            this.scope
          ),
          new PieChart(
            'top5Pcidss',
            `${
            this.filters
            } sourcetype=wazuh rule.pci_dss{}="$pci$" | top limit=5 rule.pci_dss{}`,
            'top5Pcidss',
            this.scope
          ),
          new PieChart(
            'ruleLevelDistribution',
            `${
            this.filters
            } sourcetype=wazuh rule.pci_dss{}="$pci$" | stats count by rule.level`,
            'ruleLevelDistribution',
            this.scope
          ),
          new ColumnChart(
            'reqByAgentsVizz',
            `${
            this.filters
            } sourcetype=wazuh rule.pci_dss{}="$pci$" agent.name=*| chart  count(rule.pci_dss{}) by rule.pci_dss{},agent.name`,
            'reqByAgentsVizz',
            this.scope
          ),
          new Table(
            'alertsSummaryVizz',
            `${
            this.filters
            } sourcetype=wazuh rule.pci_dss{}="$pci$" | stats count sparkline by agent.name, rule.pci_dss{}, rule.description | sort count DESC | rename agent.name as "Agent Name", rule.pci_dss{} as Requirement, rule.description as "Rule description", count as Count`,
            'alertsSummaryVizz',
            this.scope
          ),
          new RawTableDataService(
            'alertsSummaryTable',
            `${
            this.filters
            } sourcetype=wazuh rule.pci_dss{}="$pci$" | stats count sparkline by agent.name, rule.pci_dss{}, rule.description | sort count DESC | rename agent.name as "Agent Name", rule.pci_dss{} as Requirement, rule.description as "Rule description", count as Count`,
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
            'agents-pci',
            'PCI DSS',
            this.filters,
            [
              'pciReqSearchVizz',
              'ruleLevelDistribution',
              'top5Pcidss',
              'groupsVizz',
              'topRules',
              'reqByAgentsVizz',
              'alertsSummaryVizz'
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
            ? this.agent.data.data
            : { error: true }
        this.scope.getAgentStatusClass = agentStatus =>
          this.getAgentStatusClass(agentStatus)
        this.scope.formatAgentStatus = agentStatus =>
          this.formatAgentStatus(agentStatus)
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
    }
    app.controller('agentsPciCtrl', AgentsPCI)
  })
