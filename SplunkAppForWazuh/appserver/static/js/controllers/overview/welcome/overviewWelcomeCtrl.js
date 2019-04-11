define(['../../module'], function(controllers) {
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
      try {
        this.scope.agentsCountTotal = agentsInfo.data.data.Total - 1
        this.scope.agentsCountActive = agentsInfo.data.data.Active - 1
        this.scope.agentsCountDisconnected = agentsInfo.data.data.Disconnected
        this.scope.agentsCountNeverConnected =
          agentsInfo.data.data['Never Connected']
      } catch (error) {} //eslint-disable-line

      try {
        this.extensions = extensions
      } catch (error) {} //eslint-disable-line
    }

    /**
     * On controller loads
     */
    $onInit() {
      this.scope.selectedNavTab = 'logs'
      const keys = Object.keys(this.extensions)
      keys.map(key =>
        this.extensions[key] === 'true'
          ? (this.scope[key] = key)
          : (this.scope[key] = null)
      )
      if (!this.scope.$$phase) this.scope.$digest()
    }
  }
  controllers.controller('overviewWelcomeCtrl', OverviewWelcome)
})
