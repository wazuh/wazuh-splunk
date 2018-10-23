define(['../../module'], function (controllers) {
  'use strict'
  controllers.controller('overviewWelcomeCtrl', function ($scope, agentsInfo, $notificationService) {
    try{
      console.log('agentsinfo ',agentsInfo)
      $scope.agentsCountTotal = agentsInfo.data.data.Total - 1
      $scope.agentsCountActive = agentsInfo.data.data.Active - 1
      $scope.agentsCountDisconnected = agentsInfo.data.data.Disconnected
      $scope.agentsCountNeverConnected = agentsInfo.data.data['Never Connected']
    } catch(err) {
      $notificationService.showSimpleToast('Cannot load overview info.')
    }
  })
})
