define(['../../module', 'FileSaver'], function(app) {
  'use strict'

  class Logs {
    /**
     * Class logs
     * @param {*} $scope
     * @param {*} $requestService
     * @param {*} $tableFilterService
     * @param {*} $notificationService
     * @param {*} $currentDataService
     * @param {*} $csvRequestService
     * @param {Object} logs
     */
    constructor(
      $scope,
      $requestService,
      $tableFilterService,
      $notificationService,
      $currentDataService,
      $csvRequestService,
      logs
    ) {
      this.scope = $scope
      this.apiReq = $requestService.apiReq
      this.notification = $notificationService
      this.scope.type_log = 'all'
      this.scope.category = 'all'
      this.api = $currentDataService.getApi()
      this.logs = logs
      this.csvReq = $csvRequestService
      this.wzTableFilter = $tableFilterService
      this.path = '/manager/logs'
    }

    /**
     * On controller loads
     */
    $onInit() {
      try {
        this.scope.search = term => this.search(term)
        this.scope.filter = term => this.filter(term)
        this.scope.changeNode = node => this.changeNode(node)
        this.scope.stopRealtime = () => this.stopRealtime()
        this.scope.playRealtime = () => this.playRealtime()
        this.scope.summary = this.logs.data.data
        this.scope.downloadCsv = () => this.downloadCsv()
        this.initialize()
      } catch (err) {
        this.notification.showErrorToast('Cannot fetch logs data from server')
      }
    }

    /**
     * Exports the table in CSV format
     */
    async downloadCsv() {
      try {
        this.notification.showSimpleToast('Your download should begin automatically...')
        const currentApi = this.api['_key']
        if (this.clusterEnabled) {
          this.path = `/cluster/${this.scope.selectedNode}/logs`
        }
        const output = await this.csvReq.fetch(
          this.path,
          currentApi,
          this.wzTableFilter.get()
        )
        if (output.length > 0) {
          const blob = new Blob([output], { type: 'text/csv' }) // eslint-disable-line
          saveAs(blob, 'logs.csv') // eslint-disable-line
        } else {
          this.notification.showWarningToast('Empty results.')
        }
        return
      } catch (error) {
        this.notification.showErrorToast('Error downloading CSV')
      }
      return
    }

    /**
     * Initializes data
     */
    async initialize() {
      try {
        this.clusterStatus = await this.apiReq('/cluster/status')
        this.clusterEnabled =
          this.clusterStatus &&
          this.clusterStatus.data &&
          this.clusterStatus.data.data &&
          this.clusterStatus.data.data.running === 'yes' &&
          this.clusterStatus.data.data.enabled === 'yes'
        if (this.clusterEnabled) {
          const nodeList = await this.apiReq('/cluster/nodes')
          if (
            nodeList &&
            nodeList.data &&
            nodeList.data.data &&
            Array.isArray(nodeList.data.data.items)
          ) {
            this.scope.nodeList = nodeList.data.data.items
              .map(item => item.name)
              .reverse()
            this.scope.selectedNode = nodeList.data.data.items.filter(
              item => item.type === 'master'
            )[0].name
          }
        }

        this.scope.logsPath = this.clusterEnabled
          ? `/cluster/${this.scope.selectedNode}/logs`
          : '/manager/logs'

        const data = this.clusterEnabled
          ? await this.apiReq(
              `/cluster/${this.scope.selectedNode}/logs/summary`
            )
          : await this.apiReq('/manager/logs/summary')
        const daemons = data.data.data
        this.scope.daemons = Object.keys(daemons).map(item => ({
          title: item
        }))
        if (!this.scope.$$phase) this.scope.$digest()
        return
      } catch (err) {
        this.notification.showErrorToast('Error initializing data')
      }
      return
    }

    /**
     * Changes the cluster node
     * @param {String} node
     */
    async changeNode(node) {
      try {
        this.scope.type_log = 'all'
        this.scope.category = 'all'
        this.scope.selectedNode = node
        this.scope.custom_search = null
        this.scope.$broadcast('wazuhUpdateInstancePath', {
          path: `/cluster/${node}/logs`
        })
        const summary = await this.apiReq(`/cluster/${node}/logs/summary`, {})
        const daemons = summary.data.data
        this.scope.daemons = Object.keys(daemons).map(item => ({
          title: item
        }))
        if (!this.scope.$$phase) this.scope.$digest()
      } catch (error) {
        this.notification.showErrorToast('Error at fetching logs')
      }
    }

    /**
     * Searches by a term
     * @param {String} term
     */
    search(term) {
      this.scope.$broadcast('wazuhSearch', { term })
      return
    }

    /**
     * Filters by a term
     * @param {Object} filter
     */
    async filter(filter) {
      this.scope.$broadcast('wazuhFilter', { filter })
      return
    }

    /**
     * Starts fetching logs in real time
     */
    playRealtime() {
      this.scope.realtime = true
      this.scope.$broadcast('wazuhPlayRealTime')
      return
    }

    /**
     * Stops fetching logs in real time
     */
    stopRealtime() {
      this.scope.realtime = false
      this.scope.$broadcast('wazuhStopRealTime')
      return
    }
  }
  app.controller('managerLogsCtrl', Logs)
})
