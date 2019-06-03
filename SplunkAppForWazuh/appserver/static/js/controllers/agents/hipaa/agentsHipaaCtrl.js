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

  class AgentsHipaa extends DashboardMain{
    /**
     * Class Agents HIPAA
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
      hipaaTabs,
      reportingEnabled,
      pciExtensionEnabled,
      gdprExtensionEnabled,
      nistExtensionEnabled,
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
      this.scope.nistExtensionEnabled = nistExtensionEnabled
      this.scope.hipaaTabs = hipaaTabs ? hipaaTabs : false


      this.scope.expandArray = [false, false, false, false, false]

      this.dropdown = new Dropdown(
        'dropDownInput',
        `${
          this.filters
        } sourcetype=wazuh rule.hipaa{}="*"| stats count by "rule.hipaa{}" | sort "rule.hipaa{}" ASC | fields - count`,
        'rule.hipaa{}',
        '$form.hipaa$',
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
          'hipaaReqSearchVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.hipaa{}="$hipaa$"  | stats count by rule.hipaa{}`,
          'hipaaReqSearchVizz',
          this.scope
        ),
        new PieChart(
          'groupsVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.hipaa{}="$hipaa$" | top limit=5 rule.groups{}`,
          'groupsVizz',
          this.scope
        ),
        new PieChart(
          'topRules',
          `${
            this.filters
          } sourcetype=wazuh rule.hipaa{}="$hipaa$" | top limit=5 rule.description`,
          'topRules',
          this.scope
        ),
        new PieChart(
          'top5hipaa',
          `${
            this.filters
          } sourcetype=wazuh rule.hipaa{}="$hipaa$" | top limit=5 rule.hipaa{}`,
          'top5hipaa',
          this.scope
        ),
        new PieChart(
          'ruleLevelDistribution',
          `${
            this.filters
          } sourcetype=wazuh rule.hipaa{}="$hipaa$" | stats count by rule.level`,
          'ruleLevelDistribution',
          this.scope
        ),
        new ColumnChart(
          'reqByAgentsVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.hipaa{}="$hipaa$" agent.name=*| chart  count(rule.hipaa{}) by rule.hipaa{},agent.name`,
          'reqByAgentsVizz',
          this.scope
        ),
        new Table(
          'alertsSummaryVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.hipaa{}="$hipaa$" | stats count sparkline by agent.name, rule.hipaa{}, rule.description | sort count DESC | rename agent.name as "Agent Name", rule.hipaa{} as Requirement, rule.description as "Rule description", count as Count`,
          'alertsSummaryVizz',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryTable',
          `${
            this.filters
          } sourcetype=wazuh rule.hipaa{}="$hipaa$" | stats count sparkline by agent.name, rule.hipaa{}, rule.description | sort count DESC | rename agent.name as "Agent Name", rule.hipaa{} as Requirement, rule.description as "Rule description", count as Count`,
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
          'agents-hipaa',
          'HIPAA',
          this.filters,
          [
            'hipaaReqSearchVizz',
            'ruleLevelDistribution',
            'top5hipaa',
            'groupsVizz',
            'topRules',
            'reqByAgentsVizz',
            'alertsSummaryVizz'
          ],
          {}, //Metrics,
          this.tableResults,
          this.agentReportData
        )

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
  app.controller('agentsHipaaCtrl', AgentsHipaa)
})
