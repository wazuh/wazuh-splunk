define(['../../module', './ruleset'], function(controllers, Ruleset) {
  'use strict'

  class Rules extends Ruleset {
    /**
     * Class rules
     * @param {*} $scope
     * @param {*} $sce
     * @param {*} $notificationService
     * @param {*} $currentDataService
     * @param {*} $tableFilterService
     * @param {*} $csvRequestService
     */
    constructor(
      $scope,
      $sce,
      $notificationService,
      $currentDataService,
      $tableFilterService,
      $csvRequestService
    ) {
      super(
        $scope,
        $sce,
        $notificationService,
        'ruleset',
        $currentDataService,
        $tableFilterService,
        $csvRequestService
      )
    }

    /**
     * On controller load
     */
    $onInit() {
      this.scope.downloadCsv = (path, name) => this.downloadCsv(path, name)
      this.scope.$broadcast('wazuhSearch', { term: '', removeFilters: true })

      this.scope.selectedNavTab = 'rules'

      this.scope.$on('loadedTable', () => {
        try {
          if (window.localStorage.ruleset) {
            const parsedFilter = JSON.parse(window.localStorage.ruleset)
            this.scope.appliedFilters = parsedFilter
            if (this.filter.length > 0) {
              this.scope.$broadcast('wazuhFilter', { filter: this.filter })
            }
          }
        } catch (err) {
          this.toast('Error applying filter')
        }
      })

      this.scope.$on('rulesetIsReloaded', () => {
        this.scope.viewingDetail = false
        if (!this.scope.$$phase) this.scope.$digest()
      })

      this.scope.$on('wazuhShowRule', () => {
        this.scope.viewingDetail = true
        if (!this.scope.$$phase) this.scope.$digest()
      })
    }
  }
  controllers.controller('managerRulesetCtrl', Rules)
  return Rules
})
