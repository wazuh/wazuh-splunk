define([
  '../module',
], function (
  controllers,
  ) {
    'use strict'
    controllers.controller('settingsCtrl', function ($scope, $navigationService) {
      $scope.message = 'Settings'
      $scope.tabName = ''
      const lastState = $navigationService.getLastState()
      switch (lastState) {
        case 'settings.api':
          $scope.tabName = 'api'
          break
        case 'settings.index':
          $scope.tabName = 'index'
          break
        case 'settings.about':
          $scope.tabName = 'about'
          break
        case 'settings.logs':
          $scope.tabName = 'logs'
          break
      }

      $scope.switchTab = (name) => {
        $scope.tabName = name
      }
    })
  })

