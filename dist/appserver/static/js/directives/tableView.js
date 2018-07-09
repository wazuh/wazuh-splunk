'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
  var $ = require('jquery');
  var ApiService = require('../services/apiService.js');
  var tableLib = require("https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js");

  // Exportable DataTable class
  var table = function () {

    /**
     * Constructor method
     * @param {*} $el: DOM table element to attach the table 
     */
    function DataTable() {
      _classCallCheck(this, DataTable);

      this.$el = '';
      this.elementName = '';
      this.idFilter = '';
      this.table = '';
      $.fn.dataTable.ext.errMode = 'throw';
      // this.$el.DataTable({"retrieve": true}) 
    }

    /**
     * Attaches an element to a table
     * @param {jQuery}  
     */


    _createClass(DataTable, [{
      key: 'element',
      value: function element($el) {
        this.$el = $el;
        this.idFilter = '#' + this.$el.attr('id') + '_filter';
        this.elementName = String($el);
      }
      /**
       * Build: generates and draws a datatable
       * @param {*} urlArg : url to get the data from
       * @param {Object} opt: options
       */

    }, {
      key: 'build',
      value: function build(urlArg, opt) {
        try {
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
              dataFilter: function dataFilter(data) {
                var json = JSON.parse(data);
                json.recordsTotal = json.data.totalItems;
                json.recordsFiltered = json.data.totalItems;
                json.data = json.data.items;
                return JSON.stringify(json); // return JSON string
              },
              data: {
                filters: opt.filters || {},
                search: opt.search || {}
              }
            },
            'dom': opt.dom || '<"top">rt<"bottom"ip>',
            'columns': opt.columns,
            'error': function error(xhr, _error, thrown) {
              return Promise.reject(_error);
            }
          });
          // this.table.draw()
        } catch (err) {
          return Promise.reject(err);
        }
      }
    }, {
      key: 'draw',
      value: function draw() {
        this.table.draw();
      }

      /**
      * Sets DataTables native filter position, width and deletes label
      * @param {String} placeholder Text to show inside the input
      * @param {String} width The width of the element
      * @param {String} position Position [left/right]
      */

    }, {
      key: 'setFilterInputMaxWidth',
      value: function setFilterInputMaxWidth(placeholder, width, position) {
        var idElement = this.idFilter;
        var alignment = position || 'inherit';
        $(idElement + ' > label > input').each(function () {
          $(this).insertBefore($(this).parent());
        });
        $('' + idElement).css('width', '100%');
        $(idElement + ' > input').css('width', width + '%');
        $(idElement + ' > input').css('float', '' + alignment);
        $(idElement + ' > input').attr('placeholder', placeholder);
        $(idElement + ' > label').text('');
      }

      /**
       * Performs a search and filter by column from a dropdown
       * @param {jQuery} $el 
       * @param {Number} idColumn the column to filter
       */

    }, {
      key: 'dropdownSearch',
      value: function dropdownSearch($el, idColumn) {
        try {
          var self = this;
          if (idColumn && typeof idColumn === 'number' && idColumn > 0) {
            $el.on('change', function () {
              var currentOption = this;
              self.table.columns().every(function () {
                var column = this;
                if (idColumn === column['0']['0']) {
                  if (column.search() !== currentOption.value) {
                    column.search(currentOption.value);
                    self.draw();
                  }
                }
              });
            });
          } else {
            $el.on('change', function () {
              self.table.search(this.value);
              self.draw();
            });
          }
        } catch (err) {
          return Promise.reject(err);
        }
      }

      /**
       * Generates a random ID
       * @returns {String} The generated ID
       */

    }, {
      key: 'makeId',
      value: function makeId() {
        var text = '';
        var possible = 'abcdefghijklmnopqrstuvwxyz';
        for (var i = 0; i < 5; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }return text;
      }

      /**
       * Generates a dropdown that filters by column
       * @param {Array} options Array of options
       * @param {Number} column Column to filter
       * @param {Number} width Width that the element will have
       * @param {String} position Position that the element will have. Default:inherit. Values [left/right]
       */

    }, {
      key: 'generateDropdownFilter',
      value: function generateDropdownFilter(options, width, position, column) {
        var opts = '';
        var randomId = this.makeId();
        var alignment = position || 'right';
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var option = _step.value;

            opts += '<option value="' + option + '">' + option + '</option>';
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var dropDown = '<select style="float:' + alignment + '; width:' + width + '%;" class="wz-margin-left-5" id=' + randomId + '>' + opts + '</select>';
        $(this.idFilter).prepend(dropDown);
        this.dropdownSearch($('#' + randomId), column);
        return;
      }

      /**
       * Click: perform a click in a row
       * @param {Function} callback
       */

    }, {
      key: 'click',
      value: function click(cb) {
        try {
          var myThis = this;
          this.$el.on('click', 'tr', function () {
            cb(myThis.table.row(this).data());
          });
        } catch (err) {
          return Promise.reject(err);
        }
      }
    }]);

    return DataTable;
  }();

  return table;
});