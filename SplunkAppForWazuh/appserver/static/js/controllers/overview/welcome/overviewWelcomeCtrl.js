define(['../../module'], function (controllers) {
  'use strict'

  class OverviewWelcome {
    /**
     * Class Welcome
     * @param {*} $scope
     * @param {Object} agentsInfo
     * @param {Object} extensions
     */
    constructor($scope, agentsInfo, extensions) {
      this.scope = $scope
      this.scope.extensionsLists = { 'security': false, 'auditing': false, 'threadDetection': false, 'regulatory': false }
      try {
        this.scope.agentsCountTotal = agentsInfo.data.data.Total - 1
        this.scope.agentsCountActive = agentsInfo.data.data.Active - 1
        this.scope.agentsCountDisconnected = agentsInfo.data.data.Disconnected
        this.scope.agentsCountNeverConnected = agentsInfo.data.data['Never Connected']
      } catch (error) { } //eslint-disable-line

      try {
        this.extensions = extensions
      } catch (error) { } //eslint-disable-line
    }

    /**
     * On controller loads
     */
    $onInit() {
      const keys = Object.keys(this.extensions)
      keys.map(key =>
        this.extensions[key] === 'true'
          ? (this.scope[key] = key)
          : (this.scope[key] = null)
      )

      this.scope.showExtensionsLists = card => this.showExtensionsLists(card)
      this.scope.$applyAsync()
    }
    /**
   * Shows the extensions list to enable or disable them
   */
    showExtensionsLists = card => {
      try {
        this.scope.extensionsLists[card] ? this.scope.extensionsLists[card] = false : this.scope.extensionsLists[card] = true
      } catch (error) {
        console.error('Error showing or hiding the extensions list ', error)
      }
    }
  }
  controllers.controller('overviewWelcomeCtrl', OverviewWelcome)
})
