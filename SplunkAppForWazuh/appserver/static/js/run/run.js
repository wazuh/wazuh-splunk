define([
  './module'
], function (
  module
) {
    'use strict';
    module.run(['$rootScope', '$state', '$trace','$transitions','$navigationService', function ($rootScope, $state, $trace, $transitions,$navigationService) {
      $trace.enable('TRANSITION');
      $navigationService.getLastState()
      $transitions.onStart({}, function (transition) {
        console.log('trans',transition)
      });
    }]);
  });

