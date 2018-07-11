define([
  './module'
], function (
  module
) {
    'use strict';
    module.run(['$rootScope', '$state', '$trace','$transitions','$navigationService', function ($rootScope, $state, $trace, $transitions,$navigationService) {
      $navigationService.goToLastState()

    }]);
  });

