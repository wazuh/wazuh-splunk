define(['../module'], function(module) {
  'use strict'

  const checkAdmin = async $currentDataService => {
    try {
      return await $currentDataService.isAdmin()
    } catch (error) {
      return false
    }
  }

  module.config([
    '$stateProvider',
    'BASE_URL',
    function($stateProvider, BASE_URL) {
      $stateProvider
        // Manager
        .state('manager', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/management/welcome/manager-welcome.html',
            onEnter: () => {
              window.sessionStorage.showLogtest = false
            }
        })
        // Manager - Monitoring
        .state('mg-monitoring', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/management/monitoring/monitoring.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('mg-monitoring')
          },
          controller: 'monitoringCtrl',
          params: { id: null, filters: null },
          resolve: {
            monitoringInfo: [
              '$requestService',
              '$state',
              async ($requestService, $state) => {
                try {
                  const result = await Promise.all([
                    $requestService.apiReq('/cluster/status'),
                    $requestService.apiReq('/cluster/nodes'),
                    $requestService.apiReq('/cluster/config'),
                    $requestService.apiReq('/version'),
                    $requestService.apiReq('/agents', { limit: 1 }),
                    $requestService.apiReq('/cluster/healthcheck')
                  ])
                  return result
                } catch (err) {
                  $state.go('settings.api')
                }
              }
            ]
          }
        })

        // Manager - rules
        .state('mg-logs', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/management/logs/manager-logs.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('mg-logs')
          },
          controller: 'managerLogsCtrl',
          resolve: {
            logs: [
              '$requestService',
              '$state',
              async ($requestService, $state) => {
                try {
                  const result = await $requestService.apiReq(
                    '/manager/logs/summary'
                  )
                  return result
                } catch (err) {
                  $state.go('settings.api')
                }
              }
            ]
          }
        })
        // Manager - Ruleset
        .state('mg-rules', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/management/rules/manager-ruleset.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('mg-rules')
          },
          controller: 'managerRulesetCtrl',
          params: { filters: null },
          resolve: {
            isAdmin: [
              '$currentDataService',
              async $currentDataService => {
                return await checkAdmin($currentDataService)
              }
            ]
          }
        })
        // Manager - Ruleset/:id
        .state('mg-rules-id', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/management/rules/manager-ruleset-id.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('mg-rules')
          },
          controller: 'managerRulesetIdCtrl',
          params: { id: null, filters: null },
          resolve: {
            ruleInfo: [
              '$requestService',
              '$stateParams',
              '$state',
              async ($requestService, $stateParams, $state) => {
                try {
                  const result = await $requestService.apiReq(
                    `/rules/${$stateParams.id}`
                  )
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
            ],
            isAdmin: [
              '$currentDataService',
              async $currentDataService => {
                return await checkAdmin($currentDataService)
              }
            ]
          }
        })
        // Manager - Decoders
        .state('mg-decoders', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/management/decoders/manager-decoders.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('mg-decoders')
          },
          controller: 'managerDecodersCtrl',
          params: { filters: null },
          resolve: {
            isAdmin: [
              '$currentDataService',
              async $currentDataService => {
                return await checkAdmin($currentDataService)
              }
            ]
          }
        })
        // Manager - Decoders/:id
        .state('mg-decoders-id', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/management/decoders/manager-decoders-id.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('mg-decoders')
          },
          controller: 'managerDecodersIdCtrl',
          params: { id: null, name: null },
          resolve: {
            currentDecoder: [
              '$requestService',
              '$stateParams',
              '$state',
              async ($requestService, $stateParams, $state) => {
                try {
                  const result = await $requestService.apiReq(
                    `/decoders/${$stateParams.name}`
                  )
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
            ],
            isAdmin: [
              '$currentDataService',
              async $currentDataService => {
                return await checkAdmin($currentDataService)
              }
            ]
          }
        })

        // Manager - CDB List
        .state('mg-cdb', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/management/cdb/manager-cdb.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('mg-cdb')
          },
          controller: 'managerCdbCtrl',
          params: { filters: null },
          resolve: {
            isAdmin: [
              '$currentDataService',
              async $currentDataService => {
                return await checkAdmin($currentDataService)
              }
            ]
          }
        })

        // Manager - CDB List/:id
        .state('mg-cdb-id', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/management/cdb/manager-cdb-id.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('mg-cdb')
          },
          controller: 'managerCdbIdCtrl',
          params: { name: null, path: null },
          resolve: {
            isAdmin: [
              '$currentDataService',
              async $currentDataService => {
                return await checkAdmin($currentDataService)
              }
            ],
            cdbInfo: [
              '$cdbEditor',
              '$stateParams',
              '$state',
              async ($cdbEditor, $stateParams, $state) => {
                try {
                  const result = await $cdbEditor.getConfiguration(
                    $stateParams.name,
                    $stateParams.path
                  )
                  return {
                    file: $stateParams.name,
                    path: $stateParams.path,
                    content: result
                  }
                } catch (error) {
                  $state.go('settings.api')
                }
              }
            ]
          }
        })

        // Manager - Groups
        .state('mg-groups', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/management/groups/groups.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('mg-groups')
          },
          controller: 'groupsCtrl',
          params: { group: null },
          resolve: {
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
            agentsInfo: [
              '$requestService',
              '$state',
              async $requestService => {
                try {
                  const result = await $requestService.apiReq('/agents/summary')
                  return result
                } catch (err) {} //eslint-disable-line
              }
            ],
            isAdmin: [
              '$currentDataService',
              async $currentDataService => {
                return await checkAdmin($currentDataService)
              }
            ]
          }
        })

        // Manager - Configuration
        .state('mg-conf', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/management/configuration/both-configuration.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('mg-conf')
          },
          controller: 'configurationCtrl',
          resolve: {
            isAdmin: [
              '$currentDataService',
              async $currentDataService => {
                return await checkAdmin($currentDataService)
              }
            ],
            clusterInfo: [
              '$requestService',
              '$state',
              async ($requestService, $state) => {
                try {
                  const info = {}
                  const clusterStatus = await $requestService.apiReq(
                    '/cluster/status'
                  )
                  if (
                    clusterStatus.data.data.enabled === 'yes' &&
                    clusterStatus.data.data.running === 'yes'
                  ) {
                    const nodesList = await $requestService.apiReq(
                      '/cluster/nodes'
                    )
                    Object.assign(info, {
                      clusterEnabled: true,
                      nodes: nodesList
                    })
                  } else {
                    Object.assign(info, { clusterEnabled: false })
                  }
                  return info
                } catch (error) {
                  return false
                }
              }
            ]
          }
        })

        // Manager - EditConfig
        .state('mg-editConfig', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/management/edition/edition.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('mg-editConfig')
          },
          controller: 'editionCtrl',
          resolve: {
            isAdmin: [
              '$currentDataService',
              async $currentDataService => {
                return await checkAdmin($currentDataService)
              }
            ],
            clusterInfo: [
              '$requestService',
              '$state',
              async ($requestService, $state) => {
                try {
                  const info = {}
                  const clusterStatus = await $requestService.apiReq(
                    '/cluster/status'
                  )
                  if (
                    clusterStatus.data.data.enabled === 'yes' &&
                    clusterStatus.data.data.running === 'yes'
                  ) {
                    const nodesList = await $requestService.apiReq(
                      '/cluster/nodes'
                    )
                    Object.assign(info, {
                      clusterEnabled: true,
                      nodes: nodesList
                    })
                  } else {
                    Object.assign(info, { clusterEnabled: false })
                  }
                  return info
                } catch (error) {
                  $state.go('manager')
                }
              }
            ]
          }
        })

        // Manager - Status
        .state('mg-status', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/management/status/status.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('mg-status')
          },
          controller: 'statusCtrl',
          resolve: {
            isAdmin: [
              '$currentDataService',
              async $currentDataService => {
                return await checkAdmin($currentDataService)
              }
            ],
            statusData: [
              '$requestService',
              '$state',
              async ($requestService, $state) => {
                try {
                  const responseStatus = await $requestService.apiReq(
                    '/cluster/status'
                  )
                  let promises = []
                  if (
                    !responseStatus ||
                    !responseStatus.data ||
                    !responseStatus.data.error
                  ) {
                    const nodes = await $requestService.apiReq('/cluster/nodes')
                    if (
                      responseStatus.data.data &&
                      responseStatus.data.data.enabled === 'yes' &&
                      responseStatus.data.data.running === 'yes'
                    ) {
                      const masterNode = nodes.data.data.items.filter(
                        item => item.type === 'master'
                      )[0]
                      promises = [
                        $requestService.apiReq('/agents/summary'),
                        $requestService.apiReq(
                          `/cluster/${masterNode.name}/status`
                        ),
                        $requestService.apiReq(
                          `/cluster/${masterNode.name}/info`
                        ),
                        $requestService.apiReq('/rules', {
                          offset: 0,
                          limit: 1
                        }),
                        $requestService.apiReq('/decoders', {
                          offset: 0,
                          limit: 1
                        }),
                        Promise.resolve(masterNode),
                        Promise.resolve(nodes),
                        Promise.resolve(responseStatus.data)
                      ]
                    } else if (
                      responseStatus.data.data.enabled === 'yes' &&
                      responseStatus.data.data.running === 'no'
                    ) {
                      promises = [
                        $requestService.apiReq('/agents/summary'),
                        Promise.resolve(false),
                        Promise.resolve(false),
                        $requestService.apiReq('/rules', {
                          offset: 0,
                          limit: 1
                        }),
                        $requestService.apiReq('/decoders', {
                          offset: 0,
                          limit: 1
                        }),
                        Promise.resolve(false),
                        Promise.resolve(nodes),
                        Promise.resolve(responseStatus.data)
                      ]
                    } else {
                      promises = [
                        $requestService.apiReq('/agents/summary'),
                        $requestService.apiReq(`/manager/status`),
                        $requestService.apiReq(`/manager/info`),
                        $requestService.apiReq('/rules', {
                          offset: 0,
                          limit: 1
                        }),
                        $requestService.apiReq('/decoders', {
                          offset: 0,
                          limit: 1
                        }),
                        Promise.resolve(false)
                      ]
                    }
                  } else {
                    promises = [
                      $requestService.apiReq('/agents/summary'),
                      $requestService.apiReq(`/manager/status`),
                      $requestService.apiReq(`/manager/info`),
                      $requestService.apiReq('/rules', { offset: 0, limit: 1 }),
                      $requestService.apiReq('/decoders', {
                        offset: 0,
                        limit: 1
                      }),
                      Promise.resolve(false)
                    ]
                  }
                  return await Promise.all(promises)
                } catch (err) {
                  $state.go('settings.api')
                }
              }
            ],
            agentInfo: [
              '$requestService',
              '$state',
              async ($requestService, $state) => {
                try {
                  const response = await $requestService.apiReq('/agents', {
                    limit: 1,
                    sort: '-dateAdd'
                  })

                  const lastAgent = await $requestService.apiReq(
                    `/agents/${response.data.data.items[0].id}`,
                    {}
                  )
                  return lastAgent
                } catch (err) {
                  $state.go('settings.api')
                }
              }
            ]
          }
        })
        // Reporting
        .state('mg-reporting', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/management/reporting/reporting.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('mg-reporting')
          },
          controller: 'reportingCtrl',
          resolve: {
            reportsList: [
              '$requestService',
              '$state',
              async ($requestService, $state) => {
                try {
                  const result = await $requestService.httpReq(
                    'GET',
                    '/report/reports'
                  )
                  return result
                } catch (err) {
                  $state.go('settings.api')
                }
              }
            ]
          }
        })
    }
  ])
})
