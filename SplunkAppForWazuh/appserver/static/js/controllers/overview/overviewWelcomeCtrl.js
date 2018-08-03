define(['../module'], function (controllers) {
  'use strict'
  controllers.controller('overviewWelcomeCtrl', function ($scope, agentsInfo) {
    const vm = this
    vm.agentsCountTotal = agentsInfo.data.data.Total
    vm.agentsCountActive = agentsInfo.data.data.Active
    vm.agentsCountDisconnected = agentsInfo.data.data.Disconnected
    vm.agentsCountNeverConnected = agentsInfo.data.data['Never Connected']
  })
})
