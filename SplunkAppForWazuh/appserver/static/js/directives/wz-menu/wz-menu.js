/*
 * Wazuh app - Top nav bar directive
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
  'splunkjs/mvc/simpleform/input/dropdown',
  '../../services/visualizations/inputs/dropdown-input',
  'splunkjs/mvc',
], function (directives, Dropdown, DropdownViz, mvc) {
  'use strict'
  directives.directive('wzMenu', function (BASE_URL) {
    return {
      controller: function (
        $scope,
        $currentDataService,
        $navigationService,
        $state,
        $notificationService,
        $urlTokenModel,
        $window,
        $rootScope
      ) {
        $scope.logoUrl =
          BASE_URL +
          '/static/app/SplunkAppForWazuh/css/images/wazuh/svg/wazuh_white_full.svg'

        $scope.select = (item) => {
          $scope.menuNavItem = item
          $scope.$applyAsync()
        }

        $scope.openDiscover = (agentId) => {
          $scope.menuNavItem = 'discover'
          $scope.$broadcast('stateChanged', 'discover')
          $scope.$applyAsync()
          const index = $currentDataService.getIndex().index || 'wazuh'
          //Generate url
          let url = `${BASE_URL}/app/search/search?q=index=${index}`
          url = agentId ? `${url} agent.id=${agentId}` : url
          localStorage.setItem('urlDiscover', url)
          $state.go('discover', { fromDashboard: false })
        }

        $scope.$on('openDiscover', (event, data) => {
          event.stopPropagation()
          $scope.openDiscover(data)
        })

        $scope.openModal = () => {
          const modal = document.getElementById('quick-settings-modal')
          const overlay = document.createElement('div')
          overlay.id = 'quick-settings-overlay'
          document.body.appendChild(overlay)
          overlay.classList.add('modal-backdrop', 'fade')
          overlay.onclick = () => $scope.closeModal()
          setTimeout(() => {
            overlay.classList.add('in')
            modal.classList.remove('fade')
            modal.classList.replace('hide', 'show')
          }, 100)
        }

        $scope.closeModal = () => {
          const modal = document.getElementById('quick-settings-modal')
          const overlay = document.getElementById('quick-settings-overlay')
          overlay.classList.remove('in')
          modal.classList.add('fade')
          modal.classList.replace('show', 'hide')
          setTimeout(() => document.body.removeChild(overlay), 100)
        }

        let dropdownAPI
        let dropdownIndex
        let dropdownSourceType

        let onChangeListeners = []

        const onChangeDropdownAPI = () => {
          onChangeListeners.push(
            dropdownAPI.on('change', (newValue) => {
              try {
                if (newValue && $scope.currentAPI._key != newValue) {
                  selectAPI(newValue)
                }
              } catch (error) {
                $notificationService.showErrorToast(error)
              }
            })
          )
        }

        const onChangeDropdownIndex = () => {
          const dropdownInstance = dropdownIndex.getElement()
          onChangeListeners.push(
            dropdownInstance.on('change', (newValue) => {
              try {
                if (
                  newValue &&
                  dropdownInstance &&
                  $scope.menuCurrentIndex != newValue
                ) {
                  $currentDataService.setIndex(newValue)
                  $urlTokenModel.handleValueChange(dropdownInstance)
                  $scope.menuCurrentIndex = newValue
                  if (!$scope.menuSkipRefresh) $window.location.reload()
                }
              } catch (error) {
                $notificationService.showErrorToast(error)
              }
            })
          )
        }

        const onChangeDropdownSourceType = () => {
          const dropdownInstance = dropdownSourceType.getElement()
          onChangeListeners.push(
            dropdownInstance.on('change', (newValue) => {
              try {
                if (
                  newValue &&
                  dropdownInstance &&
                  $scope.menuCurrentSourceType != newValue
                ) {
                  $currentDataService.setSourceType(newValue)
                  $scope.menuCurrentSourceType = newValue
                  $urlTokenModel.handleValueChange(dropdownInstance)
                  if (!$scope.menuSkipRefresh) $window.location.reload()
                }
              } catch (error) {
                $notificationService.showErrorToast(error)
              }
            })
          )
        }

        const renderDropdownAPI = () => {
          mvc.Components.revokeInstance('menuSelectAPI')
          document.getElementById(`menuSelectAPI`).innerHTML = ''

          dropdownAPI = new Dropdown(
            {
              id: `menuSelectAPI`,
              choices: $scope.apiList.map((item) => ({
                label: item.alias || item.managerName,
                value: item._key,
              })),
              value: $scope.currentAPI._key,
              selectFirstChoice: false,
              el: document.getElementById(`menuSelectAPI`),
            },
            { tokens: false }
          ).render()
        }

        const renderDropdownIndex = () => {
          if (dropdownIndex) {
            dropdownIndex.destroy()
          } else {
            mvc.Components.revokeInstance('menuSelectIndex')
            mvc.Components.revokeInstance('menuSelectIndex')
          }
          document.getElementById(`menuSelectIndex`).innerHTML = ''

          dropdownIndex = new DropdownViz(
            'menuSelectIndex',
            `| metasearch index=* sourcetype=*wazuh* | stats count by index, sourcetype | fields index`,
            'index',
            '$form.index$',
            'menuSelectIndex',
            $scope,
            $scope.menuCurrentIndex,
            '2017-03-14T10:0:0',
            'now'
          )
        }

        const renderDropdownSourceType = () => {
          if (dropdownSourceType) {
            dropdownSourceType.destroy()
          } else {
            mvc.Components.revokeInstance('menuSelectSourceType')
            mvc.Components.revokeInstance('menuSelectSourceTypeSearch')
          }
          document.getElementById(`menuSelectSourceType`).innerHTML = ''

          dropdownSourceType = new DropdownViz(
            'menuSelectSourceType',
            `| metasearch index=${$scope.menuCurrentIndex} sourcetype=* | stats count by index, sourcetype | fields sourcetype`,
            'sourcetype',
            '$form.sourcetype$',
            'menuSelectSourceType',
            $scope,
            $scope.menuCurrentSourceType,
            '2017-03-14T10:0:0',
            'now'
          )
        }

        const clearListeners = () => {
          onChangeListeners.forEach((instance) => instance.stopListening())
          onChangeListeners = []
        }

        const init = async () => {
          update()
          $scope.$on('$destroy', () => {
            clearListeners()
            dropdownAPI.destroy()
            dropdownIndex.destroy()
            dropdownSourceType.destroy()
          })
        }

        const selectAPI = async (key) => {
          try {
            // checking if the api is up
            await $currentDataService.checkApiConnection(key)
            // Selecting API
            await $currentDataService.chose(key)
            $scope.currentAPI = $currentDataService.getApi()
            if (!$scope.menuSkipRefresh) {
              $window.location.reload()
            } else {
              $rootScope.$broadcast('APIChanged', key)
            }
          } catch (err) {
            $notificationService.showErrorToast(err || 'Could not select API')
          }
        }

        const checkLastState = (prefix, state) => {
          try {
            const lastState = $navigationService.getLastState()
            if (lastState)
              if (
                (lastState !== '' && lastState.includes(prefix)) ||
                lastState.includes(state)
              ) {
                return true
              } else {
                return false
              }
            else return false
          } catch (error) {
            throw new Error(error)
          }
        }

        const update = async () => {
          try {
            clearListeners()
            $scope.apiList = await $currentDataService.getApiList()
            const index = $currentDataService.getIndex()
            const sourceType = $currentDataService.getSourceType()
            const api = $currentDataService.getApi()
            $scope.menuCurrentIndex = !index ? 'wazuh' : index.index
            $scope.menuCurrentSourceType = !sourceType
              ? '*'
              : sourceType.sourceType
            $scope.currentAPI = !api ? { managerName: '---', _key: '-' } : api
            $scope.theresAPI = !!api

            if (checkLastState('ow-', 'overview')) {
              $scope.menuNavItem = 'overview'
            } else if (checkLastState('mg-', 'manager')) {
              $scope.menuNavItem = 'manager'
            } else if (checkLastState('ag-', 'agents')) {
              $scope.menuNavItem = 'agents'
            } else if (checkLastState('api.', 'settings')) {
              $scope.menuNavItem = 'settings'
            } else if (checkLastState('dev-tools', 'dev-tools')) {
              $scope.menuNavItem = 'dev-tools'
            } else if (checkLastState('discover', 'discover')) {
              $scope.menuNavItem = 'discover'
            } else if (checkLastState('security', 'security')) {
              $scope.menuNavItem = 'security'
            }

            if ($scope.theresAPI && $scope.apiList.length > 1) {
              renderDropdownAPI()
              onChangeDropdownAPI()
            }
            renderDropdownIndex()
            renderDropdownSourceType()
            onChangeDropdownIndex()
            onChangeDropdownSourceType()
            $scope.$applyAsync()
          } catch (error) {
            console.error('wz-menu:error', error)
            $state.go('settings.api')
          }
        }

        // Listens for changes in the selected API
        $scope.$on('updatedAPI', (event) => {
          event.stopPropagation && event.stopPropagation()
          update()
        })

        //Listens for changes in states
        $scope.$on('stateChanged', (event, data) => {
          $scope.select(data)
          $scope.menuSkipRefresh = data.indexOf('settings') > -1
        })

        init()
      },
      templateUrl:
        BASE_URL +
        '/static/app/SplunkAppForWazuh/js/directives/wz-menu/wz-menu.html',
    }
  })
})
