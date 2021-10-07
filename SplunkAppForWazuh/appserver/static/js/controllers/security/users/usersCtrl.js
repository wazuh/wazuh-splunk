define(['../../module'], function(controllers) {
  'use strict'

  class Users {
    constructor($scope) {
      this.scope = $scope
    }

    $onInit() {
      console.log("init")
    }
  }
  controllers.controller('usersCtrl', Users)
})
