define(['../../module'], function(controllers) {
  'use strict'

  class Users {
    constructor($scope, isAdmin) {
      this.scope = $scope
    }

    $onInit() {

    }

  }
  controllers.controller('usersCtrl', Users)
})
