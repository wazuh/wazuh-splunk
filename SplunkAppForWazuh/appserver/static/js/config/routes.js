define(['./module'], function (module) {
  'use strict'
  module.config(['$mdIconProvider', '$locationProvider', '$stateProvider', '$mdThemingProvider', function ($mdIconProvider, $locationProvider, $stateProvider, $mdThemingProvider, $navigationService) {
    $mdThemingProvider.theme('default').primaryPalette('blue').accentPalette('blue')
    $locationProvider.html5Mode({
      'enabled': true,
      'requirebase': false,
      'rewriteLinks': false
    })
    $stateProvider
      .state('overview', {
        templateUrl: 'static/app/SplunkAppForWazuh/views/overview/overview-welcome.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('overview') },
        controller: 'overviewWelcomeCtrl',
        controllerAs: 'owc',
        resolve: {
          agentsInfo: ['$requestService', ($requestService) => {
            return $requestService.apiReq('/agents/summary')
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
      // Overview - General
      .state('ow-general', {
        templateUrl: 'static/app/SplunkAppForWazuh/views/overview/overview-general.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('general') },
        controller: 'overviewGeneralCtrl',
        controllerAs: 'ogc',
      })
      // Overview - policy monitoring
      .state('ow-pm', {
        templateUrl: 'static/app/SplunkAppForWazuh/views/overview/overview-pm.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('ow-pm') },
        controller: 'overviewPolicyMonitoringCtrl',
        controllerAs: 'opm',
      })
      // Overview - FIM
      .state('ow-fim', {
        templateUrl: 'static/app/SplunkAppForWazuh/views/overview/overview-fim.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('fim') },
        controller: 'overviewFimCtrl',
        controllerAs: 'ofc',
      })
      // Overview - audit
      .state('ow-audit', {
        templateUrl: 'static/app/SplunkAppForWazuh/views/overview/overview-audit.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('ow-aud') },
        controller: 'overviewAuditCtrl',
        controllerAs: 'oac',
      })
      // Overview - OpenSCAP
      .state('ow-os', {
        templateUrl: 'static/app/SplunkAppForWazuh/views/overview/overview-openscap.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('ow-os') },
        controller: 'overviewOpenScapCtrl',
        controllerAs: 'oos',
      })
      // Overview - PCI-DSS
      .state('ow-pci', {
        templateUrl: 'static/app/SplunkAppForWazuh/views/overview/overview-pci.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('ow-pci') },
        controller: 'overviewPciCtrl',
        controllerAs: 'opd',
      })
      // Overview - GDPR
      .state('ow-gdpr', {
        templateUrl: 'static/app/SplunkAppForWazuh/views/overview/overview-gdpr.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('ow-gdpr') },
        controller: 'overviewGdprCtrl',
        controllerAs: 'ogdpr',
      })
      // Overview - Vulnerabilities
      .state('ow-vul', {
        templateUrl: 'static/app/SplunkAppForWazuh/views/overview/overview-vulnerabilities.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('ow-vul') },
        controller: 'overviewVulnerabilitiesCtrl',
        controllerAs: 'ovu',
      })
      // Manager
      .state('manager', {
        templateUrl: 'static/app/SplunkAppForWazuh/views/manager/manager-welcome.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('manager') }
        // controller: 'managerCtrl',
        // controllerAs: 'mc'
      })
      // Manager - rules
      .state('mg-logs', {
        templateUrl: 'static/app/SplunkAppForWazuh/views/manager/manager-logs.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('mg-logs') },
        controller: 'managerLogsCtrl',
        controllerAs: 'mlog',
      })
      // Manager - Ruleset
      .state('mg-rules', {
        templateUrl: 'static/app/SplunkAppForWazuh/views/manager/manager-ruleset.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('mg-rules') },
        controller: 'managerRulesetCtrl',
        controllerAs: 'mrules',
        params: { filters: null, }
      })
      // Manager - Ruleset/:id
      .state('mg-rules-id', {
        templateUrl: 'static/app/SplunkAppForWazuh/views/manager/manager-ruleset-id.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('mg-rules') },
        controller: 'managerRulesetIdCtrl',
        controllerAs: 'mrid',
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
        templateUrl: 'static/app/SplunkAppForWazuh/views/manager/manager-decoders.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('mg-decoders') },
        controller: 'managerDecodersCtrl',
        controllerAs: 'mdec',
        params: { filters: null, }
      })

      // Manager - Decoders/:id
      .state('mg-decoders-id', {
        templateUrl: 'static/app/SplunkAppForWazuh/views/manager/manager-decoders-id.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('mg-decoders') },
        controller: 'managerDecodersIdCtrl',
        controllerAs: 'mdid',
        params: { id: null, filters: null },
        resolve: {
          currentDecoder: ['$requestService', '$stateParams', ($requestService, $stateParams) => {
            return $requestService.apiReq('/decoders', { file: $stateParams.file })
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
        templateUrl: 'static/app/SplunkAppForWazuh/views/manager/groups/groups.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('mg-groups') },
        controller: 'groupsCtrl',
        controllerAs: 'mgr'
      })


      // Manager - Groups
      .state('mg-conf', {
        templateUrl: 'static/app/SplunkAppForWazuh/views/manager/configuration/configuration.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('mg-conf') },
        controller: 'configurationCtrl',
        controllerAs: 'mcc',
        resolve: {
          managerConf: ['$requestService', ($requestService) => {
            return $requestService.apiReq('/manager/configuration')
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

      // Manager - Status
      .state('mg-status', {
        templateUrl: 'static/app/SplunkAppForWazuh/views/manager/status/status.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('mg-status') },
        controller: 'statusCtrl',
        controllerAs: 'mst',
        resolve: {
          overviewData: ['$requestService', ($requestService) => {
            return Promise.all([
              $requestService.apiReq('/agents/summary'),
              $requestService.apiReq('/manager/status'),
              $requestService.apiReq('/manager/info'),
              $requestService.apiReq('/rules', { offset: 0, limit: 1 }),
              $requestService.apiReq('/decoders', { offset: 0, limit: 1 })
            ])
              .then(function (response) {
                return response
              }, function (response) {
                return response
              })
              .catch(err => {
                console.error('Error route: ', err)
              })
          }],
          agentInfo: ['$requestService', ($requestService) => {
            return $requestService.apiReq('/agents', { limit: 1, sort: '-dateAdd' })
              .then(function (response) {
                return $requestService.apiReq('/agents/${response.data.data.items[0].id}', {})
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

      // settings
      .state('settings', { abstract: true, templateUrl: 'static/app/SplunkAppForWazuh/views/settings/settings.html', onEnter: ($navigationService) => { $navigationService.storeRoute('settings.api') } })
      // settings -> about
      .state('settings.about', { templateUrl: '/static/app/SplunkAppForWazuh/views/settings/about.html', onEnter: ($navigationService) => { $navigationService.storeRoute('settings.about') } })
      // settings -> api
      .state('settings.api', {
        templateUrl: '/static/app/SplunkAppForWazuh/views/settings/api.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('settings.api') },
        controller: 'settingsApiCtrl',
        controllerAs: 'sac',
        resolve: {
          apiList: ['$currentDataService', ($currentDataService) => {
            return $currentDataService.getApiList()
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
      .state('settings.index', { templateUrl: '/static/app/SplunkAppForWazuh/views/settings/index.html', onEnter: ($navigationService) => { $navigationService.storeRoute('settings.index') } })

      // agents
      .state('agents', {
        templateUrl: '/static/app/SplunkAppForWazuh/views/agents/agents/agents.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('agents') },
        controller: 'agentsCtrl',
        controllerAs: 'ag',
        resolve: {
          data: ['$requestService','$state', ($requestService, $state) => {
            return Promise.all([
              $requestService.apiReq('/agents/summary'),
              $requestService.apiReq('/agents', { limit: 1, sort: '-dateAdd' }),
              $requestService.httpReq('GET', '/agents/agents_uniq', false)
            ])
              .then(function (response) {
                return response
              }, function (response) {
                return response
              })
          }]
        }
      })

      // agents/:id
      .state('agent-overview', {
        templateUrl: '/static/app/SplunkAppForWazuh/views/agents/overview/overview.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('agent-overview') },
        controller: 'agentsOverviewCtrl',
        controllerAs: 'aoc',
        params: { id: null },
        resolve: {
          agent: ['$requestService', '$stateParams', '$currentDataService', ($requestService, $stateParams, $currentDataService) => {
            const id = $stateParams.id || $currentDataService.getCurrentAgent() || '000'
            return Promise.all([
              $requestService.apiReq(`/agents/${id}`),
              $requestService.apiReq(`/syscheck/${id}/last_scan`),
              $requestService.apiReq(`/rootcheck/${id}/last_scan`),
              $requestService.apiReq(`/syscollector/${id}/hardware`),
              $requestService.apiReq(`/syscollector/${id}/os`)
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

      // agents - General
      .state('ag-general', {
        templateUrl: 'static/app/SplunkAppForWazuh/views/agents/general/agents-general.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('ag-general') },
        controller: 'agentsGeneralCtrl',
        controllerAs: 'agc',
        params: { id: null },
        resolve: {
          agent: ['$requestService', '$stateParams', '$currentDataService', ($requestService, $stateParams, $currentDataService) => {
            const id = $stateParams.id || $currentDataService.getCurrentAgent() || '000'
            return $requestService.apiReq(`/agents/${id}`)
              .then(function (response) {
                return response
              }, function (response) {
                return response
              })
          }]
        }
      })

      // agents - policy monitoring
      .state('ag-pm', {
        templateUrl: 'static/app/SplunkAppForWazuh/views/agents/policy-monitoring/agents-pm.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('ag-pm') },
        controller: 'agentsPolicyMonitoringCtrl',
        controllerAs: 'apm',
        params: { id: null },
        resolve: {
          agent: ['$requestService', '$stateParams', '$currentDataService', ($requestService, $stateParams, $currentDataService) => {
            const id = $stateParams.id || $currentDataService.getCurrentAgent() || '000'
            return $requestService.apiReq(`/agents/${id}`)
              .then(function (response) {
                return response
              }, function (response) {
                return response
              })
          }]
        }
      })

      // agents - FIM
      .state('ag-fim', {
        templateUrl: 'static/app/SplunkAppForWazuh/views/agents/fim/agents-fim.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('ag-fim') },
        controller: 'agentsFimCtrl',
        controllerAs: 'afc',
        params: { id: null },
        resolve: {
          agent: ['$requestService', '$stateParams', '$currentDataService', ($requestService, $stateParams, $currentDataService) => {
            const id = $stateParams.id || $currentDataService.getCurrentAgent() || '000'
            return $requestService.apiReq(`/agents/${id}`)
              .then(function (response) {
                return response
              }, function (response) {
                return response
              })
          }]
        }
      })

      // agents - audit
      .state('ag-audit', {
        templateUrl: 'static/app/SplunkAppForWazuh/views/agents/audit/agents-audit.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('ag-audit') },
        controller: 'agentsAuditCtrl',
        controllerAs: 'aac',
        params: { id: null },
        resolve: {
          agent: ['$requestService', '$stateParams', '$currentDataService', ($requestService, $stateParams, $currentDataService) => {
            const id = $stateParams.id || $currentDataService.getCurrentAgent() || '000'
            return $requestService.apiReq(`/agents/${id}`)
              .then(function (response) {
                return response
              }, function (response) {
                return response
              })
          }]
        }
      })

      // agents - OpenSCAP
      .state('ag-os', {
        templateUrl: 'static/app/SplunkAppForWazuh/views/agents/agents/agents-openscap.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('ag-os') },
        controller: 'agentsOpenScapCtrl',
        controllerAs: 'aos',
        params: { id: null },
        resolve: {
          agent: ['$requestService', '$stateParams', '$currentDataService', ($requestService, $stateParams, $currentDataService) => {
            const id = $stateParams.id || $currentDataService.getCurrentAgent() || '000'
            return $requestService.apiReq(`/agents/${id}`)
              .then(function (response) {
                return response
              }, function (response) {
                return response
              })
          }]
        }

      })
      // agents - PCI-DSS
      .state('ag-pci', {
        templateUrl: 'static/app/SplunkAppForWazuh/views/agents/pcidss/agents-pci.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('ag-pci') },
        controller: 'agentsPciCtrl',
        controllerAs: 'apd',
        params: { id: null },
        resolve: {
          agent: ['$requestService', '$stateParams', '$currentDataService', ($requestService, $stateParams, $currentDataService) => {
            const id = $stateParams.id || $currentDataService.getCurrentAgent() || '000'
            return $requestService.apiReq(`/agents/${id}`)
              .then(function (response) {
                return response
              }, function (response) {
                return response
              })
          }]
        }
      })
      // agents - configuration
      .state('ag-conf', {
        templateUrl: 'static/app/SplunkAppForWazuh/views/agents/configuration/configuration.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('ag-conf') },
        controller: 'agentConfigCtrl',
        controllerAs: 'acc',
        params: { id: null },
        resolve: {
          config: ['$requestService', '$stateParams', '$currentDataService', ($requestService, $stateParams, $currentDataService) => {
            const id = $stateParams.id || $currentDataService.getCurrentAgent() || '000'
            return $requestService.apiReq(`/agents/${id}`)
              .then(function (response) {
                const group = response.data.data.group || 'default'
                return Promise.all([
                  $requestService.apiReq(`/agents/groups/${group}/configuration`, {}),
                  $requestService.apiReq(`/agents/groups?search=${group}`, {}),
                  $requestService.apiReq(`/agents/groups/${group}`, {})
                ])
                  .then(function (responseAll) {
                    return { response: response, responseAll: responseAll }
                  }, function (responseAll) {
                    console.error('error getting configuration')
                    return responseAll
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
      // agents - GDPR
      .state('ag-gdpr', {
        templateUrl: 'static/app/SplunkAppForWazuh/views/agents/gdpr/agents-gdpr.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('ag-gdpr') },
        controller: 'agentsGdprCtrl',
        controllerAs: 'agdpr',
        params: { id: null },
        resolve: {
          agent: ['$requestService', '$stateParams', '$currentDataService', ($requestService, $stateParams, $currentDataService) => {
            const id = $stateParams.id || $currentDataService.getCurrentAgent() || '000'
            return $requestService.apiReq(`/agents/${id}`)
              .then(function (response) {
                return response
              }, function (response) {
                return response
              })
          }]
        }
      })
      // agents - Vulnerabilities
      .state('ag-vul', {
        templateUrl: 'static/app/SplunkAppForWazuh/views/agents/vulnerabilities/agents-vulnerabilities.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('ag-vul') },
        controller: 'agentsVulnerabilitiesCtrl',
        controllerAs: 'avu',
        params: { id: null },
        resolve: {
          agent: ['$requestService', '$stateParams', '$currentDataService', ($requestService, $stateParams, $currentDataService) => {
            const id = $stateParams.id || $currentDataService.getCurrentAgent() || '000'
            return $requestService.apiReq(`/agents/${id}`)
              .then(function (response) {
                return response
              }, function (response) {
                return response
              })
          }]
        }

      })
  }])
})
