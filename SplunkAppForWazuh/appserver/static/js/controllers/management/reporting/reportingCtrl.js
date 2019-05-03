define(['../../module'], function(app) {
  'use strict'

  class Reporting {
    /**
     * This class handles generated PDF reports
     * @param {Object} $scope
     * @param {Object} $notificationService
     * @param {Object} $requestService
     * @param {Array} reportsList
     */
    constructor($scope, $notificationService, $requestService, reportsList, $dateDiffService) {
      this.scope = $scope
      this.notification = $notificationService
      this.genericReq = $requestService.httpReq
      this.loading = true
      this.itemsPerPage = 15
      this.scope.pagedItems = []
      this.scope.currentPage = 0
      this.items = []
      this.scope.gap = 0
      this.items = reportsList.data.data
      this.setBrowserOffset = $dateDiffService.setBrowserOffset
    }

    /**
     * On controller loads
     */
    $onInit() {
      this.scope.selectedNavTab = 'reporting'
      this.scope.setPage = n => this.setPage(n)
      this.scope.nextPage = n => this.nextPage(n)
      this.scope.prevPage = () => this.prevPage()
      this.scope.load = () => this.load()
      this.scope.deleteReport = name => this.deleteReport(name)
      this.load()

      this.scope.offsetTimestamp = time => {
        try {
          return this.setBrowserOffset(time)
        } catch (error) {
          return ''
        }
      }
    }

    /**
     * Searches for current PDF reports
     */
    search() {
      this.filteredItems = this.items
      this.scope.currentPage = 0
      this.groupToPages()
    }

    /**
     * Deletes a PDF report by name
     * @param {String} name
     */
    async deleteReport(name) {
      try {
        this.loading = true
        await this.genericReq('GET', '/report/remove', { name: name })
        await this.load()
        this.notification.showSuccessToast('Deleted report.')
      } catch (error) {
        this.notification.showErrorToast('Cannot delete the report.')
      }
    }

    /**
     * Calculates pages in place
     */
    groupToPages() {
      this.scope.pagedItems = []

      for (let i = 0; i < this.filteredItems.length; i++) {
        if (i % this.itemsPerPage === 0) {
          this.scope.pagedItems[Math.floor(i / this.itemsPerPage)] = [
            this.filteredItems[i]
          ]
        } else {
          this.scope.pagedItems[Math.floor(i / this.itemsPerPage)].push(
            this.filteredItems[i]
          )
        }
      }
    }

    /**
     * Calculates the size of the table
     * @param {Number} size
     * @param {Number} start
     * @param {Number} end
     */
    range(size, start, end) {
      const ret = []

      if (size < end) {
        end = size
        start = size - this.scope.gap
      }
      for (let i = start; i < end; i++) {
        ret.push(i)
      }

      return ret
    }

    /**
     * Navigates to the previous page
     */
    prevPage() {
      if (this.scope.currentPage > 0) {
        this.scope.currentPage--
      }
    }

    /**
     * Navigates to the next page
     * @param {Number} n
     */
    nextPage(n) {
      if (
        !n &&
        n !== 0 &&
        this.scope.currentPage < this.scope.pagedItems.length - 1
      ) {
        this.scope.currentPage++
      }
    }

    /**
     * Sets page number
     * @param {Number} n
     */
    setPage(n) {
      this.scope.currentPage = n
      this.nextPage(n)
    }

    /**
     * First load
     */
    async load() {
      try {
        this.loading = true
        const gap = this.items.length / 15
        const gapInteger = parseInt(this.items.length / 15)
        const reports = await this.genericReq('GET', '/report/reports')
        this.items = reports.data.data
        this.scope.gap =
          gap - parseInt(this.items.length / 15) > 0
            ? gapInteger + 1
            : gapInteger
        if (this.scope.gap > 5) {
          this.scope.gap = 5
        }
        this.search()
        this.loading = false
        if (!this.scope.$$phase) this.scope.$digest()
      } catch (error) {
        this.notification.showErrorToast('Error loading reports.')
      }
    }
  }
  app.controller('reportingCtrl', Reporting)
})
