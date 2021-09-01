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
define(['../module','splunkjs/mvc/simpleform/input/dropdown', '../../services/visualizations/inputs/dropdown-input', 'splunkjs/mvc'], 
function(directives, Dropdown, DropdownViz, mvc) {
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

        let dropdownAPI;
        let dropdownIndex;
        let dropdownSourceType;

        let onChangeListeners = [];
        
        const onChangeDropdownAPI = () => {
          onChangeListeners.push(dropdownAPI.on('change', newValue => {
            try {
              if (newValue) {
                selectAPI(newValue)
              }
            } catch (error) {
              $notificationService.showErrorToast(error)
            }
          }))
        }

        const getSourceTypeQuery = () => {
          return `| metasearch index=${$scope.currentIndex} sourcetype=* | stats count by index, sourcetype | fields sourcetype`;
        };
  
        const onChangeDropdownIndex = () => {          
          const dropdownInstance = dropdownIndex.getElement()
          onChangeListeners.push(dropdownInstance.on('change', newValue => {
            try {
              if (newValue && dropdownInstance) {
                $currentDataService.setIndex(newValue)
                $urlTokenModel.handleValueChange(dropdownInstance)
                $scope.currentIndex = newValue;            
                dropdownSourceType.changeSearch(getSourceTypeQuery());
              }
            } catch (error) {
              notificationService.showErrorToast(error)
            }
          }))
        }

      const onChangeDropdownSourceType = () => {
          const dropdownInstance = dropdownSourceType.getElement()
          onChangeListeners.push(dropdownInstance.on('change', newValue => {
              try {
                  if (newValue && dropdownInstance) {
                    $currentDataService.setSourceType(newValue)
                    $scope.currentSourceType = newValue       
                    $urlTokenModel.handleValueChange(dropdownInstance)
                  }
              } catch (error) {
                  $notificationService.showErrorToast(error)
              }
          }))
      }

        const renderDropdownAPI = () => {
          if (dropdownAPI){
            mvc.Components.revokeInstance(dropdownAPI.id);
            $(`#menuSelectAPI`).html('');
          }

          dropdownAPI = new Dropdown(
            {
              id: `selectAPI`,
              choices: $scope.apiList.map((item)=> ({ label:item.managerName, value:item._key })),
              value: $scope.currentAPI._key,
              selectFirstChoice: false,                    
              el: $(`#menuSelectAPI`)
            },
            { tokens: false}
          ).render()
        }

        const renderDropdownIndex = () => {
          if (dropdownIndex){
            dropdownIndex.destroy();
            $(`#menuSelectIndex`).html('');
          }

          dropdownIndex = new DropdownViz(
            'menuSelectIndex',
            `| metasearch index=* sourcetype=*wazuh* | stats count by index, sourcetype | fields index`,
            'index',
            '$form.index$',
            'menuSelectIndex',
            $scope,
            $scope.currentIndex,
            '2017-03-14T10:0:0',
            'now'
          )
        }

        const renderDropdownSourceType = () => {
          if (dropdownSourceType){
            dropdownSourceType.destroy();
            $(`#menuSelectSourceType`).html('');
          }
          dropdownSourceType = new DropdownViz(
            'menuSelectSourceType',
            getSourceTypeQuery(),
            'sourcetype',
            '$form.sourcetype$',
            'menuSelectSourceType',
            $scope,
            $scope.currentSourceType,
            '2017-03-14T10:0:0',
            'now'
          )
        }

        const clearListeners = () => {
          onChangeListeners.forEach(unregister => unregister())
          onChangeListeners = []
        }
        
        const init = async() => {
          update();
          $scope.$on('$destroy', () => {
            clearListeners()
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

        const update = async() => {
          try {
            $scope.apiList = await $currentDataService.getApiList();
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

            clearListeners()

            if ($scope.theresAPI && $scope.apiList.length > 1) {
              renderDropdownAPI();
              renderDropdownIndex();
              renderDropdownSourceType();
              onChangeDropdownAPI();
              onChangeDropdownIndex();
              onChangeDropdownSourceType();
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
