define([
  '../../module',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/rawTableData/rawTableDataService'
], function(
  app,
  PieChart,
  AreaChart,
  ColumnChart,
  Table,
  TimePicker,
  rawTableDataService
) {
  'use strict'

  class AWS {
    /**
     * Class constructor
     * @param {*} $rootScope
     * @param {*} $scope
     * @param {*} $currentDataService
     * @param {*} $state
     * @param {*} $notificationService
     * @param {*} $reportingService
     */
    constructor(
      $urlTokenModel,
      $scope,
      $currentDataService,
      $state,
      $notificationService,
      $reportingService
    ) {
      this.scope = $scope
      this.urlTokenModel = $urlTokenModel
      this.state = $state
      this.toast = $notificationService.showSimpleToast
      this.reportingService = $reportingService
      this.currentDataService = $currentDataService
      this.tableResults = {}
      this.currentDataService.addFilter(
        `{"rule.groups":"amazon", "implicit":true}`
      )
      this.getFilters = this.currentDataService.getSerializedFilters
      this.filters = this.getFilters()
      this.submittedTokenModel = this.urlTokenModel.getSubmittedTokenModel()
      this.timePicker = new TimePicker(
        '#timePicker',
        this.urlTokenModel.handleValueChange
      )

      this.vizz = [
        /**
         * Visualizations
         */
        new AreaChart(
          'eventsBySourceVizz',
          `${
            this.filters
          } sourcetype=wazuh | timechart count by data.aws.source usenull=f`,
          'eventsBySourceVizz',
          this.scope
        ),
        new ColumnChart(
          'eventsByS3BucketsVizz',
          `${
            this.filters
          } sourcetype=wazuh | timechart count by data.aws.log_info.s3bucket usenull=f`,
          'eventsByS3BucketsVizz',
          this.scope
        ),
        new PieChart(
          'sourcesVizz',
          `${this.filters} sourcetype=wazuh | stats count BY data.aws.source`,
          'sourcesVizz',
          this.scope
        ),
        new PieChart(
          'accountsVizz',
          `${
            this.filters
          } sourcetype=wazuh | top data.aws.responseElements.instancesSet.items.instanceId`,
          'accountsVizz',
          this.scope
        ),
        new PieChart(
          's3BucketsVizz',
          `${
            this.filters
          } sourcetype=wazuh | stats count by data.aws.log_info.s3bucket`,
          's3BucketsVizz',
          this.scope
        ),
        new PieChart(
          'regionsVizz',
          `${this.filters} sourcetype=wazuh | top data.aws.awsRegion`,
          'regionsVizz',
          this.scope
        ),
        new Table(
          'top5Buckets',
          `${this.filters} sourcetype=wazuh | top data.aws.source limit=5 | rename data.aws.source as Source, count as Count, percent as Percent`,
          'top5Buckets',
          this.scope
        ),
        new Table(
          'top5Rules',
          `${
            this.filters
          } sourcetype=wazuh | top rule.id, rule.description limit=5 | rename rule.id as "Rule ID", rule.description as "Rule description", count as Count, percent as Percent`,
          'top5Rules',
          this.scope
        )
      ]

      this.top5BucketsTable = new rawTableDataService(
        'top5BucketsTable',
        `${this.filters} sourcetype=wazuh | top data.aws.source limit=5 | rename data.aws.source as Source, count as Count, percent as Percent`,
        'top5BucketsTableToken',
        '$result$',
        this.scope
      )
      this.vizz.push(this.top5BucketsTable)

      this.top5BucketsTable.getSearch().on('result', result => {
        this.tableResults['Top 5 buckets'] = result
      })

      this.top5RulesTable = new rawTableDataService(
        'top5RulesTable',
        `${
          this.filters
        } sourcetype=wazuh | top rule.id, rule.description limit=5 | rename rule.id as "Rule ID", rule.description as "Rule description", count as Count, percent as Percent`,
        'top5RulesTableToken',
        '$result$',
        this.scope
      )
      this.vizz.push(this.top5RulesTable)

      this.top5RulesTable.getSearch().on('result', result => {
        this.tableResults['Top 5 rules'] = result
      })

      this.scope.$on('deletedFilter', () => {
        this.launchSearches()
      })

      this.scope.$on('barFilter', () => {
        this.launchSearches()
      })

      this.scope.startVis2Png = () =>
        this.reportingService.startVis2Png(
          'overview-aws',
          'AWS',
          this.filters,
          [
            'sourcesVizz',
            'accountsVizz',
            's3BucketsVizz',
            'regionsVizz',
            'eventsBySourceVizz',
            'eventsByS3BucketsVizz',
            'top5Buckets',
            'top5Rules'
          ],
          {}, //Metrics
          this.tableResults
        )

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
    }

    /**
     * Gets filters and launches search
     */
    launchSearches() {
      this.filters = this.getFilters()
      this.state.reload()
    }
  }

  app.controller('awsCtrl', AWS)
})
