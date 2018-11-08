define(['./module'], function (module) {
  'use strict'
  module.run([
    '$rootScope', '$state', '$transitions', '$navigationService', '$currentDataService',
    function ($rootScope, $state, $transitions, $navigationService, $currentDataService) {
    
      //Go to last state at login
      $navigationService.goToLastState()

      async function checkBeforeTransition(state){
        try{
          const { api, selectedIndex } = await $currentDataService.checkSelectedApiConnection()
          $currentDataService.setApi(api)
          $currentDataService.cleanFilters()
          $navigationService.storeRoute(state.label)
          $currentDataService.addFilter(`{"${api.filterType}":"${api.filterName}", "implicit":true}`)
          $currentDataService.addFilter(`{"index":"${$currentDataService.getIndex().index}", "implicit":true}`)
        }catch (err){
          $rootScope.$broadcast('loading', { status: false })
          if (state.label != 'settings.api')
          $rootScope.$broadcast('stateChanged', 'settings')
          $state.go('settings.api')
        }
      }

      $transitions.onBefore({}, async (trans) => {
        $rootScope.$broadcast('loading: ', { status: true })        
      })

      $transitions.onStart({}, async (trans) => {
        $rootScope.$broadcast('loading', { status: true })
        //Primary states
        if ( trans.to().name === 'dev-tools' ) { await checkBeforeTransition({label: 'dev-tools', state: 'dev-tools'}) }
        if ( trans.to().name === 'settings.api' ) { await checkBeforeTransition({label: 'settings.api', state: 'settings'}) }
        if ( trans.to().name === 'agents' ) { await checkBeforeTransition({label: 'agents', state: 'agents'}) }
        if ( trans.to().name === 'overview' ) { await checkBeforeTransition({label: 'overview', state: 'overview'}) }
        if ( trans.to().name === 'manager' ) { await checkBeforeTransition({label: 'manager', state: 'manager'}) }
        //Secondary states
        if (trans.to().name !== 'agents' && trans.to().name.includes('agent') || trans.to().name.includes('ag-') ) {
          $rootScope.$broadcast('stateChanged', 'agents')
        } else if ( trans.to().name.includes('ow-') ) {
          $rootScope.$broadcast('stateChanged', 'overview') 
        } else if ( trans.to().name.includes('mg-') ) {
          $rootScope.$broadcast('stateChanged', 'manager')
        }
      })  

      $transitions.onSuccess({}, async (trans) => {
        $rootScope.$broadcast('loading', { status: false })
      })

      $transitions.onError({}, async (trans) => {
        const err = trans.error()
        if (trans.to().name != 'settings.api' && err.message == 'The transition was ignored') { $state.reload() }
      })

      $transitions.onFinish({}, async (trans) => {
      })

    }])
  })