/*
 * Wazuh app - Wazuh table directive helper
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
  'use strict'
  return async function sort(field, $scope, instance, fetch, errorHandler) {
    try {
      $scope.error = false
      $scope.wazuhTableLoading = true
      instance.addSorting(field.value || field)
      $scope.sortValue = instance.sortValue
      $scope.sortDir = instance.sortDir
      await fetch()
      $scope.wazuhTableLoading = false
    } catch (error) {
      $scope.wazuhTableLoading = false
      $scope.error = `Error sorting table by ${
        field ? field.value : 'undefined'
        } - ${error.message || error}.`
      errorHandler.showSimpleToast(
        `Error sorting table by ${
        field ? field.value : 'undefined'
        }. ${error.message || error}`
      )
    }
    if (!$scope.$$phase) $scope.$digest()
    return
  }
})
