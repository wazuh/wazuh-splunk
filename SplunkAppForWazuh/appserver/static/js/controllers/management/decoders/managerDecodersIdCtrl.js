define(['../../module', '../rules/ruleset'], function(controllers, Ruleset) {
  'use strict';

  class DecodersId extends Ruleset {
    constructor(
      $scope,
      $sce,
      $notificationService,
      $state,
      currentDecoder,
      $currentDataService,
      $tableFilterService,
      $csvRequestService
    ) {
      super(
        $scope,
        $sce,
        $notificationService,
        'decoders',
        $currentDataService,
        $tableFilterService,
        $csvRequestService
      );
      this.state = $state;
      try {
        this.filters = JSON.parse(window.localStorage.decoders) || [];
      } catch (err) {
        this.filters = [];
      }

      this.scope.currentDecoder = currentDecoder.data.data.items[0];
    }

    $onInit() {
      this.scope.downloadCsv = (path, name) => this.downloadCsv(path, name);
      this.scope.addDetailFilter = (name, value) =>
        this.addDetailFilter(name, value);
    }

    /**
     * Adds a filter
     * @param {String} name
     * @param {String} value
     */
    addDetailFilter(name, value) {
      try {
        const filter = { name: name, value: value };
        this.filters.push(filter);
        window.localStorage.setItem('decoders', JSON.stringify(this.filters));
        this.state.go('mg-decoders');
      } catch (err) {
        this.toast(err.message || err);
      }
    }
  }
  controllers.controller('managerDecodersIdCtrl', DecodersId);
});
