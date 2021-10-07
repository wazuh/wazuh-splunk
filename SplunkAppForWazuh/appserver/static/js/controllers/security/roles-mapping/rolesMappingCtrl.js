define(['../../module'], function(controllers) {
  'use strict'

  class RolesMapping {
    constructor($scope) {
      this.scope = $scope
    }

    $onInit() {
    }
  }
  controllers.controller('rolesMappingCtrl', RolesMapping)
})
