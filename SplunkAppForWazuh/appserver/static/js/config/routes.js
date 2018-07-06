define(['./module'], function (module) {
  'use strict';
  module.config(['$mdIconProvider', '$locationProvider', '$stateProvider', '$mdThemingProvider', function ($mdIconProvider, $locationProvider, $stateProvider, $mdThemingProvider, $navigationService) {
    $mdThemingProvider.theme('default').primaryPalette('blue').accentPalette('blue');
    $locationProvider.html5Mode({
      'enabled': true,
      'requirebase': true,
      'rewriteLinks': false
    })
    $stateProvider
      .state('overview', { url: '/en-US/app/SplunkAppForWazuh/index/overview', templateUrl: 'static/app/SplunkAppForWazuh/views/overview/overview-welcome.html',onEnter: ($navigationService) => { $navigationService.storeRoute('overview'); } })
      .state('general', { url: '/en-US/app/SplunkAppForWazuh/index/general', templateUrl: 'static/app/SplunkAppForWazuh/views/overview/overview-general.html',onEnter: ($navigationService) => { $navigationService.storeRoute('general'); } })
      .state('manager', { templateUrl: 'static/app/SplunkAppForWazuh/views/manager.html',onEnter: ($navigationService) => { $navigationService.storeRoute('manager'); } })
      .state('settings', { abstract: true, url: '/en-US/app/SplunkAppForWazuh/index/settings', templateUrl: 'static/app/SplunkAppForWazuh/views/settings/settings.html', onEnter: ($navigationService) => { $navigationService.storeRoute('settings.api'); } })
      .state('settings.about', { url: '/about', templateUrl: '/static/app/SplunkAppForWazuh/views/settings/about.html', onEnter: ($navigationService) => { $navigationService.storeRoute('settings.about'); } })
      .state('settings.api', { url: '/api', templateUrl: '/static/app/SplunkAppForWazuh/views/settings/api.html',  onEnter: ($navigationService) => { $navigationService.storeRoute('settings.api'); } })
      .state('settings.index', { url: '/index', templateUrl: '/static/app/SplunkAppForWazuh/views/settings/index.html',  onEnter: ($navigationService) => { $navigationService.storeRoute('settings.index'); } })
  }]);
});
