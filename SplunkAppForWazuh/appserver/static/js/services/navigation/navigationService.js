define(['../module'], function (module) {
  'use strict';

  module.service('$navigationService', function ($state) {
    const service = {
      hello: () => {
      },
      storeRoute: (params) => {
        sessionStorage.params = params
      },
      goToLastState: () => {
        if(sessionStorage.params)
          $state.go(sessionStorage.params)
      },
      getLastState: () => {
        if(sessionStorage.params)
          return sessionStorage.params
      }
    }

    return service;
  });
});