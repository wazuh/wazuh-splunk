define(['./module'], function (module) {
  'use strict';
  module.config(['$mdIconProvider', '$locationProvider', '$stateProvider', '$mdThemingProvider', function ($mdIconProvider, $locationProvider, $stateProvider, $mdThemingProvider, $navigationService) {
    $mdThemingProvider.theme('default').primaryPalette('blue').accentPalette('blue');
    $locationProvider.html5Mode({
      'enabled': true,
      'requirebase': false,
      'rewriteLinks': false
    })
    $stateProvider
      .state('overview', { templateUrl: 'static/app/SplunkAppForWazuh/views/overview/overview-welcome.html', onEnter: ($navigationService) => { $navigationService.storeRoute('overview'); } })
      .state('general', { templateUrl: 'static/app/SplunkAppForWazuh/views/overview/overview-general.html', onEnter: ($navigationService) => { $navigationService.storeRoute('general'); } })
      .state('manager', { templateUrl: 'static/app/SplunkAppForWazuh/views/manager.html', onEnter: ($navigationService) => { $navigationService.storeRoute('manager'); } })
      // settings
      .state('settings', { abstract: true, templateUrl: 'static/app/SplunkAppForWazuh/views/settings/settings.html', onEnter: ($navigationService) => { $navigationService.storeRoute('settings.api'); } })
      // settings -> about
      .state('settings.about', { templateUrl: '/static/app/SplunkAppForWazuh/views/settings/about.html', onEnter: ($navigationService) => { $navigationService.storeRoute('settings.about'); } })
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
                console.log('list of apis ',response)
                return response.data;
              }, function (response) {
                console.log('errored request ',response)
                return response;
              })
          }]
        }
      })
      .state('settings.index', { templateUrl: '/static/app/SplunkAppForWazuh/views/settings/index.html', onEnter: ($navigationService) => { $navigationService.storeRoute('settings.index'); } })
  }]);
});
