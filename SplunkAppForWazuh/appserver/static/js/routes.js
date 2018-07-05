define(['js/app'], function (app) {
  'use strict';
  return app.config(['$mdIconProvider', '$locationProvider', '$stateProvider', '$mdThemingProvider', function ($mdIconProvider, $locationProvider, $stateProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('default').primaryPalette('blue').accentPalette('blue');
    $locationProvider.html5Mode({
      'enabled': true,
      'requirebase': true,
      'rewriteLinks': false
    })
    // $locationProvider.html5Mode(true)
    $stateProvider
      .state('overview', { templateUrl: 'static/app/SplunkAppForWazuh/views/overview/overview-welcome.html' })
      .state('general', { templateUrl: 'static/app/SplunkAppForWazuh/views/overview/overview-general.html' })
      .state('manager', { templateUrl: 'static/app/SplunkAppForWazuh/views/manager.html' })
      .state('settings', { templateUrl: 'static/app/SplunkAppForWazuh/views/settings/settings.html' })
      .state('settings.about', { templateUrl: 'static/app/SplunkAppForWazuh/views/settings/about.html' })
      .state('settings.api', { templateUrl: 'static/app/SplunkAppForWazuh/views/settings/api.html' })
      .state('settings.index', { templateUrl: 'static/app/SplunkAppForWazuh/views/settings/index.html' })

  }]);
});