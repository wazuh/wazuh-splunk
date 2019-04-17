define([
  '../../module',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/rawTableData/rawTableDataService'
], function(
  app,
  PieChart,
  LinearChart,
  Table,
  TimePicker,
  RawTableDataService
) {
  'use strict'

  class Docker {
    /**
     * Class Docker
     * @param {*} $urlTokenModel
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
      reportingEnabled,
      extensions
    ) {
      this.scope = $scope
      this.scope.reportingEnabled = reportingEnabled
      this.scope.extensions = extensions
      this.state = $state
      this.currentDataService = $currentDataService
      this.reportingService = $reportingService
      this.tableResults = {}
      this.currentDataService.addFilter(
        `{"rule.groups{}":"docker", "implicit":true}`
      )
      this.getFilters = this.currentDataService.getSerializedFilters
      this.filters = this.getFilters()
      this.scope.$on('deletedFilter', event => {
        event.stopPropagation()
        this.launchSearches()
      })

      this.scope.$on('barFilter', event => {
        event.stopPropagation()
        this.launchSearches()
      })

      this.scope.expandArray = [false, false, false, false]
      this.scope.expand = (i, id) => this.expand(i, id)

      this.timePicker = new TimePicker(
        '#timePicker',
        $urlTokenModel.handleValueChange
      )
      this.notification = $notificationService
      this.vizz = [
        //`${this.filters} sourcetype=wazuh | timechart span=1h count`,
        /**
         * Visualizations
         */
        new PieChart(
          'top5images',
          `${this.filters} sourcetype=wazuh | stats count by data.docker.id`,
          'top5images',
          this.scope
        ),
        new LinearChart(
          'eventsOcurred',
          `${
            this.filters
          } sourcetype=wazuh | timechart span=1h count by data.docker.Action`,
          'eventsOcurred',
          this.scope
        ),
        new PieChart(
          'top5actions',
          `${this.filters} sourcetype=wazuh  | top data.docker.Action limit=5`,
          'top5actions',
          this.scope
        ),
        new Table(
          'alertsSummary',
          `${
            this.filters
          } sourcetype=wazuh  | stats count sparkline by data.docker.Actor.Attributes.image, data.docker.Actor.Attributes.name, data.docker.Action, timestamp | sort count DESC | rename data.docker.Actor.Attributes.image as Image, data.docker.Actor.Attributes.name as Container, data.docker.Action as Action, timestamp as Date, count as Count, sparkline as Sparkline`,
          'alertsSummary',
          this.scope
        ),
        new LinearChart(
          'resourceUsage',
          `${
            this.filters
          } sourcetype=wazuh  | timechart span=1h count by data.docker.Type`,
          'resourceUsage',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryRawTable',
          `${
            this.filters
          } sourcetype=wazuh  | stats count sparkline by data.docker.Actor.Attributes.image, data.docker.Actor.Attributes.name, data.docker.Action, timestamp | sort count DESC | rename data.docker.Actor.Attributes.image as Image, data.docker.Actor.Attributes.name as Container, data.docker.Action as Action, timestamp as Date, count as Count`,
          'alertsSummaryRawTableToken',
          '$result$',
          this.scope,
          'Alerts summary'
        )
      ]

      /**
       * Generates report
       */
      this.scope.startVis2Png = () =>
        this.reportingService.startVis2Png(
          'ow-docker',
          'Docker',
          this.filters,
          ['top5images', 'eventsOcurred', 'top5actions', 'resourceUsage'],
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
     * On controller loads
     */
    $onInit() {}

    /**
     * Get filters and launches search
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

  app.controller('dockerCtrl', Docker)
})
