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
      this.scope.currentPage = 0
      this.items = []
      this.scope.gap = 0
      this.items = reportsList.data.data
    }

    $onInit() {
      this.load()
      this.scope.setPage = (n) => this.setPage(n)
      this.scope.nextPage = (n) => this.nextPage(n)
      this.scope.prevPage = () => this.prevPage()
    }

    search() {
      this.filteredItems = this.items
      this.scope.currentPage = 0
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
        start = size - this.scope.gap
      }
      for (let i = start; i < end; i++) {
        ret.push(i)
      }

      return ret
    }

    prevPage() {
      if (this.scope.currentPage > 0) {
        this.scope.currentPage--
      }
    }

    nextPage(n) {
      if (!n && n !== 0 && this.scope.currentPage < this.scope.pagedItems.length - 1) {
        this.scope.currentPage++
      }
    }

    setPage(n) {
      this.scope.currentPage = n
      this.nextPage(n)
    }

    load() {
      try {
        this.loading = true

        const gap = this.items.length / 15
        const gapInteger = parseInt(this.items.length / 15)
        this.scope.gap =
          gap - parseInt(this.items.length / 15) > 0
            ? gapInteger + 1
            : gapInteger
        if (this.scope.gap > 5) { this.scope.gap = 5 }
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
