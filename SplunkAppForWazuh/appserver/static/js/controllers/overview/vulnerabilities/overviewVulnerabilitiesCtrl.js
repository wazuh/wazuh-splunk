define([
  '../../module',
  '../../../services/visualizations/chart/bar-chart',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/search/search-handler',
  '../../../services/rawTableData/rawTableDataService'
], function(
  app,
  BarChart,
  ColumnChart,
  PieChart,
  AreaChart,
  Table,
  TimePicker,
  SearchHandler,
  RawTableDataService
) {
  'use strict'
  class OverviewVulnerabilities {
    /**
     *
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
      $reportingService,
      reportingEnabled,
      extensions
    ) {
      this.scope = $scope
      this.scope.reportingEnabled = reportingEnabled
      this.scope.extensions = extensions
      this.state = $state
      this.reportingService = $reportingService
      this.tableResults = {}
      this.timePicker = new TimePicker(
        '#timePicker',
        $urlTokenModel.handleValueChange
      )
      this.submittedTokenModel = $urlTokenModel.getSubmittedTokenModel()
      $currentDataService.addFilter(
        `{"rule.groups{}":"vulnerability-detector", "implicit":true, "onlyShow":true}`
      )
      this.getFilters = $currentDataService.getSerializedFilters
      this.filters = this.getFilters()

      this.scope.$on('deletedFilter', event => {
        event.stopPropagation()
        this.launchSearches()
      })

      this.scope.$on('barFilter', event => {
        event.stopPropagation()
        this.launchSearches()
      })

      this.scope.expandArray = [false, false, false, false, false, false]
      this.scope.expand = (i, id) => this.expand(i, id)

      this.vizz = [
        /**
         * Metrics
         */
        new SearchHandler(
          `criticalSeveritySearch`,
          `${this.filters} data.vulnerability.severity=critical | stats count`,
          `criticalSeverityToken`,
          `$result.count$`,
          `criticalSeverity`,
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `highSeveritySeach`,
          `${this.filters} data.vulnerability.severity=high | stats count`,
          `highSeverityToken`,
          `$result.count$`,
          `highSeverity`,
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `mediumSeveritySeach`,
          `${this.filters} data.vulnerability.severity=medium | stats count`,
          `mediumSeverityToken`,
          `$result.count$`,
          `mediumSeverity`,
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lowSeveritySeach`,
          `${this.filters} data.vulnerability.severity=low | stats count`,
          `lowSeverityToken`,
          `$result.count$`,
          `lowSeverity`,
          this.submittedTokenModel,
          this.scope
        ),
        /**
         * Visualizations
         */
        new PieChart(
          'affectedAgents',
          `${
            this.filters
          } rule.groups{}=vulnerability-detector | top agent.name limit=5`,
          'affectedAgents',
          this.scope
        ),
        new AreaChart(
          'alertsEvolution',
          `${
            this.filters
          } rule.groups{}=vulnerability-detector data.vulnerability.severity=* | timechart count by data.vulnerability.severity`,
          'alertsEvolution',
          this.scope
        ),
        new ColumnChart(
          'severityDist',
          `${
            this.filters
          } data.vulnerability.severity=*  | spath "agent.name"  | search "agent.name"=*   | rename agent.id AS RootObject.agent.id agent.ip AS RootObject.agent.ip agent.name AS RootObject.agent.name data.vulnerability.cve AS RootObject.data.vulnerability.cve data.vulnerability.package.condition AS RootObject.data.vulnerability.package.condition data.vulnerability.package.name AS RootObject.data.vulnerability.package.name data.vulnerability.package.version AS RootObject.data.vulnerability.package.version data.vulnerability.published AS RootObject.data.vulnerability.published data.vulnerability.reference AS RootObject.data.vulnerability.reference data.vulnerability.severity AS RootObject.data.vulnerability.severity data.vulnerability.state AS RootObject.data.vulnerability.state data.vulnerability.title AS RootObject.data.vulnerability.title data.vulnerability.updated AS RootObject.data.vulnerability.updated date_hour AS RootObject.date_hour date_mday AS RootObject.date_mday date_minute AS RootObject.date_minute date_month AS RootObject.date_month date_second AS RootObject.date_second date_wday AS RootObject.date_wday date_year AS RootObject.date_year date_zone AS RootObject.date_zone decoder.name AS RootObject.decoder.name id AS RootObject.id index AS RootObject.index linecount AS RootObject.linecount location AS RootObject.location manager.name AS RootObject.manager.name rule.description AS RootObject.rule.description rule.firedtimes AS RootObject.rule.firedtimes "rule.gdpr{}" AS "RootObject.rule.gdpr{}" rule.groups{} AS RootObject.rule.groups{} "rule.groups{}{}" AS "RootObject.rule.groups{}{}" rule.id AS RootObject.rule.id rule.level AS RootObject.rule.level rule.mail AS RootObject.rule.mail splunk_server AS RootObject.splunk_server timeendpos AS RootObject.timeendpos timestamp AS RootObject.timestamp timestartpos AS RootObject.timestartpos | fields "_time" "host" "source" "sourcetype" "RootObject.agent.id" "RootObject.agent.ip" "RootObject.agent.name" "RootObject.data.vulnerability.cve" "RootObject.data.vulnerability.package.condition" "RootObject.data.vulnerability.package.name" "RootObject.data.vulnerability.package.version" "RootObject.data.vulnerability.published" "RootObject.data.vulnerability.reference" "RootObject.data.vulnerability.severity" "RootObject.data.vulnerability.state" "RootObject.data.vulnerability.title" "RootObject.data.vulnerability.updated" "RootObject.date_hour" "RootObject.date_mday" "RootObject.date_minute" "RootObject.date_month" "RootObject.date_second" "RootObject.date_wday" "RootObject.date_year" "RootObject.date_zone" "RootObject.decoder.name" "RootObject.id" "RootObject.index" "RootObject.linecount" "RootObject.location" "RootObject.manager.name" "RootObject.rule.description" "RootObject.rule.firedtimes" ""RootObject.rule.gdpr{}"" "RootObject.rule.groups{}" ""RootObject.rule.groups{}{}"" "RootObject.rule.id" "RootObject.rule.level" "RootObject.rule.mail" "RootObject.splunk_server" "RootObject.timeendpos" "RootObject.timestamp" "RootObject.timestartpos" | eval "RootObject.data.vulnerability.severity"='RootObject.data.vulnerability.severity', "agent.name"='RootObject.agent.name' | chart dedup_splitvals=t limit=100 useother=t count AS "Count of 1532686833.50"  by agent.name RootObject.data.vulnerability.severity format=$$VAL$$:::$$AGG$$ | sort limit=100 RootObject.agent.name | fields - _span  | fields agent.name *`,
          'severityDist',
          this.scope
        ),
        new PieChart(
          'commonAffectedPackages',
          `${this.filters} | top 5 data.vulnerability.package.name`,
          'commonAffectedPackages',
          this.scope
        ),
        new BarChart(
          'commonCves',
          `${
            this.filters
          } rule.groups{}=vulnerability-detector | top data.vulnerability.cve limit=5`,
          'commonCves',
          this.scope
        ),
        new Table(
          'alertsSummary',
          `${
            this.filters
          } | stats count sparkline by data.vulnerability.title, data.vulnerability.severity, data.vulnerability.reference | sort count DESC  | rename data.vulnerability.title as Title, data.vulnerability.severity as Severity, data.vulnerability.reference as Reference, count as Count, sparkline as Sparkline`,
          'alertsSummary',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryTable',
          `${
            this.filters
          } | stats count sparkline by data.vulnerability.title, data.vulnerability.severity | sort count DESC  | rename data.vulnerability.title as Title, data.vulnerability.severity as Severity, count as Count, sparkline as Sparkline`,
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
          'overview-vulnerabilities',
          'Vulnerabilities',
          this.filters,
          [
            'affectedAgents',
            'alertsEvolution',
            'severityDist',
            'commonAffectedPackages',
            'commonCves',
            'alertsSummary'
          ],
          {}, //Metrics
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

    expand(i, id) {
      this.scope.expandArray[i] = !this.scope.expandArray[i]
      let vis = $(
        '#' + id + ' .panel-body .splunk-view .shared-reportvisualizer'
      )
      this.scope.expandArray[i]
        ? vis.css('height', 'calc(100vh - 200px)')
        : vis.css('height', '250px')

      let vis_header = $('.wz-headline-title')
      vis_header.dblclick(e => {
        if (this.scope.expandArray[i]) {
          this.scope.expandArray[i] = !this.scope.expandArray[i]
          this.scope.expandArray[i]
            ? vis.css('height', 'calc(100vh - 200px)')
            : vis.css('height', '250px')
          this.scope.$applyAsync()
        } else {
          e.preventDefault()
        }
      })
    }
  }
  app.controller('overviewVulnerabilitiesCtrl', OverviewVulnerabilities)
})
