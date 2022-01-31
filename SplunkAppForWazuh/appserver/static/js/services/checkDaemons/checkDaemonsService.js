define(["../module"], function (module) {
  "use strict"

  class checkDaemonsService {
    constructor($rootScope, $requestService, $timeout) {
      this.rootScope = $rootScope
      this.wazuhIsReady = $requestService.wazuhIsReady
      this.tries = 10
      this.timeout = $timeout
      this.busy = false
    }

    async makePing(msg = false) {
      try {
        if (this.busy) return
        this.busy = true
        window.localStorage.setItem("wazuhIsReady", "false")
        this.rootScope.notReadyMsg = msg
        this.rootScope.wazuhCouldNotBeRecovered = false
        this.rootScope.wazuhNotReadyYet = true
        let wazuhReady = false
        while (this.tries--) {
          await this.timeout(1200)
          try {
            const result = await this.wazuhIsReady()
            wazuhReady = result.data.ready
          } catch (error) {
            wazuhReady = false
          }
          if (wazuhReady) {
            this.tries = 10
            this.rootScope.wazuhNotReadyYet = false
            this.rootScope.wazuhCouldNotBeRecovered = false
            this.rootScope.$applyAsync()
            window.localStorage.setItem("wazuhIsReady", "true")
            break
          }
        }

        if (!wazuhReady) {
          throw new Error("Not recovered")
        }
      } catch (error) {
        this.tries = 10
        this.rootScope.wazuhCouldNotBeRecovered = true
        this.rootScope.$applyAsync()
      }

      this.busy = false
    }
  }

  module.service("$checkDaemonsService", checkDaemonsService)
})
