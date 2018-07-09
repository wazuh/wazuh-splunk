define(['../module'], function (module) {
  'use strict';

  module.service('$apiRequest', function ($http) {
    console.log('LOADED SERVICE REQUEST')
    const service = {
      get: (endpoint) => {
        console.log('PERFORMING GET REQUEST',typeof endpoint,`/custom/SplunkAppForWazuh/${endpoint}`, endpoint)

          return $http.get(`/custom/SplunkAppForWazuh/${endpoint}`)
     
        
      },
      post: (endpoint,params) => {
        return $http.post(`/custom/SplunkAppForWazuh/${endpoint}`,params)
      }
    }
    return service;
  });
});