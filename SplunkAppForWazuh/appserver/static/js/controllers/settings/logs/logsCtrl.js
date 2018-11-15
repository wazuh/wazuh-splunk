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
  class Logs {
    constructor($scope, $requestService, logs, $rootScope) {
      this.scope = $scope
      this.logs = logs
      this.httpReq = $requestService.httpReq
      this.root = $rootScope
    }

    async refreshLogs() {
      try {
        this.root.$broadcast('loading', { status: true })
        const result = await this.httpReq(`GET`, `/manager/get_log_lines`)
        this.scope.logs = result.data.logs.map(item => JSON.parse(item))
        this.root.$broadcast('loading', { status: false })
      } catch (error) {
        this.root.$broadcast('loading', { status: false })
        this.scope.logs = [{ date: new Date(), level: 'error', message: 'Error when loading Wazuh app logs' }]
      }
    }

    /**
     * Initialize
     */
    $onInit() {
      try {
        this.scope.logs = this.logs.data.logs.map(item => JSON.parse(item))
      } catch (error) {
        this.scope.logs = [{ date: new Date(), level: 'error', message: 'Error when loading Wazuh app logs' }]
      }
    }
  }
  // Logs controller
  module.controller('logsCtrl', Logs)
})
