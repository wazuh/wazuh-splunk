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
  directives.directive('wazuhAwsBar', function ($notificationService, BASE_URL) {
    return {
      restrict: 'E',
      controller: function ($scope, $currentDataService) {
        /**
         * Prettifies filters for md-chips
         * @returns {Array}
         */

        const init = () => {
          try {
            $scope.filters = getPrettyFilters()
            $scope.$on('applyFiltersAws', () => {
              $scope.filters = getPrettyFilters()
            })
          } catch (err) {
            $notificationService.showSimpleToast(err.message || err)
          }
        }
        
        const getPrettyFilters = () => {
          try {
            let prettyFilters = []
            const uglyFilters = $currentDataService.getFilters()
            if (uglyFilters && uglyFilters.length > 0) {
              for (const filter of uglyFilters) {
                const key = Object.keys(filter)[0]
                prettyFilters.push(`${key}:${filter[key]}`)
              }
            }
            const awsFilter = JSON.parse(window.localStorage.getItem('awsSourceFilters'))
            if (awsFilter && awsFilter.length > 0) {
              for (const filter of awsFilter) {
                const key = Object.keys(filter)[0]
                prettyFilters.push(`${key}:${filter[key]}`)
              }
            }
            return prettyFilters
          } catch (err) {
            return Promise.reject(err)
          }
        }
    
        /**
         * Returns if a string is static
         * @param {String} filter
         * @returns {Boolean}
         */
        $scope.filterStatic = filter => {
          const key = filter.split(':')[0]
          const staticTrue = $currentDataService
            .getFilters()
            .filter(item => !!item.implicit)
          const isIncluded = staticTrue.filter(
            item => typeof item[key] !== 'undefined'
          )
          return !!isIncluded.length
        }

        /**
         * Removes a filter on click
         * @param {String}: The filter to be removed
         */
        $scope.removeFilter = filter => {
          const index = $scope.filters.indexOf(filter) - 3 //subtract 3 positions to match the correct index
          let awsFilters = JSON.parse(window.localStorage.getItem('awsSourceFilters'))
          awsFilters.splice(index, 1)
          window.localStorage.setItem('awsSourceFilters', JSON.stringify(awsFilters))
          $scope.filters = getPrettyFilters()
          $scope.$emit('deletedFilter', {})
        }

        const getAwsFiltersValue = () => {
          try {
            let sourceValues = []
            let awsCurrentFilters = []

            if (JSON.parse(window.localStorage.getItem('awsSourceFilters'))) {
              awsCurrentFilters = JSON.parse(window.localStorage.getItem('awsSourceFilters'))
            }
            awsCurrentFilters = awsCurrentFilters.filter(item => item['data.aws.source'])
            awsCurrentFilters.map(filter => {
              sourceValues.push(filter['data.aws.source'])
            })
            return sourceValues
          } catch (err) {
            return Promise.reject(err)
          }
        }

        /**
         * Applies the written filter to visualizations
         * @param {Object | String} filter
         */
        $scope.applyFilters = customSearch => {
          try {
            let awsSourceFilters = []
            const newFilter = {}
            if (
              !customSearch ||
              customSearch.split(':').length !== 2 ||
              customSearch.split(':')[1].length === 0
            ) {        $scope.filters = getPrettyFilters()

              throw new Error('Incorrent format. Please use key:value syntax')
            }
            if (JSON.parse(window.localStorage.getItem('awsSourceFilters'))) { awsSourceFilters = JSON.parse(window.localStorage.getItem('awsSourceFilters')) }
            const newKey = customSearch.split(':')[0]
            const newValue = customSearch.split(':')[1]
            newFilter[newKey] = newValue
            const checkAwsKeys = awsSourceFilters.filter(item => item[newKey])
            if (checkAwsKeys.length > 0 && newKey != 'data.aws.source') {
              awsSourceFilters = awsSourceFilters.filter(item => !item[newKey])
              awsSourceFilters.push(newFilter)
            } else {
              if (newKey === 'data.aws.source') {
                const awsSourceValues = getAwsFiltersValue()
                if (!awsSourceValues.includes(newValue)) {
                  awsSourceFilters.push(newFilter)
                }
              } else {
                awsSourceFilters.push(newFilter)
              }
            }
            window.localStorage.setItem('awsSourceFilters', JSON.stringify(awsSourceFilters))
            $scope.filters = getPrettyFilters()
            $scope.$emit('barFilter', {})
            if (!$scope.$$phase) $scope.$digest()
          } catch (err) {
            $notificationService.showSimpleToast(err.message || err)
          }
        }
        
        init()

      },
      templateUrl:
        BASE_URL +
        '/static/app/SplunkAppForWazuh/js/directives/wz-aws-bar/wz-aws-bar.html'
    }
  })
})



