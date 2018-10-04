define(['./module'], function (module) {
  'use strict'
  module.paths = {
    root: `${window.location.href.split(/\/[a-z][a-z]-[A-Z][A-Z]\//)[0]}/`,
  }
  module.constant('BASE_URL', module.paths.root)
  module.config(['$mdIconProvider', '$locationProvider', '$stateProvider', '$mdThemingProvider', 'BASE_URL', function ($mdIconProvider, $locationProvider, $stateProvider, $mdThemingProvider, BASE_URL) {
    $mdThemingProvider.theme('default').primaryPalette('blue').accentPalette('blue')
    $locationProvider.html5Mode({
      'enabled': true,
      'requirebase': false,
      'rewriteLinks': false
    })
    $stateProvider
    .state('overview', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/overview/overview-welcome.html',
      // onEnter: ($navigationService) => { $navigationService.storeRoute('overview') },
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
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/overview/overview-general.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('ow-general') },
      controller: 'overviewGeneralCtrl',
      controllerAs: 'ogc',
      resolve: {
        pollingState: ['$requestService', ($requestService) => {
          return $requestService.httpReq(`GET`, `/manager/polling_state`)
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
    // Overview - policy monitoring
    .state('ow-pm', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/overview/overview-pm.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('ow-pm') },
      controller: 'overviewPolicyMonitoringCtrl',
      controllerAs: 'opm',
    })
    // Overview - FIM
    .state('ow-fim', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/overview/overview-fim.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('ow-fim') },
      controller: 'overviewFimCtrl',
      controllerAs: 'ofc',
    })
    // Overview - FIM
    .state('ow-osquery', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/overview/osquery/osquery.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('ow-osquery') },
      controller: 'osqueryCtrl',
      controllerAs: 'oqc',
      resolve: {
        osquery: ['$requestService', ($requestService) => {
          return $requestService.apiReq(`/agents/000/config/wmodules/wmodules`)
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
    // Overview - audit
    .state('ow-audit', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/overview/overview-audit.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('ow-audit') },
      controller: 'overviewAuditCtrl',
      controllerAs: 'oac',
    })
    // Overview - OpenSCAP
    .state('ow-os', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/overview/overview-openscap.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('ow-os') },
      controller: 'overviewOpenScapCtrl',
      controllerAs: 'oos',
    })
    // Overview - PCI-DSS
    .state('ow-pci', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/overview/overview-pci.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('ow-pci') },
      controller: 'overviewPciCtrl',
      controllerAs: 'opd',
    })
    // Overview - GDPR
    .state('ow-gdpr', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/overview/overview-gdpr.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('ow-gdpr') },
      controller: 'overviewGdprCtrl',
      controllerAs: 'ogdpr',
    })
    // Overview - Vulnerabilities
    .state('ow-vul', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/overview/overview-vulnerabilities.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('ow-vul') },
      controller: 'overviewVulnerabilitiesCtrl',
      controllerAs: 'ovu',
    })
    // Manager
    .state('manager', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/manager/manager-welcome.html',
      // onEnter: ($navigationService) => { $navigationService.storeRoute('manager') }
      // controller: 'managerCtrl',
      // controllerAs: 'mc'
    })
    // Manager - Monitoring
    .state('mg-monitoring', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/manager/monitoring/monitoring.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('mg-monitoring') },
      controller: 'monitoringCtrl',
      controllerAs: 'mmt',
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
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/manager/manager-logs.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('mg-logs') },
      controller: 'managerLogsCtrl',
      controllerAs: 'mlog',
    })
    // Manager - Ruleset
    .state('mg-rules', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/manager/manager-ruleset.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('mg-rules') },
      controller: 'managerRulesetCtrl',
      controllerAs: 'mrules',
      params: { filters: null }
    })
    // Manager - Ruleset/:id
    .state('mg-rules-id', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/manager/manager-ruleset-id.html',
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
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/manager/manager-decoders.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('mg-decoders') },
      controller: 'managerDecodersCtrl',
      controllerAs: 'mdec',
      params: { filters: null, }
    })
    
    // Manager - Decoders/:id
    .state('mg-decoders-id', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/manager/manager-decoders-id.html',
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
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/manager/groups/groups.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('mg-groups') },
      controller: 'groupsCtrl',
      controllerAs: 'mgr',
      params: { group: null }
    })
    
    // Manager - Groups
    .state('mg-conf', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/manager/configuration/configuration.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('mg-conf') },
    })
    
    // Manager - Status
    .state('mg-status', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/manager/status/status.html',
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
    .state('settings', { abstract: true, templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/settings/settings.html', onEnter: ($navigationService) => { $navigationService.storeRoute('settings.api') } })
    // settings -> about
    .state('settings.about', { templateUrl: BASE_URL + '/static/app/SplunkAppForWazuh/views/settings/about.html', onEnter: ($navigationService) => { $navigationService.storeRoute('settings.about') } })
    // settings -> api
    .state('settings.api', {
      templateUrl: BASE_URL + '/static/app/SplunkAppForWazuh/views/settings/api.html',
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
    
    .state('settings.index', { templateUrl: BASE_URL + '/static/app/SplunkAppForWazuh/views/settings/index.html', onEnter: ($navigationService) => { $navigationService.storeRoute('settings.index') } })
    .state('settings.logs', {
      templateUrl: '/static/app/SplunkAppForWazuh/views/settings/logs/logs.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('settings.logs') },
      controller: 'logsCtrl',
      controllerAs: 'slc',
      resolve: {
        logs: ['$requestService', ($requestService) => {
          return $requestService.httpReq(`GET`,`/manager/get_log_lines`)
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
    
    
    // agents
    .state('agents', {
      templateUrl: BASE_URL + '/static/app/SplunkAppForWazuh/views/agents/agents/agents.html',
      // onEnter: ($navigationService) => { $navigationService.storeRoute('agents') },
      controller: 'agentsCtrl',
      controllerAs: 'ag',
      resolve: {
        data: ['$requestService', '$currentDataService', ($requestService, $currentDataService) => {
          return Promise.all([
            $requestService.apiReq('/agents/summary'),
            $requestService.apiReq('/agents', { limit: 1, sort: '-dateAdd' }),
            $requestService.httpReq('GET', `/agents/agents_uniq?id=${$currentDataService.getApi().id}`)
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
      templateUrl: BASE_URL + '/static/app/SplunkAppForWazuh/views/agents/overview/overview.html',
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
    
    // agents/:id
    .state('ag-inventory', {
      templateUrl: '/static/app/SplunkAppForWazuh/views/agents/inventory/inventory.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('ag-inventory') },
      controller: 'inventoryCtrl',
      controllerAs: 'aic',
      params: { id: null },
      resolve: {
        syscollector: ['$requestService', '$stateParams', '$currentDataService', ($requestService, $stateParams, $currentDataService) => {
          const id = $stateParams.id || $currentDataService.getCurrentAgent() || '000'
          return Promise.all([
            $requestService.apiReq(`/syscollector/${id}/hardware`),
            $requestService.apiReq(`/syscollector/${id}/os`),
            $requestService.apiReq(`/syscollector/${id}/netiface`),
            $requestService.apiReq(`/syscollector/${id}/ports`, { limit: 1 }),
            $requestService.apiReq(`/syscollector/${id}/packages`, { limit: 1, select: 'scan_time' }),
            $requestService.apiReq(`/agents/${id}`)
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
    
    // Agents - Osquery
    .state('ag-osquery', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/agents/osquery/osquery.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('ag-osquery') },
      controller: 'osqueryAgentCtrl',
      controllerAs: 'aoq',
      params: { id: null },
      resolve: {
        osquery: ['$requestService','$currentDataService', '$stateParams', ($requestService,$currentDataService, $stateParams) => {
          const id = $stateParams.id || $currentDataService.getCurrentAgent() || '000'
          return $requestService.apiReq(`/agents/${id}/config/wmodules/wmodules`)
          .then(function (response) {
            return response
          }, function (response) {
            return response
          })
          .catch(err => {
            console.error('Error route: ', err)
          })
        }],
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

    // agents - General
    .state('ag-general', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/agents/general/agents-general.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('ag-general') },
      controller: 'agentsGeneralCtrl',
      controllerAs: 'agc',
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
        }]
      }
    })
    
    // agents - policy monitoring
    .state('ag-pm', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/agents/policy-monitoring/agents-pm.html',
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
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/agents/fim/agents-fim.html',
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
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/agents/audit/agents-audit.html',
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
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/agents/scap/agents-openscap.html',
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
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/agents/pcidss/agents-pci.html',
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
    // Manager - Groups
    .state('ag-conf', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/manager/configuration/configuration.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('ag-conf') },
      controller: 'configurationAgentCtrl',
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
    // agents - GDPR
    .state('ag-gdpr', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/agents/gdpr/agents-gdpr.html',
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
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/agents/vulnerabilities/agents-vulnerabilities.html',
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
    
    // =========== Dev Tools =========== //
    .state('dev-tools', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/dev-tools/dev-tools.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('dev-tools') },
      // controller: 'devToolsCtrl',
      // controllerAs: 'dt'
    })
    // =========== AWS =========== //
    .state('aws', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/overview/aws/aws.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('aws') },
      controller: 'awsCtrl',
      controllerAs: 'aws'
    })  
  }])
})
