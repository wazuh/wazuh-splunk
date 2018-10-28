define(['../../module'], function (controllers) {

  'use strict'

  controllers.controller('managerDecodersCtrl', function ($scope, $sce, $stateParams) {
    const vm = this

    vm.appliedFilters = []
    //Initialization
    vm.searchTerm = ''
    vm.viewingDetail = false
    vm.typeFilter = "all"
    vm.isArray = angular.isArray
    let filter = window.localStorage.decoders || []


    // Reloading event listener
    $scope.$on('decodersIsReloaded', () => {
      vm.viewingDetail = false
      if (!$scope.$$phase) $scope.$digest()
    })

    vm.onlyParents = typeFilter => {
      vm.appliedFilters = []
      if (window.localStorage.decoders)
        delete window.localStorage.decoders
      if (typeFilter === 'all') $scope.$broadcast('wazuhUpdateInstancePath', { path: '/decoders' })
      else $scope.$broadcast('wazuhUpdateInstancePath', { path: '/decoders/parents' })
    }

    $scope.$on('wazuhShowDecoder', (event, parameters) => {
      vm.currentDecoder = parameters.decoder
      vm.viewingDetail = true
      if (!$scope.$$phase) $scope.$digest()
    })

    $scope.$on('loadedTable', () => {
      if (window.localStorage.decoders && JSON.parse(window.localStorage.decoders).length > 0) {
        const jsonFilters = JSON.parse(window.localStorage.decoders)
        vm.appliedFilters = jsonFilters
        if (filter.length > 0)
          $scope.$broadcast('wazuhFilter', { filter: JSON.parse(filter) })
      }
    })

  })
})
