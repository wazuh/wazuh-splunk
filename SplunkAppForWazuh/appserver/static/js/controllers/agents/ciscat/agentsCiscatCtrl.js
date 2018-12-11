define([
  '../../module',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/search/search-handler'
], function(app, ColumnChart, LinearChart, Table, TimePicker, SearchHandler) {
  'use strict'

  class AgentsCiscat {
    constructor($urlTokenModel, $scope, $state, $currentDataService, agent) {
      this.state = $state
      this.currentDataService = $currentDataService
      if (!this.currentDataService.getCurrentAgent()) {
        this.state.go('overview')
      }
      this.scope = $scope
      this.urlTokenModel = $urlTokenModel
      this.timePicker = new TimePicker(
        '#timePicker',
        this.urlTokenModel.handleValueChange
      )
      this.submittedTokenModel = this.urlTokenModel.getSubmittedTokenModel()
      this.agent = agent
      if (
        this.agent &&
        this.agent.data &&
        this.agent.data.data &&
        this.agent.data.data.id
      )
        this.currentDataService.addFilter(
          `{"agent.id":"${this.agent.data.data.id}", "implicit":true}`
        )
      this.filters = this.currentDataService.getSerializedFilters()
      this.vizz = [
        /**
         * Metrics
         */
        new SearchHandler(
          `lastNotChecked`,
          `${
            this.filters
          } | search data.cis.notchecked=* | table data.cis.notchecked | head 1`,
          `filesAddedToken`,
          '$result.data.cis.notchecked$',
          'lastNotChecked',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastPass`,
          `${
            this.filters
          } | search data.cis.pass=* | table data.cis.pass | head 1`,
          `lastPass`,
          '$result.data.cis.pass$',
          'lastPass',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastScanScore`,
          `${
            this.filters
          } | search data.cis.score=* | table data.cis.score | head 1`,
          `lastScanScore`,
          '$result.data.cis.score$',
          'lastScanScore',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastScanDate`,
          `${
            this.filters
          }  | search data.cis.timestamp=* | table data.cis.timestamp | head 1`,
          'lastScanDate',
          '$result.data.cis.timestamp$',
          'lastScanDate',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastErrors`,
          `${
            this.filters
          } | search data.cis.error=* | table data.cis.error | head 1`,
          'lastErrors',
          '$result.data.cis.error$',
          'lastErrors',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastFails`,
          `${
            this.filters
          } | search data.cis.fail=* | table data.cis.fail | head 1`,
          'lastFails',
          '$result.data.cis.fail$',
          'lastFails',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastUnknown`,
          `${
            this.filters
          } | search data.unknown.fail=* | table data.cis.unknown | head 1`,
          'lastUnknown',
          '$result.data.cis.unknown$',
          'lastUnknown',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastScanBenchmark`,
          `${
            this.filters
          } rule.groups=ciscat | search data.cis.benchmark=* | table data.cis.benchmark | head 1`,
          'lastScanBenchmark',
          '$result.data.cis.benchmark$',
          'lastScanBenchmark',
          this.submittedTokenModel,
          this.scope
        ),
        /**
         * Visualizations
         */
        new ColumnChart(
          'topCiscatGroups',
          `${
            this.filters
          } sourcetype=wazuh rule.groups="ciscat" | top data.cis.group`,
          'topCiscatGroups'
        ),
        new LinearChart(
          'scanResultEvolution',
          `${
            this.filters
          } sourcetype=wazuh rule.groups="ciscat" | timechart count by data.cis.result usenull=f`,
          'scanResultEvolution'
        ),
        new Table(
          'alertsSummary',
          `${
            this.filters
          } sourcetype=wazuh rule.groups="ciscat" | stats count sparkline by data.cis.rule_title, data.cis.remediation,data.cis.group | sort count desc | rename "data.cis.rule_title" as "Title",  "data.cis.remediation" as "Remediation",  "data.cis.group" as "Group" `,
          'alertsSummary'
        )
      ]
    }

    $onInit() {
      this.scope.agent =
        this.agent && this.agent.data && this.agent.data.data
          ? this.agent.data.data
          : { error: true }
      this.scope.formatAgentStatus = agentStatus =>
        this.formatAgentStatus(agentStatus)
      this.scope.getAgentStatusClass = agentStatus =>
        this.getAgentStatusClass(agentStatus)
      this.scope.$on('deletedFilter', () => {
        this.launchSearches()
      })

      this.scope.$on('barFilter', () => {
        this.launchSearches()
      })

      this.scope.$on('$destroy', () => {
        this.timePicker.destroy()
        this.vizz.map(vizz => vizz.destroy())
      })
    }

    formatAgentStatus(agentStatus) {
      return ['Active', 'Disconnected'].includes(agentStatus)
        ? agentStatus
        : 'Never connected'
    }

    getAgentStatusClass(agentStatus) {
      agentStatus === 'Active' ? 'teal' : 'red'
    }

    launchSearches() {
      this.filters = this.currentDataService.getSerializedFilters()
      this.state.reload()
    }
  }
  app.controller('agentsCiscatCtrl', AgentsCiscat)
})
