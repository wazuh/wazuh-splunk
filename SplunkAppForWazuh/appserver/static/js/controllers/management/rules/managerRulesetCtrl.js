define(['../../module','./ruleset'], function (controllers,Ruleset) {
  
  'use strict'
  
  class Rules extends Ruleset{
    constructor($scope, $sce, $notificationService) {
     super($scope,$sce,$notificationService,'ruleset')
     this.scope = $scope
    }
    
    /**
     * On controller load
     */
    $onInit() {
      this.scope.$on('loadedTable', () => {
        try{
          if (window.localStorage.ruleset) {
            const parsedFilter = JSON.parse(window.localStorage.ruleset)
            this.scope.appliedFilters = parsedFilter
            if (this.filter.length > 0){
              this.scope.$broadcast('wazuhFilter', { filter: this.filter })
            }
          }
        } catch(err) {
          console.error('err',err)
          this.toast('Error applying filter')
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
