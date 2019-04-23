define([
  '../../module',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/map/map',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/rawTableData/rawTableDataService'
], function (
  app,
  PieChart,
  AreaChart,
  ColumnChart,
  Table,
  Map,
  TimePicker,
  RawTableDataService
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
        $reportingService,
        reportingEnabled
      ) {
        this.scope = $scope
        this.scope.reportingEnabled = reportingEnabled
        this.urlTokenModel = $urlTokenModel
        this.state = $state
        this.notification = $notificationService
        this.reportingService = $reportingService
        this.currentDataService = $currentDataService
        this.tableResults = {}
        this.currentDataService.addFilter(
          `{"rule.groups{}":"amazon", "implicit":true}`
        )
        this.getFilters = this.currentDataService.getSerializedFilters
        this.filters = this.getFilters()
        this.submittedTokenModel = this.urlTokenModel.getSubmittedTokenModel()
        this.timePicker = new TimePicker(
          '#timePicker',
          this.urlTokenModel.handleValueChange
        )
        this.scope.expandArray = [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        ]
        this.scope.expand = (i, id) => this.expand(i, id)

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
            `${
            this.filters
            } sourcetype=wazuh | top data.aws.source limit=5 | rename data.aws.source as Source, count as Count, percent as Percent`,
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
          ),
          new RawTableDataService(
            'top5BucketsTable',
            `${
            this.filters
            } sourcetype=wazuh | top data.aws.source limit=5 | rename data.aws.source as Source, count as Count, percent as Percent`,
            'top5BucketsTableToken',
            '$result$',
            this.scope,
            'Top 5 buckets'
          ),
          new RawTableDataService(
            'top5RulesTable',
            `${
            this.filters
            } sourcetype=wazuh | top rule.id, rule.description limit=5 | rename rule.id as "Rule ID", rule.description as "Rule description", count as Count, percent as Percent`,
            'top5RulesTableToken',
            '$result$',
            this.scope,
            'Top 5 Rules'
          ),
          new Map(
            'map',
            `${
            this.filters
            } sourcetype=wazuh | stats count by data.aws.service.action.portProbeAction.portProbeDetails.remoteIpDetails.geoLocation.lat, data.aws.service.action.portProbeAction.portProbeDetails.remoteIpDetails.geoLocation.lon | rename data.aws.service.action.portProbeAction.portProbeDetails.remoteIpDetails.geoLocation.lon as "lon" | rename data.aws.service.action.portProbeAction.portProbeDetails.remoteIpDetails.geoLocation.lat as "lat" | geostats count`,
            'map',
            this.scope
          )
        ]
      }

      $onInit() {
        try {

          this.scope.loadingVizz = true
          this.scope.$on('deletedFilter', event => {
            event.stopPropagation()
            this.launchSearches()
          })

          this.scope.$on('barFilter', event => {
            event.stopPropagation()
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
                'map',
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
              this.vizz.map(v => {
                if (v.constructor.name === 'RawTableData') {
                  this.tableResults[v.name] = v.results
                }
              })
              this.scope.loadingVizz = true
            }
            if (!this.scope.$$phase) this.scope.$digest()
          })
        } catch (error) {
          console.error('error on init ', error)
        }
      }

      /**
       * Gets filters and launches search
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

    app.controller('awsCtrl', AWS)
  })
