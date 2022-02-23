const metadataApp = {
  version: '4.3.0',
  revision: '4302',
}

define(['../module'], function (module) {
  'use strict'
  module.metadata = metadataApp
  module.constant('APP_META', {
    version: module.metadata.version,
    revision: module.metadata.revision,
  })
  module.service('$appVersionService', function (APP_META) {
    let appInfo = { revision: '', version: '', splunk_version: '' }
    let documentationAppVersion = ''
    const getAppVersion = () => {
      return appInfo
    }

    /**
     * Set the info about the app and splunk
     */
    const setAppInfo = (info) => {
      appInfo = info
      const [major, minor] = appInfo.version.split('.')
      documentationAppVersion = [major, minor].join('.')
    }

    const getDocumentationVersion = () => {
      return documentationAppVersion
    }

    const getAppMetaData = () => {
      return APP_META
    }

    function getDiffAppVersions() {
      const appVersion = this.getAppMetaData()
      const appPackageVersion = this.getAppVersion()

      return (
        appVersion.version !== appPackageVersion.version ||
        appVersion.revision !== appPackageVersion.revision
      )
    }

    const service = {
      getAppVersion: getAppVersion,
      setAppInfo: setAppInfo,
      getDocumentationVersion: getDocumentationVersion,
      getAppMetaData: getAppMetaData,
      getDiffAppVersions: getDiffAppVersions,
    }
    return service
  })
})
