define(['../module'], function (module) {
  'use strict'

  class navigationService {
    constructor($state, $window, $location) {
      this.$state = $state
      this.$window = $window
      this.$location = $location
      
      this.$window.onpopstate = function (event) {
        try {
          var lastState = sessionStorage.history.split(',')

          var newHistory = lastState[0]
          if (lastState.length > 1) { // if there are previous states
            for (var i = 1; i < lastState.length - 2; i++) {
              newHistory += ',' + lastState[i]
            }
            sessionStorage.history = newHistory
            lastState = lastState[lastState.length - 2]
            $state.go(
              lastState,
              {}, //routeParams
              { reload: true, notify: false }
            )
          }

        } catch (error) {
          sessionStorage.params
            ? $state.go(sessionStorage.params)
            : $state.go('settings.api')
        }
      }
    }

    storeRoute(params) {
      sessionStorage.params = params
      this.addToHistory(params)

      this.$location.search('currentTab', params) //set currentTab to the new state
    }

    addToHistory(url) {
      try{
        if (!sessionStorage.history) {
          sessionStorage.history = url
        } else {
          var history = sessionStorage.history.split(',')
          history.push(url)
          var newHistory = history[0]
          if (history.length < 20) {
            for (var i = 1; i < history.length; i++) {
              if (history[i - 1] !== history[i])
                newHistory += ',' + history[i]
            }
          } else {
            for (var i = 11; i < history.length; i++) {
              if (history[i - 11] !== history[i])
                newHistory += ',' + history[i]
            }
          }
          sessionStorage.history = newHistory
  
        }
      }catch(error){
        this.goToLastState()
      }
    }

    goToLastState() {
      sessionStorage.params
      ? this.$state.go(sessionStorage.params)
      : this.$state.go('settings.api') // redirects to settings.api if no previous states were visited
    }

    /* *
    * Redirects the user to the tab specified in the url (index?currentTab=)
    * if no tab is specified it redirects to the last state visited 
    * */
    manageState(){
      try{
        var url_params = this.$location.search()
        if(url_params.currentTab){
          this.$state.go(url_params.currentTab)
        } else{
          this.goToLastState()
        }
      }catch(error){
        this.$state.go('settings.api')
      }
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
