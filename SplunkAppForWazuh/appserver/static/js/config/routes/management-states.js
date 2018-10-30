define(['../module'], function (module) {
  'use strict'
  
  module.config([ '$stateProvider','BASE_URL', function ($stateProvider,BASE_URL) {
    $stateProvider
    
    // Manager
    .state('manager', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/management/welcome/manager-welcome.html',
    })
    // Manager - Monitoring
    .state('mg-monitoring', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/management/monitoring/monitoring.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('mg-monitoring') },
      controller: 'monitoringCtrl',
      params: { id: null, filters: null },
      resolve: {
        monitoringInfo: ['$requestService', '$stateParams', ($requestService, $stateParams) => {
          return Promise.all([
            $requestService.apiReq('/cluster/status'),
            $requestService.apiReq('/cluster/nodes'),
            $requestService.apiReq('/cluster/config'),
            $requestService.apiReq('/version'),
            $requestService.apiReq('/agents', { limit: 1 }),
            $requestService.apiReq('/cluster/healthcheck')
          ])
          .then(function (response) {
            return response
          }, function (response) {
            return response
          })
          .catch(err => {
            console.error('Error route: ', err)
          })
        }]
      }
    })
    // Manager - rules
    .state('mg-logs', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/management/logs/manager-logs.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('mg-logs') },
      controller: 'managerLogsCtrl',
      controllerAs: 'mlog',
    })
    // Manager - Ruleset
    .state('mg-rules', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/management/rules/manager-ruleset.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('mg-rules') },
      controller: 'managerRulesetCtrl',
      params: { filters: null }
    })
    // Manager - Ruleset/:id
    .state('mg-rules-id', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/management/rules/manager-ruleset-id.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('mg-rules') },
      controller: 'managerRulesetIdCtrl',
      params: { id: null, filters: null },
      resolve: {
        ruleInfo: ['$requestService', '$stateParams', ($requestService, $stateParams) => {
          return $requestService.apiReq(`/rules/${$stateParams.id}`)
          .then(function (response) {
            return response
          }, function (response) {
            return response
          })
          .catch(err => {
            console.error('Error route: ', err)
          })
        }]
      }
    })
    // Manager - Decoders
    .state('mg-decoders', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/management/decoders/manager-decoders.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('mg-decoders') },
      controller: 'managerDecodersCtrl',
      controllerAs: 'mdec',
      params: { filters: null, }
    })
    
    // Manager - Decoders/:id
    .state('mg-decoders-id', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/management/decoders/manager-decoders-id.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('mg-decoders') },
      controller: 'managerDecodersIdCtrl',
      controllerAs: 'mdid',
      params: { id: null, name: null },
      resolve: {
        currentDecoder: ['$requestService', '$stateParams', ($requestService, $stateParams) => {
          return $requestService.apiReq(`/decoders/${$stateParams.name}`)
          .then(function (response) {
            return response
          }, function (response) {
            return response
          })
          .catch(err => {
            console.error('Error route: ', err)
          })
        }]
      }
    })
    
    // Manager - Groups
    .state('mg-groups', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/management/groups/groups.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('mg-groups') },
      controller: 'groupsCtrl',
      controllerAs: 'mgr',
      params: { group: null }
    })
    
    // Manager - Groups
    .state('mg-conf', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/management/configuration/configuration.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('mg-conf') },
    })
    
    // Manager - Status
    .state('mg-status', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/management/status/status.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('mg-status') },
      controller: 'statusCtrl',
      controllerAs: 'mst',
      resolve: {
        statusData: ['$requestService', async ($requestService) => {
          const responseStatus = await $requestService.apiReq('/cluster/status')
          if (!responseStatus || !responseStatus.data || !responseStatus.data.error){
            const nodes = await $requestService.apiReq('/cluster/nodes')
            if (responseStatus.data.data && responseStatus.data.data.enabled === 'yes' && responseStatus.data.data.running === 'yes') {
              const masterNode = nodes.data.data.items.filter(item => item.type === 'master')[0]
              return Promise.all([
                $requestService.apiReq('/agents/summary'),
                $requestService.apiReq(`/cluster/${masterNode.name}/status`),
                $requestService.apiReq(`/cluster/${masterNode.name}/info`),
                $requestService.apiReq('/rules', { offset: 0, limit: 1 }),
                $requestService.apiReq('/decoders', { offset: 0, limit: 1 }),
                Promise.resolve(masterNode),
                Promise.resolve(nodes),
                Promise.resolve(responseStatus.data)
              ])
              .then(function (response) {
                return response
              }, function (response) {
                return response
              })
              .catch(err => {
                console.error('Error route: ', err)
              })
            } else if(responseStatus.data.data.enabled === 'yes' && responseStatus.data.data.running === 'no'){
              return Promise.all([
                $requestService.apiReq('/agents/summary'),
                Promise.resolve(false),
                Promise.resolve(false),
                $requestService.apiReq('/rules', { offset: 0, limit: 1 }),
                $requestService.apiReq('/decoders', { offset: 0, limit: 1 }),
                Promise.resolve(false),
                Promise.resolve(nodes),
                Promise.resolve(responseStatus.data)
              ])
              .then(function (response) {
                return response
              }, function (response) {
                return response
              })
              .catch(err => {
                console.error('Error route: ', err)
              })
            } else {
              return Promise.all([
                $requestService.apiReq('/agents/summary'),
                $requestService.apiReq(`/manager/status`),
                $requestService.apiReq(`/manager/info`),
                $requestService.apiReq('/rules', { offset: 0, limit: 1 }),
                $requestService.apiReq('/decoders', { offset: 0, limit: 1 }),
                Promise.resolve(false)
                
              ])
              .then(function (response) {
                return response
              }, function (response) {
                return response
              })
              .catch(err => {
                console.error('Error route: ', err)
              })
            }
          } else {
            return Promise.all([
              $requestService.apiReq('/agents/summary'),
              $requestService.apiReq(`/manager/status`),
              $requestService.apiReq(`/manager/info`),
              $requestService.apiReq('/rules', { offset: 0, limit: 1 }),
              $requestService.apiReq('/decoders', { offset: 0, limit: 1 }),
              Promise.resolve(false)
            ])
            .then(function (response) {
              return response
            }, function (response) {
              return response
            })
            .catch(err => {
              console.error('Error route: ', err)
            })
          }
        }],
        agentInfo: ['$requestService', ($requestService) => {
          return $requestService.apiReq('/agents', { limit: 1, sort: '-dateAdd' })
          .then(function (response) {
            return $requestService.apiReq(`/agents/${response.data.data.items[0].id}`, {})
            .then(function (response) {
              return response
            }, function (response) {
              console.error('error getting last agent')
              return response
            })
            .catch(err => {
              console.error('Error route: ', err)
            })
          }, function (response) {
            console.error('error getting agents')
            return response
          })
          .catch(err => {
            console.error('Error route: ', err)
          })
        }]
      }
    })
  }])
})
