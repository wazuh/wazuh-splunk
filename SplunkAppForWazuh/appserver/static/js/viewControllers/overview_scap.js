/*
 * Wazuh app - Overview SCAP view controller
 * Copyright (C) 2018 Wazuh, Inc.
 *
 * This program is free software you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

require([
  "splunkjs/mvc",
  "splunkjs/mvc/utils",
  "splunkjs/mvc/tokenutils",
  "underscore",
  "jquery",
  "splunkjs/mvc/simplexml",
  "splunkjs/mvc/layoutview",
  "splunkjs/mvc/simplexml/dashboardview",
  "splunkjs/mvc/simplexml/dashboard/panelref",
  "splunkjs/mvc/simplexml/element/chart",
  "splunkjs/mvc/simplexml/element/event",
  "splunkjs/mvc/simplexml/element/html",
  "splunkjs/mvc/simplexml/element/list",
  "splunkjs/mvc/simplexml/element/map",
  "splunkjs/mvc/simplexml/element/single",
  "splunkjs/mvc/simplexml/element/table",
  "splunkjs/mvc/simplexml/element/visualization",
  "splunkjs/mvc/simpleform/formutils",
  "splunkjs/mvc/simplexml/eventhandler",
  "splunkjs/mvc/simplexml/searcheventhandler",
  "splunkjs/mvc/simpleform/input/dropdown",
  "splunkjs/mvc/simpleform/input/radiogroup",
  "splunkjs/mvc/simpleform/input/linklist",
  "splunkjs/mvc/simpleform/input/multiselect",
  "splunkjs/mvc/simpleform/input/checkboxgroup",
  "splunkjs/mvc/simpleform/input/text",
  "splunkjs/mvc/simpleform/input/timerange",
  "splunkjs/mvc/simpleform/input/submit",
  "splunkjs/mvc/searchmanager",
  "splunkjs/mvc/savedsearchmanager",
  "splunkjs/mvc/postprocessmanager",
  "splunkjs/mvc/simplexml/urltokenmodel",
  "/static/app/SplunkAppForWazuh/js/services/credentialService.js",
  "/static/app/SplunkAppForWazuh/js/directives/toaster.js",
  "/static/app/SplunkAppForWazuh/js/services/indexService.js",
  "/static/app/SplunkAppForWazuh/js/directives/selectedCredentialsDirective.js"


],
  function (
    mvc,
    utils,
    TokenUtils,
    _,
    $,
    DashboardController,
    LayoutView,
    Dashboard,
    PanelRef,
    ChartElement,
    EventElement,
    HtmlElement,
    ListElement,
    MapElement,
    SingleElement,
    TableElement,
    VisualizationElement,
    FormUtils,
    EventHandler,
    SearchEventHandler,
    DropdownInput,
    RadioGroupInput,
    LinkListInput,
    MultiSelectInput,
    CheckboxGroupInput,
    TextInput,
    TimeRangeInput,
    SubmitButton,
    SearchManager,
    SavedSearchManager,
    PostProcessManager,
    UrlTokenModel,
    CredentialService,
    Toast,
    IndexService,
    SelectedCredentials
  ) {

    let pageLoading = true


    CredentialService.checkSelectedApiConnection().then(({api,selectedIndex}) => {
      SelectedCredentials.render($('#selectedCredentials'))

      const urlTokenModel = new UrlTokenModel()
      const errorToast = new Toast('error', 'toast-bottom-right', 'Error at loading data', 1000, 250, 250)
      

      mvc.Components.registerInstance('url', urlTokenModel)
      const defaultTokenModel = mvc.Components.getInstance('default', { create: true })
      const submittedTokenModel = mvc.Components.getInstance('submitted', { create: true })
      let baseUrl = ''
      urlTokenModel.on('url:navigate', function () {
        defaultTokenModel.set(urlTokenModel.toJSON())
        if (!_.isEmpty(urlTokenModel.toJSON()) && !_.all(urlTokenModel.toJSON(), _.isUndefined)) {
          submitTokens()
        } else {
          submittedTokenModel.clear()
        }
      })

      $(document).ready(() => {
        const urlTemp = window.location.href
        const arr = urlTemp.split("/")
        baseUrl = arr[0] + "//" + arr[2]
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



      //
      // SEARCH MANAGERS
      //


      const search1 = new SearchManager({
        "id": "search1",
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index="+selectedIndex+"  sourcetype=wazuh oscap.scan.score=* | stats latest(oscap.scan.score) as Latest",
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
        "search": "index="+selectedIndex+"  sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" | stats latest(agent.name) as Latest",
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
        "search": "index="+selectedIndex+" sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" oscap.scan.profile.title=* | stats latest(oscap.scan.profile.title) as Latest",
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
        "search": "index="+selectedIndex+" sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" rule.groups!=\"syslog\" oscap.scan.profile.title=\"$profile$\" | top agent.name",
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
        "search": "index="+selectedIndex+" sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" rule.groups!=\"syslog\" oscap.scan.profile.title=\"$profile$\" | top oscap.scan.profile.title",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search6 = new SearchManager({
        "id": "search6",
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index="+selectedIndex+" sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" rule.groups!=\"syslog\" oscap.scan.profile.title=\"$profile$\" | top oscap.scan.content",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search7 = new SearchManager({
        "id": "search7",
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index="+selectedIndex+" sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" rule.groups!=\"syslog\" oscap.scan.profile.title=\"$profile$\" | top oscap.check.severity",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search8 = new SearchManager({
        "id": "search8",
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index="+selectedIndex+" sourcetype=wazuh rule.groups=\"oscap\" oscap.scan.profile.title=\"$profile$\" oscap.check.severity=\"high\" | chart count by agent.name",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search9 = new SearchManager({
        "id": "search9",
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index="+selectedIndex+" sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" rule.groups=\"oscap-result\" oscap.scan.profile.title=\"$profile$\" | top oscap.check.title",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search10 = new SearchManager({
        "id": "search10",
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index="+selectedIndex+" sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" rule.groups=\"oscap-result\"  oscap.check.severity=\"high\" oscap.scan.profile.title=\"$profile$\" | top oscap.check.title",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search11 = new SearchManager({
        "id": "search11",
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index="+selectedIndex+" sourcetype=wazuh oscap.scan.score=* | stats max(oscap.scan.score)",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search12 = new SearchManager({
        "id": "search12",
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index="+selectedIndex+" sourcetype=wazuh oscap.scan.score=* | stats min(oscap.scan.score)",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search13 = new SearchManager({
        "id": "search13",
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index="+selectedIndex+" sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" | stats latest(oscap.check.title)",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search14 = new SearchManager({
        "id": "search14",
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index="+selectedIndex+" sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" oscap.scan.profile.title=\"$profile$\" | stats count by agent.name, oscap.check.title, oscap.scan.profile.title, oscap.scan.id, oscap.scan.content | sort count DESC | rename agent.name as \"Agent name\", oscap.check.title as Title, oscap.scan.profile.title as Profile, oscap.scan.id as \"Scan ID\", oscap.scan.content as Content",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search15 = new SearchManager({
        "id": "search15",
        "cancelOnUnload": true,
        "sample_ratio": null,
        "earliest_time": "-24h@h",
        "status_buckets": 0,
        "search": "index="+selectedIndex+" sourcetype=wazuh  rule.groups=\"oscap\" rule.groups!=\"syslog\" oscap.scan.profile.title=* | stats count by oscap.scan.profile.title | sort oscap.scan.profile.title ASC|fields - count",
        "latest_time": "now",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true })


      //
      // SPLUNK LAYOUT
      //

      $('header').remove()
      new LayoutView({ "hideFooter": false, "hideSplunkBar": false, "hideAppBar": false, "hideChrome": false })
        .render()
        .getContainerElement()
        .appendChild($('.dashboard-body')[0])

      //
      // DASHBOARD EDITOR
      //

      new Dashboard({
        id: 'dashboard',
        el: $('.dashboard-body'),
        showTitle: true,
        editable: false
      }, { tokens: true }).render()


      //
      // VIEWS: VISUALIZATION ELEMENTS
      //

      const element1 = new SingleElement({
        "id": "element1",
        "numberPrecision": "0",
        "trellis.size": "medium",
        "unitPosition": "after",
        "useColors": "1",
        "colorMode": "block",
        "trendDisplayMode": "absolute",
        "colorBy": "value",
        "trendColorInterpretation": "standard",
        "drilldown": "all",
        "rangeColors": "[\"0xf7bc38\",\"0x65a637\"]",
        "trellis.enabled": "0",
        "showTrendIndicator": "1",
        "trellis.scales.shared": "1",
        "height": "50",
        "rangeValues": "[0]",
        "showSparkline": "1",
        "useThousandSeparators": "1",
        "managerid": "search1",
        "el": $('#element1')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      element1.on("click", function (e) {
        if (e.field !== undefined) {
          e.preventDefault()
          const url = "/app/SplunkAppForWazuh/search?q=index="+selectedIndex+"  sourcetype=wazuh oscap.scan.score=* | stats latest(oscap.scan.score) as Latest"
          utils.redirect(url, false, "_blank")
        }
      })

      const element2 = new SingleElement({
        "id": "element2",
        "numberPrecision": "0",
        "trellis.size": "medium",
        "unitPosition": "after",
        "useColors": "1",
        "colorMode": "block",
        "trendDisplayMode": "absolute",
        "colorBy": "value",
        "trendColorInterpretation": "standard",
        "drilldown": "all",
        "rangeColors": "[\"0x65a637\",\"0xd93f3c\"]",
        "trellis.enabled": "0",
        "showTrendIndicator": "1",
        "trellis.scales.shared": "1",
        "height": "50",
        "rangeValues": "[0]",
        "showSparkline": "1",
        "useThousandSeparators": "1",
        "managerid": "search2",
        "el": $('#element2')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      element2.on("click", function (e) {
        if (e.field !== undefined) {
          e.preventDefault()
          const url = "/app/SplunkAppForWazuh/search?q=index="+selectedIndex+"  sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" | stats latest(agent.name) as Latest"
          utils.redirect(url, false, "_blank")
        }
      })

      const element3 = new SingleElement({
        "id": "element3",
        "numberPrecision": "0",
        "trellis.size": "medium",
        "unitPosition": "after",
        "useColors": "1",
        "colorMode": "block",
        "trendDisplayMode": "absolute",
        "colorBy": "value",
        "trendColorInterpretation": "standard",
        "drilldown": "all",
        "rangeColors": "[\"0x65a637\",\"0xd93f3c\"]",
        "trellis.enabled": "0",
        "showTrendIndicator": "1",
        "trellis.scales.shared": "1",
        "height": "50",
        "rangeValues": "[0]",
        "showSparkline": "1",
        "useThousandSeparators": "1",
        "managerid": "search3",
        "el": $('#element3')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      element3.on("click", function (e) {
        if (e.field !== undefined) {
          e.preventDefault()
          const url = "/app/SplunkAppForWazuh/search?q=index="+selectedIndex+" sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" oscap.scan.profile.title=* | stats latest(oscap.scan.profile.title) as Latest"
          utils.redirect(url, false, "_blank")
        }
      })

      const element4 = new ChartElement({
        "id": "element4",
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
        "managerid": "search4",
        "el": $('#element4')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element5 = new ChartElement({
        "id": "element5",
        "charting.drilldown": "none",
        "resizable": true,
        "charting.chart": "pie",
        "managerid": "search5",
        "el": $('#element5')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element6 = new ChartElement({
        "id": "element6",
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
        "managerid": "search6",
        "el": $('#element6')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element7 = new ChartElement({
        "id": "element7",
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
        "managerid": "search7",
        "el": $('#element7')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element8 = new ChartElement({
        "id": "element8",
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
        "managerid": "search8",
        "el": $('#element8')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element9 = new ChartElement({
        "id": "element9",
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
        "managerid": "search9",
        "el": $('#element9')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element10 = new ChartElement({
        "id": "element10",
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
        "managerid": "search10",
        "el": $('#element10')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element11 = new SingleElement({
        "id": "element11",
        "numberPrecision": "0",
        "trellis.size": "medium",
        "unitPosition": "after",
        "useColors": "1",
        "colorMode": "block",
        "trendDisplayMode": "absolute",
        "colorBy": "value",
        "trendColorInterpretation": "standard",
        "drilldown": "none",
        "rangeColors": "[\"0x65a637\",\"0x65a637\"]",
        "trellis.enabled": "0",
        "showTrendIndicator": "1",
        "trellis.scales.shared": "1",
        "height": "50",
        "rangeValues": "[0]",
        "showSparkline": "1",
        "useThousandSeparators": "1",
        "managerid": "search11",
        "el": $('#element11')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      const element12 = new SingleElement({
        "id": "element12",
        "numberPrecision": "0.00",
        "trellis.size": "medium",
        "unitPosition": "after",
        "useColors": "1",
        "colorMode": "block",
        "trendDisplayMode": "absolute",
        "colorBy": "value",
        "trendColorInterpretation": "standard",
        "drilldown": "none",
        "rangeColors": "[\"0x65a637\",\"0x65a637\"]",
        "trellis.enabled": "0",
        "showTrendIndicator": "1",
        "trellis.scales.shared": "1",
        "height": "50",
        "rangeValues": "[60]",
        "showSparkline": "1",
        "useThousandSeparators": "1",
        "managerid": "search12",
        "el": $('#element12')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      const element13 = new SingleElement({
        "id": "element13",
        "numberPrecision": "0.00",
        "trellis.size": "medium",
        "unitPosition": "after",
        "useColors": "1",
        "colorMode": "block",
        "trendDisplayMode": "absolute",
        "colorBy": "value",
        "trendColorInterpretation": "standard",
        "drilldown": "all",
        "rangeColors": "[\"0x65a637\",\"0xd93f3c\"]",
        "trellis.enabled": "0",
        "showTrendIndicator": "1",
        "trellis.scales.shared": "1",
        "height": "50",
        "rangeValues": "[0]",
        "showSparkline": "1",
        "useThousandSeparators": "1",
        "managerid": "search13",
        "el": $('#element13')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      element13.on("click", function (e) {
        if (e.field !== undefined) {
          e.preventDefault()
          const url = "/app/SplunkAppForWazuh/search?q=index="+selectedIndex+" sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" | stats latest(oscap.check.title)"
          utils.redirect(url, false, "_blank")
        }
      })

      const element14 = new TableElement({
        "id": "element14",
        "dataOverlayMode": "none",
        "drilldown": "cell",
        "percentagesRow": "false",
        "rowNumbers": "true",
        "totalsRow": "false",
        "wrap": "false",
        "managerid": "search14",
        "el": $('#element14')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      element14.on("click", function (e) {
        if (e.field !== undefined) {
          e.preventDefault()
          const url = "/app/SplunkAppForWazuh/search?q=index="+selectedIndex+" sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" oscap.scan.profile.title=\"$profile$\" | stats count by agent.name, oscap.check.title, oscap.scan.profile.title, oscap.scan.id, oscap.scan.content | sort count DESC | rename agent.name as \"Agent name\", oscap.check.title as Title, oscap.scan.profile.title as Profile, oscap.scan.id as \"Scan ID\", oscap.scan.content as Content"
          utils.redirect(url, false, "_blank")
        }
      })


      //
      // VIEWS: FORM INPUTS
      //

      const input1 = new TimeRangeInput({
        "id": "input1",
        "searchWhenChanged": true,
        "default": { "latest_time": "now", "earliest_time": "-24h@h" },
        "earliest_time": "$form.when.earliest$",
        "latest_time": "$form.when.latest$",
        "el": $('#input1')
      }, { tokens: true }).render()

      input1.on("change", function (newValue) {
        FormUtils.handleValueChange(input1)
      })

      const input2 = new DropdownInput({
        "id": "input2",
        "choices": [
          { "label": "ALL", "value": "*" }
        ],
        "labelField": "oscap.scan.profile.title",
        "searchWhenChanged": true,
        "default": "*",
        "valueField": "oscap.scan.profile.title",
        "initialValue": "*",
        "selectFirstChoice": false,
        "showClearButton": true,
        "value": "$form.profile$",
        "managerid": "search15",
        "el": $('#input2')
      }, { tokens: true }).render()

      input2.on("change", function (newValue) {
        FormUtils.handleValueChange(input2)
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


      //
      // DASHBOARD READY
      //

      DashboardController.ready()
      pageLoading = false
    }).catch((err) => { window.location.href = '/en-US/app/SplunkAppForWazuh/settings' })

  }
)
// ]]>
