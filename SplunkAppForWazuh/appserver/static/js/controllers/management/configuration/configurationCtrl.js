define(['../../module', '../../../utils/config-handler'], function (
  controllers,
  ConfigHandler
) {
  'use strict'

  class ConfigurationController {
    constructor(
      $scope,
      $requestService,
      $beautifierJson,
      $notificationService,
      isAdmin,
      clusterInfo
    ) {
      this.scope = $scope
      this.notification = $notificationService
      this.apiReq = $requestService
      this.scope.load = false
      this.scope.isArray = Array.isArray
      this.configurationHandler = new ConfigHandler(
        this.apiReq,
        $beautifierJson,
        this.notification
      )
      this.scope.currentConfig = null
      this.scope.configurationTab = ''
      this.scope.configurationSubTab = ''
      this.scope.integrations = {}
      this.scope.selectedItem = 0
      this.scope.isAdmin = isAdmin
      this.clusterInfo = clusterInfo
    }

    $onInit() {
      try {
        if (this.clusterInfo && this.clusterInfo.clusterEnabled) {
          this.scope.clusterEnabled = this.clusterInfo.clusterEnabled
          if (this.clusterInfo.clusterEnabled) {
            this.scope.selectedNode = this.clusterInfo.nodes.data.data.items[0].name
            this.scope.nodes = this.clusterInfo.nodes.data.data.items
          }
          this.changeNode(this.scope.selectedNode)
        } else {
          this.scope.selectedNode = false // If cluster is disabled there is not a node selected
        }
        
        this.scope.goToEdition = true
        this.scope.showingInfo = false
        this.scope.showInfo = () => this.showInfo()
        this.scope.getXML = () => this.configurationHandler.getXML(this.scope)
        this.scope.getJSON = () => this.configurationHandler.getJSON(this.scope)
        this.scope.isString = item => typeof item === 'string'
        this.scope.changeNode = node => this.changeNode(node)
        this.scope.hasSize = obj =>
          obj && typeof obj === 'object' && Object.keys(obj).length
        this.scope.switchConfigTab = (configurationTab, sections) =>
          this.configurationHandler.switchConfigTab(
            configurationTab,
            sections,
            this.scope,
            false, //Send agent.id as false
            this.scope.selectedNode // Send selected node
          )
        this.scope.switchWodle = wodleName =>
          this.configurationHandler.switchWodle(wodleName, this.scope)
        this.scope.switchConfigurationTab = configurationTab =>
          this.configurationHandler.switchConfigurationTab(
            configurationTab,
            this.scope
          )
        this.scope.switchConfigurationSubTab = configurationSubTab =>
          this.configurationHandler.switchConfigurationSubTab(
            configurationSubTab,
            this.scope
          )
        this.scope.updateSelectedItem = i => (this.scope.selectedItem = i)
        this.scope.getIntegration = list =>
          this.configurationHandler.getIntegration(list, this.scope)
      } catch (error) {
        this.notification.showErrorToast(error)
      }

    }

    /**
     * Show or hide sidebar with info
     */
    showInfo() {
      this.scope.showingInfo = !this.scope.showingInfo
      this.scope.$applyAsync()
    }

    /**
     * Changes the selected node
     * 
     * @param {String} node 
     */
    changeNode(node) {
      this.scope.selectedNode = node
      this.notification.showSimpleToast(`Node selected: ${node}`)
    }

  }

  controllers.controller('configurationCtrl', ConfigurationController)
})
