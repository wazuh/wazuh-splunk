define([
  '../module',
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
], function (controllers,
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
  UrlTokenModel) {
    'use strict';
    controllers.controller('overviewGeneralCtrl', function ($scope) {
      $scope.message = 'Overview'
      // 
      // TOKENS
      //
      let pageLoading = true
      let overviewSearch1 = ''
      let overviewSearch2 = ''
      let overviewSearch3 = ''
      let overviewSearch4 = ''
      let overviewSearch5 = ''
      let overviewSearch6 = ''
      let overviewSearch7 = ''
      let overviewSearch8 = ''
      let overviewSearch9 = ''
      let overviewSearch10 = ''
      let overviewSearch11 = ''
      let overviewSearch12 = ''
      let overviewSearch13 = ''
      let overviewSearch14 = ''
      let overviewElement1 = ''
      let overviewElement2 = ''
      let overviewElement3 = ''
      let overviewElement4 = ''
      let overviewElement5 = ''
      let overviewElement6 = ''
      let overviewElement7 = ''
      let overviewElement8 = ''
      let overviewElement9 = ''
      let overviewElement10 = ''
      let overviewElement11 = ''
      let overviewElement12 = ''
      let overviewElement13 = ''
      let overviewElement14 = ''
      $scope.$on('$destroy', () => {
        console.log('destroyed controller')
        overviewSearch1 = null
        overviewSearch2 = null
        overviewSearch3 = null
        overviewSearch4 = null
        overviewSearch5 = null
        overviewSearch6 = null
        overviewSearch7 = null
        overviewSearch8 = null
        overviewSearch9 = null
        overviewSearch10 = null
        overviewSearch11 = null
        overviewSearch12 = null
        overviewSearch13 = null
        overviewSearch14 = null
        overviewElement1 = null
        overviewElement2 = null
        overviewElement3 = null
        overviewElement4 = null
        overviewElement5 = null
        overviewElement6 = null
        overviewElement7 = null
        overviewElement8 = null
        overviewElement9 = null
        overviewElement10 = null
        overviewElement11 = null
        overviewElement12 = null
        overviewElement13 = null
        overviewElement14 = null

      })
      // Create token namespaces
      const epoch = (new Date).getTime()
      console.log('controller manager!! ', epoch)

      var urlTokenModel = new UrlTokenModel({ id: 'tokenModel' + epoch });
      mvc.Components.registerInstance('url' + epoch, urlTokenModel);
      var defaultTokenModel = mvc.Components.getInstance('default', { create: true });
      var submittedTokenModel = mvc.Components.getInstance('submitted', { create: true });

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



      //
      // SEARCH MANAGERS
      //


      overviewSearch1 = new SearchManager({
        "id": "search1" + epoch,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": "index=wazuh | stats count",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" });

      overviewSearch2 = new SearchManager({
        "id": "search2" + epoch,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": "index=\"wazuh\" sourcetype=wazuh \"rule.level\">=12 | chart count",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" });

      overviewSearch3 = new SearchManager({
        "id": "search3" + epoch,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": "index=wazuh sourcetype=wazuh  \"rule.groups\"=\"authentication_fail*\" | stats count",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" });

      overviewSearch4 = new SearchManager({
        "id": "search4" + epoch,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": "index=wazuh sourcetype=wazuh  \"rule.groups\"=\"authentication_success\" | stats count",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" });

      overviewSearch5 = new SearchManager({
        "id": "search5" + epoch,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": "index=wazuh sourcetype=wazuh rule.level=*| timechart count by rule.level",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" });

      overviewSearch6 = new SearchManager({
        "id": "search6" + epoch,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": "index=wazuh sourcetype=wazuh | timechart span=2h count",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" });

      overviewSearch7 = new SearchManager({
        "id": "search7" + epoch,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": "index=wazuh sourcetype=wazuh | top \"agent.name\"",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" });

      overviewSearch8 = new SearchManager({
        "id": "search8" + epoch,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": "index=wazuh sourcetype=wazuh | timechart span=1h limit=5 useother=f count by agent.name",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" });

      overviewSearch9 = new SearchManager({
        "id": "search9" + epoch,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": "index=\"wazuh_api\" sourcetype=\"wazuh:api:info:basic\" | stats latest(agent_summary_active) as \"Active Agents\" | appendcols  [ search index=\"wazuh_api\" sourcetype=\"wazuh:api:info:basic\"  | stats latest(agent_summary_disconnected) as \"Disconnected\"] | transpose | rename \"column\" as Status, \"row 1\" as \"count\"",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" });

      overviewSearch10 = new SearchManager({
        "id": "search10" + epoch,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": "index=wazuh sourcetype=wazuh | top limit=1 srcuser showcount=false showperc=false",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" });

      overviewSearch11 = new SearchManager({
        "id": "search11" + epoch,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": "index=wazuh sourcetype=wazuh | top limit=1 srcip showcount=false showperc=false",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" });

      overviewSearch12 = new SearchManager({
        "id": "search12" + epoch,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": "index=wazuh sourcetype=wazuh | top limit=1 rule.groups showcount=false showperc=false",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" });

      overviewSearch13 = new SearchManager({
        "id": "search13" + epoch,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": "index=wazuh sourcetype=wazuh | top limit=1 rule.pci_dss{} showcount=false showperc=false",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" });

      overviewSearch14 = new SearchManager({
        "id": "search14" + epoch,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": "index=wazuh sourcetype=wazuh |stats count sparkline by rule.id, rule.description, rule.groups, rule.level | sort count DESC | head 10 | rename rule.id as \"Rule ID\", rule.description as \"Description\", rule.level as Level, count as Count, rule.groups as \"Rule group\"",
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


      //
      // DASHBOARD EDITOR
      //

      new Dashboard({
        id: 'dashboard' + epoch,
        el: $('.dashboard-body'),
        showTitle: true,
        editable: true
      }, { tokens: true }).render();


      //
      // VIEWS: VISUALIZATION ELEMENTS
      //

      overviewElement1 = new SingleElement({
        "id": "overviewElement1" + epoch,
        "trellis.size": "medium",
        "rangeColors": "[\"0x65a637\",\"0x6db7c6\",\"0xf7bc38\",\"0xf58f39\",\"0xd93f3c\"]",
        "numberPrecision": "0",
        "useColors": "1",
        "unitPosition": "after",
        "colorMode": "block",
        "trendColorInterpretation": "standard",
        "trellis.enabled": "0",
        "colorBy": "value",
        "trendDisplayMode": "absolute",
        "drilldown": "all",
        "showTrendIndicator": "1",
        "useThousandSeparators": "1",
        "showSparkline": "1",
        "rangeValues": "[50000,100000,150000,300000]",
        "height": "50",
        "trellis.scales.shared": "1",
        "managerid": "search1" + epoch,
        "el": $('#overviewElement1')
      }, { tokens: true, tokenNamespace: "submitted" }).render();

      overviewElement1.on("click", function (e) {
        if (e.field !== undefined) {
          e.preventDefault();
          var url = TokenUtils.replaceTokenNames("/app/SplunkAppForWazuh/search?q=index=wazuh sourcetype=\"wazuh\"  | stats count&earliest=$when.earliest$&latest=$when.latest$", _.extend(submittedTokenModel.toJSON(), e.data), TokenUtils.getEscaper('url'), TokenUtils.getFilters(mvc.Components));
          utils.redirect(url, false, "_blank");
        }
      });

      overviewElement2 = new SingleElement({
        "id": "overviewElement2" + epoch,
        "trellis.size": "medium",
        "rangeColors": "[\"0x65a637\",\"0xd93f3c\"]",
        "numberPrecision": "0",
        "useColors": "1",
        "unitPosition": "after",
        "colorMode": "block",
        "trendColorInterpretation": "inverse",
        "trellis.enabled": "0",
        "colorBy": "trend",
        "trendDisplayMode": "percent",
        "drilldown": "all",
        "trendInterval": "-24h",
        "showTrendIndicator": "1",
        "useThousandSeparators": "1",
        "showSparkline": "1",
        "rangeValues": "[0]",
        "height": "55",
        "trellis.scales.shared": "1",
        "managerid": "search2" + epoch,
        "el": $('#overviewElement2')
      }, { tokens: true, tokenNamespace: "submitted" }).render();

      overviewElement2.on("click", function (e) {
        if (e.field !== undefined) {
          e.preventDefault();
          var url = TokenUtils.replaceTokenNames("/app/SplunkAppForWazuh/search?q=index=\"wazuh\" sourcetype=wazuh \"rule.level\">=12 | chart count&earliest=$when.earliest$&latest=$when.latest$", _.extend(submittedTokenModel.toJSON(), e.data), TokenUtils.getEscaper('url'), TokenUtils.getFilters(mvc.Components));
          utils.redirect(url, false, "_blank");
        }
      });

      overviewElement3 = new SingleElement({
        "id": "overviewElement3" + epoch,
        "trellis.size": "medium",
        "rangeColors": "[\"0x65a637\",\"0x6db7c6\",\"0xf7bc38\",\"0xf58f39\",\"0xd93f3c\"]",
        "numberPrecision": "0",
        "useColors": "1",
        "unitPosition": "after",
        "colorMode": "block",
        "trendColorInterpretation": "standard",
        "trellis.enabled": "0",
        "colorBy": "value",
        "trendDisplayMode": "absolute",
        "drilldown": "all",
        "showTrendIndicator": "1",
        "useThousandSeparators": "1",
        "showSparkline": "1",
        "rangeValues": "[100,30000,70000,500000]",
        "height": "52",
        "trellis.scales.shared": "1",
        "managerid": "search3" + epoch,
        "el": $('#overviewElement3')
      }, { tokens: true, tokenNamespace: "submitted" }).render();

      overviewElement3.on("click", function (e) {
        if (e.field !== undefined) {
          e.preventDefault();
          var url = TokenUtils.replaceTokenNames("/app/SplunkAppForWazuh/search?q=index=wazuh sourcetype=wazuh  \"rule.groups\"=\"authentication_fail*\" | stats count&earliest=$when.earliest$&latest=$when.latest$", _.extend(submittedTokenModel.toJSON(), e.data), TokenUtils.getEscaper('url'), TokenUtils.getFilters(mvc.Components));
          utils.redirect(url, false, "_blank");
        }
      });

      overviewElement4 = new SingleElement({
        "id": "overviewElement4" + epoch,
        "trellis.size": "medium",
        "rangeColors": "[\"0x65a637\",\"0x6db7c6\",\"0xf7bc38\",\"0xf58f39\",\"0xd93f3c\"]",
        "numberPrecision": "0",
        "useColors": "1",
        "unitPosition": "after",
        "colorMode": "block",
        "trendColorInterpretation": "standard",
        "trellis.enabled": "0",
        "colorBy": "value",
        "trendDisplayMode": "absolute",
        "drilldown": "all",
        "showTrendIndicator": "1",
        "useThousandSeparators": "1",
        "showSparkline": "1",
        "rangeValues": "[500,1000,2000,3000]",
        "height": "54",
        "trellis.scales.shared": "1",
        "managerid": "search4" + epoch,
        "el": $('#overviewElement4')
      }, { tokens: true, tokenNamespace: "submitted" }).render();

      overviewElement4.on("click", function (e) {
        if (e.field !== undefined) {
          e.preventDefault();
          var url = TokenUtils.replaceTokenNames("/app/SplunkAppForWazuh/search?q=index=wazuh sourcetype=wazuh  \"rule.groups\"=\"authentication_success\" | stats count&earliest=$when.earliest$&latest=$when.latest$", _.extend(submittedTokenModel.toJSON(), e.data), TokenUtils.getEscaper('url'), TokenUtils.getFilters(mvc.Components));
          utils.redirect(url, false, "_blank");
        }
      });

      overviewElement5 = new ChartElement({
        "id": "overviewElement5" + epoch,
        "trellis.size": "medium",
        "charting.axisY2.scale": "inherit",
        "charting.chart.showDataLabels": "none",
        "charting.chart.stackMode": "stacked100",
        "resizable": true,
        "charting.axisTitleY2.visibility": "visible",
        "charting.drilldown": "none",
        "charting.chart": "area",
        "charting.layout.splitSeries.allowIndependentYRanges": "0",
        "charting.chart.nullValueMode": "gaps",
        "trellis.scales.shared": "1",
        "charting.layout.splitSeries": "0",
        "charting.axisTitleX.visibility": "collapsed",
        "charting.legend.labelStyle.overflowMode": "ellipsisMiddle",
        "charting.chart.style": "shiny",
        "charting.axisTitleY.visibility": "visible",
        "charting.axisLabelsX.majorLabelStyle.overflowMode": "ellipsisNone",
        "charting.chart.bubbleMinimumSize": "10",
        "charting.axisX.scale": "linear",
        "trellis.enabled": "0",
        "charting.axisY2.enabled": "0",
        "charting.legend.placement": "right",
        "charting.chart.bubbleSizeBy": "area",
        "charting.axisLabelsX.majorLabelStyle.rotation": "0",
        "charting.chart.bubbleMaximumSize": "50",
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "charting.axisY.scale": "linear",
        "managerid": "search5" + epoch,
        "el": $('#overviewElement5')
      }, { tokens: true, tokenNamespace: "submitted" }).render();


      overviewElement6 = new ChartElement({
        "id": "overviewElement6" + epoch,
        "trellis.size": "medium",
        "charting.axisY2.scale": "inherit",
        "charting.chart.showDataLabels": "all",
        "charting.chart.stackMode": "default",
        "resizable": true,
        "charting.axisTitleY2.visibility": "visible",
        "charting.drilldown": "none",
        "charting.chart": "column",
        "charting.layout.splitSeries.allowIndependentYRanges": "0",
        "charting.chart.nullValueMode": "gaps",
        "trellis.scales.shared": "1",
        "charting.layout.splitSeries": "0",
        "charting.axisTitleX.visibility": "collapsed",
        "charting.legend.labelStyle.overflowMode": "ellipsisMiddle",
        "charting.chart.style": "shiny",
        "charting.axisTitleY.visibility": "visible",
        "charting.axisLabelsX.majorLabelStyle.overflowMode": "ellipsisNone",
        "charting.chart.bubbleMinimumSize": "10",
        "charting.axisX.scale": "linear",
        "trellis.enabled": "0",
        "charting.axisY2.enabled": "0",
        "charting.legend.placement": "none",
        "charting.chart.bubbleSizeBy": "area",
        "charting.axisLabelsX.majorLabelStyle.rotation": "0",
        "charting.chart.bubbleMaximumSize": "50",
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "charting.axisY.scale": "linear",
        "managerid": "search6" + epoch,
        "el": $('#overviewElement6')
      }, { tokens: true, tokenNamespace: "submitted" }).render();


      overviewElement7 = new ChartElement({
        "id": "overviewElement7" + epoch,
        "trellis.size": "large",
        "charting.axisY2.scale": "inherit",
        "charting.chart.showDataLabels": "none",
        "charting.chart.stackMode": "default",
        "resizable": true,
        "charting.axisTitleY2.visibility": "visible",
        "charting.drilldown": "none",
        "charting.chart": "pie",
        "charting.layout.splitSeries.allowIndependentYRanges": "0",
        "charting.chart.nullValueMode": "gaps",
        "trellis.scales.shared": "1",
        "charting.layout.splitSeries": "0",
        "charting.axisTitleX.visibility": "visible",
        "charting.legend.labelStyle.overflowMode": "ellipsisMiddle",
        "charting.chart.style": "shiny",
        "charting.axisTitleY.visibility": "visible",
        "charting.axisLabelsX.majorLabelStyle.overflowMode": "ellipsisNone",
        "charting.chart.bubbleMinimumSize": "10",
        "charting.axisX.scale": "linear",
        "trellis.enabled": "0",
        "charting.axisY2.enabled": "0",
        "charting.legend.placement": "right",
        "charting.chart.bubbleSizeBy": "area",
        "charting.axisLabelsX.majorLabelStyle.rotation": "0",
        "charting.chart.bubbleMaximumSize": "50",
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "charting.axisY.scale": "linear",
        "managerid": "search7" + epoch,
        "el": $('#overviewElement7')
      }, { tokens: true, tokenNamespace: "submitted" }).render();


      overviewElement8 = new ChartElement({
        "id": "overviewElement8" + epoch,
        "trellis.size": "medium",
        "charting.axisY2.scale": "inherit",
        "charting.chart.showDataLabels": "minmax",
        "charting.chart.stackMode": "default",
        "resizable": true,
        "charting.axisTitleY2.visibility": "visible",
        "charting.drilldown": "none",
        "charting.chart": "area",
        "charting.layout.splitSeries.allowIndependentYRanges": "0",
        "charting.chart.nullValueMode": "gaps",
        "trellis.scales.shared": "1",
        "charting.layout.splitSeries": "0",
        "charting.axisTitleX.visibility": "collapsed",
        "charting.legend.labelStyle.overflowMode": "ellipsisMiddle",
        "charting.chart.style": "shiny",
        "charting.axisTitleY.visibility": "visible",
        "charting.axisLabelsX.majorLabelStyle.overflowMode": "ellipsisNone",
        "charting.chart.bubbleMinimumSize": "10",
        "charting.axisX.scale": "linear",
        "trellis.enabled": "0",
        "charting.axisY2.enabled": "0",
        "charting.legend.placement": "bottom",
        "charting.chart.bubbleSizeBy": "area",
        "charting.axisLabelsX.majorLabelStyle.rotation": "0",
        "charting.chart.bubbleMaximumSize": "50",
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "charting.axisY.scale": "linear",
        "managerid": "search8" + epoch,
        "el": $('#overviewElement8')
      }, { tokens: true, tokenNamespace: "submitted" }).render();


      overviewElement9 = new ChartElement({
        "id": "overviewElement9" + epoch,
        "trellis.size": "medium",
        "charting.axisY2.scale": "inherit",
        "charting.chart.showDataLabels": "all",
        "charting.chart.stackMode": "default",
        "resizable": true,
        "charting.axisTitleY2.visibility": "visible",
        "charting.drilldown": "none",
        "charting.chart": "pie",
        "charting.layout.splitSeries.allowIndependentYRanges": "0",
        "charting.chart.nullValueMode": "gaps",
        "trellis.scales.shared": "1",
        "charting.layout.splitSeries": "0",
        "charting.axisTitleX.visibility": "collapsed",
        "charting.legend.labelStyle.overflowMode": "ellipsisMiddle",
        "charting.chart.style": "shiny",
        "charting.axisTitleY.visibility": "collapsed",
        "charting.axisLabelsX.majorLabelStyle.overflowMode": "ellipsisNone",
        "charting.chart.bubbleMinimumSize": "10",
        "charting.axisX.scale": "linear",
        "trellis.enabled": "0",
        "charting.axisY2.enabled": "0",
        "charting.legend.placement": "none",
        "charting.chart.bubbleSizeBy": "area",
        "charting.axisLabelsX.majorLabelStyle.rotation": "0",
        "charting.chart.bubbleMaximumSize": "50",
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "charting.axisY.scale": "linear",
        "managerid": "search9" + epoch,
        "el": $('#overviewElement9')
      }, { tokens: true, tokenNamespace: "submitted" }).render();


      overviewElement10 = new SingleElement({
        "id": "overviewElement10" + epoch,
        "trellis.size": "medium",
        "rangeColors": "[\"0x65a637\",\"0x65a637\"]",
        "numberPrecision": "0",
        "useColors": "1",
        "unitPosition": "after",
        "colorMode": "block",
        "trendColorInterpretation": "standard",
        "trellis.enabled": "0",
        "colorBy": "value",
        "trendDisplayMode": "absolute",
        "drilldown": "all",
        "showTrendIndicator": "1",
        "useThousandSeparators": "1",
        "showSparkline": "1",
        "rangeValues": "[0]",
        "height": "50",
        "trellis.scales.shared": "1",
        "managerid": "search10" + epoch,
        "el": $('#overviewElement10')
      }, { tokens: true, tokenNamespace: "submitted" }).render();

      overviewElement10.on("click", function (e) {
        if (e.field !== undefined) {
          e.preventDefault();
          var url = TokenUtils.replaceTokenNames("/app/SplunkAppForWazuh/search?q=index=wazuh sourcetype=wazuh | top limit=1 srcuser showcount=false showperc=false&earliest=$when.earliest$&latest=$when.latest$", _.extend(submittedTokenModel.toJSON(), e.data), TokenUtils.getEscaper('url'), TokenUtils.getFilters(mvc.Components));
          utils.redirect(url, false, "_blank");
        }
      });

      overviewElement11 = new SingleElement({
        "id": "overviewElement11" + epoch,
        "trellis.size": "medium",
        "rangeColors": "[\"0x65a637\",\"0x65a637\"]",
        "numberPrecision": "0",
        "useColors": "1",
        "unitPosition": "after",
        "colorMode": "block",
        "trendColorInterpretation": "standard",
        "trellis.enabled": "0",
        "colorBy": "value",
        "trendDisplayMode": "absolute",
        "drilldown": "all",
        "showTrendIndicator": "1",
        "useThousandSeparators": "1",
        "showSparkline": "1",
        "rangeValues": "[0]",
        "height": "50",
        "trellis.scales.shared": "1",
        "managerid": "search11" + epoch,
        "el": $('#overviewElement11')
      }, { tokens: true, tokenNamespace: "submitted" }).render();

      overviewElement11.on("click", function (e) {
        if (e.field !== undefined) {
          e.preventDefault();
          var url = TokenUtils.replaceTokenNames("/app/SplunkAppForWazuh/search?q=index=wazuh sourcetype=wazuh | top limit=1 srcip showcount=false showperc=false&earliest=$when.earliest$&latest=$when.latest$", _.extend(submittedTokenModel.toJSON(), e.data), TokenUtils.getEscaper('url'), TokenUtils.getFilters(mvc.Components));
          utils.redirect(url, false, "_blank");
        }
      });

      overviewElement12 = new SingleElement({
        "id": "overviewElement12" + epoch,
        "trellis.size": "medium",
        "rangeColors": "[\"0x65a637\",\"0x555\"]",
        "numberPrecision": "0",
        "useColors": "1",
        "unitPosition": "after",
        "colorMode": "block",
        "trendColorInterpretation": "standard",
        "trellis.enabled": "0",
        "colorBy": "value",
        "trendDisplayMode": "absolute",
        "drilldown": "all",
        "showTrendIndicator": "1",
        "useThousandSeparators": "1",
        "showSparkline": "1",
        "rangeValues": "[0]",
        "height": "50",
        "trellis.scales.shared": "1",
        "managerid": "search12" + epoch,
        "el": $('#overviewElement12')
      }, { tokens: true, tokenNamespace: "submitted" }).render();

      overviewElement12.on("click", function (e) {
        if (e.field !== undefined) {
          e.preventDefault();
          var url = TokenUtils.replaceTokenNames("/app/SplunkAppForWazuh/search?q=index=wazuh sourcetype=wazuh | top limit=1 rule.groups showcount=false showperc=false&earliest=$when.earliest$&latest=$when.latest$", _.extend(submittedTokenModel.toJSON(), e.data), TokenUtils.getEscaper('url'), TokenUtils.getFilters(mvc.Components));
          utils.redirect(url, false, "_blank");
        }
      });

      overviewElement13 = new SingleElement({
        "id": "overviewElement13" + epoch,
        "trellis.size": "medium",
        "rangeColors": "[\"0x65a637\",\"0xd93f3c\"]",
        "numberPrecision": "0",
        "useColors": "1",
        "unitPosition": "after",
        "colorMode": "block",
        "trendColorInterpretation": "standard",
        "trellis.enabled": "0",
        "colorBy": "value",
        "trendDisplayMode": "absolute",
        "drilldown": "all",
        "showTrendIndicator": "1",
        "useThousandSeparators": "1",
        "showSparkline": "1",
        "rangeValues": "[0]",
        "height": "50",
        "trellis.scales.shared": "1",
        "managerid": "search13" + epoch,
        "el": $('#overviewElement13')
      }, { tokens: true, tokenNamespace: "submitted" }).render();

      overviewElement13.on("click", function (e) {
        if (e.field !== undefined) {
          e.preventDefault();
          var url = TokenUtils.replaceTokenNames("/app/SplunkAppForWazuh/search?q=index=wazuh sourcetype=wazuh | top limit=1 rule.pci_dss{} showcount=false showperc=false&earliest=$when.earliest$&latest=$when.latest$", _.extend(submittedTokenModel.toJSON(), e.data), TokenUtils.getEscaper('url'), TokenUtils.getFilters(mvc.Components));
          utils.redirect(url, false, "_blank");
        }
      });

      overviewElement14 = new TableElement({
        "id": "overviewElement14" + epoch,
        "dataOverlayMode": "none",
        "drilldown": "cell",
        "percentagesRow": "false",
        "rowNumbers": "false",
        "totalsRow": "false",
        "wrap": "true",
        "managerid": "search14" + epoch,
        "el": $('#overviewElement14')
      }, { tokens: true, tokenNamespace: "submitted" }).render();

      overviewElement14.on("click", function (e) {
        if (e.field !== undefined) {
          e.preventDefault();
          var url = TokenUtils.replaceTokenNames("/app/SplunkAppForWazuh/search?q=index=wazuh sourcetype=wazuh |stats count sparkline by rule.id, rule.description, rule.groups, rule.level | sort count DESC | head 10 | rename rule.id as \"Rule ID\", rule.description as \"Description\", rule.level as Level, count as Count, rule.groups as \"Rule group\"&earliest=$when.earliest$&latest=$when.latest$", _.extend(submittedTokenModel.toJSON(), e.data), TokenUtils.getEscaper('url'), TokenUtils.getFilters(mvc.Components));
          utils.redirect(url, false, "_blank");
        }
      });


      //
      // VIEWS: FORM INPUTS
      //

      var input1 = new TimeRangeInput({
        "id": "input1" + epoch,
        "default": { "latest_time": "now", "earliest_time": "-24h@h" },
        "searchWhenChanged": true,
        "earliest_time": "$form.when.earliest$",
        "latest_time": "$form.when.latest$",
        "el": $('#input1')
      }, { tokens: true }).render();

      input1.on("change", function (newValue) {
        FormUtils.handleValueChange(input1);
      });

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
      pageLoading = false;


    });
  });

