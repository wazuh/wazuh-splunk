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

define(["../module"], function (directives) {
  "use strict"
  directives.directive("wzDiscover", function (BASE_URL) {
    return {
      restrict: "E",
      scope: {
        breadcrumbs: "=breadcrumbs",
      },
      controller(
        $scope,
        $currentDataService,
        $notificationService,
        $state,
        $navigationService
      ) {
        $scope.discoverSection = () => {
          try {
            const hideOnlyShowFilters = false
            const filters =
              $currentDataService.getSerializedFilters(hideOnlyShowFilters)
            const url = `${BASE_URL}/app/search/search?q=${filters}`
            localStorage.setItem("urlDiscover", url)
            const lastState = $navigationService.getLastState()
            const fromDashboard = lastState ? true : false // Check if cannot get the lastState, then, cannot back to previous dashboard
            const breadcrumbs =
              lastState && $scope.breadcrumbs ? $scope.breadcrumbs : {}
            $state.go("discover", {
              fromDashboard: fromDashboard,
              previousState: lastState,
              breadcrumbs: breadcrumbs,
            })
          } catch (error) {
            $notificationService.showErrorToast(
              "Cannot open discover over this section."
            )
          }
        }
      },
      templateUrl:
        BASE_URL +
        "/static/app/SplunkAppForWazuh/js/directives/wz-discover/wz-discover.html",
    }
  })
})
