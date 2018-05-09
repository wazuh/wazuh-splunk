/*
 * Wazuh app - TableView class
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
  const tableLib = require("../thirdPartyLibs/dataTables.min.js")

  // Exportable DataTable class
  const table = class DataTable {

    /**
     * Constructor method
     * @param {*} $el: DOM table element to attach the table 
     */
    constructor() {
      this.$el = ""
      this.table = ""
      // this.$el.DataTable({"retrieve": true}) 
    }

    element($el) {
      this.$el = $el
    }
    /**
     * Build: generates and draws a datatable
     * @param {*} urlArg : url to get the data from
     * @param {Object} opt: options
     */
    build(urlArg, opt) {

      this.table = this.$el.DataTable({
        "ordering": opt.ordering || true,
        "retrieve": opt.retrieve || true,
        "orderMulti": true,
        "paging": true,
        "processing": opt.processing || true,
        "serverSide": opt.serverSide || true,
        "pageLength": opt.pages || 10,
        "ajax": {
          url: urlArg,
          type: opt.method || 'get',
          dataFilter: (data) => {
            let json = jQuery.parseJSON(data)
            json.recordsTotal = json.data.totalItems
            json.recordsFiltered = json.data.totalItems
            json.data = json.data.items
            return JSON.stringify(json) // return JSON string
          },
        },
        // "bFilter": opt.filterVisible || false,
        // 'sDom': '<"top"i>rt<"bottom"flp><"clear">',
        "columns": opt.columns
      })
      this.table.draw()
    }

    search($el) {
      this.table.columns().every(function () {
        const that = this;
        $el.on('keyup change', function () {
          if (that.search() !== this.value) {
            that
              .search(this.value)
          }
        })
      })
    }

    /**
     * Click: perform a click in a row
     */
    click(cb) {
      const myThis = this;
      this.$el.on('click', 'tr', function() {
        cb(myThis.table.row(this).data())
      })
    }
  }

  return table
})