define(['../../module','./ruleset'], function (controllers,Ruleset) {
  
  'use strict'
  
  class Rules extends Ruleset{
    constructor($scope, $sce, $notificationService) {
     console.log('constructor rules class')
     super($scope,$sce,$notificationService,'ruleset')
     this.scope = $scope
    }
    
    /**
     * On controller load
     */
    $onInit() {
      //this.scope.search = term => super.search(term)
      this.scope.$on('loadedTable', () => {
        try{
          console.log('loadedtable ')
          if (window.localStorage.ruleset) {
            console.log('localstorage.ruleset ',window.localStorage.ruleset)
            const parsedFilter = JSON.parse(window.localStorage.ruleset)
            this.scope.appliedFilters = parsedFilter
            if (this.filter.length > 0){
              this.scope.$broadcast('wazuhFilter', { filter: this.filter })
            }
          }
        } catch(err) {
          console.error('err',err)
          super.toast('Error applying filter')
        }
      })
      
      this.scope.$on('rulesetIsReloaded', () => {
        this.scope.viewingDetail = false
        if (!this.scope.$$phase) this.scope.$digest()
      })
      
      this.scope.$on('wazuhShowRule', (event, parameters) => {
        this.scope.currentRule = parameters.rule
        this.scope.viewingDetail = true
        if (!this.scope.$$phase) this.scope.$digest()
      })
    }
  }
  controllers.controller('managerRulesetCtrl', Rules)
  return Rules
})
