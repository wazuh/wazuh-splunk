define([
  '../module',
  "../../services/visualizations/chart/linear-chart"
], function (controllers,
  LinearChart
) {
    'use strict'

    controllers.controller('overviewGeneralCtrl', function ($urlTokenModel, $scope, $currentDataService, $state, $notificationService, $requestService, pollingState) {

      const vm = this
      let filters = $currentDataService.getSerializedFilters()

      const element10 = new LinearChart('overviewElement5', `index=wazuh sourcetype=wazuh rule.groups=\"audit\" | timechart limit=10 count by rule.description`, 'overviewElement5')
      $scope.$on('$destroy', () => {
        element10.destroy()
      })
    })
  })

