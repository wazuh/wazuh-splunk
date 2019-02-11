define(['../../module', '../rules/ruleset'], function(controllers, Ruleset) {
    'use strict'
  
    class CDBList extends Ruleset {
      /**
       * Class cdb
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
          'cbd',
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
  
        this.scope.selectedNavTab = 'cdbList'
  
        this.scope.$on('loadedTable', () => {
          try {
            if (window.localStorage.cdb) {
              const parsedFilter = JSON.parse(window.localStorage.cdb)
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
    }
    controllers.controller('managerCdbCtrl', CDBList)
    return CDBList
  })
  