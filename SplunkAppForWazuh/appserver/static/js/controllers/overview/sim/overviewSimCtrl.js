define([
  '../../module',

], function (
  app,

  ) {
    'use strict'

    class OverviewSim {
      /**
       * Class Security Information Management
       * @param {*} $scope
       * @param {*} reportingEnabled
       * @param {*} awsExtensionEnabled
       * @param {*} $reportingService
       * @param {*} $notificationService
       */
      constructor($scope, reportingEnabled, awsExtensionEnabled, $reportingService, $notificationService) {
        this.scope = $scope
        this.scope.reportingEnabled = reportingEnabled
        this.scope.awsExtensionEnabled = awsExtensionEnabled
        this.reportingService = $reportingService
        this.notification = $notificationService
      }

      /**
       * On controller loads
       */
      $onInit() {
        try {
        } catch (error) {
          console.error('onInit error: ', error)
        }
      }
    }

    app.controller('overviewSimCtrl', OverviewSim)
  })
