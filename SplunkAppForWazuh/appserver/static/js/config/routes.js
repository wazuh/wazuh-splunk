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
      // Overview - General
      .state('general', {
        templateUrl: 'static/app/SplunkAppForWazuh/views/overview/overview-general.html',
        onEnter: ($navigationService) => { $navigationService.storeRoute('general') },
        controller: 'overviewGeneralCtrl',
        controllerAs: 'ogc',
      })
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
      // Manager
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
                return response;
              }, function (response) {
                return response;
              })
          }]
        }
      })
      .state('settings.index', { templateUrl: '/static/app/SplunkAppForWazuh/views/settings/index.html', onEnter: ($navigationService) => { $navigationService.storeRoute('settings.index'); } })
  }]);
});
