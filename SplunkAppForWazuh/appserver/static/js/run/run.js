define(['./module'], function (module) {
  'use strict'
  module.run([
    '$rootScope', '$state', '$transitions', '$navigationService', '$currentDataService',
    function ($rootScope, $state, $transitions, $navigationService, $currentDataService) {
    
      //Go to last state at login
      $navigationService.goToLastState()

      /**
       * Checks the destination state
       * @param {Object} state 
       */
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
        const to = trans.to().name
        //Primary states
        if ( to === 'dev-tools' ) { await checkBeforeTransition({label: 'dev-tools', state: 'dev-tools'}) }
        if ( to === 'settings.api' ) { await checkBeforeTransition({label: 'settings.api', state: 'settings'}) }
        if ( to === 'agents' ) { await checkBeforeTransition({label: 'agents', state: 'agents'}) }
        if ( to === 'overview' ) { await checkBeforeTransition({label: 'overview', state: 'overview'}) }
        if ( to === 'manager' ) { await checkBeforeTransition({label: 'manager', state: 'manager'}) }
        //Secondary states
        if (to !== 'agents' && to.includes('agent') || to.includes('ag-') ) {
          $rootScope.$broadcast('stateChanged', 'agents')
        } else if ( to.includes('ow-') ) {
          $rootScope.$broadcast('stateChanged', 'overview') 
        } else if ( to.includes('mg-') ) {
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