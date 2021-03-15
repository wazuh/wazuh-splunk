define(['../module'], function (module) {
    'use strict'

    module.service('$appVersionService', function (
    ) {
        let appInfo = {revision:'',version:'',splunk_version:''};
        let documentationAppVersion='';
        const getAppVersion = () => {
            return appInfo;
        }

        /**
         * Generates and returns the browser base URL + Splunk Port
         */
        const setAppInfo = (info) => {
            let appInfo = info;
            const [major, minor] = appInfo.version.split('.');
            documentationAppVersion = [major, minor].join('.'); 
        }
        
        const getDocumentacionVersion = () => {
            return documentationAppVersion;
        }

        const getDocuUrl = (url) => {
            return url.replace('/current/',`/${documentationAppVersion}/`)
        }
        const service = {
            getAppVersion: getAppVersion,
            setAppInfo: setAppInfo,
            getDocumentacionVersion: getDocumentacionVersion
        }
        return service
    })
})
