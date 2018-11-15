define([
  '../../module',
  'FileSaver'
], function (app) {

  'use strict'

  class Logs {
    constructor($scope, $requestService, $tableFilterService, $notificationService, $currentDataService, $csvRequestService, logs) {
      this.scope = $scope
      this.apiReq = $requestService.apiReq
      this.toast = $notificationService.showSimpleToast
      this.scope.type_log = 'all'
      this.scope.category = 'all'
      this.api = $currentDataService.getApi()
      this.logs = logs
      this.csvReq = $csvRequestService
      this.wzTableFilter = $tableFilterService

    }

    /**
    * On controller loads
    */
    $onInit() {
      try {
        this.scope.search = term => this.search(term)
        this.scope.filter = term => this.filter(term)
        this.scope.stopRealtime = () => this.stopRealtime()
        this.scope.playRealtime = () => this.playRealtime()
        this.scope.summary = this.logs.data.data
        this.scope.downloadCsv = () => this.downloadCsv()


        return
      } catch (err) {
        this.toast('Cannot fetch logs data from server')
      }
    }

    /**
     * Exports the table in CSV format
     */
    async downloadCsv() {
      try {
        this.toast('Your download should begin automatically...')
        const currentApi = this.api.id
        const output = await this.csvReq.fetch(
          '/manager/logs',
          currentApi,
          this.wzTableFilter.get()
        )
        if (output.length > 0) {
          const blob = new Blob([output], { type: 'text/csv' }) // eslint-disable-line
          saveAs(blob, 'logs.csv')
        } else {
          this.toast('Empty results.')
        }
        return
      } catch (error) {
        console.error('error ', error)
        this.toast('Error downloading CSV')
      }
      return
    }

    /**
    * Searches by a term
    * @param {String} term 
    */
    search(term) {
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
    playRealtime() {
      this.scope.realtime = true
      this.scope.$broadcast('wazuhPlayRealTime')
      return
    }

    /**
    * Stops fetching logs in real time
    */
    stopRealtime() {
      this.scope.realtime = false
      this.scope.$broadcast('wazuhStopRealTime')
      return
    }
  }
  app.controller('managerLogsCtrl', Logs)
})
