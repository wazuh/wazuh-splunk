define([
  '../module',
], function (
  controllers
) {
    'use strict'
    controllers.controller('settingsApiCtrl', function ($apiRequest, apiList) {
      const vm = this
      const epoch = (new Date).getTime()
      vm.init = function () {
        vm.selected = []
        vm.apiList = apiList
        vm.selectedApi = []
        vm.visibleTable = (typeof vm.apiList === 'object' && vm.apiList.length > 0) ? true : false
        console.log('must we see any table? ', vm.visibleTable)
      }

      vm.query = {
        order: 'name',
        limit: 5,
        page: 1
      }

      function success(desserts) {
        vm.desserts = desserts
      }

      vm.apis = async () => {
        $scope.promise = $apiRequest.get($scope.query, success).$promise
      }
      vm.init()
    })
  })

