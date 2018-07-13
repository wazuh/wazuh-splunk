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
  'use strict';
  directives.directive('wzMenu', function () {
    return {
      controller: function ($scope, $currentApiIndexService) {
        $scope.theresAPI = ($currentApiIndexService.getAPI() === '' || !$currentApiIndexService.getAPI()) ? false : true
        if ($scope.theresAPI && typeof $currentApiIndexService.getAPI() === 'string') {
          $scope.currentAPI = JSON.parse($currentApiIndexService.getAPI()).managerName
        }
        $scope.currentIndex = $currentApiIndexService.getIndex()
        // Listens for changes in the selected API
        $scope.$on('updatedAPI', () => {
          $scope.theresAPI = ($currentApiIndexService.getAPI() === '' || !$currentApiIndexService.getAPI()) ? false : true
          if ($scope.theresAPI && typeof $currentApiIndexService.getAPI() === 'string') {
            $scope.currentAPI = JSON.parse($currentApiIndexService.getAPI()).managerName
          }
        })
      },
      templateUrl: '/static/app/SplunkAppForWazuh/js/directives/wz-menu/wz-menu.html'
    }
  })
})