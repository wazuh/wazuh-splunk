define(['../../module'], function (controllers) {
  'use strict'

  class OverviewWelcome {
    /**
     * Class Welcome
     * @param {*} $scope
     * @param {Object} agentsInfo
     * @param {Object} extensions
     * @param {Object} $notificationService
     * @param {Object} $currentDataService
     * @param {Object} $security_service
     */
    constructor(
      $scope,
      isSplunkAdmin,
      agentsInfo,
      extensions,
      $notificationService,
      $currentDataService,
      $security_service
    ) {
      this.scope = $scope
      this.notification = $notificationService
      this.currentDataService = $currentDataService
      this.currentApi = this.currentDataService.getApi()
      this.scope.extensionsLists = {
        security: false,
        auditing: false,
        threadDetection: false,
        regulatory: false,
      }

      /* RBAC flags */
      this.scope.canReadAgents = $security_service.isAllowed('AGENT_READ', [
        'AGENT_ID',
        'AGENT_GROUP',
      ])
      this.scope.isSplunkAdmin = isSplunkAdmin

      try {
        const status = agentsInfo.data.data.connection
        this.scope.agentsCountTotal = status.total
        this.scope.agentsCountActive = status.active
        this.scope.agentsCountPending = status.pending
        this.scope.agentsCountDisconnected = status.disconnected
        this.scope.agentsCountNeverConnected = status.never_connected
      } catch (error) {} //eslint-disable-line
      try {
        this.extensions = extensions
        this.scope.extensions = angular.copy(this.extensions) // eslint-disable-line
        this.api = this.currentApi['_key']
      } catch (error) {} //eslint-disable-line
    }

    /**
     * On controller loads
     */
    $onInit() {
      this.refreshExtensions()
      this.scope.showExtensionsLists = (card) => this.showExtensionsLists(card)
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
     * Enable or disable extension
     * @param {String} extension
     * @param {String} state
     */
    async toggleExtension(extension, state) {
      try {
        this.extensions[extension] = state.toString()
        await this.currentDataService.setExtensionsById(
          this.api,
          this.extensions
        )
        this.extensions = await this.currentDataService.getExtensionsById(
          this.api
        )
        this.refreshExtensions()
      } catch (error) {
        console.error(error)
        this.notification.showErrorToast(error)
      }
    }

    /**
     * Refresh the extensions
     */
    refreshExtensions() {
      const keys = Object.keys(this.extensions)
      keys.map(
        (key) => (this.scope.extensions[key] = this.extensions[key] === 'true')
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
