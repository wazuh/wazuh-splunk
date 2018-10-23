define(['./module'], function (module) {
  'use strict'
  module.run(['$rootScope', '$state', '$transitions', '$navigationService', '$currentDataService', function ($rootScope, $state, $transitions, $navigationService, $currentDataService) {
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
      try {
        const { api, selectedIndex } = await $currentDataService.checkSelectedApiConnection()
        $currentDataService.setApi(api)
        $currentDataService.cleanFilters()
        $navigationService.storeRoute('dev-tools')
        $currentDataService.addFilter(`{"${api.filterType}":"${api.filterName}", "implicit":true}`)
        $currentDataService.addFilter(`{"index":"${$currentDataService.getIndex().index}", "implicit":true}`)
        $rootScope.$broadcast('stateChanged', 'dev-tools')
      } catch (err) {
        $rootScope.$broadcast('loading', { status: false })
        $state.go('settings.api')
      }
    })
    
    $transitions.onStart({ to: 'settings.api' }, async (trans) => {
      try {
        const { api, selectedIndex } = await $currentDataService.checkSelectedApiConnection()
        $currentDataService.setApi(api)
        $currentDataService.cleanFilters()
        $navigationService.storeRoute('settings.api')
        $currentDataService.addFilter(`{"${api.filterType}":"${api.filterName}", "implicit":true}`)
        $currentDataService.addFilter(`{"index":"${$currentDataService.getIndex().index}", "implicit":true}`)
        $rootScope.$broadcast('stateChanged', 'settings')
      } catch (err) {
        $rootScope.$broadcast('loading', { status: false })
      }
    })

    $transitions.onStart({ to: 'manager' }, async (trans) => {
      try {
        const { api, selectedIndex } = await $currentDataService.checkSelectedApiConnection()
        $currentDataService.setApi(api)
        $currentDataService.cleanFilters()
        $navigationService.storeRoute('manager')
        $currentDataService.addFilter(`{"${api.filterType}":"${api.filterName}", "implicit":true}`)
        $currentDataService.addFilter(`{"index":"${$currentDataService.getIndex().index}", "implicit":true}`)
        $rootScope.$broadcast('stateChanged', 'manager')
      } catch (err) {
        $rootScope.$broadcast('loading', { status: false })
        $state.go('settings.api')
      }
    })

    $transitions.onStart({ to: 'overview' }, async (trans) => {
      try {
        const { api, selectedIndex } = await $currentDataService.checkSelectedApiConnection()
        $currentDataService.setApi(api)
        $currentDataService.cleanFilters()
        $navigationService.storeRoute('overview')
        $currentDataService.addFilter(`{"${api.filterType}":"${api.filterName}", "implicit":true}`)
        $currentDataService.addFilter(`{"index":"${$currentDataService.getIndex().index}", "implicit":true}`)
        $rootScope.$broadcast('stateChanged', 'overview')
      } catch (err) {
        $rootScope.$broadcast('loading', { status: false })
        $state.go('settings.api')
      }
    })

    $transitions.onStart({ to: 'agents' }, async (trans) => {
      try {
        const { api, selectedIndex } = await $currentDataService.checkSelectedApiConnection()
        $currentDataService.setApi(api)
        $currentDataService.cleanFilters()
        $navigationService.storeRoute('agents')
        $currentDataService.addFilter(`{"${api.filterType}":"${api.filterName}", "implicit":true}`)
        $currentDataService.addFilter(`{"index":"${$currentDataService.getIndex().index}", "implicit":true}`)
        $rootScope.$broadcast('stateChanged', 'agents')
      } catch (err) {
        $rootScope.$broadcast('loading', { status: false })
        $state.go('settings.api')
      }
    })

  }])
})

