'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Wazuh app - Selected Credential directive
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
  var LocalStorage = require('../services/localStorage.js');
  var IndexService = require('../services/indexService.js');
  var ApiService = require('../services/apiService.js');

  /**
   * Directive which renders current selected API and Index
   */
  var selectedCredentials = function () {
    function SelectedCredentials() {
      _classCallCheck(this, SelectedCredentials);
    }

    _createClass(SelectedCredentials, null, [{
      key: 'render',


      /**
       * Renders HTML code into the passed element
       * @param {jQuery}  
       */
      value: function render($el, name) {
        $el.append('<div><p><i class="wz-color-orange fa fa-fw fa-star font-size-18" aria-hidden="true"></i>' + name + ' - ' + IndexService.get() + '</p></div>');
      }
    }]);

    return SelectedCredentials;
  }();

  return selectedCredentials;
});