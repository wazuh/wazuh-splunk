define([
  '../../module',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/time-picker/time-picker',
  '../../../services/visualizations/search/search-handler',
], function (
  app,
  LinearChart,
  ColumnChart,
  PieChart,
  AreaChart,
  Table,
  TimePicker,
  SearchHandler
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
      new SearchHandler(`lastScapScore`,`${filters} sourcetype=wazuh oscap.scan.score=* | stats latest(oscap.scan.score)`,`latestScapScore`,'$result.latest(oscap.scan.score)$','scapLastScore',submittedTokenModel,$scope),
      new SearchHandler(`maxScapScore`,`${filters} sourcetype=wazuh oscap.scan.score=* | stats max(oscap.scan.score)`,`maxScapScore`,'$result.max(oscap.scan.score)$','scapHighestScore',submittedTokenModel,$scope),
      new SearchHandler(`scapLowest`,`${filters} sourcetype=wazuh oscap.scan.score=* | stats min(oscap.scan.score)`,`minScapScore`,'$result.min(oscap.scan.score)$','scapLowestScore',submittedTokenModel,$scope),
      
      /**
      * Visualizations
      */
      new LinearChart('overviewElement5',`${filters} sourcetype=wazuh rule.level=*| timechart count by rule.level`,'overviewElement5'),
      new ColumnChart('overviewElement',`${filters} sourcetype=wazuh | timechart span=2h count`,'overviewElement6'),
      new PieChart('overviewElement7',`${filters} sourcetype=wazuh | top agent.name`,'overviewElement7'),
      new AreaChart('overviewElement8',`${filters} sourcetype=wazuh | timechart span=1h limit=5 useother=f count by agent.name`,'overviewElement8'),
      new Table('overviewElement14',`${filters} sourcetype=wazuh |stats count sparkline by rule.id, rule.description, rule.level | sort rule.level DESC | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,'overviewElement14')
      ]
      
      /**
      * On controller destroy
      */
      $scope.$on('$destroy', () => {
        timePicker.destroy()
        vizz.map( (vizz) => vizz.destroy())
        if (agentHistory) {
          agentHistory.destroy()
        }
      })
    })
  })