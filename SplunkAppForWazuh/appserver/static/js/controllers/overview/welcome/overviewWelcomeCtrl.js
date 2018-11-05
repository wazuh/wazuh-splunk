define(['../../module'], function (controllers) {
  'use strict'
  
  class OverviewWelcome{
    constructor($scope, agentsInfo){
      this.scope = $scope
      this.scope.agentsCountTotal = agentsInfo.data.data.Total - 1
      this.scope.agentsCountActive = agentsInfo.data.data.Active - 1
      this.scope.agentsCountDisconnected = agentsInfo.data.data.Disconnected
      this.scope.agentsCountNeverConnected = agentsInfo.data.data['Never Connected']
    }
  }
  controllers.controller('overviewWelcomeCtrl', OverviewWelcome)
})
