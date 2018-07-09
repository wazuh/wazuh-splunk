"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
  var $ = require('jquery');
  var TableView = require("./tableView.js");
  var ApiService = require("../services/apiService.js");

  var table = function (_TableView) {
    _inherits(TableAgents, _TableView);

    /**
     * Constructor method
     * @param {*} $el: DOM table element to attach the table 
     */
    function TableAgents($el, api) {
      _classCallCheck(this, TableAgents);

      var _this = _possibleConstructorReturn(this, (TableAgents.__proto__ || Object.getPrototypeOf(TableAgents)).call(this));

      _this.generateTableView($el);
      _this.urlData = {
        baseUrl: ApiService.getBaseUrl(),
        ipApi: api.url,
        portApi: api.portapi,
        userApi: api.userapi,
        passApi: api.passapi
      };
      _this.opts = {
        pages: 10,
        processing: true,
        serverSide: true,
        dom: '<"top"f>rt<"bottom"ip>',
        filterVisible: false,
        columns: [{ "data": "id", 'orderable': true, defaultContent: "-" }, { "data": "ip", 'orderable': true, defaultContent: "-" }, { "data": "name", 'orderable': true, defaultContent: "-" }, { "data": "status", 'orderable': true, defaultContent: "-" }, { "data": "os-platform", 'orderable': true, defaultContent: "-" }, { "data": "os-uname", 'orderable': true, defaultContent: "-" }, { "data": "os-name", 'orderable': true, defaultContent: "-" }, { "data": "os-arch", 'orderable': false, defaultContent: "-" }, { "data": "os-version", 'orderable': true, defaultContent: "-" }, { "data": "dateAdd", 'orderable': false, defaultContent: "-" }, { "data": "lastKeepAlive", 'orderable': false, defaultContent: "-" }, { "data": "last_rootcheck", 'orderable': false, defaultContent: "-" }, { "data": "last_syscheck", 'orderable': false, defaultContent: "-" }, { "data": "version", 'orderable': false, defaultContent: "-" }]
      };
      return _this;
    }

    /**
     * Gets the options
     * @returns {Object} The table options
     */


    _createClass(TableAgents, [{
      key: "getOpts",
      value: function getOpts() {
        return this.opts;
      }

      /**
       * Sets the options
       * @param {Object} opts 
       */

    }, {
      key: "setOpts",
      value: function setOpts(opts) {
        this.opts = opts;
      }

      /**
       * Generates HTML table code and append it into the element passed
       * @param {*} jQuery element  
       */

    }, {
      key: "generateTableView",
      value: function generateTableView($element) {
        $element.html('<table id="myAgentTable" class="display wz-width-100"><thead><tr><th>id</th><th>ip</th><th>name</th><th>status</th><th>os-platform</th><th>os-uname</th><th>os-name</th><th>os-arch</th><th>os-version</th><th>dateAdd</th><th>lastKeepAlive</th><th>last_rootcheck</th><th>last_syscheck</th><th>version</th></tr></thead></table>');
        _get(TableAgents.prototype.__proto__ || Object.getPrototypeOf(TableAgents.prototype), "element", this).call(this, $('#myAgentTable'));
      }

      /**
       * Generates a dropdown that filters by column
       * @param {Array} options Array of options
       * @param {Number} column Column to filter
       * @param {Number} width Width that the element will have
       * @param {String} position Position that the element will have. Default:inherit. Values [left/right]
       */

    }, {
      key: "generateDropdownFilter",
      value: function generateDropdownFilter(options, width, position, column) {
        _get(TableAgents.prototype.__proto__ || Object.getPrototypeOf(TableAgents.prototype), "generateDropdownFilter", this).call(this, options, width, position, column);
      }

      /**
        * Sets DataTables native filter position, width and deletes label
        * @param {String} placeholder Text to show inside the input
        * @param {String} width The width of the element
        * @param {String} position Position [left/right]
        */

    }, {
      key: "setFilterInputMaxWidth",
      value: function setFilterInputMaxWidth(placeholder, width, position) {
        _get(TableAgents.prototype.__proto__ || Object.getPrototypeOf(TableAgents.prototype), "setFilterInputMaxWidth", this).call(this, placeholder, width, position);
      }

      /**
       * Build: generates and draws an agents datatable
       * @param {*} urlArg : url to get the data from
       * @param {Object} opt: options
       */

    }, {
      key: "build",
      value: function build(options) {
        var url = '/agents/agents?ip=' + this.urlData.ipApi + '&port=' + this.urlData.portApi + '&user=' + this.urlData.userApi + '&pass=' + this.urlData.passApi;
        if (options) {
          this.opts = Object.assign(this.opts, options);
        }
        _get(TableAgents.prototype.__proto__ || Object.getPrototypeOf(TableAgents.prototype), "build", this).call(this, url, this.opts);
      }
    }]);

    return TableAgents;
  }(TableView);

  return table;
});