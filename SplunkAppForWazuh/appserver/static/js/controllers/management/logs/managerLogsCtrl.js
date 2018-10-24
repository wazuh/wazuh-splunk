define(['../../module'], function (controllers) {
  
  'use strict'
  
  controllers.controller('managerLogsCtrl', function ($scope,$requestService, $notificationService) {
    const vm = this
    vm.type_log = 'all'
    vm.category = 'all'
    vm.nodeList = false
    
    vm.search = term => {
      $scope.$broadcast('wazuhSearch', { term })
    }
    
    vm.filter = async filter => {
      $scope.$broadcast('wazuhFilter', { filter })
    }
    
    vm.playRealtime = () => {
      vm.realtime = true
      $scope.$broadcast('wazuhPlayRealTime')
    }
    
    vm.stopRealtime = () => {
      vm.realtime = false
      $scope.$broadcast('wazuhStopRealTime')
    }
    
    vm.changeNode = async (node) => {
      try {
        vm.type_log = 'all'
        vm.category = 'all'
        vm.selectedNode = node
        vm.custom_search = null
        $scope.$broadcast('wazuhUpdateInstancePath', { path: `/cluster/${node}/logs` })
        const summary = await $requestService.apiReq(`/cluster/${node}/logs/summary`,{})
        const daemons = summary.data.data
        vm.daemons = Object.keys(daemons).map(item => ({ title: item }))
        if (!$scope.$$phase) $scope.$digest()
      } catch(error) {
        $notificationService.showSimpleToast('Error fetching logs')
      }
    }
    
    const initialize = async () => {
      try {
        // logs summary
        
        const clusterStatus = await $requestService.apiReq('/cluster/status')
        const clusterEnabled = clusterStatus && clusterStatus.data && clusterStatus.data.data && clusterStatus.data.data.running === 'yes' && clusterStatus.data.data.enabled === 'yes'
        
        if(clusterEnabled) {
          const nodeList = await $requestService.apiReq('/cluster/nodes')
          if(nodeList && nodeList.data && nodeList.data.data && Array.isArray(nodeList.data.data.items)){
            vm.nodeList = nodeList.data.data.items.map(item => item.name).reverse()
            vm.selectedNode = nodeList.data.data.items.filter(item => item.type === 'master')[0].name
          }
        } 
        
        vm.logsPath = clusterEnabled ? `/cluster/${vm.selectedNode}/logs` : '/manager/logs'
        
        const data = clusterEnabled ?
        await $requestService.apiReq(`/cluster/${vm.selectedNode}/logs/summary`):
        await $requestService.apiReq('/manager/logs/summary')
        const daemons = data.data.data
        vm.daemons = Object.keys(daemons).map(item => ({ title: item }))
        if (!$scope.$$phase) $scope.$digest()
        return          
      } catch (err) {
        $notificationService.showSimpleToast('Error fetching data')
      }
      return
    }
    
    initialize()
    
  })
})
