define(['../../module'], function (app) {
  'use strict'

  class MainSecurity {
    constructor($scope, $navigationService) {
      this.navigationService = $navigationService
      this.scope = $scope
      this.scope.message = 'Security'
      this.scope.tabName = ''
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
        case 'security.policies':
          this.scope.tabName = 'policies'
          break
        case 'security.roles-mapping':
          this.scope.tabName = 'roles-mapping'
          break
      }

      this.scope.switchTab = (name) => {
        this.scope.tabName = name
      }

      this.scope.$on('loadingContent', (event, data) => {
        this.scope.loadingContent = data.status
        event.preventDefault()
      })
    }
  }
  app.controller('securityCtrl', MainSecurity)
})
