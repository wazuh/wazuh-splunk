define([
  './module'
], function (
  module
) {
    'use strict'
    module.run(['$rootScope','$state', '$transitions', '$navigationService', '$credentialService', '$currentApiIndexService', function ($rootScope, $state, $transitions, $navigationService, $credentialService, $currentApiIndexService) {
      $navigationService.goToLastState()
      $transitions.onStart({ to: 'manager' }, async (trans) => {
        try {
          const { api, selectedIndex } = await $credentialService.checkSelectedApiConnection()
          $currentApiIndexService.setAPI(api)
          $rootScope.$broadcast('stateChanged', () => {})
        } catch (err) {
          console.error('no more connectivity with API, redirecting to settings',err)
          $state.go('settings.api')
        }
      })
      $transitions.onStart({ to: 'overview' }, async (trans) => {
        try {
          const { api, selectedIndex } = await $credentialService.checkSelectedApiConnection()
          $currentApiIndexService.setAPI(api)
          $rootScope.$broadcast('stateChanged', () => {})
        } catch (err) {
          console.error('no more connectivity with API, redirecting to settings',err)
          $state.go('settings.api')
        }
      })
      $transitions.onStart({ to: 'agents' }, async (trans) => {
        try {
          const { api, selectedIndex } = await $credentialService.checkSelectedApiConnection()
          $currentApiIndexService.setAPI(api)
          $rootScope.$broadcast('stateChanged', () => {})
        } catch (err) {
          console.error('no more connectivity with API, redirecting to settings',err)
          $state.go('settings.api')
        }
      })
    }])
  })

