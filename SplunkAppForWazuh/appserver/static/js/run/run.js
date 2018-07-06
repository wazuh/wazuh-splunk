define([
  './module'
], function (
  module
) {
    'use strict';
    module.run(['$rootScope', '$state', '$trace','$transitions', function ($rootScope, $state, $trace, $transitions) {
      $trace.enable('TRANSITION');
      $transitions.onStart({}, function (transition) {
        console.log('trans',transition)
      });
    }]);
  });

