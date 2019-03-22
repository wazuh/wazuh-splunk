define([
  '../../module',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
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
  SearchHandler,
  RawTableDataService
) {
  'use strict'

  class OverviewGeneral {
    /**
     * Class Overview General
     * @param {*} $urlTokenModel
     * @param {*} $scope
     * @param {*} $currentDataService
     * @param {*} $state
     * @param {*} $notificationService
     * @param {*} $requestService
     * @param {Object} pollingState
     * @param {*} $reportingService
     * @param {*} $rootScope
     */
    constructor(
      $urlTokenModel,
      $scope,
      $currentDataService,
      $state,
      $notificationService,
      $requestService,
      pollingState,
      $reportingService,
      $rootScope,
      reportingEnabled
    ) {
      this.currentDataService = $currentDataService
      this.rootScope = $rootScope
      this.filters = this.currentDataService.getSerializedFilters()
      this.scope = $scope
      this.scope.reportingEnabled = reportingEnabled
      this.reportingService = $reportingService
      this.apiReq = $requestService.apiReq
      this.tableResults = {}
      this.timePicker = new TimePicker(
        '#timePicker',
        $urlTokenModel.handleValueChange
      )
      this.submittedTokenModel = $urlTokenModel.getSubmittedTokenModel()
      this.state = $state
      this.pollingEnabled =
        pollingState &&
        pollingState.data &&
        (pollingState.data.error || pollingState.data.disabled === 'true')
          ? false
          : true
      this.notification = $notificationService

      this.scope.$on('deletedFilter', () => {
        this.launchSearches()
      })

      this.scope.$on('barFilter', () => {
        this.launchSearches()
      })

      this.scope.expandArray = [false, false, false, false, false, false]
      this.scope.expand = (i, id) => this.expand(i, id)

      this.vizz = [
        /**
         * Metrics
         */
        new SearchHandler(
          `totalAlerts`,
          `${this.filters} | stats count`,
          `totalAlertsToken`,
          '$result.count$',
          'totalAlerts',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `searchLevel12`,
          `${this.filters} sourcetype=wazuh "rule.level">=12 | chart count`,
          `level12token`,
          '$result.count$',
          'levelTwelve',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `searchAuthFailure`,
          `${
            this.filters
          } sourcetype=wazuh "rule.groups{}"="authentication_fail*" | stats count`,
          `authFailureToken`,
          '$result.count$',
          'authFailure',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `searchAuthSuccess`,
          `${
            this.filters
          } sourcetype=wazuh  "rule.groups{}"="authentication_success" | stats count`,
          `authSuccessToken`,
          '$result.count$',
          'authSuccess',
          this.submittedTokenModel,
          this.scope
        ),
        /**
         * Visualizations
         */
        new LinearChart(
          'alertLevEvoVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.level=*| timechart count by rule.level`,
          'alertLevEvoVizz',
          this.scope
        ),
        new ColumnChart(
          'alertsVizz',
          `${this.filters} sourcetype=wazuh | timechart span=2h count`,
          'alertsVizz',
          this.scope
        ),
        new LinearChart(
          'alertsEvoTop10Agents',
          `${
            this.filters
          } sourcetype=wazuh | timechart span=1h limit=10 useother=f count by agent.name`,
          'alertsEvoTop10Agents',
          this.scope
        ),
        new PieChart(
          'top10ruleGroups',
          `${this.filters} sourcetype=wazuh | top rule.groups{} limit=10`,
          'top10ruleGroups',
          this.scope
        ),
        new Table(
          'agentsSummaryVizz',
          `${
            this.filters
          } sourcetype=wazuh |stats count sparkline by rule.id, rule.description, rule.level | sort rule.level DESC | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,
          'agentsSummaryVizz',
          this.scope
        ),
        (this.agentsSummaryTable = new RawTableDataService(
          'agentsSummaryTable',
          `${
            this.filters
          } sourcetype=wazuh |stats count sparkline by rule.id, rule.description, rule.level | sort rule.level DESC | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,
          'agentsSummaryTableToken',
          '$result$',
          this.scope,
          'Agents Summary'
        ))
      ]
    }

    /**
     * On controller loads
     */
    $onInit() {
      if (!this.pollingEnabled) {
        this.scope.wzMonitoringEnabled = false
        this.apiReq(`/agents/summary`)
          .then(data => {
            this.scope.agentsCountTotal = data.data.data.Total - 1
            this.scope.agentsCountActive = data.data.data.Active - 1
            this.scope.agentsCountDisconnected = data.data.data.Disconnected
            this.scope.agentsCountNeverConnected =
              data.data.data['Never connected']
            this.scope.agentsCoverity = this.scope.agentsCountTotal
              ? (this.scope.agentsCountActive / this.scope.agentsCountTotal) *
                100
              : 0
            if (!this.scope.$$phase) this.scope.$digest()
          })
          .catch(error => {
            this.notification.showErrorToast(
              `Cannot fetch agent status data: ${error}`
            )
          })
      } else {
        this.scope.wzMonitoringEnabled = true

        //Filters for agents Status
        this.clusOrMng = Object.keys(this.currentDataService.getFilters()[0])[0]
        if (this.clusOrMng == 'manager.name') {
          this.mngName = this.currentDataService.getFilters()[0]['manager.name']
          this.agentsStatusFilter = `manager.name=${
            this.mngName
          } index=wazuh-monitoring-3x`
        } else {
          this.clusName = this.currentDataService.getFilters()[0][
            'cluster.name'
          ]
          this.agentsStatusFilter = `cluster.name=${
            this.clusName
          } index=wazuh-monitoring-3x`
        }

        this.spanTime = '15m'
        this.vizz.push(
          new LinearChart(
            `agentStatusHistory`,
            `${this.agentsStatusFilter} status=* | timechart span=${
              this.spanTime
            } cont=FALSE count by status usenull=f`,
            `agentStatus`,
            this.scope
          )
        )
      }

      this.scope.startVis2Png = () =>
        this.reportingService.startVis2Png(
          'overview-general',
          'Security events',
          this.filters,
          [
            'alertLevEvoVizz',
            'alertsVizz',
            'alertsEvoTop10Agents',
            'top10ruleGroups',
            'agentsSummaryVizz'
          ],
          this.reportMetrics,
          this.tableResults
        )

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
    }

    /**
     * Get filters and launches the search
     */
    launchSearches() {
      this.filters = this.currentDataService.getSerializedFilters()
      this.state.reload()
    }

    /**
     * Set report metrics
     */
    setReportMetrics() {
      this.reportMetrics = {
        Alerts: this.scope.totalAlerts,
        'Level 12 or above alerts': this.scope.levelTwelve,
        'Authentication failure': this.scope.authFailure,
        'Authentication success': this.scope.authSuccess
      }
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

  app.controller('overviewGeneralCtrl', OverviewGeneral)
})
