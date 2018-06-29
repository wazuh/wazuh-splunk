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
  const ApiService = require("../services/apiService.js")

  const table = class TableAgents extends TableView {

    /**
     * Constructor method
     * @param {*} $el: DOM table element to attach the table 
     */
    constructor($el,api) {
      super()
      this.generateTableView($el)
      this.urlData = {
        baseUrl: ApiService.getBaseUrl(),
        ipApi: api.url,
        portApi: api.portapi,
        userApi: api.userapi,
        passApi: api.passapi
      }
      this.opts = {
        pages: 10,
        processing: true,
        serverSide: true,
        dom: '<"top"f>rt<"bottom"ip>',
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
     * Gets the options
     * @returns {Object} The table options
     */
    getOpts() {
      return this.opts
    }

    /**
     * Sets the options
     * @param {Object} opts 
     */
    setOpts(opts) {
      this.opts = opts
    }

    /**
     * Generates HTML table code and append it into the element passed
     * @param {*} jQuery element  
     */
    generateTableView($element) {
      $element.html('<table id="myAgentTable" class="display wz-width-100"><thead><tr><th>id</th><th>ip</th><th>name</th><th>status</th><th>os-platform</th><th>os-uname</th><th>os-name</th><th>os-arch</th><th>os-version</th><th>dateAdd</th><th>lastKeepAlive</th><th>last_rootcheck</th><th>last_syscheck</th><th>version</th></tr></thead></table>')
      super.element($('#myAgentTable'))
    }

    /**
     * Generates a dropdown that filters by column
     * @param {Array} options Array of options
     * @param {Number} column Column to filter
     * @param {Number} width Width that the element will have
     * @param {String} position Position that the element will have. Default:inherit. Values [left/right]
     */
    generateDropdownFilter(options, width, position, column) {
      super.generateDropdownFilter(options, width, position, column)
    }

  /**
    * Sets DataTables native filter position, width and deletes label
    * @param {String} placeholder Text to show inside the input
    * @param {String} width The width of the element
    * @param {String} position Position [left/right]
    */
   setFilterInputMaxWidth(placeholder, width, position) {
     super.setFilterInputMaxWidth(placeholder, width, position)
   }


    /**
     * Build: generates and draws an agents datatable
     * @param {*} urlArg : url to get the data from
     * @param {Object} opt: options
     */
    build(options) {
      const url = '/agents/agents?ip=' + this.urlData.ipApi + '&port=' + this.urlData.portApi + '&user=' + this.urlData.userApi + '&pass=' + this.urlData.passApi
      if (options) {
        this.opts = Object.assign(this.opts, options)
      }
      super.build(url, this.opts)
    }
  }

  return table
})