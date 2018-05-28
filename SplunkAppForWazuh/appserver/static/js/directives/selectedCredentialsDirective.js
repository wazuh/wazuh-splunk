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

  /**
   * Directive which renders current selected API and Index
   */
  const selectedCredentials = class SelectedCredentials {

    /**
     * Renders HTML code into the passed element
     * @param {jQuery}  
     */
    static render($el) {
      $el.append('<div class="wz-flex-container wz-flex-row wz-flex-align-space-between"><div><h4>Current API: </h4><p>' + JSON.parse(LocalStorage.get('selectedApi')).url + '</p><h4>Index: </h4><p>' + LocalStorage.get('selectedIndex') + '.</p></div></div>')
    }
  }

  return selectedCredentials
})