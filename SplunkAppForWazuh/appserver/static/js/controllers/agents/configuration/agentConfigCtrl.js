define(['../../module','../../../utils/config-handler'], function (controllers, ConfigHandler) {
  
  'use strict'
  
  class ConfigurationController {
    constructor($scope,$requestService, $stateParams, $currentDataService, $beautifierJson, $notificationService, data, agent) {
      this.$scope = $scope
      this.errorHandler = $notificationService
      this.apiReq = $requestService
      this.$scope.load = false
      this.id = $stateParams.id || $currentDataService.getCurrentAgent()
      this.$scope.isArray = Array.isArray
      this.configurationHandler = new ConfigHandler(this.apiReq,$beautifierJson, this.errorHandler)
      this.$scope.currentConfig = null
      this.$scope.configurationTab = ''
      this.$scope.configurationSubTab = ''
      this.$scope.integrations = {}
      this.$scope.selectedItem = 0
      this.$scope.isSynchronized = data && data.data && data.data.data && data.data.data.synced
      this.$scope.agent = agent.data.data
    }
    
    $onInit() {
      // this.$scope.getXML = () => this.configurationHandler.getXML(this.$scope)
      this.$scope.getJSON = () => this.configurationHandler.getJSON(this.$scope)
      this.$scope.isString = item => typeof item === 'string'
      this.$scope.hasSize = obj => obj && typeof obj === 'object' && Object.keys(obj).length
      this.$scope.switchConfigTab = (configurationTab, sections) => this.configurationHandler.switchConfigTab(configurationTab, sections, this.$scope, this.id)
      this.$scope.switchWodle = wodleName => this.configurationHandler.switchWodle(wodleName, this.$scope, this.id)
      this.$scope.switchConfigurationTab = configurationTab => this.configurationHandler.switchConfigurationTab(configurationTab, this.$scope)
      this.$scope.switchConfigurationSubTab = configurationSubTab => this.configurationHandler.switchConfigurationSubTab(configurationSubTab, this.$scope)
      this.$scope.updateSelectedItem = i => this.$scope.selectedItem = i
      this.$scope.getIntegration = list => this.configurationHandler.getIntegration(list, this.$scope)
    }
  }
  
  controllers.controller('configurationAgentCtrl', ConfigurationController)
})
