(function () {

  function routes($locationProvider, $stateProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
    //======== No auth =========

    .state('overview', {
      url: "/",
      template: '<h1>testing</h1>',
    })

  }

  angular.module('wazuhApp')
  .config([ '$locationProvider', '$stateProvider', '$urlRouterProvider', routes]);

})();
