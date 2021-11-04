define([
  '../../module',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/inputs/time-picker'
], function(app, LinearChart, PieChart, ColumChart, TimePicker) {
  'use strict'
  class Monitoring {
    /**
     * Constructor class
     * @param {Object} $stateParams
     * @param {Object} $urlTokenModel
     * @param {Object} $scope
     * @param {Object} $currentDataService
     * @param {Object} $requestService
     * @param {Object} $notificationService
     * @param {Object} monitoringInfo
     */
    constructor(
      $stateParams,
      $urlTokenModel,
      $scope,
      $currentDataService,
      $requestService,
      $appVersionService,
      $notificationService,
      monitoringInfo,
      requirementsList
    ) {
      console.log(requirementsList)
      this.scope = $scope
      this.urlTokenModel = $urlTokenModel
      this.currentDataService = $currentDataService

      this.scope.showConfig = $stateParams.isClusterRunning || false
      this.scope.appDocuVersion = $appVersionService.getDocumentationVersion()
      this.scope.showNodes = $stateParams.showNodes || false
      this.scope.currentNode = $stateParams.currentNode || null
      this.filters = this.currentDataService.getSerializedFilters()
      this.currentApi = this.currentDataService.getApi()
      this.timePicker = new TimePicker(
        '#timePicker',
        this.urlTokenModel.handleValueChange
      )

      this.scope.expandArray = [false, false, false, false]
      this.scope.expand = (i, id) => this.expand(i, id)

      this.notification = $notificationService
      this.apiReq = $requestService.apiReq

      this.vizz = [
        new LinearChart(
          'alertSummary',
          `${this.filters} | timechart span=1h count`,
          'alertSummary',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new LinearChart(
          'alertNodeSummary',
          `${this.filters} | timechart span=1h count by cluster.node`,
          'alertNodeSummary',
          this.scope,
          { customAxisTitleX: 'Time span' }
        ),
        new PieChart(
          'topNodes',
          `${this.filters} | top cluster.node`,
          'topNodes',
          this.scope
        ),
        new ColumChart(
          'overviewNode',
          `${this.filters} | timechart span=2h count`,
          'overviewNode',
          this.scope,
          { customAxisTitleX: 'Time span' }
        )
      ]
      const parsedResult = monitoringInfo.map(item =>
        item && item.data && item.data.data ? item.data.data : false
      )

      const [
        status,
        nodes,
        configuration,
        version,
        agents,
        health
      ] = parsedResult

      this.running = status.running
      this.enabled = status.enabled
      this.scope.isClusterEnabled =
        $stateParams.isClusterEnabled || this.enabled === 'yes'
      this.scope.isClusterRunning =
        $stateParams.isClusterRunning || this.running === 'yes'
      this.nodes = this.enabled === 'yes' ? nodes.affected_items[0] : []
      this.nodesCount = this.enabled === 'yes' ? nodes.total_affected_items : 0
      this.configuration = this.enabled === 'yes' ? configuration.affected_items[0] : false
      this.version = version.api_version
      this.agents = agents
      this.health = this.enabled === 'yes' ? health.affected_items[0] : false
    }

    /**
     * On controller load
     */
    $onInit() {
      this.scope.selectedNavTab = 'monitoring'
      this.scope.currentApi =
        this.currentApi.clusterName || this.currentApi.managerName
      this.scope.search = term => this.search(term)
      this.scope.status = 'yes'
      this.scope.reset = () => this.reset()
      this.scope.goConfiguration = () => this.goConfiguration()
      this.scope.goBack = () => this.goBack()
      this.scope.goNodes = () => this.goNodes()

      this.scope.$on('loadingContent', (event, data) => {
        this.scope.loadingContent = data.status
        event.preventDefault()
      })

      this.scope.$on('wazuhShowClusterNode', async (event, parameters) => {
        event.stopPropagation()
        try {
          if (this.checkStatus()) {
            this.scope.currentNode = parameters.node
            this.launchSearches()
            const data = await this.apiReq(`/cluster/healthcheck`, {
              nodes_list: this.scope.currentNode.name
            })
            
            const nodeInfo = data.data.data.affected_items.map(item =>{
              if(item.info.name == this.scope.currentNode.name){
                return item
              }
            })

            this.scope.currentNode.healthCheck = nodeInfo

            if (
              this.scope.currentNode.healthCheck &&
              this.scope.currentNode.healthCheck.status
            ) {
              this.scope.currentNode.healthCheck.status.last_sync_integrity.duration =
                'n/a'
              this.scope.currentNode.healthCheck.status.last_sync_agentinfo.duration =
                'n/a'
              this.scope.currentNode.healthCheck.status.last_sync_agentgroups.duration =
                'n/a'

              if (
                this.scope.currentNode.healthCheck.status.last_sync_integrity
                  .date_start_master !== 'n/a' &&
                this.scope.currentNode.healthCheck.status.last_sync_integrity
                  .date_end_master !== 'n/a'
              ) {
                const end = new Date(
                  this.scope.currentNode.healthCheck.status.last_sync_integrity.date_end_master
                )
                const start = new Date(
                  this.scope.currentNode.healthCheck.status.last_sync_integrity.date_start_master
                )
                this.scope.currentNode.healthCheck.status.last_sync_integrity.duration = `${(end -
                  start) /
                  1000}s`
              }

              if (
                this.scope.currentNode.healthCheck.status.last_sync_agentinfo
                  .date_start_master !== 'n/a' &&
                this.scope.currentNode.healthCheck.status.last_sync_agentinfo
                  .date_end_master !== 'n/a'
              ) {
                const end = new Date(
                  this.scope.currentNode.healthCheck.status.last_sync_agentinfo.date_end_master
                )
                const start = new Date(
                  this.scope.currentNode.healthCheck.status.last_sync_agentinfo.date_start_master
                )
                this.scope.currentNode.healthCheck.status.last_sync_agentinfo.duration = `${(end -
                  start) /
                  1000}s`
              }

              if (
                this.scope.currentNode.healthCheck.status.last_sync_agentgroups
                  .date_start_master !== 'n/a' &&
                this.scope.currentNode.healthCheck.status.last_sync_agentgroups
                  .date_end_master !== 'n/a'
              ) {
                const end = new Date(
                  this.scope.currentNode.healthCheck.status.last_sync_agentgroups.date_end_master
                )
                const start = new Date(
                  this.scope.currentNode.healthCheck.status.last_sync_agentgroups.date_start_master
                )
                this.scope.currentNode.healthCheck.status.last_sync_agentgroups.duration = `${(end -
                  start) /
                  1000}s`
              }
            }
          }
          this.scope.$applyAsync()
        } catch (error) {
          this.notification.showErrorToast(error.message || error)
        }
      })

      this.scope.nodesCount = this.nodesCount

      this.scope.configuration = this.configuration

      this.scope.version = this.version

      this.scope.agentsCount = this.agents.total_affected_items - 1

      this.scope.healthCheck = this.health

      /**
       * When controller is destroyed
       */
      this.scope.$on('$destroy', () => {
        this.timePicker.destroy()
        this.vizz.map(viz => viz.destroy())
      })
    }

    /**
     * Searches for a term
     * @param {String} term
     */
    search(term) {
      this.scope.$broadcast('wazuhSearch', { term })
    }

    /**
     * Resets the view
     */
    reset() {
      this.scope.showConfig = false
      this.scope.showNodes = false
      this.scope.currentNode = false
      this.scope.$applyAsync()
    }

    /**
     * Checks status
     */
    checkStatus() {
      if (this.enabled === 'no') {
        this.scope.isClusterEnabled = false
      } else if (this.running === 'no') {
        this.scope.isClusterRunning = false
        this.scope.status = 'no'
      } else if (this.running === 'no' && this.enabled === 'yes') {
        this.scope.isClusterRunning = false
        this.scope.status = 'no'
      } else if (this.running === 'yes' && this.enabled === 'yes') {
        this.scope.isClusterEnabled = true
        this.scope.isClusterRunning = true
        this.nodes.name = this.configuration.name
        this.nodes.master_node = this.configuration.node_name
      }
      return this.running === 'yes' && this.enabled === 'yes'
    }
    /**
     * Sets the view conditions
     * @param {String} component
     */
    setBooleans(component) {
      this.scope.showConfig = component === 'showConfig'
      this.scope.showNodes = component === 'showNodes'
      if (component === 'showClusterMonitoring') {
        this.scope.showConfig = false
        this.scope.showNodes = false
      }
      this.scope.currentNode = null
      this.scope.$applyAsync()
    }

    /**
     * Navigates to the node configuration
     */
    goConfiguration() {
      this.setBooleans('showConfig')
    }

    /**
     * Navigates to nodes list
     */
    goNodes() {
      this.setBooleans('showNodes')
    }

    /**
     * Navigates to cluster monitoring
     */
    goBack() {
      this.setBooleans('showClusterMonitoring')
    }

    /**
     * Launches the searches
     */
    launchSearches() {
      this.vizz[3].changeSearch(
        `${this.filters} cluster.node=${this.scope.currentNode.name} | timechart span=2h count`
      )
    }

    expand(i, id) {
      this.scope.expandArray[i] = !this.scope.expandArray[i]
      let vis = $(
        '#' + id + ' .panel-body .splunk-view .shared-reportvisualizer'
      )
      this.scope.expandArray[i]
        ? vis.css('height', 'calc(100vh - 200px)')
        : vis.css('height', '250px')

      let vis_header = $('.wz-headline-title')
      vis_header.dblclick(e => {
        if (this.scope.expandArray[i]) {
          this.scope.expandArray[i] = !this.scope.expandArray[i]
          this.scope.expandArray[i]
            ? vis.css('height', 'calc(100vh - 200px)')
            : vis.css('height', '250px')
          this.scope.$applyAsync()
        } else {
          e.preventDefault()
        }
      })
    }
  }
  app.controller('monitoringCtrl', Monitoring)
})
