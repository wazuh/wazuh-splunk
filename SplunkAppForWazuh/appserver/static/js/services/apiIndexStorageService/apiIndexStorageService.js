define(['../module'], function (module) {
  'use strict'

  module.service('$apiIndexStorageService', function () {

    /**
     * Removes the selected index
     */
    const removeIndex = () => {
      delete sessionStorage.selectedIndex
    }

    /**
     * Select an Index by name
     * @param {String} index 
     */
    const setIndex = (index) => {
      sessionStorage.selectedIndex = `{"index":"${index}"}`
    }

    /**
     * Returns currently selected index
     * @param {String} index 
     */
    const getIndex = () => {
      if (sessionStorage.selectedIndex)
        return JSON.parse(sessionStorage.selectedIndex)
      else
        return { "index": "wazuh" }
    }

    /**
    * Delete selected API
    */
    const removeAPI = () => {
      delete sessionStorage.selectedAPI
    }

    /**
     * Select an API
     * @param {String} API 
     */
    const setApi = (API) => {
      delete sessionStorage.selectedAPI
      if (typeof API === 'object')
        sessionStorage.selectedAPI = JSON.stringify(API)
    }

    /**
     * Returns currently selected API
     * @param {String} API 
     */
    const getApi = () => {
      if (sessionStorage.selectedAPI)
        return JSON.parse(sessionStorage.selectedAPI)
      else
        return null
    }


    return {

      removeIndex: removeIndex,

      setIndex: setIndex,

      getIndex: getIndex,

      removeAPI: removeAPI,

      setApi: setApi,

      getApi: getApi

    }

  })
})