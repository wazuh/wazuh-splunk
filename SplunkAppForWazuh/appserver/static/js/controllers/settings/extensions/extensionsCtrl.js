define([
  '../../module',
], function (
  controllers
  ) {
    'use strict'
    
    class Extensions{
      constructor($scope, $currentDataService, apiList, $notificationService) {
        this.scope = $scope
      }
      
      $onInit(){
        
        
      }
      
    }
    controllers.controller('extensionsCtrl', Extensions)
  })
  
  