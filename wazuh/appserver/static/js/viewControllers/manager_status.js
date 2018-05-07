/*
 * Wazuh app - Manager status view controller
 * Copyright (C) 2018 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
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
  "splunkjs/mvc/simplexml/urltokenmodel"
  // Add comma-separated libraries and modules manually here, for example:
  // ..."splunkjs/mvc/simplexml/urltokenmodel",
  // "splunkjs/mvc/tokenforwarder"
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
    UrlTokenModel

    // Add comma-separated parameter names here, for example: 
    // ...UrlTokenModel, 
    // TokenForwarder
  ) {

    let pageLoading = true;


    // 
    // TOKENS
    //

    // Create token namespaces
    const urlTokenModel = new UrlTokenModel();
    mvc.Components.registerInstance('url', urlTokenModel);
    const defaultTokenModel = mvc.Components.getInstance('default', { create: true });
    const submittedTokenModel = mvc.Components.getInstance('submitted', { create: true });
    const service = mvc.createService({ owner: "nobody" });

    urlTokenModel.on('url:navigate', function () {
      defaultTokenModel.set(urlTokenModel.toJSON());
      if (!_.isEmpty(urlTokenModel.toJSON()) && !_.all(urlTokenModel.toJSON(), _.isUndefined)) {
        submitTokens();
      } else {
        submittedTokenModel.clear();
      }
    });

    // Initialize tokens
    defaultTokenModel.set(urlTokenModel.toJSON());

    function submitTokens() {
      // Copy the contents of the defaultTokenModel to the submittedTokenModel and urlTokenModel
      FormUtils.submitForm({ replaceState: pageLoading });
    }

    function setToken(name, value) {
      defaultTokenModel.set(name, value);
      submittedTokenModel.set(name, value);
    }

    function unsetToken(name) {
      defaultTokenModel.unset(name);
      submittedTokenModel.unset(name);
    }

    $(document).ready(function () {
      service.request(
        "storage/collections/data/credentials/",
        "GET",
        null,
        null,
        null,
        { "Content-Type": "application/json" }, null
      ).done(function (data) {
        const parsedData = JSON.parse(data);
        const url = window.location.href
        const arr = url.split("/")
        const baseUrl = arr[0] + "//" + arr[2]
        console.log('baseurl ', baseUrl)
        setToken('baseip', baseUrl);
        setToken('url', parsedData[0].url);
        setToken('portapi', parsedData[0].portapi);
        setToken('userapi', parsedData[0].userapi);
        setToken('passwordapi', parsedData[0].passapi);
        setToken("loadedtokens", "true");
      });
    })


    const search1 = new SearchManager({
      "id": "search1",
      "sample_ratio": null,
      "search": "| getmanagerstatus $baseip$ $url$ $portapi$ $userapi$ $passwordapi$ | rename manager-status_ossec-analysisd as analysisd | eval value=if(analysisd=\"running\",\"1\",\"0\") | top value showcount=f showperc=f | rangemap  field=value  up=1-1 down=0-0 none=2-2 default=none",
      "status_buckets": 0,
      "earliest_time": "$earliest$",
      "cancelOnUnload": true,
      "latest_time": "$latest$",
      "app": utils.getCurrentApp(),
      "auto_cancel": 90,
      "preview": true,
      "tokenDependencies": {
      },
      "runWhenTimeIsUndefined": false
    }, { tokens: true, tokenNamespace: "submitted" });

    new SearchEventHandler({
      managerid: "search1",
      event: "progress",
      conditions: [
        {
          attr: "any",
          value: "*",
          actions: [
            { "type": "set", "token": "value1", "value": "$result.value$" },
            { "type": "set", "token": "range1", "value": "$result.range$" }
          ]
        }
      ]
    });

    const search2 = new SearchManager({
      "id": "search2",
      "sample_ratio": null,
      "search": "| getmanagerstatus $baseip$ $url$ $portapi$ $userapi$ $passwordapi$ | rename manager-status_ossec-execd as execd| eval value=if(execd=\"running\",\"1\",\"0\") | top value showcount=f showperc=f | rangemap  field=value  up=1-1 down=0-0 none=2-2 default=none",
      "status_buckets": 0,
      "earliest_time": "$earliest$",
      "cancelOnUnload": true,
      "latest_time": "$latest$",
      "app": utils.getCurrentApp(),
      "auto_cancel": 90,
      "preview": true,
      "tokenDependencies": {
      },
      "runWhenTimeIsUndefined": false
    }, { tokens: true, tokenNamespace: "submitted" });

    new SearchEventHandler({
      managerid: "search2",
      event: "progress",
      conditions: [
        {
          attr: "any",
          value: "*",
          actions: [
            { "type": "set", "token": "value2", "value": "$result.value$" },
            { "type": "set", "token": "range2", "value": "$result.range$" }
          ]
        }
      ]
    });

    const search3 = new SearchManager({
      "id": "search3",
      "sample_ratio": null,
      "search": "| getmanagerstatus $baseip$ $url$ $portapi$ $userapi$ $passwordapi$ | rename manager-status_ossec-logcollector as logcollector| eval value=if(logcollector=\"running\",\"1\",\"0\") | top value showcount=f showperc=f | rangemap  field=value  up=1-1 down=0-0 none=2-2 default=none",
      "status_buckets": 0,
      "earliest_time": "$earliest$",
      "cancelOnUnload": true,
      "latest_time": "$latest$",
      "app": utils.getCurrentApp(),
      "auto_cancel": 90,
      "preview": true,
      "tokenDependencies": {
      },
      "runWhenTimeIsUndefined": false
    }, { tokens: true, tokenNamespace: "submitted" });

    new SearchEventHandler({
      managerid: "search3",
      event: "progress",
      conditions: [
        {
          attr: "any",
          value: "*",
          actions: [
            { "type": "set", "token": "value3", "value": "$result.value$" },
            { "type": "set", "token": "range3", "value": "$result.range$" }
          ]
        }
      ]
    });

    const search4 = new SearchManager({
      "id": "search4",
      "sample_ratio": null,
      "search": "| getmanagerstatus $baseip$ $url$ $portapi$ $userapi$ $passwordapi$ | rename manager-status_ossec-monitord as monitord | eval value=if(monitord=\"running\",\"1\",\"0\") | top value showcount=f showperc=f | rangemap  field=value  up=1-1 down=0-0 none=2-2 default=none",
      "status_buckets": 0,
      "earliest_time": "$earliest$",
      "cancelOnUnload": true,
      "latest_time": "$latest$",
      "app": utils.getCurrentApp(),
      "auto_cancel": 90,
      "preview": true,
      "tokenDependencies": {
      },
      "runWhenTimeIsUndefined": false
    }, { tokens: true, tokenNamespace: "submitted" });

    new SearchEventHandler({
      managerid: "search4",
      event: "progress",
      conditions: [
        {
          attr: "any",
          value: "*",
          actions: [
            { "type": "set", "token": "value4", "value": "$result.value$" },
            { "type": "set", "token": "range4", "value": "$result.range$" }
          ]
        }
      ]
    });

    const search5 = new SearchManager({
      "id": "search5",
      "sample_ratio": null,
      "search": "| getmanagerstatus $baseip$ $url$ $portapi$ $userapi$ $passwordapi$ | rename manager-status_ossec-remoted as remoted | eval value=if(remoted=\"running\",\"1\",\"0\") | top value showcount=f showperc=f | rangemap  field=value  up=1-1 down=0-0 none=2-2 default=none",
      "status_buckets": 0,
      "earliest_time": "$earliest$",
      "cancelOnUnload": true,
      "latest_time": "$latest$",
      "app": utils.getCurrentApp(),
      "auto_cancel": 90,
      "preview": true,
      "tokenDependencies": {
      },
      "runWhenTimeIsUndefined": false
    }, { tokens: true, tokenNamespace: "submitted" });

    new SearchEventHandler({
      managerid: "search5",
      event: "progress",
      conditions: [
        {
          attr: "any",
          value: "*",
          actions: [
            { "type": "set", "token": "value5", "value": "$result.value$" },
            { "type": "set", "token": "range5", "value": "$result.range$" }
          ]
        }
      ]
    });

    const search6 = new SearchManager({
      "id": "search6",
      "sample_ratio": null,
      "search": "| getmanagerstatus $baseip$ $url$ $portapi$ $userapi$ $passwordapi$ | rename manager-status_ossec-maild as maild  | eval value=if(maild=\"running\",\"1\",\"0\") | top value showcount=f showperc=f | rangemap  field=value  up=1-1 down=0-0 none=2-2 default=none",
      "status_buckets": 0,
      "earliest_time": "$earliest$",
      "cancelOnUnload": true,
      "latest_time": "$latest$",
      "app": utils.getCurrentApp(),
      "auto_cancel": 90,
      "preview": true,
      "tokenDependencies": {
      },
      "runWhenTimeIsUndefined": false
    }, { tokens: true, tokenNamespace: "submitted" });

    new SearchEventHandler({
      managerid: "search6",
      event: "progress",
      conditions: [
        {
          attr: "any",
          value: "*",
          actions: [
            { "type": "set", "token": "value6", "value": "$result.value$" },
            { "type": "set", "token": "range6", "value": "$result.range$" }
          ]
        }
      ]
    });

    const search7 = new SearchManager({
      "id": "search7",
      "sample_ratio": null,
      "search": "| getmanagerstatus $baseip$ $url$ $portapi$ $userapi$ $passwordapi$ | rename manager-status_ossec-authd as authd  | eval value=if(authd=\"running\",\"1\",\"0\") | top value showcount=f showperc=f | rangemap  field=value  up=1-1 down=0-0 none=2-2 default=none",
      "status_buckets": 0,
      "earliest_time": "$earliest$",
      "cancelOnUnload": true,
      "latest_time": "$latest$",
      "app": utils.getCurrentApp(),
      "auto_cancel": 90,
      "preview": true,
      "tokenDependencies": {
      },
      "runWhenTimeIsUndefined": false
    }, { tokens: true, tokenNamespace: "submitted" });

    new SearchEventHandler({
      managerid: "search7",
      event: "progress",
      conditions: [
        {
          attr: "any",
          value: "*",
          actions: [
            { "type": "set", "token": "value7", "value": "$result.value$" },
            { "type": "set", "token": "range7", "value": "$result.range$" }
          ]
        }
      ]
    });

    const search8 = new SearchManager({
      "id": "search8",
      "sample_ratio": null,
      "search": "| getmanagerstatus $baseip$ $url$ $portapi$ $userapi$ $passwordapi$ | rename manager-status_wazuh-modulesd as modulesd  | eval value=if(modulesd=\"running\",\"1\",\"0\") | top value showcount=f showperc=f | rangemap  field=value  up=1-1 down=0-0 none=2-2 default=none",
      "status_buckets": 0,
      "earliest_time": "$earliest$",
      "cancelOnUnload": true,
      "latest_time": "$latest$",
      "app": utils.getCurrentApp(),
      "auto_cancel": 90,
      "preview": true,
      "tokenDependencies": {
      },
      "runWhenTimeIsUndefined": false
    }, { tokens: true, tokenNamespace: "submitted" });

    new SearchEventHandler({
      managerid: "search8",
      event: "progress",
      conditions: [
        {
          attr: "any",
          value: "*",
          actions: [
            { "type": "set", "token": "value8", "value": "$result.value$" },
            { "type": "set", "token": "range8", "value": "$result.range$" }
          ]
        }
      ]
    });

    const search9 = new SearchManager({
      "id": "search9",
      "sample_ratio": null,
      "search": "| getmanagerstatus $baseip$ $url$ $portapi$ $userapi$ $passwordapi$ | rename manager-status_ossec-syscheckd as syscheckd  | eval value=if(syscheckd=\"running\",\"1\",\"0\") | top value showcount=f showperc=f | rangemap  field=value  up=1-1 down=0-0 none=2-2 default=none",
      "status_buckets": 0,
      "earliest_time": "$earliest$",
      "cancelOnUnload": true,
      "latest_time": "$latest$",
      "app": utils.getCurrentApp(),
      "auto_cancel": 90,
      "preview": true,
      "tokenDependencies": {
      },
      "runWhenTimeIsUndefined": false
    }, { tokens: true, tokenNamespace: "submitted" });

    new SearchEventHandler({
      managerid: "search9",
      event: "progress",
      conditions: [
        {
          attr: "any",
          value: "*",
          actions: [
            { "type": "set", "token": "value9", "value": "$result.value$" },
            { "type": "set", "token": "range9", "value": "$result.range$" }
          ]
        }
      ]
    });

    const search10 = new SearchManager({
      "id": "search10",
      "sample_ratio": null,
      "search": "| getagentsummary $baseip$ $url$ $portapi$ $userapi$ $passwordapi$ | stats first(agent_summary_total) as \"Total Agents\"",
      "status_buckets": 0,
      "earliest_time": "-15m",
      "cancelOnUnload": true,
      "latest_time": "now",
      "app": utils.getCurrentApp(),
      "auto_cancel": 90,
      "preview": true,
      "tokenDependencies": {
      },
      "runWhenTimeIsUndefined": false
    }, { tokens: true, tokenNamespace: "submitted" });

    const search11 = new SearchManager({
      "id": "search11",
      "sample_ratio": null,
      "search": "| getagentsummary $baseip$ $url$ $portapi$ $userapi$ $passwordapi$ | stats first(agent_summary_active) as \"Active Agents\"",
      "status_buckets": 0,
      "earliest_time": "-15m",
      "cancelOnUnload": true,
      "latest_time": "now",
      "app": utils.getCurrentApp(),
      "auto_cancel": 90,
      "preview": true,
      "tokenDependencies": {
      },
      "runWhenTimeIsUndefined": false
    }, { tokens: true, tokenNamespace: "submitted" });

    const search12 = new SearchManager({
      "id": "search12",
      "sample_ratio": null,
      "search": "| getagentsummary $baseip$ $url$ $portapi$ $userapi$ $passwordapi$ | stats first(agent_summary_disconnected) as \"Disconnected\"",
      "status_buckets": 0,
      "earliest_time": "-15m",
      "cancelOnUnload": true,
      "latest_time": "now",
      "app": utils.getCurrentApp(),
      "auto_cancel": 90,
      "preview": true,
      "tokenDependencies": {
      },
      "runWhenTimeIsUndefined": false
    }, { tokens: true, tokenNamespace: "submitted" });

    const search13 = new SearchManager({
      "id": "search13",
      "sample_ratio": null,
      "search": "| getagentsummary $baseip$ $url$ $portapi$ $userapi$ $passwordapi$ | stats first(agent_summary_neverconnected) as \"Never\"",
      "status_buckets": 0,
      "earliest_time": "-24h@h",
      "cancelOnUnload": true,
      "latest_time": "now",
      "app": utils.getCurrentApp(),
      "auto_cancel": 90,
      "preview": true,
      "tokenDependencies": {
      },
      "runWhenTimeIsUndefined": false
    }, { tokens: true, tokenNamespace: "submitted" });

    const search14 = new SearchManager({
      "id": "search14",
      "sample_ratio": null,
      "search": "| getagentsummary $baseip$ $url$ $portapi$ $userapi$ $passwordapi$ | rename agent_summary_active as Active, agent_summary_total as Total | eval Coverage=round((Active*100)/Total,2) | eval Coverage=Coverage + \" %\" | top Coverage showcount=f showperc=f",
      "status_buckets": 0,
      "earliest_time": "-15m",
      "cancelOnUnload": true,
      "latest_time": "now",
      "app": utils.getCurrentApp(),
      "auto_cancel": 90,
      "preview": true,
      "tokenDependencies": {
      },
      "runWhenTimeIsUndefined": false
    }, { tokens: true, tokenNamespace: "submitted" });

    const search15 = new SearchManager({
      "id": "search15",
      "sample_ratio": 1,
      "search": "| getagentsummary $baseip$ $url$ $portapi$ $userapi$ $passwordapi$ | stats latest(*) | fields - latest(punct),latest(timestamp),latest(linecount),latest(error),latest(host),latest(agent_summary_disconnected),latest(agent_summary_neverconnected),latest(agent_summary_total),latest(date_hour),latest(date_mday),latest(date_minute),latest(date_month),latest(date_second),latest(date_wday),latest(date_year),latest(date_zone),latest(index),latest(manager-info_tz_offset),latest(manager-status_ossec-analysisd),latest(manager-status_ossec-authd),latest(manager-status_ossec-execd),latest(manager-status_ossec-logcollector),latest(manager-status_ossec-maild),latest(manager-status_ossec-monitord),latest(manager-status_ossec-remoted),latest(manager-status_ossec-syscheckd),latest(manager-status_wazuh-modulesd),latest(source),latest(timeendpos),latest(timestartpos) | rename latest(agent_summary_active) as \"Agents Active\", latest(manager-info_installation_date) as \"Installation date\", latest(manager-info_max_agents) as \"Max agents\",latest(manager-info_openssl_support) as \"SSL Support\", latest(manager-info_path) as \"WAZUH PATH\",latest(manager-info_type) as \"Role\",latest(manager-info_tz_name) as \"Time Zone\", latest(manager-info_version) as \"WAZUH VERSION\", latest(sourcetype) as \"sourcetype\", latest(splunk_server) as \"Splunk Server\", latest(manager-info_ruleset_version) as \"Ruleset version\" | appendcols [search index=\"wazuh_api\" sourcetype=* sourcetype=wazuh_api_rules \"agent_summary_totalItems\"=\"*\" | head 1 | stats count by agent_summary_totalItems | fields - count  | transpose | rename \"row 1\" as \"Total rules\" | sort Component ] | transpose | rename \"column\" as Component, \"row 1\" as \"Value\" | head 10",
      "status_buckets": 0,
      "earliest_time": "-15m",
      "cancelOnUnload": true,
      "latest_time": "now",
      "app": utils.getCurrentApp(),
      "auto_cancel": 90,
      "preview": true,
      "tokenDependencies": {
      },
      "runWhenTimeIsUndefined": false
    }, { tokens: true, tokenNamespace: "submitted" });


    //
    // SPLUNK LAYOUT
    //

    $('header').remove();
    new LayoutView({ "hideChrome": false, "hideAppBar": false, "hideSplunkBar": false, "hideFooter": false })
      .render()
      .getContainerElement()
      .appendChild($('.dashboard-body')[0]);

    //
    // DASHBOARD EDITOR
    //

    new Dashboard({
      id: 'dashboard',
      el: $('.dashboard-body'),
      showTitle: true,
      editable: true
    }, { tokens: true }).render();


    //
    // VIEWS: VISUALIZATION ELEMENTS
    //

    const element1 = new HtmlElement({
      "id": "element1",
      "useTokens": true,
      "el": $('#element1')
    }, { tokens: true, tokenNamespace: "submitted" }).render();

    DashboardController.addReadyDep(element1.contentLoaded());

    const element2 = new HtmlElement({
      "id": "element2",
      "useTokens": true,
      "el": $('#element2')
    }, { tokens: true, tokenNamespace: "submitted" }).render();

    DashboardController.addReadyDep(element2.contentLoaded());

    const element3 = new HtmlElement({
      "id": "element3",
      "useTokens": true,
      "el": $('#element3')
    }, { tokens: true, tokenNamespace: "submitted" }).render();

    DashboardController.addReadyDep(element3.contentLoaded());

    const element4 = new HtmlElement({
      "id": "element4",
      "useTokens": true,
      "el": $('#element4')
    }, { tokens: true, tokenNamespace: "submitted" }).render();

    DashboardController.addReadyDep(element4.contentLoaded());

    const element5 = new HtmlElement({
      "id": "element5",
      "useTokens": true,
      "el": $('#element5')
    }, { tokens: true, tokenNamespace: "submitted" }).render();

    DashboardController.addReadyDep(element5.contentLoaded());

    const element6 = new HtmlElement({
      "id": "element6",
      "useTokens": true,
      "el": $('#element6')
    }, { tokens: true, tokenNamespace: "submitted" }).render();

    DashboardController.addReadyDep(element6.contentLoaded());

    const element7 = new HtmlElement({
      "id": "element7",
      "useTokens": true,
      "el": $('#element7')
    }, { tokens: true, tokenNamespace: "submitted" }).render();

    DashboardController.addReadyDep(element7.contentLoaded());

    const element8 = new HtmlElement({
      "id": "element8",
      "useTokens": true,
      "el": $('#element8')
    }, { tokens: true, tokenNamespace: "submitted" }).render();

    DashboardController.addReadyDep(element8.contentLoaded());

    const element9 = new HtmlElement({
      "id": "element9",
      "useTokens": true,
      "el": $('#element9')
    }, { tokens: true, tokenNamespace: "submitted" }).render();

    DashboardController.addReadyDep(element9.contentLoaded());

    const element10 = new SingleElement({
      "id": "element10",
      "drilldown": "none",
      "height": "50",
      "managerid": "search10",
      "el": $('#element10')
    }, { tokens: true, tokenNamespace: "submitted" }).render();

    const element11 = new SingleElement({
      "id": "element11",
      "drilldown": "none",
      "height": "50",
      "managerid": "search11",
      "el": $('#element11')
    }, { tokens: true, tokenNamespace: "submitted" }).render();

    const element12 = new SingleElement({
      "id": "element12",
      "drilldown": "none",
      "height": "50",
      "managerid": "search12",
      "el": $('#element12')
    }, { tokens: true, tokenNamespace: "submitted" }).render();

    const element13 = new SingleElement({
      "id": "element13",
      "drilldown": "none",
      "height": "50",
      "managerid": "search13",
      "el": $('#element13')
    }, { tokens: true, tokenNamespace: "submitted" }).render();

    const element14 = new SingleElement({
      "id": "element14",
      "drilldown": "none",
      "height": "50",
      "managerid": "search14",
      "el": $('#element14')
    }, { tokens: true, tokenNamespace: "submitted" }).render();

    const element15 = new TableElement({
      "id": "element15",
      "count": 100,
      "dataOverlayMode": "none",
      "drilldown": "none",
      "percentagesRow": "false",
      "rowNumbers": "false",
      "totalsRow": "false",
      "wrap": "false",
      "managerid": "search15",
      "el": $('#element15')
    }, { tokens: true, tokenNamespace: "submitted" }).render();

    // Initialize time tokens to default
    if (!defaultTokenModel.has('earliest') && !defaultTokenModel.has('latest')) {
      defaultTokenModel.set({ earliest: '0', latest: '' });
    }

    submitTokens();


    //
    // DASHBOARD READY
    //

    DashboardController.ready();
    pageLoading = false;

  }
);
// ]]>
