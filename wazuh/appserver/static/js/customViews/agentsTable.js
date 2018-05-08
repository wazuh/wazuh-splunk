/*
 * Wazuh app - AgentsTable class
 * Copyright (C) 2018 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

define(function (require, exports, module) {
  const $ = require('jquery')
  const TableView = require("./tableView.js")

  const table = class TableAgents extends TableView {

    /**
     * Constructor method
     * @param {*} $el: DOM table element to attach the table 
     */
    constructor($el) {
      super()
      this.generateTableView($el)
      this.opts = {
        pages: 10,
        processing: true,
        serverSide: true,
        filterVisible: false,
        columns: [
          { "data": "id", 'orderable': true, defaultContent: "-" },
          { "data": "ip", 'orderable': true, defaultContent: "-" },
          { "data": "name", 'orderable': true, defaultContent: "-" },
          { "data": "status", 'orderable': true, defaultContent: "-" },
          { "data": "os-platform", 'orderable': true, defaultContent: "-" },
          { "data": "os-uname", 'orderable': true, defaultContent: "-" },
          { "data": "os-name", 'orderable': true, defaultContent: "-" },
          { "data": "os-arch", 'orderable': false, defaultContent: "-" },
          { "data": "os-version", 'orderable': true, defaultContent: "-" },
          { "data": "dateAdd", 'orderable': false, defaultContent: "-" },
          { "data": "lastKeepAlive", 'orderable': false, defaultContent: "-" },
          { "data": "last_rootcheck", 'orderable': false, defaultContent: "-" },
          { "data": "last_syscheck", 'orderable': false, defaultContent: "-" },
          { "data": "version", 'orderable': false, defaultContent: "-" }
        ]
      }
    }

    /**
     * Generates HTML table code and append it into the element passed
     * @param {*} jQuery element  
     */
    generateTableView($element) {
      $element.prepend('<table id="myAgentTable" class="display compact"><thead><tr><th>id</th><th>ip</th><th>name</th><th>status</th><th>os-platform</th><th>os-uname</th><th>os-name</th><th>os-arch</th><th>os-version</th><th>dateAdd</th><th>lastKeepAlive</th><th>last_rootcheck</th><th>last_syscheck</th><th>version</th></tr></thead></table>')
      super.element($('#myAgentTable'))
    }
    /**
     * Build: generates and draws an agents datatable
     * @param {*} urlArg : url to get the data from
     * @param {Object} opt: options
     */
    build(urlArg) {
      const url = urlArg.baseUrl + '/custom/wazuh/agents/agents?ip=' + urlArg.ipApi + '&port=' + urlArg.portApi + '&user=' + urlArg.userApi + '&pass=' + urlArg.passApi
      super.build(url, this.opts)
    }
  }

  return table
})