

define(['../../module'], function (controllers) {

  'use strict'

  controllers.controller('groupsCtrl', function ($scope, $apiService) {
    $scope.$on('groupsIsReloaded', () => {
      $scope.currentGroup = false;
      $scope.lookingGroup = false;
      if (!$scope.$$phase) $scope.$digest();
    });

    $scope.load = true;

    $scope.search = term => {
      $scope.$broadcast('wazuhSearch', { term })
    }

    // Store a boolean variable to check if come from agents

    const load = async () => {
      try {

        $scope.load = false;

        if (!$scope.$$phase) $scope.$digest();
      } catch (error) {
        console.error(error, 'Groups');
      }
      return;
    }

    load();

    $scope.toggle = () => $scope.lookingGroup = true

    $scope.showAgent = agent => {
      $location.search('tab', null);
      $location.path('/agents');
    };

    $scope.loadGroup = async (group, firstTime) => {
      try {
        if (!firstTime) $scope.lookingGroup = true;
        const count = await $apiService.get(`/agents/groups/${group.name}/files`, { limit: 1 }, false)
        $scope.totalFiles = count.data.data.totalItems;
        $scope.fileViewer = false;
        $scope.currentGroup = group;
        $scope.fileViewer = false;
        if (!$scope.$$phase) $scope.$digest();
      } catch (error) {
        console.error(error, 'Groups')
      }
      return;
    }

    $scope.$on('wazuhShowGroup', (event, parameters) => {
      return $scope.loadGroup(parameters.group)
    })

    $scope.$on('wazuhShowGroupFile', (event, parameters) => {
      return $scope.showFile(parameters.groupName, parameters.fileName)
    })

    $scope.goBackToAgents = () => {
      $scope.groupsSelectedTab = 'agents';
      $scope.file = false;
      $scope.filename = false;
      if (!$scope.$$phase) $scope.$digest();
    }

    $scope.goBackFiles = () => {
      $scope.groupsSelectedTab = 'files';
      $scope.file = false;
      $scope.filename = false;
      $scope.fileViewer = false;
      if (!$scope.$$phase) $scope.$digest();
    }

    $scope.goBackGroups = () => {
      $scope.currentGroup = false;
      $scope.lookingGroup = false;
      if (!$scope.$$phase) $scope.$digest();
    }

    $scope.showFile = async (groupName, fileName) => {
      try {
        if ($scope.filename) $scope.filename = '';
        if (fileName === '../ar.conf') fileName = 'ar.conf';
        $scope.fileViewer = true;
        const tmpName = `/agents/groups/${groupName}/files/${fileName}`;
        const data = await $apiService.get(tmpName, {}, false)
        $scope.file = beautifier.prettyPrint(data.data.data);
        $scope.filename = fileName;

        if (!$scope.$$phase) $scope.$digest();
      } catch (error) {
        errorHandler.handle(error, 'Groups');
      }
      return;
    };

    // Resetting the factory configuration
    $scope.$on("$destroy", () => {

    });

    $scope.$watch('lookingGroup', value => {
      if (!value) {
        $scope.file = false;
        $scope.filename = false;
      }
    })

  })

})