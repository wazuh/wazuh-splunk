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
       */
      constructor($scope, reportingEnabled, awsExtensionEnabled, $reportingService) {
        this.scope = $scope
        this.scope.reportingEnabled = reportingEnabled
        this.scope.awsExtensionEnabled = awsExtensionEnabled
        this.reportingService = $reportingService
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
