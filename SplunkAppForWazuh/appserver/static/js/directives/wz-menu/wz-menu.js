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
        $notificationService,
        $urlTokenModel
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

      
        let dropdownAPI;
        let dropdownIndex;
        let dropdownSourceType;
        
        const onChangeDropdownAPI = () => {
          dropdownAPI.on('change', newValue => {
            try {
              if (newValue) {
                selectAPI(newValue)
              }
            } catch (error) {
              $notificationService.showErrorToast(error)
            }
          })
        }

        const getSourceTypeQuery = () => {
          return `| metasearch index=${$scope.currentIndex} sourcetype=* | stats count by index, sourcetype | fields sourcetype`;
        };
  
        const onChangeDropdownIndex = () => {          
          const dropdownInstance = dropdownIndex.getElement()
          dropdownInstance.on('change', newValue => {
            try {
              if (newValue && dropdownInstance) {
                $currentDataService.setIndex(newValue)
                $scope.$emit('updatedAPI', {})
                $urlTokenModel.handleValueChange(dropdownInstance)
                $scope.currentIndex = newValue;            
                $notificationService.showSuccessToast('Index selected')          
                dropdownSourceType.changeSearch(getSourceTypeQuery());
              }
            } catch (error) {
              notificationService.showErrorToast(error)
            }
          })
        }

      const onChangeDropdownSourceType = () => {
          const dropdownInstance = dropdownSourceType.getElement()
          dropdownInstance.on('change', newValue => {
              try {
                  if (newValue && dropdownInstance) {
                    $currentDataService.setSourceType(newValue)
                    $scope.$emit('updatedAPI', {})
                    $notificationService.showSuccessToast('Source Type selected')
                    $scope.currentSourceType = newValue       
                    $urlTokenModel.handleValueChange(dropdownInstance)
                  }
              } catch (error) {
                  $notificationService.showErrorToast(error)
              }
          })
      }

        const renderDropdownAPI = () => {
          dropdownAPI = new Dropdown(
            {
              id: `selectAPI`,
              choices: $scope.apiList.map((item)=> ({ label:item.managerName, value:item._key })),
              value: $scope.currentAPI._key,
              selectFirstChoice: false,                    
              el: $(`#selectAPI`)
            },
            { tokens: false}
          ).render()
        }

        const renderDropdownIndex = () => {
          dropdownIndex = new Dropdown(
            'inputIndexes',
            `| metasearch index=* sourcetype=*wazuh* | stats count by index, sourcetype | fields index`,
            'index',
            '$form.index$',
            'inputIndexes',
            $scope,
            $scope.currentIndex,
            '2017-03-14T10:0:0',
            'now'
          )
        }

        const renderDropdownSourceType = () => {
          dropdownSourceType = new Dropdown(
            'inputSourcetype',
            getSourceTypeQuery(),
            'sourcetype',
            '$form.sourcetype$',
            'inputSourcetype',
            $scope,
            $scope.currentSourceType,
            '2017-03-14T10:0:0',
            'now'
          )
        }

        const init = async() => {
          $scope.apiList = await $currentDataService.getApiList();
          update();
          renderDropdownAPI();
          renderDropdownIndex();
          renderDropdownSourceType();
          onChangeDropdownAPI();
          onChangeDropdownIndex();
          onChangeDropdownSourceType();
          $scope.$on('$destroy', () => {
            dropdownAPI.destroy();
            dropdownIndex.destroy();
            dropdownSourceType.destroy();
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
            $scope.currentAPI = !api ? {managerName:'---', _key:'-'} : api
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
