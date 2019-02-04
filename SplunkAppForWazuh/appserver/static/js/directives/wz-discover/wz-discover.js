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
  directives.directive('wzDiscover', function (BASE_URL) {
    return {
      restrict: 'E',
      scope: {
      },
      controller($scope, $currentDataService, $notificationService, $state) {
        $scope.discoverSection = () => {
          try {
            const filters = $currentDataService.getSerializedFilters()
            const url = `${BASE_URL}/app/search/search?q=${filters}`
            localStorage.setItem('urlDiscover', url)
            $state.go('discover', { fromDashboard: true })
          } catch (error) {
            console.error(error)
            $notificationService.showSimpleToast("Cannot open discover over this section.")
          }
        }
      },
      templateUrl:
        BASE_URL +
        '/static/app/SplunkAppForWazuh/js/directives/wz-discover/wz-discover.html'
    }
  })
})
