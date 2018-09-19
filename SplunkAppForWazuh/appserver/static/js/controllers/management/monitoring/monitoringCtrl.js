define(['../../module'], function (controllers) {
  
  'use strict'
  
  controllers.controller('monitoringCtrl', function (monitoringInfo) {
    const vm = this
    console.log('monitoring info ',monitoringInfo)
    vm.isClusterEnabled = true
    vm.isClusterRunning = true
    vm.status = 'yes'
    const running = monitoringInfo[0].data.data.running
    const enabled = monitoringInfo[0].data.data.enabled
    if (enabled === 'no') {
      vm.isClusterEnabled = false
      
    }else if (running === 'no') {
      vm.isClusterRunning = false
      vm.status = 'no'
    }
    
    const setBooleans = component => {
      vm.showConfig = component === 'showConfig'
      vm.showNodes = component === 'showNodes'
      vm.currentNode = null
    }
    
    vm.goConfiguration = () => {
      setBooleans('showConfig')
    }
    
    vm.goNodes = () => {
      setBooleans('showNodes')
    }
    
    const nodesCount = monitoringInfo[1].data.data.totalItems
    vm.nodesCount = nodesCount
    
    const configuration = monitoringInfo[2]
    vm.configuration = configuration.data.data
    
    const version = monitoringInfo[3]
    vm.version = version.data.data
    
    const agents = monitoringInfo[4]
    vm.agentsCount = agents.data.data.totalItems - 1
    
    const health = monitoringInfo[5]
    vm.healthCheck = health.data.data
    
    const nodes = monitoringInfo[1].data.data
    
    nodes.name = vm.configuration.name
    nodes.master_node = vm.configuration.node_name
    
  })
})