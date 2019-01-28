define(['../../../module'], function(controllers) {
    'use strict'
  
    class NavTabCtrl {
      constructor($scope, $navigationService) {
        this.$navigationService = $navigationService
        this.$scope = $scope
        this.$scope.tabName = ''
      }
  
      $onInit() {
        const lastState = this.$navigationService.getLastState()
        switch (lastState) {
          case 'mg-conf.overview':
            this.$scope.tabName = 'overview'
            this.$scope.sectionName = 'Overview'
            break
          case 'mg-conf.editConfig':
            this.$scope.tabName = 'editConfig'
            this.$scope.sectionName = 'Edit configuration'
            break
          case 'mg-conf.editRuleset':
            this.$scope.tabName = 'editRuleset'
            this.$scope.sectionName = 'Edit ruleset and CDB lists'
            break
          case 'mg-conf.editGroups':
            this.$scope.tabName = 'editGroups'
            this.$scope.sectionName = 'Edit groups configuration'
            break
        }
        this.$scope.switchTab = name => {
          this.$scope.tabName = name
        }
      }
    }
    controllers.controller('navTabCtrl', NavTabCtrl)
  })
  