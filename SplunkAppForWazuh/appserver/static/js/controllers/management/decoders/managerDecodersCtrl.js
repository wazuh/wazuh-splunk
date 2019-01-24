define(['../../module', '../rules/ruleset'], function(controllers, Ruleset) {
  'use strict'

  class Decoders extends Ruleset {
    /**
     * Class Decoders
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
        'decoders',
        $currentDataService,
        $tableFilterService,
        $csvRequestService
      )
      this.scope.typeFilter = 'all'
    }

    /**
     * On controller load
     */
    $onInit() {
      this.localFilterEnabled = false
      // Reloading event listener
      this.scope.$broadcast('wazuhSearch', { term: '', removeFilters: true })
      this.scope.downloadCsv = (path, name) => this.downloadCsv(path, name)
      this.scope.onlyParents = typeFilter => this.onlyParents(typeFilter)

      this.scope.selectedNavTab = 'decoders'
      this.scope.filterButtonTag = 'Local decoders'
      this.scope.filterByLocal = () => this.filterByLocal()

      this.scope.$on('loadedTable', () => {
        try {
          if (window.localStorage.decoders) {
            const parsedFilter = JSON.parse(window.localStorage.decoders)
            this.scope.appliedFilters = parsedFilter
            if (this.filter.length > 0)
              this.scope.$broadcast('wazuhFilter', { filter: this.filter })
          }
        } catch (err) {
          this.toast('Error applying filter')
        }
      })
    }

    /**
     * Cleans filters
     * @param {String} typeFilter
     */
    onlyParents(typeFilter) {
      this.scope.appliedFilters = []
      if (window.localStorage.decoders) {
        delete window.localStorage.decoders
      }
      if (typeFilter === 'all')
        this.scope.$broadcast('wazuhUpdateInstancePath', { path: '/decoders' })
      else
        this.scope.$broadcast('wazuhUpdateInstancePath', {
          path: '/decoders/parents'
        })
    }

    filterByLocal() {
      if (this.localFilterEnabled) {
        this.localFilterEnabled = false
        this.scope.filterButtonTag = 'Local decoders'
        this.scope.$broadcast('wazuhRemoveFilter', { filterName: 'path' })
      } else {
        this.localFilterEnabled = true
        this.scope.filterButtonTag = 'All decoders'
        this.scope.$broadcast('wazuhFilter', {
          filter: {
            name: 'path',
            value: '/var/ossec/etc/decoders'
          }
        })
      }
    }
  }
  controllers.controller('managerDecodersCtrl', Decoders)
  return Decoders
})
