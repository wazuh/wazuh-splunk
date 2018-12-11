//index=wazuh data.integration="virustotal"

define([
  '../../module',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/chart/bar-chart'
], function(app, PieChart, Table, LinearChart, TimePicker, BarChart) {
  'use strict'

  class OverviewVirusTotal {
    /**
     * 
     * @param {*} $urlTokenModel 
     * @param {*} $scope 
     * @param {*} $currentDataService 
     * @param {*} $state 
     */
    constructor($urlTokenModel, $scope, $currentDataService, $state) {
      this.scope = $scope
      this.state = $state
      //Add filer for VirusTotal
      $currentDataService.addFilter(
        `{"rule.groups":"virustotal", "implicit":true}`
      )
      this.getFilters = $currentDataService.getSerializedFilters
      this.filters = this.getFilters()
      this.submittedTokenModel = $urlTokenModel.getSubmittedTokenModel()
      this.timePicker = new TimePicker(
        '#timePicker',
        $urlTokenModel.handleValueChange
      )

      this.vizz = [
        /**
         * Visualizations
         */
        new PieChart(
          'top5AgentsPositive',
          `${this.filters} rule.id=87105 | top agent.name limit=5`,
          'top5AgentsPositive'
        ),
        new PieChart(
          'top5AgentsNoPositive',
          `${this.filters} rule.id=87104 | top agent.name limit=5`,
          'top5AgentsNoPositive'
        ),
        new Table(
          'top5Rules',
          `${
            this.filters
          } |stats count sparkline by rule.id, rule.description | sort count DESC | head 5 | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,
          'top5Rules'
        ),
        new LinearChart(
          'eventsSummary',
          `${this.filters} | timechart count`,
          'eventsSummary'
        ),
        new BarChart(
          'alertsPerAgent',
          `${this.filters} | top agent.name`,
          'alertsPerAgent'
        )
      ]

      this.scope.$on('deletedFilter', () => {
        this.launchSearches()
      })

      this.scope.$on('barFilter', () => {
        this.launchSearches()
      })

      /**
       * On controller destroy
       */
      this.scope.$on('$destroy', () => {
        this.timePicker.destroy()
        this.vizz.map(vizz => vizz.destroy())
      })
    }

    /**
     * Get filters and launches the search
     */
    launchSearches() {
      this.filters = this.getFilters()
      this.state.reload()
    }
  }
  app.controller('overviewVirusTotal', OverviewVirusTotal)
})
