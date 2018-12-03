define([
  '../../module',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/inputs/dropdown-input'
], function(app, ColumnChart, PieChart, Table, TimePicker, Dropdown) {
  'use strict'

  class AgentsPCI {
    constructor($urlTokenModel, $scope, $state, $currentDataService, agent) {
      this.state = $state
      this.currentDataService = $currentDataService
      this.scope = $scope
      this.urlTokenModel = $urlTokenModel
      this.filters = this.currentDataService.getSerializedFilters()
      this.addFilter = this.currentDataService.addFilter
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
        } sourcetype=wazuh rule.pci_dss{}=\"*\"| stats count by \"rule.pci_dss{}\" | sort \"rule.pci_dss{}\" ASC | fields - count`,
        'rule.pci_dss{}',
        '$form.pci$',
        'dropDownInput'
      )
      this.dropdownInstance = this.dropdown.getElement()
      this.dropdownInstance.on('change', newValue => {
        if (newValue && this.dropdownInstance)
          $urlTokenModel.handleValueChange(this.dropdownInstance)
      })
      this.agent = agent
      this.vizz = [
        /**
         * Visualizations
         */
        new ColumnChart(
          'pciReqSearchVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.pci_dss{}=\"$pci$\"  | stats count by rule.pci_dss{}`,
          'pciReqSearchVizz'
        ),
        new PieChart(
          'groupsVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.pci_dss{}=\"$pci$\" | stats count by rule.groups`,
          'groupsVizz'
        ),
        new PieChart(
          'agentsVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.pci_dss{}=\"$pci$\" | stats count by agent.name`,
          'agentsVizz'
        ),
        new ColumnChart(
          'reqByAgentsVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.pci_dss{}=\"$pci$\" agent.name=*| chart  count(rule.pci_dss{}) by rule.pci_dss{},agent.name`,
          'reqByAgentsVizz'
        ),
        new Table(
          'alertsSummaryVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.pci_dss{}=\"$pci$\" | stats count sparkline by agent.name, rule.pci_dss{}, rule.description | sort count DESC | rename agent.name as \"Agent Name\", rule.pci_dss{} as Requirement, rule.description as \"Rule description\", count as Count`,
          'alertsSummaryVizz'
        )
      ]
    }

    $onInit() {
      this.scope.agent = (this.agent && this.agent.data && this.agent.data.data) ? this.agent.data.data : { error: true }
      if (this.scope.agent.id) this.addFilter(`{"agent.id":"${this.scope.agent.id}", "implicit":true}`)
      this.scope.getAgentStatusClass = agentStatus => this.getAgentStatusClass(agentStatus)
      this.scope.formatAgentStatus = agentStatus => this.formatAgentStatus(agentStatus)
    }
    
    launchSearches() {
      this.filters = this.currentDataService.getSerializedFilters()
      this.state.reload()
    }

    getAgentStatusClass(agentStatus) {
      return agentStatus === 'Active' ? 'teal' : 'red'
    }

    formatAgentStatus(agentStatus) {
      return ['Active', 'Disconnected'].includes(agentStatus)
        ? agentStatus
        : 'Never connected'
    }

  }
  app.controller('agentsPciCtrl', AgentsPCI)
})
