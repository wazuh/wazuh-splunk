define(['../module'], function (module) {
  'use strict'
  
  module.config([ '$stateProvider','BASE_URL', function ($stateProvider,BASE_URL) {
    $stateProvider

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
