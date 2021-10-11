define(['../../module'], function(controllers) {
  'use strict'

  class Policies {
    constructor($scope) {
      this.scope = $scope
    }

    $onInit() {
      console.log("this.scope");
      console.log(this.scope);
    }
  }
  controllers.controller('policiesCtrl', Policies)
})
