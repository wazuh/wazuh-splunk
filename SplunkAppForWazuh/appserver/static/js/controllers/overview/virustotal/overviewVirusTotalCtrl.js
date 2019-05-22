//index=wazuh data.integration="virustotal"

define([
  '../../module',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/chart/bar-chart',
  '../../../services/rawTableData/rawTableDataService'
], function(
  app,
  ColumnChart,
  AreaChart,
  PieChart,
  Table,
  LinearChart,
  TimePicker,
  BarChart,
  RawTableDataService
) {
  'use strict'

  class OverviewVirusTotal {
    /**
     * Class Overview Virus Total
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
      //Add filer for VirusTotal
      $currentDataService.addFilter(
        `{"rule.groups{}":"virustotal", "implicit":true}`
      )
      this.getFilters = $currentDataService.getSerializedFilters
      this.filters = this.getFilters()
      this.submittedTokenModel = $urlTokenModel.getSubmittedTokenModel()
      this.timePicker = new TimePicker(
        '#timePicker',
        $urlTokenModel.handleValueChange
      )
      this.scope.expandArray = [false, false, false, false, false]
      this.scope.expand = (i, id) => this.expand(i, id)

      this.vizz = [
        /**
         * Visualizations
         */
        new ColumnChart(
          'top10AgentsPositive',
          `${
            this.filters
          }  | stats count(data.virustotal.positives) by agent.name | rename agent.name as "Agent name", count(data.virustotal.positives) as "Positives"`,
          'top10AgentsPositive',
          this.scope
        ),
        new PieChart(
          'top10AgentsNoPositive',
          `${this.filters} rule.id=87104 | top agent.name limit=5`,
          'top10AgentsNoPositive',
          this.scope
        ),
        new AreaChart(
          'maliciousEventsOverTimeElement',
          `${
            this.filters
          } data.virustotal.malicious="*" | timechart span=12h count by data.virustotal.malicious`,
          'maliciousEventsOverTimeElement',
          this.scope
        ),
        new PieChart(
          'lastScannedFiles',
          `${this.filters} | top limit=5 data.virustotal.source.file`,
          'lastScannedFiles',
          this.scope
        ),
        new Table(
          'top5Rules',
          `${
            this.filters
          } |stats count sparkline by rule.id, rule.description | sort count DESC | head 5 | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,
          'top5Rules',
          this.scope
        ),
        new Table(
          'MaliciousFilesPerAgent',
          `${
            this.filters
          }| stats count(data.virustotal.malicious) by agent.name,data.virustotal.source.md5 | rename agent.name as "Agent name", count(data.virustotal.malicious)  as Count, data.virustotal.source.md5 as md5`,
          'MaliciousFilesPerAgent',
          this.scope
        ),
        new RawTableDataService(
          'MaliciousFilesPerAgentTable',
          `${
            this.filters
          }| stats count(data.virustotal.malicious) by agent.name,data.virustotal.source.md5 | rename agent.name as "Agent name", count(data.virustotal.malicious)  as Count, data.virustotal.source.md5 as md5`,
          'MaliciousFilesPerAgentTableToken',
          '$result$',
          this.scope,
          'Unique malicious files per agent'
        ),
        new LinearChart(
          'eventsSummary',
          `${this.filters} | timechart count`,
          'eventsSummary',
          this.scope
        ),
        new BarChart(
          'alertsPerAgent',
          `${this.filters} | top agent.name`,
          'alertsPerAgent',
          this.scope
        ),
        new Table(
          'lastFiles',
          `${
            this.filters
          } | stats count by data.virustotal.source.file,data.virustotal.permalink | sort count DESC | rename  data.virustotal.source.file as File,data.virustotal.permalink as Link, count as Count`,
          'lastFiles',
          this.scope
        ),
        new RawTableDataService(
          'lastFilesTable',
          `${
            this.filters
          } | stats count by data.virustotal.source.file,data.virustotal.permalink as Count | sort count DESC | rename data.virustotal.source as File, data.virustotal.permalink as Link`,
          'lastFilesToken',
          '$result$',
          this.scope,
          'Last Files'
        ),
        new RawTableDataService(
          'top5RulesTable',
          `${
            this.filters
          } |stats count sparkline by rule.id, rule.description | sort count DESC | head 5 | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,
          'top5RulesTableToken',
          '$result$',
          this.scope,
          'Top 5 Rules'
        )
      ]
    }

    $onInit() {
      try {
        this.scope.loadingVizz = true
        /**
         * Generates report
         */
        this.scope.startVis2Png = () =>
          this.reportingService.startVis2Png(
            'overview-virustotal',
            'VirusTotal',
            this.filters,
            [
              'lastFiles',
              'maliciousEventsOverTimeElement',
              'MaliciousFilesPerAgent',
              'lastScannedFiles',
              'top10AgentsPositive',
              'eventsSummary',
              'top10AgentsNoPositive',
              'alertsPerAgent',
              'top5Rules'
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

        this.scope.$on('deletedFilter', event => {
          event.stopPropagation()
          this.launchSearches()
        })

        this.scope.$on('barFilter', event => {
          event.stopPropagation()
          this.launchSearches()
        })

        /**
         * On controller destroy
         */
        this.scope.$on('$destroy', () => {
          this.timePicker.destroy()
          this.vizz.map(vizz => vizz.destroy())
        })
      } catch (error) {} //eslint-disable-line
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
  app.controller('overviewVirusTotal', OverviewVirusTotal)
})
