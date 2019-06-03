define(['../../module'], function(controllers) {
  'use strict'

  class Extensions {
    constructor($scope, $currentDataService, $notificationService, extensions) {
      this.scope = $scope
      this.scope.extensions = {}
      this.notification = $notificationService
      this.currentApi = $currentDataService.getApi()
      this.getExtensions = $currentDataService.getExtensions
      this.setExtensions = $currentDataService.setExtensions
      this.extensions = extensions
    }

    $onInit() {
      const id = this.currentApi['_key']
      this.scope.toggleExtension = (extension, state) =>
        this.toggleExtension(extension, state)
      this.currentExtensions = this.extensions.data || this.extensions
      const keys = Object.keys(this.currentExtensions)
      keys.map(
        key =>
          (this.scope.extensions[key] =
            this.currentExtensions[key] === 'true' ? true : false)
      )
      this.setExtensions(id, this.currentExtensions)
      this.scope.$applyAsync()
    }

    toggleExtension(extension, state) {
      try {
        const api = this.currentApi['_key']
        this.currentExtensions[extension] = state.toString()
        this.setExtensions(api, this.currentExtensions)
        this.scope.$applyAsync()
      } catch (error) {
        this.notification.showErrorToast(error)
      }
    }
  }
  controllers.controller('extensionsCtrl', Extensions)
})
