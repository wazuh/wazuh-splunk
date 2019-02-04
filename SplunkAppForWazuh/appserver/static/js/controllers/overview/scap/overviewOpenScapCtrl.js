define([
  '../../module',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/inputs/dropdown-input',
  '../../../services/visualizations/search/search-handler',
  '../../../services/rawTableData/rawTableDataService'
], function(
  app,
  LinearChart,
  ColumnChart,
  PieChart,
  AreaChart,
  Table,
  TimePicker,
  Dropdown,
  SearchHandler,
  RawTableDataService
) {
  'use strict'

  class OpenSCAP {
    /**
     * OpenSCAP class
     * @param {*} $urlTokenModel
     * @param {*} $scope
     * @param {*} $currentDataService
     * @param {*} $state
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
      this.tableResults = {}
      this.currentDataService = $currentDataService
      this.currentDataService.addFilter(
        `{"rule.groups":"oscap", "implicit":true}`
      )
      this.getFilters = this.currentDataService.getSerializedFilters
      this.filters = this.getFilters()
      this.submittedTokenModel = $urlTokenModel.getSubmittedTokenModel()
      this.scope.$on('deletedFilter', () => {
        this.launchSearches()
      })

      this.scope.$on('barFilter', () => {
        this.launchSearches()
      })

      this.scope.$on('$destroy', () => {
        this.timePicker.destroy()
        this.dropdown.destroy()
        this.vizz.map(vizz => vizz.destroy())
      })
      this.timePicker = new TimePicker(
        '#timePicker',
        $urlTokenModel.handleValueChange
      )
      this.dropdown = new Dropdown(
        'dropDownInput',
        `${
          this.filters
        } sourcetype=wazuh  rule.groups="oscap" rule.groups!="syslog" oscap.scan.profile.title=* | stats count by oscap.scan.profile.title | sort oscap.scan.profile.title ASC|fields - count`,
        'oscap.scan.profile.title',
        '$form.profile$',
        'dropDownInput',
        this.scope
      )
      this.vizz = [
        /**
         * Metrics
         */
        new SearchHandler(
          `lastScapScore`,
          `${
            this.filters
          } sourcetype=wazuh oscap.scan.score=* | stats latest(oscap.scan.score)`,
          `latestScapScore`,
          '$result.latest(oscap.scan.score)$',
          'scapLastScore',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `maxScapScore`,
          `${
            this.filters
          } sourcetype=wazuh oscap.scan.score=* | stats max(oscap.scan.score)`,
          `maxScapScore`,
          '$result.max(oscap.scan.score)$',
          'scapHighestScore',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `scapLowest`,
          `${
            this.filters
          } sourcetype=wazuh oscap.scan.score=* | stats min(oscap.scan.score)`,
          `minScapScore`,
          '$result.min(oscap.scan.score)$',
          'scapLowestScore',
          this.submittedTokenModel,
          this.scope
        ),

        /**
         * Visualizations
         */
        new PieChart(
          'agentsVizz',
          `${
            this.filters
          } sourcetype=wazuh oscap.check.result="fail" rule.groups="oscap" rule.groups!="syslog" oscap.scan.profile.title="$profile$" | top agent.name`,
          'agentsVizz',
          this.scope
        ),
        new LinearChart(
          'profilesVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.level=*| timechart count by rule.level`,
          'profilesVizz',
          this.scope
        ),
        new ColumnChart(
          'contentVizz',
          `${this.filters} sourcetype=wazuh | timechart span=2h count`,
          'contentVizz',
          this.scope
        ),
        new PieChart(
          'severityVizz',
          `${this.filters} sourcetype=wazuh | top agent.name`,
          'severityVizz',
          this.scope
        ),
        new AreaChart(
          'top5AgentsVizz',
          `${
            this.filters
          } sourcetype=wazuh | timechart span=1h limit=5 useother=f count by agent.name`,
          'top5AgentsVizz',
          this.scope
        ),
        new PieChart(
          'top10AlertsVizz',
          `${
            this.filters
          } sourcetype=wazuh oscap.check.result="fail" rule.groups="oscap" rule.groups="oscap-result" oscap.scan.profile.title="$profile$" | top oscap.check.title`,
          'top10AlertsVizz',
          this.scope
        ),
        new PieChart(
          'top10HRisk',
          `${
            this.filters
          } sourcetype=wazuh oscap.check.result="fail" rule.groups="oscap" rule.groups="oscap-result"  oscap.check.severity="high" oscap.scan.profile.title="$profile$" | top oscap.check.title`,
          'top10HRisk',
          this.scope
        ),
        new Table(
          'alertsSummaryVizz',
          `${
            this.filters
          } sourcetype=wazuh |stats count sparkline by rule.id, rule.description, rule.level | sort rule.level DESC | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,
          'alertsSummaryVizz',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryTable',
          `${
            this.filters
          } sourcetype=wazuh |stats count sparkline by rule.id, rule.description, rule.level | sort rule.level DESC | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,
          'alertsSummaryTableToken',
          '$result$',
          this.scope,
          'Alerts Summary'
        )
      ]

      /**
       * Generates report
       */
      this.scope.startVis2Png = () =>
        this.reportingService.startVis2Png(
          'overview-oscap',
          'Open SCAP',
          this.filters,
          [
            'agentsVizz',
            'profilesVizz',
            'contentVizz',
            'severityVizz',
            'top5AgentsVizz',
            'top10AlertsVizz',
            'top10HRisk',
            'alertsSummaryVizz'
          ],
          this.reportMetrics,
          this.tableResults
        )

      this.scope.$on('loadingReporting', (event, data) => {
        this.scope.loadingReporting = data.status
      })

      this.scope.$on('checkReportingStatus', () => {
        this.vizzReady = !this.vizz.filter(v => {
          return v.finish === false
        }).length
        if (this.vizzReady) {
          this.scope.loadingVizz = false
          this.setReportMetrics()
        } else {
          this.vizz.map(v => {
            if (v.constructor.name === 'RawTableData') {
              this.tableResults[v.name] = v.results
            }
          })
          this.scope.loadingVizz = true
        }
        if (!this.scope.$$phase) this.scope.$digest()
      })

      this.dropdownInstance = this.dropdown.getElement()
      this.dropdownInstance.on('change', newValue => {
        if (newValue && this.dropdownInstance)
          $urlTokenModel.handleValueChange(this.dropdownInstance)
      })
    }

    /**
     * Set report metrics
     */
    setReportMetrics() {
      this.reportMetrics = {
        'Last score': this.scope.scapLastScore,
        'Highest score': this.scope.scapHighestScore,
        'Lowest score': this.scope.scapLowestScore
      }
    }

    /**
     * Get filters and launches the search
     */
    launchSearches() {
      this.filters = this.getFilters()
      this.state.reload()
    }
  }
  app.controller('overviewOpenScapCtrl', OpenSCAP)
})
