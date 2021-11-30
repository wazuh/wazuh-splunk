define(['../module'], function(module) {
  'use strict'

  class navigationService {
    constructor($state, $window, $location, $apiMgrService, $rootScope) {
      this.$state = $state;
      this.$window = $window;
      this.$location = $location;
      this.$apiMgrService = $apiMgrService;
      this.$rootScope = $rootScope;

      this.$window.onpopstate = () => {
        try {
          let lastState = sessionStorage.history.split(',')

          let newHistory = lastState[0]
          if (lastState.length > 1) {
            // if there are previous states
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
          this.goToLastState();
        }
      }
    }

    storeRoute(params) {
      sessionStorage.params = params
      this.addToHistory(params)

      this.$location.search('currentTab', params) //set currentTab to the new state
    }

    addToHistory(url) {
      try {
        if (!sessionStorage.history) {
          sessionStorage.history = url
        } else {
          const history = sessionStorage.history.split(',')
          history.push(url)
          let newHistory = history[0]
          const len = history.length
          if (history.length < 20) {
            for (let i = 1; i < len; i++) {
              if (history[i - 1] !== history[i]) newHistory += ',' + history[i]
            }
          } else {
            for (let i = 11; i < len; i++) {
              if (history[i - 11] !== history[i]) newHistory += ',' + history[i]
            }
          }
          sessionStorage.history = newHistory
        }
      } catch (error) {
        this.goToLastState()
      }
    }

    goToLastState() {
      const lastState = this.getLastState();
      lastState  
        ? this.$state.go(lastState)
        : this.goToDefaultPage()
    }

    async goToDefaultPage() {
      let currentApi; 
      try {
        currentApi = await this.$apiMgrService.resolveCurrentApi();        
        this.$rootScope.$broadcast("updatedAPI", () => {});
      } catch (error) {
        console.warn('Wazuh API is not configured or it is down.');
      }

      if(currentApi)
        this.$state.go('overview');
      else
        this.$state.go('settings.api');
    }

    /**
     * Returns the current url with updated parameter
     * @param {*} url
     * @param {*} param - paramater to be updated
     * @param {*} paramVal - new value of param
     */
    updateURLParameter(url, param, paramVal) {
      try {
        var newAdditionalURL = ''
        var tempArray = url.split('?')
        var baseURL = tempArray[0]
        var additionalURL = tempArray[1]
        var temp = ''
        if (additionalURL) {
          tempArray = additionalURL.split('&')
          for (var i = 0; i < tempArray.length; i++) {
            if (tempArray[i].split('=')[0] != param) {
              newAdditionalURL += temp + tempArray[i]
              temp = '&'
            }
          }
        }
        var rows_txt = temp + '' + param + '=' + paramVal
        return baseURL + '?' + newAdditionalURL + rows_txt
      } catch (error) {
        return url
      }
    }
    /* *
     * Redirects the user to the tab specified in the url (index?currentTab=)
     * if no tab is specified it redirects to the last state visited
     * */
    manageState() {
      try {
        const url_params = this.$location.search()
        if (url_params.currentTab) {
          this.$state.go(url_params.currentTab)
        } else {
          this.goToLastState()
        }
      } catch (error) {
        this.goToLastState();
      }
    }

    getLastState() {
      return sessionStorage.params || undefined
    }

    setCurrentAgent(currentAgentId) {
      sessionStorage.currentAgent = currentAgentId
    }

    getCurrentAgent() {
      return sessionStorage.currentAgent || undefined
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
