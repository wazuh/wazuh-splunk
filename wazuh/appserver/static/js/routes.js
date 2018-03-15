(function () {
  function routes( $stateProvider, $locationProvider, $mdIconProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('default').primaryPalette('blue').accentPalette('blue');
    $locationProvider.html5Mode(true);
    //console.log("loading path...",$location.absUrl());

    $stateProvider
    .state("overview", {
        templateUrl : "http://192.168.0.157:8000/en-US/static/app/wazuh/views/test.html",
        controller : 'overviewCtrl',
        controllerAs: 'oc'
    })
    .state("manager", {
        templateUrl : "http://192.168.0.157:8000/en-US/static/app/wazuh/views/test1.html",
        controller : 'managerCtrl',
        controllerAs: 'mc'
    })
    .state("agents", {
        templateUrl : "http://192.168.0.157:8000/en-US/static/app/wazuh/views/test2.html",
        controller : 'agentCtrl',
        controllerAs: 'ac'
    });

  }

  angular.module('wazuhApp')
  .config([ '$stateProvider','$locationProvider', '$mdIconProvider', '$mdThemingProvider', routes]);

})();
