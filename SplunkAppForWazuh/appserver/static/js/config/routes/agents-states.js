define(['../module'], function (module) {
  'use strict'
  
  module.config([ '$stateProvider','BASE_URL', function ($stateProvider,BASE_URL) {
    $stateProvider
    
    // agents
    // agents
    .state('agents', {
      templateUrl: BASE_URL + '/static/app/SplunkAppForWazuh/js/controllers/agents/agents/agents.html',
      controller: 'agentsCtrl',
      resolve: {
        agentData: ['$requestService','$state', async ($requestService, $state) => {
          try{
            const responseStatus = await $requestService.apiReq('/cluster/status')
            return Promise.all([
              $requestService.apiReq('/agents/summary'),
              $requestService.apiReq('/agents', { limit: 1, sort: '-dateAdd' }),
              $requestService.apiReq('/agents/stats/distinct', { fields: 'os.name,os.version,os.platform', select: 'os.name,os.version,os.platform' }),
              $requestService.apiReq('/agents/stats/distinct', { fields: 'version', select: 'version' }),
              (responseStatus && responseStatus.data && responseStatus.data.data && responseStatus.data.data.enabled === 'yes' && responseStatus.data.data.running === 'yes') 
              ? $requestService.apiReq('/agents/stats/distinct', { fields: 'node_name', select: 'node_name' }) 
              : Promise.resolve(false),
              $requestService.apiReq('/agents/groups', {}),
            ])
            .then(function (response) {
              return response
            }, function (response) {
              return response
            })
          } catch(err) {
            $state.go('settings.api')
          }
        }]
      }
    })
    
    // agents/:id
    .state('agent-overview', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/agents/overview/overview.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('agent-overview') },
      controller: 'agentsOverviewCtrl',
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
            $state.go('settings.api')
          })
        }],
        extensions: ['$requestService', '$currentDataService', async ($requestService, $currentDataService) => {
          try{
            const id = $currentDataService.getApi().id
            const currentExtensions = $currentDataService.getExtensions(id)
            const result = (currentExtensions) ? currentExtensions : $requestService.httpReq(`GET`,`/manager/extensions`)
            return await result
          }catch(err) {
            return false
          }
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
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/management/configuration/configuration.html',
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
