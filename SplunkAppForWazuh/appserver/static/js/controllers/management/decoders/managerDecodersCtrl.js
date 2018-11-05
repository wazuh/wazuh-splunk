define(['../../module', '../rules/ruleset'], function (controllers, Ruleset) {

  'use strict'

  class Decoders extends Ruleset {
    constructor($scope, $sce, $notificationService) {
      super($scope, $sce, $notificationService, 'decoders')
      this.scope.typeFilter = 'all'
    }

    /**
     * On controller load
     */
    $onInit() {
      // Reloading event listener
      this.scope.$broadcast('wazuhSearch', { term:'', removeFilters: true });
      this.scope.$on('decodersIsReloaded', () => {
        this.scope.viewingDetail = false
        if (!this.scope.$$phase) this.scope.$digest()
      })

      this.scope.onlyParents = (typeFilter) => this.onlyParents(typeFilter)

      this.scope.$on('wazuhShowDecoder', (event, parameters) => {
        this.scope.currentDecoder = parameters.decoder
        this.scope.viewingDetail = true
        if (!this.scope.$$phase) this.scope.$digest()
      })

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

    onlyParents(typeFilter) {
      this.scope.appliedFilters = []
      if (window.localStorage.decoders){
        delete window.localStorage.decoders
      }
      if (typeFilter === 'all') this.scope.$broadcast('wazuhUpdateInstancePath', { path: '/decoders' })
      else this.scope.$broadcast('wazuhUpdateInstancePath', { path: '/decoders/parents' })
    }
  }
  controllers.controller('managerDecodersCtrl', Decoders)
  return Decoders
})
