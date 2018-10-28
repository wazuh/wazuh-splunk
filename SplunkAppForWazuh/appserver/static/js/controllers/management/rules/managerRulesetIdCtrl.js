define(['../../module','./ruleset'], function (controllers, Ruleset) {
  
  'use strict'
  
  class RulesetId extends Ruleset {
    constructor($scope, $sce, $notificationService, $state, ruleInfo) {
      super($scope,$sce,$notificationService)
      //this.scope = $scope
      this.state = $state
      try {
        this.filters = JSON.parse(window.localStorage.ruleset) || []
      } catch(err){ this.filters = [] }
      
      this.scope.ruleInfo = ruleInfo.data.data.items[0]
    }
    
    $onInit(){
      console.log('ON INIT')
      //this.scope.colorRuleArg = (ruleArg) => super.colorRuleArg(ruleArg)
      this.scope.addDetailFilter = (name,value) => this.addDetailFilter(name,value)
    }
    
    addDetailFilter (name, value) {
      try{
        const filter = { name: name, value: value }
        this.filters.push(filter)
        window.localStorage.setItem('ruleset', JSON.stringify(this.filters))
        this.state.go('mg-rules')
      } catch(err) {
        this.toast(err.message || err)
      }
    }
    
  }
  controllers.controller('managerRulesetIdCtrl', RulesetId)
})