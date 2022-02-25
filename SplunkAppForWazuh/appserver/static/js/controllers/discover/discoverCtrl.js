define(['../module', 'jQuery'], function (app, $) {
  'use strict'

  class Discover {
    /**
     * Class Discover
     */
    constructor(
      $scope,
      $state,
      $stateParams,
      $document,
      $currentDataService,
      $notificationService
    ) {
      this.scope = $scope
      this.state = $state
      this.stateParams = $stateParams
      this.iframe = $($document[0]).find('#searchAndReporting')
      this.currentDataService = $currentDataService
      this.notification = $notificationService
    }

    /**
     * On controller loads
     */
    $onInit() {
      try {
        this.scope.fromDashboard = this.stateParams.fromDashboard
        this.scope.breadcrumbs = this.stateParams.breadcrumbs
        this.scope.loadingRing = true
        this.loadIframeContent()
        this.scope.backToDashboard = () => this.backToDashboard()
        this.scope.removeIFrameHeader = () => this.removeIFrameHeader()
      } catch (error) {
        this.notification.showErrorToast('Cannot load discover.')
      }
    }

    loadIframeContent() {
      const url = localStorage.getItem('urlDiscover')
      this.iframe.attr('src', url)
    }

    removeIFrameHeader() {
      try {
        const interval = setInterval(() => {
          if (this.iframe.contents().find('header')) {
            const header = this.iframe.contents().find('header')
            header.hide()
            if (header.is(':hidden')) {
              clearInterval(interval)
              this.scope.loadingRing = false
              this.scope.$applyAsync()
            }
          }
        }, 500)
      } catch (error) {
        throw new Error(error)
      }
    }

    backToDashboard() {
      try {
        //Get the filters
        const filters = this.fetchWrittenFilters()
        //Add the filters
        filters.map((fil) => {
          this.currentDataService.addFilter(fil)
        })
        //Back to the dashboard
        this.state.go(this.stateParams.previousState)
      } catch (error) {
        this.notification.showErrorToast(error)
      }
    }

    fetchWrittenFilters() {
      try {
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
        filtersStr = filtersStr.split('|', 1).toString().trim()
        const parsedFilter = filtersStr.replace(/=\s+/, '=')
        const filtersArr = parsedFilter.split(' ')
        //Format the filters
        filtersArr.map((fil) => {
          const f = fil.split('=')
          const key = this.cleanQuotes(f[0])
          const value = this.cleanQuotes(f[1])
          filtersFormatted.push(`{"${key}":"${value}"}`)
        })
        return filtersFormatted
      } catch (error) {
        return []
      }
    }

    cleanQuotes(str) {
      try {
        const firstChar = str.substring(0, 1)
        const lastChar = str.substring(str.length - 1)
        if (
          firstChar === '"' ||
          (firstChar === "'" && lastChar === '"') ||
          lastChar === "'"
        ) {
          const cleanStr = str.substring(1, str.length - 1)
          return cleanStr
        } else {
          return str
        }
      } catch (error) {
        return str
      }
    }
  }
  app.controller('discoverCtrl', Discover)
})
