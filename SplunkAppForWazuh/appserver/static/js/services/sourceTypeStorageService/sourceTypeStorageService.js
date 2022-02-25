define(['../module'], function (app) {
  'use strict'

  class SourceTypeStorageService {
    constructor() {
      this.sessionStorage = sessionStorage
    }

    /**
     * Select an SourceType by name
     * @param {String} sourceType
     */
    setSourceType(sourceType) {
      this.sessionStorage.selectedSourceType = `{"sourceType":"${sourceType}"}`
    }

    /**
     * Returns currently selected SourceType
     * @param {String} sourceType
     */
    getSourceType() {
      try {
        if (this.sessionStorage.selectedSourceType) {
          return JSON.parse(this.sessionStorage.selectedSourceType)
        } else {
          return { sourceType: '*' }
        }
      } catch (e) {
        return { sourceType: '*' }
      }
    }
  }
  app.service('$sourceTypeStorageService', SourceTypeStorageService)
})
