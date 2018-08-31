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
  directives.directive('wazuhBar', function ($notificationService) {
    return {
      restrict: 'E',
      controller: function ($scope, $currentDataService) {

        /**
         * Prettifies filters for md-chips
         * @returns {Array}
         */
        const getPrettyFilters = () => {
          const prettyFilters = []
          const uglyFilters = $currentDataService.getFilters()
          if (uglyFilters && uglyFilters.length > 0) {
            for (const filter of uglyFilters) {
              const key = Object.keys(filter)[0]
              prettyFilters.push(`${key}:${filter[key]}`)
            }
          }
          return prettyFilters
        }

        $scope.filters = getPrettyFilters()

        /**
         * Returns if a string is static
         * @param {String} filter
         * @returns {Boolean}
         */
        $scope.filterStatic = filter => {
          const key = filter.split(':')[0]
          const staticTrue = $currentDataService.getFilters().filter(item => !!item.implicit)
          const isIncluded = staticTrue.filter(item => typeof item[key] !== 'undefined')
          return !!isIncluded.length
        }

        /**
         * Removes a filter on click
         * @param {String}: The filter to be removed 
         */
        $scope.removeFilter = (filter) => {
          const index = $scope.filters.indexOf(filter)
          if (index > -1) {
            $currentDataService.removeFilter($scope.filters[index])
            $scope.filters.splice(index, 1)
          }
          $scope.$emit('deletedFilter', {})
        }

        /**
         * Applies the written filter to visualizations
         * @param {Object | String} filter 
         */
        $scope.applyFilters = (customSearch) => {
          try {
            if (!customSearch || customSearch.split(':').length !== 2 || customSearch.split(':')[1].length === 0) {
              throw new Error('Incorrent format. Please use key:value syntax')

            }
            $currentDataService.addFilter(`{"${customSearch.split(':')[0]}":"${customSearch.split(':')[1]}"}`)
            $scope.filters = getPrettyFilters()
            $scope.$emit('barFilter', {})
            if (!$scope.$$phase) $scope.$digest()
          } catch (err) {
            $notificationService.showSimpleToast(err.message || err)
          }
        }
      },
      templateUrl: '/static/app/SplunkAppForWazuh/js/directives/wz-bar/wz-bar.html'
    }
  })
})