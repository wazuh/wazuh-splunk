define(['../../module'], function (controllers) {

    'use strict'
  
    controllers.controller('monitoringCtrl', function ($scope, monitoringInfo) {
      const vm = this
      console.log('monitoring info ',monitoringInfo)
      const nodesCount = data[0].data.data.totalItems
      vm.nodesCount = nodesCount

      const configuration = data[1]
      vm.configuration = configuration.data.data

      const version = data[2]
      vm.version = version.data.data

      const agents = data[3]
      vm.agentsCount = agents.data.data.totalItems - 1

      const health = data[4]
      vm.healthCheck = health.data.data

      const nodes = data[0].data.data

      nodes.name = vm.configuration.name
      nodes.master_node = vm.configuration.node_name
  
    })
  })
  