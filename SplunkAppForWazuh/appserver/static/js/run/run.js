define([
  './module'
], function (
  module
) {
    'use strict';
    module.run(['$rootScope', '$state', '$trace','$transitions','$navigationService', function ($rootScope, $state, $trace, $transitions,$navigationService) {
      // $trace.enable('TRANSITION');
      $navigationService.goToLastState()
      // $transitions.onStart({}, function (transition) {
      //   console.log('trans',transition)
      // });
    }]);
  });

