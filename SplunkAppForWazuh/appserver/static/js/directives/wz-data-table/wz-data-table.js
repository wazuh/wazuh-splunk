/*
 * Wazuh app - Wazuh table with data as input parameter directive
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

define([
  '../module',
  '../wz-table/lib/rows',
  '../wz-table/lib/pagination',
  '../wz-table/lib/check-gap',
], function (app, calcTableRows, pagination, checkGap) {
  'use strict'

  app.directive('wzDataTable', function (BASE_URL) {
    return {
      restrict: 'E',
      scope: {
        rowSizes: '=rowSizes',
        data: '=',
      },
      controller($scope, $filter, $notificationService, $window) {
        /**
         * Init variables
         */
        $scope.keyEquivalence = $keyEquivalenceService.equivalences() // eslint-disable-line
        $scope.totalItems = 0
        $scope.wazuh_table_loading = true
        $scope.items = []
        /**
         * Resizing. Calculate number of table rows depending on the screen height
         */
        const rowSizes = $scope.rowSizes || [15, 13, 11]
        let doit
        let resizing = false

        /**
         * On windows resize event
         */
        $window.onresize = () => {
          if (resizing) return
          resizing = true
          clearTimeout(doit)
          doit = setTimeout(() => {
            $scope.rowsPerPage = calcTableRows($window.innerHeight, rowSizes)
            $scope.itemsPerPage = $scope.rowsPerPage
            init()
              .then(() => (resizing = false))
              .catch(() => (resizing = false))
          }, 150)
        }
        $scope.rowsPerPage = calcTableRows($window.innerHeight, rowSizes)
        /**
         * Brings results
         */
        const fetch = () => {
          try {
            $scope.filterTable()
            $scope.keys = Object.keys(items[0])
            return
          } catch (error) {
            $notificationService.showErrorToast(error, 'Error loading table')
          }
          return
        }
        $scope.sortValue = ''
        $scope.sortReverse = false
        $scope.searchTerm = ''
        $scope.sort = (key) => {
          if (key !== $scope.sortValue) {
            $scope.sortReverse = false
          }
          $scope.sortValue = key
          $scope.sortReverse = !$scope.sortReverse
          $scope.filterTable()
        }
        $scope.filterTable = () => {
          items = $filter('orderBy')(
            $filter('filter')($scope.data, $scope.searchTerm),
            $scope.sortValue,
            $scope.sortReverse
          )
          $scope.totalItems = items.length
          $scope.items = items
          checkGap($scope, items)
          $scope.searchTable()
        }
        /**
         * Initializes module
         */
        const init = async () => {
          $scope.error = false
          $scope.wazuh_table_loading = true
          await fetch()
          $scope.wazuh_table_loading = false
        }
        /**
         * Pagination variables and functions
         */
        $scope.itemsPerPage = $scope.rowsPerPage || 10
        $scope.pagedItems = []
        $scope.currentPage = 0
        let items = []
        $scope.gap = 0
        $scope.searchTable = () => pagination.searchTable($scope, items)
        $scope.groupToPages = () => pagination.groupToPages($scope)
        $scope.range = (size, start, end) =>
          pagination.range(size, start, end, $scope.gap)
        $scope.prevPage = () => pagination.prevPage($scope)
        $scope.nextPage = async (currentPage) =>
          pagination.nextPage(currentPage, $scope, $notificationService, fetch)
        $scope.setPage = function () {
          $scope.currentPage = this.n
          $scope.nextPage(this.n)
        }
        /**
         * Event listeners
         */
        $scope.$on('$destroy', () => {
          $window.onresize = null
        })
        init()
      },
      templateUrl:
        BASE_URL +
        '/static/app/SplunkAppForWazuh/js/directives/wz-data-table/wz-data-table.html',
    }
  })
})
