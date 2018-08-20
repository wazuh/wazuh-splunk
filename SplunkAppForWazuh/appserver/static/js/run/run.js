define([
  './module'
], function (
  module
) {
    'use strict'
    module.run(['$rootScope', '$state', '$transitions', '$navigationService', '$currentDataService', function ($rootScope, $state, $transitions, $navigationService, $currentDataService, $notificationService) {
      $navigationService.goToLastState()
      $transitions.onStart({ to: 'settings.api' }, async (trans) => {
        try {
          const { api, selectedIndex } = await $currentDataService.checkSelectedApiConnection()
          $currentDataService.setApi(api)
          $currentDataService.cleanFilters()
          $navigationService.storeRoute('settings.api')
          $currentDataService.addFilter(`{"${api.filter[0]}":"${api.filter[1]}", "implicit":true}`)
          $currentDataService.addFilter(`{"index":"${$currentDataService.getIndex().index}", "implicit":true}`)
          $rootScope.$broadcast('stateChanged', 'settings')
        } catch (err) {
          $notificationService.showSimpleToast('no more connectivity with API, redirecting to settings', err)
          $state.go('settings.api')
        }
      })
      $transitions.onStart({ to: 'manager' }, async (trans) => {
        try {
          const { api, selectedIndex } = await $currentDataService.checkSelectedApiConnection()
          $currentDataService.setApi(api)
          $currentDataService.cleanFilters()
          $navigationService.storeRoute('manager')
          $currentDataService.addFilter(`{"${api.filter[0]}":"${api.filter[1]}", "implicit":true}`)
          $currentDataService.addFilter(`{"index":"${$currentDataService.getIndex().index}", "implicit":true}`)
          $rootScope.$broadcast('stateChanged', 'manager')
        } catch (err) {
          $notificationService.showSimpleToast('no more connectivity with API, redirecting to settings', err)
          $state.go('settings.api')
        }
      })
      $transitions.onStart({ to: 'overview' }, async (trans) => {
        try {
          const { api, selectedIndex } = await $currentDataService.checkSelectedApiConnection()
          $currentDataService.setApi(api)
          $currentDataService.cleanFilters()
          $navigationService.storeRoute('overview')
          $currentDataService.addFilter(`{"${api.filter[0]}":"${api.filter[1]}", "implicit":true}`)
          $currentDataService.addFilter(`{"index":"${$currentDataService.getIndex().index}", "implicit":true}`)
          $rootScope.$broadcast('stateChanged', 'overview')
        } catch (err) {
          $notificationService.showSimpleToast('no more connectivity with API, redirecting to settings', err)
          $state.go('settings.api')
        }
      })
      $transitions.onStart({ to: 'agents' }, async (trans) => {
        try {
          const { api, selectedIndex } = await $currentDataService.checkSelectedApiConnection()
          $currentDataService.setApi(api)
          $currentDataService.cleanFilters()
          $navigationService.storeRoute('agents')
          $currentDataService.addFilter(`{"${api.filter[0]}":"${api.filter[1]}", "implicit":true}`)
          $currentDataService.addFilter(`{"index":"${$currentDataService.getIndex().index}", "implicit":true}`)
          $rootScope.$broadcast('stateChanged', 'agents')
        } catch (err) {
          $notificationService.showSimpleToast('no more connectivity with API, redirecting to settings', err)
          $state.go('settings.api')
        }
      })
    }])
  })

