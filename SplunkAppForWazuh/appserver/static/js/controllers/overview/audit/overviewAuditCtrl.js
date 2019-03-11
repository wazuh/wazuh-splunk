define([
  '../../module',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/search/search-handler',
  '../../../services/rawTableData/rawTableDataService'
], function(
  app,
  ColumnChart,
  PieChart,
  AreaChart,
  Table,
  TimePicker,
  SearchHandler,
  RawTableDataService
) {
  'use strict'
  class Audit {
    /**
     * Class Audit
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
      this.tableResults = {}
      this.reportingService = $reportingService
      this.currentDataService = $currentDataService
      this.currentDataService.addFilter(
        `{"rule.groups{}":"audit", "implicit":true, "onlyShow":true}`
      )
      this.getFilters = this.currentDataService.getSerializedFilters
      this.filters = this.getFilters()
      this.submittedTokenModel = $urlTokenModel.getSubmittedTokenModel()
      this.timePicker = new TimePicker(
        '#timePicker',
        $urlTokenModel.handleValueChange
      )

      this.scope.$on('deletedFilter', () => {
        this.launchSearches()
      })

      this.scope.$on('barFilter', () => {
        this.launchSearches()
      })

      /**
       * On controller destroy
       */
      this.scope.$on('$destroy', () => {
        this.timePicker.destroy()
        this.vizz.map(vizz => vizz.destroy())
      })


      this.scope.expandArray = [false,false,false,false,false,false,false,false,false,false,false]
      this.scope.expand = (i,id) => this.expand(i,id);

      this.vizz = [
        /**
         * Metrics
         */
        new SearchHandler(
          `filesAddedSearch`,
          `${this.filters} sourcetype=wazuh rule.id=80790 | stats count`,
          `filesAddedToken`,
          '$result.count$',
          'newFiles',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `readFilesSearch`,
          `${this.filters} sourcetype=wazuh rule.id=80784 | stats count`,
          `readFilesToken`,
          '$result.count$',
          'readFiles',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `modifiedFiles`,
          `${this.filters} sourcetype=wazuh rule.id=80781 | stats count`,
          `filesModifiedToken`,
          '$result.count$',
          'filesModifiedToken',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `deletedFiles`,
          `${this.filters} sourcetype=wazuh rule.id=80791 | stats count`,
          'filesDeletedToken',
          '$result.count$',
          'filesDeleted',
          this.submittedTokenModel,
          this.scope
        ),
        /**
         * Visualizations
         */
        new PieChart(
          'groupsElement',
          `${
            this.filters
          } sourcetype=wazuh rule.groups{}="audit" | top rule.groups{}`,
          'groupsElement',
          this.scope
        ),
        new ColumnChart(
          'agentsElement',
          `${
            this.filters
          } sourcetype=wazuh rule.groups{}="audit" agent.name=* | top agent.name`,
          'agentsElement',
          this.scope
        ),
        new PieChart(
          'directoriesElement',
          `${
            this.filters
          } sourcetype=wazuh rule.groups{}="audit" data.audit.directory.name=* | top data.audit.directory.name`,
          'directoriesElement',
          this.scope
        ),
        new PieChart(
          'filesElement',
          `${
            this.filters
          } sourcetype=wazuh rule.groups{}="audit" data.audit.file.name=* | top data.audit.file.name`,
          'filesElement',
          this.scope
        ),
        new AreaChart(
          'alertsOverTime',
          `${
            this.filters
          } sourcetype=wazuh rule.groups{}="audit" | timechart limit=10 count by rule.description`,
          'alertsOverTimeElement',
          this.scope
        ),
        new PieChart(
          'fileReadAccess',
          `${
            this.filters
          } sourcetype=wazuh rule.groups{}="audit" rule.id=80784 | top data.audit.file.name`,
          'fileReadAccessElement',
          this.scope
        ),
        new PieChart(
          'fileWriteAccess',
          `${
            this.filters
          } sourcetype=wazuh rule.groups{}="audit" rule.id=80781 | top data.audit.file.name`,
          'fileWriteAccessElement',
          this.scope
        ),
        new ColumnChart(
          'commands',
          `${
            this.filters
          } sourcetype=wazuh rule.groups{}="audit" | top data.audit.command`,
          'commandsElement',
          this.scope
        ),
        new ColumnChart(
          'createdFiles',
          `${
            this.filters
          } sourcetype=wazuh rule.groups{}="audit" rule.id=80790 | top data.audit.file.name`,
          'createdFilesElement',
          this.scope
        ),
        new PieChart(
          'removedFiles',
          `${
            this.filters
          } sourcetype=wazuh rule.groups{}="audit" rule.id=80791 | top data.audit.file.name`,
          'removedFilesElement',
          this.scope
        ),
        new Table(
          'alertsSummary',
          `${
            this.filters
          } sourcetype=wazuh rule.groups{}="audit" | stats count sparkline by agent.name,rule.description, data.audit.exe, data.audit.type, data.audit.euid | sort count DESC | rename agent.name as "Agent name", rule.description as Description, data.audit.exe as Command, data.audit.type as Type, data.audit.euid as "Effective user id"`,
          'alertsSummaryElement',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryTable',
          `${
            this.filters
          } sourcetype=wazuh rule.groups{}="audit" | stats count sparkline by agent.name,rule.description, data.audit.exe, data.audit.type, data.audit.euid | sort count DESC | rename agent.name as "Agent name", rule.description as Description, data.audit.exe as Command, data.audit.type as Type, data.audit.euid as "Effective user id"`,
          'alertsSummaryTableToken',
          '$result$',
          this.scope,
          'Alerts Summary'
        )
      ]

      this.reportMetrics = {
        'New files': this.scope.newFiles,
        'Read files': this.scope.readFiles,
        'Modified files': this.scope.filesModifiedToken,
        'Deleted files': this.scope.filesDeleted
      }

      /**
       * Generates report
       */
      this.scope.startVis2Png = () =>
        this.reportingService.startVis2Png(
          'overview-audit',
          'Audit',
          this.filters,
          [
            'groupsElement',
            'agentsElement',
            'directoriesElement',
            'filesElement',
            'alertsOverTimeElement',
            'fileReadAccessElement',
            'fileWriteAccessElement',
            'commandsElement',
            'createdFilesElement',
            'removedFilesElement',
            'alertsSummaryElement'
          ],
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
  app.controller('overviewAuditCtrl', Audit)
})
