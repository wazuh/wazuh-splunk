define(['../../module'], function (controllers) {
  
  'use strict'
  
  controllers.controller('statusCtrl', function ($scope, $requestService, $notificationService,statusData, agentInfo) {
    //Initialization
    const vm = this
    vm.load = true
    const [
      summary,
      nodeStatus,
      nodeInfo,
      rules,
      decoders,
      masterNode,
      nodes,
      status
    ] = statusData
    
    vm.clusterEnabled = masterNode || false
    
    if(masterNode && masterNode.name) {
      const masterNodeName = masterNode.name
      vm.nodeId = masterNodeName
      vm.nodes = nodes.data.data.items.filter(node => node.name)
    }
    if (status && status.data.enabled === 'yes' && status.data.running === 'no' ) {
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
        const active = summary.data.data.Active - 1
        const total = summary.data.data.Total - 1
        vm.agentsCountActive = active
        vm.agentsCountDisconnected = summary.data.data.Disconnected
        vm.agentsCountNeverConnected = summary.data.data['Never connected']
        vm.agentsCountTotal = total
        vm.agentsCoverity = (active / total) * 100
        
        vm.totalRules = rules.data.data.totalItems
        vm.totalDecoders = decoders.data.data.totalItems
        vm.agentInfo = agentInfo.data.data
        vm.load = false
        
        if (!$scope.$$phase) $scope.$digest()
      } catch (err) {
        vm.load = false
        $notificationService.showSimpleToast(err.message || err)
      }
    }
    
    bindStatus()
    if(nodeStatus)
    vm.daemons = nodeStatus.data.data
    if(nodeInfo)
    vm.managerInfo = nodeInfo.data.data
  })
})