define([
  '../module',
  'jquery',
  '../vis2png/vis2png'
], function (module, $, vis2png) {
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
      this.visHandlers = $currentDataService.getFilters()
      this.genericReq = $requestService.httpReq
      this.errorHandler = $notificationService.showSimpleToast
    }

    async startVis2Png(tab, isAgents = false, syscollectorFilters = null) {
      try {
        if (this.vis2png.isWorking()) {
          this.errorHandler('Report in progress')
          return
        }
        this.$rootScope.reportBusy = true
        this.$rootScope.reportStatus = 'Generating report...0%'
        if (!this.$rootScope.$$phase) this.$rootScope.$digest()

        this.vis2png.clear()

        const idArray = this.rawVisualizations.getList().map(item => item.id)

        for (const item of idArray) {
          const tmpHTMLElement = $(`#${item}`)
          this.vis2png.assignHTMLItem(item, tmpHTMLElement)
        }

        const appliedFilters = this.visHandlers.getAppliedFilters(
          syscollectorFilters
        )

        const array = await this.vis2png.checkArray(idArray)
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

        await this.genericReq.request(
          'POST',
          '/reports',
          data
        )

        this.$rootScope.reportBusy = false
        this.$rootScope.reportStatus = false
        if (!this.$rootScope.$$phase) this.$rootScope.$digest()
        this.errorHandler('Success. Go to Management -> Reporting')

        return
      } catch (error) {
        this.$rootScope.reportBusy = false
        this.$rootScope.reportStatus = false
        this.errorHandler('Reporting')
      }
    }
  }

  module.service('$reportingService', ReportingService)

})