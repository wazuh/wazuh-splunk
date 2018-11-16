define([
  '../../module',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker'
], function(app, PieChart, AreaChart, Table, TimePicker) {
  'use strict';
  class PM {
    constructor($urlTokenModel, $scope, $currentDataService, $state) {
      this.scope = $scope;
      this.urlTokenModel = $urlTokenModel;
      this.state = $state;
      this.getFilters = $currentDataService.getSerializedFilters;
      this.filters = this.getFilters();
      this.timePicker = new TimePicker(
        '#timePicker',
        this.urlTokenModel.handleValueChange
      );
      this.vizz = [
        /**
         * Visualizations
         */
        new AreaChart(
          'elementOverTime',
          `${
            this.filters
          } sourcetype=wazuh \"rule.groups\"=\"rootcheck\" rule.description=* | timechart span=1h count by rule.description`,
          'elementOverTime'
        ),
        new PieChart(
          'cisRequirements',
          `${
            this.filters
          } sourcetype=wazuh \"rule.groups\"=\"rootcheck\" rule.cis{}=* | top  rule.cis{}`,
          'cisRequirements'
        ),
        new PieChart(
          'topPciDss',
          `${
            this.filters
          } sourcetype=wazuh \"rule.groups\"=\"rootcheck\" rule.pci_dss{}=* | top  rule.pci_dss{}`,
          'topPciDss'
        ),
        new AreaChart(
          'eventsPerAgent',
          `${
            this.filters
          } sourcetype=wazuh \"rule.groups\"=\"rootcheck\" | timechart span=2h count by agent.name`,
          'eventsPerAgent'
        ),
        new Table(
          'alertsSummary',
          `${
            this.filters
          } sourcetype=wazuh \"rule.groups\"=\"rootcheck\" |stats count sparkline by agent.name, rule.description, title | sort count DESC | rename rule.description as \"Rule description\", agent.name as Agent, title as Control`,
          'alertsSummary'
        )
      ];

      this.scope.$on('deletedFilter', () => {
        this.launchSearches();
      });

      this.scope.$on('barFilter', () => {
        this.launchSearches();
      });
      /**
       * On controller destroy
       */
      this.scope.$on('$destroy', () => {
        this.timePicker.destroy();
        this.vizz.map(vizz => vizz.destroy());
      });
    }

    launchSearches() {
      this.filters = this.getFilters();
      this.state.reload();
    }
  }
  app.controller('overviewPolicyMonitoringCtrl', PM);
});
