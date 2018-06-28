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
      this.idFilter = ''
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
      this.idFilter = `#${this.$el.attr('id')}_filter`
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
    * Sets DataTables native filter position, width and deletes label
    * @param {String} placeholder Text to show inside the input
    * @param {String} width The width of the element
    * @param {String} position Position [left/right]
    */
    setFilterInputMaxWidth(placeholder, width, position) {
      const idElement = this.idFilter
      const alignment = position || `inherit`
      console.log('idelement ', idElement)
      $(`${idElement} > label > input`).each(function () {
        $(this).insertBefore($(this).parent());
      })
      $(`${idElement}`).css('width', '100%')
      $(`${idElement} > input`).css('width', `${width}%`)
      $(`${idElement} > input`).css('float', `${alignment}`)
      $(`${idElement} > input`).attr('placeholder', placeholder)
      $(`${idElement} > label`).text('')
    }


    /**
     * Performs a search and filter by column from a dropdown
     * @param {jQuery} $el 
     * @param {Number} idColumn the column to filter
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
     * Generates a random ID
     * @returns {String} The generated ID
     */
    makeId() {
      let text = ''
      const possible = 'abcdefghijklmnopqrstuvwxyz'
      for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      return text
    }

    /**
     * Generates a 
     * @param {Array} options Array of options
     * @param {Number} column Column to filter
     * @param {Number} width Width that the element will have
     * @param {String} position Position that the element will have. Default:inherit. Values [left/right]
     */
    generateDropdownFilter(options, width, position, column) {
      let opts = ''
      const randomId = this.makeId()
      const alignment = position || `right`
      console.log('id of dropdown ',randomId)
      for (let option of options)
        opts += `<option value="${option}">${option}</option>`
      const dropDown = `<select style="float:${alignment}; width:${width}%;" class="wz-margin-left-5" id=${randomId}>${opts}</select>`
      console.log('the new dropdown ',dropDown)
      $(this.idFilter).prepend(dropDown)
      this.dropdownSearch($(`#${randomId}`),column)
      return
    }

    /**
     * Click: perform a click in a row
     * @param {Function} callback
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