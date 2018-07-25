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

    controllers.controller('overviewOpenScapCtrl', function ($scope, $currentApiIndexService) {
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
      let pageLoading = true

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


      const input1 = new TimeRangeInput({
        "id": "input1" + epoch,
        "searchWhenChanged": true,
        "default": { "latest_time": "now", "earliest_time": "-24h@h" },
        "earliest_time": "$form.when.earliest$",
        "latest_time": "$form.when.latest$",
        "el": $('#input1')
      }, { tokens: true }).render()

      input1.on("change", (newValue) => {
        console.log('change')
        FormUtils.handleValueChange(input1)
      })

      /**
       * When controller is destroyed
       */
      $scope.$on('$destroy', () => {

      })

      // Listen for a change to the token tokenTotalAlerts value
      let filesAddedSearch = new SearchManager({
        "id": "filesAddedSearch" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index=" + selectedIndex + " " + nameFilter + "  sourcetype=wazuh oscap.scan.score=* | stats latest(oscap.scan.score) as Latest",
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
              { "type": "set", "token": "filesAddedToken", "value": "$result.count$" },
            ]
          }
        ]
      })

      submittedTokenModel.on("change:filesAddedToken", (model, filesAddedToken, options) => {
        const filesAddedTokenJS = submittedTokenModel.get("filesAddedToken")
        if (typeof filesAddedTokenJS !== 'undefined' && filesAddedTokenJS !== 'undefined' && filesAddedTokenJS !== '$result.count$') {
          vm.scapLastScore = filesAddedTokenJS
          if (!$scope.$$phase) $scope.$digest()
        } else {
          vm.scapLastScore = 0
          if (!$scope.$$phase) $scope.$digest()
        }
      })

      // Listen for a change to the token tokenTotalAlerts value
      let readFilesSearch = new SearchManager({
        "id": "readFilesSearch" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index=" + selectedIndex + " " + nameFilter + " sourcetype=wazuh oscap.scan.score=* | stats max(oscap.scan.score)",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": true
      }, { tokens: true, tokenNamespace: "submitted" })

      new SearchEventHandler({
        managerid: "readFilesSearch" + epoch,
        event: "done",
        conditions: [
          {
            attr: "any",
            value: "*",
            actions: [
              { "type": "set", "token": "readFilesToken", "value": "$result.count$" },
            ]
          }
        ]
      })

      submittedTokenModel.on("change:readFilesToken", (model, readFilesToken, options) => {
        const readFilesTokenJS = submittedTokenModel.get("readFilesToken")
        if (typeof readFilesTokenJS !== 'undefined' && readFilesTokenJS !== 'undefined' && readFilesTokenJS !== '$result.count$') {
          vm.scapHighestScore = readFilesTokenJS
          console.log('readed files ', readFilesTokenJS)
          if (!$scope.$$phase) $scope.$digest()
        } else {
          vm.scapHighestScore = 0
          if (!$scope.$$phase) $scope.$digest()
        }
      })

      // Listen for a change to the token tokenTotalAlerts value
      let modifiedFiles = new SearchManager({
        "id": "modifiedFiles" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index=" + selectedIndex + " " + nameFilter + " sourcetype=wazuh oscap.scan.score=* | stats min(oscap.scan.score)",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": true
      }, { tokens: true, tokenNamespace: "submitted" })

      new SearchEventHandler({
        managerid: "modifiedFiles" + epoch,
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
        const filesDeletedTokenJS = submittedTokenModel.get("filesModifiedToken")
        if (typeof filesModifiedTokenJS !== 'undefined' && filesModifiedTokenJS !== 'undefined' && filesModifiedTokenJS !== '$result.count$') {
          vm.scapLowestScore = filesModifiedToken
          if (!$scope.$$phase) $scope.$digest()
        } else {
          vm.scapLowestScore = 0
          if (!$scope.$$phase) $scope.$digest()
        }
      })

      // Searches
      const search4 = new SearchManager({
        "id": "search4" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index=" + selectedIndex + " " + nameFilter + " sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" rule.groups!=\"syslog\" oscap.scan.profile.title=\"$profile$\" | top agent.name",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search5 = new SearchManager({
        "id": "search5" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index=" + selectedIndex + " " + nameFilter + " sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" rule.groups!=\"syslog\" oscap.scan.profile.title=\"$profile$\" | top oscap.scan.profile.title",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search6 = new SearchManager({
        "id": "search6" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index=" + selectedIndex + " " + nameFilter + " sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" rule.groups!=\"syslog\" oscap.scan.profile.title=\"$profile$\" | top oscap.scan.content",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search7 = new SearchManager({
        "id": "search7" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index=" + selectedIndex + " " + nameFilter + " sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" rule.groups!=\"syslog\" oscap.scan.profile.title=\"$profile$\" | top oscap.check.severity",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search8 = new SearchManager({
        "id": "search8" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index=" + selectedIndex + " " + nameFilter + " sourcetype=wazuh rule.groups=\"oscap\" oscap.scan.profile.title=\"$profile$\" oscap.check.severity=\"high\" | chart count by agent.name",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search9 = new SearchManager({
        "id": "search9" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index=" + selectedIndex + " " + nameFilter + " sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" rule.groups=\"oscap-result\" oscap.scan.profile.title=\"$profile$\" | top oscap.check.title",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search10 = new SearchManager({
        "id": "search10" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index=" + selectedIndex + " " + nameFilter + " sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" rule.groups=\"oscap-result\"  oscap.check.severity=\"high\" oscap.scan.profile.title=\"$profile$\" | top oscap.check.title",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search14 = new SearchManager({
        "id": "search14" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index=" + selectedIndex + " " + nameFilter + " sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" oscap.scan.profile.title=\"$profile$\" | stats count by agent.name, oscap.check.title, oscap.scan.profile.title, oscap.scan.id, oscap.scan.content | sort count DESC | rename agent.name as \"Agent name\", oscap.check.title as Title, oscap.scan.profile.title as Profile, oscap.scan.id as \"Scan ID\", oscap.scan.content as Content",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const element4 = new ChartElement({
        "id": "element4" + epoch,
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
        "managerid": "search4" + epoch,
        "el": $('#element4')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element5 = new ChartElement({
        "id": "element5" + epoch,
        "charting.drilldown": "none",
        "resizable": true,
        "charting.chart": "pie",
        "managerid": "search5" + epoch,
        "el": $('#element5')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element6 = new ChartElement({
        "id": "element6" + epoch,
        "charting.axisY2.scale": "inherit",
        "trellis.size": "medium",
        "charting.chart.stackMode": "default",
        "resizable": true,
        "charting.layout.splitSeries.allowIndependentYRanges": "0",
        "charting.drilldown": "none",
        "charting.chart.nullValueMode": "gaps",
        "charting.axisTitleY2.visibility": "visible",
        "charting.chart": "bar",
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
        "charting.axisLabelsX.majorLabelStyle.rotation": "-45",
        "charting.axisY.scale": "linear",
        "charting.chart.showDataLabels": "all",
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "managerid": "search6" + epoch,
        "el": $('#element6')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element7 = new ChartElement({
        "id": "element7" + epoch,
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
        "managerid": "search7" + epoch,
        "el": $('#element7')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element8 = new ChartElement({
        "id": "element8" + epoch,
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
        "charting.axisTitleY.visibility": "visible",
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
        "charting.chart.showDataLabels": "all",
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "managerid": "search8" + epoch,
        "el": $('#element8')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element9 = new ChartElement({
        "id": "element9" + epoch,
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
        "charting.axisTitleX.visibility": "collapsed",
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
        "charting.chart.showDataLabels": "all",
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "managerid": "search9" + epoch,
        "el": $('#element9')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element10 = new ChartElement({
        "id": "element10" + epoch,
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
        "charting.axisTitleX.visibility": "collapsed",
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
        "charting.chart.showDataLabels": "all",
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "managerid": "search10" + epoch,
        "el": $('#element10')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      const element14 = new TableElement({
        "id": "element14" + epoch,
        "dataOverlayMode": "none",
        "drilldown": "cell",
        "percentagesRow": "false",
        "rowNumbers": "true",
        "totalsRow": "false",
        "wrap": "false",
        "managerid": "search14" + epoch,
        "el": $('#element14')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      element14.on("click", function (e) {
        if (e.field !== undefined) {
          e.preventDefault()
          const url = "/app/SplunkAppForWazuh/search?q=index=" + selectedIndex + " " + nameFilter + " sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" oscap.scan.profile.title=\"$profile$\" | stats count by agent.name, oscap.check.title, oscap.scan.profile.title, oscap.scan.id, oscap.scan.content | sort count DESC | rename agent.name as \"Agent name\", oscap.check.title as Title, oscap.scan.profile.title as Profile, oscap.scan.id as \"Scan ID\", oscap.scan.content as Content"
          utils.redirect(url, false, "_blank")
        }
      })

      //
      // VIEWS: FORM INPUTS
      //

      DashboardController.onReady(() => {
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
