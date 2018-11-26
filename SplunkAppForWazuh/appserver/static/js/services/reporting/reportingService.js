define([
  '../module',
  'jquery',
], function (module, $) {
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

        // const idArray = this.rawVisualizations.getList().map(item => item.id)
        const idArray = ['alertLevEvoVizz']

        for (const item of idArray) {
          const tmpHTMLElement = $(`#${item}`)
          console.log('the HTML DOM element ',tmpHTMLElement)
          this.vis2png.assignHTMLItem(item, tmpHTMLElement)
        }

        const appliedFilters = this.visHandlers.getSerializedFilters()
        

        console.log('checking array')
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

        await this.genericReq(
          'POST',
          '/report/generate',
          {data: JSON.stringify(data)}
        )

        this.$rootScope.reportBusy = false
        this.$rootScope.reportStatus = false
        if (!this.$rootScope.$$phase) this.$rootScope.$digest()
        this.errorHandler('Success. Go to Management -> Reporting')

        return
      } catch (error) {
        console.error('err ',error)
        this.$rootScope.reportBusy = false
        this.$rootScope.reportStatus = false
        this.errorHandler('Reporting error')
      }
    }
  }

  module.service('$reportingService', ReportingService)

})