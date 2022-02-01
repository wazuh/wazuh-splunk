define(['../../module'], function (controllers) {
  'use strict'

  class About {
    constructor($scope, appInfo) {
      this.scope = $scope
      this.appInfo = appInfo
    }

    $onInit() {
      this.scope.appInfo = this.appInfo
    }
  }
  controllers.controller('aboutCtrl', About)
})
