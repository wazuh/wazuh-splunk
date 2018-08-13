define([
  './module'
], function (
  module
) {
    'use strict'
    module.run(['$rootScope','$state', '$transitions', '$navigationService', '$currentDataService', function ($rootScope, $state, $transitions, $navigationService, $currentDataService) {
      $navigationService.goToLastState()
      $transitions.onStart({ to: 'manager' }, async (trans) => {
        try {
          const { api, selectedIndex } = await $currentDataService.checkSelectedApiConnection()
          $currentDataService.setApi(api)
          console.log('adding filter')
          $currentDataService.addFilter(`{"${api.filter[0]}":"${api.filter[1]}"}`)
          $rootScope.$broadcast('stateChanged', () => {})
        } catch (err) {
          console.error('no more connectivity with API, redirecting to settings',err)
          $state.go('settings.api')
        }
      })
      $transitions.onStart({ to: 'overview' }, async (trans) => {
        try {
          const { api, selectedIndex } = await $currentDataService.checkSelectedApiConnection()
          $currentDataService.setApi(api)
          $rootScope.$broadcast('stateChanged', () => {})
        } catch (err) {
          console.error('no more connectivity with API, redirecting to settings',err)
          $state.go('settings.api')
        }
      })
      $transitions.onStart({ to: 'agents' }, async (trans) => {
        try {
          const { api, selectedIndex } = await $currentDataService.checkSelectedApiConnection()
          $currentDataService.setApi(api)
          $rootScope.$broadcast('stateChanged', () => {})
        } catch (err) {
          console.error('no more connectivity with API, redirecting to settings',err)
          $state.go('settings.api')
        }
      })
    }])
  })

