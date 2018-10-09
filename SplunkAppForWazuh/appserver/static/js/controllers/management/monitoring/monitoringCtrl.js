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
    
    controllers.controller('monitoringCtrl', function ($state, $stateParams, $scope, monitoringInfo, $currentDataService, $requestService, $notificationService) {
      const vm = this
      const epoch = (new Date).getTime()
      vm.isClusterEnabled = $stateParams.isClusterEnabled || true
      vm.isClusterRunning = $stateParams.isClusterRunning || true
      vm.showConfig = $stateParams.isClusterRunning || false
      vm.showNodes = $stateParams.showNodes || false
      vm.currentNode = $stateParams.currentNode || null
      
      let filters = $currentDataService.getSerializedFilters()
      
      vm.status = 'yes'
      const currentApi = $currentDataService.getApi()
      vm.currentApi = currentApi.clusterName || currentApi.managerName 
      const running = monitoringInfo[0].data.data.running
      const enabled = monitoringInfo[0].data.data.enabled
      
      // Create token namespaces
      const urlTokenModel = new UrlTokenModel({ id: 'tokenModel' + epoch })
      mvc.Components.registerInstance('url' + epoch, urlTokenModel)
      const defaultTokenModel = mvc.Components.getInstance('default', { create: true })
      const submittedTokenModel = mvc.Components.getInstance('submitted', { create: true })
      let alertSummary
      let pageLoading = true
      let alertSummarySearch
      let alertNodeSummary
      let alertNodeSummarySearch
      let topNodes
      let topNodesSearch
      let alertsNode
      let alertsNodeSearch
      let input1
      let epochSearch = epoch

      vm.search = term => {
        $scope.$broadcast('wazuhSearch', { term })
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
      input1 = new TimeRangeInput({
        "id": `input1${epoch}`,
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
      
      alertSummarySearch = new SearchManager({
        "id": `alertSummarySearch${epoch}`,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": `${filters} sourcetype=wazuh | timechart span=1h count`,
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })
      
      alertSummary = new ChartElement({
        "id": `alertSummary${epoch}`,
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
        "managerid": `alertSummarySearch${epoch}`,
        "el": $('#alertSummary')
      }, { tokens: true, tokenNamespace: "submitted" }).render()
      
      alertNodeSummarySearch = new SearchManager({
        "id": `alertNodeSummarySearch${epoch}`,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": `${filters} sourcetype=wazuh | timechart span=1h count by cluster.node`,
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })
      
      alertNodeSummary = new ChartElement({
        "id": `alertNodeSummary${epoch}`,
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
        "managerid": `alertNodeSummarySearch${epoch}`,
        "el": $('#alertNodeSummary')
      }, { tokens: true, tokenNamespace: "submitted" }).render()
      
      topNodesSearch = new SearchManager({
        "id": `topNodesSearch${epoch}`,
        "cancelOnUnload": true,
        "earliest_time": "$when.earliest$",
        "sample_ratio": 1,
        "status_buckets": 0,
        "latest_time": "$when.latest$",
        "search": `${filters} sourcetype=wazuh | top cluster.node`,
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": false
      }, { tokens: true, tokenNamespace: "submitted" })
      
      topNodes = new ChartElement({
        "id": `topNodes${epoch}`,
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
        "managerid": "topNodesSearch" + epoch,
        "el": $('#topNodes')
      }, { tokens: true, tokenNamespace: "submitted" }).render()
      
      if (enabled === 'no') {
        vm.isClusterEnabled = false
        
      }else if (running === 'no') {
        vm.isClusterRunning = false
        vm.status = 'no'
      }
      
      vm.reset = () => {
        vm.showConfig = false
        vm.showNodes = false
        vm.currentNode = false
        if (!$scope.$$phase) $scope.$digest()
      }
      
      
      const setBooleans = component => {
        vm.showConfig = component === 'showConfig'
        vm.showNodes = component === 'showNodes'
        vm.currentNode = null
        if (!$scope.$$phase) $scope.$digest()
      }
      
      vm.goConfiguration = () => {
        setBooleans('showConfig')
      }
      
      vm.goNodes = () => {
        setBooleans('showNodes')
      }
      
      const nodesCount = monitoringInfo[1].data.data.totalItems
      vm.nodesCount = nodesCount
      
      const configuration = monitoringInfo[2]
      vm.configuration = configuration.data.data
      
      const version = monitoringInfo[3]
      vm.version = version.data.data
      
      const agents = monitoringInfo[4]
      vm.agentsCount = agents.data.data.totalItems - 1
      
      const health = monitoringInfo[5]
      vm.healthCheck = health.data.data
      
      const nodes = monitoringInfo[1].data.data
      
      nodes.name = vm.configuration.name
      nodes.master_node = vm.configuration.node_name
      
      const launchSearches = () => {
        $('#overviewNode').empty()
        alertsNodeSearch = null
        alertsNode = null
        epochSearch++
        let nodeSearch = ''
        if (vm.currentNode && vm.currentNode.name && vm.currentNode.type !== 'worker') {
          nodeSearch = `${filters} cluster.node=node01 sourcetype=wazuh | timechart span=2h count`
        } else {
          nodeSearch = `${filters} sourcetype=wazuh | timechart span=2h count`
        }
        
        // Alerts per node vis
        alertsNodeSearch = new SearchManager({
          "id": `alertsNodeSearch${epochSearch}`,
          "cancelOnUnload": true,
          "earliest_time": "$when.earliest$",
          "sample_ratio": 1,
          "status_buckets": 0,
          "latest_time": "$when.latest$",
          "search": nodeSearch,
          "app": utils.getCurrentApp(),
          "auto_cancel": 90,
          "preview": true,
          "tokenDependencies": {
          },
          "runWhenTimeIsUndefined": false
        }, { tokens: true, tokenNamespace: "submitted" })
        alertsNodeSearch.cancel()

        alertsNode = new ChartElement({
          "id": `alertsNode${epochSearch}`,
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
          "managerid": `alertsNodeSearch${epochSearch}`,
          "el": $('#overviewNode')
        }, { tokens: true, tokenNamespace: "submitted" }).render()
        
        alertsNodeSearch.startSearch()
      }
      
      $scope.$on('wazuhShowClusterNode', async (event, parameters) => {
        try {
          vm.currentNode = parameters.node
          launchSearches()
          const data = await $requestService.apiReq(`/cluster/healthcheck`, {
            node: vm.currentNode.name
          })
          
          vm.currentNode.healthCheck =
          data.data.data.nodes[vm.currentNode.name]
          
          if (
            vm.currentNode.healthCheck &&
            vm.currentNode.healthCheck.status
            ) {
              vm.currentNode.healthCheck.status.last_sync_integrity.duration =
              'n/a'
              vm.currentNode.healthCheck.status.last_sync_agentinfo.duration =
              'n/a'
              vm.currentNode.healthCheck.status.last_sync_agentgroups.duration =
              'n/a'
              
              if (
                vm.currentNode.healthCheck.status.last_sync_integrity
                .date_start_master !== 'n/a' &&
                vm.currentNode.healthCheck.status.last_sync_integrity
                .date_end_master !== 'n/a'
                ) {
                  const end = new Date(
                    vm.currentNode.healthCheck.status.last_sync_integrity.date_end_master
                    )
                    const start = new Date(
                      vm.currentNode.healthCheck.status.last_sync_integrity.date_start_master
                      )
                      vm.currentNode.healthCheck.status.last_sync_integrity.duration = `${(end -
                        start) /
                        1000}s`
                      }
                      
                      if (
                        vm.currentNode.healthCheck.status.last_sync_agentinfo
                        .date_start_master !== 'n/a' &&
                        vm.currentNode.healthCheck.status.last_sync_agentinfo
                        .date_end_master !== 'n/a'
                        ) {
                          const end = new Date(
                            vm.currentNode.healthCheck.status.last_sync_agentinfo.date_end_master
                            )
                            const start = new Date(
                              vm.currentNode.healthCheck.status.last_sync_agentinfo.date_start_master
                              )
                              vm.currentNode.healthCheck.status.last_sync_agentinfo.duration = `${(end -
                                start) /
                                1000}s`
                              }
                              
                              if (
                                vm.currentNode.healthCheck.status.last_sync_agentgroups
                                .date_start_master !== 'n/a' &&
                                vm.currentNode.healthCheck.status.last_sync_agentgroups
                                .date_end_master !== 'n/a'
                                ) {
                                  const end = new Date(
                                    vm.currentNode.healthCheck.status.last_sync_agentgroups.date_end_master
                                    )
                                    const start = new Date(
                                      vm.currentNode.healthCheck.status.last_sync_agentgroups.date_start_master
                                      )
                                      vm.currentNode.healthCheck.status.last_sync_agentgroups.duration = `${(end -
                                        start) /
                                        1000}s`
                                      }
                                    }
                                    
                                    //assignFilters($scope.currentNode.name)
                                    
                                    if (!$scope.$$phase) $scope.$digest()
                                  } catch (error) {
                                    $notificationService.showSimpleToast(error.message || error)
                                  }
                                })
                                
                                pageLoading = false
                                
                                submitTokens()
                                
                                DashboardController.ready()
                                
                                
                                /**
                                * When controller is destroyed
                                */
                                $scope.$on('$destroy', () => {
                                  alertSummary = null
                                  alertSummarySearch.cancel()
                                  alertNodeSummary = null
                                  alertNodeSummarySearch.cancel()
                                  input1 = null
                                  alertSummarySearch = null
                                  alertNodeSummarySearch = null
                                })
                              })
                            })