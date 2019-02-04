define([
  '../../module',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/rawTableData/rawTableDataService',
  'FileSaver'
], function(
  app,
  ColumnChart,
  PieChart,
  Table,
  AreaChart,
  TimePicker,
  RawTableDataService
) {
  'use strict'

  class AgentsFim {
    /**
     * Class constructor
     * @param {Object} $urlTokenModel
     * @param {Object} $state
     * @param {Object} $scope
     * @param {Object} $currentDataService
     * @param {Object} agent
     * @param {Object} $notificationService
     * @param {*} $reportingService
     */

    constructor(
      $urlTokenModel,
      $state,
      $scope,
      $currentDataService,
      agent,
      $tableFilterService,
      $csvRequestService,
      $notificationService,
      $reportingService
    ) {
      this.state = $state
      this.wzTableFilter = $tableFilterService
      this.currentDataService = $currentDataService
      this.agent = agent
      this.api = this.currentDataService.getApi()
      this.csvReq = $csvRequestService
      this.toast = $notificationService.showSimpleToast
      this.reportingService = $reportingService
      this.tableResults = {}
      this.scope = $scope
      this.showFiles = false
      this.scope.showFiles = this.showFiles
      this.urlTokenModel = $urlTokenModel
      this.currentDataService.addFilter(
        `{"rule.groups":"syscheck", "implicit":true, "onlyShow":true}`
      )
      if (
        this.agent &&
        this.agent.data &&
        this.agent.data.data &&
        this.agent.data.data.id
      )
        this.currentDataService.addFilter(
          `{"agent.id":"${this.agent.data.data.id}", "implicit":true}`
        )

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
          `${
            this.filters
          } sourcetype="wazuh"  "rule.groups"="syscheck" | timechart span=12h count by rule.description`,
          'eventsOverTimeElement',
          this.scope
        ),
        new ColumnChart(
          'topGroupOwnersElement',
          `${
            this.filters
          } sourcetype="wazuh" uname_after syscheck.gname_after!=""| top limit=20 "syscheck.gname_after"`,
          'topGroupOwnersElement',
          this.scope
        ),
        new PieChart(
          'topUserOwnersElement',
          `${
            this.filters
          } sourcetype="wazuh" uname_after| top limit=20 "syscheck.uname_after"`,
          'topUserOwnersElement',
          this.scope
        ),
        new PieChart(
          'topFileChangesElement',
          `${
            this.filters
          } sourcetype="wazuh" "Integrity checksum changed" location!="syscheck-registry" syscheck.path="*" | top syscheck.path`,
          'topFileChangesElement',
          this.scope
        ),
        new PieChart(
          'rootUserFileChangesElement',
          `${
            this.filters
          } sourcetype="wazuh" "Integrity checksum changed" location!="syscheck-registry" syscheck.path="*" | search root | top limit=10 syscheck.path`,
          'rootUserFileChangesElement',
          this.scope
        ),
        new PieChart(
          'wordWritableFilesElement',
          `${
            this.filters
          } sourcetype="wazuh" rule.groups="syscheck" "syscheck.perm_after"=* | top "syscheck.perm_after" showcount=false showperc=false | head 1`,
          'wordWritableFilesElement',
          this.scope
        ),
        new Table(
          'eventsSummaryElement',
          `${
            this.filters
          } sourcetype="wazuh" rule.groups="syscheck"  |stats count sparkline by agent.name, syscheck.path syscheck.event, rule.description | sort count DESC | rename agent.name as Agent, syscheck.path as File, syscheck.event as Event, rule.description as Description, count as Count`,
          'eventsSummaryElement',
          this.scope
        ),
        new RawTableDataService(
          'eventsSummaryTable',
          `${
            this.filters
          } sourcetype="wazuh" rule.groups="syscheck"  |stats count sparkline by agent.name, syscheck.path syscheck.event, rule.description | sort count DESC | rename agent.name as Agent, syscheck.path as File, syscheck.event as Event, rule.description as Description, count as Count`,
          'eventsSummaryTableToken',
          '$result$',
          this.scope,
          'Events Summary'
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
          'agents-fim',
          'File integrity monitoring',
          this.filters,
          [
            'eventsOverTimeElement',
            'topGroupOwnersElement',
            'topUserOwnersElement',
            'topFileChangesElement',
            'rootUserFileChangesElement',
            'eventsSummaryElement'
          ],
          {}, //Metrics,
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
      this.show()
      this.scope.show = () => this.show()
      this.scope.agent =
        this.agent && this.agent.data && this.agent.data.data
          ? this.agent.data.data
          : { error: true }
      this.scope.search = term => {
        this.scope.$broadcast('wazuhSearch', { term })
      }
      this.scope.formatAgentStatus = agentStatus =>
        this.formatAgentStatus(agentStatus)
      this.scope.getAgentStatusClass = agentStatus =>
        this.getAgentStatusClass(agentStatus)
      this.scope.downloadCsv = (path, name) => this.downloadCsv(path, name)
    }

    /**
     * Shows/Hides alerts section of the view
     */
    show() {
      this.showFiles = !this.showFiles
      this.scope.showFiles = this.showFiles
      if (!this.scope.$$phase) this.scope.$digest()
    }

    /**
     * Checks and returns agent status
     * @param {Array} agentStatus
     */
    formatAgentStatus(agentStatus) {
      return ['Active', 'Disconnected'].includes(agentStatus)
        ? agentStatus
        : 'Never connected'
    }

    /**
     * Returns a class depending of the agent state
     * @param {String} agentStatus
     */
    getAgentStatusClass(agentStatus) {
      return agentStatus === 'Active' ? 'teal' : 'red'
    }

    /**
     * Exports the table in CSV format
     */
    async downloadCsv(path, name) {
      try {
        this.toast('Your download should begin automatically...')
        const currentApi = this.api.id
        const output = await this.csvReq.fetch(
          path,
          currentApi,
          this.wzTableFilter.get()
        )
        const blob = new Blob([output], { type: 'text/csv' }) // eslint-disable-line
        saveAs(blob, name) // eslint-disable-line
        return
      } catch (error) {
        this.toast('Error downloading CSV')
      }
      return
    }

    /**
     * Gets filters and launches search
     */
    launchSearches() {
      this.filters = this.currentDataService.getSerializedFilters()
      this.state.reload()
    }
  }
  app.controller('agentsFimCtrl', AgentsFim)
})
