define([
  '../../module',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/rawTableData/rawTableDataService'
], function(
  app,
  ColumnChart,
  PieChart,
  Table,
  LinearChart,
  TimePicker,
  rawTableDataService
) {
  'use strict'

  class OverviewFIM {
    /**
     * Class File Integrity Monitoring (syscheck)
     * @param {*} $urlTokenModel
     * @param {*} $scope
     * @param {*} $currentDataService
     * @param {*} $state
     * @param {*} $reportingService
     */
    constructor(
      $urlTokenModel,
      $scope,
      $currentDataService,
      $state,
      $reportingService
    ) {
      this.scope = $scope
      this.state = $state
      this.reportingService = $reportingService
      this.getFilters = $currentDataService.getSerializedFilters
      this.filters = this.getFilters()
      this.tableResults = {}
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
          'deletedFiles',
          this.scope
        ),
        new ColumnChart(
          'whodataUsage',
          `${this.filters} sourcetype=wazuh rule.groups=syscheck
          | eval WHODATA=if(isnotnull('syscheck.audit.effective_user.id'), "WHODATA", "NOWHO")
          | stats count BY WHODATA
          | addcoltotals count labelfield=WHODATA label=Total
          | where NOT WHODATA="NOWHO"`,
          'whodataUsage',
          this.scope
        ),
        new PieChart(
          'alertsVolume',
          `${
            this.filters
          } sourcetype=wazuh rule.groups=syscheck | eval SYSCHECK=if(isnotnull('syscheck.event'), "SYSCHECK", "NO")
          | stats count BY SYSCHECK
          | addcoltotals count labelfield=SYSCHECK label=Total
          | where NOT SYSCHECK="NO"`,
          'alertsVolume',
          this.scope
        ),
        new PieChart(
          'newFiles',
          `${
            this.filters
          } sourcetype=wazuh syscheck.event=added | top agent.name limit=5`,
          'newFiles',
          this.scope
        ),
        new PieChart(
          'modifiedFiles',
          `${
            this.filters
          } sourcetype=wazuh syscheck.event=modified | top agent.name limit=5`,
          'modifiedFiles',
          this.scope
        ),
        new LinearChart(
          'eventsSummary',
          `${
            this.filters
          } sourcetype=wazuh rule.groups=syscheck | timechart count`,
          'eventsSummary',
          this.scope
        ),
        new Table(
          'topRules',
          `${
            this.filters
          } sourcetype=wazuh rule.groups=syscheck |stats count sparkline by rule.id, rule.description | sort count DESC | head 5 | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,
          'topRules',
          this.scope
        ),
        new Table(
          'topUsers',
          `${
            this.filters
          } sourcetype=wazuh syscheck.audit.effective_user.id=* | top syscheck.audit.effective_user.name limit=5 | rename syscheck.audit.effective_user.name as Username, count as Count, percent as Percent`,
          'topUsers',
          this.scope
        )
      ]

      this.topRulesTable = new rawTableDataService(
        'topRulesTable',
        `${
          this.filters
        } sourcetype=wazuh rule.groups=syscheck |stats count sparkline by rule.id, rule.description | sort count DESC | head 5 | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,
        'topRulesTableToken',
        '$result$',
        this.scope
      )
      this.vizz.push(this.topRulesTable)

      this.topRulesTable.getSearch().on('result', result => {
        this.tableResults['Top rules'] = result
      })

      this.topUsersTable = new rawTableDataService(
        'topUsersTable',
        `${
          this.filters
        } sourcetype=wazuh syscheck.audit.effective_user.id=* | top syscheck.audit.effective_user.name limit=5 | rename syscheck.audit.effective_user.name as Username, count as Count, percent as Percent`,
        'topUsersTableToken',
        '$result$',
        this.scope
      )
      this.vizz.push(this.topUsersTable)

      this.topUsersTable.getSearch().on('result', result => {
        this.tableResults['Top users'] = result
      })

      this.scope.$on('deletedFilter', () => {
        this.launchSearches()
      })

      this.scope.$on('barFilter', () => {
        this.launchSearches()
      })

      /**
       * Generates report
       */
      this.scope.startVis2Png = () =>
        this.reportingService.startVis2Png(
          'overview-fim',
          'File integrity monitoring',
          this.filters,
          [
            'deletedFiles',
            'newFiles',
            'modifiedFiles',
            'alertsVolume',
            'eventsSummary',
            'topRules',
            'whodataUsage',
            'topUsers'
          ],
          {}, //Metrics
          this.tableResults
        )

      this.scope.$on('checkReportingStatus', () => {
        this.vizzReady = !this.vizz.filter(v => {
          return v.finish === false
        }).length
        if (this.vizzReady) {
          this.scope.loadingVizz = false
        } else {
          this.scope.loadingVizz = true
        }
        if (!this.scope.$$phase) this.scope.$digest()
      })

      /**
       * On controller destroy
       */
      this.scope.$on('$destroy', () => {
        this.timePicker.destroy()
        this.vizz.map(vizz => vizz.destroy())
      })

      this.scope.$on('loadingReporting', (event, data) => {
        this.scope.loadingReporting = data.status
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
