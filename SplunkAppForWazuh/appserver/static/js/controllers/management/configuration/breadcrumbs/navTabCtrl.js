define(['../../../module'], function (controllers) {
  'use strict'

  class NavTabCtrl {
    constructor($scope, $navigationService, $requestService, $notificationService, isAdmin, clusterEnabled) {
      this.navigationService = $navigationService
      this.scope = $scope
      this.scope.tabName = ''
      this.isAdmin = isAdmin
      this.clusterEnabled = clusterEnabled
      this.apiReq = $requestService.apiReq
      this.toast = $notificationService.showSimpleToast
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
        if (!this.scope.$$phase) this.scope.$digest()
      }

      this.scope.restartManager = (node) => this.restartManager(node)
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

    async restartManager() {
      try {
        const node = this.clusterEnabled ? 'cluster' : 'manager'
        const result = await this.apiReq(`/${node}/restart`, {}, `PUT`)
        if (
          result &&
          result.data &&
          result.data.error === 0
        ) {
          this.toast('Restart signal sended successfully.')
        } else {
          throw new Error('Cannot send restart signal.')
        }
      } catch (error) {
        this.toast(error)
      }
    }

  }
  controllers.controller('navTabCtrl', NavTabCtrl)
})
