define([
  './module',
  'splunkjs/mvc',
  'splunkjs/mvc/layoutview'
], function (
  controllers,
  mvc,
  LayoutView
  ) {
    'use strict';
    controllers.controller('mainCtrl', function ($scope) {
      $scope.message = 'Manager'
      console.log('main ctrl')
      // $('header').remove()
      new LayoutView({ "hideFooter": false, "hideSplunkBar": false, "hideAppBar": true, "hideChrome": false })
        .render()
        .getContainerElement()
        .appendChild($('.empty-body-class')[0])
    });
  });

