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

define(['../../module'], function (module) {
  'use strict'
  class Logs {
    constructor(logs) {
      this.vm = this
      this.logs = logs
    }

    /**
     * Initialize
     */
    $onInit() {
      try {
        this.vm.logs = this.logs.data.logs.map(item => JSON.parse(item))
      } catch (error) {
        this.vm.logs = [{ date: new Date(), level: 'error', message: 'Error when loading Wazuh app logs' }]
      }
    }
  }
  // Logs controller
  module.controller('logsCtrl', Logs)
})
