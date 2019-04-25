define(['../../module'], function(controllers) {
    'use strict'
  
    class Configuration {
      constructor($scope, $currentDataService, $notificationService, configuration) {
        this.scope = $scope
        this.scope.extensions = {}
        this.notification = $notificationService
        this.currentApi = $currentDataService.getApi()
        this.configuration = configuration
      }
  
      $onInit() {
        const id = this.currentApi['_key']
        this.scope.configuration = this.configuration
      }
  
    }
    controllers.controller('settingsConfigCtrl', Configuration)
  })
  