define([
  '../module',
  'splunkjs/mvc',
  'splunkjs/mvc/layoutview'
], function (
  module,
  mvc,
  LayoutView
) {
    'use strict'
    module.controller('mainCtrl', function ($scope, $transitions) {

      $scope.$on('loading', (event,data) => {
        if (data.status)
          $scope.loading = true
        else
          $scope.loading = false
        if (!$scope.$$phase) $scope.$digest()
      })

      // $transitions.onSuccess({}, async (trans) => {
      //   $scope.loading = false
      //   if (!$scope.$$phase) $scope.$digest()
      // })

      new LayoutView({ "hideFooter": false, "hideSplunkBar": false, "hideAppBar": true, "hideChrome": false })
        .render()
        .getContainerElement()
        .appendChild($('.empty-body-class')[0])
    })
  })

