/*
 * Wazuh app - Splunk Credential service
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
  const mvc = require('splunkjs/mvc')
  const LocalStorage = require('./localStorage.js')
  const service = mvc.createService({ owner: "nobody" })
  const ApiService = require('./apiService.js')
  const IndexService = require('./indexService.js')

  /**
   * Encapsulates Splunk service functionality
   */
  const credentialService = class CredentialService {

    /**
     * GET method
     * @param {String} url 
     */
    static get(url) {
      return new Promise((resolve, reject) => {
        service.request(url, "GET", null, null, null, { "Content-Type": "application/json" }, (err, data) => {
          if (err)
            return reject(err)
          resolve(data.data)
        })
      })
    }

    /**
     * POST method
     * @param {String} url 
     * @param {Object} record 
     */
    static post(url, record) {
      return new Promise((resolve, reject) => {
        service.request(url, "POST", null, null, JSON.stringify(record), { "Content-Type": "application/json" }, (err, data) => {
          if (err)
            return reject(err)
          return resolve(data)
        })
      })
    }

    /**
     * DELETE method
     * @param {String} url 
     */
    static delete(url) {
      if (!url || url === '') {
        url = "storage/collections/data/credentials/"
      }
      return new Promise((resolve, reject) => {
        service.del(url, {}, (err, data) => {
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
    static async update(key, newRegister) {
      try {
        await CredentialService.post("storage/collections/data/credentials/" + key, newRegister)
        return
      } catch (err) {
        return Promise.reject(err)
      }
    }

    // -------- CRUD METHODS ------------ //

    /**
     * Delete a record by ID
     * @param {String} key 
     */
    static async remove(key) {
      try {
        const api = await CredentialService.select(key)
        if (api.selected) {
          LocalStorage.clear('selectedApi')
        }
        await CredentialService.delete("storage/collections/data/credentials/" + key)
        return
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Select an API by ID
     * @param {String} key 
     */
    static async select(key) {
      try {
        const manager = await CredentialService.get("storage/collections/data/credentials/" + key)
        return manager
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Select an API as the default one, 'selected' field to true by ID
     * @param {String} key 
     */
    static async chose(key) {
      try {
        const apiList = await CredentialService.getApiList()
        for (let api of apiList) {
          if (api._key === key) {
            const manager = api
            manager.selected = true
            await CredentialService.update(api._key, manager)
            LocalStorage.clear('selectedApi')
            LocalStorage.set('selectedApi', JSON.stringify(api))
          } else {
            api.selected = false
            await CredentialService.update(api._key, api)
          }
        }
        return
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Deselect all stored APIs. 'selected' field to false.
     * @param {String} key 
     */
    static async deselectAllApis() {
      try {
        const apiList = await CredentialService.getApiList()
        for (let api of apiList) {
          if (api.selected) {
            const manager = api
            manager.selected = false
            await CredentialService.update(api._key, manager)
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
    static async insert(record) {
      try {
        await CredentialService.post("storage/collections/data/credentials/", record)
        return
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Load API credential data and generates a Base URL
     */
    static async getApiList() {
      try {
        const apiList = await CredentialService.get("storage/collections/data/credentials/")
        return apiList
      } catch (err) {
        console.error("getApiList", err.message || err)
        return Promise.reject(err)
      }
    }

    /**
     * Check if connection with selected API was successful
     * @param {Object} apiList 
     */
    static async checkSelectedApiConnection() {
      try {
        const currentApi = LocalStorage.get('selectedApi')
        if (!currentApi) throw new Error('No selected API in LocalStorage')
        const api = await CredentialService.checkApiConnection(JSON.parse(currentApi)._key)
        let selectedIndex = IndexService.get()
        if (!selectedIndex || selectedIndex === '') {
          selectedIndex = '*'
        }
        return { api, selectedIndex }
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Check if connection with API was successful, also returns the whole needed information about it
     * @param {String} key 
     */
    static async checkApiConnection(key) {
      try {
        const api = await CredentialService.select(key)
        const checkConnectionEndpoint = '/manager/check_connection?ip=' + api.url + '&port=' + api.portapi + '&user=' + api.userapi + '&pass=' + api.passapi
        const getClusterNameEndpoint = '/cluster/node?ip=' + api.url + '&port=' + api.portapi + '&user=' + api.userapi + '&pass=' + api.passapi
        const getManagerNameEndpoint = '/agents/agent/?id=000&ip=' + api.url + '&port=' + api.portapi + '&user=' + api.userapi + '&pass=' + api.passapi
        const clusterData = await ApiService.get(checkConnectionEndpoint)
        console.log('clusterData enabled:', clusterData.data.enabled)
        api.filter = []
        // If cluster is disabled, then filter by manager.name
        if (clusterData.data.enabled === "yes") {
          api.filter.push('cluster.name')
          const clusterName = await ApiService.get(getClusterNameEndpoint)
          console.log('cluster.cluster mode',clusterName)

          api.filter.push(clusterName.data.cluster)
        } else {
          api.filter.push('manager.name')
          const managerName = await ApiService.get(getManagerNameEndpoint)
          console.log('manager.name mode',managerName)

          api.filter.push(managerName.data[0].name)
        }

        return api
      } catch (err) {
        console.error("checkApiConnection", err.message || err)
        return Promise.reject(err)
      }
    }
  }

  // Return class
  return credentialService
})