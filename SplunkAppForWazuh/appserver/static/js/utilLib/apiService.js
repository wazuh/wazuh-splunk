/*
 * Wazuh app - Splunk API Service factory
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
  const asyncReq = require('./promisedReq.js')

  /**
   * Encapsulates Splunk service functionality
   */
  const apiService = class ApiService {

    /**
     * Generated and returns the browser base URL + Splunk Port
     */
    static getBaseUrl() {
      const url = window.location.href
      const arr = url.split("/")
      return arr[0] + "//" + arr[2]
    }

    /**
     * GET method
     * @param {String} url 
     */
    static async get(endpoint) {
      try {
        return await asyncReq.promisedGet(ApiService.getBaseUrl() + '/custom/SplunkAppForWazuh/' + endpoint)
      } catch (err) {
        return Promise.reject(err)
      }
    }

  }

  // Return class
  return apiService
})