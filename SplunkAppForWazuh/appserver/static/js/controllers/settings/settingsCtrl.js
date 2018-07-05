define([
  '../module',
], function (
  controllers,
  ) {
    'use strict';
    controllers.controller('settingsCtrl', function ($scope) {
      $scope.message = 'Settings'
      $scope.tabName = ''
      $scope.switchTab = (name) => {
        $scope.tabName = name
      }
    })
  });

