define(['./module'], function (module) {
  'use strict'
  module.run([
    '$rootScope', '$state', '$transitions', '$navigationService', '$currentDataService',
    function ($rootScope, $state, $transitions, $navigationService, $currentDataService) {

      async function checkBeforeTransition(state){
        try{
          const { api, selectedIndex } = await $currentDataService.checkSelectedApiConnection()
          $currentDataService.setApi(api)
          $currentDataService.cleanFilters()
          $navigationService.storeRoute(state.label)
          $currentDataService.addFilter(`{"${api.filterType}":"${api.filterName}", "implicit":true}`)
          $currentDataService.addFilter(`{"index":"${$currentDataService.getIndex().index}", "implicit":true}`)
          $rootScope.$broadcast('stateChanged', state.state)
        }catch (err){
          $rootScope.$broadcast('loading', { status: false })
          if (state.label != 'settings.api')
          $rootScope.$broadcast('stateChanged', 'settings')
          $state.go('settings.api')
        }
      }

      $navigationService.goToLastState()
      
      $transitions.onSuccess({}, async (trans) => {
        $rootScope.$broadcast('loading', { status: false })
      })
      
      
      $transitions.onStart({}, async (trans) => {
        $rootScope.$broadcast('loading', { status: true })
        //Primary states
        if ( trans.to().name === 'dev-tools' ) { checkBeforeTransition({label: 'dev-tools', state: 'dev-tools'}) }
        if ( trans.to().name === 'settings.api' ) { checkBeforeTransition({label: 'settings.api', state: 'settings'}) }
        if ( trans.to().name === 'agents' ) { checkBeforeTransition({label: 'agents', state: 'agents'}) }
        if ( trans.to().name === 'overview' ) { checkBeforeTransition({label: 'overview', state: 'overview'}) }
        if ( trans.to().name === 'manager' ) { checkBeforeTransition({label: 'manager', state: 'manager'}) }
        //Secondary states
        if ( trans.to().name.includes('agent') || trans.to().name.includes('ag-') ) {
          $rootScope.$broadcast('stateChanged', 'agents')
        } else if ( trans.to().name.includes('overview') || trans.to().name.includes('ow-') ) {
          $rootScope.$broadcast('stateChanged', 'overview') 
        } else if ( trans.to().name.includes('manager') || trans.to().name.includes('mg-') ) {
          $rootScope.$broadcast('stateChanged', 'manager')
        }
      })     
    }])
  })