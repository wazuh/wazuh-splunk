/*
 * Wazuh app - Dev tools controller
 * Copyright (C) 2018 Wazuh, Inc.
 *
 * This program is free software you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

define(['../../module'], function (module) {
  'use strict'
  class Inventory {
    constructor($requestService, syscollector, $rootScope, $notificationService, $scope) {
      this.vm = this
      this.$scope = $scope
      this.data = syscollector
      this.httpReq = $requestService.httpReq
      this.root = $rootScope
      this.toast = $notificationService.showSimpleToast
    }

    /**
     * Filters by a term in table
     * @param {String} term 
     * @param {String} specificPath 
     */
    search(term, specificPath) { this.$scope.$broadcast('wazuhSearch', { term, specificPath }) }

    /**
     * Initialize
     */
    $onInit() {
      try {
        this.vm.search = this.search
        this.vm.agent = this.data[5].data.data
        this.vm.getAgentStatusClass = agentStatus => agentStatus === "Active" ? "teal" : "red";
        this.vm.formatAgentStatus = agentStatus => {
          return ['Active', 'Disconnected'].includes(agentStatus) ? agentStatus : 'Never connected';
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
          this.vm.syscollector = null
        } else {
          const netiface = {}
          const ports = {}
          const packagesDate = {}
          if (this.data[2] && this.data[2].data && this.data[2].data.data)
            Object.assign(netiface, this.data[2].data.data)
          if (this.data[3] && this.data[3].data && this.data[3].data.data)
            Object.assign(ports, this.data[3].data.data)
          if (this.data[4] && this.data[4].data && this.data[4].data.data)
            Object.assign(packagesDate, this.data[4].data.data)
          this.vm.syscollector = {
            hardware: this.data[0].data.data,
            os: this.data[1].data.data,
            netiface: netiface,
            ports: ports,
            packagesDate:
              packagesDate && packagesDate.items && packagesDate.items.length
                ? packagesDate.items[0].scan_time
                : 'Unknown'
          }
        }
        return
      } catch (error) {
        this.toast(error.message || error)
      }
    }
  }
  // Logs controller
  module.controller('inventoryCtrl', Inventory)
})