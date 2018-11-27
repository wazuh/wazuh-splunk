define([
  '../../module',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/inputs/time-picker'
], function(app, ColumnChart, PieChart, Table, AreaChart, TimePicker) {
  'use strict'

  class AgentsVirusTotal {
    /**
     * Class constructor
     * @param {Object} $urlTokenModel
     * @param {Object} $state
     * @param {Object} $scope
     * @param {Object} $currentDataService
     * @param {Object} agent
     */

    constructor($urlTokenModel, $state, $scope, $currentDataService, agent) {
      this.state = $state
      if (!$currentDataService.getCurrentAgent()) {
        this.state.go('overview')
      }
      this.scope = $scope
      //Add filer for VirusTotal
      $currentDataService.addFilter(
        `{"rule.groups":"virustotal", "implicit":true}`
      )
      this.getFilters = $currentDataService.getSerializedFilters
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
          `${this.filters}  | timechart span=12h count by rule.id`,
          'eventsOverTimeElement'
        ),
        new Table(
          'eventsSummaryElement',
          `${
            this.filters
          } | stats count sparkline by rule.description | sort count DESC | rename agent.name as Agent, rule.description as Description, count as Count`,
          'eventsSummaryElement'
        ),
        new Table(
          'top5Rules',
          `${
            this.filters
          } | stats count sparkline by rule.id, rule.description | sort count DESC | head 5 | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,
          'top5Rules'
        ),
        new PieChart(
          'alertsVolume',
          `${
            this.filters
          } | stats count by rule.description | rename "rule.description" as "Description"`,
          'alertsVolume'
        ),
        new Table(
          'filesAffected',
          `${
            this.filters
          }  rule.level=12 | top data.virustotal.source.file |  rename data.virustotal.source.file as "File" | fields - percent | fields - count`,
          'filesAffected'
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
      this.scope.getAgentStatusClass = agentStatus =>
        agentStatus === 'Active' ? 'teal' : 'red'
      this.scope.formatAgentStatus = agentStatus => {
        return ['Active', 'Disconnected'].includes(agentStatus)
          ? agentStatus
          : 'Never connected'
      }
    }

    launchSearches() {
      this.filters = $currentDataService.getSerializedFilters()
      this.state.reload()
    }
  }
  app.controller('agentsVirusTotalCtrl', AgentsVirusTotal)
})

//data.virustotal.source.file
