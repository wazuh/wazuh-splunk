define([
  '../../module',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/inputs/dropdown-input'
], function(app, ColumnChart, PieChart, TimePicker, Dropdown) {
  'use strict'
  class OverviewGDPR {
    /**
     * 
     * @param {*} $urlTokenModel 
     * @param {*} $scope 
     * @param {*} $currentDataService 
     * @param {*} $state 
     */
    constructor($urlTokenModel, $scope, $currentDataService, $state) {
      this.scope = $scope
      this.state = $state
      this.getFilters = $currentDataService.getSerializedFilters
      this.filters = this.getFilters()
      this.scope.$on('deletedFilter', () => {
        this.launchSearches()
      })

      this.scope.$on('barFilter', () => {
        this.launchSearches()
      })

      this.timePicker = new TimePicker(
        '#timePicker',
        $urlTokenModel.handleValueChange
      )
      this.dropdown = new Dropdown(
        'dropDownInputAgent',
        `${
          this.filters
        } sourcetype=wazuh rule.gdpr{}="*"| stats count by "rule.gdpr{}" | spath "rule.gdpr{}" | fields - count`,
        'rule.gdpr{}',
        '$form.gdpr$',
        'dropDownInput'
      )

      this.dropdownInstance = this.dropdown.getElement()
      this.dropdownInstance.on('change', newValue => {
        if (newValue && this.dropdownInstance) {
          $urlTokenModel.handleValueChange(this.dropdownInstance)
        }
      })

      this.vizz = [
        /**
         * Visualizations
         */
        new ColumnChart(
          'gdprRequirements',
          `${
            this.filters
          } sourcetype=wazuh rule.gdpr{}="$gdpr$"  | stats count by rule.gdpr{}`,
          'gdprRequirements'
        ),
        new PieChart(
          'groupsViz',
          `${
            this.filters
          } sourcetype=wazuh rule.gdpr{}="$gdpr$" | stats count by rule.groups`,
          'groupsViz'
        ),
        new PieChart(
          'agentsViz',
          `${
            this.filters
          } sourcetype=wazuh rule.gdpr{}="$gdpr$" | stats count by agent.name`,
          'agentsViz'
        ),
        new ColumnChart(
          'requirementsByAgents',
          `${
            this.filters
          } sourcetype=wazuh rule.gdpr{}="$gdpr$" agent.name=*| chart  count(rule.gdpr{}) by rule.gdpr{},agent.name`,
          'requirementsByAgents'
        ),
        new ColumnChart(
          'alertsSummaryViz',
          `${
            this.filters
          } sourcetype=wazuh rule.gdpr{}="$gdpr$" | stats count sparkline by agent.name, rule.gdpr{}, rule.description | sort count DESC | rename agent.name as "Agent Name", rule.gdpr{} as Requirement, rule.description as "Rule description", count as Count`,
          'alertsSummaryViz'
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

    /**
     * Get filters and launches the search
     */
    launchSearches() {
      this.filters = this.getFilters()
      this.state.reload()
    }
  }
  app.controller('overviewGdprCtrl', OverviewGDPR)
})
