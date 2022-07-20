define(['../module'], function (module) {
  'use strict'

  module.config([
    '$stateProvider',
    'BASE_URL',
    function ($stateProvider, BASE_URL) {
      $stateProvider

        // agents
        .state('agents', {
          templateUrl:
            BASE_URL +
            '/static/app/SplunkAppForWazuh/js/controllers/agents/agents/agents.html',
          controller: 'agentsCtrl',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('agents')
          },
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
            ],
            agentData: [
              '$requestService',
              async ($requestService) => {
                try {
                  const agentsSummary = await $requestService.apiReq(
                    '/overview/agents'
                  )
                  return agentsSummary
                } catch (err) {
                  return false
                }
              },
            ],
            clusterInfo: [
              '$requestService',
              async ($requestService) => {
                try {
                  const clusterData = await $requestService.apiReq(
                    '/cluster/status'
                  )
                  return clusterData.data.data
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })

        // agents/:id
        .state('agent-overview', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/overview/overview.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('agent-overview')
          },
          controller: 'agentsOverviewCtrl',
          params: { id: null },
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
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
                  const results = $requestService.apiReq(`/agents?q=id=${id}`)
                  return results
                } catch (err) {
                  return false
                }
              },
            ],
            extensions: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.getCurrentExtensions()
                } catch (err) {
                  return false
                }
              },
            ],
            groups: [
              '$requestService',
              async ($requestService) => {
                try {
                  return await $requestService.apiReq('/groups')
                } catch (err) {
                  return { error: 'Cannot fetch group from API' }
                }
              },
            ],
          },
        })

        // agents/:id
        .state('ag-inventory', {
          templateUrl:
            'static/app/SplunkAppForWazuh/js/controllers/agents/inventory/inventory.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ag-inventory')
          },
          controller: 'inventoryCtrl',
          params: { id: null },
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
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
                  const result = await $requestService.apiReq(
                    `/agents?q=id=${id}`
                  )
                  return result
                } catch (err) {
                  console.error(err)
                  return {}
                }
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
          },
        })

        // Agents - Osquery
        .state('ag-osquery', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/osquery/osquery.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ag-osquery')
          },
          controller: 'osqueryAgentCtrl',
          params: { id: null },
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
            ],
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
                  return false
                }
              },
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
                  const result = await $requestService.apiReq(
                    `/agents?q=id=${id}`
                  )
                  return result
                } catch (err) {
                  return false
                }
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            extensions: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.getCurrentExtensions()
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })

        // agents - General
        .state('ag-general', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/general/agents-general.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ag-general')
          },
          controller: 'agentsGeneralCtrl',
          params: { id: null },
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
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
                  const results = await Promise.all([
                    $requestService.apiReq(`/agents?q=id=${id}`),
                    $requestService.apiReq(`/syscheck/${id}/last_scan`),
                    $requestService.apiReq(`/rootcheck/${id}/last_scan`),
                  ])
                  return results
                } catch (err) {
                  return false
                }
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
          },
        })

        // agents - FIM
        .state('ag-fim', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/fim/agents-fim.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ag-fim')
          },
          controller: 'agentsFimCtrl',
          params: { id: null },
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
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
                  const result = await $requestService.apiReq(
                    `/agents?q=id=${id}`
                  )
                  return result
                } catch (err) {
                  return false
                }
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
          },
        })

        // agents - VirusTotal
        .state('ag-virustotal', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/virustotal/agents-virustotal.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ag-virustotal')
          },
          controller: 'agentsVirusTotalCtrl',
          params: { id: null },
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
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
                  const result = await $requestService.apiReq(
                    `/agents?q=id=${id}`
                  )
                  return result
                } catch (err) {
                  return false
                }
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            extensions: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.getCurrentExtensions()
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })

        // agents - audit
        .state('ag-audit', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/audit/agents-audit.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ag-audit')
          },
          controller: 'agentsAuditCtrl',
          params: { id: null },
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
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
                  const result = await $requestService.apiReq(
                    `/agents?q=id=${id}`
                  )
                  return result
                } catch (err) {
                  return false
                }
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            extensions: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.getCurrentExtensions()
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })

        // agents - OpenSCAP
        .state('ag-os', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/scap/agents-openscap.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ag-os')
          },
          controller: 'agentsOpenScapCtrl',
          params: { id: null },
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
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
                  const result = await $requestService.apiReq(
                    `/agents?q=id=${id}`
                  )
                  return result
                } catch (err) {
                  return false
                }
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            extensions: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.getCurrentExtensions()
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })

        // agents - configuration
        .state('ag-conf', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/management/configuration/both-configuration.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ag-conf')
          },
          controller: 'configurationAgentCtrl',
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
                  const result = await $requestService.apiReq(
                    `/agents?q=id=${id}`
                  )
                  return result
                } catch (err) {
                  return false
                }
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
          },
        })

        // agents - GDPR
        .state('ag-gdpr', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/gdpr/agents-gdpr.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ag-gdpr')
          },
          controller: 'agentsGdprCtrl',
          params: { id: null },
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
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
                  const result = await $requestService.apiReq(
                    `/agents?q=id=${id}`
                  )
                  return result
                } catch (err) {
                  return false
                }
              },
            ],
            gdprTabs: [
              '$requestService',
              '$state',
              async ($requestService) => {
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
                  return false
                }
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            pciExtensionEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.extensionIsEnabled('pci')
                } catch (err) {
                  return false
                }
              },
            ],
            hipaaExtensionEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.extensionIsEnabled('hipaa')
                } catch (err) {
                  return false
                }
              },
            ],
            nistExtensionEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.extensionIsEnabled('nist')
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })
        // agents - HIPAA
        .state('ag-hipaa', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/hipaa/agents-hipaa.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ag-hipaa')
          },
          controller: 'agentsHipaaCtrl',
          params: { id: null },
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
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
                  const result = await $requestService.apiReq(
                    `/agents?q=id=${id}`
                  )
                  return result
                } catch (err) {
                  return false
                }
              },
            ],
            hipaaTabs: [
              '$requestService',
              '$state',
              async ($requestService) => {
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
                  return false
                }
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            pciExtensionEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.extensionIsEnabled('pci')
                } catch (err) {
                  return false
                }
              },
            ],
            gdprExtensionEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.extensionIsEnabled('gdpr')
                } catch (err) {
                  return false
                }
              },
            ],
            nistExtensionEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.extensionIsEnabled('nist')
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })
        // agents - NIST 800-53
        .state('ag-nist', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/nist/agents-nist.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ag-nist')
          },
          controller: 'agentsNistCtrl',
          params: { id: null },
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
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
                  const result = await $requestService.apiReq(
                    `/agents?q=id=${id}`
                  )
                  return result
                } catch (err) {
                  return false
                }
              },
            ],
            nistTabs: [
              '$requestService',
              '$state',
              async ($requestService) => {
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
                  return false
                }
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            pciExtensionEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.extensionIsEnabled('pci')
                } catch (err) {
                  return false
                }
              },
            ],
            gdprExtensionEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.extensionIsEnabled('gdpr')
                } catch (err) {
                  return false
                }
              },
            ],
            hipaaExtensionEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.extensionIsEnabled('hipaa')
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })
        // agents - policy monitoring
        .state('ag-pm', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/policy-monitoring/agents-pm.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ag-pm')
          },
          controller: 'agentsPolicyMonitoringCtrl',
          params: { id: null },
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
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
                  const result = await $requestService.apiReq(
                    `/agents?q=id=${id}`
                  )
                  return result
                } catch (err) {
                  return false
                }
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            extensions: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.getCurrentExtensions()
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })

        // agents - configuration assessments
        .state('ag-ca', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/configuration-assessment/agents-ca.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ag-ca')
          },
          controller: 'agentsConfigurationAssessmentsCtrl',
          params: { id: null },
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
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
                  const result = await $requestService.apiReq(
                    `/agents?q=id=${id}`
                  )
                  return result
                } catch (err) {
                  return false
                }
              },
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
                  return false
                }
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            extensions: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.getCurrentExtensions()
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })

        // agents - PCI-DSS
        .state('ag-pci', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/pcidss/agents-pci.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ag-pci')
          },
          controller: 'agentsPciCtrl',
          params: { id: null },
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
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
                  const result = await $requestService.apiReq(
                    `/agents?q=id=${id}`
                  )
                  return result
                } catch (err) {
                  return false
                }
              },
            ],
            pciTabs: [
              '$requestService',
              async ($requestService) => {
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
                  return false
                }
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            gdprExtensionEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.extensionIsEnabled('gdpr')
                } catch (err) {
                  return false
                }
              },
            ],
            hipaaExtensionEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.extensionIsEnabled('hipaa')
                } catch (err) {
                  return false
                }
              },
            ],
            nistExtensionEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.extensionIsEnabled('nist')
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })

        // agents - CIS-CAT
        .state('ag-ciscat', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/ciscat/agents-ciscat.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ag-ciscat')
          },
          controller: 'agentsCiscatCtrl',
          params: { id: null },
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
            ],
            agent: [
              '$requestService',
              '$stateParams',
              '$currentDataService',
              async ($requestService, $stateParams, $currentDataService) => {
                try {
                  const id =
                    $stateParams.id ||
                    $currentDataService.getCurrentAgent() ||
                    '000'
                  const result = await $requestService.apiReq(
                    `/agents?q=id=${id}`
                  )
                  return result
                } catch (err) {
                  return false
                }
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            extensions: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.getCurrentExtensions()
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })

        // agents - Vulnerabilities
        .state('ag-vul', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/vulnerabilities/agents-vulnerabilities.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ag-vul')
          },
          controller: 'agentsVulnerabilitiesCtrl',
          params: { id: null },
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
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
                  const result = await $requestService.apiReq(
                    `/agents?q=id=${id}`
                  )
                  return result
                } catch (err) {
                  return false
                }
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            extensions: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.getCurrentExtensions()
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })
        // agents - Common Vulnerabilities and Exposures (CVE)
        .state('ag-cve', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/cve/agents-cve.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ag-cve')
          },
          controller: 'agentsCveCtrl',
          params: { id: null },
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
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
                  const result = await $requestService.apiReq(
                    `/agents?q=id=${id}`
                  )
                  return result
                } catch (err) {
                  return false
                }
              },
            ],
            cve: [
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
                    `/vulnerability/${id}`
                  )
                  return result
                } catch (err) {
                  return false
                }
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            extensions: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.getCurrentExtensions()
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })
        // =========== Docker listener =========== //
        .state('ag-docker', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/agents/docker/agents-docker.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('ag-docker')
          },
          controller: 'agentsDockerCtrl',
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
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
                  const result = await $requestService.apiReq(
                    `/agents?q=id=${id}`
                  )
                  return result
                } catch (err) {
                  return false
                }
              },
            ],
            reportingEnabled: [
              '$currentDataService',
              async ($currentDataService) => {
                return await $currentDataService.getReportingStatus()
              },
            ],
            extensions: [
              '$currentDataService',
              async ($currentDataService) => {
                try {
                  return await $currentDataService.getCurrentExtensions()
                } catch (err) {
                  return false
                }
              },
            ],
          },
        })
    },
  ])
})
