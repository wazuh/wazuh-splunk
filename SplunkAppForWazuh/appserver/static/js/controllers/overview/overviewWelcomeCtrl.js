define(['../module'], function (controllers) {
  'use strict'
  controllers.controller('overviewWelcomeCtrl', function ($scope, agentsInfo) {
    const vm = this
    vm.agentsCountTotal = agentsInfo.data.data.Total - 1
    vm.agentsCountActive = agentsInfo.data.data.Active - 1
    vm.agentsCountDisconnected = agentsInfo.data.data.Disconnected
    vm.agentsCountNeverConnected = agentsInfo.data.data['Never Connected']
  })
})
