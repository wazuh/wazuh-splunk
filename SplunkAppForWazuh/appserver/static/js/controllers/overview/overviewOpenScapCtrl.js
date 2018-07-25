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

    controllers.controller('overviewOpenScapCtrl', function ($scope, $currentApiIndexService) {
      const vm = this
      const epoch = (new Date).getTime()
      let pageLoading = false
      // Create token namespaces
      const urlTokenModel = new UrlTokenModel({ id: 'tokenModel' + epoch })
      mvc.Components.registerInstance('url' + epoch, urlTokenModel)
      const defaultTokenModel = mvc.Components.getInstance('default', { create: true })
      const submittedTokenModel = mvc.Components.getInstance('submitted', { create: true })
      const selectedIndex = $currentApiIndexService.getIndex()

      const filter = $currentApiIndexService.getFilter()
      const nameFilter = filter[0] + '=' + filter[1]

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

      /**
       * When controller is destroyed
       */
      $scope.$on('$destroy', () => {

      })

      // Listen for a change to the token tokenTotalAlerts value
      let filesAddedSearch = new SearchManager({
        "id": "filesAddedSearch" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index=" + selectedIndex + " " + nameFilter + "  sourcetype=wazuh oscap.scan.score=* | stats latest(oscap.scan.score) as Latest",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": true
      }, { tokens: true, tokenNamespace: "submitted" })


      new SearchEventHandler({
        managerid: "filesAddedSearch" + epoch,
        event: "done",
        conditions: [
          {
            attr: "any",
            value: "*",
            actions: [
              { "type": "set", "token": "filesAddedToken", "value": "$result.count$" },
            ]
          }
        ]
      })

      submittedTokenModel.on("change:filesAddedToken", (model, filesAddedToken, options) => {
        const filesAddedTokenJS = submittedTokenModel.get("filesAddedToken")
        if (typeof filesAddedTokenJS !== 'undefined' && filesAddedTokenJS !== 'undefined' && filesAddedTokenJS !== '$result.count$') {
          vm.scapLastScore = filesAddedTokenJS
          if (!$scope.$$phase) $scope.$digest()
        } else {
          vm.scapLastScore = 0
          if (!$scope.$$phase) $scope.$digest()
        }
      })

      // Listen for a change to the token tokenTotalAlerts value
      let readFilesSearch = new SearchManager({
        "id": "readFilesSearch" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index=" + selectedIndex + " " + nameFilter + " sourcetype=wazuh oscap.scan.score=* | stats max(oscap.scan.score)",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": true
      }, { tokens: true, tokenNamespace: "submitted" })

      new SearchEventHandler({
        managerid: "readFilesSearch" + epoch,
        event: "done",
        conditions: [
          {
            attr: "any",
            value: "*",
            actions: [
              { "type": "set", "token": "readFilesToken", "value": "$result.count$" },
            ]
          }
        ]
      })

      submittedTokenModel.on("change:readFilesToken", (model, readFilesToken, options) => {
        const readFilesTokenJS = submittedTokenModel.get("readFilesToken")
        if (typeof readFilesTokenJS !== 'undefined' && readFilesTokenJS !== 'undefined' && readFilesTokenJS !== '$result.count$') {
          vm.scapHighestScore = readFilesTokenJS
          console.log('readed files ', readFilesTokenJS)
          if (!$scope.$$phase) $scope.$digest()
        } else {
          vm.scapHighestScore = 0
          if (!$scope.$$phase) $scope.$digest()
        }
      })

      // Listen for a change to the token tokenTotalAlerts value
      let modifiedFiles = new SearchManager({
        "id": "modifiedFiles" + epoch,
        "cancelOnUnload": true,
        "sample_ratio": 1,
        "earliest_time": "$when.earliest$",
        "status_buckets": 0,
        "search": "index=" + selectedIndex + " " + nameFilter + " sourcetype=wazuh oscap.scan.score=* | stats min(oscap.scan.score)",
        "latest_time": "$when.latest$",
        "app": utils.getCurrentApp(),
        "auto_cancel": 90,
        "preview": true,
        "tokenDependencies": {
        },
        "runWhenTimeIsUndefined": true
      }, { tokens: true, tokenNamespace: "submitted" })

      new SearchEventHandler({
        managerid: "modifiedFiles" + epoch,
        event: "done",
        conditions: [
          {
            attr: "any",
            value: "*",
            actions: [
              { "type": "set", "token": "filesModifiedToken", "value": "$result.count$" },
            ]
          }
        ]
      })

      submittedTokenModel.on("change:filesModifiedToken", (model, filesModifiedToken, options) => {
        const filesDeletedTokenJS = submittedTokenModel.get("filesModifiedToken")
        if (typeof filesModifiedTokenJS !== 'undefined' && filesModifiedTokenJS !== 'undefined' && filesModifiedTokenJS !== '$result.count$') {
          vm.scapLowestScore = filesModifiedToken
          if (!$scope.$$phase) $scope.$digest()
        } else {
          vm.scapLowestScore = 0
          if (!$scope.$$phase) $scope.$digest()
        }
      })

      //
      // VIEWS: FORM INPUTS
      //

      const input1 = new TimeRangeInput({
        "id": "input1" + epoch,
        "searchWhenChanged": true,
        "default": { "latest_time": "now", "earliest_time": "-24h@h" },
        "earliest_time": "$form.when.earliest$",
        "latest_time": "$form.when.latest$",
        "el": $('#input1')
      }, { tokens: true }).render()

      input1.on("change", (newValue) => {
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
