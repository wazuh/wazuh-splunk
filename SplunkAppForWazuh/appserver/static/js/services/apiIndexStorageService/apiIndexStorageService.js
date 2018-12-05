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
      } catch (err) {}
    }

    /**
     * Select an API
     * @param {String} API
     */
    setApi(API) {
      try {
        delete this.sessionStorage.selectedAPI
        if (typeof API === 'object') {
          this.sessionStorage.selectedAPI = JSON.stringify(API)
        }
      } catch (error) {}
    }

    /**
     * Returns currently selected API
     * @param {String} API
     */
    getApi() {
      try {
        if (this.sessionStorage.selectedAPI) {
          return JSON.parse(this.sessionStorage.selectedAPI)
        }
      } catch (err) {
        return null
      }
    }

    getExtensions(id) {
      try {
        if (this.sessionStorage.extensions) {
          const currentExtensions = JSON.parse(this.sessionStorage.extensions)
          const result =
            currentExtensions.length >= 1
              ? currentExtensions.filter(item => item.id === id)[0]
              : false
          return result
        }
      } catch (err) {
        return false
      }
    }

    setExtensions(id, extensions) {
      try {
        if (extensions.length && this.sessionStorage.getItem('extensions')) {
          let parsedExtensions = JSON.parse(
            this.sessionStorage.getItem('extensions')
          )
          let existentApi = false
          for (let i = 0; i < parsedExtensions.length; i++) {
            if (parsedExtensions[i].id === id) {
              parsedExtensions[i] = { id: id, ...extensions }
              existentApi = true
              break
            }
          }
          if (!existentApi) {
            parsedExtensions.push({ id: id, ...extensions })
          }
          this.sessionStorage.setItem(
            'extensions',
            JSON.stringify(parsedExtensions) || []
          )
        } else if (extensions) {
          const newSet = []
          newSet.push({ id: id, ...extensions })
          this.sessionStorage.setItem(
            'extensions',
            JSON.stringify(newSet) || []
          )
        }
      } catch (err) {}
    }
  }
  app.service('$apiIndexStorageService', ApiIndexStorageService)
})
