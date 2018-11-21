define([
  '../../module',
], function (app) {
  'use strict'

  class Reporting {
    constructor($scope, $notificationService, $requestService, reportsList) {
      this.scope = $scope
      this.toast = $notificationService.showSimpleToast
      this.genericReq = $requestService.httpReq
      this.loading = true
      this.itemsPerPage = 15
      this.scope.pagedItems = []
      this.currentPage = 0
      this.items = []
      this.gap = 0
      this.items = reportsList.data.data
    }

    $onInit() {
      this.load()
    }

    search() {
      this.filteredItems = this.items
      this.currentPage = 0
      this.groupToPages()
    }

    async deleteReport(name) {
      try {
        this.loading = true
        await this.genericReq('DELETE', '/reports/' + name, {})
        await this.load()
        this.toast('Deleted report')
      } catch (error) {
        this.toast('Reporting error')
      }
    }

    // calculate page in place
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

    range(size, start, end) {
      const ret = []

      if (size < end) {
        end = size
        start = size - this.gap
      }
      for (let i = start; i < end; i++) {
        ret.push(i)
      }

      return ret
    }

    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--
      }
    }

    nextPage(n) {
      if (!n && n !== 0 && this.currentPage < this.scope.pagedItems.length - 1) {
        this.currentPage++
      }
    }

    setPage(n) {
      this.currentPage = n
      this.nextPage(n)
    }

    load() {
      try {
        this.loading = true

        const gap = this.items.length / 15
        const gapInteger = parseInt(this.items.length / 15)
        this.gap =
          gap - parseInt(this.items.length / 15) > 0
            ? gapInteger + 1
            : gapInteger
        if (this.gap > 5) { this.gap = 5 }
        this.search()
        this.loading = false
        if (!this.scope.$$phase) this.scope.$digest()
      } catch (error) {
        console.error('err', error)
        this.toast('Error loading reports')
      }
    }
  }
  app.controller('reportingCtrl', Reporting)
})
