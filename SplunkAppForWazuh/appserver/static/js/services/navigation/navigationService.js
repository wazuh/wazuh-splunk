define(['../module'], function (module) {
  'use strict';

  module.service('$navigationService', function ($state) {
    const service = {
      storeRoute: (params) => {
        sessionStorage.params = params
      },
      getLastState: () => {
        if(sessionStorage.params)
          $state.go(sessionStorage.params)
      }
    }

    return service;
  });
});