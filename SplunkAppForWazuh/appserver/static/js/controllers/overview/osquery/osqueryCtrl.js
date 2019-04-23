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
      $reportingService,
      reportingEnabled,
      extensions
    ) {
      this.scope = $scope
      this.scope.reportingEnabled = reportingEnabled
      this.scope.extensions = extensions
      this.osquery = osquery
      this.state = $state
      this.currentDataService = $currentDataService
      this.reportingService = $reportingService
      this.tableResults = {}
      this.currentDataService.addFilter(
        `{"rule.groups{}":"osquery", "implicit":true}`
      )
      this.getFilters = this.currentDataService.getSerializedFilters
      this.filters = this.getFilters()
      this.scope.osqueryWodle = false
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
        /**
         * Visualizations
         */
        new AreaChart(
          'alertsPacksOverTime',
          `${
            this.filters
          } sourcetype=wazuh | timechart span=1h count by data.osquery.pack`,
          'alertsPacksOverTime',
          this.scope
        ),
        new PieChart(
          'topOsqueryAdded',
          `${this.filters} sourcetype=wazuh data.osquery.action="added"  | top data.osquery.name limit=5`,
          'topOsqueryAdded',
          this.scope
        ),
        new PieChart(
          'topOsqueryRemoved',
          `${this.filters} sourcetype=wazuh data.osquery.action="removed"  | top data.osquery.name limit=5`,
          'topOsqueryRemoved',
          this.scope
        ),
        new PieChart(
          'mostCommonPacks',
          `${this.filters} sourcetype=wazuh  | top data.osquery.pack limit=5`,
          'mostCommonPacks',
          this.scope
        ),
        new Table(
          'alertsSummary',
          `${
            this.filters
          } sourcetype=wazuh  | stats count by data.osquery.name, data.osquery.action,agent.name,data.osquery.pack | rename data.osquery.name as Name, data.osquery.action as Action, agent.name as Agent, data.osquery.pack as Pack, count as Count`,
          'alertsSummary',
          this.scope
        ),
        new Table(
          'alertsSummaryTable',
          `${
            this.filters
          } sourcetype=wazuh  | stats count by data.osquery.name, data.osquery.action,agent.name,data.osquery.pack | rename data.osquery.name as Name, data.osquery.action as Action, agent.name as Agent, data.osquery.pack as Pack, count as Count`,
          'alertsSummaryTableToken',
          '$result$',
          this.scope,
          'Alerts summary'
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
            'alertsPacksOverTime',
            'topOsqueryAdded',
            'topOsqueryRemoved',
            'mostCommonPacks',
            'alertsEvolution',
            'alertsSummary',
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

  app.controller('osqueryCtrl', Osquery)
})
