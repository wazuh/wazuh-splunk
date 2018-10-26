define(['../module'], function (module) {
    'use strict'
    
    module.config([ '$stateProvider','BASE_URL', function ($stateProvider,BASE_URL) {
      $stateProvider

    // agents
    .state('agents', {
        templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/agents/agents/agents.html',
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
        templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/agents/overview/overview.html',
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
              $requestService.apiReq(`/syscollector/${id}/os`),
              $requestService.apiReq(`/agents/${id}/group/is_sync`)
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
        templateUrl: 'static/app/SplunkAppForWazuh/js/controllers/agents/inventory/inventory.html',
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
        templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/agents/osquery/osquery.html',
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
        templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/agents/general/agents-general.html',
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
      
      // agents - FIM
      .state('ag-fim', {
        templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/agents/fim/agents-fim.html',
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
        templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/agents/audit/agents-audit.html',
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
        templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/agents/scap/agents-openscap.html',
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
      
      // agents - configuration
      .state('ag-conf', {
        //TODO change templateUrl location
        //templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/agents/configuration/configuration.html',
        templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/manager/configuration/configuration.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('ag-conf') },
        controller: 'configurationAgentCtrl',
        params: { id: null },
        resolve: {
          data: ['$requestService', '$stateParams', '$currentDataService', ($requestService, $stateParams, $currentDataService) => {
            const id = $stateParams.id || $currentDataService.getCurrentAgent() || '000'
            return $requestService.apiReq(`/agents/${id}/group/is_sync`)
            .then(function (response) {
              return response
            }, function (response) {
              return response
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
      
      // agents - GDPR
      .state('ag-gdpr', {
        templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/agents/gdpr/agents-gdpr.html',
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
      
      
      // agents - policy monitoring
      .state('ag-pm', {
        templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/agents/policy-monitoring/agents-pm.html',
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
      
      // agents - PCI-DSS
      .state('ag-pci', {
        templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/agents/pcidss/agents-pci.html',
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
      
      // agents - Vulnerabilities
      .state('ag-vul', {
        templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/agents/vulnerabilities/agents-vulnerabilities.html',
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
