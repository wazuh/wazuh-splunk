define(['../../module'], function (controllers) {
  
  'use strict'
  
  controllers.controller('statusCtrl', function ($scope, $requestService, $notificationService,overviewData, agentInfo) {
    //Initialization
    const vm = this
    vm.load = true
    vm.clusterEnabled = overviewData[5] || false
    if(overviewData[5] && overviewData[5].name) {
      const masterNode = overviewData[5].name
      vm.nodeId = masterNode
      vm.nodes = overviewData[6].data.data.items.filter(node => node.name)
    }
    if (overviewData[7] && overviewData[7].data.enabled === 'yes' && overviewData[7].data.running === 'no' ) {
      vm.clusterError = 'This cluster is enabled but not running. Please check your cluster health.'
      vm.load = false
      if (!$scope.$$phase) $scope.$digest()
    }
    
    /**
     * Change of cluster node, reloads information
     * @param {String} : node name
     */
    vm.changeNode = async (node) => {
      try {
        vm.clusterError = false
        vm.load = true
        vm.nodeId = node
        const daemonResult = await Promise.all([
          $requestService.apiReq(`/cluster/${node}/status`),
          $requestService.apiReq(`/cluster/${node}/info`) 
        ])
        if (daemonResult[0] && daemonResult[0].data.error || daemonResult[1] && daemonResult[1].data.error) {
          throw Error(`Node ${node} is down.`)
        }
        if (daemonResult[0] && daemonResult[0].data.data.enabled === 'yes' && daemonResult[0].data.data.running === 'no' ) {
          throw Error('This cluster is enabled but not running. Please check your cluster health.')
        }
        vm.daemons = daemonResult[0].data.data
        vm.managerInfo = daemonResult[1].data.data
        vm.load = false
        if (!$scope.$$phase) $scope.$digest()
      } catch (err) {
        vm.load = false
        vm.clusterError = err.message || err
        if (!$scope.$$phase) $scope.$digest()
      }
    }
    
    /**
     * Gets the daemon and status information of the manager or cluster node
     */
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
        vm.load = false
        $notificationService.showSimpleToast(err.message || err)
      }
    }
    
    bindStatus()
    if(overviewData[1])
      vm.daemons = overviewData[1].data.data
    if(overviewData[2])
      vm.managerInfo = overviewData[2].data.data
  })
})