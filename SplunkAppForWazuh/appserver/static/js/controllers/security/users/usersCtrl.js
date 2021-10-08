define(['../../module'], function(controllers) {
  'use strict'

  class Users {
    constructor($scope, isAdmin, users) {
      this.scope = $scope
      this.users = users
    }

    $onInit() {
      console.log(this.users);
    }

  }
  controllers.controller('usersCtrl', Users)
})
