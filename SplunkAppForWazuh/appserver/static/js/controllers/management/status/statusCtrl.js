define(['../../module'], function (controllers) {
  'use strict'

  class Status {
    /**
     * Class Status
     * @param {*} $scope
     * @param {*} $requestService
     * @param {*} $notificationService
     * @param {Array} statusData
     * @param {Object} agentInfo
     * @param {Boolean} isAdmin
     * @param {*} $restartService
     */
    constructor(
      $scope,
      $requestService,
      $notificationService,
      statusData,
      agentInfo,
      isAdmin,
      $restartService
    ) {
      this.scope = $scope
      this.scope.load = true
      this.apiReq = $requestService.apiReq
      this.notification = $notificationService
      const parsedStatusData = statusData.map(item =>
        item && item.data && item.data.data ? item.data.data : item
      )
      const [
        summary,
        nodeStatus,
        nodeInfo,
        rules,
        decoders,
        masterNode,
        nodes,
        status
      ] = parsedStatusData
      this.masterNode = masterNode
      this.nodes = nodes
      this.status = status
      this.summary = summary
      this.nodeStatus = nodeStatus
      this.nodeInfo = nodeInfo
      this.rules = rules
      this.decoders = decoders
      this.scope.clusterEnabled = masterNode || false
      this.agentInfo = agentInfo.data.data
      this.isAdmin = isAdmin
      this.restartService = $restartService
    }

    /**
     * On controller loads
     */
    $onInit() {
      this.scope.confirmingRestart = false
      this.scope.isAdmin = this.isAdmin
      this.scope.switchRestart = () => this.switchRestart()
      this.scope.restartInProgress = false
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
      this.scope.restart = () => this.restart()
      this.bindStatus()


      if (this.nodeStatus) {
        this.scope.daemons = this.objToArr(this.nodeStatus)
      }
      if (this.nodeInfo) {
        this.scope.managerInfo = this.nodeInfo
      }
    }

    /**
     * Transforms objects to arrays
     * @param {Object} : obj
     */
    objToArr(obj) {
      const arr = []
      for (const key in obj) arr.push({ key, value: obj[key] })
      return arr
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
        this.scope.daemons = this.objToArr(daemonResult[0].data.data)
        this.scope.managerInfo = daemonResult[1].data.data
        this.scope.load = false
        if (!this.scope.$$phase) this.scope.$digest()
      } catch (err) {
        this.scope.load = false
        this.scope.clusterError = err.message || err
        if (!this.scope.$$phase) this.scope.$digest()
      }
    }

    /**
     * Gets the daemon and status information of the manager or cluster node
     */
    async bindStatus() {
      try {
        this.scope.load = true

        this.scope.getDaemonStatusClass = daemonStatus =>
          daemonStatus === 'running' ? 'status teal' : 'status red'
        // Once Wazuh core fixes agent 000 issues, this should be adjusted
        const active = this.summary.Active - 1
        const total = this.summary.Total - 1
        this.scope.agentsCountActive = active
        this.scope.agentsCountDisconnected = this.summary.Disconnected
        this.scope.agentsCountNeverConnected = this.summary['Never connected']
        this.scope.agentsCountTotal = total
        this.scope.agentsCoverity = (active / total) * 100

        this.scope.totalRules = this.rules.totalItems
        this.scope.totalDecoders = this.decoders.totalItems
        this.scope.agentInfo = this.agentInfo
        this.scope.load = false

        if (!this.scope.$$phase) this.scope.$digest()
      } catch (err) {
        this.scope.load = false
        this.notification.showErrorToast(err.message || err)
      }
    }

    /**
     * Function to restart the manager or cluster
     */
    async restart() {
      try {
        this.scope.restartInProgress = true
        this.scope.confirmingRestart = false
        const result = await this.restartService.restart()
        this.notification.showSimpleToast(result)
        this.scope.restartInProgress = false
      } catch (error) {
        this.notification.showErrorToast(error)
        this.scope.confirmingRestart = false
        this.scope.restartInProgress = false
      }
    }

    switchRestart() {
      this.scope.confirmingRestart = !this.scope.confirmingRestart
      this.scope.$applyAsync()
    }
  }

  controllers.controller('statusCtrl', Status)
})
