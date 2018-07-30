define(['../module'], function (controllers) {

  'use strict'

  controllers.controller('managerLogsCtrl', function ($scope) {
    const vm = this
    vm.type_log = 'all';
    vm.category = 'all';

    vm.search = term => {
      $scope.$broadcast('wazuhSearch', { term })
    }

    vm.filter = async filter => {
      $scope.$broadcast('wazuhFilter', { filter })
    }

    vm.playRealtime = () => {
      vm.realtime = true;
      $scope.$broadcast('wazuhPlayRealTime')
    };

    vm.stopRealtime = () => {
      vm.realtime = false;
      $scope.$broadcast('wazuhStopRealTime')
    }

    const initialize = async () => {
      try {
        if (!$scope.$$phase) $scope.$digest();
        return;
      } catch (err) {
        console.error('error en logs ctrl',err)
      }
      return;
    }

    initialize();

  })
})
