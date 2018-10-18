define(['../../module'], function (controllers) {
  
  'use strict'
  
  controllers.controller('statusCtrl', function ($scope, $requestService, $notificationService,overviewData, agentInfo) {
    //Initialization
    const vm = this
    vm.load = true
    vm.clusterEnabled = overviewData[5]
    if(overviewData[5]) {
      vm.nodes = overviewData[6].filter(node => node.name)
    }

    vm.changeNode = async (node) => {
      try {
        vm.load = true
        console.log('changing node')
        const daemonResult = await Promise.all([
          $requestService.apiReq(`/cluster/${node}/status`),
          $requestService.apiReq(`/cluster/${node}/info`) 
        ])
        if (daemonResult[0].data.error || daemonResult[1].data.error) {
          throw Error('Cannot load cluster node data.')
        }

        vm.daemons = daemonResult[0].data.data
        vm.managerInfo = daemonResult[1].data.data
        console.log('new info ',vm.managerInfo)
        vm.load = false
        if (!$scope.$$phase) $scope.$digest()
      } catch (error) {
        vm.load = false
        console.error(error)
        $notificationService.showSimpleToast('Cannot load status information.')
      }
    }
    
    const bindStatus = async () => {
      try{
        vm.load = true

        vm.getDaemonStatusClass = daemonStatus => (daemonStatus === 'running') ? 'status teal' : 'status red'
        // Once Wazuh core fixes agent 000 issues, this should be adjusted
        const active = overviewData[0].data.data.Active - 1
        const total = overviewData[0].data.data.Total - 1
        vm.agentsCountActive = active
        vm.agentsCountDisconnected = overviewData[0].data.data.Disconnected
        vm.agentsCountNeverConnected = overviewData[0].data.data['Never connected']
        vm.agentsCountTotal = total
        vm.agentsCoverity = (active / total) * 100

        vm.totalRules = overviewData[3].data.data.totalItems
        vm.totalDecoders = overviewData[4].data.data.totalItems
        vm.agentInfo = agentInfo.data.data
        vm.load = false

        if (!$scope.$$phase) $scope.$digest()
      } catch (err) {
        return Promise.reject(err)
      }
    }
    
    bindStatus()
    vm.daemons = overviewData[1].data.data
    vm.managerInfo = overviewData[2].data.data
  })
})