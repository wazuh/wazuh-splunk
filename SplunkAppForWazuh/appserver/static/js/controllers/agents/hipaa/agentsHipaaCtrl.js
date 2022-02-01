define([
  '../../module',
  '../../../dashboardMain',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/dropdown-input',
  '../../../services/rawTableData/rawTableDataService',
], function (
  app,
  DashboardMain,
  ColumnChart,
  PieChart,
  Table,
  Dropdown,
  RawTableDataService
) {
  'use strict'

  class AgentsHipaa extends DashboardMain {
    /**
     * Class Agents HIPAA
     * @param {*} $urlTokenModel
     * @param {*} $scope
     * @param {*} $state
     * @param {*} $currentDataService
     * @param {Object} agent
     * @param {*} $reportingService
     * @param {*} hipaaTabs
     * @param {*} reportingEnabled
     * @param {*} pciExtensionEnabled
     * @param {*} gdprExtensionEnabled
     * @param {*} nistExtensionEnabled
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
      $notificationService
    ) {
      super(
        $scope,
        $reportingService,
        $state,
        $currentDataService,
        $urlTokenModel,
        $notificationService
      )
      this.scope.reportingEnabled = reportingEnabled
      this.scope.gdprExtensionEnabled = gdprExtensionEnabled
      this.scope.pciExtensionEnabled = pciExtensionEnabled
      this.scope.nistExtensionEnabled = nistExtensionEnabled
      this.scope.hipaaTabs = hipaaTabs ? hipaaTabs : false

      this.scope.expandArray = [false, false, false, false, false]

      this.dropdown = new Dropdown(
        'dropDownInput',
        `${this.filters} rule.hipaa{}="*"| stats count by "rule.hipaa{}" | sort "rule.hipaa{}" ASC | fields - count`,
        'rule.hipaa{}',
        '$form.hipaa$',
        'dropDownInput',
        this.scope
      )
      this.dropdownInstance = this.dropdown.getElement()
      this.dropdownInstance.on('change', (newValue) => {
        if (newValue && this.dropdownInstance)
          $urlTokenModel.handleValueChange(this.dropdownInstance)
      })
      this.agent = agent
      if (
        this.agent &&
        this.agent.data &&
        this.agent.data.data &&
        this.agent.data.data.affected_items[0].id
      )
        this.currentDataService.addFilter(
          `{"agent.id":"${this.agent.data.data.affected_items[0].id}", "implicit":true}`
        )
      this.filters = this.currentDataService.getSerializedFilters()

      this.vizz = [
        /**
         * Visualizations
         */
        new ColumnChart(
          'requirementsOverTime',
          `${this.filters} rule.hipaa{}="$hipaa$" | timechart count by rule.hipaa{} | rename count as "Count", rule.hipaa{} as "Requirement"`,
          'requirementsOverTime',
          this.scope,
          { stackMode: 'stacked' }
        ),
        new PieChart(
          'top10Requirements',
          `${this.filters} rule.hipaa{}="$hipaa$" | top limit=10 rule.hipaa{} | rename rule.hipaa{} as "Requirement"`,
          'top10Requirements',
          this.scope
        ),
        new ColumnChart(
          'requirementsDistributionByLevel',
          `${this.filters} rule.hipaa{}="$hipaa$" | chart count(rule.hipaa{}) by rule.level,rule.hipaa{} | rename count as "Count" , rule.level as "Level", rule.hipaa{} as "Requirement"`,
          'requirementsDistributionByLevel',
          this.scope,
          { stackMode: 'stacked' }
        ),
        new Table(
          'alertsSummary',
          `${this.filters} rule.hipaa{}="$hipaa$" | stats count by rule.hipaa{},rule.level,rule.description |  sort count DESC | rename rule.hipaa{} as "Requirement", rule.level as "Level", rule.description as "Description", count as "Count"`,
          'alertsSummary',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryTable',
          `${this.filters} rule.hipaa{}="$hipaa$" | stats count by rule.hipaa{},rule.level,rule.description |  sort count DESC | rename rule.hipaa{} as "Requirement", rule.level as "Level", rule.description as "Description", count as "Count"`,
          'alertsSummaryTableToken',
          '$result$',
          this.scope,
          'Alerts Summary'
        ),
      ]

      // Set agent info
      try {
        this.agentReportData = {
          ID: this.agent.data.data.affected_items[0].id,
          Name: this.agent.data.data.affected_items[0].name,
          IP: this.agent.data.data.affected_items[0].ip,
          Version: this.agent.data.data.affected_items[0].version,
          Manager: this.agent.data.data.affected_items[0].manager,
          OS: this.agent.data.data.affected_items[0].os.name,
          dateAdd: this.agent.data.data.affected_items[0].dateAdd,
          lastKeepAlive: this.agent.data.data.affected_items[0].lastKeepAlive,
          group: this.agent.data.data.affected_items[0].group.toString(),
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
            'requirementsOverTime',
            'top10Requirements',
            'requirementsDistributionByLevel',
            'alertsSummary',
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
          ? this.agent.data.data.affected_items[0]
          : { error: true }
      // Capitalize Status
      if (this.scope.agent && this.scope.agent.status) {
        this.scope.agent.status =
          this.scope.agent.status.charAt(0).toUpperCase() +
          this.scope.agent.status.slice(1)
      }

      this.scope.getAgentStatusClass = (agentStatus) =>
        this.getAgentStatusClass(agentStatus)
      this.scope.formatAgentStatus = (agentStatus) =>
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
