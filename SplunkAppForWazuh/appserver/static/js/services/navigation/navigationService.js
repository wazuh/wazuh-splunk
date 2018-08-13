define(['../module'], function (module) {
  'use strict'

  module.service('$navigationService', function ($state) {
    return {
      hello: () => {
      },
      storeRoute: (params) => {
        sessionStorage.params = params
      },
      goToLastState: () => {
        if (sessionStorage.params)
          $state.go(sessionStorage.params)
        else
          $state.go('settings.api')
      },
      getLastState: () => {
        if (sessionStorage.params)
          return sessionStorage.params
      },
      setCurrentAgent: (currentAgentId) => {
        sessionStorage.currentAgent = currentAgentId
      },
      getCurrentAgent: () => {
        console.log('get current agent in nav')
        if (sessionStorage.currentAgent)
          return sessionStorage.currentAgent
      }
    }
  })
})