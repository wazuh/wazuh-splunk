define(['../module'], function (module) {
  'use strict';

  module.service('$navigationService', function () {
    const service = {
      storeRoute: (params) => {
        sessionStorage.params = params
      }
    }

    return service;
  });
});