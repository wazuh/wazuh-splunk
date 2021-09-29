define(['../module'], function(app) {
  'use strict'

  class ApiIndexStorageService {
    constructor() {
      this.sessionStorage = sessionStorage
    }

    /**
     * Removes the selected index
     */
    removeIndex() {
      delete this.sessionStorage.selectedIndex
    }

    /**
     * Select an Index by name
     * @param {String} index
     */
    setIndex(index) {
      this.sessionStorage.selectedIndex = `{"index":"${index}"}`
    }

    /**
     * Returns currently selected index
     * @param {String} index
     */
    getIndex() {
      if (this.sessionStorage.selectedIndex) {
        return JSON.parse(this.sessionStorage.selectedIndex)
      } else return { index: 'wazuh' }
    }

    /**
     * Delete selected API
     */
    removeAPI() {
      try {
        delete this.sessionStorage.selectedAPI
      } catch (err) {
        return
      }
    }

    /**
     * Select an Api
     * @param {String} Api
     */
    setApi(Api) {
      try {
        delete this.sessionStorage.selectedAPI
        if (typeof Api === 'object') {
          this.sessionStorage.selectedAPI = JSON.stringify(Api)
        }
      } catch (error) {
        return
      }
    }

    /**
     * Returns currently selected Api
     * @param {String} Api
     */
    getApi() {
      try {
        if (this.sessionStorage.selectedAPI) {
          return JSON.parse(this.sessionStorage.selectedAPI)
        }
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
  app.service('$apiIndexStorageService', ApiIndexStorageService)
})
