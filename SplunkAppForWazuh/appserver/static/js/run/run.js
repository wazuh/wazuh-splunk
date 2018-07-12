define([
  './module'
], function (
  module
) {
    'use strict';
    module.run(['$state','$transitions', '$navigationService', '$credentialService', '$currentApiIndexService', function ($state,$transitions, $navigationService, $credentialService, $currentApiIndexService) {
      $navigationService.goToLastState()
      $transitions.onStart({}, async (trans) => {
        try {
          await $credentialService.checkRawConnection(JSON.parse($currentApiIndexService.getAPI()))
          console.log('API still connecting')
        } catch (err) {
          console.error('no more connectivity with API, redirecting to settings')
          $state.go('settings.api')
        }
      })
    }])
  })

