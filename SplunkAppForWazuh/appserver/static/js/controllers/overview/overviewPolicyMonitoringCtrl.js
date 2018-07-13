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
  "splunkjs/mvc/searchmanager"
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
  ) {

    'use strict';

    controllers.controller('overviewPolicyMonitoringCtrl', function ($scope, $currentApiIndexService) {
      const vm = this
      const epoch = (new Date).getTime()
      const selectedIndex = $currentApiIndexService.getIndex()

      const filter = $currentApiIndexService.getFilter()
      const nameFilter = filter[0] + '=' + filter[1]

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
        element1 = null
        element2 = null
        element3 = null
        element4 = null
        element5 = null

        search1 = null
        search2 = null
        search3 = null
        search4 = null
        search5 = null
      })

      const search1 = new SearchManager({
        "id": "search1",
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index=" + selectedIndex + " " + nameFilter + " sourcetype=wazuh \"rule.groups\"=\"rootcheck\" rule.description=* | timechart span=1h count by rule.description",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search2 = new SearchManager({
        "id": "search2",
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index=" + selectedIndex + " " + nameFilter + " sourcetype=wazuh \"rule.groups\"=\"rootcheck\" rule.cis{}=* | top  rule.cis{}",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search3 = new SearchManager({
        "id": "search3",
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index=" + selectedIndex + " " + nameFilter + " sourcetype=wazuh \"rule.groups\"=\"rootcheck\" rule.pci_dss{}=* | top  rule.pci_dss{}",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search4 = new SearchManager({
        "id": "search4",
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index=" + selectedIndex + " " + nameFilter + " sourcetype=wazuh \"rule.groups\"=\"rootcheck\" | timechart span=2h count by agent.name",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search5 = new SearchManager({
        "id": "search5",
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index=" + selectedIndex + " " + nameFilter + " sourcetype=wazuh \"rule.groups\"=\"rootcheck\" |stats count sparkline by agent.name, rule.description, title | sort count DESC | rename rule.description as \"Rule description\", agent.name as Agent, title as Control",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      new Dashboard({
        id: 'dashboard',
        el: $('.dashboard-body'),
        showTitle: true,
        editable: false
      }, { tokens: true }).render()


      //
      // VIEWS: VISUALIZATION ELEMENTS
      //

      const element1 = new ChartElement({
        "id": "element1",
        "charting.axisY2.scale": "inherit",
        "trellis.size": "medium",
        "charting.chart.stackMode": "stacked100",
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
        "charting.legend.placement": "bottom",
        "charting.chart.bubbleSizeBy": "area",
        "charting.chart.bubbleMaximumSize": "50",
        "charting.axisLabelsX.majorLabelStyle.rotation": "0",
        "charting.axisY.scale": "linear",
        "charting.chart.showDataLabels": "none",
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "managerid": "search1",
        "el": $('#element1')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element2 = new ChartElement({
        "id": "element2",
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
        "managerid": "search2",
        "el": $('#element2')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element3 = new ChartElement({
        "id": "element3",
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
        "managerid": "search3",
        "el": $('#element3')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element4 = new ChartElement({
        "id": "element4",
        "charting.axisY2.scale": "inherit",
        "trellis.size": "medium",
        "charting.chart.stackMode": "stacked100",
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
        "charting.legend.placement": "bottom",
        "charting.chart.bubbleSizeBy": "area",
        "charting.chart.bubbleMaximumSize": "50",
        "charting.axisLabelsX.majorLabelStyle.rotation": "0",
        "charting.axisY.scale": "linear",
        "charting.chart.showDataLabels": "minmax",
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "managerid": "search4",
        "el": $('#element4')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element5 = new TableElement({
        "id": "element5",
        "dataOverlayMode": "heatmap",
        "drilldown": "cell",
        "percentagesRow": "false",
        "rowNumbers": "true",
        "totalsRow": "true",
        "wrap": "false",
        "managerid": "search5",
        "el": $('#element5')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      element5.on("click", (e) => {
        if (e.field !== undefined) {
          e.preventDefault()
          const url = baseUrl + "/app/SplunkAppForWazuh/search?q=index=" + selectedIndex + " " + nameFilter + " sourcetype=wazuh \"rule.groups\"=\"rootcheck\" |stats count sparkline by agent.name, rule.description, title | sort count DESC | rename rule.description as \"Rule description\", agent.name as Agent, title as Control"
          utils.redirect(url, false, "_blank")
        }
      })

      const input1 = new TimeRangeInput({
        "id": "input1",
        "searchWhenChanged": true,
        "default": { "latest_time": "now", "earliest_time": "-24h@h" },
        "earliest_time": "$form.when.earliest$",
        "latest_time": "$form.when.latest$",
        "el": $('#input1')
      }, { tokens: true }).render()

      input1.on("change", (newValue) => {
        FormUtils.handleValueChange(input1)
      })

      DashboardController.onReady(() => {
        if (!submittedTokenModel.has('earliest') && !submittedTokenModel.has('latest')) {
          submittedTokenModel.set({ earliest: '0', latest: '' })
        }
      })

    })
  })
