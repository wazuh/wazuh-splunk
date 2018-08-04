define(['../../module'], function (controllers) {

  'use strict'

  controllers.controller('statusCtrl', function ($scope, $apiService, overviewData, agentInfo) {
    //Initialization
    const vm = this
    vm.load = true
    console.log('agent info in controller ',agentInfo)
    console.log('overview info in controller ',overviewData)
    //Functions
    vm.getDaemonStatusClass = daemonStatus => (daemonStatus === 'running') ? 'status teal' : 'status red'
    // Once Wazuh core fixes agent 000 issues, this should be adjusted
    const active = overviewData[0].data.data.Active - 1
    const total = overviewData[0].data.data.Total - 1
    vm.agentsCountActive = active
    vm.agentsCountDisconnected = overviewData[0].data.data.Disconnected
    vm.agentsCountNeverConnected = overviewData[0].data.data['Never connected']
    vm.agentsCountTotal = total
    vm.agentsCoverity = (active / total) * 100
    vm.daemons = overviewData[1].data.data
    vm.managerInfo = overviewData[2].data.data
    vm.totalRules = overviewData[3].data.data.totalItems
    vm.totalDecoders = overviewData[4].data.data.totalItems
    vm.agentInfo = agentInfo.data.data
    vm.load = false
    if (!$scope.$$phase) $scope.$digest()
    $scope.$on("$destroy", () => {
    })
  })
})