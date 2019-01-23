define(['../../module'], function(controllers) {
  'use strict'

  class Status {
    /**
     * Class Status
     * @param {*} $scope
     * @param {Array} nodes
     */
    constructor(
      $scope,
      nodes,
    ) {
      this.scope = $scope
      this.nodes = nodes
    }
    /**
     * On controller loads
     */
    $onInit() {
      if (this.masterNode && this.masterNode.name) {
        const masterNodeName = this.masterNode.name
        this.scope.nodeId = masterNodeName
        this.scope.nodes = this.nodes.items.filter(node => node.name)
      }
      if (
        this.status &&
        this.status.enabled === 'yes' &&
        this.status.running === 'no'
      ) {
        this.scope.clusterError =
          'This cluster is enabled but not running. Please check your cluster health.'
        this.scope.load = false
        if (!this.scope.$$phase) this.scope.$digest()
      }
      this.scope.changeNode = node => this.changeNode(node)
      this.bindStatus()
      if (this.nodeStatus) {
        this.scope.daemons = this.nodeStatus
      }
      if (this.nodeInfo) {
        this.scope.managerInfo = this.nodeInfo
      }
    }

    /**
     * Change of cluster node, reloads information
     * @param {String} : node name
     */
    async changeNode(node) {
      try {
        this.scope.clusterError = false
        this.scope.load = true
        this.scope.nodeId = node
        const daemonResult = await Promise.all([
          this.apiReq(`/cluster/${node}/status`),
          this.apiReq(`/cluster/${node}/info`)
        ])
        if (
          (daemonResult[0] && daemonResult[0].data.error) ||
          (daemonResult[1] && daemonResult[1].data.error)
        ) {
          throw Error(`Node ${node} is down.`)
        }
        if (
          daemonResult[0] &&
          daemonResult[0].data.data.enabled === 'yes' &&
          daemonResult[0].data.data.running === 'no'
        ) {
          throw Error(
            'This cluster is enabled but not running. Please check your cluster health.'
          )
        }
        this.scope.daemons = daemonResult[0].data.data
        this.scope.managerInfo = daemonResult[1].data.data
        this.scope.load = false
        if (!this.scope.$$phase) this.scope.$digest()
      } catch (err) {
        this.scope.load = false
        this.scope.clusterError = err.message || err
        if (!this.scope.$$phase) this.scope.$digest()
      }
    }

  
  }

  controllers.controller('statusCtrl', Status)
})
