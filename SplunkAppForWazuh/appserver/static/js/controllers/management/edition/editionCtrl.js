define(['../../module'], function(controllers) {
  'use strict'

  class Edition {
    /**
     * Class Status
     * @param {*} $scope
     * @param {Array} nodes
     * @param {Boolean} isAdmin
     */
    constructor($scope, nodes, isAdmin) {
      this.scope = $scope
      this.nodes = nodes
      console.log('is admin ', isAdmin)
    }
    /**
     * On controller loads
     */
    $onInit() {
      if (this.nodes && Array.isArray(this.nodes)) {
        this.scope.nodes = this.nodes.items.filter(node => node.name)
      }
    }
  }

  controllers.controller('editionCtrl', Edition)
})
