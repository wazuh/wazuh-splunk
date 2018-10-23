define(['../module'], function (module) {
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
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/overview/welcome/overview-welcome.html',
      controller: 'overviewWelcomeCtrl',
      resolve: {
        agentsInfo: ['$requestService', '$state',($requestService,$state) => {
          return $requestService.apiReq('/agents/summary')
          .then(function (response) {
            return response
          }, function (response) {
            return response
          })
          .catch(err => {
            $state.go('settings.api')
          })
        }]
      }
    })
    
    // Overview - General
    .state('ow-general', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/overview/general/overview-general.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('ow-general') },
      controller: 'overviewGeneralCtrl',
      resolve: {
        pollingState: ['$requestService', '$state',($requestService,$state) => {
          return $requestService.httpReq(`GET`, `/manager/polling_state`)
          .then( (response) => {
            return response
          }, (response) => {
            return response
          })
          .catch(err => {
            $state.go('settings.api')
          })
        }]
      }
    })
    // Overview - policy monitoring
    .state('ow-pm', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/overview/policy-monitoring/overview-pm.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('ow-pm') },
      controller: 'overviewPolicyMonitoringCtrl',
    })
    // Overview - FIM
    .state('ow-fim', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/overview/fim/overview-fim.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('ow-fim') },
      controller: 'overviewFimCtrl',
    })
    // Overview - FIM
    .state('ow-osquery', {
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/views/overview/osquery/osquery.html',
      onEnter: ($navigationService) => { $navigationService.storeRoute('ow-osquery') },
      controller: 'osqueryCtrl',
      controllerAs: 'oqc',
      resolve: {
        osquery: ['$requestService', '$stateParams', ($requestService, $stateParams) => {
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
      templateUrl: BASE_URL + 'static/app/SplunkAppForWazuh/js/controllers/overview/audit/overview-audit.html',
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
  }])
})
