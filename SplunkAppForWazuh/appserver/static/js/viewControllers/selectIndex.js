/*
 * Wazuh app - PCI-DSS view controller
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
  "/static/app/SplunkAppForWazuh/js/utilLib/credentialService.js",
  "/static/app/SplunkAppForWazuh/js/customViews/toaster.js"
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

    $(document).ready(() => {
      const urlTemp = window.location.href
      const arr = urlTemp.split("/")
      baseUrl = arr[0] + "//" + arr[2]
    })

    const searchIndexes = new SearchManager({
      "id": "searchIndexes",
      "cancelOnUnload": true,
      "sample_ratio": null,
      "earliest_time": "-24h@h",
      "status_buckets": 0,
      "search": "| metasearch index=\"*\" sourcetype=wazuh | stats count by index, sourcetype | fields index",
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


    const inputIndexes = new DropdownInput({
      "id": "inputIndexes",
      "choices": [
        { "label": "ALL", "value": "*" }
      ],
      "labelField": "index",
      "searchWhenChanged": true,
      "default": "*",
      "valueField": "index",
      "initialValue": "*",
      "selectFirstChoice": false,
      "showClearButton": true,
      "value": "$form.index$",
      "managerid": "searchIndexes",
      "el": $('#inputIndexes')
    }, { tokens: true }).render()

    inputIndexes.on("change", (newValue) => {
      console.log('index changed: ',newValue)
      FormUtils.handleValueChange(inputIndexes)
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

    DashboardController.ready()
    pageLoading = false

  }
)

