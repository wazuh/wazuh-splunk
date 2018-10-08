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

    controllers.controller('agentsVulnerabilitiesCtrl', function ($scope, $currentDataService, $state, agent) {
      const vm = this
      const epoch = (new Date).getTime()
      let pageLoading = false
      // Create token namespaces
      const urlTokenModel = new UrlTokenModel({ id: 'tokenModel' + epoch })
      mvc.Components.registerInstance('url' + epoch, urlTokenModel)
      const defaultTokenModel = mvc.Components.getInstance('default', { create: true })
      const submittedTokenModel = mvc.Components.getInstance('submitted', { create: true })

      vm.agent = agent.data.data
      vm.getAgentStatusClass = agentStatus => agentStatus === "Active" ? "teal" : "red";
      vm.formatAgentStatus = agentStatus => {
        return ['Active', 'Disconnected'].includes(agentStatus) ? agentStatus : 'Never connected';
      }

      let filters = $currentDataService.getSerializedFilters()

      const launchSearches = () => {
        filters = $currentDataService.getSerializedFilters()
        $state.reload();
        // searches.map(search => search.startSearch())
      }


      $scope.$on('deletedFilter', () => {
        launchSearches()
      })

      $scope.$on('barFilter', () => {
        launchSearches()
      })

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
        FormUtils.submitForm({ replaceState: pageLoading })
      }

      let criticalSeveritySearch = ''
      let highSeveritySeach = ''
      let mediumSeveritySearch = ''
      let lowSeveritySearch = ''
      let alertsSeverityOverTime = ''
      let topAgentsSeverity = ''
      let affectedPackages = ''
      let alertsSummary = ''
      let element1 = ''
      let element2 = ''
      let element3 = ''
      let element4 = ''
      let input1 = ''
      let commonRules
      let commonRulesSearch
      let commonCves
      let commonCvesSearch
      let severityDistribution
      let severityDistributionSearch

      /**
       * When controller is destroyed
       */
      $scope.$on('$destroy', () => {
        criticalSeveritySearch.cancel()
        highSeveritySeach.cancel()
        mediumSeveritySearch.cancel()
        lowSeveritySearch.cancel()
        alertsSeverityOverTime.cancel()
        topAgentsSeverity.cancel()
        affectedPackages.cancel()
        alertsSummary.cancel()
        commonRulesSearch.cancel()
        commonCvesSearch.cancel()
        severityDistributionSearch.cancel()
        severityDistribution = null
        commonCves = null
        commonRules = null
        criticalSeveritySearch = null
        highSeveritySeach = null
        mediumSeveritySearch = null
        lowSeveritySearch = null
        alertsSeverityOverTime = null
        topAgentsSeverity = null
        affectedPackages = null
        alertsSummary = null
        element1 = null
        element2 = null
        element3 = null
        element4 = null
        input1 = null
      })

      // Listen for a change to the token tokenTotalAlerts value
      criticalSeveritySearch = new SearchManager({
        "id": "criticalSeveritySearch" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": `${filters} data.vulnerability.severity=critical | stats count`,
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": true
      }, { tokens: true, tokenNamespace: "submitted" })

      severityDistributionSearch = new SearchManager({
        "id": "severityDistributionSearch" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": `${filters} rule.groups="vulnerability-detector" | top data.vulnerability.severity limit=5`,
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": true
      }, { tokens: true, tokenNamespace: "submitted" })

      // Listen for a change to the token tokenTotalAlerts value
      commonRulesSearch = new SearchManager({
        "id": "commonRulesSearch" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": `${filters} rule.groups="vulnerability-detector" | top rule.id,rule.description limit=5`,
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": true
      }, { tokens: true, tokenNamespace: "submitted" })


      new SearchEventHandler({
        managerid: "criticalSeveritySearch" + epoch,
        event: "done",
        conditions: [
          {
            attr: "any",
            value: "*",
            actions: [
              { "type": "set", "token": "criticalSeverityToken", "value": "$result.count$" },
            ]
          }
        ]
      })
      criticalSeveritySearch.on('search:progress', () => {
        vm.loadingSearch = true
        if (!$scope.$$phase) $scope.$digest()

      })
      criticalSeveritySearch.on('search:done', () => {
        const mediumSeverityTokenJS = submittedTokenModel.get("criticalSeverityToken")
        if (mediumSeverityTokenJS) {
          vm.criticalSeverity = mediumSeverityTokenJS
          if (!$scope.$$phase) $scope.$digest()
        }
      })

      submittedTokenModel.on("change:criticalSeverityToken", (model, criticalSeverityToken, options) => {
        const criticalSeverityTokenJS = submittedTokenModel.get("criticalSeverityToken")
        if (criticalSeverityTokenJS) {
          vm.criticalSeverity = criticalSeverityTokenJS
          if (!$scope.$$phase) $scope.$digest()
        }
      })

      // Listen for a change to the token tokenTotalAlerts value
      highSeveritySeach = new SearchManager({
        "id": "highSeveritySeach" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": `${filters} data.vulnerability.severity=high | stats count`,
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": true
      }, { tokens: true, tokenNamespace: "submitted" })

      new SearchEventHandler({
        managerid: "highSeveritySeach" + epoch,
        event: "done",
        conditions: [
          {
            attr: "any",
            value: "*",
            actions: [
              { "type": "set", "token": "highSeverityToken", "value": "$result.count$" },
            ]
          }
        ]
      })
      highSeveritySeach.on('search:progress', () => {
        vm.loadingSearch = true
        if (!$scope.$$phase) $scope.$digest()

      })
      highSeveritySeach.on('search:done', () => {
        vm.loadingSearch = false
        const highSeverityTokenJS = submittedTokenModel.get("highSeverityToken")
        if (highSeverityTokenJS) {
          vm.highSeverity = highSeverityTokenJS
          if (!$scope.$$phase) $scope.$digest()
        }
      })

      submittedTokenModel.on("change:highSeverityToken", (model, highSeverityToken, options) => {
        const highSeverityTokenJS = submittedTokenModel.get("highSeverityToken")
        if (highSeverityTokenJS) {
          vm.highSeverity = highSeverityTokenJS
          if (!$scope.$$phase) $scope.$digest()
        }
      })

      // Listen for a change to the token tokenTotalAlerts value
      mediumSeveritySearch = new SearchManager({
        "id": "mediumSeveritySearch" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": `${filters} data.vulnerability.severity=medium | stats count`,
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": true
      }, { tokens: true, tokenNamespace: "submitted" })

      new SearchEventHandler({
        managerid: "mediumSeveritySearch" + epoch,
        event: "done",
        conditions: [
          {
            attr: "any",
            value: "*",
            actions: [
              { "type": "set", "token": "mediumSeverityToken", "value": "$result.count$" },
            ]
          }
        ]
      })
      mediumSeveritySearch.on('search:progress', () => {
        vm.loadingSearch = true
        if (!$scope.$$phase) $scope.$digest()

      })
      mediumSeveritySearch.on('search:done', () => {
        const mediumSeverityTokenJS = submittedTokenModel.get("mediumSeverityToken")
        if (mediumSeverityTokenJS) {
          vm.mediumSeverity = mediumSeverityTokenJS
          if (!$scope.$$phase) $scope.$digest()
        }
      })
      submittedTokenModel.on("change:mediumSeverityToken", (model, mediumSeverityToken, options) => {
        const mediumSeverityTokenJS = submittedTokenModel.get("mediumSeverityToken")
        if (typeof mediumSeverityTokenJS !== 'undefined' && mediumSeverityTokenJS !== 'undefined') {
          vm.mediumSeverity = mediumSeverityTokenJS
          if (!$scope.$$phase) $scope.$digest()
        }
      })

      // Listen for a change to the token tokenTotalAlerts value
      lowSeveritySearch = new SearchManager({
        "id": "lowSeveritySearch" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": `${filters} data.vulnerability.severity=low | stats count`,
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": true
      }, { tokens: true, tokenNamespace: "submitted" })

      new SearchEventHandler({
        managerid: "lowSeveritySearch" + epoch,
        event: "done",
        conditions: [
          {
            attr: "any",
            value: "*",
            actions: [
              { "type": "set", "token": "lowSeverityToken", "value": "$result.count$" },
            ]
          }
        ]
      })
      lowSeveritySearch.on('search:progress', () => {
        vm.loadingSearch = true
        if (!$scope.$$phase) $scope.$digest()

      })
      lowSeveritySearch.on('search:done', () => {
        const lowSeverityTokenJS = submittedTokenModel.get("lowSeverityToken")
        if (lowSeverityTokenJS) {
          vm.lowSeverity = lowSeverityTokenJS
          if (!$scope.$$phase) $scope.$digest()
        }
      })
      submittedTokenModel.on("change:lowSeverityToken", (model, lowSeverityToken, options) => {
        const lowSeverityTokenJS = submittedTokenModel.get("lowSeverityToken")
        if (typeof lowSeverityTokenJS !== 'undefined' && lowSeverityTokenJS !== 'undefined') {
          vm.lowSeverity = lowSeverityTokenJS
          if (!$scope.$$phase) $scope.$digest()
        }
      })

      alertsSeverityOverTime = new SearchManager({
        "id": "alertsSeverityOverTime" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": `${filters} sourcetype=wazuh rule.groups=vulnerability-detector data.vulnerability.severity=* | timechart count by data.vulnerability.severity`,
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      topAgentsSeverity = new SearchManager({
        "id": "topAgentsSeverity" + epoch,
        "sample_ratio": 1,
        "cancelOnUnload": true,
        "earliest_time": "0",
        "search": `${filters} rule.groups=vulnerability-detector data.vulnerability.severity=*  | spath \"agent.name\"  | search \"agent.name\"=*   | rename agent.id AS RootObject.agent.id agent.ip AS RootObject.agent.ip agent.name AS RootObject.agent.name data.vulnerability.cve AS RootObject.data.vulnerability.cve data.vulnerability.package.condition AS RootObject.data.vulnerability.package.condition data.vulnerability.package.name AS RootObject.data.vulnerability.package.name data.vulnerability.package.version AS RootObject.data.vulnerability.package.version data.vulnerability.published AS RootObject.data.vulnerability.published data.vulnerability.reference AS RootObject.data.vulnerability.reference data.vulnerability.severity AS RootObject.data.vulnerability.severity data.vulnerability.state AS RootObject.data.vulnerability.state data.vulnerability.title AS RootObject.data.vulnerability.title data.vulnerability.updated AS RootObject.data.vulnerability.updated date_hour AS RootObject.date_hour date_mday AS RootObject.date_mday date_minute AS RootObject.date_minute date_month AS RootObject.date_month date_second AS RootObject.date_second date_wday AS RootObject.date_wday date_year AS RootObject.date_year date_zone AS RootObject.date_zone decoder.name AS RootObject.decoder.name id AS RootObject.id index AS RootObject.index linecount AS RootObject.linecount location AS RootObject.location manager.name AS RootObject.manager.name rule.description AS RootObject.rule.description rule.firedtimes AS RootObject.rule.firedtimes \"rule.gdpr{}\" AS \"RootObject.rule.gdpr{}\" rule.groups AS RootObject.rule.groups \"rule.groups{}\" AS \"RootObject.rule.groups{}\" rule.id AS RootObject.rule.id rule.level AS RootObject.rule.level rule.mail AS RootObject.rule.mail splunk_server AS RootObject.splunk_server timeendpos AS RootObject.timeendpos timestamp AS RootObject.timestamp timestartpos AS RootObject.timestartpos | fields \"_time\" \"host\" \"source\" \"sourcetype\" \"RootObject.agent.id\" \"RootObject.agent.ip\" \"RootObject.agent.name\" \"RootObject.data.vulnerability.cve\" \"RootObject.data.vulnerability.package.condition\" \"RootObject.data.vulnerability.package.name\" \"RootObject.data.vulnerability.package.version\" \"RootObject.data.vulnerability.published\" \"RootObject.data.vulnerability.reference\" \"RootObject.data.vulnerability.severity\" \"RootObject.data.vulnerability.state\" \"RootObject.data.vulnerability.title\" \"RootObject.data.vulnerability.updated\" \"RootObject.date_hour\" \"RootObject.date_mday\" \"RootObject.date_minute\" \"RootObject.date_month\" \"RootObject.date_second\" \"RootObject.date_wday\" \"RootObject.date_year\" \"RootObject.date_zone\" \"RootObject.decoder.name\" \"RootObject.id\" \"RootObject.index\" \"RootObject.linecount\" \"RootObject.location\" \"RootObject.manager.name\" \"RootObject.rule.description\" \"RootObject.rule.firedtimes\" \"\\\"RootObject.rule.gdpr{}\\\"\" \"RootObject.rule.groups\" \"\\\"RootObject.rule.groups{}\\\"\" \"RootObject.rule.id\" \"RootObject.rule.level\" \"RootObject.rule.mail\" \"RootObject.splunk_server\" \"RootObject.timeendpos\" \"RootObject.timestamp\" \"RootObject.timestartpos\" | eval \"RootObject.data.vulnerability.severity\"='RootObject.data.vulnerability.severity', \"agent.name\"='RootObject.agent.name' | chart dedup_splitvals=t limit=100 useother=t count AS \"Count of 1532686833.50\"  by agent.name RootObject.data.vulnerability.severity format=$$VAL$$:::$$AGG$$ | sort limit=100 RootObject.agent.name | fields - _span  | fields agent.name *`,
        "latest_time": "$latest$",
        "status_buckets": 0,
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      affectedPackages = new SearchManager({
        "id": "affectedPackages" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": `${filters} | top 5 data.vulnerability.package.name`,
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      commonCvesSearch = new SearchManager({
        "id": "commonCvesSearch" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": `${filters} rule.groups="vulnerability-detector" | top data.vulnerability.cve limit=5`,
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      alertsSummary = new SearchManager({
        "id": "alertsSummary" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": `${filters} | stats count sparkline by data.vulnerability.title, data.vulnerability.severity, data.vulnerability.reference`,
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })


      element1 = new ChartElement({
        "id": "element1" + epoch,
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
        "managerid": "alertsSeverityOverTime" + epoch,
        "el": $('#element1')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      element2 = new ChartElement({
        "id": `element2${epoch}`,
        "charting.chart.bubbleSizeBy": "area",
        "charting.chart.style": "shiny",
        "charting.axisTitleY.text": "Count of 1532686833.50",
        "charting.axisX.scale": "linear",
        "charting.axisLabelsX.majorLabelStyle.rotation": "0",
        "charting.axisLabelsX.majorLabelStyle.overflowMode": "ellipsisNone",
        "charting.drilldown": "none",
        "charting.axisY2.scale": "inherit",
        "trellis.size": "medium",
        "charting.legend.labelStyle.overflowMode": "ellipsisMiddle",
        "charting.chart.sliceCollapsingThreshold": "0.01",
        "charting.chart.showDataLabels": "none",
        "trellis.enabled": "0",
        "charting.axisTitleY.visibility": "visible",
        "charting.axisY.scale": "linear",
        "charting.chart.bubbleMaximumSize": "50",
        "charting.chart": "column",
        "charting.axisY.abbreviation": "none",
        "charting.axisY2.abbreviation": "none",
        "charting.lineWidth": "2",
        "charting.layout.splitSeries.allowIndependentYRanges": "0",
        "charting.axisTitleX.visibility": "visible",
        "charting.layout.splitSeries": "0",
        "charting.axisX.abbreviation": "none",
        "charting.legend.placement": "right",
        "charting.axisY2.enabled": "0",
        "charting.axisTitleY2.visibility": "visible",
        "charting.chart.bubbleMinimumSize": "10",
        "charting.chart.stackMode": "stacked",
        "charting.chart.nullValueMode": "gaps",
        "resizable": true,
        "charting.legend.mode": "standard",
        "trellis.scales.shared": "1",
        "managerid": "topAgentsSeverity" + epoch,
        "el": $('#element2')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      element3 = new ChartElement({
        "id": "element3" + epoch,
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
        "managerid": "affectedPackages" + epoch,
        "el": $('#element3')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      commonCves = new ChartElement({
        "id": "commonCves" + epoch,
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
        "managerid": "commonCvesSearch" + epoch,
        "el": $('#commonCves')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      severityDistribution = new ChartElement({
        "id": "severityDistribution" + epoch,
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
        "managerid": "severityDistributionSearch" + epoch,
        "el": $('#severityDistribution')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      element4 = new TableElement({
        "id": "element4" + epoch,
        "dataOverlayMode": "none",
        "drilldown": "cell",
        "percentagesRow": "false",
        "rowNumbers": "false",
        "totalsRow": "false",
        "wrap": "false",
        "managerid": "alertsSummary" + epoch,
        "el": $('#element4')
      }, { tokens: true, tokenNamespace: "submitted" }).render()
      
      commonRules = new TableElement({
        "id": "commonRules" + epoch,
        "dataOverlayMode": "none",
        "drilldown": "cell",
        "percentagesRow": "false",
        "rowNumbers": "false",
        "totalsRow": "false",
        "wrap": "false",
        "managerid": "commonRulesSearch" + epoch,
        "el": $('#commonRules')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      commonRules.on("click", function (e) {
        if (e.field !== undefined) {
          e.preventDefault()
          if (e.data['click.value']=== e.data['click.value2']) {
            $state.go('mg-rules-id', { id:`${e.data['click.value']}` })
          }
          //const url = TokenUtils.replaceTokenNames(`${baseUrl}/app/SplunkAppForWazuh/search?q=${filters} sourcetype=wazuh |stats count sparkline by rule.id, rule.description, rule.groups, rule.level | sort count DESC | head 10 | rename rule.id as \"Rule ID\", rule.description as \"Description\", rule.level as Level, count as Count, rule.groups as \"Rule group\"&earliest=$when.earliest$&latest=$when.latest$`, _.extend(submittedTokenModel.toJSON(), e.data), TokenUtils.getEscaper('url'), TokenUtils.getFilters(mvc.Components))
          //utils.redirect(url, false, "_blank")
        }
      })
      //
      // VIEWS: FORM INPUTS
      //

      input1 = new TimeRangeInput({
        "id": "input1" + epoch,
        "searchWhenChanged": true,
        "default": { "latest_time": "now", "earliest_time": "-24h@h" },
        "earliest_time": "$form.when.earliest$",
        "latest_time": "$form.when.latest$",
        "el": $('#input1')
      }, { tokens: true }).render()

      input1.on("change", (newValue) => {
        if (newValue && input1)
          FormUtils.handleValueChange(input1)
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

    })
  })
