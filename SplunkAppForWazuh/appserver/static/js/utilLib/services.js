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
  const LocalStorage = require('./localStorage.js')

  /**
   * Encapsulates Splunk service functionality
   */
  const service = class Service {
    constructor() {
      this.service = mvc.createService({ owner: "nobody" })
      this.localStorage = new LocalStorage()
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
        const api = await this.select(key)
        if (api.selected) {
          localStorage.clear('selectedApi')
        }
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
     * Select an API as the default one, 'select' field to true
     * @param {String} key 
     */
    async chose(key) {
      try {
        const { apiList } = await this.loadCredentialData()
        console.log('starting invalidating array of apiList ', apiList)
        for (let api of apiList) {
          if (api._key === key) {
            const manager = api
            manager.selected = true
            console.log('validating ', api)
            await this.update(api._key, manager)
            localStorage.clear('selectedApi')
            localStorage.setItem('selectedApi',JSON.stringify(api))
          } else {
            console.log('invalidating ', api)
            api.selected = false
            await this.update(api._key, api)
          }
        }
        return 
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
        const apiList = await this.get("storage/collections/data/credentials/")
        const url = window.location.href
        const arr = url.split("/")
        const baseUrl = arr[0] + "//" + arr[2]
        return { baseUrl, apiList }
      } catch (err) {
        console.error("loadCredentialData", err.message || err)
        return Promise.reject(err)
      }
    }

    /**
     * Check if connection with selected API was successful
     * @param {Object} apiList 
     */
    async checkConnection() {
      try {
        const currentApi = this.localStorage.get('selectedApi')
        if(!currentApi) throw new Error('No API')
        const apiInJsonFormat = JSON.parse(currentApi)
        await this.checkApiConnection(apiInJsonFormat._key)
        return apiInJsonFormat
      } catch (err) {
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
        const { baseUrl, apiList } = await this.loadCredentialData()
        const endpoint = baseUrl + '/custom/SplunkAppForWazuh/manager/check_connection?ip=' + manager.url + '&port=' + manager.portapi + '&user=' + manager.userapi + '&pass=' + manager.passapi
        await asyncReq.promisedGet(endpoint)
        return
      } catch (err) {
        console.error("checkApiConnection", err.message || err)
        return Promise.reject(err)
      }
    }
  }

  // Return class
  return service
})