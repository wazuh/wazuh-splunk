define([
  '../../module',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/inputs/dropdown-input'
], function (app, ColumnChart, PieChart, Table, TimePicker, Dropdown) {
  'use strict'

  class AgentsGdpr {
    /**
     * Class constructor
     * @param {Object} $urlTokenModel
     * @param {Object} $scope
     * @param {Object} $currentDataService
     * @param {Object} $state
     * @param {Object} agent
     */

    constructor($urlTokenModel, $currentDataService, $scope, $state, agent) {
      this.scope = $scope
      this.state = $state
      this.currentDataService = $currentDataService
      if (this.agent && this.agent.data && this.agent.data.data && this.agent.data.data.id) this.currentDataService.addFilter(`{"agent.id":"${this.agent.data.data.id}", "implicit":true}`) 
      this.filters = this.currentDataService.getSerializedFilters()
      if (!$currentDataService.getCurrentAgent()) {
        this.state.go('overview')
      }
      this.agent = agent
      this.timePicker = new TimePicker(
        '#timePicker',
        $urlTokenModel.handleValueChange
      )

      this.dropdown = new Dropdown(
        'dropDownInput',
        `${
        this.filters
        } sourcetype=wazuh rule.gdpr{}=\"*\"| stats count by \"rule.gdpr{}\" | spath \"rule.gdpr{}\" | fields - count`,
        'rule.gdpr{}',
        '$form.gdpr$',
        'dropDownInput'
      )
      this.getFilters = this.currentDataService.getSerializedFilters
      this.dropdownInstance = this.dropdown.getElement()
      this.dropdownInstance.on('change', newValue => {
        if (newValue && this.dropdownInstance) {
          $urlTokenModel.handleValueChange(this.dropdownInstance)
        }
      })

      this.scope.gdprTabs = false

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
        new ColumnChart(
          'gdprRequirementsVizz',
          `${
          this.filters
          } sourcetype=wazuh rule.gdpr{}=\"$gdpr$\"  | stats count by rule.gdpr{}`,
          'gdprRequirementsVizz'
        ),
        new PieChart(
          'groupsVizz',
          `${
          this.filters
          } sourcetype=wazuh rule.gdpr{}=\"$gdpr$\" | stats count by rule.groups`,
          'groupsVizz'
        ),
        new PieChart(
          'agentsVizz',
          `${
          this.filters
          } sourcetype=wazuh rule.gdpr{}=\"$gdpr$\" | stats count by agent.name`,
          'agentsVizz'
        ),
        new ColumnChart(
          'requirementsByAgentVizz',
          `${
          this.filters
          } sourcetype=wazuh rule.gdpr{}=\"$gdpr$\" agent.name=*| chart  count(rule.gdpr{}) by rule.gdpr{},agent.name`,
          'requirementsByAgentVizz'
        ),
        new Table(
          'alertsSummaryVizz',
          `${
          this.filters
          } sourcetype=wazuh rule.gdpr{}=\"$gdpr$\" | stats count sparkline by agent.name, rule.gdpr{}, rule.description | sort count DESC | rename agent.name as \"Agent Name\", rule.gdpr{} as Requirement, rule.description as \"Rule description\", count as Count`,
          'alertsSummaryVizz'
        )
      ]

      /**
       * When controller is destroyed
       */
      this.scope.$on('$destroy', () => {
        this.timePicker.destroy()
        this.dropdown.destroy()
        this.vizz.map(vizz => vizz.destroy())
      })
    }

    $onInit() {
      this.scope.agent = (this.agent && this.agent.data && this.agent.data.data) ? this.agent.data.data : { error: true }
      this.scope.getAgentStatusClass = agentStatus => this.getAgentStatusClass(agentStatus)
      this.scope.formatAgentStatus = agentStatus => this.formatAgentStatus(agentStatus)
    }

    getAgentStatusClass(agentStatus) {
      return agentStatus === 'Active' ? 'teal' : 'red'
    }

    formatAgentStatus(agentStatus) {
      return ['Active', 'Disconnected'].includes(agentStatus)
        ? agentStatus
        : 'Never connected'
    }

    launchSearches() {
      this.filters = this.getFilters()
      this.state.reload()
    }
  }
  app.controller('agentsGdprCtrl', AgentsGdpr)
})
