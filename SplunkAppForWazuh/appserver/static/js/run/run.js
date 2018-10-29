define(['./module'], function (module) {
  'use strict'
  module.run([
    '$rootScope', '$state', '$transitions', '$navigationService', '$currentDataService',
    function ($rootScope, $state, $transitions, $navigationService, $currentDataService) {

      async function checkBeforeTransition(route){
        try{
          const { api, selectedIndex } = await $currentDataService.checkSelectedApiConnection()
          $currentDataService.setApi(api)
          $currentDataService.cleanFilters()
          $navigationService.storeRoute(route)
          $currentDataService.addFilter(`{"${api.filterType}":"${api.filterName}", "implicit":true}`)
          $currentDataService.addFilter(`{"index":"${$currentDataService.getIndex().index}", "implicit":true}`)
          $rootScope.$broadcast('stateChanged', route)
        }catch (err){
          $rootScope.$broadcast('loading', { status: false })
          if (route != 'settings.api')
          $state.go('settings.api')
        }
      }

      $navigationService.goToLastState()
      
      $transitions.onSuccess({}, async (trans) => {
        $rootScope.$broadcast('loading', { status: false })
      })
      
      $transitions.onStart({}, function(transition) {
        if (transition.to().name.includes('ag-') || transition.to().name.includes('agent')) {
          $rootScope.$broadcast('stateChanged', 'agents')
        } else if(transition.to().name.includes('mg-')) {
          $rootScope.$broadcast('stateChanged', 'manager')
        } else if(transition.to().name.includes('ow-')) {
          $rootScope.$broadcast('stateChanged', 'overview')
        }
      })
      
      $transitions.onStart({}, async (trans) => {
        $rootScope.$broadcast('loading', { status: true })
      })
      
      $transitions.onStart({ to: 'dev-tools' }, async (trans) => {
        checkBeforeTransition('dev-tools')
      })
      
      $transitions.onStart({ to: 'settings.api' }, async (trans) => {
        checkBeforeTransition('settings.api')
      })
      
      $transitions.onStart({ to: 'manager' }, async (trans) => {
        checkBeforeTransition('manager')
      })
      
      $transitions.onStart({ to: 'overview' }, async (trans) => {
        checkBeforeTransition('overview')
      })
      
      $transitions.onStart({ to: 'agents' }, async (trans) => {
        checkBeforeTransition('agents')
      })
      
    }])
  })