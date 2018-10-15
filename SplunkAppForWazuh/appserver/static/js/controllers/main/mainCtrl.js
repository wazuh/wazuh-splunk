define([
  '../module',
  'splunkjs/mvc',
  'splunkjs/mvc/layoutview',
  "splunkjs/mvc/simplexml",
  "splunkjs/mvc/simplexml/dashboardview",
  "splunkjs/mvc/simpleform/input/timerange",
], function (
  module,
  mvc,
  LayoutView,
  DashboardController,
  Dashboard,
  TimeRangeInput
) {
    'use strict'
    module.controller('mainCtrl', function ($scope, $transitions, $urlTokenModel, $requestService) {

      $scope.baseUrl = $requestService.getBaseUrl()
      $scope.$on('loading', (event, data) => {
        if (data.status)
          $scope.loading = true
        else
          $scope.loading = false
        if (!$scope.$$phase) $scope.$digest()
      })

      console.log('input 1')
      let input1 = new TimeRangeInput({
        "id": "input1",
        "searchWhenChanged": true,
        "default": { "latest_time": "now", "earliest_time": "-24h@h" },
        "earliest_time": "$form.when.earliest$",
        "latest_time": "$form.when.latest$",
        "el": $('#input1')
      }, { tokens: true }).render()

      input1.on("change", (newValue) => {
        if (newValue && input1)
          $urlTokenModel.handleValueChange(input1)
      })

      DashboardController.onReady(function () {
        if (!$urlTokenModel.has('earliest') && !$urlTokenModel.has('latest')) {
          $urlTokenModel.set({ earliest: '0', latest: '' })
        }
      })
      
      // Initialize time tokens to default
      if (!$urlTokenModel.has('earliest') && !$urlTokenModel.has('latest')) {
        $urlTokenModel.set({ earliest: '0', latest: '' })
      }
            //
      // DASHBOARD READY
      //
      
      DashboardController.ready()


      new LayoutView({ "hideFooter": false, "hideSplunkBar": false, "hideAppBar": true, "hideChrome": false })
        .render()
        .getContainerElement()
        .appendChild($('.empty-body-class')[0])
    })
  })

