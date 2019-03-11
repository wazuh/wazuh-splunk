define([
  '../../module',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/rawTableData/rawTableDataService'
], function(app, PieChart, Table, AreaChart, TimePicker, RawTableDataService) {
  'use strict'

  class AgentsVirusTotal {
    /**
     * Class Virus Total
     * @param {Object} $urlTokenModel
     * @param {Object} $state
     * @param {Object} $scope
     * @param {Object} $currentDataService
     * @param {Object} agent
     * @param {*} $reportingService
     */

    constructor(
      $urlTokenModel,
      $state,
      $scope,
      $currentDataService,
      agent,
      $reportingService,
      reportingEnabled
    ) {
      this.state = $state
      this.currentDataService = $currentDataService
      this.reportingService = $reportingService
      this.tableResults = {}
      this.scope = $scope
      this.scope.reportingEnabled = reportingEnabled
      //Add filer for VirusTotal
      this.currentDataService.addFilter(
        `{"rule.groups{}":"virustotal", "implicit":true}`
      )
      this.agent = agent
      this.scope.expandArray = [false,false,false,false,false]
      this.scope.expand = (i,id) => this.expand(i,id);

      if (
        this.agent &&
        this.agent.data &&
        this.agent.data.data &&
        this.agent.data.data.id
      )
        this.currentDataService.addFilter(
          `{"agent.id":"${this.agent.data.data.id}", "implicit":true}`
        )

      this.getFilters = this.currentDataService.getSerializedFilters
      this.urlTokenModel = $urlTokenModel
      this.filters = this.currentDataService.getSerializedFilters()
      this.timePicker = new TimePicker(
        '#timePicker',
        this.urlTokenModel.handleValueChange
      )
      this.submittedTokenModel = this.urlTokenModel.getSubmittedTokenModel()

      this.scope.$on('deletedFilter', () => {
        this.launchSearches()
      })

      this.scope.$on('barFilter', () => {
        this.launchSearches()
      })

      this.vizz = [
        /**
         * Visualizations
         */
        new AreaChart(
          'eventsOverTimeElement',
          `${this.filters}  | timechart span=12h count by rule.id`,
          'eventsOverTimeElement',
          this.scope
        ),
        new Table(
          'eventsSummaryElement',
          `${
            this.filters
          } | stats count sparkline by rule.description | sort count DESC | rename agent.name as Agent, rule.description as Description, count as Count`,
          'eventsSummaryElement',
          this.scope
        ),
        new Table(
          'top5Rules',
          `${
            this.filters
          } | stats count sparkline by rule.id, rule.description | sort count DESC | head 5 | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,
          'top5Rules',
          this.scope
        ),
        new PieChart(
          'alertsVolume',
          `${
            this.filters
          } | stats count by rule.description | rename "rule.description" as "Description"`,
          'alertsVolume',
          this.scope
        ),
        new Table(
          'filesAffected',
          `${
            this.filters
          }  rule.level=12 | top data.virustotal.source.file |  rename data.virustotal.source.file as "File" | fields - percent | fields - count`,
          'filesAffected',
          this.scope
        ),
        new RawTableDataService(
          'eventsSummaryTable',
          `${
            this.filters
          } | stats count sparkline by rule.description | sort count DESC | rename agent.name as Agent, rule.description as Description, count as Count`,
          'eventsSummaryTableToken',
          '$result$',
          this.scope,
          'Events Summary'
        ),
        new RawTableDataService(
          'top5RulesTable',
          `${
            this.filters
          } | stats count sparkline by rule.id, rule.description | sort count DESC | head 5 | rename rule.id as "Rule ID", rule.description as "Description", rule.level as Level, count as Count`,
          'top5RulesTableToken',
          '$result$',
          this.scope,
          'Top 5 Rules'
        ),
        new RawTableDataService(
          'filesAffectedTable',
          `${
            this.filters
          }  rule.level=12 | top data.virustotal.source.file |  rename data.virustotal.source.file as "File" | fields - percent | fields - count`,
          'filesAffectedTableToken',
          '$result$',
          this.scope,
          'Files Affected'
        )
      ]

      // Set agent info
      try {
        this.agentReportData = {
          ID: this.agent.data.data.id,
          Name: this.agent.data.data.name,
          IP: this.agent.data.data.ip,
          Version: this.agent.data.data.version,
          Manager: this.agent.data.data.manager,
          OS: this.agent.data.data.os.name,
          dateAdd: this.agent.data.data.dateAdd,
          lastKeepAlive: this.agent.data.data.lastKeepAlive,
          group: this.agent.data.data.group.toString()
        }
      } catch (error) {
        this.agentReportData = false
      }

      /**
       * Generates report
       */
      this.scope.startVis2Png = () =>
        this.reportingService.startVis2Png(
          'agents-virustotal',
          'VirusTotal',
          this.filters,
          [
            'alertsVolume',
            'eventsSummaryElement',
            'eventsOverTimeElement',
            'top5Rules',
            'filesAffected'
          ],
          this.reportMetrics,
          this.tableResults,
          this.agentReportData
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

      /**
       * When controller is destroyed
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
      this.scope.agent =
        this.agent && this.agent.data && this.agent.data.data
          ? this.agent.data.data
          : { error: true }
      this.scope.getAgentStatusClass = agentStatus =>
        agentStatus === 'Active' ? 'teal' : 'red'
      this.scope.formatAgentStatus = agentStatus => {
        return ['Active', 'Disconnected'].includes(agentStatus)
          ? agentStatus
          : 'Never connected'
      }
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
        'Files added': this.scope.filesAdded,
        'Files modified': this.scope.filesModified,
        'Files deleted': this.scope.filesDeleted
      }
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
  app.controller('agentsVirusTotalCtrl', AgentsVirusTotal)
})

//data.virustotal.source.file
