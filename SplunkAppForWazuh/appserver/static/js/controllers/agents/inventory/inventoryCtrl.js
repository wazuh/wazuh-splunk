/*
 * Wazuh app - Dev tools controller
 * Copyright (C) 2015-2019 Wazuh, Inc.
 *
 * This program is free software you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

define(["../../module", "FileSaver"], function (module) {
  "use strict"
  class Inventory {
    /**
     * Class Inventory
     * @param {*} $requestService
     * @param {*} agent
     * @param {*} $rootScope
     * @param {*} $notificationService
     * @param {*} $scope
     * @param {*} $reportingService
     * @param {*} reportingEnabled
     * @param {*} $currentDataService
     * @param {*} $csvRequestService
     * @param {*} $dateDiffService
     * @param {*} $security_service
     */
    constructor(
      $requestService,
      agent,
      $rootScope,
      $notificationService,
      $scope,
      $reportingService,
      reportingEnabled,
      $currentDataService,
      $csvRequestService,
      $dateDiffService,
      $security_service
    ) {
      this.scope = $scope
      this.scope.reportingEnabled = reportingEnabled
      this.agent = agent.data.data.affected_items[0]
      this.httpReq = $requestService.httpReq
      this.apiReq = $requestService.apiReq
      this.root = $rootScope
      this.notification = $notificationService
      this.netifaceResponse = false
      this.ports = {}
      this.packagesDate = {}
      this.processesDate = {}
      this.netaddrResponse = false
      this.reportingService = $reportingService
      this.api = $currentDataService.getApi()
      this.csvReq = $csvRequestService
      this.setBrowserOffset = $dateDiffService.setBrowserOffset
      this.$security_service = $security_service
    }

    /**
     * Filters by a term in table
     * @param {String} term
     * @param {String} specificPath
     */
    search(term, specificPath) {
      this.scope.$broadcast("wazuhSearch", { term, specificPath })
    }

    /**
     * On controller loads
     */
    $onInit() {
      try {
        this.scope.downloadCsv = (path, name) => this.downloadCsv(path, name)
        this.scope.hasSize = (obj) =>
          obj && typeof obj === "object" && Object.keys(obj).length

        this.scope.agent = this.agent
        // Capitalize Status
        if (this.scope.agent && this.scope.agent.status) {
          this.scope.agent.status =
            this.scope.agent.status.charAt(0).toUpperCase() +
            this.scope.agent.status.slice(1)
        }

        this.scope.search = (term, specificPath) => {
          this.search(term, specificPath)
        }
        this.scope.getAgentStatusClass = (agentStatus) =>
          agentStatus === "Active" ? "teal" : "red"
        this.scope.formatAgentStatus = (agentStatus) => {
          return ["Active", "Disconnected"].includes(agentStatus)
            ? agentStatus
            : "Never connected"
        }

        this.scope.startVis2Png = () =>
          this.reportingService.reportInventoryData(this.scope.agent.id)

        this.scope.$on("loadingReporting", (event, data) => {
          this.scope.loadingReporting = data.status
        })

        this.scope.$on("loadingContent", (event, data) => {
          this.scope.loadingContent = data.status
          event.preventDefault()
        })

        this.scope.setBrowserOffset = (date) => this.setBrowserOffset(date)

        /* RBAC flags */
        this.isAllowed = (action, resource, params = ["*"]) => {
          return this.$security_service.getPolicy(action, resource, params)
            .isAllowed
        }
        this.scope.canReadSysCollector = this.isAllowed(
          "SYSCOLLECTOR_READ",
          ["AGENT_ID"],
          [this.scope.agent.id]
        )

        if (this.scope.canReadSysCollector) {
          this.getSyscollectorData()
        }
      } catch (error) {
        this.notification.showErrorToast(error.message || error)
      }
    }

    /**
     * Initializes the syscollector data
     */
    async getSyscollectorData() {
      try {
        // FIXME SYSCOLLECTOR REQUEST
        const apiId = this.api["_key"]
        const agentId = this.agent.id
        const syscollector = await this.httpReq(
          "GET",
          `/api/getSyscollector?apiId=${apiId}&agentId=${agentId}`
        )

        this.scope.syscollector = {
          ...syscollector.data,
          hardware: syscollector.data.hardware.affected_items[0] || {},
          os: syscollector.data.os.affected_items[0] || {},
        }

        this.scope.$applyAsync()
      } catch (error) {
        throw new Error(error.message || error)
      }
    }

    /**
     * Exports the table in CSV format
     */
    async downloadCsv(path, name) {
      try {
        this.notification.showSimpleToast(
          "Your download should begin automatically..."
        )
        const currentApi = this.api["_key"]
        const output = await this.csvReq.fetch(path, currentApi)
        const blob = new Blob([output], { type: "text/csv" }) // eslint-disable-line
        saveAs(blob, name) // eslint-disable-line
      } catch (error) {
        this.notification.showErrorToast("Error downloading CSV")
      }
    }
  }
  // Logs controller
  module.controller("inventoryCtrl", Inventory)
})
