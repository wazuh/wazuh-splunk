define([
  '../module',
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
  "splunkjs/mvc/simplexml/urltokenmodel",
  "splunkjs/mvc/simpleform/input/dropdown"

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
  UrlTokenModel,
  DropdownInput) {

    'use strict'

    controllers.controller('overviewPciCtrl', function ($scope, $currentApiIndexService, $rulesDescription, $state, $filterService) {
      const vm = this
      const epoch = (new Date).getTime()
      let pageLoading = true
      // Create token namespaces
      const urlTokenModel = new UrlTokenModel({ id: 'tokenModel' + epoch })
      mvc.Components.registerInstance('url' + epoch, urlTokenModel)
      const defaultTokenModel = mvc.Components.getInstance('default', { create: true })
      const submittedTokenModel = mvc.Components.getInstance('submitted', { create: true })
      const selectedIndex = $currentApiIndexService.getIndex()

      const filter = $currentApiIndexService.getFilter()
      $filterService.addFilter($currentApiIndexService.getIndex())
      const api = $currentApiIndexService.getAPI()
      let nameFilter = ' '
      if (filter.length === 2) {
        nameFilter = filter[0] + '=' + filter[1]
        console.log('nameFilter ', nameFilter)
        $filterService.addFilter(JSON.parse('{"' + filter[0] + '":"' + filter[1] + '"}'))
      }
      let filters = $filterService.getSerializedFilters()

      urlTokenModel.on('url:navigate', function () {
        defaultTokenModel.set(urlTokenModel.toJSON())
        if (!_.isEmpty(urlTokenModel.toJSON()) && !_.all(urlTokenModel.toJSON(), _.isUndefined)) {
          submitTokens()
        } else {
          submittedTokenModel.clear()
        }
      })

      /**
       * Fires all the queries
       */
      const launchSearches = () => {
        filters = $filterService.getSerializedFilters()
        $state.reload();
        // searches.map(search => search.startSearch())
      }

      $scope.$on('deletedFilter', () => {
        launchSearches()
      })

      $scope.$on('barFilter', () => {
        launchSearches()
      })

      // Initialize tokens
      defaultTokenModel.set(urlTokenModel.toJSON())

      const submitTokens = () => {
        FormUtils.submitForm({ replaceState: pageLoading })
      }

      let dropdownSearch = ''
      let pciReqSearch = ''
      let groupsSearch = ''
      let agentsSearch = ''
      let requirementsByAgents = ''
      let alertsSummary = ''
      let element1 = ''
      let element2 = ''
      let element3 = ''
      let element4 = ''
      let element5 = ''
      let input1 = ''
      let input2 = ''

      /**
       * When controller is destroyed
       */
      $scope.$on('$destroy', () => {
        dropdownSearch.cancel()
        pciReqSearch.cancel()
        groupsSearch.cancel()
        agentsSearch.cancel()
        requirementsByAgents.cancel()
        alertsSummary.cancel()
        dropdownSearch = null
        pciReqSearch = null
        groupsSearch = null
        agentsSearch = null
        requirementsByAgents = null
        alertsSummary = null
        element1 = null
        element2 = null
        element3 = null
        element4 = null
        element5 = null
        input1 = null
        input2 = null
      })

      dropdownSearch = new SearchManager({
        "id": "dropdownSearch" + epoch,
        "status_buckets": 0,
        "sample_ratio": null,
        "latest_time": "$when.latest$",
        "search": `${filters} sourcetype=wazuh rule.pci_dss{}=\"*\"| stats count by \"rule.pci_dss{}\" | sort \"rule.pci_dss{}\" ASC | fields - count`,
        "earliest_time": "$when.earliest$",
        "cancelOnUnload": true,
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true })

      new SearchEventHandler({
        managerid: "dropdownSearch" + epoch,
        event: "done",
        conditions: [
          {
            attr: "any",
            value: "*",
            actions: [
              { "type": "set", "token": "rulesToken", "value": "$result.rule.pcidss{}$" },
            ]
          }
        ]
      })

      const myResults = dropdownSearch.data("results")
      myResults.on("data", () => {
        if (myResults.data() && myResults.data().rows) {
          const rulesTokenArray = myResults.data().rows
          if (rulesTokenArray && rulesTokenArray.length > 0) {
            vm.pciTabs = []
            for (let rule of rulesTokenArray) {
              const currentDescription = $rulesDescription.pciRules()[rule[0]]
              if (currentDescription) {
                vm.pciTabs.push({ 'rule': rule[0], 'description': currentDescription })
              }
            }
            if (!$scope.$$phase) $scope.$digest()
          }
        } else {
          vm.pciTabs = false
          if (!$scope.$$phase) $scope.$digest()
        }
      })


      pciReqSearch = new SearchManager({
        "id": "pciReqSearch" + epoch,
        "status_buckets": 0,
        "sample_ratio": 1,
        "latest_time": "$when.latest$",
        "search": `${filters} sourcetype=wazuh rule.pci_dss{}=\"$pci$\"  | stats count by rule.pci_dss{}`,
        "earliest_time": "$when.earliest$",
        "cancelOnUnload": true,
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      groupsSearch = new SearchManager({
        "id": "groupsSearch" + epoch,
        "status_buckets": 0,
        "sample_ratio": 1,
        "latest_time": "$when.latest$",
        "search": `${filters} sourcetype=wazuh rule.pci_dss{}=\"$pci$\" | stats count by rule.groups`,
        "earliest_time": "$when.earliest$",
        "cancelOnUnload": true,
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      agentsSearch = new SearchManager({
        "id": "agentsSearch" + epoch,
        "status_buckets": 0,
        "sample_ratio": 1,
        "latest_time": "$when.latest$",
        "search": `${filters} sourcetype=wazuh rule.pci_dss{}=\"$pci$\" | stats count by agent.name`,
        "earliest_time": "$when.earliest$",
        "cancelOnUnload": true,
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      requirementsByAgents = new SearchManager({
        "id": "requirementsByAgents" + epoch,
        "status_buckets": 0,
        "sample_ratio": 1,
        "latest_time": "$when.latest$",
        "search": `${filters} sourcetype=wazuh rule.pci_dss{}=\"$pci$\" agent.name=*| chart  count(rule.pci_dss{}) by rule.pci_dss{},agent.name`,
        "earliest_time": "$when.earliest$",
        "cancelOnUnload": true,
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })

      alertsSummary = new SearchManager({
        "id": "alertsSummary" + epoch,
        "status_buckets": 0,
        "sample_ratio": 1,
        "latest_time": "$when.latest$",
        "search": `${filters} sourcetype=wazuh rule.pci_dss{}=\"$pci$\" | stats count sparkline by agent.name, rule.pci_dss{}, rule.description | sort count DESC | rename agent.name as \"Agent Name\", rule.pci_dss{} as Requirement, rule.description as \"Rule description\", count as Count`,
        "earliest_time": "$when.earliest$",
        "cancelOnUnload": true,
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })


      element1 = new ChartElement({
        "id": "element1" + epoch,
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
        "managerid": "pciReqSearch" + epoch,
        "el": $('#element1')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      element2 = new ChartElement({
        "id": "element2" + epoch,
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
        "managerid": "groupsSearch" + epoch,
        "el": $('#element2')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      element3 = new ChartElement({
        "id": "element3" + epoch,
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
        "managerid": "agentsSearch" + epoch,
        "el": $('#element3')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      element4 = new ChartElement({
        "id": "element4" + epoch,
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
        "managerid": "requirementsByAgents" + epoch,
        "el": $('#element4')
      }, { tokens: true, tokenNamespace: "submitted" }).render()


      element5 = new TableElement({
        "id": "element5" + epoch,
        "dataOverlayMode": "heatmap",
        "drilldown": "cell",
        "percentagesRow": "false",
        "rowNumbers": "true",
        "totalsRow": "false",
        "wrap": "false",
        "managerid": "alertsSummary" + epoch,
        "el": $('#element5')
      }, { tokens: true, tokenNamespace: "submitted" }).render()

      element5.on("click", function (e) {
        if (e.field !== undefined) {
          e.preventDefault()
          const url = TokenUtils.replaceTokenNames("{{SPLUNKWEB_URL_PREFIX}}/app/SplunkAppForWazuh/search?q=index=" + selectedIndex + " " + nameFilter + " " + nameFilter + " sourcetype=wazuh rule.pci_dss{}=\"$pci$\" | stats count sparkline by agent.name, rule.pci_dss{}, rule.description | sort count DESC | rename agent.name as \"Agent Name\", rule.pci_dss{} as Requirement, rule.description as \"Rule description\", count as Count&earliest=$when.earliest$&latest=$when.latest$", _.extend(submittedTokenModel.toJSON(), e.data), TokenUtils.getEscaper('url'), TokenUtils.getFilters(mvc.Components))
          utils.redirect(url, false, "_blank")
        }
      })

      //
      // VIEWS: FORM INPUTS
      //

      input2 = new DropdownInput({
        "id": "input2" + epoch,
        "choices": [
          { "label": "ALL", "value": "*" }
        ],
        "searchWhenChanged": true,
        "valueField": "rule.pci_dss{}",
        "showClearButton": true,
        "initialValue": "*",
        "default": "*",
        "labelField": "rule.pci_dss{}",
        "selectFirstChoice": false,
        "value": "$form.pci$",
        "managerid": "dropdownSearch" + epoch,
        "el": $('#input2')
      }, { tokens: true }).render()

      input2.on("change", function (newValue) {
        FormUtils.handleValueChange(input2)
      })

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
      pageLoading = false

    })
  })
