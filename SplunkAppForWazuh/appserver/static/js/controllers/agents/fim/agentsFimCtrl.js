define([
  '../../module',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/inputs/time-picker',
  'FileSaver'
], function(app, ColumnChart, PieChart, Table, AreaChart, TimePicker) {
  'use strict'

  class AgentsFim {
    /**
     * Class constructor
     * @param {Object} $urlTokenModel
     * @param {Object} $state
     * @param {Object} $scope
     * @param {Object} $currentDataService
     * @param {Object} agent
     * @param {Object} $notificationService
     */

    constructor(
      $urlTokenModel,
      $state,
      $scope,
      $currentDataService,
      agent,
      $tableFilterService,
      $csvRequestService,
      $notificationService
    ) {
      this.state = $state
      this.wzTableFilter = $tableFilterService
      this.api = $currentDataService.getApi()
      this.csvReq = $csvRequestService
      this.toast = $notificationService.showSimpleToast
      if (!$currentDataService.getCurrentAgent()) {
        this.state.go('overview')
      }
      this.scope = $scope
      this.urlTokenModel = $urlTokenModel
      this.filters = $currentDataService.getSerializedFilters()
      this.timePicker = new TimePicker(
        '#timePicker',
        this.urlTokenModel.handleValueChange
      )
      this.submittedTokenModel = this.urlTokenModel.getSubmittedTokenModel()

      this.scope.agent = agent.data.data

      this.scope.$on('deletedFilter', () => {
        this.launchSearches()
      })

      this.scope.$on('barFilter', () => {
        this.launchSearches()
      })

      this.vizz = [
        /**
         * Visualizations
         */
        new AreaChart(
          'eventsOverTimeElement',
          `${
            this.filters
          } sourcetype=\"wazuh\"  \"rule.groups\"=\"syscheck\" | timechart span=12h count by rule.description`,
          'eventsOverTimeElement'
        ),
        new ColumnChart(
          'topGroupOwnersElement',
          `${
            this.filters
          } sourcetype=\"wazuh\" uname_after syscheck.gname_after!=\"\"| top limit=20 \"syscheck.gname_after\"`,
          'topGroupOwnersElement'
        ),
        new PieChart(
          'topUserOwnersElement',
          `${
            this.filters
          } sourcetype=\"wazuh\" uname_after| top limit=20 \"syscheck.uname_after\"`,
          'topUserOwnersElement'
        ),
        new PieChart(
          'topFileChangesElement',
          `${
            this.filters
          } sourcetype=\"wazuh\" \"Integrity checksum changed\" location!=\"syscheck-registry\" syscheck.path=\"*\" | top syscheck.path`,
          'topFileChangesElement'
        ),
        new PieChart(
          'rootUserFileChangesElement',
          `${
            this.filters
          } sourcetype=\"wazuh\" \"Integrity checksum changed\" location!=\"syscheck-registry\" syscheck.path=\"*\" | search root | top limit=10 syscheck.path`,
          'rootUserFileChangesElement'
        ),
        new PieChart(
          'wordWritableFilesElement',
          `${
            this.filters
          } sourcetype=\"wazuh\" rule.groups=\"syscheck\" \"syscheck.perm_after\"=* | top \"syscheck.perm_after\" showcount=false showperc=false | head 1`,
          'wordWritableFilesElement'
        ),
        new Table(
          'eventsSummaryElement',
          `${
            this.filters
          } sourcetype=\"wazuh\" rule.groups=\"syscheck\"  |stats count sparkline by agent.name, syscheck.path syscheck.event, rule.description | sort count DESC | rename agent.name as Agent, syscheck.path as File, syscheck.event as Event, rule.description as Description, count as Count`,
          'eventsSummaryElement'
        )
      ]

      /**
       * When controller is destroyed
       */
      this.scope.$on('$destroy', () => {
        this.timePicker.destroy()
        this.vizz.map(vizz => vizz.destroy())
      })
    }

    $onInit() {
      this.scope.search = term => {
        this.scope.$broadcast('wazuhSearch', { term })
      }
      this.scope.getAgentStatusClass = agentStatus =>
        agentStatus === 'Active' ? 'teal' : 'red'
      this.scope.formatAgentStatus = agentStatus => {
        return ['Active', 'Disconnected'].includes(agentStatus)
          ? agentStatus
          : 'Never connected'
      }
      this.scope.downloadCsv = (path, name) => this.downloadCsv(path, name)
    }

    /**
     * Exports the table in CSV format
     */
    async downloadCsv(path, name) {
      try {
        this.toast('Your download should begin automatically...')
        const currentApi = this.api.id
        const output = await this.csvReq.fetch(
          path,
          currentApi,
          this.wzTableFilter.get()
        )
        const blob = new Blob([output], { type: 'text/csv' }) // eslint-disable-line
        saveAs(blob, name)
        return
      } catch (error) {
        console.error('error ', error)
        this.toast('Error downloading CSV')
      }
      return
    }

    launchSearches() {
      this.filters = $currentDataService.getSerializedFilters()
      this.state.reload()
    }
  }
  app.controller('agentsFimCtrl', AgentsFim)
})
