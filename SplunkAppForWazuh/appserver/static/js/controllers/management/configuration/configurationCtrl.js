define(['../../module', '../../../utils/config-handler'], function (
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

      this.scope.isManager = true
      /* RBAC flags */
      this.isAllowed = (action, resource, params = ['*']) => {
        return $security_service.getPolicy(action, resource, params).isAllowed
      }
    }

    $onInit() {
      try {
        this.scope.nodes =
          (((this.clusterInfo.nodes || []).data || []).data || [])
            .affected_items || []
        if (this.clusterInfo?.clusterEnabled && this.scope.nodes.length > 0) {
          this.scope.clusterEnabled = this.clusterInfo.clusterEnabled
          this.scope.selectedNode = this.scope.nodes[0].name
          this.changeNode(this.scope.selectedNode)
        } else {
          // If cluster is disabled there is not a node selected
          this.scope.selectedNode = false
        }

        this.scope.goToEdition = true
        this.scope.showingInfo = false
        this.scope.showInfo = () => this.showInfo()
        this.scope.getXML = () => this.configurationHandler.getXML(this.scope)
        this.scope.getJSON = () => this.configurationHandler.getJSON(this.scope)
        this.scope.isString = (item) => typeof item === 'string'
        this.scope.changeNode = (node) => this.changeNode(node)
        this.scope.hasSize = (obj) =>
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
        this.scope.switchWodle = (wodleName) => {
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

        this.scope.switchConfigurationTab = (configurationTab) => {
          this.currentConfigTab = false
          this.currentSections = false
          this.currentSubTab = false
          this.currentWodle = false
          this.configurationHandler.switchConfigurationTab(
            configurationTab,
            this.scope
          )
        }

        this.scope.switchConfigurationSubTab = (configurationSubTab) => {
          this.currentSubTab = configurationSubTab
          this.configurationHandler.switchConfigurationSubTab(
            configurationSubTab,
            this.scope
          )
        }

        this.scope.formatAzureType = (type) => {
          if (type === 'log_analytics') return 'Azure Log Analytics'
          if (type === 'graph') return 'Azure Active Directory Graph'
          if (type === 'storage') return 'Azure Storage'

          return type // if it's not one of the above then it's a custom tag
        }
        this.scope.updateSelectedItem = (i) => (this.scope.selectedItem = i)
        this.scope.getIntegration = (list) =>
          this.configurationHandler.getIntegration(list, this.scope)

        /* RBAC flags */
        this.scope.canUpdateConfig = () => {
          if (this.scope.selectedNode)
            return this.isAllowed(
              'CLUSTER_UPDATE_CONFIG',
              ['NODE_ID'],
              [this.scope.selectedNode]
            )
          else return this.isAllowed('MANAGER_UPDATE_CONFIG', ['RESOURCELESS'])
        }

        this.scope.canReadConfig = () => {
          if (this.scope.selectedNode)
            return this.isAllowed(
              'CLUSTER_READ',
              ['NODE_ID'],
              [this.scope.selectedNode]
            )
          else return this.isAllowed('MANAGER_READ', ['RESOURCELESS'])
        }
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
            false, // Send agent.id as false
            node // Send selected node
          )
        } else if (!this.currentConfigTab && this.currentWodle) {
          this.configurationHandler.switchWodle(
            this.currentWodle,
            this.scope,
            false, // Send agent.id as false
            node // Send selected node
          )
        }
        // If the current config tab or wodle have sub tabs, this initializes
        // the nav bar and loads the data
        if (this.currentSubTab) {
          this.configurationHandler.switchConfigurationSubTab(
            this.currentSubTab,
            this.scope
          )
        }
        this.scope.$applyAsync()
      } catch (error) {
        this.notification.showErrorToast(
          error || `Cannot load ${node} configuration.`
        )
      }
    }
  }

  controllers.controller('configurationCtrl', ConfigurationController)
})
