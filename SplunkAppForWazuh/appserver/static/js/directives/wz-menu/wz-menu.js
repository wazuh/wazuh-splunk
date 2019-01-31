/*
 * Wazuh app - Top nav bar directive
 * Copyright (C) 2015-2019 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
define(['../module'], function(directives) {
  'use strict'
  directives.directive('wzMenu', function(BASE_URL) {
    return {
      controller: function(
        $scope,
        $currentDataService,
        $navigationService,
        $state
      ) {
        $scope.logoUrl =
          BASE_URL +
          '/static/app/SplunkAppForWazuh/css/images/wazuh/png/wazuh_white_full.png'

        $scope.select = item => {
          $scope.menuNavItem = item
          if (!$scope.$$phase) $scope.$digest()
        }

        $scope.dumpHtml = item => {
          $scope.menuNavItem = item
          $scope.$broadcast('stateChanged', 'discover')
          if (!$scope.$$phase) $scope.$digest()
          //Generate url
          let filters = $currentDataService.getSerializedFilters()
          let url = `${BASE_URL}/app/search/search?q=${filters}`
          localStorage.setItem('urlDiscover', url)
          $state.go('discover')
        }
        const checkLastState = (prefix, state) => {
          if (
            ($navigationService.getLastState() &&
              $navigationService.getLastState() !== '' &&
              $navigationService.getLastState().includes(prefix)) ||
            $navigationService.getLastState().includes(state)
          ) {
            return true
          } else {
            return false
          }
        }

        const update = () => {
          const index = $currentDataService.getIndex()
          const api = $currentDataService.getApi()
          $scope.currentIndex = !index
            ? 'wazuh'
            : index.index
          $scope.currentAPI = !api
            ? '---'
            : api.managerName
          $scope.theresAPI = $scope.currentAPI === '---' ? false : true

          if (checkLastState('ow-', 'overview')) {
            $scope.menuNavItem = 'overview'
          } else if (checkLastState('mg-', 'manager')) {
            $scope.menuNavItem = 'manager'
          } else if (checkLastState('ag-', 'agents')) {
            $scope.menuNavItem = 'agents'
          } else if (checkLastState('api.', 'settings')) {
            $scope.menuNavItem = 'settings'
          } else if (checkLastState('dev-tools', 'dev-tools')) {
            $scope.menuNavItem = 'dev-tools'
          } else if (checkLastState('discover', 'discover')) {
            $scope.menuNavItem = 'discover'
          }
          //else if ($navigationService.getLastState() && $navigationService.getLastState() !== '' && $navigationService.getLastState().includes('dev-tools')) { $scope.menuNavItem = 'dev-tools'  }
          if (!$scope.$$phase) $scope.$digest()
        }
        // Listens for changes in the selected API
        $scope.$on('updatedAPI', () => {
          console.log('update api event')
          update()
        })

        //Listens for changes in states
        $scope.$on('stateChanged', (event, data) => {
          $scope.select(data)
        })
        update()
      },
      templateUrl:
        BASE_URL +
        '/static/app/SplunkAppForWazuh/js/directives/wz-menu/wz-menu.html'
    }
  })
})
