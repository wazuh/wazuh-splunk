define(['../../module'], function(controllers) {
  'use strict'

  class Users {
    constructor($scope, isAdmin) {
      this.scope = $scope
      this.scope.isAdmin = isAdmin;
    }

    $onInit() {

    }

  }
  controllers.controller('usersCtrl', Users)
  return Users
})
