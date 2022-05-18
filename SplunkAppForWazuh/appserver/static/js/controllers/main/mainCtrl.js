define([
  '../module',
  'splunkjs/mvc/layoutview',
  'splunkjs/mvc/simplexml',
  '../../services/visualizations/inputs/time-picker',
], function (app, LayoutView, DashboardController, TimePicker) {
  'use strict'

  class MainCtrl {
    /**
     * Main controller class
     * @param {*} $scope
     * @param {*} $urlTokenModel
     */
    constructor($scope, $urlTokenModel, $notificationService) {
      this.timePicker = new TimePicker(
        '#timePicker',
        $urlTokenModel.handleValueChange
      )
      this.scope = $scope
      this.dashboardController = DashboardController
      this.notificationService = $notificationService
      this.urlTokenModel = $urlTokenModel
      this.layoutView = new LayoutView({
        hideFooter: false,
        hideSplunkBar: false,
        hideAppBar: true,
        hideChrome: false,
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

      // Show a warning toast if the App's revisions numbers on the 
      // frontend and the backend do not match.
      // @reads_event APP_REVISION_MISMATCH
      this.scope.$on('APP_REVISION_MISMATCH', (_event, _data) => {
        this.notificationService.showWarningToast(
          'Warning: Versions Conflict</br>' +
          'The version of the Wazuh App in your browser does not match the \
           App\'s version installed in Splunk. Please, clear your browser\'s cache.'
        )
      })

      // Show a warning toast if the App's versions and the 
      // Wazuh API version do not match.
      // @reads_event WAZUH_VERSION_MISMATCH
      this.scope.$on('WAZUH_VERSION_MISMATCH', (_event, data) => {
        this.notificationService.showWarningToast(
          'Warning: Versions Conflict</br>' +
          'The version of the Wazuh App does not match the Wazuh API version.</br>' +
          `App version: ${data.appVersion}, Wazuh version: ${data.APIversion}`
        )
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
