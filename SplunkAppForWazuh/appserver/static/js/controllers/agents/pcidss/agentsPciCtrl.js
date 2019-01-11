define([
  '../../module',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/inputs/dropdown-input',
  '../../../services/rawTableData/rawTableDataService'
], function(
  app,
  ColumnChart,
  PieChart,
  Table,
  TimePicker,
  Dropdown,
  rawTableDataService
) {
  'use strict'

  class AgentsPCI {
    /**
     * Class Agents PCI-DSS
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
      $reportingService
    ) {
      this.state = $state
      this.reportingService = $reportingService
      this.tableResults = {}
      this.currentDataService = $currentDataService
      this.scope = $scope
      this.urlTokenModel = $urlTokenModel
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

      this.scope.$on('$destroy', () => {
        this.dropdown.destroy()
        this.timePicker.destroy()
        this.vizz.map(vizz => vizz.destroy())
      })

      this.dropdown = new Dropdown(
        'dropDownInput',
        `${
          this.filters
        } sourcetype=wazuh rule.pci_dss{}="*"| stats count by "rule.pci_dss{}" | sort "rule.pci_dss{}" ASC | fields - count`,
        'rule.pci_dss{}',
        '$form.pci$',
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
          'pciReqSearchVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.pci_dss{}="$pci$"  | stats count by rule.pci_dss{}`,
          'pciReqSearchVizz',
          this.scope
        ),
        new PieChart(
          'groupsVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.pci_dss{}="$pci$" | stats count by rule.groups`,
          'groupsVizz',
          this.scope
        ),
        new PieChart(
          'agentsVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.pci_dss{}="$pci$" | stats count by agent.name`,
          'agentsVizz',
          this.scope
        ),
        new ColumnChart(
          'reqByAgentsVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.pci_dss{}="$pci$" agent.name=*| chart  count(rule.pci_dss{}) by rule.pci_dss{},agent.name`,
          'reqByAgentsVizz',
          this.scope
        ),
        new Table(
          'alertsSummaryVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.pci_dss{}="$pci$" | stats count sparkline by agent.name, rule.pci_dss{}, rule.description | sort count DESC | rename agent.name as "Agent Name", rule.pci_dss{} as Requirement, rule.description as "Rule description", count as Count`,
          'alertsSummaryVizz',
          this.scope
        )
      ]

      this.alertsSummaryTable = new rawTableDataService(
        'alertsSummaryTable',
        `${
          this.filters
        } sourcetype=wazuh rule.pci_dss{}="$pci$" | stats count sparkline by agent.name, rule.pci_dss{}, rule.description | sort count DESC | rename agent.name as "Agent Name", rule.pci_dss{} as Requirement, rule.description as "Rule description", count as Count`,
        'alertsSummaryTableToken',
        '$result$',
        this.scope
      )
      this.vizz.push(this.alertsSummaryTable)

      this.alertsSummaryTable.getSearch().on('result', result => {
        this.tableResults['Alerts Summary'] = result
      })

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
          'agents-pci',
          'PCI DSS',
          this.filters,
          [
            'pciReqSearchVizz',
            'groupsVizz',
            'agentsVizz',
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
          this.scope.loadingVizz = true
        }
        if (!this.scope.$$phase) this.scope.$digest()
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
        this.getAgentStatusClass(agentStatus)
      this.scope.formatAgentStatus = agentStatus =>
        this.formatAgentStatus(agentStatus)
    }

    /**
     * Gets filters and launches search
     */
    launchSearches() {
      this.filters = this.currentDataService.getSerializedFilters()
      this.state.reload()
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
  app.controller('agentsPciCtrl', AgentsPCI)
})
