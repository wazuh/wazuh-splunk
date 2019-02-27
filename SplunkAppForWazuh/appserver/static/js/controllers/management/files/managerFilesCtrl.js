define([
  '../../module',
], function (
  controllers,
  ) {
    'use strict'
    class Files {
      /**
       * Class Files
       * @param {*} $scope
       * @param {*} $notificationService
       * @param {*} $currentDataService
       * @param {*} isAdmin
       * @param {*} localRules
       * @param {*} localDecoders
       * @param {*} cdbLists
       */
      constructor(
        $scope,
        $notificationService,
        $currentDataService,
        isAdmin,
        $restartService,
      ) {
        this.scope = $scope
        this.notification = $notificationService
        this.currentDataService = $currentDataService
        this.isAdmin = isAdmin
        this.restartService = $restartService
      }

      /**
       * On controller load
       */
      $onInit() {
        this.scope.$broadcast('wazuhSearch', { term: '', removeFilters: true })
        this.scope.selectedNavTab = 'files'
        this.scope.selectedSubNavTab = 'rules'
        this.scope.adminMode = this.isAdmin

        this.scope.switchSubTab = (tab) => this.switchSubTab(tab)
        this.scope.search = term => this.search(term)

      }

      /**
       * Switch between subtabs
       * @param {String} tab 
       */
      switchSubTab(tab) {
        this.scope.selectedSubNavTab = tab
      }

      /**
       * Searches a rule
       * @param {String} term
       */
      search(term) {
        if (!term) term = ''
        this.scope.$broadcast('wazuhSearch', { term, removeFilters: false })
        return
      }
      
    }
    controllers.controller('managerFilesCtrl', Files)
    return Files
  })
