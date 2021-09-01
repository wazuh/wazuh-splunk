/*
 * Wazuh app - Top nav bar directive
 * Copyright (C) 2015-2019 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
define(['../module','splunkjs/mvc/simpleform/input/dropdown'], function(directives, Dropdown) {
  'use strict'
  directives.directive('wzMenu', function(BASE_URL) {
    return {
      controller: function(
        $scope,
        $currentDataService,
        $navigationService,
        $state,
        apiList,
        $notificationService
      ) {
        $scope.logoUrl =
          BASE_URL +
          '/static/app/SplunkAppForWazuh/css/images/wazuh/png/wazuh_white_full.png'

        $scope.select = item => {
          $scope.menuNavItem = item
          $scope.$applyAsync()
        }

        $scope.openDiscover = agentId => {
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

        $scope.onChangeSelectedAPI = (newValue) => {
          selectAPI(newValue)
        }

        const dropdownAPI = new Dropdown(
          {
            id: `selectAPI`,
            choices: apiList,
            labelField: 'managerName',
            valueField: '_key',
            initialValue: currentAPI,
            default: defaultValue,
            selectFirstChoice: false,                    
            el: $(`#selectAPI`)
          },
          { tokens: false}
        ).render()     
        
        const onChangeDropdownAPI = () => {          
          const dropdownInstance = dropdownAPI.getElement()
          dropdownInstance.on('change', newValue => {
            try {
              if (newValue && dropdownInstance) {
                selectAPI(newValue)
              }
            } catch (error) {
              $notificationService.showErrorToast(error)
            }
          })
        }

        const init = () => {
          onChangeDropdownAPI();
          $scope.$on('$destroy', () => {
            dropdownAPI.destroy();
          })
        }

        const selectAPI = async (key) => {
          try {
            // checking if the api is up
            await $currentDataService.checkApiConnection(key)
            // Selecting API
            await $currentDataService.chose(key)            
            $notificationService.showSuccessToast('API selected')
            $scope.$emit('updatedAPI', () => { })
            $scope.$applyAsync()
          } catch (err) {
            $notificationService.showErrorToast(err || 'Could not select API')
          }
        }

        const checkLastState = (prefix, state) => {
          try {
            const lastState = $navigationService.getLastState()
          if(lastState)    
            if (
                (lastState !== '' && lastState.includes(prefix)) ||
                lastState.includes(state)
              ) {
                return true
              } else {
                return false
              }
          else
            return false;
          } catch (error) {
            throw new Error(error)
          }
        }

        const update = () => {
          try {
            const index = $currentDataService.getIndex()
            const sourceType = $currentDataService.getSourceType()
            const api = $currentDataService.getApi()
            $scope.currentIndex = !index ? 'wazuh' : index.index
            $scope.currentSourceType = !sourceType ? '*' : sourceType.sourceType
            $scope.currentAPI = !api ? '---' : api.managerName
            $scope.theresAPI = $scope.currentAPI === '---' ? false : true

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
            }
            $scope.$applyAsync()
          } catch (error) {
            $state.go('settings.api')
          }
        }

        // Listens for changes in the selected API
        $scope.$on('updatedAPI', event => {
          event.stopPropagation()
          update()
        })

        //Listens for changes in states
        $scope.$on('stateChanged', (event, data) => {
          $scope.select(data)
          update()
        })

        init()
      },
      templateUrl:
        BASE_URL +
        '/static/app/SplunkAppForWazuh/js/directives/wz-menu/wz-menu.html'
    }
  })
})
