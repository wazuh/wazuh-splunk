define([
  '../../module',
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
  "splunkjs/mvc/simplexml/element/map",
  "splunkjs/mvc/searchmanager",
  "splunkjs/mvc/simplexml/urltokenmodel"
], function (
  controllers,
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
  MapElement,
  SearchManager,
  UrlTokenModel) {
    'use strict'
    
    controllers.controller('awsCtrl', function ($scope, $currentDataService, $state) {
      const vm = this
      const epoch = (new Date).getTime()
      $currentDataService.addFilter(`{"rule.groups":"amazon", "implicit":true}`)

      // Create token namespaces
      const urlTokenModel = new UrlTokenModel({ id: 'tokenModel' + epoch })
      mvc.Components.registerInstance('url' + epoch, urlTokenModel)
      const defaultTokenModel = mvc.Components.getInstance('default', { create: true })
      const submittedTokenModel = mvc.Components.getInstance('submitted', { create: true })
      let filters = $currentDataService.getSerializedFilters()
      const baseUrl = $currentDataService.getBaseUrl()
      const launchSearches = () => {
        filters = $currentDataService.getSerializedFilters()
        $state.reload();
      }
      
      $scope.$on('deletedFilter', () => {
        launchSearches()
      })
      
      $scope.$on('barFilter', () => {
        launchSearches()
      })
      
      let search9 = ''
      let element9 = ''
      
      
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
      
      submittedTokenModel.on("change:authSuccessToken", (model, authSuccessToken, options) => {
        const tokHTMLJS = submittedTokenModel.get("authSuccessToken")
        if (typeof tokHTMLJS !== 'undefined' && tokHTMLJS !== 'undefined') {
          vm.authSuccess = tokHTMLJS
          if (!$scope.$$phase) $scope.$digest()
        }
      })
      
      let pageLoading = true
      let input1
      let alertsOverTime
      let alertsOverTimeSearch
      let topInstances
      let topInstancesSearch
      let topAddrs
      let topAddrsSearch
      let topSources
      let topSourcesSearch
      let map
      let mapSearch
      let topBuckets
      let topBucketsSearch
      let topRules
      let topRulesSearch
      let mostCommonEvents
      let mostCommonEventsSearch
      
      
      /**
      * When controller is destroyed
      */
      $scope.$on('$destroy', () => {
        topAddrs = null
        topAddrsSearch = null
        alertsOverTime = null
        alertsOverTimeSearch = null
        topInstances = null
        topInstancesSearch = null
        topSources = null
        topSourcesSearch = null
        map = null
        mapSearch = null
        topBuckets = null
        topBucketsSearch = null
        topRules = null
        topRulesSearch = null
        
      })
      
      topAddrsSearch = new SearchManager({
        "id": `topAddrsSearch${epoch}`,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": `${filters} sourcetype=wazuh | top data.aws.source_ip_address`,
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })
      
      alertsOverTimeSearch = new SearchManager({
        "id": `alertsOverTimeSearch${epoch}`,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": `${filters} sourcetype=wazuh  | timechart count`,
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })
      
      topInstancesSearch = new SearchManager({
        "id": `topInstancesSearch${epoch}`,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": `${filters} sourcetype=wazuh  | top data.aws.requestParameters.instanceId`,
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      mostCommonEventsSearch = new SearchManager({
        "id": `mostCommonEventsSearch${epoch}`,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": `${filters} sourcetype=wazuh  | top data.aws.eventName limit=5`,
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })
      
      mapSearch = new SearchManager({
        "id": `mapSearch${epoch}`,
        "status_buckets": 0,
        "search": `${filters} sourcetype=wazuh | geostats latfield="data.aws.service.action.portProbeAction.portProbeDetails.remoteIpDetails.geoLocation.lat" longfield="data.aws.service.action.portProbeAction.portProbeDetails.remoteIpDetails.geoLocation.lon" count`,
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
      
      topBucketsSearch = new SearchManager({
        "id": `topBucketsSearch${epoch}`,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": `${filters} sourcetype=wazuh  | top "data.aws.source" limit=5`,
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      topSourcesSearch = new SearchManager({
        "id": `topSourcesSearch${epoch}`,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": `${filters} sourcetype=wazuh  | top "data.aws.log_info.s3bucket"`,
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })
      
      topRulesSearch = new SearchManager({
        "id": `topRulesSearch${epoch}`,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": `${filters} sourcetype=wazuh  | top rule.id, rule.description limit=5`,
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })
      
      //
      // DASHBOARD EDITOR
      //
      
      new Dashboard({
        id: 'dashboard' + epoch,
        el: $('.dashboard-body'),
        showTitle: true,
        editable: false
      }, { tokens: true }).render()
      
      map = new MapElement({
        "id": `map${epoch}`,
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
        "managerid": `mapSearch${epoch}`,
        "el": $('#map')
      }, { tokens: true, tokenNamespace: "submitted" }).render()
      
      topBuckets = new TableElement({
        "id": `topBuckets${epoch}`,
        "dataOverlayMode": "none",
        "drilldown": "cell",
        "percentagesRow": "false",
        "rowNumbers": "false",
        "totalsRow": "false",
        "wrap": "true",
        "managerid": `topBucketsSearch${epoch}`,
        "el": $('#topBuckets')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      topRules = new TableElement({
        "id": `topRules${epoch}`,
        "dataOverlayMode": "none",
        "drilldown": "cell",
        "percentagesRow": "false",
        "rowNumbers": "false",
        "totalsRow": "false",
        "wrap": "true",
        "managerid": `topRulesSearch${epoch}`,
        "el": $('#topRules')
      }, { tokens: true, tokenNamespace: "submitted" }).render()
      
      /* topRule.on("click", function (e) {
        if (e.field !== undefined) {
          e.preventDefault()
          const url = TokenUtils.replaceTokenNames(`${baseUrl}/app/SplunkAppForWazuh/search?q=${filters} sourcetype=wazuh |stats count sparkline by rule.id, rule.description, rule.groups, rule.level | sort count DESC | head 10 | rename rule.id as \"Rule ID\", rule.description as \"Description\", rule.level as Level, count as Count, rule.groups as \"Rule group\"&earliest=$when.earliest$&latest=$when.latest$`, _.extend(submittedTokenModel.toJSON(), e.data), TokenUtils.getEscaper('url'), TokenUtils.getFilters(mvc.Components))
          utils.redirect(url, false, "_blank")
        }
      }) */
      
      //
      // VIEWS: FORM INPUTS
      //

      alertsOverTime = new ChartElement({
        "id": `alertsOverTime${epoch}`,
        "charting.legend.placement": "right",
        "charting.drilldown": "none",
        "refresh.display": "progressbar",
        "charting.chart": "area",
        "charting.axisLabelsX.majorLabelStyle.rotation": "-90",
        "trellis.enabled": "0",
        "resizable": true,
        "trellis.scales.shared": "1",
        "charting.axisTitleX.visibility": "visible",
        "charting.axisTitleY.visibility": "visible",
        "charting.axisTitleY2.visibility": "visible",
        "managerid": `alertsOverTimeSearch${epoch}`,
        "el": $('#alertsOverTime')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      topInstances = new ChartElement({
        "id": `topInstances${epoch}`,
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
        "managerid": `topInstancesSearch${epoch}`,
        "el": $('#topInstances')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      topAddrs = new ChartElement({
        "id": `topAddrs${epoch}`,
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
        "managerid": `topAddrsSearch${epoch}`,
        "el": $('#topAddrs')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      topSources = new ChartElement({
        "id": `topSources${epoch}`,
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
        "managerid": `topSourcesSearch${epoch}`,
        "el": $('#topSources')
      }, { tokens: true, tokenNamespace: "submitted" }).render()
    
      mostCommonEvents = new ChartElement({
        "id": `mostCommonEvents${epoch}`,
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
        "managerid": `mostCommonEventsSearch${epoch}`,
        "el": $('#mostCommonEvents')
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
      //
      // DASHBOARD READY
      //
      
      DashboardController.ready()
      pageLoading = false
    })
  })
  
  