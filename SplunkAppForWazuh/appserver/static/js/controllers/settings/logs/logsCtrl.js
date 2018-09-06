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
// import { uiModules } from 'ui/modules'
// import CodeMirror from '../../utils/codemirror/lib/codemirror'
// import jsonLint from '../../utils/codemirror/json-lint'
// import queryString from 'querystring-browser'
// import $ from 'jquery'

// const app = uiModules.get('app/wazuh', [])

define(['../module'], function (module) {
  'use strict'
  class Logs {
    constructor($scope, $requestService, $notificationService) {
      this.$scope = $scope
      this.apiReq = $requestService.apiReq
      this.errorHandler = $notificationService.showSimpleToast
      this.$scope.type_log = 'all'
      this.$scope.category = 'all'
    }

    /**
     * Initialize
     */
    $onInit() {
      this.initialize()
      this.$scope.search = term => this.search(term)
      this.$scope.filter = filter => this.filter(filter)
      this.$scope.playRealtime = () => this.playRealtime()
      this.$scope.stopRealtime = () => this.stopRealtime()
    }

    /**
     * Event handler for the search bar.
     * @param {string} term Term(s) to be searched
     */
    search(term) {
      this.$scope.$broadcast('wazuhSearch', { term })
    }

    /**
     * Event handler for the selectors
     * @param {*} filter Filter to be applied
     */
    filter(filter) {
      this.$scope.$broadcast('wazuhFilter', { filter })
    }

    /**
     * Starts real time mode
     */
    playRealtime() {
      this.$scope.realtime = true
      this.$scope.$broadcast('wazuhPlayRealTime')
    }

    /**
     * Stops real time mode
     */
    stopRealtime() {
      this.$scope.realtime = false
      this.$scope.$broadcast('wazuhStopRealTime')
    }

    /**
     * Fetchs required data
     */
    async initialize() {
      try {
        const data = await this.apiReq('/manager/get_log_lines')
        const daemons = data.data.data
        this.$scope.daemons = Object.keys(daemons).map(item => { return { title: item } })
        if (!this.$scope.$$phase) this.$scope.$digest()
        return
      } catch (error) {
        this.errorHandler('Logs error: ', error.message || error)
      }
      return
    }
  }

  // Logs controller
  module.controller('logssCtrl', Logs)
})
