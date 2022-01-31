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

define(["../../module", "../../../dashboardMain"], function (
  app,
  DashboardMain
) {
  "use strict"

  class AgentsCA extends DashboardMain {
    /**
     * Class Agents Policy-Monitoring
     * @param {Object} $urlTokenModel
     * @param {Object} $rootScope
     * @param {Object} $scope
     * @param {Object} $state
     * @param {Object} $currentDataService
     * @param {Object} agent
     * @param {Object} configAssess
     * @param {*} $requestService
     * @param {*} $notificationService
     * @param {*} $csvRequestService
     * @param {*} $tableFilterService
     * @param {*} reportingEnabled
     * @param {*} BASE_URL
     * @param {*} extensions
     * @param {*} $dateDiffService
     */

    constructor(
      $urlTokenModel,
      $rootScope,
      $scope,
      $state,
      $currentDataService,
      agent,
      configAssess,
      $requestService,
      $notificationService,
      $csvRequestService,
      $tableFilterService,
      reportingEnabled,
      BASE_URL,
      extensions,
      $dateDiffService
    ) {
      super($scope, null, $state, $currentDataService, $urlTokenModel)
      this.rootScope = $rootScope
      this.scope.reportingEnabled = reportingEnabled
      this.scope.extensions = extensions
      this.apiReq = $requestService.apiReq
      this.agent = agent
      this.configAssess = configAssess
      this.notification = $notificationService
      this.api = this.currentDataService.getApi()
      this.setBrowserOffset = $dateDiffService.setBrowserOffset
      this.csvReq = $csvRequestService

      this.scope.offsetTimestamp = (text, time) => {
        try {
          return text + this.setBrowserOffset(time)
        } catch (error) {
          return ""
        }
      }

      this.wzTableFilter = $tableFilterService
      this.baseUrl = BASE_URL
      this.scope.noScansPng = `${this.baseUrl}/static/app/SplunkAppForWazuh/css/images/sca_no_scans.png`
      this.currentDataService.addFilter(
        `{"rule.groups{}":"sca", "implicit":true}`
      )
      this.scope.expandArray = [false, false, false, false, false]

      if (
        this.agent &&
        this.agent.data &&
        this.agent.data.data &&
        this.agent.data.data.id
      )
        this.currentDataService.addFilter(
          `{"agent.id":"${this.agent.data.data.affected_items[0].id}", "implicit":true}`
        )

      if (
        this.configAssess &&
        this.configAssess.data &&
        this.configAssess.data.data &&
        this.configAssess.data.data.affected_items &&
        this.configAssess.data.error === 0
      ) {
        this.configAssess = this.configAssess.data.data.affected_items
        this.scope.configAssess = this.configAssess
      }

      this.filters = this.getFilters()
    }

    $onInit() {
      this.scope.searchRootcheck = (term, specificFilter) =>
        this.scope.$broadcast("wazuhSearch", { term, specificFilter })
      this.scope.downloadCsv = () => this.downloadCsv()

      this.scope.switchVisualizations = () => this.switchVisualizations()
      this.scope.loadPolicyChecks = (id, name) =>
        this.loadPolicyChecks(id, name)
      this.scope.backToConfAssess = () => this.backToConfAssess()

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
        this.getAgentStatusClass(agentStatus)
      this.scope.formatAgentStatus = (agentStatus) =>
        this.formatAgentStatus(agentStatus)

      this.scope.refreshScans = () => this.refreshScans()
      this.scope.search = (term) => this.search(term)

      this.scope.loadCharts = (policy) => {
        setTimeout(function () {
          // eslint-disable-next-line no-undef
          const chart = new Chart(document.getElementById(policy.policy_id), {
            type: "doughnut",
            data: {
              labels: ["pass", "fail", "not applicable"],
              datasets: [
                {
                  backgroundColor: ["#46BFBD", "#F7464A", "#949FB1"],
                  data: [policy.pass, policy.fail, policy.invalid],
                },
              ],
            },
            options: {
              cutoutPercentage: 85,
              legend: {
                display: true,
                position: "right",
              },
              tooltips: {
                displayColors: false,
              },
            },
          })
          chart.update()
        }, 250)
      }
    }

    /**
     * Returns a class depending of the agent state
     * @param {String} agentStatus
     */
    getAgentStatusClass(agentStatus) {
      return agentStatus === "Active" ? "teal" : "red"
    }

    /**
     * Checks and returns agent status
     * @param {Array} agentStatus
     */
    formatAgentStatus(agentStatus) {
      return ["Active", "Disconnected"].includes(agentStatus)
        ? agentStatus
        : "Never connected"
    }

    /**
     * Searches for a term
     * @param {String} term
     */
    search(term) {
      this.scope.$broadcast("wazuhSearch", { term })
    }

    /**
     * Exports the table in CSV format
     */
    async downloadCsv() {
      try {
        this.notification.showSimpleToast(
          "Your download should begin automatically..."
        )
        const currentApi = this.api.id
        const output = await this.csvReq.fetch(
          "/agents",
          currentApi,
          this.wzTableFilter.get()
        )
        const blob = new Blob([output], { type: "text/csv" }) // eslint-disable-line
        saveAs(blob, "agents.csv") // eslint-disable-line
        return
      } catch (error) {
        this.notification.showErrorToast("Error downloading CSV")
      }
      return
    }

    /**
     * Gets filters and launches search
     */
    launchSearches() {
      this.filters = this.currentDataService.getSerializedFilters()
      this.state.reload()
    }

    /**
     *
     * Backs to config assessment
     */
    backToConfAssess() {
      this.scope.showPolicyChecks = false
    }

    /**
     * Loads policies checks
     */
    async loadPolicyChecks(policy) {
      this.scope.showPolicyChecks = true
      this.scope.policy = policy
      const agentId = this.agent.data.data.affected_items[0].id
      this.scope.wzTablePath = `/sca/${agentId}/checks/${policy.policy_id}`
    }

    /**
     * Refresh SCA scans
     */
    refreshScans() {
      this.state.reload()
    }
  }

  app.controller("agentsConfigurationAssessmentsCtrl", AgentsCA)
})
