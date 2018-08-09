/*
 * Wazuh app - Top nav bar directive
 * Copyright (C) 2018 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
define(['../module'], function (directives) {
  'use strict'
  directives.directive('wzMenu', function () {
    return {
      controller: function ($scope, $currentApiIndexService) {
        const update = () => {
          $scope.currentIndex = (!$currentApiIndexService.getIndex()) ? 'wazuh' : $currentApiIndexService.getIndex().index
          $scope.currentAPI = (!$currentApiIndexService.getAPI()) ? '---' : $currentApiIndexService.getAPI().managerName
          $scope.theresAPI = ($scope.currentAPI === '---') ? false : true
          if (!$scope.$$phase) $scope.$digest()
        }
        // Listens for changes in the selected API
        $scope.$on('updatedAPI', () => {
          update()
        })
        update()
      },
      templateUrl: '/static/app/SplunkAppForWazuh/js/directives/wz-menu/wz-menu.html'
    }
  })
})