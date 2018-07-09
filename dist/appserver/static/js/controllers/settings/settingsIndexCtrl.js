"use strict";

define(['../module', "splunkjs/mvc", "splunkjs/mvc/utils", "underscore", "splunkjs/mvc/tokenutils", "jquery", "splunkjs/mvc/layoutview", "splunkjs/mvc/simplexml/dashboardview", "splunkjs/mvc/simplexml/searcheventhandler", "splunkjs/mvc/simpleform/input/dropdown", "splunkjs/mvc/searchmanager", "splunkjs/mvc/simplexml/urltokenmodel", "splunkjs/mvc/simpleform/formutils"], function (controllers, mvc, utils, _, TokenUtils, $, LayoutView, Dashboard, SearchEventHandler, DropdownInput, SearchManager, UrlTokenModel, FormUtils) {
  'use strict';

  controllers.controller('settingsIndexCtrl', function ($scope) {
    $scope.message = 'Settings';
    $scope.tabName = '';
    var epoch = new Date().getTime();
    var searchIndexes = '';
    var inputIndexes = '';
    $scope.$on('$destroy', function () {
      searchIndexes = null;
      inputIndexes = null;
    });
    searchIndexes = new SearchManager({
      "id": "searchIndexes" + epoch,
      "cancelOnUnload": true,
      "sample_ratio": null,
      "earliest_time": "2017-03-14T10:0:0",
      "status_buckets": 0,
      "search": "| metasearch index=\"*\" sourcetype=wazuh | stats count by index, sourcetype | fields index",
      "latest_time": "now",
      "app": utils.getCurrentApp(),
      "auto_cancel": 90,
      "preview": true,
      "tokenDependencies": {},
      "runWhenTimeIsUndefined": false
    }, { tokens: true });

    inputIndexes = new DropdownInput({
      "id": "inputIndexes" + epoch,
      "labelField": "index",
      "searchWhenChanged": false,
      "default": "wazuh",
      "valueField": "index",
      "selectFirstChoice": true,
      "showClearButton": false,
      "value": "$form.index$",
      "managerid": "searchIndexes" + epoch,
      "el": $('#inputIndexes')
    }, { tokens: true }).render();
  });
});