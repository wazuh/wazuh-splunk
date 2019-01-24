define(['../../module', './ruleset'], function (controllers, Ruleset) {
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
      this.localFilterEnabled = false
      this.scope.downloadCsv = (path, name) => this.downloadCsv(path, name)
      this.scope.$broadcast('wazuhSearch', { term: '', removeFilters: true })

      this.scope.selectedNavTab = 'rules'
      this.scope.filterButtonTag = 'Local rules'
      this.scope.filterByLocal = () => this.filterByLocal()

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
    }

    filterByLocal() {
      if (this.localFilterEnabled) {
        this.localFilterEnabled = false
        this.scope.filterButtonTag = 'Local rules'
        this.scope.$broadcast('wazuhRemoveFilter', { filterName: 'path' })
      } else {
        this.localFilterEnabled = true
        this.scope.filterButtonTag = 'All rules'
        this.scope.$broadcast('wazuhFilter', {
          filter: {
            name: 'path',
            value: '/var/ossec/etc/rules'
          }
        })
      }
    }
  }
  controllers.controller('managerRulesetCtrl', Rules)
  return Rules
})
