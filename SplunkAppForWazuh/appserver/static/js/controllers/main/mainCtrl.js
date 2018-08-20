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

      $transitions.onStart({}, async (trans) => {
        try {
          $scope.loading = true
          if (!$scope.$$phase) $scope.$digest()
        } catch (err) {
          $notificationService.showSimpleToast('no more connectivity with API, redirecting to settings', err)
          $state.go('settings.api')
        }
      })

      $transitions.onSuccess({}, async (trans) => {
        try {
          $scope.loading = false
          if (!$scope.$$phase) $scope.$digest()
        } catch (err) {
          $notificationService.showSimpleToast('no more connectivity with API, redirecting to settings', err)
          $state.go('settings.api')
        }
      })

      new LayoutView({ "hideFooter": false, "hideSplunkBar": false, "hideAppBar": true, "hideChrome": false })
        .render()
        .getContainerElement()
        .appendChild($('.empty-body-class')[0])
    })
  })

