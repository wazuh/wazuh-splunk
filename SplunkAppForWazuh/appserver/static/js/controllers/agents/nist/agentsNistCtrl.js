define([
  '../../module',
  '../../../dashboardMain',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/chart/single-value',
  '../../../services/visualizations/chart/bar-chart',
  '../../../services/visualizations/inputs/dropdown-input',
  '../../../services/rawTableData/rawTableDataService',
], function (
  app,
  DashboardMain,
  ColumnChart,
  PieChart,
  Table,
  SingleValue,
  BarChart,
  Dropdown,
  RawTableDataService
) {
  'use strict'

  class AgentsNist extends DashboardMain {
    /**
     * Class Agents Nist 800-53
     * @param {*} $urlTokenModel
     * @param {*} $scope
     * @param {*} $state
     * @param {*} $currentDataService
     * @param {Object} agent
     * @param {*} $reportingService
     * @param {*} nistTabs
     * @param {*} reportingEnabled
     * @param {*} pciExtensionEnabled
     * @param {*} gdprExtensionEnabled
     * @param {*} hipaaExtensionEnabled
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
      this.scope.hipaaExtensionEnabled = hipaaExtensionEnabled
      this.scope.nistTabs = nistTabs ? nistTabs : false
      this.scope.expandArray = [false, false, false, false, false]

      this.dropdown = new Dropdown(
        'dropDownInput',
        `${this.filters} rule.nist_800_53{}="*"| stats count by "rule.nist_800_53{}" | sort "rule.nist_800_53{}" ASC | fields - count`,
        'rule.nist_800_53{}',
        '$form.nist$',
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
        new SingleValue(
          'maxRuleLevel',
          `${this.filters} rule.nist_800_53{}="$nist$" | top rule.level | sort - rule.level`,
          'maxRuleLevel',
          this.scope
        ),
        new SingleValue(
          'totalAlerts',
          `${this.filters} rule.nist_800_53{}="$nist$" | stats count`,
          'totalAlerts',
          this.scope
        ),
        new PieChart(
          'top10Requirements',
          `${this.filters} rule.nist_800_53{}="$nist$" | top limit=10 rule.nist_800_53{} | rename count as "Count", rule.nist_800_53{} as Requirement`,
          'top10Requirements',
          this.scope
        ),
        new BarChart(
          'requirementsDistributedByLevel',
          `${this.filters} rule.nist_800_53{}="$nist$" | chart count(rule.nist_800_53{}) by rule.level,rule.nist_800_53{} | rename count as "Count" , rule.level as "Level", rule.nist_800_53{} as "Requirement"`,
          'requirementsDistributedByLevel',
          this.scope,
          { stackMode: 'stacked' }
        ),
        new ColumnChart(
          'requirementsOverTime',
          `${this.filters} rule.nist_800_53{}="$nist$" | timechart count by rule.nist_800_53{} | rename count as "Count", rule.nist_800_53{} as "Requirement"`,
          'requirementsOverTime',
          this.scope,
          { stackMode: 'stacked' }
        ),
        new Table(
          'alertsSummary',
          `${this.filters} rule.nist_800_53{}="$nist$"  | stats count by rule.nist_800_53{},rule.level,rule.description | sort count DESC |  rename rule.nist_800_53{} as "Requirement", rule.level as "Level", rule.description as "Description", count as "Count"`,
          'alertsSummary',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryTable',
          `${this.filters} rule.nist_800_53{}="$nist$"  | stats count by rule.nist_800_53{},rule.level,rule.description | sort count DESC |  rename rule.nist_800_53{} as "Requirement", rule.level as "Level", rule.description as "Description", count as "Count"`,
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
          'agents-nist',
          'NIST 800-53',
          this.filters,
          [
            'maxRuleLevel',
            'totalAlerts',
            'top10Requirements',
            'requirementsDistributedByLevel',
            'requirementsOverTime',
            'alertsSummary',
          ],
          {}, //Metrics,
          this.tableResults,
          this.agentReportData
        )

      this.scope.$on('loadingReporting', (event, data) => {
        this.scope.loadingReporting = data.status
      })

      this.scope.$on('checkReportingStatus', () => {
        this.vizzReady = !this.vizz.filter((v) => {
          return v.finish === false
        }).length
        if (this.vizzReady) {
          this.scope.loadingVizz = false
        } else {
          this.vizz.map((v) => {
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
  app.controller('agentsNistCtrl', AgentsNist)
})
