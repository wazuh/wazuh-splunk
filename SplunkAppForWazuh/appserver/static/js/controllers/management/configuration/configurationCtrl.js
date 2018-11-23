define(['../../module', '../../../utils/config-handler'], function(
  controllers,
  ConfigHandler
) {
  'use strict'

  class ConfigurationController {
    constructor(
      $scope,
      $requestService,
      $beautifierJson,
      $notificationService
    ) {
      this.$scope = $scope
      this.errorHandler = $notificationService
      this.apiReq = $requestService
      this.$scope.load = false
      this.$scope.isArray = Array.isArray
      this.configurationHandler = new ConfigHandler(
        this.apiReq,
        $beautifierJson,
        this.errorHandler
      )
      this.$scope.currentConfig = null
      this.$scope.configurationTab = ''
      this.$scope.configurationSubTab = ''
      this.$scope.integrations = {}
      this.$scope.selectedItem = 0
    }

    promisedLoad (el,url) {
      return new Promise( (reject, resolve) => {
        $(`#${el}`).load(`${url}`, (error,data) => {
          this.$scope.$apply(() => {
            if(error) return reject(error)
            resolve(data)            
          })
        })
      })
     }

    $onInit() {
      //Loads html
      console.log("b f")
      this.loadHtml().then(()=>{
        console.log("a f")
        // this.$scope.getXML = () => this.configurationHandler.getXML(this.$scope)
        this.$scope.getJSON = () => this.configurationHandler.getJSON(this.$scope)
        this.$scope.isString = item => typeof item === 'string'
        this.$scope.hasSize = obj =>
          obj && typeof obj === 'object' && Object.keys(obj).length
        this.$scope.switchConfigTab = (configurationTab, sections) =>
          this.configurationHandler.switchConfigTab(
            configurationTab,
            sections,
            this.$scope
          )
        this.$scope.switchWodle = wodleName =>
          this.configurationHandler.switchWodle(wodleName, this.$scope)
        this.$scope.switchConfigurationTab = configurationTab =>
          this.configurationHandler.switchConfigurationTab(
            configurationTab,
            this.$scope
          )
        this.$scope.switchConfigurationSubTab = configurationSubTab =>
          this.configurationHandler.switchConfigurationSubTab(
            configurationSubTab,
            this.$scope
          )
        this.$scope.updateSelectedItem = i => (this.$scope.selectedItem = i)
        this.$scope.getIntegration = list =>
          this.configurationHandler.getIntegration(list, this.$scope)
      })

    }

    async loadHtml(){
      try {
        console.log("trying load html")
        await this.promisedLoad("breadcrumbs", "static/app/SplunkAppForWazuh/js/controllers/management/configuration/breadcrumbs/breadcrumbs.html")
        if (!this.$scope.$$phase) this.$scope.$digest()

      } catch (error) {
        console.log(error)
      }
    }

  }

  controllers.controller('configurationCtrl', ConfigurationController)
})
