define(['../../module'], function (controllers) {
  'use strict'

  class Main {
    constructor($scope, $navigationService, isAdmin) {
      this.navigationService = $navigationService
      this.scope = $scope
      this.scope.message = 'Settings'
      this.scope.tabName = ''
      this.scope.isAdmin = isAdmin
    }

    $onInit() {
      const lastState = this.navigationService.getLastState()
      switch (lastState) {
        case 'settings.api':
          this.scope.tabName = 'api'
          break
        case 'settings.extensions':
          this.scope.tabName = 'extensions'
          break
        case 'settings.index':
          this.scope.tabName = 'index'
          break
        case 'settings.about':
          this.scope.tabName = 'about'
          break
        case 'settings.logs':
          this.scope.tabName = 'logs'
          break
        case 'settings.configuration':
          this.scope.tabName = 'configuration'
      }

      this.scope.switchTab = name => {
        this.scope.tabName = name
      }

      this.scope.$on('loadingContent', (event, data) => {
        this.scope.loadingContent = data.status
        event.preventDefault()
      })
    }
  }
  controllers.controller('settingsCtrl', Main)
})
