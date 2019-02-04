define([
  '../../module',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/chart/bar-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/rawTableData/rawTableDataService'
], function(app, PieChart, AreaChart, BarChart, Table, TimePicker) {
  'use strict'

  class Osquery {
    /**
     * Class Osquery
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
      $reportingService
    ) {
      this.scope = $scope
      this.state = $state
      this.currentDataService = $currentDataService
      this.reportingService = $reportingService
      this.tableResults = {}
      this.currentDataService.addFilter(
        `{"rule.groups":"ids", "implicit":true}`
      )
      //this.getFilters = this.currentDataService.getSerializedFilters
      //this.filters = this.getFilters()
      this.scope.$on('deletedFilter', () => {
        this.launchSearches()
      })

      this.scope.$on('barFilter', () => {
        this.launchSearches()
      })

      this.timePicker = new TimePicker(
        '#timePicker',
        $urlTokenModel.handleValueChange
      )
      this.toast = $notificationService.showSimpleToast
      this.vizz = [
        /**
         * Visualizations
         */
        new AreaChart(
          'Wazuh-App-Overview-Owlh-Alerts-over-time',
          `index=wazuh rule.groups{}=ids | timechart span=1h count`,
          'Wazuh-App-Overview-Owlh-Alerts-over-time',
          this.scope
        ),
        new BarChart(
          'Wazuh-App-Overview-Owlh-Top-signature-ID',
          `index=wazuh rule.groups{}=ids | top data.alert.signature_id limit=6`,
          'Wazuh-App-Overview-Owlh-Top-signature-ID',
          this.scope
        ),
        new PieChart(
          'Wazuh-App-Overview-Owlh-Alerts-severity',
          `index=wazuh rule.groups{}=ids  | top data.alert.severity limit=6`,
          'Wazuh-App-Overview-Owlh-Alerts-severity',
          this.scope
        ),
        new PieChart(
          'Wazuh-App-Overview-Owlh-Alert-destination-IP',
          `index=wazuh rule.groups{}=ids | top data.dest_ip limit=6`,
          'Wazuh-App-Overview-Owlh-Alert-destination-IP',
          this.scope
        ),
        new PieChart(
          'Wazuh-App-Overview-Owlh-Alert-source-IP',
          `index=wazuh rule.groups{}=ids  | top data.src_ip limit=6`,
          'Wazuh-App-Overview-Owlh-Alert-source-IP',
          this.scope
        ),
        new Table(
          'Wazuh-App-Overview-Owlh-Alerts-summary',
          `index=wazuh rule.groups{}=ids  | stats count sparkline by data.alert.signature, data.alert.signature_id, data.alert.severity, data.alert.category `,
          'Wazuh-App-Overview-Owlh-Alerts-summary',
          this.scope
        ),
        new PieChart(
          'Wazuh-App-Overview-Owlh-Alert-categories',
          `index=wazuh rule.groups{}=ids  | top data.alert.category limit=6`,
          'Wazuh-App-Overview-Owlh-Alert-categories',
          this.scope
        ),
        new PieChart(
          'Wazuh-App-Overview-Owlh-NIDS-node',
          `index=wazuh rule.groups{}=ids  | top data.vlan limit=6`,
          'Wazuh-App-Overview-Owlh-NIDS-node',
          this.scope
        )
      ]

      /**
       * Generates report
       */
      this.scope.startVis2Png = () =>
        this.reportingService.startVis2Png(
          'ow-owlh',
          'Owlh',
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
     * Get filters and launches search
     */
    launchSearches() {
      this.filters = this.getFilters()
      this.state.reload()
    }
  }

  app.controller('OverviewOwlhCtrl', Osquery)
})
