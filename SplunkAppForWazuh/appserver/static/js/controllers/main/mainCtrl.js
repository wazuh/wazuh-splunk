define([
  '../module',
  'splunkjs/mvc/layoutview',
  "splunkjs/mvc/simplexml",
], function (
  module,
  LayoutView,
  DashboardController,
  ) {
    'use strict'
    module.controller('mainCtrl', function ($scope, $urlTokenModel) {
      
      $scope.$on('loading', (event, data) => {
        if (data.status) $scope.loading = true
        else $scope.loading = false
        if (!$scope.$$phase) $scope.$digest()
      })
      
      DashboardController.onReady( () => {
        if (!$urlTokenModel.has('earliest') && !$urlTokenModel.has('latest')) {
          $urlTokenModel.set({ earliest: '0', latest: '' })
        }
      })
      
      // Initialize time tokens to default
      if (!$urlTokenModel.has('earliest') && !$urlTokenModel.has('latest')) {
        $urlTokenModel.set({ earliest: '0', latest: '' })
      }
      
      DashboardController.ready()
      
      new LayoutView({ "hideFooter": false, "hideSplunkBar": false, "hideAppBar": true, "hideChrome": false })
      .render()
      .getContainerElement()
      .appendChild($('.empty-body-class')[0])
      
      /**
      * On controller destroy
      */
      $scope.$on('$destroy', () => {
        input1.destroy()
      })
    })
  })
  
  