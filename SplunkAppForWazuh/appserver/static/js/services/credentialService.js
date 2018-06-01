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
            LocalStorage.clear('selectedApi')
            LocalStorage.set('selectedApi', JSON.stringify(api))
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
        LocalStorage.clear('selectedApi')
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
        const result = await CredentialService.post("storage/collections/data/credentials/", record)
        return result
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
        for(let i=0 ; i<apiList.length; i++) {
          if (apiList[i].url === LocalStorage.get('selectedApi').url) {
            apiList[i].selected = true
          }
        }
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
        console.error('error at checkselectedapiconnection', err.message || err)
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

        api.filter = []
        // Get manager name. Necessary for both cases
        const managerName = await ApiService.get(getManagerNameEndpoint)
        if (managerName && managerName.data && managerName.data.length > 0 && managerName.data[0].name ) {
          if (!api.managerName || api.managerName !== managerName.data[0].name ) {
            api.managerName = managerName.data[0].name
            await CredentialService.update(api._key, api)
          }
        }

        // If cluster is disabled, then filter by manager.name
        if (clusterData.data.enabled === "yes") {
          api.filter.push('cluster.name')
          const clusterName = await ApiService.get(getClusterNameEndpoint)
          api.filter.push(clusterName.cluster)
          if (!api.cluster || api.cluster !== clusterName.cluster) {
            api.cluster = clusterName.cluster
            await CredentialService.update(api._key, api)
          }
        } else {
          if(api.cluster) {
            api.cluster = false
            await CredentialService.update(api._key, api)
          }
          api.filter.push('manager.name')
          api.filter.push(api.managerName)
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