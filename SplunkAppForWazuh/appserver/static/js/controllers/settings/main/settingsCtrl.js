define(['../../module'], function(controllers) {
  'use strict'

  class Main {
    constructor($scope, $navigationService) {
      this.$navigationService = $navigationService
      this.$scope = $scope
      this.$scope.message = 'Settings'
      this.$scope.tabName = ''
    }

    $onInit() {
      const lastState = this.$navigationService.getLastState()
      switch (lastState) {
        case 'settings.api':
          this.$scope.tabName = 'api'
          break
        case 'settings.extensions':
          this.$scope.tabName = 'extensions'
          break
        case 'settings.index':
          this.$scope.tabName = 'index'
          break
        case 'settings.about':
          this.$scope.tabName = 'about'
          break
        case 'settings.logs':
          this.$scope.tabName = 'logs'
          break
        case 'settings.configuration':
          this.$scope.tabName =  'configuration'
      }
      this.$scope.switchTab = name => {
        this.$scope.tabName = name
      }
    }
  }
  controllers.controller('settingsCtrl', Main)
})
