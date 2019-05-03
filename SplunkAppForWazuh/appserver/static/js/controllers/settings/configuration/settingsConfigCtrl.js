define(['../../module'], function (controllers) {
  'use strict'

  class Configuration {
    constructor($scope, $currentDataService, $notificationService, configuration) {
      this.scope = $scope
      this.scope.extensions = {}
      this.notification = $notificationService
      this.currentApi = $currentDataService.getApi()
      this.getCurrentConfiguration = $currentDataService.getCurrentConfiguration
      this.configuration = configuration
    }

    $onInit() {
      try {
        const id = this.currentApi['_key']
        this.scope.configuration = this.configuration.data

        this.scope.getDescription = key => this.getDescription(key)
        this.scope.switchEdit = (key, value) => this.switchEdit(key, value)
        this.scope.cancelEdition =  () => this.cancelEdition()
        this.scope.setValue = value => this.setValue(value)
        

      } catch (error) { }

    }

    /**
     * Returns the description from a key
     * @param {String} key 
     */
    getDescription(key) {
      try {
        const description = {
          'log.level': 'Set the app loggin level, allowed values are info and debug.',
          'timeout': 'Define the maximun time in seconds the app will wait for an API reponse when making request to it.'
        }
        return description[key]
      } catch (error) {
        return false
      }
    }

    /**
     * Enable edition
     * @param {String} key 
     */
    switchEdit(key, value) {
      try {
        this.scope.editingKey = key
        this.scope.editingNewValue = value
      } catch (error) {
        return false
      }
    }

    /**
     * Cancel the edition
     */
    cancelEdition() {
      this.scope.editingKey = false
      this.scope.editingNewValue = false
    }

    /**
     * Edit the value
     */
    async setValue() {
      try {
        console.log(this.scope.editingNewValue)
        /** TODO: call to an endpoint to overwritte the value */
        this.cancelEdition()
        this.refreshConfig()
      } catch (error) {
        return Promise.reject(error) 
      }
    }

    /**
     * Refresh the configuration
     */
    async refreshConfig() {
      try {
        const config = await this.getCurrentConfiguration()
        this.scope.configuration = config.data
        this.scope.$applyAsync()  
      } catch (error) {
        return Promise.reject(error) 
      }
    }


  }
  controllers.controller('settingsConfigCtrl', Configuration)
})
