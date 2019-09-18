define(['../module'], function(module) {
  'use strict'

  module.config([
    '$stateProvider',
    'BASE_URL',
    function($stateProvider, BASE_URL) {
      $stateProvider

        
      .state('dev-tools', {
        templateUrl:
          BASE_URL +
          '/static/app/SplunkAppForWazuh/js/controllers/dev-tools/dev-tools.html',
        onEnter: $navigationService => {
          $navigationService.storeRoute('dev-tools')
        },
        controller: 'devToolsCtrl',
        resolve: {
          isAdmin: [
            '$currentDataService',
            async $currentDataService => {
              try {
                return await $currentDataService.isAdmin()
              } catch (error) {
                return false
              }
            }
          ]
        }
      })
      .state('logtest-tools', {
        templateUrl:
          BASE_URL +
          '/static/app/SplunkAppForWazuh/js/controllers/dev-tools/logtest-tools.html',
        onEnter: $navigationService => {
          $navigationService.storeRoute('logtest-tools')
        },
        controller: 'logtestToolsCtrl',
        resolve: {
          isAdmin: [
            '$currentDataService',
            async $currentDataService => {
              try {
                return await $currentDataService.isAdmin()
              } catch (error) {
                return false
              }
            }
          ]
        }
      })
      .state('config-tools', {
        templateUrl:
          BASE_URL +
          '/static/app/SplunkAppForWazuh/js/controllers/dev-tools/config-tools.html',
        onEnter: $navigationService => {
          $navigationService.storeRoute('config-tools')
        },
        controller: 'configToolsCtrl',
        resolve: {
          isAdmin: [
            '$currentDataService',
            async $currentDataService => {
              try {
                return await $currentDataService.isAdmin()
              } catch (error) {
                return false
              }
            }
          ]
        }
      })
    }
  ])
})
