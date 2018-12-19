define(['../module', 'jquery'], function(module, $) {
  'use strict'
  class ReportingService {
    constructor(
      $rootScope,
      vis2png,
      //  rawVisualizations,
      $currentDataService,
      $requestService,
      $notificationService
    ) {
      this.$rootScope = $rootScope
      this.vis2png = vis2png
      //  this.rawVisualizations = rawVisualizations
      this.visHandlers = $currentDataService
      this.genericReq = $requestService.httpReq
      this.errorHandler = $notificationService.showSimpleToast
    }

    /**
     * Converts an array of Splunk visualizations to PNG format
     * @param {String} tab
     * @param {Boolean} isAgents
     * @param {Array} vizz
     */
    async startVis2Png(
      tab,
      sectionTitle,
      filters,
      vizz = [],
      isAgents = false,
    ) {
      try {
        this.$rootScope.$broadcast('loadingReporting', { status: true })
        if (this.vis2png.isWorking()) {
          this.errorHandler('Report in progress')
          return
        }
        this.$rootScope.reportBusy = true
        this.$rootScope.reportStatus = 'Generating report...0%'
        if (!this.$rootScope.$$phase) this.$rootScope.$digest()

        this.vis2png.clear()

        // const idArray = this.rawVisualizations.getList().map(item => item.id)
        const idArray = vizz

        for (const item of idArray) {
          const tmpHTMLElement = $(`#${item}`)
          this.vis2png.assignHTMLItem(item, tmpHTMLElement)
        }

        const appliedFilters = this.visHandlers.getSerializedFilters()

        const array = await this.vis2png.checkArray(idArray, sectionTitle, filters)
        const name = `wazuh-${
          isAgents ? 'agents' : 'overview'
        }-${tab}-${(Date.now() / 1000) | 0}.pdf`

        const data = {
          array,
          name,
          title: isAgents ? `Agents ${tab}` : `Overview ${tab}`,
          filters: appliedFilters.filters,
          time: appliedFilters.time,
          searchBar: appliedFilters.searchBar,
          tables: appliedFilters.tables,
          tab,
          section: isAgents ? 'agents' : 'overview',
          isAgents
        }

        await this.genericReq('POST', '/report/generate', {
          data: JSON.stringify(data)
        })

        this.$rootScope.reportBusy = false
        this.$rootScope.reportStatus = false
        if (!this.$rootScope.$$phase) this.$rootScope.$digest()
        this.errorHandler('Success. Go to Management -> Reporting')
        this.$rootScope.$broadcast('loadingReporting', { status: false })
        return
      } catch (error) {
        console.error('Reporting error ', error)
        this.$rootScope.reportBusy = false
        this.$rootScope.reportStatus = false
        this.errorHandler('Reporting error')
      }
    }
  }

  module.service('$reportingService', ReportingService)
})
