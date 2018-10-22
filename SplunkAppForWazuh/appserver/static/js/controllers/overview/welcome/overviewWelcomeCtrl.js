define(['../../module'], function (app) {
  'use strict'
  app.controller('overviewWelcomeCtrl', (agentsInfo, $notificationService) => {
    const vm = this
    try{
      vm.agentsCountTotal = agentsInfo.data.data.Total - 1
      vm.agentsCountActive = agentsInfo.data.data.Active - 1
      vm.agentsCountDisconnected = agentsInfo.data.data.Disconnected
      vm.agentsCountNeverConnected = agentsInfo.data.data['Never Connected']
    } catch(err) {
      $notificationService.showSimpleToast('Cannot load overview info.')
    }
  })
})
