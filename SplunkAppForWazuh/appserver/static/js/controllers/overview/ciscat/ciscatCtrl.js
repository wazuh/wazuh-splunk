define([
  '../../module',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/search/search-handler'
], function(app, ColumnChart, LinearChart, Table, TimePicker, SearchHandler) {
  'use strict';
  class Ciscat {
    constructor($urlTokenModel, $scope, $currentDataService, $state) {
      this.scope = $scope;
      this.state = $state;
      this.addFilter = $currentDataService.addFilter;
      this.getFilters = $currentDataService.getSerializedFilters;

      this.filters = this.getFilters();
      this.submittedTokenModel = $urlTokenModel.getSubmittedTokenModel();
      this.timePicker = new TimePicker(
        '#timePicker',
        $urlTokenModel.handleValueChange
      );

      this.scope.$on('deletedFilter', () => {
        this.launchSearches();
      });

      this.scope.$on('barFilter', () => {
        this.launchSearches();
      });

      this.vizz = [
        /**
         * Metrics
         */
        new SearchHandler(
          `lastNotChecked`,
          `${
            this.filters
          } | search data.cis.notchecked=* | table data.cis.notchecked | head 1`,
          `filesAddedToken`,
          '$result.data.cis.notchecked$',
          'lastNotChecked',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastPass`,
          `${
            this.filters
          } | search data.cis.pass=* | table data.cis.pass | head 1`,
          `lastPass`,
          '$result.data.cis.pass$',
          'lastPass',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastScanScore`,
          `${
            this.filters
          } | search data.cis.score=* | table data.cis.score | head 1`,
          `lastScanScore`,
          '$result.data.cis.score$',
          'lastScanScore',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastScanDate`,
          `${
            this.filters
          }  | search data.cis.timestamp=* | table data.cis.timestamp | head 1`,
          'lastScanDate',
          '$result.data.cis.timestamp$',
          'lastScanDate',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastErrors`,
          `${
            this.filters
          } | search data.cis.error=* | table data.cis.error | head 1`,
          'lastErrors',
          '$result.data.cis.error$',
          'lastErrors',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastFails`,
          `${
            this.filters
          } | search data.cis.fail=* | table data.cis.fail | head 1`,
          'lastFails',
          '$result.data.cis.fail$',
          'lastFails',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastUnknown`,
          `${
            this.filters
          } | search data.unknown.fail=* | table data.cis.unknown | head 1`,
          'lastUnknown',
          '$result.data.cis.unknown$',
          'lastUnknown',
          this.submittedTokenModel,
          this.scope
        ),
        new SearchHandler(
          `lastScanBenchmark`,
          `${
            this.filters
          } rule.groups=ciscat | search data.cis.benchmark=* | table data.cis.benchmark | head 1`,
          'lastScanBenchmark',
          '$result.data.cis.benchmark$',
          'lastScanBenchmark',
          this.submittedTokenModel,
          this.scope
        ),
        /**
         * Visualizations
         */
        new ColumnChart(
          'topCiscatGroups',
          `${
            this.filters
          } sourcetype=wazuh rule.groups=\"ciscat\" | top data.cis.group`,
          'topCiscatGroups'
        ),
        new LinearChart(
          'scanResultEvolution',
          `${
            this.filters
          } sourcetype=wazuh rule.groups=\"ciscat\" | timechart count by data.cis.result usenull=f`,
          'scanResultEvolution'
        ),
        new Table(
          'alertsSummary',
          `${
            this.filters
          } sourcetype=wazuh rule.groups=\"ciscat\" | stats count sparkline by data.cis.rule_title, data.cis.remediation,data.cis.group | sort count desc | rename "data.cis.rule_title" as "Title",  "data.cis.remediation" as "Remediation",  "data.cis.group" as "Group" `,
          'alertsSummary'
        )
      ];
    }
    $onInit() {
      this.addFilter(`{"rule.groups":"ciscat", "implicit":true}`);

      /**
       * On controller destroy
       */
      this.scope.$on('$destroy', () => {
        this.timePicker.destroy();
        this.vizz.map(vizz => vizz.destroy());
      });
    }

    launchSearches() {
      this.filters = $currentDataService.getSerializedFilters();
      this.state.reload();
    }
  }
  app.controller('ciscatCtrl', Ciscat);
});
