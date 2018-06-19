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
      this.eventListeners()
    }

    /**
     * Gets the options
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
      // $element.remove()

      $element.html('<table id="myAgentTable" class="wz-width-100"><thead><input id="searchBar" type="text" placeholder="Search" style="width:62%;"/><select id="platformSearch" style="float:right; margin-right: 10px;"> <option value="" selected disabled hidden>Platform</option><option value=Ubuntu18>Ubuntu18</option></select><select style="float:right; margin-right: 10px;" id="statusSearch"> <option value="" selected disabled hidden>Status</option><option value="neverConnected">Never Connected</option><option value="Active">Active</option><option value="disconnected">Disconnected</option></select><select style="float:right; margin-right: 10px;"> <option value="" selected disabled hidden>Version</option><option value=v3.3.1>Wazuh v3.3.1</option></select><tr><th>id</th><th>ip</th><th>name</th><th>status</th><th>os-platform</th><th>os-uname</th><th>os-name</th><th>os-arch</th><th>os-version</th><th>dateAdd</th><th>lastKeepAlive</th><th>last_rootcheck</th><th>last_syscheck</th><th>version</th></tr></thead></table>')
      super.element($('#myAgentTable'))
    }

    eventListeners() {
      $('#platformSearch').change((e) => {
        console.log('change platform')

        let opts = this.getOpts()
        if (!opts.filters)
          opts.filters = {}
        opts.filters.platform = $('#platformSearch').val()
        this.generateTableView($('#row1'))
        this.build(opts)
      })

      $('#searchBar').keyup((e) => {
        console.log('keyup!')
        let opts = this.getOpts()
        if (!opts.search)
          opts.search = {}
        opts.search.value = $('#searchBar').val()
        this.generateTableView($('#row1'))
        this.build(opts)
      })

      $('#statusSearch').change((e) => {
        console.log('change status ',$('#statusSearch').val())
        let opts = this.getOpts()
        if (!opts.filters)
          opts.filters = {}
        opts.filters.status = $('#statusSearch').val()
        this.generateTableView($('#row1'))
        this.build(opts)
      })

      $('#versionSearch').change((e) => {
        console.log('change version')
        let opts = this.getOpts()
        if (!opts.filters)
          opts.filters = {}
        opts.filters.version = $('#versionSearch').val()
        this.generateTableView($('#row1'))
        this.build(opts)
      })
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
        console.log('reassigned options', this.opts)
      }
      this.eventListeners()
      super.build(url, this.opts)
    }
  }

  return table
})