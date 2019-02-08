define(['../../../module'], function (controllers) {
  'use strict'

  class NavTabCtrl {
    constructor($scope, $navigationService, $restartService, $notificationService, $requestService, isAdmin, clusterEnabled) {
      this.navigationService = $navigationService
      this.scope = $scope
      this.scope.tabName = ''
      this.isAdmin = isAdmin
      this.clusterEnabled = clusterEnabled
      this.restartService = $restartService
      this.toast = $notificationService.showSimpleToast
      this.apiReq = $requestService.apiReq
    }

    $onInit() {
      this.scope.isAdmin = this.isAdmin
      this.scope.node = this.clusterEnabled ? 'cluster' : 'manager'

      const lastState = this.navigationService.getLastState()
      switch (lastState) {
        case 'mg-conf.overview':
          this.scope.sectionName = 'Overview'
          this.scope.tabName = 'overview'
          if (!this.scope.$$phase) this.scope.$digest()
          break
        case 'mg-conf.editConfig':
          this.scope.sectionName = 'Edit configuration'
          this.scope.tabName = 'editConfig'
          if (!this.scope.$$phase) this.scope.$digest()
          break
        case 'mg-conf.editRuleset':
          this.scope.sectionName = 'Edit ruleset and CDB lists'
          this.scope.tabName = 'editRuleset'
          if (!this.scope.$$phase) this.scope.$digest()
          break
        case 'mg-conf.editGroups':
          this.scope.sectionName = 'Edit groups configuration'
          this.scope.tabName = 'editGroups'
          if (!this.scope.$$phase) this.scope.$digest()
          break
      }
      this.scope.switchTab = name => {
        this.scope.sectionName = this.getSectionName(name)
        this.scope.tabName = name
        this.refreshClusterStatus()
        if (!this.scope.$$phase) this.scope.$digest()
      }

      this.scope.restart = (node) => this.restart(node)
    }

    getSectionName(name) {
      let sectionName = ''
      switch (name) {
        case 'overview':
          sectionName = 'Overview'
          break
        case 'editConfig':
          sectionName = 'Edit configuration'
          break
        case 'editRuleset':
          sectionName = 'Edit ruleset and CDB lists'
          break
        case 'editGroups':
          sectionName = 'Edit groups configuration'
          break
      }
      return sectionName
    }

    async restart(node = false) {
      try {
        let result = ''
        if (this.clusterEnabled && node) {
          result = await this.restartService.restartNode(node)
        } else {
          result = await this.restartService.restart()
        }
        this.toast(result)
        this.refreshClusterStatus()
      } catch (error) {
        this.toast(error)
      }
    }

    async refreshClusterStatus(){
      try {
        const clusterStatus = await this.apiReq('/cluster/status')
        this.clusterEnabled = clusterStatus.data.data.enabled === 'yes' && clusterStatus.data.data.running === 'yes' ? true : false
        this.scope.node = this.clusterEnabled ? 'cluster' : 'manager'
      } catch (error) {
        return Promise.reject(error)
      }

    }

  }
  controllers.controller('navTabCtrl', NavTabCtrl)
})
