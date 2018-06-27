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
      this.$el = ''
      this.elementName = ''
      this.table = ''
      $.fn.dataTable.ext.errMode = 'throw'
      // this.$el.DataTable({"retrieve": true}) 
    }

    /**
     * Attaches an element to a table
     * @param {jQuery}  
     */
    element($el) {
      this.$el = $el
      this.elementName = String($el)
    }
    /**
     * Build: generates and draws a datatable
     * @param {*} urlArg : url to get the data from
     * @param {Object} opt: options
     */
    build(urlArg, opt) {
      try {
        console.log('options of table ', opt)
        this.table = this.$el.DataTable({
          'ordering': opt.ordering || true,
          'retrieve': opt.retrieve || true,
          'orderMulti': true,
          'paging': true,
          'processing': opt.processing || true,
          'serverSide': opt.serverSide || true,
          'pageLength': opt.pages || 10,
          'ajax': {
            url: ApiService.getWellFormedUri(urlArg),
            type: opt.method || 'get',
            dataFilter: (data) => {
              let json = JSON.parse(data)
              json.recordsTotal = json.data.totalItems
              json.recordsFiltered = json.data.totalItems
              json.data = json.data.items
              return JSON.stringify(json) // return JSON string
            },
            data: {
              filters: opt.filters || {},
              search: opt.search || {}
            }
          },
          'dom': opt.dom || '<"top">rt<"bottom"ip>',
          'columns': opt.columns,
          'error': (xhr, error, thrown) => {
            return Promise.reject(error)
          }
        })
        // this.table.draw()
      } catch (err) {
        return Promise.reject(err)
      }
    }

    draw() {
      this.table.draw()
    }

    /**
     * Performs a search and filter by column from a dropdown
     * @param {jQuery} $el 
     * @param {Number} column 
     */
    dropdownSearch($el, idColumn) {
      try {
        const self = this
        if (idColumn && typeof idColumn === 'number' && idColumn > 0) {
          $el.on('change', function () {
            const currentOption = this
            self.table.columns().every(function () {
              const column = this
              if (idColumn === column['0']['0']) {
                if (column.search() !== currentOption.value) {
                  column.search(currentOption.value)
                  self.draw()
                }
              }
            })
          })
        } else {
          $el.on('change', function () {
            self.table.search(this.value)
            self.draw()
          })
        }
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

    /**
    * Sets filter width to 100% and deletes label
    * @param {String} $id 
    * @param {String} placeholder 
    */
    setFilterInputMaxWidth(placeholder) {
      const idElement = `#${this.$el.attr('id')}_filter`
      console.log('idelement ', idElement)
      $(`${idElement} > label > input`).each(function () {
        $(this).insertBefore($(this).parent());
      })
      $(`${idElement}`).css('width', '100%')
      $(`${idElement} > input`).css('width', '100%')
      $(`${idElement} > input`).css('float', 'inherit')
      $(`${idElement} > input`).attr('placeholder', placeholder || 'Search')
      $(`${idElement} > label`).text('')
    }

  }




  return table
})