'use strict';

define(['../module'], function (module) {
  'use strict';

  module.service('$navigationService', function ($state) {
    var service = {
      hello: function hello() {
        console.log('hello navigation!');
      },
      storeRoute: function storeRoute(params) {
        sessionStorage.params = params;
      },
      goToLastState: function goToLastState() {
        if (sessionStorage.params) $state.go(sessionStorage.params);
      },
      getLastState: function getLastState() {
        if (sessionStorage.params) return sessionStorage.params;
      }
    };

    return service;
  });
});