define([
  '../../module',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/rawTableData/rawTableDataService'
], function(app, PieChart, AreaChart, Table, TimePicker, RawTableDataService) {
  'use strict'

  class Osquery {
    /**
     * Class Osquery
     * @param {*} $urlTokenModel
     * @param {*} $scope
     * @param {*} $currentDataService
     * @param {*} $state
     * @param {*} $notificationService
     * @param {*} osquery
     * @param {*} $reportingService
     */
    constructor(
      $urlTokenModel,
      $scope,
      $currentDataService,
      $state,
      $notificationService,
      osquery,
      $reportingService
    ) {
      this.scope = $scope
      this.osquery = osquery
      this.state = $state
      this.currentDataService = $currentDataService
      this.reportingService = $reportingService
      this.tableResults = {}
      this.currentDataService.addFilter(
        `{"rule.groups":"osquery", "implicit":true}`
      )
      this.getFilters = this.currentDataService.getSerializedFilters
      this.filters = this.getFilters()
      this.scope.osqueryWodle = false
      this.scope.$on('deletedFilter', () => {
        this.launchSearches()
      })

      this.scope.$on('barFilter', () => {
        this.launchSearches()
      })

      this.scope.expandArray = [false,false,false,false]
      this.scope.expand = (i,id) => this.expand(i,id);


      this.timePicker = new TimePicker(
        '#timePicker',
        $urlTokenModel.handleValueChange
      )
      this.notification = $notificationService
      this.vizz = [
        /**
         * Visualizations
         */
        new AreaChart(
          'alertsOverTime',
          `${this.filters} sourcetype=wazuh | timechart span=1h count`,
          'alertsOverTime',
          this.scope
        ),
        new AreaChart(
          'alertsEvolution',
          `${
            this.filters
          } sourcetype=wazuh | timechart span=1h limit=5 useother=f count by agent.name`,
          'alertsEvolution',
          this.scope
        ),
        new PieChart(
          'mostCommonEvents',
          `${this.filters} sourcetype=wazuh  | top data.osquery.name limit=5`,
          'mostCommonEvents',
          this.scope
        ),
        new Table(
          'topPacks',
          `${
            this.filters
          } sourcetype=wazuh  | top "data.osquery.pack" limit=5 | rename data.osquery.pack as Pack, count as Count, percent as Percent`,
          'topPacks',
          this.scope
        ),
        new Table(
          'topRules',
          `${
            this.filters
          } sourcetype=wazuh  | top rule.id, rule.description limit=5 | rename rule.id as "Rule ID", rule.description as "Rule description", count as Count, percent as Percent`,
          'topRules',
          this.scope
        ),
        new RawTableDataService(
          'topRulesTable',
          `${
            this.filters
          } sourcetype=wazuh  | top rule.id, rule.description limit=5 | rename rule.id as "Rule ID", rule.description as "Rule description", count as Count, percent as Percent`,
          'topRulesTableToken',
          '$result$',
          this.scope,
          'Top 5 Rules'
        ),
        new RawTableDataService(
          'topPacksTable',
          `${
            this.filters
          } sourcetype=wazuh  | top "data.osquery.pack" limit=5 | rename data.osquery.pack as Pack, count as Count, percent as Percent`,
          'topPacksTableToken',
          '$result$',
          this.scope,
          'Top 5 Packs'
        )
      ]

      /**
       * Generates report
       */
      this.scope.startVis2Png = () =>
        this.reportingService.startVis2Png(
          'ow-osquery',
          'Osquery',
          this.filters,
          [
            'alertsOverTime',
            'mostCommonEvents',
            'alertsEvolution',
            'topPacks',
            'topRules'
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
            if (v.constructor.name === 'RawTableData'){
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
    $onInit() {
      try {
        const wodles = this.osquery.data.data.wmodules
        this.scope.osqueryWodle = wodles.filter(item => item.osquery)[0].osquery
      } catch (err) {
        this.notification.showErrorToast(
          'Cannot load wodle configuration. Osquery is not configured.'
        )
      }
    }

    /**
     * Get filters and launches search
     */
    launchSearches() {
      this.filters = this.getFilters()
      this.state.reload()
    }


    expand(i, id) {
      this.scope.expandArray[i] = !this.scope.expandArray[i];
      let vis = $('#' + id + ' .panel-body .splunk-view .shared-reportvisualizer')
      this.scope.expandArray[i] ? vis.css('height', 'calc(100vh - 200px)') : vis.css('height', '250px')
    }

  }

  app.controller('osqueryCtrl', Osquery)
})
