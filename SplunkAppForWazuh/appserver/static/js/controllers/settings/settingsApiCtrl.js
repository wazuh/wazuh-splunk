define([
  '../module',
], function (
  controllers
  ) {
    'use strict';
    controllers.controller('settingsApiCtrl', function ($scope,$apiRequest) {
      $scope.message = 'API'
      const epoch = (new Date).getTime()
      $scope.selected = [];
  
      $scope.query = {
        order: 'name',
        limit: 5,
        page: 1
      };
      
      function success(desserts) {
        $scope.desserts = desserts;
      }
      
      $scope.apis = async () => {
        $scope.promise = $apiRequest.get($scope.query, success).$promise;
      };
      
    })
  });

