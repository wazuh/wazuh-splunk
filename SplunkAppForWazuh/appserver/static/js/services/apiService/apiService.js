define(['../module'], function (module) {
  'use strict'

  module.service('$apiService', function ($http) {
    /**
   * Generated and returns the browser base URL + Splunk Port
   */
    const getBaseUrl = () => {
      const url = window.location.href
      const arr = url.split("/")
      return arr[0] + "//" + arr[2]
    }

    /**
     * Generated and returns the browser base URL + Splunk Port
     */
    const getWellFormedUri = (endpoint) => {
      return getBaseUrl() + '/custom/SplunkAppForWazuh/' + endpoint
    }

    /**
     * GET method
     * @param {String} url 
     */
    const get = async (endpoint) => {
      try {
        let result = await $http.get(getWellFormedUri(endpoint))
        if (result && typeof result !== 'object') {
          result = JSON.parse(result)
          if (result.data.error) {
            throw new Error('Error from backend: ' + result.data.error)
          }
        } else if (result.data.error) {
          throw new Error('Error from backend: ' + result.data.error)
        }
        return result
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * POST method
     * @param {String} url 
     * @param {Object} payload 
     */
    const post = async (endpoint, payload) => {
      try {
        return await $http.post(getWellFormedUri(endpoint), payload)
      } catch (err) {
        return Promise.reject(err)
      }
    }

    const service = {
      post: post,
      get: get,
      getBaseUrl: getBaseUrl,
      getWellFormedUri: getWellFormedUri
    }
    return service
  })
})