const UI_METADATA = {
  version: '4.3.0',
  revision: '4303',
}

define(['../module'], function (module) {
  'use strict'
  module.metadata = UI_METADATA
  module.constant('UI_METADATA', UI_METADATA)

  module.service('$appVersionService', function (UI_METADATA) {
    let appInfo = { revision: '', version: '', splunk_version: '' }
    let documentationAppVersion = ''
    
    
    /**
     * 
    */
    const getBackendMetadata = () => {
      return appInfo
    }

    /**
     * Set the backends metadata.
     *  - Supported Wazuh's version.
     *  - Supported Splunk's version. 
     *  - App's revision number.
     */
    const setAppInfo = (info) => {
      appInfo = info
      const [major, minor] = appInfo.version.split('.')
      documentationAppVersion = [major, minor].join('.')
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
     * @returns frontend's metadata
     */
    const getUIMetadata = () => {
      return UI_METADATA
    }

    /**
     * Checks whether the App's frontend and backend revision numbers match.
     */
    function checkAppRevisions() {
      return this.getUIMetadata().revision !== this.getBackendMetadata().revision
    }

    return {
      getAppVersion: getBackendMetadata,
      setAppInfo: setAppInfo,
      getDocumentationVersion: getDocumentationVersion,
      getAppMetaData: getUIMetadata,
      getDiffAppVersions: checkAppRevisions,
    }
  })
})
