/*
 * Wazuh app - Filter bar directive
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
  directives.directive('wazuhBar', function ($filterService) {
    return {
      restrict: 'E',
      controller: function ($scope, $filterService) {
        $scope.filters = $filterService.getFilters()

        /**
         * Removes a filter on click
         * @param {String} filter 
         */
        $scope.removeFilter = (filter) => {
          const index = $scope.filters.indexOf(filter)
          if (index > -1) {
            $scope.filters.splice(index, 1)
          }
        }
      },
      templateUrl: '/static/app/SplunkAppForWazuh/js/directives/wz-bar/wz-bar.html'
    }
  })
})