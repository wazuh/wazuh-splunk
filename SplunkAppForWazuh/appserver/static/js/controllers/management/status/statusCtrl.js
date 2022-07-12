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
     * @param {*} $restartService
     * @param {*} $security_service
     */
    constructor(
      $scope,
      $requestService,
      $notificationService,
      statusData,
      agentInfo,
      $restartService,
      $security_service
    ) {
      this.scope = $scope
      this.scope.load = true
      this.apiReq = $requestService.apiReq
      this.notification = $notificationService

      /* RBAC flags */
      this.scope.canReadCluster = $security_service.isAllowed('CLUSTER_READ', [
        'RESOURCELESS',
      ])
      this.scope.canRestartCluster = $security_service.isAllowed(
        'CLUSTER_RESTART',
        ['RESOURCELESS']
      )
      this.scope.canReadManager = $security_service.isAllowed('MANAGER_READ', [
        'RESOURCELESS',
      ])
      this.scope.canRestartManager = $security_service.isAllowed(
        'MANAGER_RESTART',
        ['RESOURCELESS']
      )

      const parsedStatusData = statusData.map((item) =>
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
        status,
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
      this.agentInfo = agentInfo && agentInfo.data.data
      this.restartService = $restartService
    }

    /**
     * On controller loads
     */
    $onInit() {
      this.scope.selectedNavTab = 'status'
      this.scope.confirmingRestart = false
      this.scope.switchRestart = () => this.switchRestart()
      this.scope.restartInProgress = false
      if (this.masterNode && this.masterNode.name) {
        const masterNodeName = this.masterNode.name
        this.scope.nodeId = masterNodeName
        this.scope.nodes = this.nodes.affected_items.filter((node) => node.name)
      }
      if (
        this.status &&
        this.status.enabled === 'yes' &&
        this.status.running === 'no'
      ) {
        this.scope.clusterError =
          'This cluster is enabled but not running. Please check your cluster health.'
        this.scope.load = false
        this.scope.$applyAsync()
      }

      this.scope.changeNode = (node) => this.changeNode(node)
      this.scope.restart = () => this.restart()
      this.bindStatus()

      if (this.nodeStatus.affected_items) {
        this.scope.daemons = this.objToArr(
          this.nodeStatus?.affected_items[0] || {}
        )
      }
      if (this.nodeInfo.affected_items) {
        this.scope.managerInfo = this.nodeInfo.affected_items[0]
      }

      this.scope.$on('loadingContent', (event, data) => {
        this.scope.loadingContent = data.status
        event.preventDefault()
      })
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
          this.apiReq(`/cluster/${node}/info`),
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
        this.scope.daemons = this.objToArr(
          daemonResult[0].data.data.affected_items[0]
        )
        this.scope.managerInfo = daemonResult[1].data.data.affected_items[0]
      } catch (err) {
        this.scope.clusterError = err.message || err
      }
      this.scope.load = false
      this.scope.$applyAsync()
    }

    /**
     * Gets the daemon and status information of the manager or cluster node
     */
    async bindStatus() {
      try {
        this.scope.load = true

        this.scope.getDaemonStatusClass = (daemonStatus) =>
          daemonStatus === 'running' ? 'status teal' : 'status red'
        // Once Wazuh core fixes agent 000 issues, this should be adjusted
        const agentsStatus = this.summary.connection
        this.scope.agentsCountActive = agentsStatus.active
        this.scope.agentsCountPending = agentsStatus.pending
        this.scope.agentsCountDisconnected = agentsStatus.disconnected
        this.scope.agentsCountNeverConnected = agentsStatus.never_connected
        this.scope.agentsCountTotal = agentsStatus.total
        this.scope.agentsCoverity = (agentsStatus.active / agentsStatus.total) * 100

        this.scope.totalRules = this.rules.total_affected_items
        this.scope.totalDecoders = this.decoders.total_affected_items
        this.scope.agentInfo =
          this.agentInfo &&
          this.agentInfo.affected_items &&
          this.agentInfo.affected_items[0]
      } catch (err) {
        this.notification.showErrorToast(err.message || err)
      }
      this.scope.load = false
      this.scope.$applyAsync()
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
      } catch (error) {
        this.notification.showErrorToast(error)
        this.scope.confirmingRestart = false
      }
      this.scope.restartInProgress = false
    }

    switchRestart() {
      this.scope.confirmingRestart = !this.scope.confirmingRestart
    }
  }

  controllers.controller('statusCtrl', Status)
})
