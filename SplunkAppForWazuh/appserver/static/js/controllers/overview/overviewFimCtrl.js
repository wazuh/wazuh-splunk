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

    'use strict'

    controllers.controller('overviewFimCtrl', function ($scope, $state, $stateParams, $currentDataService) {
      const vm = this
      const epoch = (new Date).getTime()
      // Create token namespaces
      const urlTokenModel = new UrlTokenModel({ id: 'tokenModel' + epoch })
      mvc.Components.registerInstance('url' + epoch, urlTokenModel)
      const defaultTokenModel = mvc.Components.getInstance('default', { create: true })
      const submittedTokenModel = mvc.Components.getInstance('submitted', { create: true })

      let filters = $currentDataService.getSerializedFilters()

      urlTokenModel.on('url:navigate', function () {
        defaultTokenModel.set(urlTokenModel.toJSON())
        if (!_.isEmpty(urlTokenModel.toJSON()) && !_.all(urlTokenModel.toJSON(), _.isUndefined)) {
          submitTokens()
        } else {
          submittedTokenModel.clear()
        }
      })

      /**
       * Fires all the queries
       */
      const launchSearches = () => {
        filters = $currentDataService.getSerializedFilters()
        $state.reload();
        // searches.map(search => search.startSearch())
      }

      $scope.$on('deletedFilter', () => {
        launchSearches()
      })

      $scope.$on('barFilter', () => {
        launchSearches()
      })
      // Initialize tokens
      defaultTokenModel.set(urlTokenModel.toJSON())

      const submitTokens = () => {
        FormUtils.submitForm({ replaceState: pageLoading })
      }

      const setToken = (name, value) => {
        defaultTokenModel.set(name, value)
        submittedTokenModel.set(name, value)
      }

      const unsetToken = (name) => {
        defaultTokenModel.unset(name)
        submittedTokenModel.unset(name)
      }


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
      let input1 = ''
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
        eventsOverTimeSearch.cancel()
        topUserOwnersSearch.cancel()
        topGroupOwnersSearch.cancel()
        topFileChangesSearch.cancel()
        rootUserFileChangesSearch.cancel()
        wordWritableFilesSearch.cancel()
        eventsSummarySearch.cancel()
        filesAddedSearch.cancel()
        filesModifiedSearch.cancel()
        filesDeletedSearch.cancel()
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
        input1 = null
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
        "search": `${filters} sourcetype=\"wazuh\" \"rule.groups\"=\"syscheck\" |stats count`,
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": true
      }, { tokens: true, tokenNamespace: "submitted" })

      new SearchEventHandler({
        managerid: "filesAddedSearch" + epoch,
        event: "done",
        conditions: [
          {
            attr: "any",
            value: "*",
            actions: [
              { "type": "set", "token": "authSuccessToken", "value": "$result.count$" },
            ]
          }
        ]
      })
      filesAddedSearch.on('search:done', () => {
        const authSuccessTokenJS = submittedTokenModel.get("authSuccessToken")
        if (authSuccessTokenJS || authSuccessTokenJS !== '$result.count$') {
          vm.filesAdded = authSuccessTokenJS
          if (!$scope.$$phase) $scope.$digest()
        } else {
          vm.filesAdded = '0'
          if (!$scope.$$phase) $scope.$digest()
        }
      })
      submittedTokenModel.on("change:authSuccessToken", (model, authSuccessToken, options) => {
        const authSuccessTokenJS = submittedTokenModel.get("authSuccessToken")
        if (typeof authSuccessTokenJS !== 'undefined' && authSuccessTokenJS !== 'undefined') {
          vm.filesAdded = authSuccessTokenJS
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
        "search": `${filters} sourcetype=\"wazuh\" \"Integrity checksum changed\" location!=\"syscheck-registry\" \"rule.groups\"=\"syscheck\" | stats count`,
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
      filesModifiedSearch.on('search:done', () => {
        const filesModifiedTokenJS = submittedTokenModel.get("filesModifiedToken")
        if (filesModifiedTokenJS || filesModifiedTokenJS !== '$result.count$') {
          vm.filesModified = filesModifiedTokenJS
          if (!$scope.$$phase) $scope.$digest()
        } else {
          vm.filesModified = '0'
          if (!$scope.$$phase) $scope.$digest()
        }
      })
      submittedTokenModel.on("change:filesModifiedToken", (model, filesModifiedToken, options) => {
        const filesModifiedTokenJS = submittedTokenModel.get("filesModifiedToken")
        if (typeof filesModifiedTokenJS !== 'undefined' && filesModifiedTokenJS !== 'undefined') {
          vm.filesModified = filesModifiedTokenJS
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
        "search": `${filters} sourcetype=\"wazuh\" \"was deleted\" location!=\"syscheck-registry\" \"rule.groups\"=\"syscheck\" | stats count`,
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
      filesDeletedSearch.on('search:done', () => {
        const filesDeletedTokenJS = submittedTokenModel.get("filesDeletedToken")
        if (filesDeletedTokenJS || filesDeletedTokenJS !== '$result.count$') {
          vm.filesDeleted = filesDeletedTokenJS
          if (!$scope.$$phase) $scope.$digest()
        } else {
          vm.filesDeleted = '0'
          if (!$scope.$$phase) $scope.$digest()
        }
      })
      submittedTokenModel.on("change:filesDeletedToken", (model, filesDeletedToken, options) => {
        const filesDeletedTokenJS = submittedTokenModel.get("filesDeletedToken")
        if (typeof filesDeletedTokenJS !== 'undefined' && filesDeletedTokenJS !== 'undefined') {
          vm.filesDeleted = filesDeletedTokenJS
          if (!$scope.$$phase) $scope.$digest()
        }
      })

      eventsOverTimeSearch = new SearchManager({
        "id": "eventsOverTimeSearch" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": `${filters} sourcetype=\"wazuh\"  \"rule.groups\"=\"syscheck\" | timechart span=12h count by rule.description`,
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })


      eventsOverTimeElement = new ChartElement({
        "id": "eventsOverTimeElement" + epoch,
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
        "managerid": "eventsOverTimeSearch" + epoch,
        "el": $('#eventsOverTimeElement')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      topUserOwnersSearch = new SearchManager({
        "id": "topUserOwnersSearch" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": `${filters} sourcetype=\"wazuh\" uname_after| top limit=20 \"syscheck.uname_after\"`,
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      topUserOwnersElement = new ChartElement({
        "id": "topUserOwnersElement" + epoch,
        "charting.axisY2.scale": "inherit",
        "trellis.size": "medium",
        "charting.chart.stackMode": "default",
        "resizable": true,
        "charting.layout.splitSeries.allowIndependentYRanges": "0",
        "charting.drilldown": "none",
        "charting.chart.nullValueMode": "gaps",
        "charting.axisTitleY2.visibility": "visible",
        "charting.chart": "pie",
        "trellis.scales.shared": "1",
        "charting.layout.splitSeries": "0",
        "charting.chart.style": "shiny",
        "charting.legend.labelStyle.overflowMode": "ellipsisMiddle",
        "charting.axisTitleX.visibility": "visible",
        "charting.axisTitleY.visibility": "visible",
        "charting.axisX.scale": "linear",
        "charting.chart.bubbleMinimumSize": "10",
        "charting.axisLabelsX.majorLabelStyle.overflowMode": "ellipsisNone",
        "charting.axisY2.enabled": "0",
        "trellis.enabled": "0",
        "charting.legend.placement": "right",
        "charting.chart.bubbleSizeBy": "area",
        "charting.chart.bubbleMaximumSize": "50",
        "charting.axisLabelsX.majorLabelStyle.rotation": "0",
        "charting.axisY.scale": "linear",
        "charting.chart.showDataLabels": "none",
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "managerid": "topUserOwnersSearch" + epoch,
        "el": $('#topUserOwnersElement')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      topGroupOwnersSearch = new SearchManager({
        "id": "topGroupOwnersSearch" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": `${filters} sourcetype=\"wazuh\" uname_after syscheck.gname_after!=\"\"| top limit=20 \"syscheck.gname_after\"`,
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      topGroupOwnersElement = new ChartElement({
        "id": "topGroupOwnersElement" + epoch,
        "charting.axisY2.scale": "inherit",
        "trellis.size": "medium",
        "charting.chart.stackMode": "default",
        "resizable": true,
        "charting.layout.splitSeries.allowIndependentYRanges": "0",
        "charting.drilldown": "none",
        "charting.chart.nullValueMode": "gaps",
        "charting.axisTitleY2.visibility": "visible",
        "charting.chart": "column",
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
        "charting.legend.placement": "none",
        "charting.chart.bubbleSizeBy": "area",
        "charting.chart.bubbleMaximumSize": "50",
        "charting.axisLabelsX.majorLabelStyle.rotation": "0",
        "charting.axisY.scale": "linear",
        "charting.chart.showDataLabels": "none",
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "managerid": "topGroupOwnersSearch" + epoch,
        "el": $('#topGroupOwnersElement')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      topFileChangesSearch = new SearchManager({
        "id": "topFileChangesSearch" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": `${filters} sourcetype=\"wazuh\" \"Integrity checksum changed\" location!=\"syscheck-registry\" syscheck.path=\"*\" | top syscheck.path`,
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      topFileChangesElement = new ChartElement({
        "id": "topFileChangesElement" + epoch,
        "charting.axisY2.scale": "inherit",
        "trellis.size": "medium",
        "charting.chart.stackMode": "default",
        "resizable": true,
        "charting.layout.splitSeries.allowIndependentYRanges": "0",
        "charting.drilldown": "none",
        "charting.chart.nullValueMode": "gaps",
        "charting.axisTitleY2.visibility": "visible",
        "charting.chart": "pie",
        "trellis.scales.shared": "1",
        "charting.layout.splitSeries": "0",
        "charting.chart.style": "shiny",
        "charting.legend.labelStyle.overflowMode": "ellipsisMiddle",
        "charting.axisTitleX.visibility": "visible",
        "charting.axisTitleY.visibility": "visible",
        "charting.axisX.scale": "linear",
        "charting.chart.bubbleMinimumSize": "10",
        "charting.axisLabelsX.majorLabelStyle.overflowMode": "ellipsisNone",
        "charting.axisY2.enabled": "0",
        "trellis.enabled": "0",
        "charting.legend.placement": "right",
        "charting.chart.bubbleSizeBy": "area",
        "charting.chart.bubbleMaximumSize": "50",
        "charting.axisLabelsX.majorLabelStyle.rotation": "0",
        "charting.axisY.scale": "linear",
        "charting.chart.showDataLabels": "none",
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "managerid": "topFileChangesSearch" + epoch,
        "el": $('#topFileChangesElement')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      rootUserFileChangesSearch = new SearchManager({
        "id": "rootUserFileChangesSearch" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": `${filters} sourcetype=\"wazuh\" \"Integrity checksum changed\" location!=\"syscheck-registry\" syscheck.path=\"*\" | search root | top limit=10 syscheck.path`,
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      rootUserFileChangesElement = new ChartElement({
        "id": "rootUserFileChangesElement" + epoch,
        "charting.axisY2.scale": "inherit",
        "trellis.size": "medium",
        "charting.chart.stackMode": "default",
        "resizable": true,
        "charting.layout.splitSeries.allowIndependentYRanges": "0",
        "charting.drilldown": "none",
        "charting.chart.nullValueMode": "gaps",
        "charting.axisTitleY2.visibility": "visible",
        "charting.chart": "pie",
        "trellis.scales.shared": "1",
        "charting.layout.splitSeries": "0",
        "charting.chart.style": "shiny",
        "charting.legend.labelStyle.overflowMode": "ellipsisMiddle",
        "charting.axisTitleX.visibility": "visible",
        "charting.axisTitleY.visibility": "visible",
        "charting.axisX.scale": "linear",
        "charting.chart.bubbleMinimumSize": "10",
        "charting.axisLabelsX.majorLabelStyle.overflowMode": "ellipsisNone",
        "charting.axisY2.enabled": "0",
        "trellis.enabled": "0",
        "charting.legend.placement": "right",
        "charting.chart.bubbleSizeBy": "area",
        "charting.chart.bubbleMaximumSize": "50",
        "charting.axisLabelsX.majorLabelStyle.rotation": "0",
        "charting.axisY.scale": "linear",
        "charting.chart.showDataLabels": "none",
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "managerid": "topFileChangesSearch" + epoch,
        "el": $('#rootUserFileChangesElement')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      wordWritableFilesSearch = new SearchManager({
        "id": "wordWritableFilesSearch" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": `${filters} sourcetype=\"wazuh\" rule.groups=\"syscheck\" \"syscheck.perm_after\"=* | top \"syscheck.perm_after\" showcount=false showperc=false | head 1`,
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      wordWritableFilesElement = new ChartElement({
        "id": "wordWritableFilesElement" + epoch,
        "numberPrecision": "0",
        "trellis.size": "medium",
        "unitPosition": "after",
        "useColors": "1",
        "colorMode": "block",
        "trendDisplayMode": "absolute",
        "colorBy": "value",
        "trendColorInterpretation": "standard",
        "drilldown": "all",
        "rangeColors": "[\"0x65a637\",\"0x65a637\"]",
        "trellis.enabled": "0",
        "showTrendIndicator": "1",
        "trellis.scales.shared": "1",
        "height": "50",
        "rangeValues": "[0]",
        "showSparkline": "1",
        "useThousandSeparators": "0",
        "managerid": "wordWritableFilesSearch" + epoch,
        "el": $('#wordWritableFilesSearch')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      eventsSummarySearch = new SearchManager({
        "id": "eventsSummarySearch" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": `${filters} sourcetype=\"wazuh\" rule.groups=\"syscheck\"  |stats count sparkline by agent.name, syscheck.path syscheck.event, rule.description | sort count DESC | rename agent.name as Agent, syscheck.path as File, syscheck.event as Event, rule.description as Description, count as Count`,
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      eventsSummaryElement = new TableElement({
        "id": "eventsSummaryElement" + epoch,
        "dataOverlayMode": "heatmap",
        "drilldown": "cell",
        "percentagesRow": "false",
        "rowNumbers": "true",
        "totalsRow": "true",
        "wrap": "false",
        "managerid": "eventsSummarySearch" + epoch,
        "el": $('#eventsSummaryElement')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      input1 = new TimeRangeInput({
        "id": "input1" + epoch,
        "default": { "latest_time": "now", "earliest_time": "-24h@h" },
        "searchWhenChanged": true,
        "earliest_time": "$form.when.earliest$",
        "latest_time": "$form.when.latest$",
        "el": $('#input1')
      }, { tokens: true }).render()

      input1.on("change", function (newValue) {
        if (newValue && input1)
          FormUtils.handleValueChange(input1)
      })

      DashboardController.onReady(function () {
        if (!submittedTokenModel.has('earliest') && !submittedTokenModel.has('latest')) {
          submittedTokenModel.set({ earliest: '0', latest: '' })
        }
      })

      // Initialize time tokens to default
      if (!defaultTokenModel.has('earliest') && !defaultTokenModel.has('latest')) {
        defaultTokenModel.set({ earliest: '0', latest: '' })
      }

      submitTokens()

      DashboardController.ready()

    })
  })
