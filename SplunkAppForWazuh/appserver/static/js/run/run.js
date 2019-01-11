define(['./module'], function(module) {
  'use strict'
  module.run([
    '$rootScope',
    '$state',
    '$transitions',
    '$navigationService',
    '$currentDataService',
    function(
      $rootScope,
      $state,
      $transitions,
      $navigationService,
      $currentDataService
    ) {
      //Go to last state at login
      $navigationService.goToLastState()

      async function checkBeforeTransition(state) {
        try {
          const { api } = await $currentDataService.checkSelectedApiConnection()
          $currentDataService.setApi(api)
          //$currentDataService.cleanFilters()
          $navigationService.storeRoute(state)
          $currentDataService.addFilter(
            `{"${api.filterType}":"${api.filterName}", "implicit":true}`
          )
          $currentDataService.addFilter(
            `{"index":"${
              $currentDataService.getIndex().index
            }", "implicit":true}`
          )
        } catch (err) {
          $rootScope.$broadcast('loading', { status: false })
          if (state != 'settings.api')
            $rootScope.$broadcast('stateChanged', 'settings')
          $state.go('settings.api')
        }
      }

      $transitions.onStart({}, async trans => {
        $rootScope.$broadcast('loading', { status: true })
        const to = trans.to().name
        if (
          to != 'settings.about' &&
          to != 'settings.extensions' &&
          to != 'settings.index' &&
          to != 'settings.logs'
        ) {
          await checkBeforeTransition(to)
        }
      })

      $transitions.onSuccess({}, async trans => {
        $rootScope.$broadcast('loading', { status: false })
        const to = trans.to().name
        //Select primary states
        $rootScope.$broadcast('stateChanged', to)
        //Select secondary states
        if (to === 'overview' || to === 'agents' || to === 'agent-overview' || to === 'manager')
          $currentDataService.cleanFilters()
        if ((to !== 'agents' && to.includes('agent')) || to.includes('ag-')) {
          $rootScope.$broadcast('stateChanged', 'agents')
        } else if (to.includes('ow-')) {
          $rootScope.$broadcast('stateChanged', 'overview')
        } else if (to.includes('mg-')) {
          $rootScope.$broadcast('stateChanged', 'manager')
        } else if (to.includes('settings')) {
          $rootScope.$broadcast('stateChanged', 'settings')
        }
      })

      $transitions.onError({}, async trans => {
        const err = trans.error()
        if (
          trans.to().name != 'settings.api' &&
          err.message == 'The transition was ignored'
        ) {
          $state.reload()
        }
      })
    }
  ])
})
