

define(['../../module'], function (controllers) {

  'use strict'

  controllers.controller('groupsCtrl', function ($scope, $apiService, $beautifierJson) {
    const vm = this
    $scope.$on('groupsIsReloaded', () => {
      vm.currentGroup = false
      vm.lookingGroup = false
      if (!$scope.$$phase) $scope.$digest()
    })

    vm.load = true

    vm.search = term => {
      $scope.$broadcast('wazuhSearch', { term })
    }

    // Store a boolean variable to check if come from agents

    const load = async () => {
      try {
        vm.load = false
        if (!$scope.$$phase) $scope.$digest()
      } catch (error) {
        console.error(error, 'Groups')
      }
      return
    }

    load()

    vm.toggle = () => vm.lookingGroup = true

    vm.showAgent = agent => {
      $location.search('tab', null)
      $location.path('/agents')
    }

    vm.loadGroup = async (group, firstTime) => {
      try {
        if (!firstTime) vm.lookingGroup = true
        const count = await $apiService.request(`/agents/groups/${group.name}/files`, { limit: 1 }, false)
        vm.totalFiles = count.data.data.totalItems
        vm.fileViewer = false
        vm.currentGroup = group
        vm.fileViewer = false
        if (!$scope.$$phase) $scope.$digest()
      } catch (error) {
        console.error(error, 'Groups')
      }
      return
    }

    $scope.$on('wazuhShowGroup', (event, parameters) => {
      return vm.loadGroup(parameters.group)
    })

    $scope.$on('wazuhShowGroupFile', (event, parameters) => {
      return vm.showFile(parameters.groupName, parameters.fileName)
    })

    vm.goBackToAgents = () => {
      vm.groupsSelectedTab = 'agents'
      vm.file = false
      vm.filename = false
      if (!$scope.$$phase) $scope.$digest()
    }

    vm.goBackFiles = () => {
      vm.groupsSelectedTab = 'files'
      vm.file = false
      vm.filename = false
      vm.fileViewer = false
      if (!$scope.$$phase) $scope.$digest()
    }

    vm.goBackGroups = () => {
      vm.currentGroup = false
      vm.lookingGroup = false
      if (!$scope.$$phase) $scope.$digest()
    }

    vm.showFile = async (groupName, fileName) => {
      try {
        if (vm.filename) vm.filename = ''
        if (fileName === '../ar.conf') fileName = 'ar.conf'
        vm.fileViewer = true
        const tmpName = `/agents/groups/${groupName}/files/${fileName}`
        const data = await $apiService.request(tmpName, {}, false)
        vm.file = $beautifierJson.prettyPrint(data.data.data)
        vm.filename = fileName

        if (!$scope.$$phase) $scope.$digest()
      } catch (error) {
        console.error('error at showing file ',error)
      }
      return
    }

    // Resetting the factory configuration
    $scope.$on("$destroy", () => {

    })

    $scope.$watch('lookingGroup', value => {
      if (!value) {
        vm.file = false
        vm.filename = false
      }
    })
  })
})