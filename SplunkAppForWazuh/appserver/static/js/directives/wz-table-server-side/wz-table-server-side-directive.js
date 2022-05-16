/*
 * Wazuh app - Wazuh table directive
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
  './lib/rows',
  './lib/parse-value',
  './lib/pagination',
  './lib/sort',
  './lib/listeners',
  './lib/data',
  './lib/click-action',
  './lib/check-gap',
  'JqueryUI',
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
  app.directive('wazuhTableServerSide', function (BASE_URL) {
    return {
      restrict: 'E',
      scope: {
        path: '=path',
        keys: '=keys',
        allowClick: '=allowClick',
        implicitFilter: '=implicitFilter',
        rowSizes: '=rowSizes',
        extraLimit: '=extraLimit',
        emptyResults: '=emptyResults',
        customColumns: '=customColumns',
        implicitSort: '=implicitSort',
        wzConfigViewer: '=wzConfigViewer',
        isRegistryValue: '=isRegistryValue',
        agentId: '=agentId',
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
        $security_service,
        $window,
        $groupHandler,
        $sce,
        $fileEditor,
        $dateDiffService,
        $mdDialog
      ) {
        /**
         * Init variables
         */

        $scope.isAllowed = (action, resource, params = '*') => {
          return $security_service.getPolicy(action, resource, params).isAllowed
        }
        $scope.showingChecks = false
        let realTime = false
        const instance = new $dataService(
          $scope.path,
          $scope.implicitFilter,
          $scope.implicitSort,
          true // server-side pagination
        )

        $scope.isVulnerabilities = instance.path.startsWith('/vulnerability')
        $scope.isPolicyMonitoring =
          instance.path.includes('sca') && instance.path.includes('/checks')
        $scope.isSyschecks = instance.path.startsWith('/syscheck')

        $scope.keyEquivalence = $keyEquivalenceService.equivalences()
        $scope.totalItems = 0
        $scope.wazuhTableLoading = true
        $scope.items = []
        $scope.customEmptyResults =
          $scope.emptyResults && typeof $scope.emptyResults === 'string'
            ? $scope.emptyResults
            : 'Empty results for this table.'

        $scope.originalkeys = $scope.keys.map((key, idx) => ({ key, idx }))
        $scope.scapepath = $scope.path.split('/').join('')

        $scope.updateColumns = (key) => {
          if (!$scope.isLastKey(key)) {
            const cleanArray = $scope.keys.map((item) => item.value || item)
            if (cleanArray.includes(key)) {
              const idx = cleanArray.indexOf(key)
              if (idx > -1) {
                $scope.keys.splice(idx, 1)
              }
            } else {
              let originalKey = $scope.originalkeys.filter(
                (k) => k.key.value === key || k.key === key
              )
              originalKey = originalKey[0].key

              const originalIdx = $scope.originalkeys.findIndex(
                (item) => item.key === originalKey
              )
              if (originalIdx >= 0) {
                $scope.keys.splice(originalIdx, 0, originalKey)
              } else {
                let originalKey = $scope.originalkeys.filter(
                  (k) => k.key.value === key || k.key === key
                )
                try {
                  originalKey = originalKey[0].key
                  const originalIdx = $scope.originalkeys.findIndex(
                    (item) => item.key === originalKey
                  )
                  if (originalIdx >= 0) {
                    $scope.keys.splice(originalIdx, 0, originalKey)
                  } else {
                    $scope.keys.push(originalKey)
                  }
                } catch (error) {
                  $notificationService.showWarningToast(
                    'Cannot recover column.'
                  )
                }
              }
            }
          }
          //updateStoredKeys($scope.keys)
        }

        $scope.exists = (key) => {
          const str = key || key.value
          for (const k of $scope.keys) if ((k.value || k) === str) return true
          return false
        }

        $scope.isLastKey = (key) => {
          const exists = $scope.exists(key)
          const keysLength = $scope.keys.length === 1
          const keyValue = key || key.value
          const lastKeyValue = $scope.keys[0].value || $scope.keys[0]
          return exists && keysLength && keyValue && lastKeyValue
        }

        $scope.setColResizable = () => {
          try {
            if ($scope.customColumns) {
              $(`#table${$scope.scapepath} th`).resizable({
                handles: 'e',
                minWidth: 75,
                start: () => {
                  $scope.resizingColumns = true
                },
                end: () => {
                  $scope.resizingColumns = false
                },
              })
              $scope.$applyAsync()
            }
          } catch (error) {} // eslint-disable-line
        }

        /**
         * Resizing. Calculate number of table rows depending on the screen height
         */
        const rowSizes = $scope.rowSizes || [15, 13, 11]
        let doit
        let resizing = false
        let itemsPerPage
        if (!$scope.wzConfigViewer) {
          $window.onresize = () => {
            if (resizing || $scope.resizingColumns) return
            resizing = true
            clearTimeout(doit)
            doit = setTimeout(() => {
              $scope.rowsPerPage = calcTableRows($window.innerHeight, rowSizes)
              $scope.itemsPerPage = $scope.rowsPerPage
              if (itemsPerPage != $scope.itemsPerPage) {
                itemsPerPage = $scope.itemsPerPage
                init()
                  .then(() => {
                    $scope.setColResizable()
                    resizing = false
                  })
                  .catch(() => (resizing = false))
              } else {
                resizing = false
              }
            }, 1300)
          }
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
        const fetch = async (
          options = { offset: 0, limit: $scope.itemsPerPage }
        ) => {
          try {
            if ((instance.filters || []).length) {
              $scope.customEmptyResults =
                'No results match your search criteria'
            } else {
              $scope.customEmptyResults =
                $scope.emptyResults || 'Empty results for this table.'
            }
            const result = await instance.fetch(options)
            $scope.time = result.time
            $scope.totalItems = result.totalItems
            $scope.totalPages = Math.floor(
              $scope.totalItems / $scope.itemsPerPage
            )
            $scope.items = result.items
            checkGap($scope)
            $scope.range = pagination.range(
              $scope.totalPages,
              $scope.currentPage,
              $scope.currentPage + $scope.gap,
              $scope.gap
            )
            $scope.$emit('wazuhFetched', { items: $scope.items })
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

        $scope.canFilter = (keyTmp) => {
          return (
            ($scope.path === '/rules' &&
              (keyTmp === 'level' || keyTmp === 'file' || keyTmp === 'path')) ||
            ($scope.path === '/decoders' &&
              (keyTmp === 'path' || keyTmp === 'file'))
          )
        }

        $scope.parseKey = (key) => {
          return key ? key.value || key : key
        }

        $scope.handleClick = (key, item, ev) => {
          const value = $scope.parseValue(key, item)
          let keyTmp = $scope.parseKey(key)
          const valueTmp = typeof value !== 'string' ? value.toString() : value
          const canFilter = $scope.canFilter(keyTmp)
          if (canFilter) {
            if (value !== '-' && keyTmp !== 'file') {
              const filter = `${keyTmp}:${valueTmp}`
              $scope.$emit('applyFilter', { filter })
            } else if (keyTmp === 'file') {
              const readOnly = !(
                item.relative_dirname === 'etc/rules' ||
                item.relative_dirname === 'etc/decoders'
              )
              $scope.$emit('editFile', {
                file: item.filename,
                path: item.relative_dirname,
                readOnly,
              })
            }
            ev.stopPropagation()
          }
        }

        $scope.sort = async (field) =>
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
        const query = async (query, search) => {
          try {
            await data.queryData(
              query,
              search,
              instance,
              $tableFilterService,
              $scope,
              fetch,
              $notificationService
            )
          } catch (error) {
            $scope.error = `Error while querying API.`
            $notificationService.showErrorToast(
              `Error while querying API. ${error.message || error}`
            )
          }
          $scope.wazuhTableLoading = false
          $scope.$applyAsync()
        }

        /**
         * Filters API results
         * @param {String} filter
         */
        const filter = async (filter) =>
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
              await fetch({ realTime: true })
              $scope.$applyAsync()
              await $timeout(5000)
            }
          } catch (error) {
            realTime = false
            $scope.error = `Real time feature aborted - ${
              error.message || error
            }.`
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
            $sce,
            $dateDiffService
          )

        /**
         * Pagination variables and functions
         */
        $scope.itemsPerPage = $scope.rowsPerPage || 10
        $scope.currentPage = 0
        $scope.gap = 0

        $scope.prevPage = async () =>
          pagination.prevPage($scope, $notificationService, fetch)
        $scope.nextPage = async () =>
          pagination.nextPage($scope, $notificationService, fetch)
        $scope.setPage = function (page = false) {
          $scope.currentPage = typeof page == 'number' ? page : this.n
          pagination.setPage($scope, $notificationService, fetch)
        }
        $scope.getFirstPage = () => {
          $scope.setPage(0)
        }
        $scope.getLastPage = () => {
          const lastPage = $scope.totalPages
          $scope.setPage(lastPage)
        }

        /**
         * Initializes table
         */
        const init = async () => {
          try {
            $scope.error = false
            $scope.setPage(0)
            $tableFilterService.set(instance.filters)
            $scope.$emit('loadedTable')
            $scope.$applyAsync()
            setTimeout(() => {
              $scope.setColResizable()
            }, 100)
          } catch (error) {
            $scope.wazuhTableLoading = false
            $scope.error = `Error while init table.`
            $notificationService.showErrorToast(
              `Error while init table. ${error.message || error}`
            )
          }
          return
        }

        /**
         * Event listeners
         */

        $scope.$on('increaseLogs', async (event, parameters) => {
          $scope.setPage(parseInt(parameters.lines / $scope.itemsPerPage))
        })

        $scope.$on('wazuhUpdateInstancePath', (event, parameters) =>
          listeners.wazuhUpdateInstancePath(parameters, instance, init)
        )

        $scope.$on('wazuhFilter', (event, parameters) =>
          listeners.wazuhFilter(parameters, filter)
        )

        $scope.$on('wazuhSearch', (event, parameters) =>
          listeners.wazuhSearch(parameters, instance, search)
        )

        $scope.$on('wazuhSort', (event, parameters) =>
          $scope.sort(parameters.field)
        )

        $scope.$on('wazuhRemoveFilter', (event, parameters) =>
          listeners.wazuhRemoveFilter(
            parameters,
            instance,
            $tableFilterService,
            init
          )
        )

        $scope.$on('wazuhQuery', (event, parameters) => {
          $scope.wazuhTableLoading = true
          listeners.wazuhQuery(parameters, query)
        })

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
            const regexp = new RegExp(/^\/groups\/[a-zA-Z0-9_\-.]*\/agents$/)
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

        $scope.showConfirmRemoveAgentFromGroup = (_ev, agent) => {
          $scope.removingAgent =
            $scope.removingAgent === agent.id ? null : agent.id
        }

        $scope.cancelRemoveAgent = () => {
          $scope.removingAgent = null
        }

        $scope.cancelRemoveGroup = () => {
          $scope.removingGroup = null
        }

        $scope.editGroup = (group) => {
          $scope.$emit('openGroupFromList', { group })
        }

        $scope.confirmRemoveAgent = async (agent) => {
          try {
            const [, group] =
              instance.path.match(/^\/groups\/([a-zA-Z0-9_\-.]*)\/agents$/) ||
              []
            const result = await $groupHandler.removeAgentFromGroup(
              group,
              agent
            )
            $notificationService.showSuccessToast(
              result.message ||
                `Success. Agent ${agent} has been removed from ${group}`
            )
          } catch (error) {
            $notificationService.showErrorToast(`${error.message || error}`)
          }
          $scope.removingAgent = null
          return init()
        }

        $scope.confirmRemoveGroup = async (group) => {
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

        /**
         * Edits a file
         */
        $scope.editFile = (file, path, readOnly = false) => {
          $scope.$emit('editFile', { file, path, readOnly })
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
            $notificationService.showErrorToast(
              error || `Cannot delete ${item.filename || item.name}`
            )
          }
        }

        $scope.cancelRemoveFile = () => {
          $scope.removingFile = null
          return init()
        }

        $scope.getWitdh = (key) => {
          try {
            if (key.includes('id') || key.includes('level')) {
              return 'wz-width-85'
            }
            if (key.includes('pci') || key.includes('gdpr')) {
              return 'wz-width-150'
            }
          } catch (error) {} // eslint-disable-line
        }

        const checkIsWindows = () => {
          try {
            const agent = $scope.$parent.$parent.$parent.agent
            return (agent.os || {}).platform === 'windows'
          } catch (error) {
            return false
          }
        }

        $scope.isWindows = checkIsWindows()

        $scope.expandItem = (item) => {
          if (item.expanded) item.expanded = false
          else {
            $scope.items.map((item) => (item.expanded = false))
            item.expanded = true
          }
        }

        $scope.loadRegistryValueDetails = async (item) => {
          var parentEl = angular.element(document.body) // eslint-disable-line
          $mdDialog.show({
            parent: parentEl,
            template: `<md-dialog aria-label="List dialog">
              <h3 class="wz-headline-title boldText">Registry values</h3>
              <md-divider class="wz-margin-top-10"></md-divider>
              <md-dialog-content>
                <span class="wz-lh-32">File: ${item.file}</span>
                <wazuh-table
                  flex
                  path="'/syscheck/${$scope.agentId}'"
                  implicit-filter="[{name:'type',value:'registry_value'},{name:'file',value:'${item.file.replaceAll(
                    '\\',
                    '\\\\'
                  )}'}]"
                  row-sizes="[6,6,6]"
                  extra-limit="true"
                  keys="['date','value.name','value.type','sha1']"
                ></wazuh-table>
              </md-dialog-content>
              <md-dialog-actions>
                <md-button ng-click="ctrl.closeDialog()" class="splButton-primary">
                  Close
                </md-button>
              </md-dialog-actions>
            </md-dialog>;`,
            locals: {
              items: item,
            },
            controller: DialogController,
            controllerAs: 'ctrl',
          })
          function DialogController($mdDialog) {
            this.closeDialog = function () {
              $mdDialog.hide()
            }
          }
        }

        /**
         * Show a checkbox for each key to show or hide it
         */
        const cleanKeys = () => {
          if ($scope.customColumns && sessionStorage[$scope.path]) {
            $scope.cleanKeys = {}
            $scope.keys.map((key) => {
              const k = key.value || key
              let storedKeys = sessionStorage[$scope.path].split(';')
              $scope.cleanKeys[k] = storedKeys.indexOf(k) !== -1
            })
          } else {
            $scope.cleanKeys = {}
            $scope.keys.map((key) => {
              const k = key.value || key
              $scope.cleanKeys[k] = true
            })
          }
        }

        /**
         * Launch an event to open the discover with the agent id
         */
        $scope.launchAgentDiscover = (agentId) => {
          $scope.$emit('openDiscover', agentId)
        }

        cleanKeys()

        $scope.getEquivalence = (key) => {
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
        '/static/app/SplunkAppForWazuh/js/directives/wz-table-server-side/wz-table-server-side.html',
    }
  })
})
