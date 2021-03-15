define(['../module'], function (module) {
    'use strict'

    module.service('$appVersionService', function (
    ) {
        let appInfo = { revision: '', version: '', splunk_version: '' };
        let documentationAppVersion = '';
        const getAppVersion = () => {
            return appInfo;
        }

        /**
         * Set the info about the app and splunk
         */
        const setAppInfo = (info) => {
            let appInfo = info;
            const [major, minor] = appInfo.version.split('.');
            documentationAppVersion = [major, minor].join('.');
        }

        const getDocumentationVersion = () => {
            return documentationAppVersion;
        }

        const service = {
            getAppVersion: getAppVersion,
            setAppInfo: setAppInfo,
            getDocumentationVersion: getDocumentationVersion
        }
        return service
    })
})
