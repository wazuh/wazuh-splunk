define(['../../module'], function (controllers) {
  'use strict'

  class Configuration {
    constructor(
      $scope,
      $currentDataService,
      $notificationService,
      configuration,
      $requestService,
      isWazuhAdmin
    ) {
      this.scope = $scope
      this.scope.extensions = {}
      this.scope.isWazuhAdmin = isWazuhAdmin
      this.notification = $notificationService
      this.currentApi = $currentDataService.getApi()
      this.getCurrentConfiguration = $currentDataService.getCurrentConfiguration
      this.configuration = configuration
      this.req = $requestService
    }

    $onInit() {
      try {
        this.scope.configuration = this.configuration.data.data
        this.dropDownValue = false
        this.editingNewValue = false
        this.scope.logLevelOptions = ['info', 'debug']
        this.scope.getDescription = (key) => this.getDescription(key)
        this.scope.switchEdit = (key, value) => this.switchEdit(key, value)
        this.scope.cancelEdition = () => this.cancelEdition()
        this.scope.setValue = (key) => this.setValue(key)
        this.scope.selectValue = (value) => this.selectValue(value)
      } catch (error) {
        console.error('onInit err : ', error)
      }
    }

    /**
     * Returns the description from a key
     * @param {String} key
     */
    getDescription(key) {
      try {
        const description = {
          'log.level':
            'Set the app logging level, allowed values are info and debug.',
          timeout:
            'Define the maximum time in seconds the app will wait for an API response when making a request to it.',
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
        this.editingNewValue = value
        if (key !== 'log.level') {
          this.inputEnabled = true
        }
      } catch (error) {
        return false
      }
    }

    /**
     * Cancel the edition
     */
    cancelEdition() {
      this.scope.editingKey = false
      this.editingNewValue = false
      this.inputEnabled = false
    }

    /**
     * Edit the value
     */
    async setValue(key) {
      try {
        const value = this.inputEnabled
          ? this.editingNewValue
          : this.dropDownValue
        this.validateValue(key, value)
        this.scope.configuration[key] = value
        const result = await this.req.httpReq(
          'POST',
          '/config/update_config',
          this.scope.configuration
        )
        if (result.data && result.data.data && !result.data.data.error) {
          this.notification.showSuccessToast(
            result.data.data.data ||
              'Configuration updated. Restart Splunk to apply changes.'
          )
          this.cancelEdition()
          this.refreshConfig()
        } else {
          throw result.data.data.error
        }
      } catch (error) {
        this.notification.showErrorToast(
          error || 'Error updating the configuration.'
        )
      }
    }

    /**
     * Select value from dropdown
     * @param {String} value
     */
    selectValue(value) {
      this.dropDownValue = value
    }

    /**
     * Refresh the configuration
     */
    async refreshConfig() {
      try {
        const config = await this.getCurrentConfiguration()
        this.scope.configuration = config.data.data
        this.scope.$applyAsync()
      } catch (error) {
        return Promise.reject(error)
      }
    }

    /**
     * Validate inserted value
     * @param {String} key
     * @param {String} key
     */
    validateValue(key, value) {
      if (key === 'timeout') {
        if (!Number(value)) {
          throw 'Incorrect format'
        }
      }
      return
    }
  }
  controllers.controller('settingsConfigCtrl', Configuration)
})
