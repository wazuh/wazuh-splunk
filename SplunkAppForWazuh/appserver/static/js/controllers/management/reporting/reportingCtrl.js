define([
  '../../module',
], function (app) {
  'use strict'

  class Reporting {
    constructor($scope, $notificationService, $requestService) {
      this.$scope = $scope
      this.errorHandler = $notificationService.showSimpleToast
      this.genericReq = $requestService.httpReq
      this.loading = true
      this.itemsPerPage = 15
      this.pagedItems = []
      this.currentPage = 0
      this.items = []
      this.gap = 0
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
        await this.genericReq.request('DELETE', '/reports/' + name, {})
        await this.load()
        this.errorHandler('Reporting')
      } catch (error) {
        this.errorHandler('Reporting error')
      }
    }

    // calculate page in place
    groupToPages() {
      this.pagedItems = []

      for (let i = 0; i < this.filteredItems.length; i++) {
        if (i % this.itemsPerPage === 0) {
          this.pagedItems[Math.floor(i / this.itemsPerPage)] = [
            this.filteredItems[i]
          ]
        } else {
          this.pagedItems[Math.floor(i / this.itemsPerPage)].push(
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
      if (!n && n !== 0 && this.currentPage < this.pagedItems.length - 1) {
        this.currentPage++
      }
    }

    setPage(n) {
      this.currentPage = n
      this.nextPage(n)
    }

    async load() {
      try {
        this.loading = true
        const data = await this.genericReq.request('GET', '/reports', {})
        this.items = data.data.list
        const gap = this.items.length / 15
        const gapInteger = parseInt(this.items.length / 15)
        this.gap =
          gap - parseInt(this.items.length / 15) > 0
            ? gapInteger + 1
            : gapInteger
        if (this.gap > 5) this.gap = 5
        this.search()
        this.loading = false
        if (!this.$scope.$$phase) this.$scope.$digest()
      } catch (error) {
        this.errorHandler('Reporting')
      }
    }
  }
  app.controller('reportingCtrl', Reporting)
})
