/*
 * Wazuh app - Card slider directive
 * Copyright (C) 2015-2019 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
define(["../module"], function (directives) {
  "use strict"
  directives.directive("wazuhCardSlider", function (BASE_URL) {
    return {
      restrict: "E",
      scope: {
        data: "=data",
      },
      controller: function ($scope, $sce) {
        $scope.expanded = false
        $scope.currentPos = 0
        $scope.maxCards = 4
        $scope.data &&
          $scope.data.forEach((item) => {
            item.content = $sce.trustAsHtml(item.content)
          })
        $scope.canShow = (index) => {
          return (
            index >= $scope.currentPos * $scope.maxCards &&
            index < $scope.currentPos * $scope.maxCards + 4
          )
        }

        $scope.showRightButton = () => {
          const maxPages = Math.floor($scope.data.length / 4)
          return (
            $scope.currentPos < maxPages &&
            !(
              $scope.currentPos === maxPages - 1 && $scope.data.length % 4 === 0
            )
          )
        }

        $scope.showLeftButton = () => {
          return $scope.currentPos !== 0
        }

        $scope.nextPage = () => {
          $scope.currentPos += 1
          $scope.$applyAsync()
        }

        $scope.previousPage = () => {
          $scope.currentPos -= 1
          $scope.$applyAsync()
        }
      },
      templateUrl:
        BASE_URL +
        "/static/app/SplunkAppForWazuh/js/directives/wz-card-slider/wz-card-slider.html",
    }
  })
})
