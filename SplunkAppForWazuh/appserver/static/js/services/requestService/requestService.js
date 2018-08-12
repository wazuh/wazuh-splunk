define(['../module'], function (module) {
  'use strict'

  module.service('$requestService', function ($http, $apiIndexStorageService, $q) {
    /**
     * Generated and returns the browser base URL + Splunk Port
     */
    const getBaseUrl = () => {
      const url = window.location.href
      const arr = url.split("/")
      return arr[0] + "//" + arr[2]
    }

    /**
     * Generates and returns the browser base URL + Splunk Port
     */
    const getWellFormedUri = (endpoint, includedApi) => {
      if (!includedApi) {
        const jsonCurrentAPI = $apiIndexStorageService.getApi()
        return getBaseUrl() + `/custom/SplunkAppForWazuh/${endpoint}?ip=${jsonCurrentAPI.url}&port=${jsonCurrentAPI.portapi}&user=${jsonCurrentAPI.userapi}&pass=${jsonCurrentAPI.passapi}`
      } else {
        return getBaseUrl() + '/custom/SplunkAppForWazuh/' + endpoint
      }
    }

    /**
     * Performs a HTTP request
     * @param {String} method 
     * @param {String} endpoint 
     * @param {Boolean} includedApi 
     * @param {Object} payload 
     */
    const httpReq = async (method, endpoint, includedApi, payload = {}) => {
      try {
        if (!method || !endpoint) {
          throw new Error('Missing parameters')
        }
        const tmpUrl = getWellFormedUri(endpoint, includedApi)
        const data = {};
        if (method === "GET") Object.assign(data, await $http.get(tmpUrl, { params: payload }))
        if (method === "PUT") Object.assign(data, await $http.put(tmpUrl, payload))
        if (method === "POST") Object.assign(data, await $http.post(tmpUrl, payload))
        if (method === "DELETE") Object.assign(data, await $http.delete(tmpUrl))
        if (!data) {
          throw new Error(`Error doing a request to ${tmpUrl}, method: ${method}.`)
        }
        if (data.error && data.error !== '0') {
          throw new Error('HTTP error from server: ', data.error);
        }
        return $q.resolve(data);
      } catch (error) {
        return $q.reject(error);
      }
    }

    /**
     * Performs a GET request to Wazuh API
     * @param {String} endpoint 
     * @param {Object} opts 
     */
    const apiReq = async (endpoint, opts) => {
      try {
        const payload = {}
        Object.assign(payload, { endpoint: endpoint })
        if (opts && typeof opts === 'object') {
          Object.assign(payload, opts)
        }
        return await httpReq('GET', '/api/request', false, payload)
      } catch (err) {
        return Promise.reject(err)
      }
    }

    const service = {
      getBaseUrl: getBaseUrl,
      getWellFormedUri: getWellFormedUri,
      apiReq: apiReq,
      httpReq: httpReq
    }
    return service
  })
})