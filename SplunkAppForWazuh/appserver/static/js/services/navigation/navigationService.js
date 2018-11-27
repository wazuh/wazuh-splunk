define(['../module'], function(module) {
  'use strict'

  class navigationService {
    constructor($state, $window) {
      this.$state = $state
      this.$window = $window
    }

    storeRoute(params) {
      sessionStorage.params = params
    }

    goToLastState() {
      sessionStorage.params
        ? this.$state.go(sessionStorage.params)
        : this.$state.go('settings.api')
    }

    getLastState() {
      if (sessionStorage.params) return sessionStorage.params
    }

    setCurrentAgent(currentAgentId) {
      sessionStorage.currentAgent = currentAgentId
    }

    getCurrentAgent() {
      if (sessionStorage.currentAgent) return sessionStorage.currentAgent
    }

    setCurrentDevTools(current) {
      this.$window.localStorage.setItem('currentDevTools', current)
    }

    getCurrentDevTools() {
      return this.$window.localStorage.getItem('currentDevTools')
    }
  }

  module.service('$navigationService', navigationService)
})
