/*
 * Wazuh app - Splunk Index service
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
  const LocalStorage = require('./localStorage.js')

  /**
   * Encapsulates Splunk service functionality
   */
  const indexService = class IndexService {

    /**
     * Delete selected index
     */
    static remove() {
      LocalStorage.clear('selectedIndex')
    }

    /**
     * Select an Index by name
     * @param {String} index 
     */
    static select(index) {
      LocalStorage.set('selectedIndex', index)
    }

    /**
     * Returns currently selected index
     * @param {String} index 
     */
    static get() {
      return LocalStorage.get('selectedIndex')
    }

  }

  // Return class
  return indexService
})