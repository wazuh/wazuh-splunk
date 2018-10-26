define([
  '../../module',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
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
    
    app.controller('overviewGeneralCtrl', function ($urlTokenModel, $scope, $currentDataService, $state, $notificationService, $requestService, pollingState) {
      let filters = $currentDataService.getSerializedFilters()
      const timePicker = new TimePicker('#timePicker')
      const timePickerInstance = timePicker.get()
      const submittedTokenModel = $urlTokenModel.getSubmittedTokenModel()
      let pollingEnabled = true
      if (pollingState && pollingState.data && (pollingState.data.error || pollingState.data.disabled === 'true')) {
        pollingEnabled = false
      }
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
      let agentHistory
      // If polling state is enabled then draw the agent history status
      if (!pollingEnabled) {
        $scope.wzMonitoringEnabled = false
        $requestService.apiReq(`/agents/summary`).then((data) => {
          $scope.agentsCountTotal = data.data.data.Total - 1
          $scope.agentsCountActive = data.data.data.Active - 1
          $scope.agentsCountDisconnected = data.data.data.Disconnected
          $scope.agentsCountNeverConnected = data.data.data['Never connected']
          $scope.agentsCoverity = $scope.agentsCountTotal ? ($scope.agentsCountActive / $scope.agentsCountTotal) * 100 : 0;
          if (!$scope.$$phase) $scope.$digest()
          
        }).catch((error) => {
          $notificationService.showSimpleToast('Cannot fetch agent status data')
        })
        
      } else {
        $scope.wzMonitoringEnabled = true
        agentHistory = new AreaChart(`agentStatusHistory`,`index=wazuh-monitoring-3x status=* | timechart span=1h count by status usenull=f`,`agentStatus`)
      }
      
      const vizz = [
      /**
      * Metrics
      */
      new SearchHandler(`totalAlerts`,`${filters} | stats count`,`totalAlertsToken`,'$result.count$','totalAlerts',submittedTokenModel,$scope),
      new SearchHandler(`searchLevel12`,`${filters} sourcetype=wazuh "rule.level">=12 | chart count`,`level12token`,'$result.count$','levelTwelve',submittedTokenModel,$scope),
      new SearchHandler(`searchAuthFailure`,`${filters} sourcetype=wazuh "rule.groups"="authentication_fail*" | stats count`,`authFailureToken`,'$result.count$','authFailure',submittedTokenModel,$scope),
      new SearchHandler(`searchAuthSuccess`,`${filters} sourcetype=wazuh  "rule.groups"="authentication_success" | stats count`,`authSuccessToken`,'$result.count$','authSuccess',submittedTokenModel,$scope),
      /**
      * Visualizations
      */
      new LinearChart('alertLevEvoVizz',`${filters} sourcetype=wazuh rule.level=*| timechart count by rule.level`,'alertLevEvoVizz'),
      new ColumnChart('alertsVizz',`${filters} sourcetype=wazuh | timechart span=2h count`,'alertsVizz'),
      new PieChart('top5AgentsVizz',`${filters} sourcetype=wazuh | top agent.name`,'top5AgentsVizz'),
      new AreaChart('alertsEvoTop5Agents',`${filters} sourcetype=wazuh | timechart span=1h limit=5 useother=f count by agent.name`,'alertsEvoTop5Agents'),
      new Table('agentsSummaryVizz',`${filters} sourcetype=wazuh |stats count sparkline by rule.id, rule.description, rule.level | sort rule.level DESC | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,'agentsSummaryVizz')
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