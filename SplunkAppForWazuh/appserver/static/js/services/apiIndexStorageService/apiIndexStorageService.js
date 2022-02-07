define(['../module'], function (app) {
  'use strict'

  class ApiIndexStorageService {
    constructor($notificationService) {
      this.sessionStorage = sessionStorage
      this.notification = $notificationService
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
      } catch (error) {
        this.notification.showErrorToast(
          'Error removing API:' + (error.message || error)
        )
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
        this.notification.showErrorToast(
          'Error selecting API: ' + (error.message || error)
        )
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

    getExtensionKey(apiId) {
      const extensionsKey = this.sessionStorage?.extensions || false

      if (extensionsKey && extensionsKey[apiId]) {
        return extensionsKey[apiId]
      }

      return false
    }

    setExtensionKey(apiId, extensionKey) {
      try {
        const prevExtensions =
          JSON.parse(this.sessionStorage.getItem('extensions')) || {}
        this.sessionStorage.setItem(
          'extensions',
          JSON.stringify({ ...prevExtensions, [apiId]: extensionKey })
        )
        return true
      } catch (e) {
        this.notification.showErrorToast(
          'Extensions management failed: ' + (e.message || e)
        )
        return false
      }
    }

    removeExtensionKey(apiId) {
      try {
        if (this.sessionStorage.getItem('extensions')) {
          const parsedExtensions = JSON.parse(
            this.sessionStorage.getItem('extensions')
          )
          if (apiId in parsedExtensions) {
            delete parsedExtensions[apiId]
          }
          this.sessionStorage.setItem(
            'extensions',
            JSON.stringify({ ...parsedExtensions })
          )
        }
      } catch (e) {
        this.notification.showErrorToast(
          'Extensions management failed: ' + (e.message || e)
        )
      }
    }
  }
  app.service('$apiIndexStorageService', ApiIndexStorageService)
})
