define([
  '../../module',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/search/search-handler',
], function (
  app,
  PieChart,
  AreaChart,
  Table,
  TimePicker,
  SearchHandler
  ) {

    'use strict'

    app.controller('agentsVulnerabilitiesCtrl', function ($urlTokenModel, $scope, $currentDataService, $state, agent) {
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

      $scope.agent = agent.data.data
      $scope.getAgentStatusClass = agentStatus => agentStatus === "Active" ? "teal" : "red";
      $scope.formatAgentStatus = agentStatus => {
        return ['Active', 'Disconnected'].includes(agentStatus) ? agentStatus : 'Never connected';
      }

      const vizz = [
      /**
       * Metrics
       */
      new SearchHandler(
        `criticalSeveritySearch`, `${filters} data.vulnerability.severity=critical | stats count`,
        `criticalSeverityToken`, `$result.count$`, `criticalSeverity`, submittedTokenModel, $scope
      ),
      new SearchHandler(
        `highSeveritySeach`, `${filters} data.vulnerability.severity=high | stats count`,
        `highSeverityToken`, `$result.count$`, `highSeverity`, submittedTokenModel, $scope
      ),
      new SearchHandler(
        `mediumSeveritySeach`, `${filters} data.vulnerability.severity=medium | stats count`,
        `mediumSeverityToken`, `$result.count$`, `mediumSeverity`, submittedTokenModel, $scope
      ),
      new SearchHandler(
        `lowSeveritySeach`, `${filters} data.vulnerability.severity=low | stats count`,
        `lowSeverityToken`, `$result.count$`, `lowSeverity`, submittedTokenModel, $scope
      ),
      /**
       * Visualizations
       */
      new AreaChart('alertsSeverityOverTimeVizz',
      `${filters} sourcetype=wazuh rule.groups=vulnerability-detector data.vulnerability.severity=* | timechart count by data.vulnerability.severity`,
      'alertsSeverityOverTimeVizz'),
      new Table('commonRules',
      `${filters} rule.groups="vulnerability-detector" | top rule.id,rule.description limit=5`,
      'commonRules'),
      new PieChart('commonCves',
      `${filters} rule.groups="vulnerability-detector" | top data.vulnerability.cve limit=5`,
      'commonCves'),
      new PieChart('severityDistribution',
      `${filters} rule.groups="vulnerability-detector" | top data.vulnerability.severity limit=5`,
      'severityDistribution'),
      new PieChart('commonlyAffectedPackVizz',
      `${filters} | top 5 data.vulnerability.package.name`,
      'commonlyAffectedPackVizz'),
      new Table('alertsSummaryVizz',
      `${filters} | stats count sparkline by data.vulnerability.title, data.vulnerability.severity, data.vulnerability.reference`,
      'alertsSummaryVizz'),
      ]
      
      /**
       * When controller is destroyed
       */
      $scope.$on('$destroy', () => {
        timePicker.destroy()
        vizz.map( (vizz) => vizz.destroy())
      })
    })
  })