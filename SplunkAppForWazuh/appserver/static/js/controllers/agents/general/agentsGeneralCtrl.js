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

    controllers.controller('agentsGeneralCtrl', function ($scope, $currentApiIndexService, $apiService) {
      const vm = this
      const epoch = (new Date).getTime()
      const selectedIndex = $currentApiIndexService.getIndex()

      const filter = $currentApiIndexService.getFilter()
      const nameFilter = filter[0] + '=' + filter[1]
      const api = JSON.parse($currentApiIndexService.getAPI())
      // Create token namespaces
      const urlTokenModel = new UrlTokenModel({ id: 'tokenModel' + epoch })
      mvc.Components.registerInstance('url' + epoch, urlTokenModel)
      const defaultTokenModel = mvc.Components.getInstance('default', { create: true })
      const submittedTokenModel = mvc.Components.getInstance('submitted', { create: true })

      const baseUrl = $apiService.getBaseUrl()
      setToken('baseip', baseUrl)
      setToken('url', api.url)
      setToken('portapi', api.portapi)
      setToken('userapi', api.userapi)
      setToken('passwordapi', api.passapi)
      setToken("loadedtokens", "true")

      // Implement checking polling state!!!
      let search9 = ''
      let element9 = ''
      if (true) {
        search9 = new SearchManager({
          "id": "search9"+epoch,
          "cancelOnUnload": true,
          "sample_ratio": 1,
          "earliest_time": "$when.earliest$",
          "status_buckets": 0,
          "search": "| getagentsummary $baseip$ $url$ $portapi$ $userapi$ $passwordapi$ | table agent_summary_active , agent_summary_disconnected | transpose | rename \"column\" as Status, \"row 1\" as \"count\"",
          "latest_time": "$when.latest$",
          "app": utils.getCurrentApp(),
          "auto_cancel": 90,
          "preview": true,
          "tokenDependencies": {
          },
          "runWhenTimeIsUndefined": false
        }, { tokens: true, tokenNamespace: "submitted" })

        element9 = new ChartElement({
          "id": "element9" + epoch,
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
          "charting.axisTitleY.visibility": "collapsed",
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
          "managerid": "search9" + epoch,
          "el": $('#element9')
        }, { tokens: true, tokenNamespace: "submitted" }).render()
      } else {
        let filterAgent = (filter[0] === 'manager.name') ? 'manager_host' : 'cluster.name'
        filter += '=' + filter[1]
        search9 = new SearchManager({
          "id": "search9" + epoch,
          "earliest_time": "$when.earliest$",
          "latest_time": "$when.latest$",
          "status_buckets": 0,
          "sample_ratio": null,
          "cancelOnUnload": true,
          "search": "index=\"wazuh-monitoring-3x\" " + filterAgent + " status=* | timechart span=1h count by status usenull=f",
          "app": utils.getCurrentApp(),
          "auto_cancel": 90,
          "preview": true,
          "tokenDependencies": {
          },
          "runWhenTimeIsUndefined": false
        }, { tokens: true, tokenNamespace: "submitted" })

        element9 = new ChartElement({
          "id": "element9" + epoch,
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
          "managerid": "search9" + epoch,
          "el": $('#element9')
        }, { tokens: true, tokenNamespace: "submitted" }).render()
      }


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
      let input1 = ''
      let agentsSearch5 = ''
      let agentsSearch6 = ''
      let agentsSearch7 = ''
      let agentsSearch8 = ''
      let agentsSearch14 = ''
      let searchTopAgent = ''
      let searchLevel12 = ''
      let searchAuthFailure = ''
      let searchAuthSuccess = ''
      let agentsElement5 = ''
      let agentsElement6 = ''
      let agentsElement7 = ''
      let agentsElement8 = ''
      let agentsElement14 = ''

      /**
       * When controller is destroyed
       */
      $scope.$on('$destroy', () => {
        agentsSearch5 = null
        agentsSearch6 = null
        agentsSearch7 = null
        agentsSearch8 = null
        element9 = null
        agentsSearch14 = null
        search9 = null
        agentsElement5 = null
        agentsElement6 = null
        agentsElement7 = null
        agentsElement8 = null
        agentsElement14 = null
        input1 = null
      })


      // Listen for a change to the token tokenTotalAlerts value
      searchTopAgent = new SearchManager({
        "id": "searchTopAgent" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index=" + selectedIndex + " " + nameFilter + " | stats count",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": true
      }, { tokens: true, tokenNamespace: "submitted" })

      new SearchEventHandler({
        managerid: "searchTopAgent" + epoch,
        event: "done",
        conditions: [
          {
            attr: "any",
            value: "*",
            actions: [
              { "type": "set", "token": "tokHTML", "value": "$result.count$" },
            ]
          }
        ]
      })

      submittedTokenModel.on("change:tokHTML", (model, tokHTML, options) => {
        const tokHTMLJS = submittedTokenModel.get("tokHTML")
        if (typeof tokHTMLJS !== 'undefined' && tokHTMLJS !== 'undefined') {
          vm.totalAlerts = tokHTMLJS
          if (!$scope.$$phase) $scope.$digest()
        }
      })

      searchLevel12 = new SearchManager({
        "id": "searchLevel12" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index=" + selectedIndex + " " + nameFilter + " sourcetype=wazuh \"rule.level\">=12 | chart count",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": true
      }, { tokens: true, tokenNamespace: "submitted" })

      new SearchEventHandler({
        managerid: "searchLevel12" + epoch,
        event: "done",
        conditions: [
          {
            attr: "any",
            value: "*",
            actions: [
              { "type": "set", "token": "level12token", "value": "$result.count$" },
            ]
          }
        ]
      })

      submittedTokenModel.on("change:level12token", (model, level12token, options) => {
        const tokHTMLJS = submittedTokenModel.get("level12token")
        if (typeof tokHTMLJS !== 'undefined' && tokHTMLJS !== 'undefined') {
          vm.levelTwelve = tokHTMLJS
          if (!$scope.$$phase) $scope.$digest()
        }
      })


      searchAuthFailure = new SearchManager({
        "id": "searchAuthFailure" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index=" + selectedIndex + " " + nameFilter + " sourcetype=wazuh  \"rule.groups\"=\"authentication_fail*\" | stats count",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": true
      }, { tokens: true, tokenNamespace: "submitted" })

      new SearchEventHandler({
        managerid: "searchAuthFailure" + epoch,
        event: "done",
        conditions: [
          {
            attr: "any",
            value: "*",
            actions: [
              { "type": "set", "token": "authFailureToken", "value": "$result.count$" },
            ]
          }
        ]
      })

      submittedTokenModel.on("change:authFailureToken", (model, authFailureToken, options) => {
        const tokHTMLJS = submittedTokenModel.get("authFailureToken")
        if (typeof tokHTMLJS !== 'undefined' && tokHTMLJS !== 'undefined') {
          vm.authFailure = tokHTMLJS
          if (!$scope.$$phase) $scope.$digest()
        }
      })

      searchAuthSuccess = new SearchManager({
        "id": "searchAuthSuccess" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index=" + selectedIndex + " " + nameFilter + " sourcetype=wazuh  \"rule.groups\"=\"authentication_success\" | stats count",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": true
      }, { tokens: true, tokenNamespace: "submitted" })

      new SearchEventHandler({
        managerid: "searchAuthSuccess" + epoch,
        event: "done",
        conditions: [
          {
            attr: "any",
            value: "*",
            actions: [
              { "type": "set", "token": "authSuccessToken", "value": "$result.count$" },
            ]
          }
        ]
      })

      agentsSearch5 = new SearchManager({
        "id": "search5" + epoch,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": "index=" + selectedIndex + " " + nameFilter + " sourcetype=wazuh rule.level=*| timechart count by rule.level",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      agentsSearch6 = new SearchManager({
        "id": "search6" + epoch,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": "index=" + selectedIndex + " " + nameFilter + " sourcetype=wazuh | timechart span=2h count",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      agentsSearch7 = new SearchManager({
        "id": "search7" + epoch,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": "index=" + selectedIndex + " " + nameFilter + " sourcetype=wazuh | top \"agent.name\"",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      agentsSearch8 = new SearchManager({
        "id": "search8" + epoch,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": "index=" + selectedIndex + " " + nameFilter + " sourcetype=wazuh | timechart span=1h limit=5 useother=f count by agent.name",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })


      agentsSearch14 = new SearchManager({
        "id": "search14" + epoch,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": "index=" + selectedIndex + " " + nameFilter + " sourcetype=wazuh |stats count sparkline by rule.id, rule.description, rule.groups, rule.level | sort count DESC | head 10 | rename rule.id as \"Rule ID\", rule.description as \"Description\", rule.level as Level, count as Count, rule.groups as \"Rule group\"",
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


      //
      // DASHBOARD EDITOR
      //

      new Dashboard({
        id: 'dashboard' + epoch,
        el: $('.dashboard-body'),
        showTitle: true,
        editable: false
      }, { tokens: true }).render()

      agentsElement5 = new ChartElement({
        "id": "agentsElement5" + epoch,
        "trellis.size": "medium",
        "charting.axisY2.scale": "inherit",
        "charting.chart.showDataLabels": "none",
        "charting.chart.stackMode": "stacked100",
        "resizable": true,
        "charting.axisTitleY2.visibility": "visible",
        "charting.drilldown": "none",
        "charting.chart": "line",
        "charting.layout.splitSeries.allowIndependentYRanges": "0",
        "charting.chart.nullValueMode": "gaps",
        "trellis.scales.shared": "1",
        "charting.layout.splitSeries": "0",
        "charting.axisTitleX.visibility": "collapsed",
        "charting.legend.labelStyle.overflowMode": "ellipsisMiddle",
        "charting.chart.style": "minimal",
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
        "el": $('#agentsElement5')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      agentsElement6 = new ChartElement({
        "id": "agentsElement6" + epoch,
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
        "el": $('#agentsElement6')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      agentsElement7 = new ChartElement({
        "id": "agentsElement7" + epoch,
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
        "el": $('#agentsElement7')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      agentsElement8 = new ChartElement({
        "id": "agentsElement8" + epoch,
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
        "el": $('#agentsElement8')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      agentsElement14 = new TableElement({
        "id": "agentsElement14" + epoch,
        "dataOverlayMode": "none",
        "drilldown": "cell",
        "percentagesRow": "false",
        "rowNumbers": "false",
        "totalsRow": "false",
        "wrap": "true",
        "managerid": "search14" + epoch,
        "el": $('#agentsElement14')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      agentsElement14.on("click", function (e) {
        if (e.field !== undefined) {
          e.preventDefault()
          const url = TokenUtils.replaceTokenNames("/app/SplunkAppForWazuh/search?q=index=wazuh sourcetype=wazuh |stats count sparkline by rule.id, rule.description, rule.groups, rule.level | sort count DESC | head 10 | rename rule.id as \"Rule ID\", rule.description as \"Description\", rule.level as Level, count as Count, rule.groups as \"Rule group\"&earliest=$when.earliest$&latest=$when.latest$", _.extend(submittedTokenModel.toJSON(), e.data), TokenUtils.getEscaper('url'), TokenUtils.getFilters(mvc.Components))
          utils.redirect(url, false, "_blank")
        }
      })

      //
      // VIEWS: FORM INPUTS
      //

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

