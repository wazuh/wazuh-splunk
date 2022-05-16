/*
 * Wazuh app - Filter bar directive
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
  directives.directive('wazuhBar', function ($notificationService, BASE_URL) {
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
              const cleanKey = key.replace('{}', '')
              if (key !== 'index' && key !== 'sourcetype') {
                prettyFilters.push(`${cleanKey}:${filter[key]}`)
              }
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
        function filterStatic(filter) {
          let keyStatic = false
          const key = filter.split(':')[0]
          const staticTrue = $currentDataService
            .getFilters()
            .filter((item) => !!item.implicit)
          staticTrue.map((item) => {
            let k = Object.keys(item)[0]
            if (k.endsWith('{}')) {
              k = k.substring(0, k.length - 2)
            }
            if (k === key) {
              keyStatic = item['implicit']
            }
          })
          return keyStatic
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
            if (
              !customSearch ||
              customSearch.split(':').length !== 2 ||
              customSearch.split(':')[1].length === 0
            ) {
              throw new Error('Incorrent format. Please use key:value syntax')
            }
            $currentDataService.addFilter(
              `{"${customSearch.split(':')[0]}":"${
                customSearch.split(':')[1]
              }"}`
            )
            $scope.filters = getPrettyFilters()
            $scope.$emit('barFilter', {})
            $scope.$applyAsync()
          } catch (err) {
            $notificationService.showErrorToast(err.message || err)
          }
        }

        /**
         * Change chip showing pin and trash icons
         * @param {Object | String} chip
         */
        $scope.editChip = (chip) => {
          const chipIsStatic = filterStatic(chip)
          if (!chipIsStatic) {
            $scope.editingChip = chip
            if ($scope.finishChipTimer) clearTimeout($scope.finishChipTimer)
          }
        }

        /**
         * Cancel edition mode
         * @param {Object | String} chip
         */
        $scope.finishChipEdition = () => {
          $scope.finishChipTimer = setTimeout(function () {
            $scope.editingChip = false
            clearTimeout($scope.finishChipTimer)
            $scope.$applyAsync()
          }, 500)
        }

        /**
         * Check if the filter is pined
         * @param {Object | String} chip
         */
        function filterPined(filter) {
          const key = filter.split(':')[0]
          const staticTrue = $currentDataService
            .getFilters()
            .filter((item) => !!item.pined)
          const isIncluded = staticTrue.filter(
            (item) => typeof item[getUnformatedFilterKey(key)] !== 'undefined'
          )
          return !!isIncluded.length
        }
        $scope.filterPined = (chip) => filterPined(chip)

        /**
         * Pin the filter
         * @param {Object | String} chip
         */
        $scope.pinFilter = (filter) => {
          try {
            const key = filter.split(':')[0]
            const value = filter.split(':')[1]
            if (filterPined(filter)) {
              $currentDataService.pinFilter(
                `{"${getUnformatedFilterKey(key)}":"${value}", "pined":true}`
              )
            } else {
              $currentDataService.pinFilter(
                `{"${getUnformatedFilterKey(key)}":"${value}", "pined":false}`
              )
            }
            $scope.filters = getPrettyFilters()
            $scope.$applyAsync()
          } catch (err) {
            $notificationService.showErrorToast(err.message || err)
          }
        }

        /**
         * Searchs the filter key with '{}' at the end of the key in filtered fields. If found returns the unformated key, otherwise returns the original key
         * @param {String} key
         * @returns {String}
         */
        const getUnformatedFilterKey = (key) => {
          const unformatedKey = $currentDataService
            .getFilters()
            .some((item) => item[`${key}{}`] !== undefined)
            ? `${key}{}`
            : key
          return unformatedKey
        }
      },
      templateUrl:
        BASE_URL +
        '/static/app/SplunkAppForWazuh/js/directives/wz-bar/wz-bar.html',
    }
  })
})
