define([
  '../../module',
], function (
  controllers
  ) {
    'use strict'
    
    class Extensions{
      constructor($scope, $currentDataService, $notificationService,extensions) {
        this.scope = $scope
        this.scope.extensions = {}
        this.toast = $notificationService.showSimpleToast
        this.setExtensions = $currentDataService.setExtensions
        this.currentApi = $currentDataService.getApi()
        this.getExtensions = $currentDataService.getExtensions
        this.setExtensions = $currentDataService.setExtensions
        this.extensions = extensions
        console.log('extensions ',this.extensions)
      }
      
      $onInit(){
        const api = this.currentApi.id
        this.scope.toggleExtension = (extension, state) => this.toggleExtension(extension, state)
        this.currentExtensions = this.extensions.data || this.extensions
        const keys = Object.keys(this.currentExtensions)
        keys.map(key => this.scope.extensions[key] = (this.currentExtensions[key] === 'true') ? true : false)
        this.setExtensions(api,this.currentExtensions)
        if (!this.scope.$$phase) this.scope.$digest()
      }
      
      toggleExtension(extension, state){
        try {
          const api = this.currentApi.id
          this.currentExtensions[extension] = state.toString()
          this.setExtensions(api, this.currentExtensions)
          if (!this.scope.$$phase) this.scope.$digest()
        } catch (error) {
          this.toast(error)
        }
      }
    }
    controllers.controller('extensionsCtrl', Extensions)
  })
  
  