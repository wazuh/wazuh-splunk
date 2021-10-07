define(['../../module'], function(app) {
  'use strict'

  class MainSecurity {
    constructor($scope, $navigationService, isAdmin) {
      this.navigationService = $navigationService
      this.scope = $scope
      this.scope.isAdmin = isAdmin
    }

    $onInit() {
      const lastState = this.navigationService.getLastState()
      switch (lastState) {
        case 'security.users':
          this.scope.tabName = 'users'
          break
        case 'security.roles':
          this.scope.tabName = 'roles'
          break
        case 'security.polices':
          this.scope.tabName = 'polices'
          break
        case 'security.roles-mapping':
          this.scope.tabName = 'roles-mapping'
          break
      }

      this.scope.switchTab = name => {
        this.scope.tabName = name
      }

      this.scope.$on('loadingContent', (event, data) => {
        this.scope.loadingContent = data.status
        event.preventDefault()
      })

      this.scope.$on('changeSettingsTab', (event, data) => {
        this.scope.tabName = data.tabName
        event.preventDefault()
      })
    }
  }
  app.controller('securityCtrl', MainSecurity)
})
