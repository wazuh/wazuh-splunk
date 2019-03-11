define([
  '../../module',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/rawTableData/rawTableDataService'
], function(
  app,
  ColumnChart,
  PieChart,
  Table,
  LinearChart,
  TimePicker,
  RawTableDataService
) {
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
      reportingEnabled
    ) {
      this.scope = $scope
      this.scope.reportingEnabled = reportingEnabled
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

      this.scope.expandArray = [false,false,false,false,false,false,false]
      this.scope.expand = (i,id) => this.expand(i,id);


      this.vizz = [
        /**
         * Visualizations
         */
        new PieChart(
          'deletedFiles',
          `${
            this.filters
          } sourcetype=wazuh syscheck.event=deleted  | stats count by syscheck.path | top syscheck.path limit=5`,
          'deletedFiles',
          this.scope
        ),
        new ColumnChart(
          'whodataUsage',
          `${this.filters} sourcetype=wazuh rule.groups{}=syscheck
          | eval WHODATA=if(isnotnull('syscheck.audit.effective_user.id'), "WHODATA", "NOWHO")
          | stats count BY WHODATA
          | addcoltotals count labelfield=WHODATA label=Total
          | where NOT WHODATA="NOWHO"`,
          'whodataUsage',
          this.scope
        ),
        new PieChart(
          'alertsVolume',
          `${
            this.filters
          } sourcetype=wazuh rule.groups{}=syscheck | eval SYSCHECK=if(isnotnull('syscheck.event'), "SYSCHECK", "NO")
          | stats count BY SYSCHECK
          | addcoltotals count labelfield=SYSCHECK label=Total
          | where NOT SYSCHECK="NO"`,
          'alertsVolume',
          this.scope
        ),
        new PieChart(
          'newFiles',
          `${
            this.filters
          } sourcetype=wazuh syscheck.event=added  | stats count by syscheck.path | top syscheck.path limit=5`,
          'newFiles',
          this.scope
        ),
        new PieChart(
          'modifiedFiles',
          `${
            this.filters
          } sourcetype=wazuh syscheck.event=modified  | stats count by syscheck.path | top syscheck.path limit=5`,
          'modifiedFiles',
          this.scope
        ),
        new LinearChart(
          'eventsSummary',
          `${
            this.filters
          } sourcetype=wazuh rule.groups{}=syscheck | timechart count`,
          'eventsSummary',
          this.scope
        ),
        new PieChart(
          'topAgents',
          `${
            this.filters
          } sourcetype=wazuh rule.groups{}=syscheck  | top agent.name limit=10`,
          'topAgents',
          this.scope
        ),
        new Table(
          'topUsers',
          `${
            this.filters
          } sourcetype=wazuh syscheck.audit.effective_user.id=* | top syscheck.audit.effective_user.name limit=5 | rename syscheck.audit.effective_user.name as Username, count as Count, percent as Percent`,
          'topUsers',
          this.scope
        ),
        new RawTableDataService(
          'topRulesTable',
          `${
            this.filters
          } sourcetype=wazuh rule.groups{}=syscheck |stats count sparkline by rule.id, rule.description | sort count DESC | head 5 | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,
          'topRulesTableToken',
          '$result$',
          this.scope,
          'Top rules'
        ),
        new RawTableDataService(
          'topUsersTable',
          `${
            this.filters
          } sourcetype=wazuh syscheck.audit.effective_user.id=* | top syscheck.audit.effective_user.name limit=5 | rename syscheck.audit.effective_user.name as Username, count as Count, percent as Percent`,
          'topUsersTableToken',
          '$result$',
          this.scope,
          'Top users'
        )
      ]

      this.scope.$on('deletedFilter', () => {
        this.launchSearches()
      })

      this.scope.$on('barFilter', () => {
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
            'deletedFiles',
            'newFiles',
            'modifiedFiles',
            'alertsVolume',
            'eventsSummary',
            'topRules',
            'whodataUsage',
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

      this.scope.$on('loadingReporting', (event, data) => {
        this.scope.loadingReporting = data.status
      })
    }

    /**
     * Get filters and launches the search
     */
    launchSearches() {
      this.filters = this.getFilters()
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
  app.controller('overviewFimCtrl', OverviewFIM)
})
