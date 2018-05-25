/*
 * Wazuh app - Wazuh alerts view controller
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
  "/static/app/SplunkAppForWazuh/js/directives/toaster.js"
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
    Toast
  ) {

    let pageLoading = true


    CredentialService.checkSelectedApiConnection().then((api) => {

      const errorToast = new Toast('error', 'toast-bottom-right', 'Error at loading agent list', 1000, 250, 250)

      const urlTokenModel = new UrlTokenModel()
      mvc.Components.registerInstance('url', urlTokenModel)
      const defaultTokenModel = mvc.Components.getInstance('default', { create: true })
      const submittedTokenModel = mvc.Components.getInstance('submitted', { create: true })
      let baseUrl = ''
      urlTokenModel.on('url:navigate', () => {
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

      const submitTokens = () => {
        // Copy the contents of the defaultTokenModel to the submittedTokenModel and urlTokenModel
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

      const search2 = new SearchManager({
        "id": "search2",
        "status_buckets": 0,
        "search": "index="+window.window.localStorage['selectedIndex']+" sourcetype=\"wazuh\" agent.name=\"$agent$\" | timechart count by rule.description usenull=f useother=f",
        "latest_time": "$when.latest$",
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search3 = new SearchManager({
        "id": "search3",
        "status_buckets": 0,
        "search": "index="+window.window.localStorage['selectedIndex']+" sourcetype=\"wazuh\" agent.name=\"$agent$\" | timechart count by rule.level usenull=f useother=f",
        "latest_time": "$when.latest$",
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search4 = new SearchManager({
        "id": "search4",
        "status_buckets": 0,
        "search": "index="+window.window.localStorage['selectedIndex']+" sourcetype=\"wazuh\" agent.name=\"$agent$\" | timechart count by rule.groups usenull=f useother=f",
        "latest_time": "$when.latest$",
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search5 = new SearchManager({
        "id": "search5",
        "status_buckets": 0,
        "search": "index="+window.window.localStorage['selectedIndex']+" sourcetype=\"wazuh\" agent.name=\"$agent$\" | timechart count",
        "latest_time": "$when.latest$",
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search6 = new SearchManager({
        "id": "search6",
        "status_buckets": 0,
        "search": "index="+window.window.localStorage['selectedIndex']+" sourcetype=\"wazuh\" agent.name=\"$agent$\" | iplocation srcip | geostats latfield=lat longfield=lon count",
        "latest_time": "$when.latest$",
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search7 = new SearchManager({
        "id": "search7",
        "status_buckets": 0,
        "search": "index="+window.window.localStorage['selectedIndex']+" sourcetype=\"wazuh\" agent.name=\"$agent$\" | stats count by agent.name",
        "latest_time": "$when.latest$",
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search8 = new SearchManager({
        "id": "search8",
        "status_buckets": 0,
        "search": "index="+window.window.localStorage['selectedIndex']+" sourcetype=\"wazuh\" rule.description=* agent.name=\"$agent$\" | stats count by rule.description",
        "latest_time": "$when.latest$",
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search9 = new SearchManager({
        "id": "search9",
        "status_buckets": 0,
        "search": "index="+window.window.localStorage['selectedIndex']+" sourcetype=\"wazuh\" agent.name=\"$agent$\" | iplocation srcip| top  Country useother=f",
        "latest_time": "$when.latest$",
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search10 = new SearchManager({
        "id": "search10",
        "status_buckets": 0,
        "search": "index="+window.window.localStorage['selectedIndex']+" sourcetype=\"wazuh\" agent.name=\"$agent$\" | top rule.groups limit=5",
        "latest_time": "$when.latest$",
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search11 = new SearchManager({
        "id": "search11",
        "status_buckets": 0,
        "search": "index="+window.window.localStorage['selectedIndex']+" sourcetype=\"wazuh\" agent.name=\"$agent$\" | chart sparkline count by rule.description | sort - count | head 5",
        "latest_time": "$when.latest$",
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search12 = new SearchManager({
        "id": "search12",
        "status_buckets": 0,
        "search": "index="+window.window.localStorage['selectedIndex']+" sourcetype=\"wazuh\" \"rule.level\">=9 agent.name=\"$agent$\" | table agent.name, rule.level, rule.description",
        "latest_time": "$when.latest$",
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search13 = new SearchManager({
        "id": "search13",
        "status_buckets": 0,
        "search": "index="+window.window.localStorage['selectedIndex']+" sourcetype=\"wazuh\" agent.name=\"$agent$\" | table agent.name, agent.ip, rule.id, rule.level, rule.description, full_log | sort _time",
        "latest_time": "$when.latest$",
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search14 = new SearchManager({
        "id": "search14",
        "status_buckets": 0,
        "search": "index="+window.window.localStorage['selectedIndex']+" sourcetype=wazuh agent.name=\"*\"| stats count by \"agent.name\" | sort \"agent.name\" ASC | fields - count",
        "latest_time": "now",
        "cancelOnUnload": true,
        "sample_ratio": null,
        "earliest_time": "-24h@h",
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

      const element1 = new TableElement({
        "id": "element1",
        "count": 5,
        "drilldown": "cell",
        "managerid": "search1",
        "el": $('#element1')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      const element2 = new ChartElement({
        "id": "element2",
        "charting.axisX.scale": "linear",
        "trellis.enabled": "0",
        "charting.chart.style": "shiny",
        "charting.legend.labelStyle.overflowMode": "ellipsisMiddle",
        "charting.axisLabelsX.majorLabelStyle.rotation": "0",
        "charting.legend.placement": "bottom",
        "charting.chart.stackMode": "stacked",
        "charting.axisY.scale": "linear",
        "charting.axisTitleY2.visibility": "visible",
        "charting.axisTitleX.visibility": "collapsed",
        "charting.axisY2.enabled": "0",
        "charting.chart.bubbleMaximumSize": "50",
        "trellis.scales.shared": "1",
        "charting.chart.bubbleMinimumSize": "10",
        "trellis.size": "medium",
        "resizable": true,
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "charting.axisY2.scale": "inherit",
        "charting.chart.nullValueMode": "gaps",
        "charting.chart.showDataLabels": "none",
        "charting.drilldown": "none",
        "charting.axisLabelsX.majorLabelStyle.overflowMode": "ellipsisNone",
        "charting.layout.splitSeries.allowIndependentYRanges": "0",
        "charting.chart": "area",
        "charting.axisTitleY.visibility": "visible",
        "charting.chart.bubbleSizeBy": "area",
        "charting.layout.splitSeries": "0",
        "managerid": "search2",
        "el": $('#element2')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element3 = new ChartElement({
        "id": "element3",
        "charting.axisX.scale": "linear",
        "trellis.enabled": "0",
        "charting.chart.style": "shiny",
        "charting.legend.labelStyle.overflowMode": "ellipsisMiddle",
        "charting.axisLabelsX.majorLabelStyle.rotation": "0",
        "charting.legend.placement": "right",
        "charting.chart.stackMode": "stacked",
        "charting.axisY.scale": "linear",
        "charting.axisTitleY2.visibility": "visible",
        "charting.axisTitleX.visibility": "collapsed",
        "charting.axisY2.enabled": "0",
        "charting.chart.bubbleMaximumSize": "50",
        "trellis.scales.shared": "1",
        "charting.chart.bubbleMinimumSize": "10",
        "trellis.size": "medium",
        "resizable": true,
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "charting.axisY2.scale": "inherit",
        "charting.chart.nullValueMode": "gaps",
        "charting.chart.showDataLabels": "none",
        "charting.drilldown": "none",
        "charting.axisLabelsX.majorLabelStyle.overflowMode": "ellipsisNone",
        "charting.layout.splitSeries.allowIndependentYRanges": "0",
        "charting.chart": "column",
        "charting.axisTitleY.visibility": "visible",
        "charting.chart.bubbleSizeBy": "area",
        "charting.layout.splitSeries": "0",
        "managerid": "search3",
        "el": $('#element3')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element4 = new ChartElement({
        "id": "element4",
        "charting.axisX.scale": "linear",
        "trellis.enabled": "0",
        "charting.chart.style": "shiny",
        "charting.legend.labelStyle.overflowMode": "ellipsisMiddle",
        "charting.axisLabelsX.majorLabelStyle.rotation": "0",
        "charting.legend.placement": "right",
        "charting.chart.stackMode": "stacked",
        "charting.axisY.scale": "linear",
        "charting.axisTitleY2.visibility": "visible",
        "charting.axisTitleX.visibility": "collapsed",
        "charting.axisY2.enabled": "0",
        "charting.chart.bubbleMaximumSize": "50",
        "trellis.scales.shared": "1",
        "charting.chart.bubbleMinimumSize": "10",
        "trellis.size": "medium",
        "resizable": true,
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "charting.axisY2.scale": "inherit",
        "charting.chart.nullValueMode": "gaps",
        "charting.chart.showDataLabels": "none",
        "charting.drilldown": "none",
        "charting.axisLabelsX.majorLabelStyle.overflowMode": "ellipsisNone",
        "charting.layout.splitSeries.allowIndependentYRanges": "0",
        "charting.chart": "column",
        "charting.axisTitleY.visibility": "visible",
        "charting.chart.bubbleSizeBy": "area",
        "charting.layout.splitSeries": "0",
        "managerid": "search4",
        "el": $('#element4')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element5 = new ChartElement({
        "id": "element5",
        "charting.axisX.scale": "linear",
        "trellis.enabled": "0",
        "charting.chart.style": "shiny",
        "charting.legend.labelStyle.overflowMode": "ellipsisMiddle",
        "charting.axisLabelsX.majorLabelStyle.rotation": "0",
        "charting.legend.placement": "right",
        "charting.chart.stackMode": "stacked",
        "charting.axisY.scale": "linear",
        "charting.axisTitleY2.visibility": "visible",
        "charting.axisTitleX.visibility": "collapsed",
        "charting.axisY2.enabled": "0",
        "charting.chart.bubbleMaximumSize": "50",
        "trellis.scales.shared": "1",
        "charting.chart.bubbleMinimumSize": "10",
        "trellis.size": "medium",
        "resizable": true,
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "charting.axisY2.scale": "inherit",
        "charting.chart.nullValueMode": "gaps",
        "charting.chart.showDataLabels": "none",
        "charting.drilldown": "none",
        "charting.axisLabelsX.majorLabelStyle.overflowMode": "ellipsisNone",
        "charting.layout.splitSeries.allowIndependentYRanges": "0",
        "charting.chart": "line",
        "charting.axisTitleY.visibility": "visible",
        "charting.chart.bubbleSizeBy": "area",
        "charting.layout.splitSeries": "0",
        "managerid": "search5",
        "el": $('#element5')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element6 = new MapElement({
        "id": "element6",
        "mapping.map.center": "(0,0.53)",
        "mapping.legend.placement": "bottomright",
        "mapping.choroplethLayer.colorMode": "auto",
        "mapping.markerLayer.markerOpacity": "0.8",
        "drilldown": "none",
        "mapping.tileLayer.maxZoom": "19",
        "mapping.choroplethLayer.neutralPoint": "0",
        "trellis.enabled": "0",
        "mapping.markerLayer.markerMinSize": "10",
        "mapping.tileLayer.minZoom": "0",
        "mapping.choroplethLayer.minimumColor": "0x2F25BA",
        "mapping.choroplethLayer.colorBins": "5",
        "mapping.map.zoom": "2",
        "trellis.scales.shared": "1",
        "mapping.type": "marker",
        "mapping.tileLayer.tileOpacity": "1",
        "resizable": true,
        "mapping.markerLayer.markerMaxSize": "50",
        "mapping.tileLayer.url": "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "mapping.choroplethLayer.maximumColor": "0xDB5800",
        "mapping.map.scrollZoom": "0",
        "mapping.showTiles": "1",
        "mapping.choroplethLayer.showBorder": "1",
        "trellis.size": "medium",
        "mapping.choroplethLayer.shapeOpacity": "0.75",
        "mapping.data.maxClusters": "100",
        "mapping.map.panning": "1",
        "managerid": "search6",
        "el": $('#element6')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      const element7 = new ChartElement({
        "id": "element7",
        "charting.axisX.scale": "linear",
        "trellis.enabled": "0",
        "charting.chart.style": "shiny",
        "charting.legend.labelStyle.overflowMode": "ellipsisMiddle",
        "charting.axisLabelsX.majorLabelStyle.rotation": "0",
        "charting.legend.placement": "right",
        "charting.chart.stackMode": "stacked",
        "charting.axisY.scale": "linear",
        "charting.axisTitleY2.visibility": "visible",
        "charting.axisTitleX.visibility": "visible",
        "charting.axisY2.enabled": "0",
        "charting.chart.bubbleMaximumSize": "50",
        "trellis.scales.shared": "1",
        "charting.chart.bubbleMinimumSize": "10",
        "trellis.size": "medium",
        "resizable": true,
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "charting.axisY2.scale": "inherit",
        "charting.chart.nullValueMode": "gaps",
        "charting.chart.showDataLabels": "none",
        "charting.drilldown": "none",
        "charting.axisLabelsX.majorLabelStyle.overflowMode": "ellipsisNone",
        "charting.layout.splitSeries.allowIndependentYRanges": "0",
        "charting.chart": "pie",
        "charting.axisTitleY.visibility": "visible",
        "charting.chart.bubbleSizeBy": "area",
        "charting.layout.splitSeries": "0",
        "managerid": "search7",
        "el": $('#element7')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element8 = new ChartElement({
        "id": "element8",
        "charting.axisX.scale": "linear",
        "trellis.enabled": "0",
        "charting.chart.style": "shiny",
        "charting.legend.labelStyle.overflowMode": "ellipsisMiddle",
        "charting.axisLabelsX.majorLabelStyle.rotation": "0",
        "charting.legend.placement": "right",
        "charting.chart.stackMode": "stacked",
        "charting.axisY.scale": "linear",
        "charting.axisTitleY2.visibility": "visible",
        "charting.axisTitleX.visibility": "visible",
        "charting.axisY2.enabled": "0",
        "charting.chart.bubbleMaximumSize": "50",
        "trellis.scales.shared": "1",
        "charting.chart.bubbleMinimumSize": "10",
        "trellis.size": "medium",
        "resizable": true,
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "charting.axisY2.scale": "inherit",
        "charting.chart.nullValueMode": "gaps",
        "charting.chart.showDataLabels": "none",
        "charting.drilldown": "none",
        "charting.axisLabelsX.majorLabelStyle.overflowMode": "ellipsisNone",
        "charting.layout.splitSeries.allowIndependentYRanges": "0",
        "charting.chart": "pie",
        "charting.axisTitleY.visibility": "visible",
        "charting.chart.bubbleSizeBy": "area",
        "charting.layout.splitSeries": "0",
        "managerid": "search8",
        "el": $('#element8')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element9 = new ChartElement({
        "id": "element9",
        "charting.axisX.scale": "linear",
        "trellis.enabled": "0",
        "charting.chart.style": "shiny",
        "charting.legend.labelStyle.overflowMode": "ellipsisMiddle",
        "charting.axisLabelsX.majorLabelStyle.rotation": "0",
        "charting.legend.placement": "right",
        "charting.chart.stackMode": "stacked",
        "charting.axisY.scale": "linear",
        "charting.axisTitleY2.visibility": "visible",
        "charting.axisTitleX.visibility": "visible",
        "charting.axisY2.enabled": "0",
        "charting.chart.bubbleMaximumSize": "50",
        "trellis.scales.shared": "1",
        "charting.chart.bubbleMinimumSize": "10",
        "trellis.size": "medium",
        "resizable": true,
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "charting.axisY2.scale": "inherit",
        "charting.chart.nullValueMode": "gaps",
        "charting.chart.showDataLabels": "none",
        "charting.drilldown": "none",
        "charting.axisLabelsX.majorLabelStyle.overflowMode": "ellipsisNone",
        "charting.layout.splitSeries.allowIndependentYRanges": "0",
        "charting.chart": "pie",
        "charting.axisTitleY.visibility": "visible",
        "charting.chart.bubbleSizeBy": "area",
        "charting.layout.splitSeries": "0",
        "managerid": "search9",
        "el": $('#element9')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element10 = new ChartElement({
        "id": "element10",
        "charting.axisX.scale": "linear",
        "trellis.enabled": "0",
        "charting.chart.style": "shiny",
        "charting.legend.labelStyle.overflowMode": "ellipsisMiddle",
        "charting.axisLabelsX.majorLabelStyle.rotation": "0",
        "charting.legend.placement": "right",
        "charting.chart.stackMode": "stacked",
        "charting.axisY.scale": "linear",
        "charting.axisTitleY2.visibility": "visible",
        "charting.axisTitleX.visibility": "visible",
        "charting.axisY2.enabled": "0",
        "charting.chart.bubbleMaximumSize": "50",
        "trellis.scales.shared": "1",
        "charting.chart.bubbleMinimumSize": "10",
        "trellis.size": "medium",
        "resizable": true,
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "charting.axisY2.scale": "inherit",
        "charting.chart.nullValueMode": "gaps",
        "charting.chart.showDataLabels": "none",
        "charting.drilldown": "none",
        "charting.axisLabelsX.majorLabelStyle.overflowMode": "ellipsisNone",
        "charting.layout.splitSeries.allowIndependentYRanges": "0",
        "charting.chart": "pie",
        "charting.axisTitleY.visibility": "visible",
        "charting.chart.bubbleSizeBy": "area",
        "charting.layout.splitSeries": "0",
        "managerid": "search10",
        "el": $('#element10')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element11 = new TableElement({
        "id": "element11",
        "dataOverlayMode": "none",
        "drilldown": "cell",
        "percentagesRow": "false",
        "rowNumbers": "true",
        "totalsRow": "false",
        "wrap": "false",
        "managerid": "search11",
        "el": $('#element11')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      element11.on("click", (e) => {
        if (e.field !== undefined) {
          e.preventDefault()
          const url = baseUrl + "/app/SplunkAppForWazuh/search?q=index="+window.window.localStorage['selectedIndex']+" sourcetype=\"wazuh\"  | chart sparkline count by rule.description | sort - count | head 5"
          utils.redirect(url, false, "_blank")
        }
      })

      const element12 = new TableElement({
        "id": "element12",
        "dataOverlayMode": "none",
        "drilldown": "cell",
        "percentagesRow": "false",
        "rowNumbers": "true",
        "totalsRow": "false",
        "wrap": "false",
        "managerid": "search12",
        "el": $('#element12')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      element12.on("click", (e) => {
        if (e.field !== undefined) {
          e.preventDefault()
          const url = baseUrl + "/app/SplunkAppForWazuh/search?q=index="+window.window.localStorage['selectedIndex']+" sourcetype=\"wazuh\" \"rule.level\">=9 | table agent.name, rule.level, rule.description"
          utils.redirect(url, false, "_blank")
        }
      })

      const element13 = new TableElement({
        "id": "element13",
        "dataOverlayMode": "none",
        "drilldown": "cell",
        "percentagesRow": "false",
        "rowNumbers": "true",
        "totalsRow": "false",
        "wrap": "true",
        "managerid": "search13",
        "el": $('#element13')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      element13.on("click", (e) => {
        if (e.field !== undefined) {
          e.preventDefault()
          const url = baseUrl + "/app/SplunkAppForWazuh/search?q=index="+window.window.localStorage['selectedIndex']+" sourcetype=\"wazuh\" | table agent.name, agent.ip, rule.id, rule.level, rule.description, full_log | sort _time"
          utils.redirect(url, false, "_blank")
        }
      })


      //
      // VIEWS: FORM INPUTS
      //

      const input1 = new DropdownInput({
        "id": "input1",
        "choices": [
          { "label": "ALL", "value": "*" }
        ],
        "valueField": "agent.name",
        "initialValue": "*",
        "selectFirstChoice": false,
        "showClearButton": true,
        "labelField": "agent.name",
        "searchWhenChanged": true,
        "default": "*",
        "value": "$form.agent$",
        "managerid": "search14",
        "el": $('#input1')
      }, { tokens: true }).render()

      input1.on("change", (newValue) => {
        FormUtils.handleValueChange(input1)
      })

      const input2 = new TimeRangeInput({
        "id": "input2",
        "searchWhenChanged": true,
        "default": { "latest_time": "now", "earliest_time": "-24h@h" },
        "earliest_time": "$form.when.earliest$",
        "latest_time": "$form.when.latest$",
        "el": $('#input2')
      }, { tokens: true }).render()

      input2.on("change", (newValue) => {
        FormUtils.handleValueChange(input2)
      })

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


      //
      // DASHBOARD READY
      //

      DashboardController.ready()
      pageLoading = false
    }).catch((err) => { window.location.href = '/en-US/app/SplunkAppForWazuh/API' })
  }
)
// ]]>
