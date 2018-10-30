define([
  '../../module',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/inputs/time-picker',
], function (
  app,
  ColumnChart,
  PieChart,
  Table,
  AreaChart,
  TimePicker
  ) {

    'use strict'

    app.controller('agentsFimCtrl', function ($urlTokenModel, $state, $scope, $currentDataService, agent) {
      if (!$currentDataService.getCurrentAgent()) { $state.go('overview') }
      let filters = $currentDataService.getSerializedFilters()
      const timePicker = new TimePicker('#timePicker',$urlTokenModel.handleValueChange)
      const timePickerInstance = timePicker.get()
 
      $scope.agent = agent.data.data
      $scope.getAgentStatusClass = agentStatus => agentStatus === "Active" ? "teal" : "red";
      $scope.formatAgentStatus = agentStatus => {
        return ['Active', 'Disconnected'].includes(agentStatus) ? agentStatus : 'Never connected';
      }

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

      const vizz = [
        /**
        * Visualizations
        */
        new AreaChart('eventsOverTimeElement',
        `${filters} sourcetype=\"wazuh\"  \"rule.groups\"=\"syscheck\" | timechart span=12h count by rule.description`,
        'eventsOverTimeElement'),
        new ColumnChart('topGroupOwnersElement',
        `${filters} sourcetype=\"wazuh\" uname_after syscheck.gname_after!=\"\"| top limit=20 \"syscheck.gname_after\"`,
        'topGroupOwnersElement'),
        new PieChart('topUserOwnersElement',
        `${filters} sourcetype=\"wazuh\" uname_after| top limit=20 \"syscheck.uname_after\"`,
        'topUserOwnersElement'),
        new PieChart('topFileChangesElement',
        `${filters} sourcetype=\"wazuh\" \"Integrity checksum changed\" location!=\"syscheck-registry\" syscheck.path=\"*\" | top syscheck.path`,
        'topFileChangesElement'),
        new PieChart('rootUserFileChangesElement',
        `${filters} sourcetype=\"wazuh\" \"Integrity checksum changed\" location!=\"syscheck-registry\" syscheck.path=\"*\" | search root | top limit=10 syscheck.path`,
        'rootUserFileChangesElement'),
        new PieChart('wordWritableFilesElement',
        `${filters} sourcetype=\"wazuh\" rule.groups=\"syscheck\" \"syscheck.perm_after\"=* | top \"syscheck.perm_after\" showcount=false showperc=false | head 1`,
        'wordWritableFilesElement'),
        new Table('eventsSummaryElement',
        `${filters} sourcetype=\"wazuh\" rule.groups=\"syscheck\"  |stats count sparkline by agent.name, syscheck.path syscheck.event, rule.description | sort count DESC | rename agent.name as Agent, syscheck.path as File, syscheck.event as Event, rule.description as Description, count as Count`,
        'eventsSummaryElement')
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
