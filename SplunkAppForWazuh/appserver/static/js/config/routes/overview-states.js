define(['../module'], function (module) {
  'use strict'
  module.paths = {
    root: `${window.location.href.split(/\/[a-z][a-z]-[A-Z][A-Z]\//)[0]}/`,
  }
  module.constant('BASE_URL', module.paths.root)
  module.config([
    '$mdIconProvider',
    '$locationProvider',
    '$stateProvider',
    '$mdThemingProvider',
    'BASE_URL',
    function (
      $mdIconProvider,
      $locationProvider,
      $stateProvider,
      $mdThemingProvider,
      BASE_URL
    ) {
      $mdThemingProvider
        .theme('default')
        .primaryPalette('blue')
        .accentPalette('blue')
      $locationProvider.html5Mode({
        enabled: true,
        requirebase: false,
        rewriteLinks: false,
      })
      $stateProvider
        .state('overview', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/welcome/overview-welcome.html',
          controller: 'overviewWelcomeCtrl',
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
            ],
            isSplunkAdmin: [
              '$splunkUsers',
              async ($splunkUsers) => {
                try {
                  return await $splunkUsers.isAdmin()
                } catch (err) {
                  return {
                    error: 'Cannot fetch Splunk users from API',
                    detail: err,
                  }
                }
              },
            ],
            agentsInfo: [
              '$requestService',
              async ($requestService) => {
                try {
                  const result = await $requestService.apiReq(
                    '/agents/summary/status'
                  )
                  return result
                } catch (err) {} //eslint-disable-line
              },
            ],
            extensions: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.getCurrentExtensions()
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })

        // Overview - General
        .state('ow-general', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/general/overview-general.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ow-general')
          },
          controller: 'overviewGeneralCtrl',
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
            ],
            pollingState: [
              '$requestService',
              async ($requestService) => {
                try {
                  const result = await $requestService.httpReq(
                    `GET`,
                    `/manager/polling_state`
                  )
                  return result
                } catch (err) {
                  return false
                }
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            awsExtensionEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.extensionIsEnabled('aws')
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })
        // Overview - policy monitoring
        .state('ow-pm', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/policy-monitoring/overview-pm.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ow-pm')
          },
          controller: 'overviewPolicyMonitoringCtrl',
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            extensions: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.getCurrentExtensions()
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })
        // Overview - SCA Security Configuration Assessment
        .state('ow-sca', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/sca/overview-sca.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ow-sca')
          },
          controller: 'overviewSCACtrl',
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            extensions: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.getCurrentExtensions()
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })
        // Overview - FIM
        .state('ow-fim', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/fim/overview-fim.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ow-fim')
          },
          controller: 'overviewFimCtrl',
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            awsExtensionEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.extensionIsEnabled('aws')
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })
        // Overview - Osquery
        .state('ow-osquery', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/osquery/osquery.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ow-osquery')
          },
          controller: 'osqueryCtrl',
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
            ],
            osquery: [
              '$requestService',
              async ($requestService) => {
                try {
                  const result = await $requestService.apiReq(
                    `/agents/000/config/wmodules/wmodules`
                  )
                  return result
                } catch (err) {
                  return false
                }
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            extensions: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.getCurrentExtensions()
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })
        // Overview - audit
        .state('ow-audit', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/audit/overview-audit.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ow-audit')
          },
          controller: 'overviewAuditCtrl',
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            extensions: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.getCurrentExtensions()
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })
        // Overview - OpenSCAP
        .state('ow-os', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/scap/overview-openscap.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ow-os')
          },
          controller: 'overviewOpenScapCtrl',
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            extensions: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.getCurrentExtensions()
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })
        // Overview - PCI-DSS
        .state('ow-pci', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/pci/overview-pci.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ow-pci')
          },
          controller: 'overviewPciCtrl',
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
            ],
            pciTabs: [
              '$requestService',
              async ($requestService) => {
                try {
                  const pciTabs = []
                  const data = await $requestService.httpReq(
                    'GET',
                    '/api/pci?requirement=all'
                  )
                  if (!data) return []
                  for (const key in data.data) {
                    pciTabs.push({ title: key, content: data.data[key] })
                  }
                  return pciTabs
                } catch (err) {
                  return false
                }
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            gdprExtensionEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.extensionIsEnabled('gdpr')
                } catch (err) {
                  return false
                }
              },
            ],
            hipaaExtensionEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.extensionIsEnabled('hipaa')
                } catch (err) {
                  return false
                }
              },
            ],
            nistExtensionEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.extensionIsEnabled('nist')
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })
        // Overview - GDPR
        .state('ow-gdpr', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/gdpr/overview-gdpr.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ow-gdpr')
          },
          controller: 'overviewGdprCtrl',
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
            ],
            gdprTabs: [
              '$requestService',
              async ($requestService) => {
                try {
                  const gdprTabs = []
                  const data = await $requestService.httpReq(
                    'GET',
                    '/api/gdpr?requirement=all'
                  )
                  if (!data) return []
                  for (const key in data.data) {
                    gdprTabs.push({ title: key, content: data.data[key] })
                  }
                  return gdprTabs
                } catch (err) {
                  return false
                }
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            pciExtensionEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.extensionIsEnabled('pci')
                } catch (err) {
                  return false
                }
              },
            ],
            hipaaExtensionEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.extensionIsEnabled('hipaa')
                } catch (err) {
                  return false
                }
              },
            ],
            nistExtensionEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.extensionIsEnabled('nist')
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })
        // Overview - HIPAA
        .state('ow-hipaa', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/hipaa/overview-hipaa.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ow-hipaa')
          },
          controller: 'overviewHipaaCtrl',
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
            ],
            hipaaTabs: [
              '$requestService',
              async ($requestService) => {
                try {
                  const hipaaTabs = []
                  const data = await $requestService.httpReq(
                    'GET',
                    '/api/hipaa?requirement=all'
                  )
                  if (!data) return []
                  for (const key in data.data) {
                    hipaaTabs.push({ title: key, content: data.data[key] })
                  }
                  return hipaaTabs
                } catch (err) {
                  return false
                }
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            pciExtensionEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.extensionIsEnabled('pci')
                } catch (err) {
                  return false
                }
              },
            ],
            gdprExtensionEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.extensionIsEnabled('gdpr')
                } catch (err) {
                  return false
                }
              },
            ],
            nistExtensionEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.extensionIsEnabled('nist')
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })
        // Overview - NIST 800-53
        .state('ow-nist', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/nist/overview-nist.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ow-nist')
          },
          controller: 'overviewNistCtrl',
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
            ],
            nistTabs: [
              '$requestService',
              async ($requestService) => {
                try {
                  const nistTabs = []
                  const data = await $requestService.httpReq(
                    'GET',
                    '/api/nist?requirement=all'
                  )
                  if (!data) return []
                  for (const key in data.data) {
                    nistTabs.push({ title: key, content: data.data[key] })
                  }
                  return nistTabs
                } catch (err) {
                  return false
                }
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            pciExtensionEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.extensionIsEnabled('pci')
                } catch (err) {
                  return false
                }
              },
            ],
            gdprExtensionEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.extensionIsEnabled('gdpr')
                } catch (err) {
                  return false
                }
              },
            ],
            hipaaExtensionEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.extensionIsEnabled('hipaa')
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })
        // Overview - Vulnerabilities
        .state('ow-vul', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/vulnerabilities/overview-vulnerabilities.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ow-vul')
          },
          controller: 'overviewVulnerabilitiesCtrl',
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            extensions: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.getCurrentExtensions()
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })
        // Overview - CIS-CAT
        .state('ow-ciscat', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/ciscat/overview-ciscat.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ow-ciscat')
          },
          controller: 'ciscatCtrl',
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            extensions: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.getCurrentExtensions()
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })
        // Overview - VirusTotal
        .state('ow-virustotal', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/virustotal/overview-virustotal.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ow-virustotal')
          },
          controller: 'overviewVirusTotal',
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            extensions: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.getCurrentExtensions()
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })
        // =========== AWS =========== //
        .state('ow-aws', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/aws/aws.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ow-aws')
          },
          controller: 'awsCtrl',
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
          },
        })
        // =========== Docker listener =========== //
        .state('ow-docker', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/docker/overview-docker.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ow-docker')
          },
          controller: 'dockerCtrl',
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            extensions: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.getCurrentExtensions()
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })
        // =========== MITRE ATT&CK =========== //
        .state('ow-mitre', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/mitre/overview-mitre.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ow-mitre')
          },
          controller: 'overviewMitreCtrl',
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            extensions: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.getCurrentExtensions()
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })
        // =========== MITRE ATT&CK Framework =========== //
        .state('ow-mitre-ids', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/mitre-ids/overview-mitre-ids.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ow-mitre-ids')
          },
          controller: 'overviewMitreIdsCtrl',
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
            ],
            mitre_tactics: [
              '$requestService',
              async ($requestService) => {
                try {
                  const fields = [
                    'name',
                  ].join()

                  const results = await $requestService.apiReq(
                    `/mitre/tactics?select=${fields}`
                  )
                  return results.data.data.affected_items
                } catch (err) {
                  return false
                }
              },
            ],
            mitre_techniques: [
              '$requestService',
              async ($requestService) => {
                try {
                  const fields = [
                    'name',
                    'external_id',
                  ].join()

                  const results = await $requestService.apiReq(
                    `/mitre/techniques?select=${fields}&limit=1000`
                  )
                  return results.data.data.affected_items
                } catch (err) {
                  return false
                }
              },
            ],
            extensions: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.getCurrentExtensions()
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })
    },
  ])
})
