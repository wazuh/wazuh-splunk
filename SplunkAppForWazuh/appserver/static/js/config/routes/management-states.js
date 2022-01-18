define(['../module'], function(module) {
  'use strict'

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
            updateUserPermissions: [
              '$security_service',
              async $security_service => {
                return await $security_service.updateUserPermissions()
              }
            ],
            monitoringInfo: [
              '$requestService',
              async ($requestService) => {
                try {
                  const checkCluster = await $requestService.apiReq('/cluster/status');
                  let result = {};
                   if(checkCluster['data']['data'].enabled === 'no'){
                    result = await Promise.all([
                      checkCluster,
                      false,
                      false,
                      $requestService.apiReq('/'),
                      $requestService.apiReq('/agents', { limit: 1 }),
                      false
                    ])
                   }
                   else
                      result = await Promise.all([
                       checkCluster,
                       $requestService.apiReq('/cluster/nodes'),
                       $requestService.apiReq('/cluster/local/config'),
                       $requestService.apiReq('/'),
                       $requestService.apiReq('/agents', { limit: 1 }),
                       $requestService.apiReq('/cluster/healthcheck')
                     ])
                  return result
                } catch (err) {
                  return [
                    false,
                    false,
                    false,
                    false,
                    false,
                    false
                  ]
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
            updateUserPermissions: [
              '$security_service',
              async $security_service => {
                return await $security_service.updateUserPermissions()
              }
            ],
            logs: [
              '$requestService',
              async ($requestService) => {
                try {
                  const result = await $requestService.apiReq(
                    '/manager/logs/summary'
                  )
                  return result
                } catch (err) {
                  return false
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
            updateUserPermissions: [
              '$security_service',
              async $security_service => {
                return await $security_service.updateUserPermissions()
              }
            ],
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
            updateUserPermissions: [
              '$security_service',
              async $security_service => {
                return await $security_service.updateUserPermissions()
              }
            ],
            ruleInfo: [
              '$requestService',
              '$stateParams',
              '$state',
              async ($requestService, $stateParams, $state) => {
                try {
                  const result = await $requestService.apiReq(
                    `/rules?rule_ids=${$stateParams.id}`
                  )
                  return result
                } catch (err) {
                  $state.go('settings.api') //TODO: this could be improved displaying a prompt instead of going to `settings.api`
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
            updateUserPermissions: [
              '$security_service',
              async $security_service => {
                return await $security_service.updateUserPermissions()
              }
            ],
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
            updateUserPermissions: [
              '$security_service',
              async $security_service => {
                return await $security_service.updateUserPermissions()
              }
            ],
            currentDecoder: [
              '$requestService',
              '$stateParams',
              '$state',
              async ($requestService, $stateParams, $state) => {
                try {
                  const result = await $requestService.apiReq(
                    `/decoders?decoder_names=${$stateParams.name}`
                  )
                  return result
                } catch (err) {
                  $state.go('settings.api') //TODO: this could be improved displaying a prompt instead of going to `settings.api`
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
            updateUserPermissions: [
              '$security_service',
              async $security_service => {
                return await $security_service.updateUserPermissions()
              }
            ],
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
            updateUserPermissions: [
              '$security_service',
              async $security_service => {
                return await $security_service.updateUserPermissions()
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
                  $state.go('settings.api')  //TODO: this could be improved displaying a prompt instead of going to `settings.api`
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
            updateUserPermissions: [
              '$security_service',
              async $security_service => {
                return await $security_service.updateUserPermissions()
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
            updateUserPermissions: [
              '$security_service',
              async $security_service => {
                return await $security_service.updateUserPermissions()
              }
            ],
            clusterInfo: [
              '$requestService',
              async ($requestService) => {
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
            updateUserPermissions: [
              '$security_service',
              async $security_service => {
                return await $security_service.updateUserPermissions()
              }
            ],
            clusterInfo: [
              '$requestService',
              async ($requestService) => {
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
            updateUserPermissions: [
              '$security_service',
              async $security_service => {
                return await $security_service.updateUserPermissions()
              }
            ],
            statusData: [
              '$requestService',
              async ($requestService) => {
                try {
                  const responseStatus = await $requestService.apiReq(
                    '/cluster/status'
                  )
                  let promises = []
                  if (
                    (!responseStatus ||
                    !responseStatus.data ||
                    !responseStatus.data.error) &&
                    responseStatus.data.data.enabled !== 'no'
                  ) {
                    const nodes = await $requestService.apiReq('/cluster/nodes')
                    if (
                      responseStatus.data.data &&
                      responseStatus.data.data.enabled === 'yes' &&
                      responseStatus.data.data.running === 'yes'
                    ) {
                      const masterNode = nodes.data.data.affected_items.filter(
                        item => item.type === 'master'
                      )[0]
                      promises = [
                        $requestService.apiReq('/agents/summary/status'),
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
                        $requestService.apiReq('/agents/summary/status'),
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
                      $requestService.apiReq('/agents/summary/status'),
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
                  return [
                    false,
                    false,
                    false,
                    false,
                    false,
                    false
                  ]
                }
              }
            ],
            agentInfo: [
              '$requestService',
              async ($requestService) => {
                try {
                  const response = await $requestService.apiReq('/agents', {
                    limit: 1,
                    sort: '-dateAdd'
                  })

                  const lastAgent = await $requestService.apiReq(
                    `/agents?agents_list=${response.data.data.affected_items[0].id}`,
                    {}
                  )
                  return lastAgent
                } catch (err) {
                  return false
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
            isWazuhAdmin: [
              '$security_service',
              async $security_service => {
                try{
                  return await $security_service.hasWazuhRole("administrator")
                }catch(error){
                  return false;
                }
              }
            ],
          }
        })
    }
  ])
})
