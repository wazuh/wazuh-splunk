define(['../../module'], function(controllers) {
  'use strict'

  class OverviewWelcome {
    /**
     * Class Welcome
     * @param {*} $scope
     * @param {Object} agentsInfo
     * @param {Object} extensions
     */
    constructor(
      $scope,
      agentsInfo,
      extensions,
      $notificationService,
      $currentDataService
    ) {
      this.scope = $scope
      this.notificationService = $notificationService
      this.currentDataService = $currentDataService
      this.currentApi = this.currentDataService.getApi()
      this.scope.extensionsLists = {
        security: false,
        auditing: false,
        threadDetection: false,
        regulatory: false
      }
      try {
        this.scope.agentsCountTotal = agentsInfo.data.data.agent_status.Total - 1
        this.scope.agentsCountActive = agentsInfo.data.data.agent_status.Active - 1
        this.scope.agentsCountDisconnected = agentsInfo.data.data.agent_status.Disconnected
        this.scope.agentsCountNeverConnected = agentsInfo.data.data.agent_status['Never connected']

        this.scope.agentsCoverity = this.scope.agentsCountActive
          ? (this.scope.agentsCountActive / this.scope.agentsCountActive) * 100
          : 0

        this.scope.noAgents = this.scope.agentsCountTotal - 1 < 1
        this.scope.lastAgent = agentsInfo.data.data.last_registered_agent || 'Unknown'
        this.scope.$applyAsync()
      } catch (error) {} //eslint-disable-line
      try {
        this.extensions = extensions
        this.scope.extensions = angular.copy(this.extensions)
        this.api = this.currentApi['_key']
      } catch (error) {} //eslint-disable-line
    }

    /**
     * On controller loads
     */
    $onInit() {
      this.refreshExtensions()
      this.scope.showExtensionsLists = card => this.showExtensionsLists(card)
      this.scope.toggleExtension = (extension, state) =>
        this.toggleExtension(extension, state)
      this.scope.$applyAsync()
      
      this.scope.loadCharts = id => {
        setTimeout(() => {
          const chart = new Chart(document.getElementById(id), {
            type: 'doughnut',
            data: {
              labels: ['Active', 'Disconected', 'Never connected'],
              datasets: [
                {
                  backgroundColor: ['#46BFBD', '#F7464A', '#949FB1'],
                  data: [
                    this.scope.agentsCountActive,
                    this.scope.agentsCountDisconnected,
                    this.scope.agentsCountNeverConnected
                  ]
                }
              ]
            },
            options: {
              cutoutPercentage: 85,
              legend: {
                display: true,
                position: 'right'
              },
              tooltips: {
                displayColors: false
              }
            }
          })
          chart.update()
        }, 250)
      }
    }

    /**
     * Shows the extensions list to enable or disable them
     */
    showExtensionsLists(card) {
      try {
        this.scope.extensionsLists[card]
          ? (this.scope.extensionsLists[card] = false)
          : (this.scope.extensionsLists[card] = true)
      } catch (error) {
        console.error('Error showing or hiding the extensions list ', error)
      }
    }

    /**
     * Enable or disable extension
     * @param {String} extension
     * @param {String} state
     */
    toggleExtension(extension, state) {
      try {
        this.extensions[extension] = state.toString()
        this.currentDataService.setExtensions(this.api, this.extensions)
        this.extensions = this.currentDataService.getExtensions(this.api)
        this.refreshExtensions()
      } catch (error) {
        console.error(error)
        this.notificationService.showErrorToast(error)
      }
    }

    /**
     * Refresh the extensions
     */
    refreshExtensions() {
      const keys = Object.keys(this.extensions)
      keys.map(
        key => (this.scope.extensions[key] = this.extensions[key] === 'true')
      )
      /*
      keys.map(key =>
        this.scope.extensions[key] =  this.extensions[key] === 'true'
      )
      */
      this.scope.$applyAsync()
    }
  }
  controllers.controller('overviewWelcomeCtrl', OverviewWelcome)
})
