/*
 * Wazuh app - Wazuh no configuration card directive
 * Copyright (C) 2015-2019 Wazuh, Inc.
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
  directives.directive('wzSvg', function (BASE_URL) {
    return {
      restrict: 'E',
      scope: {
        icon: '@',
        color: '@',
        svgTooltip: '@',
      },
      controller($scope) {
        /*
          This directive accepts hexadecimal colors with 6 characters or class names like:
          primary, secondary, danger, info or any other, which will result in a class like 
          wz-color-primary, wz-color-secondary, etc.
        */
        const color = $scope.color || ''
        $scope.isHex = /^#[0-9A-F]{6}$/i.test(color)
        $scope.className = !$scope.isHex ? `wz-color-${$scope.color}` : ''
      },
      templateUrl:
        BASE_URL +
        '/static/app/SplunkAppForWazuh/js/directives/wz-svg/wz-svg.html',
    }
  })
})
