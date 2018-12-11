define([
  '../../module',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/inputs/time-picker'
], function(app, ColumnChart, PieChart, Table, LinearChart, TimePicker) {
  'use strict'

  class OverviewFIM {
    /**
     * Class File Integrity Monitoring (syscheck)
     * @param {*} $urlTokenModel 
     * @param {*} $scope 
     * @param {*} $currentDataService 
     * @param {*} $state 
     */
    constructor($urlTokenModel, $scope, $currentDataService, $state) {
      this.scope = $scope
      this.state = $state
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
          'deletedFiles',
          `${
            this.filters
          } sourcetype=wazuh syscheck.event=deleted | top agent.name limit=5`,
          'deletedFiles'
        ),
        new ColumnChart(
          'whodataUsage',
          `${this.filters} sourcetype=wazuh rule.groups=syscheck
          | eval WHODATA=if(isnotnull('syscheck.audit.effective_user.id'), "WHODATA", "NOWHO")
          | stats count BY WHODATA
          | addcoltotals count labelfield=WHODATA label=Total
          | where NOT WHODATA="NOWHO"`,
          'whodataUsage'
        ),
        new PieChart(
          'alertsVolume',
          `${
            this.filters
          } sourcetype=wazuh rule.groups=syscheck | eval SYSCHECK=if(isnotnull('syscheck.event'), "SYSCHECK", "NO")
          | stats count BY SYSCHECK
          | addcoltotals count labelfield=SYSCHECK label=Total
          | where NOT SYSCHECK="NO"`,
          'alertsVolume'
        ),
        new PieChart(
          'newFiles',
          `${
            this.filters
          } sourcetype=wazuh syscheck.event=added | top agent.name limit=5`,
          'newFiles'
        ),
        new PieChart(
          'modifiedFiles',
          `${
            this.filters
          } sourcetype=wazuh syscheck.event=modified | top agent.name limit=5`,
          'modifiedFiles'
        ),
        new LinearChart(
          'eventsSummary',
          `${
            this.filters
          } sourcetype=wazuh rule.groups=syscheck | timechart count`,
          'eventsSummary'
        ),
        new Table(
          'topRules',
          `${
            this.filters
          } sourcetype=wazuh rule.groups=syscheck |stats count sparkline by rule.id, rule.description | sort count DESC | head 5 | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,
          'topRules'
        ),
        new Table(
          'topUsers',
          `${
            this.filters
          } sourcetype=wazuh syscheck.audit.effective_user.id=* | top syscheck.audit.effective_user.name limit=5`,
          'topUsers'
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
  app.controller('overviewFimCtrl', OverviewFIM)
})
