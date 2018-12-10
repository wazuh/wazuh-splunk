/*
 * Wazuh app - Wazuh table directive data methods
 * Copyright (C) 2018 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
define([], function () {
  'use strict';
  return {
    searchData: async (
      term,
      removeFilters,
      $scope,
      instance,
      fetch,
      $tableFilterService,
      $notificationService
    ) => {
      try {
        $scope.error = false
        $scope.wazuhTableLoading = true
        if (removeFilters) instance.removeFilters()
        instance.addFilter('search', term)
        $tableFilterService.set(instance.filters)
        await fetch()
        $scope.wazuhTableLoading = false
      } catch (error) {
        $scope.wazuhTableLoading = false
        $scope.error = `Error searching - ${error.message || error}.`
        $notificationService.showSimpleToast(
          `Error searching. ${error.message || error}`
        )
      }
      if (!$scope.$$phase) $scope.$digest()
      return
    },

    filterData: async (
      filter,
      $scope,
      instance,
      $tableFilterService,
      fetch,
      $notificationService
    ) => {
      try {
        $scope.error = false
        $scope.wazuhTableLoading = true
        if (Array.isArray(filter)) {
          filter.forEach(item => {
            if (item.name === 'platform' && instance.path === '/agents') {
              const platform = item.value.split(' - ')[0]
              const version = item.value.split(' - ')[1]
              instance.addFilter('os.platform', platform)
              instance.addFilter('os.version', version)
            } else {
              instance.addFilter(item.name, item.value)
            }
          })
        } else if (
          filter.name === 'platform' &&
          instance.path === '/agents'
        ) {
          const platform = filter.value.split(' - ')[0]
          const version = filter.value.split(' - ')[1]
          instance.addFilter('os.platform', platform)
          instance.addFilter('os.version', version)
        } else {
          instance.addFilter(filter.name, filter.value)
        }
        $tableFilterService.set(instance.filters)
        await fetch()
        $scope.wazuhTableLoading = false
        if (!$scope.$$phase) $scope.$digest()
      } catch (error) {
        $scope.wazuhTableLoading = false
        $scope.error = `Error filtering by ${
          filter ? filter.value : 'undefined'
        }. ${error.message || error}.`
        $notificationService.showSimpleToast(
          `Error filtering by ${
            filter ? filter.value : 'undefined'
          }. ${error.message || error}`
        )
      }
      return
    }
  }
})