/*
 * Wazuh app - Agents controller
 * Copyright (C) 2015-2019 Wazuh, Inc.
 *
 * This program is free software you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

define([
  './controllers/module',
  './services/visualizations/inputs/time-picker',
], function (app, TimePicker) {
  'use strict'

  class DashboardMain {
    /**
     * Class DashboardMain
     * @param {*} $scope
     * @param {*} $reportingService
     * @param {*} $state
     * @param {*} $currentDataService
     * @param {*} $urlTokenModel
     * @param {*} $notificationService
     */
    constructor(
      $scope,
      $reportingService,
      $state,
      $currentDataService,
      $urlTokenModel,
      $notificationService
    ) {
      this.notificationService = $notificationService
      this.scope = $scope
      this.reportingService = $reportingService
      this.state = $state
      this.currentDataService = $currentDataService
      this.getFilters = this.currentDataService.getSerializedFilters
      this.urlTokenModel = $urlTokenModel
      this.submittedTokenModel = this.urlTokenModel.getSubmittedTokenModel()
      this.timePicker = new TimePicker(
        '#timePicker',
        this.urlTokenModel.handleValueChange
      )
      this.tableResults = {}
      this.initialize()
      // Prevent DashBoardMain from transforming an undefinded value
      // (calls to map(), filter(), ...)
      this.vizz = []
    }

    /**
     * On controller load
     */
    initialize() {
      try {
        // Init global overview variables
        this.scope.loadingVizz = true

        // Listeners
        this.scope.$on('deletedFilter', (event) => {
          event.stopPropagation()
          this.launchSearches()
        })

        this.scope.$on('barFilter', (event) => {
          event.stopPropagation()
          this.launchSearches()
        })

        // Scope functions
        this.scope.expand = (i, id) => this.expand(i, id)

        this.scope.$on('checkReportingStatus', () => {
          this.vizzReady = !this.vizz.filter((v) => {
            return v.finish === false
          }).length
          if (this.vizzReady) {
            this.scope.loadingVizz = false
            try {
              // There's not always metrics to set.
              this.setReportMetrics()
            } catch (error) {
              this.notification.showErrorToast(error.message || error)
            }
          } else {
            this.vizz.map((v) => {
              if (v.constructor.name === 'RawTableData') {
                this.tableResults[v.name] = v.results
              }
            })
            this.scope.loadingVizz = true
          }
          this.scope.$applyAsync()
        })

        this.scope.$on('loadingContent', (event, data) => {
          this.scope.loadingContent = data.status
          event.preventDefault()
        })

        this.scope.$on('loadingReporting', (event, data) => {
          this.scope.loadingReporting = data.status
        })

        /**
         * On controller destroy
         */
        this.scope.$on('$destroy', () => {
          this.tableResults = {}
          this.timePicker.destroy()
          // Agents configuration assesment has not visualizations, this prevent an error
          try {
            this.vizz.map((vizz) => vizz.destroy())
          } catch (error) {
            this.notification.showErrorToast(error.message || error)
          }

          // There's not always a dropdown.
          try {
            this.dropdown.destroy()
          } catch (error) {
            this.notification.showErrorToast(error.message || error)
          }
        })
      } catch (error) {
        this.notification.showErrorToast(
          'Error initializing DashboardMain: ',
          error.message || error
        )
      }
    }

    /**
     * Get filters and launches the search
     */
    launchSearches() {
      this.filters = this.currentDataService.getSerializedFilters()
      this.state.reload()
    }

    /**
     * Expands the visualizations
     * @param {Number} i
     * @param {String} id
     */
    expand(i, id) {
      this.scope.expandArray[i] = !this.scope.expandArray[i]
      let vis = $(
        '#' + id + ' .panel-body .splunk-view .shared-reportvisualizer'
      )
      this.scope.expandArray[i]
        ? vis.css('height', 'calc(100vh - 200px)')
        : vis.css('height', '250px')

      document.querySelectorAll('[role="main"]')[0].style.zIndex = this.scope
        .expandArray[i]
        ? 900
        : ''

      let vis_header = $('.wz-headline-title')
      vis_header.dblclick((e) => {
        if (this.scope.expandArray[i]) {
          this.scope.expandArray[i] = !this.scope.expandArray[i]
          this.scope.expandArray[i]
            ? vis.css('height', 'calc(100vh - 200px)')
            : vis.css('height', '250px')
          this.scope.$applyAsync()
        } else {
          e.preventDefault()
        }
      })
    }
  }
  app.controller('dashboardMain', DashboardMain)
  return DashboardMain
})
