define(['../module'], function (module) {
  'use strict';
  module.service('$apiRequest', function ($http) {
    const service = {
      getAgentsList: () => {
        return $http.get(`/custom/SplunkAppForWazuh/agents/agents?ip=http://192.168.1.81&port=55000&user=foo&pass=bar`)
      },
      getApiList: () => {
        return $http.get(`/custom/SplunkAppForWazuh/manager/apis?ip=http://192.168.1.81&port=55000&user=foo&pass=bar`)
      }
    }
    return service;
  });
});