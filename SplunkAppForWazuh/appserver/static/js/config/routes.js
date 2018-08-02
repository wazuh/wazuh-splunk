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
      .state('overview', { templateUrl: 'static/app/SplunkAppForWazuh/views/overview/overview-welcome.html', onEnter: ($navigationService) => { $navigationService.storeRoute('overview') } })
      // Overview - General
      .state('general', {
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
      .state('fim', {
        templateUrl: 'static/app/SplunkAppForWazuh/views/overview/overview-fim.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('fim') },
        controller: 'overviewFimCtrl',
        controllerAs: 'ofc',
      })
      // Overview - audit
      .state('ow-aud', {
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
          ruleInfo: ['$apiService', '$stateParams', ($apiService, $stateParams) => {
            return $apiService.get('/manager/rulesid', { id: $stateParams.id }, false)
              .then(function (response) {
                return response
              }, function (response) {
                return response
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
          currentDecoder: ['$apiService', '$stateParams', ($apiService, $stateParams) => {
            return $apiService.get('/manager/decoders', { file: $stateParams.file }, false)
              .then(function (response) {
                console.log('the file ',$stateParams.file)
                console.log('the response ',response)
                return response
              }, function (response) {
                console.log('the error ',response)
                return response
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
          apiList: ['$credentialService', ($credentialService) => {
            return $credentialService.getApiList()
              .then(function (response) {
                return response
              }, function (response) {
                return response
              })
          }]
        }
      })
      .state('settings.index', { templateUrl: '/static/app/SplunkAppForWazuh/views/settings/index.html', onEnter: ($navigationService) => { $navigationService.storeRoute('settings.index') } })
  }])
})
