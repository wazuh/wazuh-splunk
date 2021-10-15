define(['../../module'], function(controllers) {
  'use strict'

  class Policies {
    constructor($scope) {
      this.scope = $scope
    }

    $onInit() {
    }
  }
  controllers.controller('policiesCtrl', Policies)
})
