define(['../module'], function(module) {
  'use strict'

  module.config([
    '$stateProvider',
    'BASE_URL',
    function($stateProvider, BASE_URL) {
      $stateProvider

        // settings
        .state('settings', {
          abstract: true,
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/settings/main/settings.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('settings.api')
          },
          controller: 'settingsCtrl',
          resolve: {
            isWazuhAdmin: [
              '$security_service',
              async $security_service => {
                try{
                  return await $security_service.hasWazuhRole("administrator")
                }catch(error){
                  return false;
                }
              }
            ]
          }
        })
        // settings -> about
        .state('settings.about', {
          templateUrl:
            BASE_URL +
            '/static/app/SplunkAppForWazuh/js/controllers/settings/about/about.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('settings.about')
          },
          controller: 'aboutCtrl',
          resolve: {
            appInfo: [
              '$requestService',
              async ($requestService, $state) => {
                try {
                  const result = await $requestService.httpReq(
                    'GET',
                    '/manager/app_info'
                  )
                  return result.data
                } catch (error) {
                  $state.go('settings.api')
                }
              }
            ]
          }
        })
        // settings -> api
        .state('settings.api', {
          templateUrl:
            BASE_URL +
            '/static/app/SplunkAppForWazuh/js/controllers/settings/api/api.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('settings.api')
          },
          controller: 'settingsApiCtrl',
          resolve: {
            apiList: [
              '$currentDataService',
              async $currentDataService => {
                try {
                  return await $currentDataService.getApiList()
                } catch (error) {
                  console.error('Could not fetch API list')
                }
              }
            ], 
            isSplunkAdmin: [
              '$splunkUsers',
              async $splunkUsers => {
                try {
                  return await $splunkUsers.isAdmin()
                } catch (err) {
                  return { error: 'Cannot fetch Splunk users from API', detail: err }
                }
              }
            ]
          }
        })
        .state('settings.index', {
          templateUrl:
            BASE_URL +
            '/static/app/SplunkAppForWazuh/js/controllers/settings/index/index.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('settings.index')
          }
        })
        .state('settings.logs', {
          templateUrl:
            '/static/app/SplunkAppForWazuh/js/controllers/settings/logs/logs.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('settings.logs')
          },
          controller: 'logsCtrl',
          resolve: {
            logs: [
              '$requestService',
              '$state',
              async ($requestService, $state) => {
                try {
                  return await $requestService.httpReq(
                    `GET`,
                    `/manager/get_log_lines`
                  )
                } catch (error) {
                  $state.go('settings.api')
                }
              }
            ]
          }
        })
        .state('settings.configuration', {
          templateUrl:
            '/static/app/SplunkAppForWazuh/js/controllers/settings/configuration/configuration.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('settings.configuration')
          },
          controller: 'settingsConfigCtrl',
          controllerAs: 'vm',
          resolve: {
            configuration: [
              '$state',
              '$currentDataService',
              async ($state, $currentDataService) => {
                try {
                  return await $currentDataService.getCurrentConfiguration()
                } catch (err) {
                  $state.reload()
                }
              }
            ],
            isWazuhAdmin: [
              '$security_service',
              async $security_service => {
                try{
                  return await $security_service.hasWazuhRole("administrator")
                }catch(error){
                  return false;
                }
              }
            ]
          }
        })
        .state('dev-tools', {
          templateUrl:
            BASE_URL +
            '/static/app/SplunkAppForWazuh/js/controllers/dev-tools/dev-tools.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('dev-tools')
          },
          controller: 'devToolsCtrl'
        })
        .state('discover', {
          templateUrl:
            BASE_URL +
            '/static/app/SplunkAppForWazuh/js/controllers/discover/discover.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('discover')
          },
          controller: 'discoverCtrl',
          params: {
            fromDashboard: null,
            previousState: null,
            breadcrumbs: null
          }
        })
    }
  ])
})
