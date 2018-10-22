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
    
    app.controller('overviewGeneralCtrl', function ($urlTokenModel, $scope, $currentDataService, $state, $notificationService, $requestService, pollingState) {
      const vm = this
      let filters = $currentDataService.getSerializedFilters()
      const timePicker = new TimePicker('#input1')
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
        vm.wzMonitoringEnabled = false
        $requestService.apiReq(`/agents/summary`).then((data) => {
          vm.agentsCountTotal = data.data.data.Total - 1
          vm.agentsCountActive = data.data.data.Active - 1
          vm.agentsCountDisconnected = data.data.data.Disconnected
          vm.agentsCountNeverConnected = data.data.data['Never connected']
          vm.agentsCoverity = vm.agentsCountTotal ? (vm.agentsCountActive / vm.agentsCountTotal) * 100 : 0;
          if (!$scope.$$phase) $scope.$digest()
          
        }).catch((error) => {
          $notificationService.showSimpleToast('Cannot fetch agent status data')
        })
        
      } else {
        vm.wzMonitoringEnabled = true
        agentHistory = new AreaChart(`agentStatusHistory`,`index=wazuh-monitoring-3x status=* | timechart span=1h count by status usenull=f`,`agentStatus`)
      }
      
      /**
      * Metrics
      */
      const totalAlertsSearch = new SearchHandler(`totalAlerts`,`${filters} | stats count`,`totalAlertsToken`,'$result.count$','totalAlerts',submittedTokenModel,$scope)
      const level12Search = new SearchHandler(`searchLevel12`,`${filters} sourcetype=wazuh "rule.level">=12 | chart count`,`level12token`,'$result.count$','levelTwelve',submittedTokenModel,$scope)
      const authFailure = new SearchHandler(`searchAuthFailure`,`${filters} sourcetype=wazuh "rule.groups"="authentication_fail*" | stats count`,`authFailureToken`,'$result.count$','authFailure',submittedTokenModel,$scope)
      const authSuccess = new SearchHandler(`searchAuthSuccess`,`${filters} sourcetype=wazuh  "rule.groups"="authentication_success" | stats count`,`authSuccessToken`,'$result.count$','authSuccess',submittedTokenModel,$scope)
      
      /**
      * Visualizations
      */
      const totalAlerts = new LinearChart('overviewElement5',`${filters} sourcetype=wazuh rule.level=*| timechart count by rule.level`,'overviewElement5')
      const totalAlertsColumn = new ColumnChart('overviewElement',`${filters} sourcetype=wazuh | timechart span=2h count`,'overviewElement6')
      const topAgentName = new PieChart('overviewElement7',`${filters} sourcetype=wazuh | top agent.name`,'overviewElement7')
      const timechartAgentName = new AreaChart('overviewElement8',`${filters} sourcetype=wazuh | timechart span=1h limit=5 useother=f count by agent.name`,'overviewElement8')
      const tableSummary = new Table('overviewElement14',`${filters} sourcetype=wazuh |stats count sparkline by rule.id, rule.description, rule.level | sort rule.level DESC | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,'overviewElement14')
      
      /**
      * On controller destroy
      */
      $scope.$on('$destroy', () => {
        
        totalAlerts.destroy()
        totalAlertsColumn.destroy()
        topAgentName.destroy()
        timePicker.destroy()
        tableSummary.destroy()
        timechartAgentName.destroy()  
        totalAlertsSearch.destroy()
        level12Search.destroy()
        authFailure.destroy()
        authSuccess.destroy()
        if (agentHistory) {
          agentHistory.destroy()
        }
      })
    })
  })