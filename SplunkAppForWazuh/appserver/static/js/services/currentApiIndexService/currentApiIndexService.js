define(['../module'], function (module) {
  'use strict'

  module.service('$currentApiIndexService', function () {

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
    const setAPI = (API) => {
      delete sessionStorage.selectedAPI
      if (typeof API === 'object')
        sessionStorage.selectedAPI = JSON.stringify(API)
    }

    /**
     * Returns currently selected API
     * @param {String} API 
     */
    const getAPI = () => {
      if (sessionStorage.selectedAPI)
        return JSON.parse(sessionStorage.selectedAPI)
      else
        return null
    }

    /**
     * Returns currently selected API
     * @param {String} API 
     */
    const getClusterInfo = () => {
      if (sessionStorage && sessionStorage.selectedAPI && typeof sessionStorage.selectedAPI === 'string' && JSON.parse(sessionStorage.selectedAPI) && JSON.parse(sessionStorage.selectedAPI).cluster) {
        return getAPI().cluster
      }
      else
        return null
    }

    /**
     * Returns the API filter (manager.name / cluster.name)
     */
    const getFilter = () => {
      if (sessionStorage.selectedAPI && typeof sessionStorage.selectedAPI === 'string') {
        return getAPI().filter
      } else {
        return null
      }
    }

    return {

      removeIndex: removeIndex,

      setIndex: setIndex,

      getIndex: getIndex,

      removeAPI: removeAPI,

      setAPI: setAPI,

      getAPI: getAPI,

      getClusterInfo: getClusterInfo,

      getFilter: getFilter

    }

  })
})