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
  const localStorage = new LocalStorage()

  /**
   * Encapsulates Splunk service functionality
   */
  const indexService = class IndexService {

    /**
     * Delete a record by ID
     */
    static remove() {
      localStorage.clear('selectedIndex')
    }

    /**
     * Select an API by ID
     * @param {String} index 
     */
    static select(index) {
      localStorage.set('selectedIndex',index)
    }

  }

  // Return class
  return indexService
})