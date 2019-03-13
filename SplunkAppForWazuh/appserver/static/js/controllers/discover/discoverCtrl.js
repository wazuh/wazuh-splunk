define(['../module', 'jquery'], function(app, $) {
  'use strict'

  class Discover {
    /**
     * Class Discover
     */
    constructor($scope, $state, $stateParams, $document, $currentDataService) {
      this.scope = $scope
      this.state = $state
      this.stateParams = $stateParams
      this.iframe = $($document[0]).find('#searchAndReporting')
      this.scope.loadingRing = true
      this.currentDataService = $currentDataService
    }

    /**
     * On controller loads
     */
    $onInit() {
      try {
        this.scope.fromDashboard = this.stateParams.fromDashboard
        this.scope.breadcrumbs = this.stateParams.breadcrumbs
        this.loadIframeContent()
        this.scope.backToDashboard = () => this.backToDashboard()

        this.scope.$on('loading', (event, data) => {
          if (data.status === true) {
            this.scope.loadingRing = true
            if (!this.scope.$$phase) this.scope.$digest()
          }
        })
      } catch (error) {
        this.toast('Cannot load discover.')
      }
    }

    loadIframeContent() {
      try {
        const url = localStorage.getItem('urlDiscover')
        this.iframe.attr('src', url)
        const interval = setInterval(() => {
          if (this.iframe.contents().find('header')) {
            const header = this.iframe.contents().find('header')
            header.hide()
            if (header.is(':hidden')) {
              clearInterval(interval)
              this.scope.loadingRing = false
              if (!this.scope.$$phase) this.scope.$digest()
            }
          }
        }, 500)
      } catch (error) {
        throw new Error(error)
      }
    }

    backToDashboard() {
      //Get the filters
      const filters = this.fetchWrittenFilters()
      //Add the filters
      filters.map(fil => this.currentDataService.addFilter(fil))
      //Back to the dashboard
      this.state.go(this.stateParams.previousState)
    }

    fetchWrittenFilters() {
      let filtersFormatted = []
      //Delete the last div of the input, this div contains a hidden string that is not needed
      const divX = this.iframe
        .contents()
        .find('.search-field-wrapper pre div:last')
      divX.remove()
      //Get the filters
      let filtersStr = this.iframe
        .contents()
        .find('.search-field-wrapper')
        .text()
      filtersStr = filtersStr
        .split('|', 1)
        .toString()
        .trim()
      const filtersArr = filtersStr.split(' ')
      //Format the filters
      filtersArr.map(fil => {
        const f = fil.split('=')
        filtersFormatted.push(`{"${f[0]}":"${f[1]}"}`)
      })
      return filtersFormatted
    }
  }
  app.controller('discoverCtrl', Discover)
})
