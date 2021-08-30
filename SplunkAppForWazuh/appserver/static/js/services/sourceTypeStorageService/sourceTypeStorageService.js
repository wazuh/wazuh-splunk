define(['../module'], function(app) {
    'use strict'

    class SourceTypeStorageService {
        constructor() {
            this.sessionStorage = sessionStorage
        }

        /**
         * Removes the selected SourceType
         */
        removeSourceType() {
            delete this.sessionStorage.selectedSourceType
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
            if (this.sessionStorage.selectedSourceType) {
                return JSON.parse(this.sessionStorage.selectedSourceType)
            } else return { sourceType: 'wazuh' }
        }

    }
    app.service('$sourceTypeStorageService', SourceTypeStorageService)
})
