/*
 * Wazuh app - Wazuh table directive init function
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
define(['../../../utils/filter-handler'], function (FilterHandler) {
  'use strict'

  return async function initTable(
    $scope,
    fetch,
    $tableFilterService,
    instance,
    errorHandler,
    appState,
    globalState,
    $window
  ) {
    try {
      if ($scope.path.includes('/rules')) {
        try {
          const filterHandler = new FilterHandler(appState.getCurrentPattern())
          const checkGlobalFilters = () => {
            if (!globalState.filters || !Array.isArray(globalState.filters)) {
              globalState.filters = []
            }
          }

          $scope.searchRuleId = (e, ruleId) => {
            e.stopPropagation()
            checkGlobalFilters()
            const ruleIdFilter = filterHandler.ruleIdQuery(ruleId)
            if (globalState.filters.length) {
              globalState.filters = globalState.filters.filter(
                (item) => item && item.meta && item.meta.key !== 'rule.id'
              )
            }
            globalState.filters.push(ruleIdFilter)
            $window.location.href = '#/wazuh-discover'
          }
        } catch (error) {
          return
        }
      }
      $scope.error = false
      $scope.wazuhTableLoading = true
      await fetch()
      $tableFilterService.set(instance.filters)
      $scope.wazuhTableLoading = false
    } catch (error) {
      $scope.wazuhTableLoading = false
      $scope.error = `Error while init table.`
      errorHandler.showSimpleToast(
        `Error while init table. ${error.message || error}`
      )
    }
    $scope.$applyAsync()
    return
  }
})
