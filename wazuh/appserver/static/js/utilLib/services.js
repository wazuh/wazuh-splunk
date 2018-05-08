/*
 * Wazuh app - Splunk services factory
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
  const mvc = require('splunkjs/mvc')

  /**
   * Encapsulates Splunk service functionality
   */
  const service = class Service {
    constructor() {
      this.service = mvc.createService({ owner: "nobody" })
    }

    /**
     * GET method
     * @param {String} url 
     */
    get(url) {
      return new Promise((resolve, reject) => {
        this.service.request(
          url,
          "GET",
          null,
          null,
          null,
          { "Content-Type": "application/json" }, (err, data) => {
            if (err)
              return reject(err)
            resolve(data)
          }
        )
      })
    }

    /**
     * POST method
     * @param {String} url 
     * @param {Object} record 
     */
    post(url, record) {
      return new Promise((resolve, reject) => {
        this.service.request(
          url,
          "POST",
          null,
          null,
          JSON.stringify(record),
          { "Content-Type": "application/json" }, (err, data) => {
            if (err)
              return reject(err)
            return resolve(data)
          }
        )
      })
    }

    /**
     * DELETE method
     * @param {String} url 
     */
    delete(url) {
      return new Promise((resolve, reject) => {

        this.service.del(url, {}, (err, data) => {
          if (err) {
            return reject(err)
          }
          return resolve(data)
        })
      })
    }
  }
  return service
})