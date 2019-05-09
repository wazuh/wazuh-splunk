define([
  '../../module',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/rawTableData/rawTableDataService'
], function(app, ColumnChart, PieChart, Table, LinearChart, TimePicker) {
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
      $reportingService,
      reportingEnabled,
      awsExtensionEnabled
    ) {
      this.scope = $scope
      this.scope.reportingEnabled = reportingEnabled
      this.scope.awsExtensionEnabled = awsExtensionEnabled
      this.state = $state
      this.reportingService = $reportingService
      $currentDataService.addFilter(
        `{"rule.groups{}":"syscheck", "implicit":true, "onlyShow":true}`
      )
      this.getFilters = $currentDataService.getSerializedFilters
      this.filters = this.getFilters()
      this.tableResults = {}
      this.submittedTokenModel = $urlTokenModel.getSubmittedTokenModel()
      this.timePicker = new TimePicker(
        '#timePicker',
        $urlTokenModel.handleValueChange
      )

      this.scope.expandArray = [false, false, false, false, false, false, false]
      this.scope.expand = (i, id) => this.expand(i, id)

      this.vizz = [
        /**
         * Visualizations
         */

        new LinearChart(
          'alertsByActionOverTime',
          `${
            this.filters
          } sourcetype=wazuh rule.groups{}=syscheck  | timechart count by syscheck.event`,
          'alertsByActionOverTime',
          this.scope
        ),
        new PieChart(
          'top5Agents',
          `${
            this.filters
          } sourcetype=wazuh rule.groups{}=syscheck  | top agent.name limit=5`,
          'top5Agents',
          this.scope
        ),
        new LinearChart(
          'eventsSummary',
          `${
            this.filters
          } sourcetype=wazuh rule.groups{}=syscheck  | timechart count`,
          'eventsSummary',
          this.scope
        ),
        new PieChart(
          'ruleDistribution',
          `${
            this.filters
          } sourcetype=wazuh rule.groups{}=syscheck  | top limit=5 rule.description`,
          'ruleDistribution',
          this.scope
        ),
        new PieChart(
          'topActions',
          `${
            this.filters
          } sourcetype=wazuh rule.groups{}=syscheck  | top limit=5 syscheck.event`,
          'topActions',
          this.scope
        ),
        new Table(
          'topUsers',
          `${
            this.filters
          } sourcetype=wazuh rule.groups{}=syscheck  | top limit=5 agent.id,agent.name,syscheck.uname_after | rename agent.id as "Agent ID", agent.name as "Agent name", syscheck.uname_after as "Top User", count as "Count"`,
          'topUsers',
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

        /**
         * Generates report
         */
        this.scope.startVis2Png = () =>
          this.reportingService.startVis2Png(
            'overview-fim',
            'File integrity monitoring',
            this.filters,
            [
              'alertsByActionOverTime',
              'top5Agents',
              'eventsSummary',
              'ruleDistribution',
              'topActions',
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

        this.scope.$on('loadingReporting', (event, data) => {
          this.scope.loadingReporting = data.status
        })
      } catch (error) {
        console.error('error on init ', error)
      }
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
  app.controller('overviewFimCtrl', OverviewFIM)
})
