define(['../module'], function (module) {
  'use strict'
  module.paths = {
    root: `${window.location.href.split(/\/[a-z][a-z]-[A-Z][A-Z]\//)[0]}/`
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
        rewriteLinks: false
      })
      $stateProvider
        .state('overview', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/welcome/overview-welcome.html',
          controller: 'overviewWelcomeCtrl',
          resolve: {
            agentsInfo: [
              '$requestService',
              '$state',
              async ($requestService, $state) => {
                try {
                  const result = await $requestService.apiReq('/agents/summary')
                  return result
                } catch (err) {
                  $state.go('settings.api')
                }
              }
            ],
            extensions: [
              '$currentDataService',
              async $currentDataService => {
                try {
                  return await $currentDataService.getCurrentExtensions()
                } catch (err) {
                  return false
                }
              }
            ]
          }
        })

        // Overview - General
        .state('ow-general', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/general/overview-general.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ow-general')
          },
          controller: 'overviewGeneralCtrl',
          resolve: {
            pollingState: [
              '$requestService',
              '$state',
              async ($requestService, $state) => {
                try {
                  const result = await $requestService.httpReq(
                    `GET`,
                    `/manager/polling_state`
                  )
                  return result
                } catch (err) {
                  $state.go('settings.api')
                }
              }
            ],
            reportingEnabled: [
              '$currentDataService',
              async $currentDataService => { return await $currentDataService.getReportingStatus() }
            ]
          }
        })
        // Overview - policy monitoring
        .state('ow-pm', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/policy-monitoring/overview-pm.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ow-pm')
          },
          controller: 'overviewPolicyMonitoringCtrl',
          resolve: {
            reportingEnabled: [
              '$currentDataService',
              async $currentDataService => { return await $currentDataService.getReportingStatus() }
            ]
          }
        })
        // Overview - FIM
        .state('ow-fim', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/fim/overview-fim.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ow-fim')
          },
          controller: 'overviewFimCtrl',
          resolve: {
            reportingEnabled: [
              '$currentDataService',
              async $currentDataService => { return await $currentDataService.getReportingStatus() }
            ]
          }
        })
        // Overview - Osquery
        .state('ow-osquery', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/osquery/osquery.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ow-osquery')
          },
          controller: 'osqueryCtrl',
          resolve: {
            osquery: [
              '$requestService',
              '$state',
              async ($requestService, $state) => {
                try {
                  const result = await $requestService.apiReq(
                    `/agents/000/config/wmodules/wmodules`
                  )
                  return result
                } catch (err) {
                  $state.go('settings.api')
                }
              }
            ],
            reportingEnabled: [
              '$currentDataService',
              async $currentDataService => { return await $currentDataService.getReportingStatus() }
            ]
          }
        })
        // Overview - audit
        .state('ow-audit', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/audit/overview-audit.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ow-audit')
          },
          controller: 'overviewAuditCtrl',
          resolve: {
            reportingEnabled: [
              '$currentDataService',
              async $currentDataService => { return await $currentDataService.getReportingStatus() }
            ]
          }
        })
        // Overview - OpenSCAP
        .state('ow-os', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/scap/overview-openscap.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ow-os')
          },
          controller: 'overviewOpenScapCtrl',
          resolve: {
            reportingEnabled: [
              '$currentDataService',
              async $currentDataService => { return await $currentDataService.getReportingStatus() }
            ]
          }
        })
        // Overview - PCI-DSS
        .state('ow-pci', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/pci/overview-pci.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ow-pci')
          },
          controller: 'overviewPciCtrl',
          resolve: {
            pciTabs: [
              '$requestService',
              '$state',
              async ($requestService, $state) => {
                try {
                  const pciTabs = []
                  const data = await $requestService.httpReq('GET', '/api/pci?requirement=all')
                  if (!data) return []
                  for (const key in data.data) {
                    pciTabs.push({ title: key, content: data.data[key] })
                  }
                  return pciTabs
                } catch (err) {
                  $state.go('settings.api')
                }
              }
            ],
            reportingEnabled: [
              '$currentDataService',
              async $currentDataService => { return await $currentDataService.getReportingStatus() }
            ]
          }
        })
        // Overview - GDPR
        .state('ow-gdpr', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/gdpr/overview-gdpr.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ow-gdpr')
          },
          controller: 'overviewGdprCtrl',
          resolve: {
            gdprTabs: [
              '$requestService',
              '$state',
              async ($requestService, $state) => {
                try {
                  const gdprTabs = []
                  const data = await $requestService.httpReq('GET', '/api/gdpr?requirement=all')
                  if (!data) return []
                  for (const key in data.data) {
                    gdprTabs.push({ title: key, content: data.data[key] })
                  }
                  return gdprTabs
                } catch (err) {
                  $state.go('settings.api')
                }
              }
            ],
            reportingEnabled: [
              '$currentDataService',
              async $currentDataService => { return await $currentDataService.getReportingStatus() }
            ]
          }
        })

        // Overview - Vulnerabilities
        .state('ow-vul', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/vulnerabilities/overview-vulnerabilities.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ow-vul')
          },
          controller: 'overviewVulnerabilitiesCtrl',
          resolve: {
            reportingEnabled: [
              '$currentDataService',
              async $currentDataService => { return await $currentDataService.getReportingStatus() }
            ]
          }
        })
        // Overview - CIS-CAT
        .state('ow-ciscat', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/ciscat/overview-ciscat.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ow-ciscat')
          },
          controller: 'ciscatCtrl',
          resolve: {
            reportingEnabled: [
              '$currentDataService',
              async $currentDataService => { return await $currentDataService.getReportingStatus() }
            ]
          }
        })
        // Overview - VirusTotal
        .state('ow-virustotal', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/virustotal/overview-virustotal.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ow-virustotal')
          },
          controller: 'overviewVirusTotal',
          resolve: {
            reportingEnabled: [
              '$currentDataService',
              async $currentDataService => { return await $currentDataService.getReportingStatus() }
            ]
          }
        })
        // =========== AWS =========== //
        .state('ow-aws', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/aws/aws.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ow-aws')
          },
          controller: 'awsCtrl',
          resolve: {
            reportingEnabled: [
              '$currentDataService',
              async $currentDataService => { return await $currentDataService.getReportingStatus() }
            ]
          }
        })
    }
  ])
})
