'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

define(['../module'], function (module) {
  'use strict';

  module.service('$apiRequest', function ($http) {
    console.log('LOADED SERVICE REQUEST');
    var service = {
      get: function get(endpoint) {
        console.log('PERFORMING GET REQUEST', typeof endpoint === 'undefined' ? 'undefined' : _typeof(endpoint), '/custom/SplunkAppForWazuh/' + endpoint, endpoint);

        return $http.get('/custom/SplunkAppForWazuh/' + endpoint);
      },
      post: function post(endpoint, params) {
        return $http.post('/custom/SplunkAppForWazuh/' + endpoint, params);
      }
    };
    return service;
  });
});