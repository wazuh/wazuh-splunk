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
  const asyncReq = require('./promisedReq.js')
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
            resolve(data.data)
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

    /**
     * Update a record
     * @param {String} key 
     */
    async update(key, newRegister) {
      try {
        await this.post("storage/collections/data/credentials/" + key, newRegister)
        return
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Delete a record
     * @param {String} key 
     */
    async remove(key) {
      try {
        await this.delete("storage/collections/data/credentials/" + key)
        return
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Select an API by ID
     * @param {String} key 
     */
    async select(key) {
      try {
        const manager = await this.get("storage/collections/data/credentials/" + key)
        return manager
      } catch (err) {
        return Promise.reject(err)
      }     
    }

    /**
     * Select an API by ID
     * @param {String} key 
     */
    async chose(key) {
      try {
        let manager = await this.select(key)
        manager.selected = true
        this.update(key,manager)
        return manager
      } catch (err) {
        return Promise.reject(err)
      }     
    }

    /**
     * Insert a new record in the KVstore DB
     * @param {Object} record 
     */
    async insert(record) {
      try {
        await this.post("storage/collections/data/credentials/", record)
        return
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Load API credential data and generates a Base URL
     */
    async loadCredentialData() {
      try {
        const jsonData = await this.get("storage/collections/data/credentials/")
        const url = window.location.href
        const arr = url.split("/")
        const baseUrl = arr[0] + "//" + arr[2]
        return { baseUrl, jsonData }
      } catch (err) {
        console.error("loadCredentialData", err.message || err)
        return Promise.reject(err)
      }
    }

    /**
     * Check if connection with API was successful
     * @param {Object} jsonData 
     */
    async checkConnection() {
      try {
        const { baseUrl, jsonData } = await this.loadCredentialData()
        const selectedApi = jsonData.filter(item => !item.selected)[0]
        const endpoint = baseUrl + '/custom/SplunkAppForWazuh/manager/check_connection?ip=' + jsonData.url + '&port=' + jsonData.portapi + '&user=' + jsonData.userapi + '&pass=' + jsonData.passapi
        const parsedData = await asyncReq.promisedGet(endpoint)
        return
      } catch (err) {
        console.error("checkConnection", err.message || err)
        return Promise.reject(err)
      }
    }

    /**
     * Check if connection with API was successful
     * @param {String} key 
     */
    async checkApiConnection(key) {
      try {
        const manager = await this.select(key)
        const { baseUrl, jsonData } = await this.loadCredentialData()
        const endpoint = baseUrl + '/custom/SplunkAppForWazuh/manager/check_connection?ip=' + manager.url + '&port=' + manager.portapi + '&user=' + manager.userapi + '&pass=' + manager.passapi
        await asyncReq.promisedGet(endpoint)
        return
      } catch (err) {
        console.error("checkConnection", err.message || err)
        return Promise.reject(err)
      }
    }
  }

  // Return class
  return service
})