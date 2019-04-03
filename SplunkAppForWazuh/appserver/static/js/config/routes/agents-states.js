define(['../module'], function(module) {
  'use strict'

  module.config([
    '$stateProvider',
    'BASE_URL',
    function($stateProvider, BASE_URL) {
      $stateProvider

        // agents
        .state('agents', {
          templateUrl:
            BASE_URL +
            '/static/app/SplunkAppForWazuh/js/controllers/agents/agents/agents.html',
          controller: 'agentsCtrl',
          onEnter: $navigationService => {
            $navigationService.storeRoute('agents')
          },
          resolve: {
            agentData: [
              '$requestService',
              '$state',
              async ($requestService, $state) => {
                try {
                  const responseStatus = await $requestService.apiReq(
                    '/cluster/status'
                  )
                  return await Promise.all([
                    $requestService.apiReq('/agents/summary'),
                    $requestService.apiReq('/agents', {
                      limit: 1,
                      sort: '-dateAdd'
                    }),
                    $requestService.apiReq('/agents/stats/distinct', {
                      fields: 'os.name,os.version,os.platform',
                      select: 'os.name,os.version,os.platform'
                    }),
                    $requestService.apiReq('/agents/stats/distinct', {
                      fields: 'version',
                      select: 'version'
                    }),
                    responseStatus &&
                    responseStatus.data &&
                    responseStatus.data.data &&
                    responseStatus.data.data.enabled === 'yes' &&
                    responseStatus.data.data.running === 'yes'
                      ? $requestService.apiReq('/agents/stats/distinct', {
                          fields: 'node_name',
                          select: 'node_name'
                        })
                      : Promise.resolve(false),
                    $requestService.apiReq('/agents/groups', {})
                  ])
                } catch (err) {}
              }
            ]
          }
        })

        // agents/:id
        .state('agent-overview', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/overview/overview.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('agent-overview')
          },
          controller: 'agentsOverviewCtrl',
          params: { id: null },
          resolve: {
            agent: [
              '$requestService',
              '$stateParams',
              '$currentDataService',
              '$state',
              async (
                $requestService,
                $stateParams,
                $currentDataService,
                $state
              ) => {
                try {
                  const id =
                    $stateParams.id ||
                    $currentDataService.getCurrentAgent() ||
                    $state.go('agents')
                  const results = await Promise.all([
                    $requestService.apiReq(`/agents/${id}`),
                    $requestService.apiReq(`/syscheck/${id}/last_scan`),
                    $requestService.apiReq(`/rootcheck/${id}/last_scan`),
                    $requestService.apiReq(`/syscollector/${id}/hardware`),
                    $requestService.apiReq(`/syscollector/${id}/os`),
                    $requestService.apiReq(`/agents/${id}/group/is_sync`)
                  ])

                  return results
                } catch (err) {
                  $state.go('agents')
                }
              }
            ],
            isAdmin: [
              '$currentDataService',
              async $currentDataService => {
                try {
                  return await $currentDataService.isAdmin()
                } catch (error) {
                  return false
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
            ],
            groups: [
              '$requestService',
              async $requestService => {
                try {
                  return await $requestService.apiReq('/agents/groups')
                } catch (err) {
                  return { error: 'Cannot fetch group from API' }
                }
              }
            ]
          }
        })

        // agents/:id
        .state('ag-inventory', {
          templateUrl:
            'static/app/SplunkAppForWazuh/js/controllers/agents/inventory/inventory.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ag-inventory')
          },
          controller: 'inventoryCtrl',
          params: { id: null },
          resolve: {
            syscollector: [
              '$requestService',
              '$stateParams',
              '$currentDataService',
              '$state',
              async (
                $requestService,
                $stateParams,
                $currentDataService,
                $state
              ) => {
                try {
                  const id =
                    $stateParams.id ||
                    $currentDataService.getCurrentAgent() ||
                    $state.go('agents')
                  const results = await Promise.all([
                    $requestService.apiReq(`/syscollector/${id}/hardware`),
                    $requestService.apiReq(`/syscollector/${id}/os`),
                    $requestService.apiReq(`/syscollector/${id}/ports`, {
                      limit: 1
                    }),
                    $requestService.apiReq(`/syscollector/${id}/packages`, {
                      limit: 1,
                      select: 'scan_time'
                    }),
                    $requestService.apiReq(`/agents/${id}`),
                    $requestService.apiReq(`/syscollector/${id}/processes`, {
                      limit: 1,
                      select: 'scan_time'
                    })
                  ])
                  return results
                } catch (err) {
                  $state.go('agents')
                }
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

        // Agents - Osquery
        .state('ag-osquery', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/osquery/osquery.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ag-osquery')
          },
          controller: 'osqueryAgentCtrl',
          params: { id: null },
          resolve: {
            osquery: [
              '$requestService',
              '$currentDataService',
              '$stateParams',
              '$state',
              async (
                $requestService,
                $currentDataService,
                $stateParams,
                $state
              ) => {
                try {
                  const id =
                    $stateParams.id ||
                    $currentDataService.getCurrentAgent() ||
                    $state.go('agents')
                  const result = await $requestService.apiReq(
                    `/agents/${id}/config/wmodules/wmodules`
                  )
                  return result
                } catch (err) {
                  $state.go('agents')
                }
              }
            ],
            agent: [
              '$requestService',
              '$stateParams',
              '$currentDataService',
              '$state',
              async (
                $requestService,
                $stateParams,
                $currentDataService,
                $state
              ) => {
                try {
                  const id =
                    $stateParams.id ||
                    $currentDataService.getCurrentAgent() ||
                    $state.go('agents')
                  const result = await $requestService.apiReq(`/agents/${id}`)
                  return result
                } catch (err) {
                  $state.go('agents')
                }
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

        // agents - General
        .state('ag-general', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/general/agents-general.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ag-general')
          },
          controller: 'agentsGeneralCtrl',
          params: { id: null },
          resolve: {
            agent: [
              '$requestService',
              '$stateParams',
              '$currentDataService',
              '$state',
              async (
                $requestService,
                $stateParams,
                $currentDataService,
                $state
              ) => {
                try {
                  const id =
                    $stateParams.id ||
                    $currentDataService.getCurrentAgent() ||
                    $state.go('agents')
                  const results = await Promise.all([
                    $requestService.apiReq(`/agents/${id}`),
                    $requestService.apiReq(`/syscheck/${id}/last_scan`),
                    $requestService.apiReq(`/rootcheck/${id}/last_scan`),
                    $requestService.apiReq(`/syscollector/${id}/hardware`),
                    $requestService.apiReq(`/syscollector/${id}/os`)
                  ])
                  return results
                } catch (err) {
                  $state.go('agents')
                }
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

        // agents - FIM
        .state('ag-fim', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/fim/agents-fim.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ag-fim')
          },
          controller: 'agentsFimCtrl',
          params: { id: null },
          resolve: {
            agent: [
              '$requestService',
              '$stateParams',
              '$currentDataService',
              '$state',
              async (
                $requestService,
                $stateParams,
                $currentDataService,
                $state
              ) => {
                try {
                  const id =
                    $stateParams.id ||
                    $currentDataService.getCurrentAgent() ||
                    $state.go('agents')
                  const result = await $requestService.apiReq(`/agents/${id}`)
                  return result
                } catch (err) {
                  $state.go('agents')
                }
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

        // agents - VirusTotal
        .state('ag-virustotal', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/virustotal/agents-virustotal.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ag-virustotal')
          },
          controller: 'agentsVirusTotalCtrl',
          params: { id: null },
          resolve: {
            agent: [
              '$requestService',
              '$stateParams',
              '$currentDataService',
              '$state',
              async (
                $requestService,
                $stateParams,
                $currentDataService,
                $state
              ) => {
                try {
                  const id =
                    $stateParams.id ||
                    $currentDataService.getCurrentAgent() ||
                    $state.go('agents')
                  const result = await $requestService.apiReq(`/agents/${id}`)
                  return result
                } catch (err) {
                  $state.go('agents')
                }
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

        // agents - audit
        .state('ag-audit', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/audit/agents-audit.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ag-audit')
          },
          controller: 'agentsAuditCtrl',
          params: { id: null },
          resolve: {
            agent: [
              '$requestService',
              '$stateParams',
              '$currentDataService',
              '$state',
              async (
                $requestService,
                $stateParams,
                $currentDataService,
                $state
              ) => {
                try {
                  const id =
                    $stateParams.id ||
                    $currentDataService.getCurrentAgent() ||
                    $state.go('agents')
                  const result = await $requestService.apiReq(`/agents/${id}`)
                  return result
                } catch (err) {
                  $state.go('agents')
                }
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

        // agents - OpenSCAP
        .state('ag-os', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/scap/agents-openscap.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ag-os')
          },
          controller: 'agentsOpenScapCtrl',
          params: { id: null },
          resolve: {
            agent: [
              '$requestService',
              '$stateParams',
              '$currentDataService',
              '$state',
              async (
                $requestService,
                $stateParams,
                $currentDataService,
                $state
              ) => {
                try {
                  const id =
                    $stateParams.id ||
                    $currentDataService.getCurrentAgent() ||
                    $state.go('agents')
                  const result = await $requestService.apiReq(`/agents/${id}`)
                  return result
                } catch (err) {
                  $state.go('agents')
                }
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

        // agents - configuration
        .state('ag-conf', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/management/configuration/both-configuration.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ag-conf')
          },
          controller: 'configurationAgentCtrl',
          params: { id: null },
          resolve: {
            data: [
              '$requestService',
              '$stateParams',
              '$currentDataService',
              '$state',
              async (
                $requestService,
                $stateParams,
                $currentDataService,
                $state
              ) => {
                try {
                  const id =
                    $stateParams.id ||
                    $currentDataService.getCurrentAgent() ||
                    $state.go('agents')
                  const result = await $requestService.apiReq(
                    `/agents/${id}/group/is_sync`
                  )
                  return result
                } catch (err) {
                  $state.go('agents')
                }
              }
            ],
            agent: [
              '$requestService',
              '$stateParams',
              '$currentDataService',
              '$state',
              async (
                $requestService,
                $stateParams,
                $currentDataService,
                $state
              ) => {
                try {
                  const id =
                    $stateParams.id ||
                    $currentDataService.getCurrentAgent() ||
                    $state.go('agents')
                  const result = await $requestService.apiReq(`/agents/${id}`)
                  return result
                } catch (err) {
                  $state.go('agents')
                }
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

        // agents - GDPR
        .state('ag-gdpr', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/gdpr/agents-gdpr.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ag-gdpr')
          },
          controller: 'agentsGdprCtrl',
          params: { id: null },
          resolve: {
            agent: [
              '$requestService',
              '$stateParams',
              '$currentDataService',
              '$state',
              async (
                $requestService,
                $stateParams,
                $currentDataService,
                $state
              ) => {
                try {
                  const id =
                    $stateParams.id ||
                    $currentDataService.getCurrentAgent() ||
                    $state.go('agents')
                  const result = await $requestService.apiReq(`/agents/${id}`)
                  return result
                } catch (err) {
                  $state.go('agents')
                }
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
            ]
          }
        })

        // agents - policy monitoring
        .state('ag-pm', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/policy-monitoring/agents-pm.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ag-pm')
          },
          controller: 'agentsPolicyMonitoringCtrl',
          params: { id: null },
          resolve: {
            agent: [
              '$requestService',
              '$stateParams',
              '$currentDataService',
              '$state',
              async (
                $requestService,
                $stateParams,
                $currentDataService,
                $state
              ) => {
                try {
                  const id =
                    $stateParams.id ||
                    $currentDataService.getCurrentAgent() ||
                    $state.go('agents')
                  const result = await $requestService.apiReq(`/agents/${id}`)
                  return result
                } catch (err) {
                  $state.go('agents')
                }
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

        // agents - configuration assessments
        .state('ag-ca', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/configuration-assessment/agents-ca.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ag-ca')
          },
          controller: 'agentsConfigurationAssessmentsCtrl',
          params: { id: null },
          resolve: {
            agent: [
              '$requestService',
              '$stateParams',
              '$currentDataService',
              '$state',
              async (
                $requestService,
                $stateParams,
                $currentDataService,
                $state
              ) => {
                try {
                  const id =
                    $stateParams.id ||
                    $currentDataService.getCurrentAgent() ||
                    $state.go('agents')
                  const result = await $requestService.apiReq(`/agents/${id}`)
                  return result
                } catch (err) {
                  $state.go('agents')
                }
              }
            ],
            configAssess: [
              '$requestService',
              '$stateParams',
              '$currentDataService',
              '$state',
              async (
                $requestService,
                $stateParams,
                $currentDataService,
                $state
              ) => {
                try {
                  const id =
                    $stateParams.id ||
                    $currentDataService.getCurrentAgent() ||
                    $state.go('agents')
                  const result = await $requestService.apiReq(`/sca/${id}`)
                  return result
                } catch (err) {
                  $state.go('agents')
                }
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

        // agents - PCI-DSS
        .state('ag-pci', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/pcidss/agents-pci.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ag-pci')
          },
          controller: 'agentsPciCtrl',
          params: { id: null },
          resolve: {
            agent: [
              '$requestService',
              '$stateParams',
              '$currentDataService',
              '$state',
              async (
                $requestService,
                $stateParams,
                $currentDataService,
                $state
              ) => {
                try {
                  const id =
                    $stateParams.id ||
                    $currentDataService.getCurrentAgent() ||
                    $state.go('agents')
                  const result = await $requestService.apiReq(`/agents/${id}`)
                  return result
                } catch (err) {
                  $state.go('agents')
                }
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
            ]
          }
        })

        // agents - CIS-CAT
        .state('ag-ciscat', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/ciscat/agents-ciscat.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ag-ciscat')
          },
          controller: 'agentsCiscatCtrl',
          params: { id: null },
          resolve: {
            agent: [
              '$requestService',
              '$stateParams',
              '$currentDataService',
              '$state',
              async (
                $requestService,
                $stateParams,
                $currentDataService,
                $state
              ) => {
                try {
                  const id =
                    $stateParams.id ||
                    $currentDataService.getCurrentAgent() ||
                    '000'
                  const result = await $requestService.apiReq(`/agents/${id}`)
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
            ]
          }
        })

        // agents - Vulnerabilities
        .state('ag-vul', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/vulnerabilities/agents-vulnerabilities.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('ag-vul')
          },
          controller: 'agentsVulnerabilitiesCtrl',
          params: { id: null },
          resolve: {
            agent: [
              '$requestService',
              '$stateParams',
              '$currentDataService',
              '$state',
              async (
                $requestService,
                $stateParams,
                $currentDataService,
                $state
              ) => {
                try {
                  const id =
                    $stateParams.id ||
                    $currentDataService.getCurrentAgent() ||
                    $state.go('agents')
                  const result = await $requestService.apiReq(`/agents/${id}`)
                  return result
                } catch (err) {
                  $state.go('agents')
                }
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
    }
  ])
})
