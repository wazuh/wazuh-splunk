define(['../../../module'], function (controllers) {
  'use strict'

  class NavTabCtrl {
    constructor($scope, $restartService, $notificationService, $requestService, isAdmin, clusterEnabled) {
      this.scope = $scope
      this.scope.tabName = ''
      this.isAdmin = isAdmin
      this.clusterEnabled = clusterEnabled
      this.restartService = $restartService
      this.notification = $notificationService
      this.apiReq = $requestService.apiReq
    }

    $onInit() {
      this.scope.confirmingRestart = false
      this.scope.restartInProgress = false
      this.scope.isAdmin = this.isAdmin
      this.scope.node = this.clusterEnabled ? 'cluster' : 'manager'

      this.scope.restart = (node) => this.restart(node)
      this.scope.switchRestart = () => this.switchRestart()

      //Listen if restart response was received
      this.scope.$on('restartResponseReceived ', () => this.scope.restartInProgress = !this.scope.restartInProgress)
    }

    async restart(node = false) {
      try {
        this.scope.restartInProgress = true
        let result = ''
        if (this.clusterEnabled && node) {
          result = await this.restartService.restartNode(node)
        } else {
          result = await this.restartService.restart()
        }
        this.notification.showSimpleToast(result)
        this.refreshClusterStatus()
        this.scope.restartInProgress = false
      } catch (error) {
        this.notification.showErrorToast(error)
        this.scope.restartInProgress = false
      }
    }

    async refreshClusterStatus() {
      try {
        const clusterStatus = await this.apiReq('/cluster/status')
        this.clusterEnabled = clusterStatus.data.data.enabled === 'yes' && clusterStatus.data.data.running === 'yes' ? true : false
        this.scope.node = this.clusterEnabled ? 'cluster' : 'manager'
      } catch (error) {
        return Promise.reject(error)
      }
    }

    switchRestart() {
      this.scope.confirmingRestart = !this.scope.confirmingRestart
      this.scope.$applyAsync()
    }

  }
  controllers.controller('navTabCtrl', NavTabCtrl)
})
