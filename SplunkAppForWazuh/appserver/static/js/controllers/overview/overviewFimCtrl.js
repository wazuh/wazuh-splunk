define([
  '../module',
  "splunkjs/mvc",
  "splunkjs/mvc/utils",
  "splunkjs/mvc/tokenutils",
  "underscore",
  "jquery",
  "splunkjs/mvc/simplexml",
  "splunkjs/mvc/simplexml/dashboardview",
  "splunkjs/mvc/simplexml/element/chart",
  "splunkjs/mvc/simplexml/element/table",
  "splunkjs/mvc/simpleform/formutils",
  "splunkjs/mvc/simplexml/searcheventhandler",
  "splunkjs/mvc/simpleform/input/timerange",
  "splunkjs/mvc/searchmanager",
  "splunkjs/mvc/simplexml/urltokenmodel"
], function (controllers,
  mvc,
  utils,
  TokenUtils,
  _,
  $,
  DashboardController,
  Dashboard,
  ChartElement,
  TableElement,
  FormUtils,
  SearchEventHandler,
  TimeRangeInput,
  SearchManager,
  UrlTokenModel) {
    'use strict';

    controllers.controller('overviewFimCtrl', function ($scope, $currentApiIndexService) {
      const vm = this
      const epoch = (new Date).getTime()
      // Create token namespaces
      const urlTokenModel = new UrlTokenModel({ id: 'tokenModel' + epoch })
      mvc.Components.registerInstance('url' + epoch, urlTokenModel)
      const defaultTokenModel = mvc.Components.getInstance('default', { create: true })
      const submittedTokenModel = mvc.Components.getInstance('submitted', { create: true })
      const selectedIndex = $currentApiIndexService.getIndex()

      const filter = $currentApiIndexService.getFilter()
      const nameFilter = filter[0] + '=' + filter[1]
      urlTokenModel.on('url:navigate', function () {
        defaultTokenModel.set(urlTokenModel.toJSON())
        if (!_.isEmpty(urlTokenModel.toJSON()) && !_.all(urlTokenModel.toJSON(), _.isUndefined)) {
          submitTokens()
        } else {
          submittedTokenModel.clear()
        }
      })

      // Initialize tokens
      defaultTokenModel.set(urlTokenModel.toJSON())

      function submitTokens() {
        // Copy the contents of the defaultTokenModel to the submittedTokenModel and urlTokenModel
        FormUtils.submitForm({ replaceState: pageLoading })
      }

      function setToken(name, value) {
        defaultTokenModel.set(name, value)
        submittedTokenModel.set(name, value)
      }

      function unsetToken(name) {
        defaultTokenModel.unset(name)
        submittedTokenModel.unset(name)
      }

      submittedTokenModel.on("change:authSuccessToken", (model, authSuccessToken, options) => {
        const tokHTMLJS = submittedTokenModel.get("authSuccessToken")
        if (typeof tokHTMLJS !== 'undefined' && tokHTMLJS !== 'undefined') {
          console.log('second tokhtmljs ', tokHTMLJS)
          vm.authSuccess = tokHTMLJS
          if (!$scope.$$phase) $scope.$digest()
        }
      })

      let pageLoading = true

      let eventsOverTimeSearch = ''
      let topUserOwnersSearch = ''
      let topGroupOwnersSearch = ''
      let topFileChangesSearch = ''
      let rootUserFileChangesSearch = ''
      let wordWritableFilesSearch = ''
      let eventsSummarySearch = ''
      let filesAddedSearch = ''
      let filesModifiedSearch = ''
      let filesDeletedSearch = ''


      let eventsOverTimeElement = ''
      let topUserOwnersElement = ''
      let topGroupOwnersElement = ''
      let topFileChangesElement = ''
      let rootUserFileChangesElement = ''
      let wordWritableFilesElement = ''
      let eventsSummaryElement = ''

      /**
       * When controller is destroyed
       */
      $scope.$on('$destroy', () => {
        eventsOverTimeSearch = null
        topUserOwnersSearch = null
        topGroupOwnersSearch = null
        topFileChangesSearch = null
        rootUserFileChangesSearch = null
        wordWritableFilesSearch = null
        eventsSummarySearch = null
        filesAddedSearch = null
        filesModifiedSearch = null
        filesDeletedSearch = null

        eventsOverTimeElement = null
        topUserOwnersElement = null
        topGroupOwnersElement = null
        topFileChangesElement = null
        rootUserFileChangesElement = null
        wordWritableFilesElement = null
        eventsSummaryElement = null
      })


      // Listen for a change to the token tokenTotalAlerts value
      filesAddedSearch = new SearchManager({
        "id": "filesAddedSearch" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index=" + selectedIndex + " " + nameFilter + " sourcetype=\"wazuh\" \"rule.groups\"=\"syscheck\" |stats count",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": true
      }, { tokens: true, tokenNamespace: "submitted" })

      var input1 = new TimeRangeInput({
        "id": "input1" + epoch,
        "default": { "latest_time": "now", "earliest_time": "-24h@h" },
        "searchWhenChanged": true,
        "earliest_time": "$form.when.earliest$",
        "latest_time": "$form.when.latest$",
        "el": $('#input1')
      }, { tokens: true }).render()

      input1.on("change", function (newValue) {
        FormUtils.handleValueChange(input1)
      });

      new SearchEventHandler({
        managerid: "filesAddedSearch" + epoch,
        event: "done",
        conditions: [
          {
            attr: "any",
            value: "*",
            actions: [
              { "type": "set", "token": "tokHTML", "value": "$result.count$" },
            ]
          }
        ]
      })

      submittedTokenModel.on("change:tokHTML", (model, tokHTML, options) => {
        const tokHTMLJS = submittedTokenModel.get("tokHTML")
        if (typeof tokHTMLJS !== 'undefined' && tokHTMLJS !== 'undefined') {
          vm.filesAdded = tokHTMLJS
          if (!$scope.$$phase) $scope.$digest()
        }
      })

      // Listen for a change to the token tokenTotalAlerts value
      filesModifiedSearch = new SearchManager({
        "id": "filesModifiedSearch" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index=" + selectedIndex + " " + nameFilter + " sourcetype=\"wazuh\" \"Integrity checksum changed\" location!=\"syscheck-registry\" \"rule.groups\"=\"syscheck\" | stats count",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": true
      }, { tokens: true, tokenNamespace: "submitted" })

      new SearchEventHandler({
        managerid: "filesModifiedSearch" + epoch,
        event: "done",
        conditions: [
          {
            attr: "any",
            value: "*",
            actions: [
              { "type": "set", "token": "filesModifiedToken", "value": "$result.count$" },
            ]
          }
        ]
      })

      submittedTokenModel.on("change:filesModifiedToken", (model, filesModifiedToken, options) => {
        const filesModifiedTokenJS = submittedTokenModel.get("filesModifiedToken")
        if (typeof filesModifiedTokenJS !== 'undefined' && filesModifiedTokenJS !== 'undefined') {
          vm.filesModified = filesModifiedTokenJS
          console.log('files modified ',filesModifiedTokenJS)

          if (!$scope.$$phase) $scope.$digest()
        }
      })

      // Listen for a change to the token tokenTotalAlerts value
      filesDeletedSearch = new SearchManager({
        "id": "filesDeletedSearch" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index="+selectedIndex+" "+nameFilter+" sourcetype=\"wazuh\" \"was deleted\" location!=\"syscheck-registry\" \"rule.groups\"=\"syscheck\" | stats count",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": true
      }, { tokens: true, tokenNamespace: "submitted" })

      new SearchEventHandler({
        managerid: "filesDeletedSearch" + epoch,
        event: "done",
        conditions: [
          {
            attr: "any",
            value: "*",
            actions: [
              { "type": "set", "token": "filesDeletedToken", "value": "$result.count$" },
            ]
          }
        ]
      })

      submittedTokenModel.on("change:filesDeletedToken", (model, filesDeletedToken, options) => {
        const filesDeletedTokenJS = submittedTokenModel.get("filesDeletedToken")
        if (typeof filesDeletedTokenJS !== 'undefined' && filesDeletedTokenJS !== 'undefined') {
          vm.filesDeleted = filesDeletedTokenJS
          console.log('files deleted ',filesDeletedTokenJS)
          if (!$scope.$$phase) $scope.$digest()
        }
      })

      eventsOverTimeSearch = new SearchManager({
        "id": "eventsOverTimeSearch"+epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index=wazuh rule.groups=syscheck | timechart span=12h count by rule.description",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })


      eventsOverTimeElement = new ChartElement({
        "id": "eventsOverTimeElement"+epoch,
        "charting.axisY2.scale": "inherit",
        "trellis.size": "medium",
        "charting.chart.stackMode": "default",
        "resizable": true,
        "charting.layout.splitSeries.allowIndependentYRanges": "0",
        "charting.drilldown": "none",
        "charting.chart.nullValueMode": "gaps",
        "charting.axisTitleY2.visibility": "visible",
        "charting.chart": "area",
        "trellis.scales.shared": "1",
        "charting.layout.splitSeries": "0",
        "charting.chart.style": "shiny",
        "charting.legend.labelStyle.overflowMode": "ellipsisMiddle",
        "charting.axisTitleX.visibility": "collapsed",
        "charting.axisTitleY.visibility": "collapsed",
        "charting.axisX.scale": "linear",
        "charting.chart.bubbleMinimumSize": "10",
        "charting.axisLabelsX.majorLabelStyle.overflowMode": "ellipsisNone",
        "charting.axisY2.enabled": "0",
        "trellis.enabled": "0",
        "charting.legend.placement": "bottom",
        "charting.chart.bubbleSizeBy": "area",
        "charting.chart.bubbleMaximumSize": "50",
        "charting.axisLabelsX.majorLabelStyle.rotation": "0",
        "charting.axisY.scale": "log",
        "charting.chart.showDataLabels": "none",
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "managerid": "eventsOverTimeSearch"+epoch,
        "el": $('#eventsOverTimeElement')
      }, { tokens: true, tokenNamespace: "submitted" }).render()



      DashboardController.onReady(function () {
        if (!submittedTokenModel.has('earliest') && !submittedTokenModel.has('latest')) {
          submittedTokenModel.set({ earliest: '0', latest: '' });
        }
      });

      // Initialize time tokens to default
      if (!defaultTokenModel.has('earliest') && !defaultTokenModel.has('latest')) {
        defaultTokenModel.set({ earliest: '0', latest: '' });
      }

      submitTokens();
      //
      // DASHBOARD READY
      //

      DashboardController.ready();

    });
  });

