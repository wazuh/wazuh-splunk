define([
  '../../module',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/search/search-handler',
  '../../../services/rawTableData/rawTableDataService'
], function(
  app,
  ColumnChart,
  LinearChart,
  Table,
  TimePicker,
  SearchHandler,
  RawTableDataService
) {
  'use strict'
  class Ciscat {
    /**
     * Class CIS-CAT
     * @param {*} $urlTokenModel
     * @param {*} $scope
     * @param {*} $currentDataService
     * @param {*} $state
     */
    constructor(
      $urlTokenModel,
      $scope,
      $currentDataService,
      $state,
      $reportingService,
      reportingEnabled
    ) {
      this.scope = $scope
      this.scope.reportingEnabled = reportingEnabled
      this.state = $state
      this.reportingService = $reportingService
      this.addFilter = $currentDataService.addFilter
      this.getFilters = $currentDataService.getSerializedFilters
      this.tableResults = {}
      this.currentDataService = $currentDataService
      this.filters = this.getFilters()
      this.submittedTokenModel = $urlTokenModel.getSubmittedTokenModel()
      this.timePicker = new TimePicker(
        '#timePicker',
        $urlTokenModel.handleValueChange
      )

      this.scope.expandArray = [false,false,false]
      this.scope.expand = (i,id) => this.expand(i,id);


      this.scope.$on('deletedFilter', () => {
        this.launchSearches()
      })

      this.scope.$on('barFilter', () => {
        this.launchSearches()
      })

      this.vizz = [
        /**
         * Metrics
         */
        new SearchHandler(
          `lastNotChecked`,
          `${
            this.filters
          } | search data.cis.notchecked=* | table data.cis.notchecked | head 1`,
          `filesAddedToken`,
          '$result.data.cis.notchecked$',
          'lastNotChecked',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastPass`,
          `${
            this.filters
          } | search data.cis.pass=* | table data.cis.pass | head 1`,
          `lastPass`,
          '$result.data.cis.pass$',
          'lastPass',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastScanScore`,
          `${
            this.filters
          } | search data.cis.score=* | table data.cis.score | head 1`,
          `lastScanScore`,
          '$result.data.cis.score$',
          'lastScanScore',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastScanDate`,
          `${
            this.filters
          }  | search data.cis.timestamp=* | table data.cis.timestamp | head 1`,
          'lastScanDate',
          '$result.data.cis.timestamp$',
          'lastScanDate',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastErrors`,
          `${
            this.filters
          } | search data.cis.error=* | table data.cis.error | head 1`,
          'lastErrors',
          '$result.data.cis.error$',
          'lastErrors',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastFails`,
          `${
            this.filters
          } | search data.cis.fail=* | table data.cis.fail | head 1`,
          'lastFails',
          '$result.data.cis.fail$',
          'lastFails',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastUnknown`,
          `${
            this.filters
          } | search data.unknown.fail=* | table data.cis.unknown | head 1`,
          'lastUnknown',
          '$result.data.cis.unknown$',
          'lastUnknown',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastScanBenchmark`,
          `${
            this.filters
          } rule.groups{}=ciscat | search data.cis.benchmark=* | table data.cis.benchmark | head 1`,
          'lastScanBenchmark',
          '$result.data.cis.benchmark$',
          'lastScanBenchmark',
          this.submittedTokenModel,
          this.scope
        ),
        /**
         * Visualizations
         */
        new ColumnChart(
          'topCiscatGroups',
          `${
            this.filters
          } sourcetype=wazuh rule.groups{}="ciscat" | top data.cis.group`,
          'topCiscatGroups',
          this.scope
        ),
        new LinearChart(
          'scanResultEvolution',
          `${
            this.filters
          } sourcetype=wazuh rule.groups{}="ciscat" | timechart count by data.cis.result usenull=f`,
          'scanResultEvolution',
          this.scope
        ),
        new Table(
          'alertsSummary',
          `${
            this.filters
          } sourcetype=wazuh rule.groups{}="ciscat" | stats count sparkline by data.cis.rule_title, data.cis.remediation,data.cis.group | sort count desc | rename "data.cis.rule_title" as "Title",  "data.cis.remediation" as "Remediation",  "data.cis.group" as "Group" `,
          'alertsSummary',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryTable',
          `${
            this.filters
          }  sourcetype=wazuh rule.groups{}="ciscat" | stats count sparkline by data.cis.rule_title, data.cis.remediation,data.cis.group | sort count desc | rename "data.cis.rule_title" as "Title",  "data.cis.group" as "Group" | fields - data.cis.remediation`,
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
          'overview-ciscat',
          'CIS-CAT',
          this.filters,
          ['topCiscatGroups', 'scanResultEvolution', 'alertsSummary'],
          this.reportMetrics,
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
          this.setReportMetrics()
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
    }

    /**
     * On controller loads
     */
    $onInit() {
      this.addFilter(`{"rule.groups{}":"ciscat", "implicit":true}`)

      /**
       * On controller destroy
       */
      this.scope.$on('$destroy', () => {
        this.timePicker.destroy()
        this.vizz.map(vizz => vizz.destroy())
      })
    }

    /**
     * Set report metrics
     */
    setReportMetrics() {
      this.reportMetrics = {
        'Last not checked': this.scope.lastNotChecked,
        'Last pass': this.scope.lastPass,
        'Last scan score': this.scope.lastScanScore,
        'Last scan date': this.scope.lastScanDate,
        'Last errors': this.scope.lastErrors,
        'Last fails': this.scope.lastFails,
        'Last unknown': this.scope.lastUnknown,
        'Last scan benchmark': this.scope.lastScanBenchmark
      }
    }

    /**
     * Get filters and launches the search
     */
    launchSearches() {
      this.filters = this.currentDataService.getSerializedFilters()
      this.state.reload()
    }


    expand(i, id) {
      this.scope.expandArray[i] = !this.scope.expandArray[i];
      let vis = $('#' + id + ' .panel-body .splunk-view .shared-reportvisualizer')
      this.scope.expandArray[i] ? vis.css('height', 'calc(100vh - 200px)') : vis.css('height', '250px')

      let vis_header = $('.wz-headline-title')
      vis_header.dblclick((e) => {
        if(this.scope.expandArray[i]){
          this.scope.expandArray[i] = !this.scope.expandArray[i];
          this.scope.expandArray[i] ? vis.css('height', 'calc(100vh - 200px)') : vis.css('height', '250px')
          this.scope.$applyAsync()
        }else{
          e.preventDefault();
        }
      });
    }

  }
  app.controller('ciscatCtrl', Ciscat)
})
