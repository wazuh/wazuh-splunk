define(['../../module', '../../../utils/config-handler'], function(
  controllers,
  ConfigHandler
) {
  'use strict'

  class ConfigurationController {
    /**
     * Class ConfigurationController
     * @param {*} $scope
     * @param {*} $requestService
     * @param {*} $beautifierJson
     * @param {*} $appVersionService
     * @param {*} $notificationService
     * @param {*} clusterInfo
     * @param {*} $security_service
     */
    constructor(
      $scope,
      $requestService,
      $beautifierJson,
      $appVersionService,
      $notificationService,
      clusterInfo,
      $security_service
    ) {
      this.scope = $scope
      this.notification = $notificationService
      this.apiReq = $requestService
      this.scope.load = false
      this.scope.isArray = Array.isArray
      this.scope.appDocuVersion = $appVersionService.getDocumentationVersion()
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
      this.clusterInfo = clusterInfo

      // Save current sections, configTabs and woodles
      this.currentConfigTab = false
      this.currentSections = false
      this.currentWodle = false
      this.currentSubTab = false
      //this.scope.canReadConfiguration = await $security_service.isClusterAll();
    }

    $onInit() {
      try {        
        if (this.clusterInfo && this.clusterInfo.clusterEnabled) {
          this.scope.clusterEnabled = this.clusterInfo.clusterEnabled
          if (this.clusterInfo.clusterEnabled) {
            this.scope.selectedNode = this.clusterInfo.nodes.data.data.affected_items[0].name
            this.scope.nodes = this.clusterInfo.nodes.data.data.affected_items
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
        this.scope.switchConfigTab = (configurationTab, sections) => {
          this.currentConfigTab = configurationTab
          this.currentSections = sections
          this.currentWodle = false
          this.configurationHandler.switchConfigTab(
            configurationTab,
            sections,
            this.scope,
            false, //Send agent.id as false
            this.scope.selectedNode // Send selected node
          )
        }
        this.scope.switchWodle = wodleName => {
          this.currentConfigTab = false
          this.currentSections = false
          this.currentWodle = wodleName
          this.configurationHandler.switchWodle(
            wodleName,
            this.scope,
            false, //Send agent.id as false
            this.scope.selectedNode // Send selected node
          )
        }

        this.scope.switchConfigurationTab = configurationTab => {
          this.currentConfigTab = false
          this.currentSections = false
          this.currentSubTab = false
          this.currentWodle = false
          this.configurationHandler.switchConfigurationTab(
            configurationTab,
            this.scope
          )
        }

        this.scope.switchConfigurationSubTab = configurationSubTab => {
          this.currentSubTab = configurationSubTab
          this.configurationHandler.switchConfigurationSubTab(
            configurationSubTab,
            this.scope
          )
        }

        this.scope.formatAzureType = type => {
          if(type === 'log_analytics')
          return 'Azure Log Analytics'
          if(type === 'graph')
          return 'Azure Active Directory Graph'
          if(type === 'storage')
          return 'Azure Storage'

          return type // if it's not one of the above then it's a custom tag
        }
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
      try {
        this.scope.selectedNode = node
        if (this.currentConfigTab && !this.currentWodle) {
          this.configurationHandler.switchConfigTab(
            this.currentConfigTab,
            this.currentSections,
            this.scope,
            false, //Send agent.id as false
            node // Send selected node
          )
        } else if (!this.currentConfigTab && this.currentWodle) {
          this.configurationHandler.switchWodle(
            this.currentWodle,
            this.scope,
            false, //Send agent.id as false
            node // Send selected node
          )
        }
        // If the current config tab or wodle have sub tabs, this initializes the nav bar and loads the data
        if (this.currentSubTab) {
          this.configurationHandler.switchConfigurationSubTab(
            this.currentSubTab,
            this.scope
          )
        }
        this.scope.$applyAsync()
        //this.notification.showSimpleToast(`Node selected: ${node}`)
      } catch (error) {
        this.notification.showErrorToast(
          error || `Cannot load ${node} configuration.`
        )
      }
    }
  }

  controllers.controller('configurationCtrl', ConfigurationController)
})
