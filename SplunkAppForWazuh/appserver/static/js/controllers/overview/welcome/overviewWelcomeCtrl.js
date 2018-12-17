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
      this.scope.agentsCountTotal = agentsInfo.data.data.Total - 1
      this.scope.agentsCountActive = agentsInfo.data.data.Active - 1
      this.scope.agentsCountDisconnected = agentsInfo.data.data.Disconnected
      this.scope.agentsCountNeverConnected =
        agentsInfo.data.data['Never Connected']
      this.extensions = extensions
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
      if (!this.scope.$$phase) this.scope.$digest()
    }
  }
  controllers.controller('overviewWelcomeCtrl', OverviewWelcome)
})
