// define('js/config',[],function(){
//   'use strict';

//   function config($routeProvider) {
//       $routeProvider
//           .when('/', {templateUrl: '/static/app/wazuh/views/overview.html', controller: 'overviewCtrl'})
//           .when('/manager',{templateUrl:'/static/app/wazuh/views/manager.html', controller:'managerCtrl'})
//           .otherwise({redirectTo: '/'});
//   }

//   config.$inject=['$routeProvider'];

//   return config;
// });

// define('js/config',[], function () {
//   function config($stateProvider, $locationProvider, $mdIconProvider, $mdThemingProvider) {
//     $mdThemingProvider.theme('default').primaryPalette('blue').accentPalette('blue');
//     $locationProvider.html5Mode(true);
//     //console.log("loading path...",$location.absUrl());

//     $stateProvider
//       .state("overview", {
//         templateUrl: "http://192.168.1.77:8000/en-US/static/app/wazuh/views/overview.html",
//         controller: 'overviewCtrl',
//         controllerAs: 'oc'
//       })
//       .state("manager", {
//         templateUrl: "http://192.168.1.77:8000/en-US/static/app/wazuh/views/manager.html",
//         controller: 'managerCtrl',
//         controllerAs: 'mc'
//       })
//       .state("agents", {
//         templateUrl: "http://192.168.1.77:8000/en-US/static/app/wazuh/views/test2.html",
//         controller: 'agentCtrl',
//         controllerAs: 'ac'
//       });

//   }

//   config.$inject=['$stateProvider', '$locationProvider', '$mdIconProvider', '$mdThemingProvider'];

// })
