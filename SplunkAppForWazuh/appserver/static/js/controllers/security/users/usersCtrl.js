define(['../../module'], function(controllers) {
  'use strict'

  class Users {
    constructor($scope) {
      this.scope = $scope
    }

    $onInit() {
    }
  }
  controllers.controller('usersCtrl', Users)
})
