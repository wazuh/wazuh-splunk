/*
 * Wazuh app - Wazuh table directive
 * Copyright (C) 2018 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

// import { calcTableRows } from ;
// import { parseValue } from './lib/parse-value';
// import * as pagination from './lib/pagination';
// import { sort } from './lib/sort';
// import * as listeners from './lib/listeners';
// import { searchData, filterData } from './lib/data';
// import { clickAction } from './lib/click-action';
// import { initTable } from './lib/init';
// import { checkGap } from './lib/check-gap';

define([
  '../module',
  './lib/rows',
  './lib/parse-value',
  './lib/pagination',
  './lib/sort',
  './lib/listeners',
  './lib/data',
  './lib/click-action',
  './lib/check-gap'
], function(
  app,
  calcTableRows,
  parseValue,
  pagination,
  sort,
  listeners,
  data,
  clickAction,
  checkGap
) {
  'use strict'

  app.directive('wazuhTable', function(BASE_URL) {
    return {
      restrict: 'E',
      scope: {
        path: '=path',
        keys: '=keys',
        allowClick: '=allowClick',
        implicitFilter: '=implicitFilter',
        rowSizes: '=rowSizes',
        extraLimit: '=extraLimit'
      },
      controller(
        $scope,
        $timeout,
        $dataService,
        $state,
        $keyEquivalenceService,
        $navigationService,
        $currentDataService,
        $notificationService,
        $tableFilterService,
        $window,
        $mdDialog,
        $groupHandler
      ) {
        /**
         * Init variables
         */
        let realTime = false
        const instance = new $dataService($scope.path, $scope.implicitFilter)
        $scope.keyEquivalence = $keyEquivalenceService.equivalences()
        $scope.totalItems = 0
        $scope.wazuhTableLoading = true
        $scope.items = []

        /**
         * Resizing. Calculate number of table rows depending on the screen height
         */
        const rowSizes = $scope.rowSizes || [15, 13, 11]
        let doit
        let resizing = false
        $window.onresize = () => {
          if(resizing) { return }
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
         * Common functions
         */
        $scope.clickAction = (item, state = null) =>
          clickAction(
            instance,
            item,
            $state,
            $navigationService,
            $currentDataService,
            $scope,
            state
          )

        const fetch = async (options = {}) => {
          try {
            const result = await instance.fetch(options)
            items = options.realTime ? result.items.slice(0, 10) : result.items
            $scope.time = result.time
            $scope.totalItems = items.length
            $scope.items = items
            checkGap($scope, items)
            $scope.searchTable()
            return
          } catch (error) {
            if (
              error &&
              !error.data &&
              error.status === -1 &&
              error.xhrStatus === 'abort'
            ) {
              return Promise.reject('Request took too long, aborted')
            }
            return Promise.reject(error)
          }
        }

        $scope.sort = async field =>
          sort(field, $scope, instance, fetch, $notificationService)

        const search = async (term, removeFilters) =>
          data.searchData(
            term,
            removeFilters,
            $scope,
            instance,
            fetch,
            $tableFilterService,
            $notificationService
          )

        const query = async (query, search) =>
          data.queryData(
            query,
            search,
            instance,
            $tableFilterService,
            $scope,
            fetch,
            $notificationService
          )

        const filter = async filter =>
          data.filterData(
            filter,
            $scope,
            instance,
            $tableFilterService,
            fetch,
            $notificationService
          )

        const realTimeFunction = async () => {
          try {
            $scope.error = false
            while (realTime) {
              await fetch({ realTime: true, limit: 10 })
              if (!$scope.$$phase) $scope.$digest()
              await $timeout(1000)
            }
          } catch (error) {
            realTime = false
            $scope.error = `Real time feature aborted - ${error.message ||
              error}.`
            $notificationService.handle(
              `Real time feature aborted. ${error.message || error}`,
              'Data factory'
            )
          }
          return
        }

        $scope.parseValue = (key, item) =>
          parseValue(
            $keyEquivalenceService.equivalences(),
            key,
            item,
            instance.path
          )

        const init = async () => {
          try {
            $scope.error = false
            $scope.wazuhTableLoading = true
            await fetch()
            $tableFilterService.set(instance.filters)
            $scope.wazuhTableLoading = false
            $scope.$emit('loadedTable')
            if (!$scope.$$phase) $scope.$digest()
          } catch (error) {
            $scope.wazuhTableLoading = false
            $scope.error = `Error while init table. ${error.message || error}.`
            $notificationService.showSimpleToast(
              `Error while init table. ${error.message || error}`
            )
          }
          return
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
        $scope.nextPage = async currentPage =>
          pagination.nextPage(currentPage, $scope, $notificationService, fetch)
        $scope.setPage = function() {
          $scope.currentPage = this.n
          $scope.nextPage(this.n)
        }

        /**
         * Event listeners
         */
        $scope.$on('wazuhUpdateInstancePath', (event, parameters) =>
          listeners.wazuhUpdateInstancePath(parameters, instance, init)
        )

        $scope.$on('wazuhFilter', (event, parameters) =>
          listeners.wazuhFilter(parameters, filter)
        )

        $scope.$on('wazuhSearch', (event, parameters) =>
          listeners.wazuhSearch(parameters, instance, search)
        )

        $scope.$on('wazuhRemoveFilter', (event, parameters) =>
          listeners.wazuhRemoveFilter(
            parameters,
            instance,
            $tableFilterService,
            init
          )
        )

        $scope.$on('wazuhQuery', (event, parameters) =>
          listeners.wazuhQuery(parameters, query)
        )

        $scope.$on('wazuhPlayRealTime', () => {
          realTime = true
          return realTimeFunction()
        })

        $scope.$on('wazuhStopRealTime', () => {
          realTime = false
          return init()
        })

        $scope.$on('$destroy', () => {
          $window.onresize = null
          realTime = null
          $tableFilterService.set([])
        })

        $scope.isLookingGroup = () => {
          try {
            const regexp = new RegExp(/^\/agents\/groups\/[a-zA-Z0-9_\-.]*$/)
            return regexp.test(instance.path)
          } catch (error) {
            return false
          }
        }

        $scope.showConfirm = function(ev, agent) {
          const group = instance.path.split('/').pop()
  
          const confirm = $mdDialog
            .confirm()
            .title(`Delete agent "${agent.id}" from group "${group}"?`)
            .targetEvent(ev)
            .ok('Agree')
            .cancel('Cancel');
  
          $mdDialog.show(confirm).then(
            () => {
              $groupHandler
                .removeAgentFromGroup(group, agent.id)
                .then(() => init())
                .then(() => $scope.$emit('updateGroupInformation', { group }))
                .catch(error =>
                  $notificationService.showSimpleToast(
                    error.message || error
                  )
                );
            },
            () => {}
          );
        }

        init()

      },
      templateUrl:
        BASE_URL +
        '/static/app/SplunkAppForWazuh/js/directives/wz-table/wz-table.html'
    }
  })
})
