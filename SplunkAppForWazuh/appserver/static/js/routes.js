define(['js/app'], function (app) {
  'use strict';
  return app.config(['$mdIconProvider', '$locationProvider', '$routeProvider', '$mdThemingProvider', function ($mdIconProvider, $locationProvider, $routeProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('default').primaryPalette('blue').accentPalette('blue');
    $locationProvider.html5Mode(true)
    $routeProvider
    .when('/overview', {templateUrl: 'static/app/SplunkAppForWazuh/views/overview.html'})
    .when('/manager', {templateUrl: 'static/app/SplunkAppForWazuh/views/manager.html'})



  }]);
});