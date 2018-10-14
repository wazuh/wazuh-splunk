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
  }])
})
