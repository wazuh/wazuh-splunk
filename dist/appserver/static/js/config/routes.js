'use strict';

define(['./module'], function (module) {
  'use strict';

  module.config(['$mdIconProvider', '$locationProvider', '$stateProvider', '$mdThemingProvider', function ($mdIconProvider, $locationProvider, $stateProvider, $mdThemingProvider, $navigationService) {
    $mdThemingProvider.theme('default').primaryPalette('blue').accentPalette('blue');
    $locationProvider.html5Mode({
      'enabled': true,
      'requirebase': false,
      'rewriteLinks': false
    });
    $stateProvider.state('overview', { templateUrl: 'static/app/SplunkAppForWazuh/views/overview/overview-welcome.html', onEnter: function onEnter($navigationService) {
        $navigationService.storeRoute('overview');
      } }).state('general', { templateUrl: 'static/app/SplunkAppForWazuh/views/overview/overview-general.html', onEnter: function onEnter($navigationService) {
        $navigationService.storeRoute('general');
      } }).state('manager', { templateUrl: 'static/app/SplunkAppForWazuh/views/manager.html', onEnter: function onEnter($navigationService) {
        $navigationService.storeRoute('manager');
      } }).state('settings', { abstract: true, templateUrl: 'static/app/SplunkAppForWazuh/views/settings/settings.html', onEnter: function onEnter($navigationService) {
        $navigationService.storeRoute('settings.api');
      } }).state('settings.about', { templateUrl: '/static/app/SplunkAppForWazuh/views/settings/about.html', onEnter: function onEnter($navigationService) {
        $navigationService.storeRoute('settings.about');
      } }).state('settings.api', { templateUrl: '/static/app/SplunkAppForWazuh/views/settings/api.html', onEnter: function onEnter($navigationService) {
        $navigationService.storeRoute('settings.api');
      } }).state('settings.index', { templateUrl: '/static/app/SplunkAppForWazuh/views/settings/index.html', onEnter: function onEnter($navigationService) {
        $navigationService.storeRoute('settings.index');
      } });
  }]);
});