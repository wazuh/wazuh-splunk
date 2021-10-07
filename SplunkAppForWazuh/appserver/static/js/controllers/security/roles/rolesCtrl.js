define(['../../module'], function(controllers) {
  'use strict'

  class Roles {
    constructor($scope) {
      this.scope = $scope
    }

    $onInit() {
    }
  }
  controllers.controller('rolesCtrl', Roles)
})
