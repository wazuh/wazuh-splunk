const UI_METADATA = {
  "version": "4.4.2",
  "revision": "4402"
}

define(['../module'], function (module) {
  'use strict'
  module.metadata = UI_METADATA
  module.constant('UI_METADATA', UI_METADATA)

  module.service('$appVersionService', function (UI_METADATA) {
    let backend_metadata = { revision: '', version: '', splunk_version: '' }
    let documentationAppVersion = ''

    /**
     * Set the backends metadata.
     *  - Supported Wazuh's version.
     *  - Supported Splunk's version.
     *  - App's revision number.
     */
    const setAppInfo = (info) => {
      backend_metadata = info
      const [major, minor] = backend_metadata.version.split('.')
      documentationAppVersion = [major, minor].join('.')
    }

    /**
     * Returns the backend metadata
     * @returns Object with revision, version and splunk_version as keys.
     */
    const getAppInfo = () => {
      return backend_metadata
    }

    /**
     * Returns the Wazuh major and minor versions to be used in the links
     * to the documentation.
     *
     * Examples: 4.3, 4.4
     *
     * @returns String
     */
    const getDocumentationVersion = () => {
      return documentationAppVersion
    }

    /**
     * Checks whether the App's frontend and backend revision numbers mismatch.
     *
     * @returns true if the versions DO NOT match, false if they do.
     */
    function appRevisionsMismatch() {
      return UI_METADATA.revision !== backend_metadata.revision
    }

    return {
      setAppInfo: setAppInfo,
      getAppInfo: getAppInfo,
      getDocumentationVersion: getDocumentationVersion,
      appRevisionsMismatch: appRevisionsMismatch,
    }
  })
})
