/*
 * Wazuh app - Overview GDPR view controller
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
  "/static/app/SplunkAppForWazuh/js/services/indexService.js"

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
    IndexService
  ) {

    CredentialService.checkSelectedApiConnection().then((api) => {

      let pageLoading = true
      const errorToast = new Toast('error', 'toast-bottom-right', 'Error at loading data', 1000, 250, 250)
      let selectedIndex = IndexService.get() || "*"

      const urlTokenModel = new UrlTokenModel()
      mvc.Components.registerInstance('url', urlTokenModel)
      const defaultTokenModel = mvc.Components.getInstance('default', { create: true })
      const submittedTokenModel = mvc.Components.getInstance('submitted', { create: true })

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



      //
      // SEARCH MANAGERS
      //


      const search1 = new SearchManager({
        "id": "search1",
        "status_buckets": 0,
        "sample_ratio": 1,
        "latest_time": "$when.latest$",
        "search": "index="+selectedIndex+" sourcetype=wazuh rule.gdpr{}=\"$gdpr$\"  | stats count by rule.gdpr{}",
        "earliest_time": "$when.earliest$",
        "cancelOnUnload": true,
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      const search2 = new SearchManager({
        "id": "search2",
        "status_buckets": 0,
        "sample_ratio": 1,
        "latest_time": "$when.latest$",
        "search": "index="+selectedIndex+" sourcetype=wazuh rule.gdpr{}=\"$gdpr$\" | stats count by rule.groups",
        "earliest_time": "$when.earliest$",
        "cancelOnUnload": true,
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
        "sample_ratio": 1,
        "latest_time": "$when.latest$",
        "search": "index="+selectedIndex+" sourcetype=wazuh rule.gdpr{}=\"$gdpr$\" | stats count by agent.name",
        "earliest_time": "$when.earliest$",
        "cancelOnUnload": true,
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
        "sample_ratio": 1,
        "latest_time": "$when.latest$",
        "search": "index="+selectedIndex+" sourcetype=wazuh rule.gdpr{}=\"$gdpr$\" agent.name=*| chart  count(rule.gdpr{}) by rule.gdpr{},agent.name",
        "earliest_time": "$when.earliest$",
        "cancelOnUnload": true,
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
        "sample_ratio": 1,
        "latest_time": "$when.latest$",
        "search": "index="+selectedIndex+" sourcetype=wazuh rule.gdpr{}=\"$gdpr$\" | stats count sparkline by agent.name, rule.gdpr{}, rule.description | sort count DESC | rename agent.name as \"Agent Name\", rule.gdpr{} as Requirement, rule.description as \"Rule description\", count as Count",
        "earliest_time": "$when.earliest$",
        "cancelOnUnload": true,
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
        "sample_ratio": 1,
        "latest_time": "now",
        "search": "| inputlookup gdpr.csv  |search REQUIREMENT=\"$gdpr$\" | table REQUIREMENT,DESCRIPTION",
        "earliest_time": "-24h@h",
        "cancelOnUnload": true,
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
        "sample_ratio": null,
        "latest_time": "now",
        "search": "index="+selectedIndex+" sourcetype=wazuh rule.gdpr{}=\"*\"| stats count by \"rule.gdpr{}\" | sort \"rule.gdpr{}\" ASC | fields - count",
        "earliest_time": "-24h@h",
        "cancelOnUnload": true,
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
      new LayoutView({ "hideAppBar": false, "hideChrome": false, "hideSplunkBar": false })
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

      const element1 = new ChartElement({
        "id": "element1",
        "charting.axisTitleY2.visibility": "visible",
        "charting.axisLabelsX.majorLabelStyle.overflowMode": "ellipsisNone",
        "charting.legend.placement": "none",
        "charting.chart.bubbleMaximumSize": "50",
        "charting.legend.labelStyle.overflowMode": "ellipsisMiddle",
        "charting.drilldown": "none",
        "trellis.size": "medium",
        "charting.axisY2.enabled": "0",
        "charting.chart.bubbleSizeBy": "area",
        "charting.layout.splitSeries.allowIndependentYRanges": "0",
        "trellis.enabled": "0",
        "charting.chart.nullValueMode": "gaps",
        "charting.chart.stackMode": "default",
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "charting.axisLabelsX.majorLabelStyle.rotation": "-45",
        "charting.layout.splitSeries": "0",
        "charting.chart.bubbleMinimumSize": "10",
        "charting.axisTitleX.visibility": "collapsed",
        "charting.chart.style": "shiny",
        "charting.axisX.scale": "linear",
        "charting.axisTitleY.visibility": "collapsed",
        "charting.axisY2.scale": "inherit",
        "resizable": true,
        "charting.chart.showDataLabels": "none",
        "charting.chart": "column",
        "charting.axisY.scale": "linear",
        "trellis.scales.shared": "1",
        "managerid": "search1",
        "el": $('#element1')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element2 = new ChartElement({
        "id": "element2",
        "charting.axisTitleY2.visibility": "visible",
        "charting.axisLabelsX.majorLabelStyle.overflowMode": "ellipsisNone",
        "charting.legend.placement": "right",
        "charting.chart.bubbleMaximumSize": "50",
        "charting.legend.labelStyle.overflowMode": "ellipsisMiddle",
        "charting.drilldown": "none",
        "trellis.size": "medium",
        "charting.axisY2.enabled": "0",
        "charting.chart.bubbleSizeBy": "area",
        "charting.layout.splitSeries.allowIndependentYRanges": "0",
        "trellis.enabled": "0",
        "charting.chart.nullValueMode": "gaps",
        "charting.chart.stackMode": "default",
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "charting.axisLabelsX.majorLabelStyle.rotation": "0",
        "charting.layout.splitSeries": "0",
        "charting.chart.bubbleMinimumSize": "10",
        "charting.axisTitleX.visibility": "visible",
        "charting.chart.style": "shiny",
        "charting.axisX.scale": "linear",
        "charting.axisTitleY.visibility": "visible",
        "charting.axisY2.scale": "inherit",
        "resizable": true,
        "charting.chart.showDataLabels": "none",
        "charting.chart": "pie",
        "charting.axisY.scale": "linear",
        "trellis.scales.shared": "1",
        "managerid": "search2",
        "el": $('#element2')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element3 = new ChartElement({
        "id": "element3",
        "charting.axisTitleY2.visibility": "visible",
        "charting.axisLabelsX.majorLabelStyle.overflowMode": "ellipsisNone",
        "charting.legend.placement": "right",
        "charting.chart.bubbleMaximumSize": "50",
        "charting.legend.labelStyle.overflowMode": "ellipsisMiddle",
        "charting.drilldown": "none",
        "trellis.size": "medium",
        "charting.axisY2.enabled": "0",
        "charting.chart.bubbleSizeBy": "area",
        "charting.layout.splitSeries.allowIndependentYRanges": "0",
        "trellis.enabled": "0",
        "charting.chart.nullValueMode": "gaps",
        "charting.chart.stackMode": "default",
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "charting.axisLabelsX.majorLabelStyle.rotation": "0",
        "charting.layout.splitSeries": "0",
        "charting.chart.bubbleMinimumSize": "10",
        "charting.axisTitleX.visibility": "visible",
        "charting.chart.style": "shiny",
        "charting.axisX.scale": "linear",
        "charting.axisTitleY.visibility": "visible",
        "charting.axisY2.scale": "inherit",
        "resizable": true,
        "charting.chart.showDataLabels": "none",
        "charting.chart": "pie",
        "charting.axisY.scale": "linear",
        "trellis.scales.shared": "1",
        "managerid": "search3",
        "el": $('#element3')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element4 = new ChartElement({
        "id": "element4",
        "charting.axisTitleY2.visibility": "visible",
        "charting.axisLabelsX.majorLabelStyle.overflowMode": "ellipsisNone",
        "charting.legend.placement": "bottom",
        "charting.chart.bubbleMaximumSize": "50",
        "charting.legend.labelStyle.overflowMode": "ellipsisMiddle",
        "charting.drilldown": "none",
        "trellis.size": "medium",
        "charting.axisY2.enabled": "0",
        "charting.chart.bubbleSizeBy": "area",
        "charting.layout.splitSeries.allowIndependentYRanges": "0",
        "trellis.enabled": "0",
        "charting.chart.nullValueMode": "connect",
        "charting.chart.stackMode": "default",
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "charting.axisLabelsX.majorLabelStyle.rotation": "0",
        "charting.layout.splitSeries": "0",
        "charting.chart.bubbleMinimumSize": "10",
        "charting.axisTitleX.visibility": "collapsed",
        "charting.chart.style": "shiny",
        "charting.axisX.scale": "linear",
        "charting.axisTitleY.visibility": "collapsed",
        "charting.axisY2.scale": "inherit",
        "resizable": true,
        "charting.chart.showDataLabels": "none",
        "charting.chart": "column",
        "charting.axisY.scale": "log",
        "trellis.scales.shared": "1",
        "managerid": "search4",
        "el": $('#element4')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element5 = new TableElement({
        "id": "element5",
        "dataOverlayMode": "heatmap",
        "drilldown": "cell",
        "percentagesRow": "false",
        "rowNumbers": "true",
        "totalsRow": "false",
        "wrap": "false",
        "managerid": "search5",
        "el": $('#element5')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      element5.on("click", function (e) {
        if (e.field !== undefined) {
          e.preventDefault()
          const url = TokenUtils.replaceTokenNames("{{SPLUNKWEB_URL_PREFIX}}/app/SplunkAppForWazuh/search?q=index="+selectedIndex+" sourcetype=wazuh rule.gdpr{}=\"$gdpr$\" | stats count sparkline by agent.name, rule.gdpr{}, rule.description | sort count DESC | rename agent.name as \"Agent Name\", rule.gdpr{} as Requirement, rule.description as \"Rule description\", count as Count&earliest=$when.earliest$&latest=$when.latest$", _.extend(submittedTokenModel.toJSON(), e.data), TokenUtils.getEscaper('url'), TokenUtils.getFilters(mvc.Components))
          utils.redirect(url, false, "_blank")
        }
      })

      const element6 = new TableElement({
        "id": "element6",
        "count": 20,
        "dataOverlayMode": "none",
        "drilldown": "none",
        "percentagesRow": "false",
        "rowNumbers": "false",
        "totalsRow": "false",
        "wrap": "true",
        "managerid": "search6",
        "el": $('#element6')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


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
        "searchWhenChanged": true,
        "valueField": "rule.gdpr{}",
        "showClearButton": true,
        "initialValue": "*",
        "default": "*",
        "labelField": "rule.gdpr{}",
        "selectFirstChoice": false,
        "value": "$form.gdpr$",
        "managerid": "search7",
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