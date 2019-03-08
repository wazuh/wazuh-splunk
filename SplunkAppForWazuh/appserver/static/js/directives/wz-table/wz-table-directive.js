/*
 * Wazuh app - Wazuh table directive
 * Copyright (C) 2015-2019 Wazuh, Inc.
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
  './lib/check-gap',
  'colResizable'
], function (
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
    app.directive('wazuhTable', function (BASE_URL) {
      return {
        restrict: 'E',
        scope: {
          path: '=path',
          keys: '=keys',
          allowClick: '=allowClick',
          implicitFilter: '=implicitFilter',
          rowSizes: '=rowSizes',
          extraLimit: '=extraLimit',
          adminMode: '=adminMode',
          emptyResults: '=emptyResults',
          customColumns: '=customColumns'
        },
        controller(
          $rootScope,
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
          $groupHandler,
          $sce,
          $fileEditor
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
          $scope.customEmptyResults =
            $scope.emptyResults && typeof $scope.emptyResults === 'string'
              ? $scope.emptyResults
              : 'Empty results for this table.'

          /**
           * Resizing. Calculate number of table rows depending on the screen height
           */
          const rowSizes = $scope.rowSizes || [15, 13, 11]
          let doit
          let resizing = false
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

          /**
           * Fetchs data from API
           * @param {Object} options
           */
          const fetch = async (options = {}) => {
            try {
              if ((instance.filters || []).length) {
                $scope.customEmptyResults =
                  'No results match your search criteria'
              } else {
                $scope.customEmptyResults =
                  $scope.emptyResults || 'Empty results for this table.'
              }
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

          /**
           * Searches for a term
           * @param {String} term
           * @param {Boolean} removeFilters
           */
          const search = async (term, removeFilters) => {

            if (term && typeof term === 'string') {
              $scope.customEmptyResults = 'No results match your search criteria.'
            }

            data.searchData(
              term,
              removeFilters,
              $scope,
              instance,
              fetch,
              $tableFilterService,
              $notificationService
            )
          }

          /**
           * Queries to the API
           * @param {String} query
           * @param {String} search
           */
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

          /**
           * Filters API results
           * @param {String} filter
           */
          const filter = async filter =>
            data.filterData(
              filter,
              $scope,
              instance,
              $tableFilterService,
              fetch,
              $notificationService
            )

          /**
           * Enables or disables the real time function.
           * If enabled, requests to the API will be sended each second
           */
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
              instance.path,
              $sce
            )

          /**
           * Initializes table
           */
          const init = async () => {
            try {
              $scope.showingChecks = false
              $scope.error = false
              $scope.wazuhTableLoading = true
              await fetch()
              $tableFilterService.set(instance.filters)
              $scope.wazuhTableLoading = false
              $scope.$emit('loadedTable')
              if (!$scope.$$phase) $scope.$digest()
              $("table").colResizable({
                liveDrag: true,
                draggingClass: false,
                partialRefresh: true
              })
            } catch (error) {
              $scope.wazuhTableLoading = false
              $scope.error = `Error while init table. ${error.message || error}.`
              $notificationService.showErrorToast(
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
          $scope.setPage = function () {
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

          init()

          $scope.isLookingGroup = () => {
            try {
              const regexp = new RegExp(/^\/agents\/groups\/[a-zA-Z0-9_\-.]*$/)
              $scope.isLookingDefaultGroup =
                instance.path.split('/').pop() === 'default'
              return regexp.test(instance.path)
            } catch (error) {
              return false
            }
          }

          $scope.editGroupAgentConfig = (ev, group) => {
            $rootScope.$broadcast('editXmlFile', { target: group })
          }

          $scope.showConfirmRemoveGroup = (ev, group) => {
            $scope.removingGroup =
              $scope.removingGroup === group.name ? null : group.name
          }

          $scope.showConfirmRemoveAgentFromGroup = (ev, agent) => {
            $scope.removingAgent =
              $scope.removingAgent === agent.id ? null : agent.id
          }

          $scope.cancelRemoveAgent = () => {
            $scope.removingAgent = null
          }

          $scope.cancelRemoveGroup = () => {
            $scope.removingGroup = null
          }

          $scope.editGroup = group => {
            $scope.$emit('openGroupFromList', { group })
          }

          $scope.confirmRemoveAgent = async agent => {
            try {
              const group = instance.path.split('/').pop()
              await $groupHandler.removeAgentFromGroup(group, agent)
              $notificationService.showSuccessToast(
                `Success. Agent ${agent} has been removed from ${group}`
              )
            } catch (error) {
              $notificationService.showErrorToast(`${error.message || error}`)
            }
            $scope.removingAgent = null
            return init()
          }

          $scope.confirmRemoveGroup = async group => {
            try {
              await $groupHandler.removeGroup(group)
              $notificationService.showSuccessToast(
                `Success. Group ${group} has been removed`
              )
            } catch (error) {
              $notificationService.showErrorToast(`${error.message || error}`)
            }
            $scope.removingGroup = null
            return init()
          }

          $scope.isPolicyMonitoring = () => {
            return instance.path.includes('sca') && instance.path.includes('/checks')
          }

          $scope.expandPolicyMonitoringCheck = item => {
            if (item.expanded) item.expanded = false
            else {
              $scope.pagedItems[$scope.currentPage].map(item => item.expanded = false)
              item.expanded = true
            }

          }

          /**
           * Removes a file
           */
          $scope.showConfirmRemoveFile = (ev, item) => {
            $scope.removingFile = item
          }

          $scope.confirmRemoveFile = async (item) => {
            try {
              $scope.removingFile = false
              const result = await $fileEditor.removeFile(item)
              $notificationService.showSuccessToast(result)
              init()
              $scope.$applyAsync()
            } catch (error) {
              $notificationService.showErrorToast(error || `Cannot delete ${item.file || item.name}`)
            }
          }

          $scope.cancelRemoveFile = () => {
            $scope.removingGroup = null
            return init()
          }


          $scope.isSyschecks = () => {
            return instance.path.startsWith('/syscheck')
          }

          $scope.expandItem = item => {
            if (item.expanded) item.expanded = false
            else {
              $scope.pagedItems[$scope.currentPage].map(item => item.expanded = false)
              item.expanded = true
            }
          }

          /**
           * Show a checkbox for each key to show or hide it
           */
          const cleanKeys = () => {
              $scope.cleanKeys = {}
              $scope.keys.map(key => {
                const k = key.value || key
                $scope.cleanKeys[k] = true
              })
            }

            cleanKeys()

            $scope.getEquivalence = key => {
              return $scope.keyEquivalence[key]
            }

            $scope.showCheckbox = () => {
              $scope.showingChecks = !$scope.showingChecks
            }

            $scope.switchKey = (key) => {
              $scope.cleanKeys[key] = !$scope.cleanKeys[key]
            }

            $scope.showKey = (item) => {
              const it = item.value || item
              return $scope.cleanKeys[it]
            }

          },
            templateUrl:
          BASE_URL +
            '/static/app/SplunkAppForWazuh/js/directives/wz-table/wz-table.html'
        }
      })
  })
