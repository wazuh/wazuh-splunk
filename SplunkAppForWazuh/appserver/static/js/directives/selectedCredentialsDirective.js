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
  const $ = require('jquery')
  const LocalStorage = require('../services/localStorage.js')
  const IndexService = require('../services/indexService.js')
  const ApiService = require('../services/apiService.js')

  /**
   * Directive which renders current selected API and Index
   */
  const selectedCredentials = class SelectedCredentials {

    /**
     * Renders HTML code into the passed element
     * @param {jQuery}  
     */
    static render($el,name) {
      $el.append('<div><p><i class="wz-color-orange fa fa-fw fa-star font-size-18" aria-hidden="true"></i>' + name + ' - ' + IndexService.get() + '</p></div>')
    }
  }

  return selectedCredentials
})