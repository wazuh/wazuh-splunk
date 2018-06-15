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
  const ApiService = require('../services/apiService.js')
  const tableLib = require("https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js")

  // Exportable DataTable class
  const table = class DataTable {

    /**
     * Constructor method
     * @param {*} $el: DOM table element to attach the table 
     */
    constructor() {
      this.$el = ""
      this.table = ""
      $.fn.dataTable.ext.errMode = 'throw'
      // this.$el.DataTable({"retrieve": true}) 
    }

    /**
     * Attaches an element to a table
     * @param {jQuery}  
     */
    element($el) {
      this.$el = $el
    }
    /**
     * Build: generates and draws a datatable
     * @param {*} urlArg : url to get the data from
     * @param {Object} opt: options
     */
    build(urlArg, opt) {
      try {
        this.table = this.$el.DataTable({
          "ordering": opt.ordering || true,
          "retrieve": opt.retrieve || true,
          "orderMulti": true,
          "paging": true,
          "processing": opt.processing || true,
          "serverSide": opt.serverSide || true,
          "pageLength": opt.pages || 10,
          "ajax": {
            url: ApiService.getWellFormedUri(urlArg),
            type: opt.method || 'get',
            dataFilter: (data) => {
              let json = JSON.parse(data)
              json.recordsTotal = json.data.totalItems
              json.recordsFiltered = json.data.totalItems
              json.data = json.data.items
              return JSON.stringify(json) // return JSON string
            },
          },
          // "bFilter": opt.filterVisible || false,
          // 'sDom': '<"top"i>rt<"bottom"flp><"clear">',
          "columns": opt.columns,
          "error": (xhr, error, thrown) => {
            return Promise.reject(error)
          }
        })
       // this.table.draw()
      } catch (err) {
        return Promise.reject(err)
      }
    }

    search($el) {
      try {
        this.table.columns().every(function () {
          const that = this;
          $el.on('keyup change', function () {
            if (that.search() !== this.value) {
              that
                .search(this.value)
            }
          })
        })
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Click: perform a click in a row
     */
    click(cb) {
      try {
        const myThis = this;
        this.$el.on('click', 'tr', function () {
          cb(myThis.table.row(this).data())
        })
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }

  return table
})