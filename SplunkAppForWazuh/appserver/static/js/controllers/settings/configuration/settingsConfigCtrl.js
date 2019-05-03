define(['../../module'], function (controllers) {
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
      try {
        const id = this.currentApi['_key']
        this.scope.configuration = this.configuration.data

        this.scope.getDescription = key => this.getDescription(key)

      } catch (error) { }

    }

    /**
     * Returns the description from a key
     * @param {String} key 
     */
    getDescription(key) {
      try {
        const description = {
          'log.level': 'Set the app loggin level, allowed values are info and debug.'
        }
        return description[key]
      } catch (error) {
        return false
      }
    }

  }
  controllers.controller('settingsConfigCtrl', Configuration)
})
