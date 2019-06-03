define([
  '../../module',
  '../../../dashboardMain',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/dropdown-input',
  '../../../services/rawTableData/rawTableDataService'
], function(
  app,
  DashboardMain,
  ColumnChart,
  PieChart,
  Table,
  Dropdown,
  RawTableDataService
) {
  'use strict'

  class AgentsNist extends DashboardMain{
    /**
     * Class Agents Nist 800-53
     * @param {*} $urlTokenModel
     * @param {*} $scope
     * @param {*} $state
     * @param {*} $currentDataService
     * @param {Object} agent
     * @param {*} $reportingService
     */
    constructor(
      $urlTokenModel,
      $scope,
      $state,
      $currentDataService,
      agent,
      $reportingService,
      nistTabs,
      reportingEnabled,
      pciExtensionEnabled,
      gdprExtensionEnabled,
      hipaaExtensionEnabled,
    ) {
      super(
        $scope,
        $reportingService,
        $state,
        $currentDataService,
        $urlTokenModel
      )
      this.scope.reportingEnabled = reportingEnabled
      this.scope.gdprExtensionEnabled = gdprExtensionEnabled
      this.scope.pciExtensionEnabled = pciExtensionEnabled
      this.scope.hipaaExtensionEnabled = hipaaExtensionEnabled
      this.scope.nistTabs = nistTabs ? nistTabs : false

      this.scope.expandArray = [false, false, false, false, false]

      this.dropdown = new Dropdown(
        'dropDownInput',
        `${
          this.filters
        } sourcetype=wazuh rule.nist_800_53{}="*"| stats count by "rule.nist_800_53{}" | sort "rule.nist_800_53{}" ASC | fields - count`,
        'rule.nist_800_53{}',
        '$form.nist$',
        'dropDownInput',
        this.scope
      )
      this.dropdownInstance = this.dropdown.getElement()
      this.dropdownInstance.on('change', newValue => {
        if (newValue && this.dropdownInstance)
          $urlTokenModel.handleValueChange(this.dropdownInstance)
      })
      this.agent = agent
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

      this.vizz = [
        /**
         * Visualizations
         */
        new ColumnChart(
          'nistReqSearchVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.nist_800_53{}="$nist$"  | stats count by rule.nist_800_53{}`,
          'nistReqSearchVizz',
          this.scope
        ),
        new PieChart(
          'groupsVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.nist_800_53{}="$nist$" | top limit=5 rule.groups{}`,
          'groupsVizz',
          this.scope
        ),
        new PieChart(
          'topRules',
          `${
            this.filters
          } sourcetype=wazuh rule.nist_800_53{}="$nist$" | top limit=5 rule.description`,
          'topRules',
          this.scope
        ),
        new PieChart(
          'top5nist',
          `${
            this.filters
          } sourcetype=wazuh rule.nist_800_53{}="$nist$" | top limit=5 rule.nist_800_53{}`,
          'top5nist',
          this.scope
        ),
        new PieChart(
          'ruleLevelDistribution',
          `${
            this.filters
          } sourcetype=wazuh rule.nist_800_53{}="$nist$" | stats count by rule.level`,
          'ruleLevelDistribution',
          this.scope
        ),
        new ColumnChart(
          'reqByAgentsVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.nist_800_53{}="$nist$" agent.name=*| chart  count(rule.nist_800_53{}) by rule.nist_800_53{},agent.name`,
          'reqByAgentsVizz',
          this.scope
        ),
        new Table(
          'alertsSummaryVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.nist_800_53{}="$nist$" | stats count sparkline by agent.name, rule.nist_800_53{}, rule.description | sort count DESC | rename agent.name as "Agent Name", rule.nist_800_53{} as Requirement, rule.description as "Rule description", count as Count`,
          'alertsSummaryVizz',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryTable',
          `${
            this.filters
          } sourcetype=wazuh rule.nist_800_53{}="$nist$" | stats count sparkline by agent.name, rule.nist_800_53{}, rule.description | sort count DESC | rename agent.name as "Agent Name", rule.nist_800_53{} as Requirement, rule.description as "Rule description", count as Count`,
          'alertsSummaryTableToken',
          '$result$',
          this.scope,
          'Alerts Summary'
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
          'agents-nist',
          'NIST 800-53',
          this.filters,
          [
            'nistReqSearchVizz',
            'ruleLevelDistribution',
            'top5nist',
            'groupsVizz',
            'topRules',
            'reqByAgentsVizz',
            'alertsSummaryVizz'
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
    }

    /**
     * On controller loads
     */
    $onInit() {
      this.scope.loadingVizz = true
      this.scope.agent =
        this.agent && this.agent.data && this.agent.data.data
          ? this.agent.data.data
          : { error: true }
      this.scope.getAgentStatusClass = agentStatus =>
        this.getAgentStatusClass(agentStatus)
      this.scope.formatAgentStatus = agentStatus =>
        this.formatAgentStatus(agentStatus)
    }

    /**
     * Returns a class depending of the agent state
     * @param {String} agentStatus
     */
    getAgentStatusClass(agentStatus) {
      return agentStatus === 'Active' ? 'teal' : 'red'
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

  }
  app.controller('agentsNistCtrl', AgentsNist)
})
