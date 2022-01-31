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

define(["../../module"], function (module) {
  "use strict"
  class Logs {
    constructor($scope, $requestService, logs, $rootScope) {
      this.scope = $scope
      this.logs = logs
      this.httpReq = $requestService.httpReq
      this.root = $rootScope
      this.scope.logs_path = ""
    }

    /**
     * Initialize
     */
    $onInit() {
      this.scope.refreshing = false
      this.scope.logs = []
      this.scope.refreshLogs = () => this.refreshLogs()
      try {
        if (Array.isArray(this.logs.data.logs)) {
          this.parseLogs(this.logs.data.logs)
        }
        this.scope.logs_path = this.logs.data.logs_path
      } catch (error) {
        this.scope.logs = [
          {
            date: new Date(),
            level: "ERROR",
            message: "Error when loading Wazuh app logs",
          },
        ]
        this.scope.logs_path = ""
      }
    }

    /**
     * Parses the content of the logs and binds it to scope
     * @param {Array} logs
     */
    parseLogs(logs) {
      try {
        if (Array.isArray(logs)) {
          logs.map((log) => {
            const l = log.split("'")
            const message = l[1]
            const levelAndDate = l[0].split(":")
            const level = levelAndDate[0]
            const date = `${levelAndDate[1]}:${levelAndDate[2]}:${levelAndDate[3]}`
            const formatLog = { date, level, message }
            this.scope.logs.push(formatLog)
          })
          this.scope.$applyAsync()
        } else {
          this.scope.logs = [
            { date: new Date(), level: "INFO", message: "Empty logs" },
          ]
        }
        return
      } catch (error) {
        this.scope.logs = [
          {
            date: new Date(),
            level: "ERROR",
            message: "Error when loading Wazuh app logs",
          },
        ]
      }
    }

    /**
     * Reloads the logs
     */
    async refreshLogs() {
      try {
        this.scope.refreshing = true
        this.scope.logs = []
        const result = await this.httpReq(`GET`, `/manager/get_log_lines`)
        this.parseLogs(result.data.logs)
        this.scope.logs_path = result.data.logs_path
        this.scope.refreshing = false
        return
      } catch (error) {
        this.scope.logs = [
          {
            date: new Date(),
            level: "ERROR",
            message: "Error when loading Wazuh app logs",
          },
        ]
        this.scope.logs_path = ""
      }
    }
  }
  // Logs controller
  module.controller("logsCtrl", Logs)
})
