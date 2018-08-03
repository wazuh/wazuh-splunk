define([
  '../module',
  'splunkjs/mvc',
  'splunkjs/mvc/layoutview'
], function (
  module,
  mvc,
  LayoutView
  ) {
    'use strict'
    module.controller('mainCtrl', function () {
      new LayoutView({ "hideFooter": false, "hideSplunkBar": false, "hideAppBar": true, "hideChrome": false })
        .render()
        .getContainerElement()
        .appendChild($('.empty-body-class')[0])
    })
  })

