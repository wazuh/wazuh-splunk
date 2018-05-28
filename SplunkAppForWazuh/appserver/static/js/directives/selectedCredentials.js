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
   * Directive for rendering current selected API and Index
   */
  const selectedCredentials = class SelectedCredentials {

    /**
     * Returns the curren API credentials stored in LocalStorage
     * @returns {String} the IP of the API
     */
    static getSelectedApi() {
      return JSON.parse(LocalStorage.get('selectedApi')).url
    }

    /**
     * Returns the curren API credentials stored in LocalStorage
     * @returns {String} Current index
     */
    static getSelectedIndex() {
      return LocalStorage.get('selectedIndex')
    }

    /**
     * Renders HTML code into the passed element
     * @param {jQuery}  
     */
    static render($el) {
      $el.append('<div class="wz-flex-container wz-flex-row wz-flex-align-space-between"><div><h4>Current API: </h4><p>' + SelectedCredentials.getSelectedApi() + '</p><h4>Index: </h4><p>' + SelectedCredentials.getSelectedIndex() + '.</p></div></div>')
    }
  }

  return selectedCredentials
})