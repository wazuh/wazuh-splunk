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

define(['../../module'], function(module) {
  'use strict'
  class Logs {
    constructor($scope, $requestService, logs, $rootScope) {
      this.scope = $scope
      this.logs = logs
      this.httpReq = $requestService.httpReq
      this.root = $rootScope
    }

    /**
     * Initialize
     */
    $onInit() {
      this.scope.refreshLogs = () => this.refreshLogs()
      try {
        if (Array.isArray(this.logs.data.logs)) {
          this.parseLogs(this.logs.data.logs)
        }
      } catch (error) {
        this.scope.logs = [
          {
            date: new Date(),
            level: 'error',
            message: 'Error when loading Wazuh app logs'
          }
        ]
      }
    }

    /**
     * Parses the content of the logs and binds it to scope
     * @param {Array} logs
     */
    parseLogs(logs) {
      try {
        if (Array.isArray(logs)) {
          if (logs.length > 0) {
            for (let i = 0; i < logs.length; i++) {
              try {
                logs[i] = JSON.parse(logs[i])
              } catch (error) {
                logs[i] = {
                  date: new Date(),
                  level: 'parse_error',
                  message: 'Cannot parse this log message'
                }
              }
            }
            const excludeParseError = logs.filter(
              log => log.level !== 'parse_error'
            )
            this.scope.logs = excludeParseError
          } else {
            this.scope.logs = [
              { date: new Date(), level: 'info', message: 'Empty logs' }
            ]
          }
        } else {
          this.scope.logs = [
            { date: new Date(), level: 'info', message: 'Empty logs' }
          ]
        }
        this.root.$broadcast('loading', { status: false })
        this.scope.$applyAsync()
        return
      } catch (error) {
        this.root.$broadcast('loading', { status: false })
        this.scope.logs = [
          {
            date: new Date(),
            level: 'error',
            message: 'Error when loading Wazuh app logs'
          }
        ]
      }
    }

    /**
     * Reloads the logs
     */
    async refreshLogs() {
      try {
        this.root.$broadcast('loading', { status: true })
        const result = await this.httpReq(`GET`, `/manager/get_log_lines`)
        this.parseLogs(result.data.logs)
        return
      } catch (error) {
        this.scope.logs = [
          {
            date: new Date(),
            level: 'error',
            message: 'Error when loading Wazuh app logs'
          }
        ]
      }
    }
  }
  // Logs controller
  module.controller('logsCtrl', Logs)
})
