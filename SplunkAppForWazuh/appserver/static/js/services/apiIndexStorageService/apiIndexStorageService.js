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
        const newExtensions = Object.assign(extensions, {id})
        if (extensions.length && this.sessionStorage.getItem('extensions')) {
          let parsedExtensions = JSON.parse(
            this.sessionStorage.getItem('extensions')
          )
          let existentApi = false
          for (let i = 0; i < parsedExtensions.length; i++) {
            if (parsedExtensions[i].id === id) {
              parsedExtensions[i] = newExtensions //eslint-disable-line
              existentApi = true
              break
            }
          }
          if (!existentApi) {
            parsedExtensions.push(newExtensions)
          }
          this.sessionStorage.setItem(
            'extensions',
            JSON.stringify(parsedExtensions) || []
          )
        } else if (extensions) {
          const newSet = []
          newSet.push(newExtensions)
          this.sessionStorage.setItem(
            'extensions',
            JSON.stringify(newSet) || []
          )
        }
      } catch (err) {
        return
      }
    }
  }
  app.service('$apiIndexStorageService', ApiIndexStorageService)
})
