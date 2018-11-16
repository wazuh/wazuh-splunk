define(['../module'], function(module) {
  'use strict';

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
            $navigationService.storeRoute('settings.api');
          }
        })
        // settings -> about
        .state('settings.about', {
          templateUrl:
            BASE_URL +
            '/static/app/SplunkAppForWazuh/js/controllers/settings/about/about.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('settings.about');
          }
        })
        // settings -> api
        .state('settings.api', {
          templateUrl:
            BASE_URL +
            '/static/app/SplunkAppForWazuh/js/controllers/settings/api/api.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('settings.api');
          },
          controller: 'settingsApiCtrl',
          resolve: {
            apiList: [
              '$currentDataService',
              $currentDataService => {
                return $currentDataService
                  .getApiList()
                  .then(
                    function(response) {
                      return response;
                    },
                    function(response) {
                      return response;
                    }
                  )
                  .catch(err => {
                    console.error('Error route: ', err);
                  });
              }
            ]
          }
        })
        .state('settings.extensions', {
          templateUrl:
            BASE_URL +
            '/static/app/SplunkAppForWazuh/js/controllers/settings/extensions/extensions.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('settings.extensions');
          },
          controller: 'extensionsCtrl',
          resolve: {
            extensions: [
              '$requestService',
              '$currentDataService',
              async ($requestService, $currentDataService) => {
                try {
                  const id = $currentDataService.getApi().id;
                  const currentExtensions = $currentDataService.getExtensions(
                    id
                  );
                  const result = currentExtensions
                    ? currentExtensions
                    : $requestService.httpReq(`GET`, `/manager/extensions`);
                  return await result;
                } catch (err) {
                  console.error('Error route: ', err);
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
            $navigationService.storeRoute('settings.index');
          }
        })
        .state('settings.logs', {
          templateUrl:
            '/static/app/SplunkAppForWazuh/js/controllers/settings/logs/logs.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('settings.logs');
          },
          controller: 'logsCtrl',
          resolve: {
            logs: [
              '$requestService',
              $requestService => {
                return $requestService
                  .httpReq(`GET`, `/manager/get_log_lines`)
                  .then(
                    function(response) {
                      return response;
                    },
                    function(response) {
                      return response;
                    }
                  )
                  .catch(err => {
                    console.error('Error route: ', err);
                  });
              }
            ]
          }
        })
        .state('dev-tools', {
          templateUrl:
            BASE_URL +
            '/static/app/SplunkAppForWazuh/js/controllers/dev-tools/dev-tools.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('dev-tools');
          },
          controller: 'devToolsCtrl'
        })
        .state('discover', {
          templateUrl:
            BASE_URL +
            '/static/app/SplunkAppForWazuh/js/controllers/discover/discover.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('discover');
          }
        });
    }
  ]);
});
