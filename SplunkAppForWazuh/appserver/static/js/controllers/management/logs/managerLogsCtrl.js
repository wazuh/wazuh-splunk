define(['../../module'], function (app) {
  
  'use strict'
  
  class Logs{
    constructor($scope,$requestService, $notificationService, logs){
      this.scope = $scope
      this.apiReq = $requestService.apiReq
      this.toast = $notificationService.showSimpleToast
      this.scope.type_log = 'all'
      this.scope.category = 'all'
      this.logs = logs
    }
    
    /**
    * On controller loads
    */
    $onInit(){
      try {
        this.scope.search = term => this.search(term)
        this.scope.filter = term => this.filter(term)
        this.scope.stopRealtime = () => this.stopRealtime()
        this.scope.playRealtime = () => this.playRealtime()
        this.scope.summary = this.logs.data.data
        return
      } catch (err) {
        this.toast('Cannot fetch logs data from server')
      }
    }
    
    /**
    * Searches by a term
    * @param {String} term 
    */
    search (term) {
      this.scope.$broadcast('wazuhSearch', { term })
      return
    }
    
    /**
    * Filters by a term
    * @param {Object} filter 
    */
    async filter(filter) {
      this.scope.$broadcast('wazuhFilter', { filter })
      return
    }
    
    /**
    * Starts fetching logs in real time
    */
    playRealtime () {
      this.scope.realtime = true
      this.scope.$broadcast('wazuhPlayRealTime')
      return
    }

    /**
    * Stops fetching logs in real time
    */
    stopRealtime () {
      this.scope.realtime = false
      this.scope.$broadcast('wazuhStopRealTime')
      return
    }
  }
  app.controller('managerLogsCtrl', Logs)
})
