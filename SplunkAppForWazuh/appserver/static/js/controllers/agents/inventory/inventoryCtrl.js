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

define(['../../module', 'FileSaver'], function(module) {
  'use strict'
  class Inventory {
    /**
     * Class Inventory
     * @param {*} $requestService
     * @param {*} syscollector
     * @param {*} $rootScope
     * @param {*} $notificationService
     * @param {*} $scope
     * @param {*} $reportingService
     */
    constructor(
      $requestService,
      syscollector,
      $rootScope,
      $notificationService,
      $scope,
      $reportingService,
      reportingEnabled,
      $currentDataService,
      $csvRequestService
    ) {
      this.scope = $scope
      this.scope.reportingEnabled = reportingEnabled
      this.data = syscollector
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
    }

    /**
     * Filters by a term in table
     * @param {String} term
     * @param {String} specificPath
     */
    search(term, specificPath) {
      this.scope.$broadcast('wazuhSearch', { term, specificPath })
    }

    /**
     * On controller loads
     */
    $onInit() {
      try {

        this.scope.downloadCsv = (path, name) => this.downloadCsv(path, name)
        this.scope.hasSize = obj =>
          obj && typeof obj === 'object' && Object.keys(obj).length

        this.scope.agent =
          this.data.length &&
          this.data.length > 4 &&
          typeof this.data[4] === 'object' &&
          this.data[4].data &&
          this.data[4].data.data
            ? this.data[4].data.data
            : { error: true }
        this.scope.search = (term, specificPath) => {
          this.search(term, specificPath)
        }
        this.scope.getAgentStatusClass = agentStatus =>
          agentStatus === 'Active' ? 'teal' : 'red'
        this.scope.formatAgentStatus = agentStatus => {
          return ['Active', 'Disconnected'].includes(agentStatus)
            ? agentStatus
            : 'Never connected'
        }
        if (
          !this.data[0] ||
          !this.data[0].data ||
          !this.data[0].data.data ||
          typeof this.data[0].data.data !== 'object' ||
          !Object.keys(this.data[0].data.data).length ||
          !this.data[1] ||
          !this.data[1].data ||
          !this.data[1].data.data ||
          typeof this.data[1].data.data !== 'object' ||
          !Object.keys(this.data[1].data.data).length
        ) {
          this.scope.syscollector = null
        } else {
          if (this.data[2] && this.data[2].data && this.data[2].data.data)
            Object.assign(this.ports, this.data[3].data.data)
          if (this.data[3] && this.data[3].data && this.data[3].data.data)
            Object.assign(this.packagesDate, this.data[3].data.data)
          if (this.data[5] && this.data[5].data && this.data[5].data.data)
            Object.assign(this.processesDate, this.data[5].data.data)
        }
        this.init()

        this.scope.startVis2Png = () =>
          this.reportingService.reportInventoryData(this.scope.agent.id)

        this.scope.$on('loadingReporting', (event, data) => {
          this.scope.loadingReporting = data.status
        })

        return
      } catch (error) {
        this.notification.showErrorToast(error.message || error)
      }
    }

    /**
     * Initializes the syscollector data
     */
    async init() {
      try {
        try {
          const resultNetiface = await this.apiReq(
            `/syscollector/${this.scope.agent.id}/netiface`,
            {}
          )
          this.netifaceResponse =
            ((resultNetiface || {}).data || {}).data || false
        } catch (error) {} // eslint-disable-line

        // This API call may fail so we put it out of Promise.all
        try {
          const resultNetaddrResponse = await this.apiReq(
            `/syscollector/${this.scope.agent.id}/netaddr`,
            { limit: 1 }
          )
          this.netaddrResponse =
            ((resultNetaddrResponse || {}).data || {}).data || false
        } catch (error) {} // eslint-disable-line

        this.scope.syscollector = {
          hardware: this.data[0].data.data,
          os: this.data[1].data.data,
          netiface: this.netifaceResponse,
          ports: this.ports,
          netaddr: this.netaddrResponse,
          packagesDate:
            this.packagesDate &&
            this.packagesDate.items &&
            this.packagesDate.items.length
              ? this.packagesDate.items[0].scan_time
              : 'Unknown',
          processesDate: ((this.processesDate || {}).items || []).length
            ? this.processesDate.items[0].scan_time
            : 'Unknown'
        }
        if (!this.scope.$$phase) this.scope.$digest()
        return
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
          'Your download should begin automatically...'
        )
        const currentApi = this.api['_key']
        const output = await this.csvReq.fetch(
          path,
          currentApi
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
  // Logs controller
  module.controller('inventoryCtrl', Inventory)
})
