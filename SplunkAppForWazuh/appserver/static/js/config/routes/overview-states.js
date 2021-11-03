define(['../module'], function(module) {
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
    function(
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
            requirementsList: [
              '$security_service',
              async $security_service => {
                return await $security_service.getRequirementsOfController('overview')
              }
            ],
            agentsInfo: [
              '$requestService',
              '$state',
              async $requestService => {
                try {
                  const result = await $requestService.apiReq('/agents/summary/status')
                  return result
                } catch (err) {} //eslint-disable-line
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
            requirementsList: [
              '$security_service',
              async $security_service => {
                return await $security_service.getRequirementsOfController('ow-general')
              }
            ],
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
              async $currentDataService => {
                return await $currentDataService.getReportingStatus()
              }
            ],
            awsExtensionEnabled: [
              '$currentDataService',
              async $currentDataService => {
                try {
                  return await $currentDataService.extensionIsEnabled('aws')
                } catch (err) {
                  return false
                }
              }
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
            requirementsList: [
              '$security_service',
              async $security_service => {
                return await $security_service.getRequirementsOfController('ow-pm')
              }
            ],
            reportingEnabled: [
              '$currentDataService',
              async $currentDataService => {
                return await $currentDataService.getReportingStatus()
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
        // Overview - SCA Security Configuration Assessment
        .state('ow-sca', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/sca/overview-sca.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ow-sca')
          },
          controller: 'overviewSCACtrl',
          resolve: {
            requirementsList: [
              '$security_service',
              async $security_service => {
                return await $security_service.getRequirementsOfController('ow-sca')
              }
            ],
            reportingEnabled: [
              '$currentDataService',
              async $currentDataService => {
                return await $currentDataService.getReportingStatus()
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
            requirementsList: [
              '$security_service',
              async $security_service => {
                return await $security_service.getRequirementsOfController('ow-fim')
              }
            ],
            reportingEnabled: [
              '$currentDataService',
              async $currentDataService => {
                return await $currentDataService.getReportingStatus()
              }
            ],
            awsExtensionEnabled: [
              '$currentDataService',
              async $currentDataService => {
                try {
                  return await $currentDataService.extensionIsEnabled('aws')
                } catch (err) {
                  return false
                }
              }
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
            requirementsList: [
              '$security_service',
              async $security_service => {
                return await $security_service.getRequirementsOfController('ow-osquery')
              }
            ],
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
              async $currentDataService => {
                return await $currentDataService.getReportingStatus()
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
            requirementsList: [
              '$security_service',
              async $security_service => {
                return await $security_service.getRequirementsOfController('ow-audit')
              }
            ],
            reportingEnabled: [
              '$currentDataService',
              async $currentDataService => {
                return await $currentDataService.getReportingStatus()
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
            requirementsList: [
              '$security_service',
              async $security_service => {
                return await $security_service.getRequirementsOfController('ow-os')
              }
            ],
            reportingEnabled: [
              '$currentDataService',
              async $currentDataService => {
                return await $currentDataService.getReportingStatus()
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
            requirementsList: [
              '$security_service',
              async $security_service => {
                return await $security_service.getRequirementsOfController('ow-pci')
              }
            ],
            pciTabs: [
              '$requestService',
              '$state',
              async ($requestService, $state) => {
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
                  $state.go('settings.api')
                }
              }
            ],
            reportingEnabled: [
              '$currentDataService',
              async $currentDataService => {
                return await $currentDataService.getReportingStatus()
              }
            ],
            gdprExtensionEnabled: [
              '$currentDataService',
              async $currentDataService => {
                try {
                  return await $currentDataService.extensionIsEnabled('gdpr')
                } catch (err) {
                  return false
                }
              }
            ],
            hipaaExtensionEnabled: [
              '$currentDataService',
              async $currentDataService => {
                try {
                  return await $currentDataService.extensionIsEnabled('hipaa')
                } catch (err) {
                  return false
                }
              }
            ],
            nistExtensionEnabled: [
              '$currentDataService',
              async $currentDataService => {
                try {
                  return await $currentDataService.extensionIsEnabled('nist')
                } catch (err) {
                  return false
                }
              }
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
            requirementsList: [
              '$security_service',
              async $security_service => {
                return await $security_service.getRequirementsOfController('ow-gdpr')
              }
            ],
            gdprTabs: [
              '$requestService',
              '$state',
              async ($requestService, $state) => {
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
                  $state.go('settings.api')
                }
              }
            ],
            reportingEnabled: [
              '$currentDataService',
              async $currentDataService => {
                return await $currentDataService.getReportingStatus()
              }
            ],
            pciExtensionEnabled: [
              '$currentDataService',
              async $currentDataService => {
                try {
                  return await $currentDataService.extensionIsEnabled('pci')
                } catch (err) {
                  return false
                }
              }
            ],
            hipaaExtensionEnabled: [
              '$currentDataService',
              async $currentDataService => {
                try {
                  return await $currentDataService.extensionIsEnabled('hipaa')
                } catch (err) {
                  return false
                }
              }
            ],
            nistExtensionEnabled: [
              '$currentDataService',
              async $currentDataService => {
                try {
                  return await $currentDataService.extensionIsEnabled('nist')
                } catch (err) {
                  return false
                }
              }
            ]
          }
        }) 
        // Overview - HIPAA
        .state('ow-hipaa', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/hipaa/overview-hipaa.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ow-hipaa')
          },
          controller: 'overviewHipaaCtrl',
          resolve: {
            requirementsList: [
              '$security_service',
              async $security_service => {
                return await $security_service.getRequirementsOfController('ow-hipaa')
              }
            ],
            hipaaTabs: [
              '$requestService',
              '$state',
              async ($requestService, $state) => {
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
                  $state.go('settings.api')
                }
              }
            ],
            reportingEnabled: [
              '$currentDataService',
              async $currentDataService => {
                return await $currentDataService.getReportingStatus()
              }
            ],
            pciExtensionEnabled: [
              '$currentDataService',
              async $currentDataService => {
                try {
                  return await $currentDataService.extensionIsEnabled('pci')
                } catch (err) {
                  return false
                }
              }
            ],
            gdprExtensionEnabled: [
              '$currentDataService',
              async $currentDataService => {
                try {
                  return await $currentDataService.extensionIsEnabled('gdpr')
                } catch (err) {
                  return false
                }
              }
            ],
            nistExtensionEnabled: [
              '$currentDataService',
              async $currentDataService => {
                try {
                  return await $currentDataService.extensionIsEnabled('nist')
                } catch (err) {
                  return false
                }
              }
            ]
          }
        })
        // Overview - NIST 800-53
        .state('ow-nist', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/nist/overview-nist.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ow-nist')
          },
          controller: 'overviewNistCtrl',
          resolve: {
            requirementsList: [
              '$security_service',
              async $security_service => {
                return await $security_service.getRequirementsOfController('ow-nist')
              }
            ],
            nistTabs: [
              '$requestService',
              '$state',
              async ($requestService, $state) => {
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
                  $state.go('settings.api')
                }
              }
            ],
            reportingEnabled: [
              '$currentDataService',
              async $currentDataService => {
                return await $currentDataService.getReportingStatus()
              }
            ],
            pciExtensionEnabled: [
              '$currentDataService',
              async $currentDataService => {
                try {
                  return await $currentDataService.extensionIsEnabled('pci')
                } catch (err) {
                  return false
                }
              }
            ],
            gdprExtensionEnabled: [
              '$currentDataService',
              async $currentDataService => {
                try {
                  return await $currentDataService.extensionIsEnabled('gdpr')
                } catch (err) {
                  return false
                }
              }
            ],
            hipaaExtensionEnabled: [
              '$currentDataService',
              async $currentDataService => {
                try {
                  return await $currentDataService.extensionIsEnabled('hipaa')
                } catch (err) {
                  return false
                }
              }
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
            requirementsList: [
              '$security_service',
              async $security_service => {
                return await $security_service.getRequirementsOfController('ow-vul')
              }
            ],
            reportingEnabled: [
              '$currentDataService',
              async $currentDataService => {
                return await $currentDataService.getReportingStatus()
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
            requirementsList: [
              '$security_service',
              async $security_service => {
                return await $security_service.getRequirementsOfController('ow-ciscat')
              }
            ],
            reportingEnabled: [
              '$currentDataService',
              async $currentDataService => {
                return await $currentDataService.getReportingStatus()
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
            ],
            requirementsList: [
              '$security_service',
              async $security_service => {
                return await $security_service.getRequirementsOfController('ow-ciscat')
              }
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
            requirementsList: [
              '$security_service',
              async $security_service => {
                return await $security_service.getRequirementsOfController('ow-virustotal')
              }
            ],
            reportingEnabled: [
              '$currentDataService',
              async $currentDataService => {
                return await $currentDataService.getReportingStatus()
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
            requirementsList: [
              '$security_service',
              async $security_service => {
                return await $security_service.getRequirementsOfController('ow-aws')
              }
            ],
            reportingEnabled: [
              '$currentDataService',
              async $currentDataService => {
                return await $currentDataService.getReportingStatus()
              }
            ]
          }
        })
        // =========== Docker listener =========== //
        .state('ow-docker', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/docker/overview-docker.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ow-docker')
          },
          controller: 'dockerCtrl',
          resolve: {
            requirementsList: [
              '$security_service',
              async $security_service => {
                return await $security_service.getRequirementsOfController('ow-docker')
              }
            ],
            reportingEnabled: [
              '$currentDataService',
              async $currentDataService => {
                return await $currentDataService.getReportingStatus()
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
        // =========== MITRE ATT&CK =========== //
        .state('ow-mitre', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/mitre/overview-mitre.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ow-mitre')
          },
          controller: 'overviewMitreCtrl',
          resolve: {
            requirementsList: [
              '$security_service',
              async $security_service => {
                return await $security_service.getRequirementsOfController('ow-mitre')
              }
            ],
            reportingEnabled: [
              '$currentDataService',
              async $currentDataService => {
                return await $currentDataService.getReportingStatus()
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
        // =========== MITRE ATT&CK Framework =========== //
        .state('ow-mitre-ids', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/overview/mitre-ids/overview-mitre-ids.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ow-mitre-ids')
          },
          controller: 'overviewMitreIdsCtrl',
          resolve: {
            requirementsList: [
              '$security_service',
              async $security_service => {
                return await $security_service.getRequirementsOfController('ow-mitre-ids')
              }
            ],
            mitre_tactics: [
              '$requestService',
              '$state',
              async (
                $requestService,
                $state
              ) => {
                try {
                  const results = await $requestService.apiReq(`/mitre?select=phase_name`)
                  const data = results.data.data.affected_items
                  
                  const tactics = data.reduce((parsed, item)=>{
                    parsed[item.phase_name[0]]=0
                    return parsed
                  },{})

                  return tactics

                } catch (err) {
                  $state.go('overview')
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
    }
  ])
})
