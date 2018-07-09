define([
  '../module',
], function (
  controllers
  ) {
    'use strict';
    // import 'babel-polyfill';
    controllers.controller('settingsApiCtrl',function ($apiRequest,apiList) {
      const vm = this;
      const epoch = (new Date).getTime()
      vm.selected = [];
      vm.apiList = apiList.data.items || [];
      vm.selectedApi = []
  
      vm.query = {
        order: 'name',
        limit: 5,
        page: 1
      };
      
      function success(desserts) {
        vm.desserts = desserts;
      }
      
      vm.apis = async () => {
        $scope.promise = $apiRequest.get($scope.query, success).$promise;
      };
      
    })
  });

