define(['../../module'], function(controllers) {
  'use strict'

  class OverviewWelcome {
    /**
     * Class Welcome
     * @param {*} $scope
     * @param {Object} agentsInfo
     * @param {Object} extensions
     */
    constructor(
      $scope,
      agentsInfo,
      extensions,
      $notificationService,
      $currentDataService
    ) {
      this.scope = $scope
      this.notificationService = $notificationService
      this.currentDataService = $currentDataService
      this.currentApi = this.currentDataService.getApi()
      this.scope.extensionsLists = {
        security: false,
        auditing: false,
        threadDetection: false,
        regulatory: false
      }
      this.scope.showRegisterGuide = false
      try {
        this.scope.agentsCountTotal = agentsInfo.data.data.Total - 1
        this.scope.agentsCountActive = agentsInfo.data.data.Active - 1
        this.scope.agentsCountDisconnected = agentsInfo.data.data.Disconnected
        this.scope.agentsCountNeverConnected =
          agentsInfo.data.data['Never Connected']
      } catch (error) {} //eslint-disable-line
      try {
        this.extensions = extensions
        this.scope.extensions = angular.copy(this.extensions)
        this.api = this.currentApi['_key']
      } catch (error) {} //eslint-disable-line
    }

    /**
     * On controller loads
     */
    $onInit() {
      this.refreshExtensions()
      this.scope.showExtensionsLists = card => this.showExtensionsLists(card)
      this.scope.showRegisterAgent = () => this.showRegisterAgent()
      this.scope.toggleExtension = (extension, state) =>
        this.toggleExtension(extension, state)
      this.scope.$applyAsync()
    }

    /**
     * Shows the extensions list to enable or disable them
     */
    showExtensionsLists(card) {
      try {
        this.scope.extensionsLists[card]
          ? (this.scope.extensionsLists[card] = false)
          : (this.scope.extensionsLists[card] = true)
      } catch (error) {
        console.error('Error showing or hiding the extensions list ', error)
      }
    }

    /**
     * Shows/hide the register agent guide
     */
    showRegisterAgent() {
      try {
        this.scope.showRegisterGuide = !this.scope.showRegisterGuide
      } catch (error) {
        console.error('Error showing the register agent guide ', error)
      }
    }

    /**
     * Enable or disable extension
     * @param {String} extension
     * @param {String} state
     */
    toggleExtension(extension, state) {
      try {
        this.extensions[extension] = state.toString()
        this.currentDataService.setExtensions(this.api, this.extensions)
        this.extensions = this.currentDataService.getExtensions(this.api)
        this.refreshExtensions()
      } catch (error) {
        console.error(error)
        this.notificationService.showErrorToast(error)
      }
    }

    /**
     * Refresh the extensions
     */
    refreshExtensions() {
      const keys = Object.keys(this.extensions)
      keys.map(
        key => (this.scope.extensions[key] = this.extensions[key] === 'true')
      )
      /*
      keys.map(key =>
        this.scope.extensions[key] =  this.extensions[key] === 'true'
      )
      */
      this.scope.$applyAsync()
    }
  }
  controllers.controller('overviewWelcomeCtrl', OverviewWelcome)
})
