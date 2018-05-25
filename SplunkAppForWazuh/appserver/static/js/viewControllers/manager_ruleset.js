/*
 * Wazuh app - Ruleset view controller
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
  "/static/app/SplunkAppForWazuh/js/directives/tableView.js",
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
    tableView,
    CredentialService,
    Toast
  ) {

    let pageLoading = true

    const urlTokenModel = new UrlTokenModel()
    mvc.Components.registerInstance('url', urlTokenModel)
    const defaultTokenModel = mvc.Components.getInstance('default', { create: true })
    const submittedTokenModel = mvc.Components.getInstance('submitted', { create: true })
    const errorToast = new Toast('error', 'toast-bottom-right', 'Error at loading ruleset info', 1000, 250, 250)
    CredentialService.checkSelectedApiConnection().then((api) => {

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

      /**
       * Initializes data for rendering ruleset table
       */
      const initializeRuleset = async () => {
        try {
          const opts = {
            pages: 10,
            processing: true,
            serverSide: true,
            filterVisible: false,
            columns: [
              { "data": "id", 'orderable': true, defaultContent: "-" },
              { "data": "path", 'orderable': true, defaultContent: "-" },
              { "data": "status", 'orderable': true, defaultContent: "-" },
              { "data": "file", 'orderable': true, defaultContent: "-" },
              { "data": "groups", 'orderable': false, defaultContent: "-" },
              { "data": "description", 'orderable': true, defaultContent: "-" },
              { "data": "level", 'orderable': true, defaultContent: "-" },
              { "data": "pci", 'orderable': false, defaultContent: "-" }
            ]
          }
          const table = new tableView()
          table.element($('#myTable'))
          table.build('/manager/rules?ip=' + api.url + '&port=' + api.portapi + '&user=' + api.userapi + '&pass=' + api.passapi, opts)
          table.click(function (data) {
            setToken("showDetails", "true")
            setToken("id", data.id || "-")
            setToken("description", data.description || "-")
            setToken("Groups", data.groups)
            setToken("details-if_sid", data.details.if_sid || "-")
            setToken("details-regex", data.details.regex || "-")
            setToken("details-info", data.details.info || "-")
            setToken("details-frequency", data.details.frequency || "-")
          })
        } catch (err) {
          errorToast.show()
        }
      }

      $(document).ready(() => initializeRuleset())

      const search2 = new SearchManager({
        "id": "search2",
        "cancelOnUnload": true,
        "sample_ratio": null,
        "earliest_time": "-24h@h",
        "status_buckets": 0,
        "search": "index="+window.window.localStorage['selectedIndex']+" sourcetype=wazuh | top rule.id",
        "latest_time": "now",
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
        "sample_ratio": null,
        "earliest_time": "-24h@h",
        "status_buckets": 0,
        "search": "index="+window.window.localStorage['selectedIndex']+" sourcetype=wazuh | top rule.groups",
        "latest_time": "now",
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
        "sample_ratio": null,
        "earliest_time": "-24h@h",
        "status_buckets": 0,
        "search": "index="+window.window.localStorage['selectedIndex']+" sourcetype=wazuh | top rule.pci_dss{} useother=f",
        "latest_time": "now",
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
        "sample_ratio": null,
        "earliest_time": "-24h@h",
        "status_buckets": 0,
        "search": "index="+window.window.localStorage['selectedIndex']+" sourcetype=wazuh  | top rule.level",
        "latest_time": "now",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })


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

      const element2 = new HtmlElement({
        "id": "element2",
        "useTokens": true,
        "el": $('#element2')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      DashboardController.addReadyDep(element2.contentLoaded())

      const element3 = new ChartElement({
        "id": "element3",
        "charting.drilldown": "none",
        "resizable": true,
        "charting.chart": "pie",
        "managerid": "search2",
        "el": $('#element3')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element4 = new ChartElement({
        "id": "element4",
        "charting.drilldown": "none",
        "resizable": true,
        "charting.chart": "pie",
        "managerid": "search3",
        "el": $('#element4')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element5 = new ChartElement({
        "id": "element5",
        "charting.drilldown": "none",
        "resizable": true,
        "charting.chart": "pie",
        "managerid": "search4",
        "el": $('#element5')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      const element6 = new ChartElement({
        "id": "element6",
        "charting.drilldown": "none",
        "resizable": true,
        "charting.chart": "pie",
        "managerid": "search5",
        "el": $('#element6')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      // Initialize time tokens to default
      if (!defaultTokenModel.has('earliest') && !defaultTokenModel.has('latest')) {
        defaultTokenModel.set({ earliest: '0', latest: '' })
      }

      submitTokens()

      DashboardController.ready()
      pageLoading = false
    }).catch((err) => { window.location.href = '/en-US/app/SplunkAppForWazuh/API' })

  }
)