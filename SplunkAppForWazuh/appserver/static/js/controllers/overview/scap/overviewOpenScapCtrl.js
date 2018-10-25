define([
  '../../module',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/search/search-handler',
  "splunkjs/mvc/simpleform/input/dropdown",
  "splunkjs/mvc/simpleform/formutils",

], function (
  app,
  LinearChart,
  ColumnChart,
  PieChart,
  AreaChart,
  Table,
  TimePicker,
  SearchHandler,
  DropdownInput,
  FormUtils
  
  ) {
    
    'use strict'
    
    app.controller('overviewOpenScapCtrl', function ($urlTokenModel, $scope, $currentDataService, $state ) {
      let filters = $currentDataService.getSerializedFilters()
      const timePicker = new TimePicker('#timePicker')
      const timePickerInstance = timePicker.get()
      const submittedTokenModel = $urlTokenModel.getSubmittedTokenModel()

      timePickerInstance.on("change", function (newValue) {
        if (newValue && timePickerInstance)
        $urlTokenModel.handleValueChange(timePickerInstance)
      })
      
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
      
      const vizz = [
      /**
      * Metrics
      */
      new SearchHandler(`lastScapScore`,
        `${filters} sourcetype=wazuh oscap.scan.score=* | stats latest(oscap.scan.score)`,
        `latestScapScore`,
        '$result.latest(oscap.scan.score)$',
        'scapLastScore',
        submittedTokenModel,
        $scope),
      new SearchHandler(`maxScapScore`,
        `${filters} sourcetype=wazuh oscap.scan.score=* | stats max(oscap.scan.score)`,
        `maxScapScore`,
        '$result.max(oscap.scan.score)$',
        'scapHighestScore',
        submittedTokenModel,
        $scope),
      new SearchHandler(`scapLowest`,
      `${filters} sourcetype=wazuh oscap.scan.score=* | stats min(oscap.scan.score)`,
      `minScapScore`,
      '$result.min(oscap.scan.score)$',
      'scapLowestScore',
      submittedTokenModel,
      $scope),
      
      /**
      * Visualizations
      */
      new PieChart('element4',
      `${filters} sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" rule.groups!=\"syslog\" oscap.scan.profile.title=\"$profile$\" | top agent.name`,
      'element4'),
      new LinearChart('element5',
      `${filters} sourcetype=wazuh rule.level=*| timechart count by rule.level`,
      'element5'),
      new ColumnChart('element',
      `${filters} sourcetype=wazuh | timechart span=2h count`,
      'element6'),
      new PieChart('element7',
      `${filters} sourcetype=wazuh | top agent.name`,
      'element7'),
      new AreaChart('element8',
      `${filters} sourcetype=wazuh | timechart span=1h limit=5 useother=f count by agent.name`,
      'element8'),
      new PieChart('element9',
      `${filters} sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" rule.groups=\"oscap-result\" oscap.scan.profile.title=\"$profile$\" | top oscap.check.title`,
      'element9'),
      new PieChart('element10',
      `${filters} sourcetype=wazuh oscap.check.result=\"fail\" rule.groups=\"oscap\" rule.groups=\"oscap-result\"  oscap.check.severity=\"high\" oscap.scan.profile.title=\"$profile$\" | top oscap.check.title`,
      'element10'),
      new Table('element14',
      `${filters} sourcetype=wazuh |stats count sparkline by rule.id, rule.description, rule.level | sort rule.level DESC | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,
      'element14')
      ]

      const epoch = (new Date).getTime()
      let input2 = ''
      input2 = new DropdownInput({
        "id": "input2" + epoch,
        "choices": [
          { "label": "ALL", "value": "*" }
        ],
        "labelField": "oscap.scan.profile.title",
        "searchWhenChanged": true,
        "default": "*",
        "valueField": "oscap.scan.profile.title",
        "initialValue": "*",
        "selectFirstChoice": false,
        "showClearButton": true,
        "value": "$form.profile$",
        "managerid": "search15" + epoch,
        "el": $('#input2')
      }, { tokens: true }).render()

      input2.on("change", function (newValue) {
        FormUtils.handleValueChange(input2)
      })

      /**
      * On controller destroy
      */
      $scope.$on('$destroy', () => {
        timePicker.destroy()
        vizz.map( (vizz) => vizz.destroy())
      })
    })
  })