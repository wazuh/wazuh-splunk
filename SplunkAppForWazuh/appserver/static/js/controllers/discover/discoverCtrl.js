define([
  '../module',
  'jquery',
], function (
  app,
  $
) {
    'use strict'

    class Discover {
      /**
       * Class Discover
       */
      constructor(
        $scope,
        $currentDataService,
        $state,
        $stateParams,
        $document,
        $notificationService
      ) {
        this.currentDataService = $currentDataService
        this.filters = this.currentDataService.getSerializedFilters()
        this.scope = $scope
        this.toast = $notificationService.showSimpleToast
        this.state = $state
        this.stateParams = $stateParams
        this.iframe = $($document[0]).find('#searchAndReporting')
        this.scope.loadingRing = true
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
          this.toast("Cannot load discover.")
        }
      }

      loadIframeContent() {
        try {
          const url = localStorage.getItem('urlDiscover')
          this.iframe.attr("src", url)
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
        this.state.go(this.stateParams.previousState)
      }
    }
    app.controller('discoverCtrl', Discover)
  })
