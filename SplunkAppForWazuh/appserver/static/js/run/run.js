define(['./module'], function (module) {
  'use strict'
  module.run([
    '$rootScope',
    '$state',
    '$transitions',
    '$navigationService',
    '$currentDataService',
    '$requestService',
    '$appVersionService',
    '$notificationService',
    function (
      $rootScope,
      $state,
      $transitions,
      $navigationService,
      $currentDataService,
      $requestService,
      $appVersionService,
      $notificationService
    ) {
      // Go to last state or to a specified tab if "currentTab" param
      // is specified in the url
      $navigationService.manageState()

      /**
       *
       */
      async function checkVersions() {
        await checkAppVersions()
        // Check that the Wazuh API version matches the App's version.
        const appVersion = $appVersionService.getAppInfo().version
        await checkWazuhVersions(appVersion)

        // --------------------------- //

        // Utility inner function.
        async function checkAppVersions() {
          try {
            // Request backend metadata
            const result = await $requestService.httpReq(
              'GET',
              '/manager/app_info'
            )

            // Store backend metadata.
            $appVersionService.setAppInfo(result.data)

            // Compare App's frontend and backend versions.
            // Show toast on versions mismatch.
            // @sends_event APP_REVISION_MISMATCH
            if ($appVersionService.appRevisionsMismatch()) {
              $rootScope.$broadcast('APP_REVISION_MISMATCH', {})
            }
          } catch (error) {
            $state.go('settings.api')
          }
        }

        // Utility inner function.
        async function checkWazuhVersions(appVersion) {
          try {
            // Request API metadata
            const result = await $requestService.apiReq('/')

            if (result.data && result.data.data && !result.data.error) {
              const APIversion = result.data.data.api_version

              // Compare App's and API's versions.
              // Show toast on versions mismatch.
              // @sends_event WAZUH_VERSION_MISMATCH
              if (appVersion !== APIversion) {
                $rootScope.$broadcast('WAZUH_VERSION_MISMATCH', {
                  appVersion,
                  APIversion,
                })
              }
            }
          } catch (error) {
            $state.go('settings.api')
          }
        }
      }
      // Run once when App starts.
      checkVersions()

      async function checkBeforeTransition(state) {
        try {
          const { api } = await $currentDataService.checkSelectedApiConnection()
          $currentDataService.setApi(api)
          $navigationService.storeRoute(state)
          $currentDataService.addFilter(
            `{"${api.filterType}":"${api.filterName}", "implicit":true}`
          )
          $currentDataService.addFilter(
            `{"index":"${
              $currentDataService.getIndex().index
            }", "implicit":true}`
          )
          $currentDataService.addFilter(
            `{"sourcetype":"${
              $currentDataService.getSourceType().sourceType
            }", "implicit":true}`
          )
          // If change the primary state and do not receive an error
          // the two below code lines clear the warning message.
          window.localStorage.setItem('wazuhIsReady', 'true')
          $rootScope.wazuhNotReadyYet = false
          $rootScope.wazuhCouldNotBeRecovered = false
        } catch (err) {
          if (
            err instanceof Object &&
            err.message &&
            err.message.includes('ERROR3099')
          ) {
            $rootScope.$broadcast('wazuhNotReadyYet', {})
            toPrimaryState(state)
          } else {
            $rootScope.$broadcast('loading', { status: false })
            if (state != 'settings.api') {
              $rootScope.$broadcast('stateChanged', 'settings')
            }
            if (typeof err === 'string') {
              $notificationService.showErrorToast(err)
            }
            $state.go('settings.api')
            $rootScope.$broadcast('changeSettingsTab', { tabName: 'api' })
          }
        }
      }

      // Check secondary states when Wazuh is not ready to prevent
      // changing the state.
      $transitions.onBefore({}, async (trans) => {
        const to = trans.to().name
        if (
          to !== 'overview' &&
          to !== 'manager' &&
          to !== 'agents' &&
          to !== 'dev-tools' &&
          to !== 'discover' &&
          !to.startsWith('settings')
        ) {
          const wazuhIsReady =
            window.localStorage.getItem('wazuhIsReady') === 'true'
          if (!wazuhIsReady) {
            return false
          }
        }
      })

      $transitions.onStart({}, async (trans) => {
        $rootScope.$broadcast('loadingMain', { status: true })
        const to = trans.to().name
        const from = trans.from().name
        if (to !== from && from !== 'discover') {
          $currentDataService.cleanFilters()
        }
        if (
          to != 'settings.about' &&
          to != 'settings.index' &&
          to != 'settings.logs'
        ) {
          await checkBeforeTransition(to)
        }
      })

      $transitions.onSuccess({}, async (trans) => {
        $rootScope.$broadcast('loadingMain', { status: false })

        const to = trans.to().name
        const from = trans.from().name
        //Select primary states
        if (
          (to === 'discover' && from === 'overview') ||
          from === 'manager' ||
          from === 'settings' ||
          from === 'agents' ||
          from === 'dev-tools'
        ) {
          $rootScope.$broadcast('stateChanged', to)
        } else if (to !== 'discover') {
          $rootScope.$broadcast('stateChanged', to)
        }

        // Select secondary states
        if (to.startsWith('agent') || to.startsWith('ag-')) {
          if (
            from !== 'agents' &&
            !from.startsWith('agent') &&
            !from.startsWith('ag-') &&
            from !== 'discover'
          ) {
            $currentDataService.cleanAgentsPinedFilters()
          }
          $rootScope.$broadcast('stateChanged', 'agents')
        } else if (to.startsWith('ow-')) {
          $rootScope.$broadcast('stateChanged', 'overview')
        } else if (to.startsWith('mg-')) {
          $rootScope.$broadcast('stateChanged', 'manager')
        } else if (to.startsWith('settings')) {
          $rootScope.$broadcast('stateChanged', 'settings')
        } else if (to.startsWith('security')) {
          $rootScope.$broadcast('stateChanged', 'security')
        }

        // This selects "api" tab when there some state transition error.
        // It solves that another setting tab could appear as selected when
        // show the view of "api" tab.
        if (to === 'settings.api') {
          $rootScope.$broadcast('changeSettingsTab', { tabName: 'api' })
        }
      })

      $transitions.onError({}, async (trans) => {
        $rootScope.$broadcast('loadingMain', { status: false })
        const err = trans.error()
        if (
          trans.to().name != 'settings.api' &&
          err.message == 'The transition was ignored'
        ) {
          $state.reload()
        }
      })

      // When access to a state and Wazuh is not ready is detected, this
      // function checks if is a secondary state, if it is, go to primary state
      const toPrimaryState = (to) => {
        if (to.startsWith('ag-') || to.startsWith('agent-')) {
          $state.go('agents')
          $rootScope.$broadcast('stateChanged', 'agents')
        } else if (to.startsWith('ow-')) {
          $state.go('overview')
          $rootScope.$broadcast('stateChanged', 'overview')
        } else if (to.startsWith('mg-')) {
          $state.go('manager')
          $rootScope.$broadcast('stateChanged', 'manager')
        }
      }
    },
  ])
})
