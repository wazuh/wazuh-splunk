define([
  '../module',
  'splunkjs/mvc/layoutview',
  'splunkjs/mvc/simplexml',
  '../../services/visualizations/inputs/time-picker'
], function(app, LayoutView, DashboardController, TimePicker) {
  'use strict'

  class MainCtrl {
    /**
     * Main controller class
     * @param {*} $scope
     * @param {*} $urlTokenModel
     */
    constructor($scope, $urlTokenModel) {
      this.timePicker = new TimePicker(
        '#timePicker',
        $urlTokenModel.handleValueChange
      )
      this.scope = $scope
      this.dashboardController = DashboardController
      this.urlTokenModel = $urlTokenModel
      this.layoutView = new LayoutView({
        hideFooter: false,
        hideSplunkBar: false,
        hideAppBar: true,
        hideChrome: false
      })
        .render()
        .getContainerElement()
        .appendChild($('.empty-body-class')[0]) // eslint-disable-line

      this.dashboardController.ready()
    }

    /**
     * On controller loads
     */
    $onInit() {
      this.scope.$on('loadingMain', (event, data) => {
        data.status
          ? (this.scope.loadingMain = true)
          : (this.scope.loadingMain = false)
        event.preventDefault()
        this.scope.$applyAsync()
      })

      this.dashboardController.onReady(() => {
        if (
          !this.urlTokenModel.has('earliest') &&
          !this.urlTokenModel.has('latest')
        ) {
          this.urlTokenModel.set({ earliest: '0', latest: '' })
        }
      })

      // Initialize time tokens to default
      if (
        !this.urlTokenModel.has('earliest') &&
        !this.urlTokenModel.has('latest')
      ) {
        this.urlTokenModel.set({ earliest: '0', latest: '' })
      }

      /**
       * On controller destroy
       */
      this.scope.$on('$destroy', () => {
        this.timePicker.destroy()
      })
    }
  }
  app.controller('mainCtrl', MainCtrl)
})
