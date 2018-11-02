define([
  '../../module',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/inputs/time-picker',
], function (
  app,
  LinearChart,
  PieChart,
  ColumChart,
  TimePicker
  ) {
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
      constructor($stateParams,$urlTokenModel, $scope, $currentDataService, $requestService, $notificationService, monitoringInfo){
        this.scope = $scope
        this.urlTokenModel = $urlTokenModel
        this.scope.isClusterEnabled = $stateParams.isClusterEnabled || true
        this.scope.isClusterRunning = $stateParams.isClusterRunning || true
        this.scope.showConfig = $stateParams.isClusterRunning || false
        this.scope.showNodes = $stateParams.showNodes || false
        this.scope.currentNode = $stateParams.currentNode || null
        this.filters = $currentDataService.getSerializedFilters()
        this.currentApi = $currentDataService.getApi()
        this.timePicker = new TimePicker('#timePicker',this.urlTokenModel.handleValueChange)

        this.toast = $notificationService.showSimpleToast
        this.apiReq = $requestService.apiReq
        this.vizz = [
          new LinearChart('alertSummary',`${this.filters} sourcetype=wazuh | timechart span=1h count`,'alertSummary'),
          new LinearChart('alertNodeSummary',`${this.filters} sourcetype=wazuh | timechart span=1h count by cluster.node`,'alertNodeSummary'),
          new PieChart('topNodes',`${this.filters} sourcetype=wazuh | top cluster.node`,'topNodes'),
          new ColumChart('overviewNode',`${this.filters} sourcetype=wazuh | timechart span=2h count`,'overviewNode'),
        ]
        const parsedResult = monitoringInfo.map(item => item && item.data && item.data.data ? item.data.data : false)

        const [
          status,
          nodes,
          configuration,
          version,
          agents,
          health,
        ] = parsedResult
        
        this.running = status.running
        this.enabled = status.enabled
        this.nodes = nodes
        this.nodesCount = nodes.totalItems
        this.configuration = configuration
        this.version = version
        this.agents = agents
        this.health = health
        
        
      }
      
      /**
      * On controller load
      */
      $onInit(){

        this.scope.currentApi = this.currentApi.clusterName || this.currentApi.managerName 
        this.scope.search = term => this.search(term)
        this.scope.status = 'yes'
        this.scope.reset = () => this.reset()
        this.scope.goConfiguration = () => this.goConfiguration()
        this.scope.goNodes = () => this.goNodes()
        
        this.scope.$on('wazuhShowClusterNode', async (event, parameters) => {
          try {
            this.scope.currentNode = parameters.node
            this.launchSearches()
            const data = await this.apiReq(`/cluster/healthcheck`, {
              node: this.scope.currentNode.name
            })
            
            this.scope.currentNode.healthCheck = data.data.data.nodes[this.scope.currentNode.name]
            
            if (this.scope.currentNode.healthCheck && this.scope.currentNode.healthCheck.status) {
              this.scope.currentNode.healthCheck.status.last_sync_integrity.duration =
              'n/a'
              this.scope.currentNode.healthCheck.status.last_sync_agentinfo.duration =
              'n/a'
              this.scope.currentNode.healthCheck.status.last_sync_agentgroups.duration =
              'n/a'
              
              if (this.scope.currentNode.healthCheck.status.last_sync_integrity.date_start_master !== 'n/a' && this.scope.currentNode.healthCheck.status.last_sync_integrity.date_end_master !== 'n/a') {
                const end = new Date(this.scope.currentNode.healthCheck.status.last_sync_integrity.date_end_master)
                const start = new Date(this.scope.currentNode.healthCheck.status.last_sync_integrity.date_start_master)
                this.scope.currentNode.healthCheck.status.last_sync_integrity.duration = `${(end -start) /1000}s`
              }
              
              if (this.scope.currentNode.healthCheck.status.last_sync_agentinfo.date_start_master !== 'n/a' && this.scope.currentNode.healthCheck.status.last_sync_agentinfo.date_end_master !== 'n/a') {
                const end = new Date(this.scope.currentNode.healthCheck.status.last_sync_agentinfo.date_end_master)
                const start = new Date(this.scope.currentNode.healthCheck.status.last_sync_agentinfo.date_start_master)
                this.scope.currentNode.healthCheck.status.last_sync_agentinfo.duration = `${(end -start) /1000}s`
              }
              
              if (this.scope.currentNode.healthCheck.status.last_sync_agentgroups.date_start_master !== 'n/a' && this.scope.currentNode.healthCheck.status.last_sync_agentgroups.date_end_master !== 'n/a') {
                const end = new Date(this.scope.currentNode.healthCheck.status.last_sync_agentgroups.date_end_master)
                const start = new Date(this.scope.currentNode.healthCheck.status.last_sync_agentgroups.date_start_master)
                this.scope.currentNode.healthCheck.status.last_sync_agentgroups.duration = `${(end -start) /1000}s`
              }
            } 
            if (!this.scope.$$phase) this.scope.$digest()
          } catch (error) {
            this.toast(error.message || error)
          }
          if (this.enabled === 'no') {
            this.scope.isClusterEnabled = false
            
          }else if (this.running === 'no') {
            this.scope.isClusterRunning = false
            this.scope.status = 'no'
          }
          
        })
        this.scope.nodesCount = this.nodesCount
        
        this.scope.configuration = this.configuration.data.data
        
        this.scope.version = this.version.data.data
        
        this.scope.agentsCount = this.agents.data.data.totalItems - 1
        
        this.scope.healthCheck = this.health.data.data
        
        this.nodes.name = this.configuration.name
        
        this.nodes.master_node = this.configuration.node_name
        
        /**
        * When controller is destroyed
        */
        this.scope.$on('$destroy', () => {
          this.timePicker.destroy()
          this.vizz.map( viz => viz.destroy() )
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
      reset(){
        this.scope.showConfig = false
        this.scope.showNodes = false
        this.scope.currentNode = false
        if (!this.scope.$$phase) this.scope.$digest()
      }
      
      /**
      * Sets the view conditions
      * @param {String} component 
      */
      setBooleans(component) {
        this.scope.showConfig = component === 'showConfig'
        this.scope.showNodes = component === 'showNodes'
        this.scope.currentNode = null
        if (!this.scope.$$phase) this.scope.$digest()
      }
      
      /**
      * Navigates to the node configuration
      */
      goConfiguration(){
        this.setBooleans('showConfig')
      }
      
      /**
      * Navigates to nodes list
      */
      goNodes(){
        this.setBooleans('showNodes')
      }
      
      /**
      * Launches the searches
      */
      launchSearches(){
        this.vizz[3].changeSearch(`${this.filters} cluster.node=${this.scope.currentNode.name} sourcetype=wazuh | timechart span=2h count`)
      }
    }
    app.controller('monitoringCtrl', Monitoring)
  })