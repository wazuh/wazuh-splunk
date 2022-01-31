define([
  "../../module",
  "../../../directives/wz-table/lib/pagination",
  "../../../directives/wz-table/lib/check-gap",
], function (app, pagination, checkGap) {
  "use strict"

  class Reporting {
    /**
     * This class handles generated PDF reports
     * @param {Object} $scope
     * @param {Object} $notificationService
     * @param {Object} $requestService
     * @param {Object} $dateDiffService
     * @param {Object} isWazuhAdmin
     */
    constructor(
      $scope,
      $notificationService,
      $requestService,
      $dateDiffService,
      isWazuhAdmin
    ) {
      this.scope = $scope
      this.notification = $notificationService
      this.genericReq = $requestService.httpReq
      this.loading = true
      this.itemsPerPage = 15
      this.scope.pagedItems = []
      this.scope.currentPage = 0
      this.scope.isWazuhAdmin = isWazuhAdmin
      this.items = []
      this.scope.gap = 0
      this.setBrowserOffset = $dateDiffService.setBrowserOffset
      this.pagination = pagination
      this.checkGap = checkGap
    }

    /**
     * On controller loads
     */
    $onInit() {
      this.scope.selectedNavTab = "reporting"
      this.scope.gap = 0
      this.scope.prevPage = () => this.pagination.prevPage(this.scope)
      this.scope.nextPage = async (currentPage) =>
        this.pagination.nextPage(
          currentPage,
          this.scope,
          this.notification,
          null
        )
      this.scope.setPage = (n) => {
        this.scope.currentPage = n
        this.scope.nextPage(n)
      }
      this.scope.load = () => this.load()
      this.scope.range = (size, start, end) =>
        this.pagination.range(size, start, end, this.scope.gap)
      this.scope.deleteReport = (name) => this.deleteReport(name)
      this.scope.changeSorting = (column) => this.changeSorting(column)
      this.load()

      this.scope.offsetTimestamp = (time) => {
        try {
          return this.setBrowserOffset(time)
        } catch (error) {
          return ""
        }
      }

      this.scope.$on("loadingContent", (event, data) => {
        this.scope.loadingContent = data.status
        event.preventDefault()
      })

      this.scope.sort = {
        column: "",
        descending: false,
      }

      this.scope.changeSorting("date")
    }

    /**
     * Searches for current PDF reports
     */
    search() {
      this.filteredItems = this.items
      this.scope.currentPage = 0
      this.groupToPages()
    }

    async changeSorting(column) {
      let sort = this.scope.sort

      if (sort.column === column) {
        sort.descending = !sort.descending
      } else {
        sort.column = column
        sort.descending = false
      }
    }

    /**
     * Deletes a PDF report by name
     * @param {String} name
     */
    async deleteReport(name) {
      try {
        this.loading = true
        await this.genericReq("GET", "/report/remove", { name: name })
        await this.load()
        this.notification.showSuccessToast("Deleted report.")
      } catch (error) {
        this.notification.showErrorToast("Cannot delete the report.")
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
            this.filteredItems[i],
          ]
        } else {
          this.scope.pagedItems[Math.floor(i / this.itemsPerPage)].push(
            this.filteredItems[i]
          )
        }
      }
    }

    /**
     * First load
     */
    async load() {
      try {
        this.loading = true
        const reports = await this.genericReq("GET", "/report/reports")
        this.items = reports.data.data
        const gap = this.items.length / 15
        const gapInteger = parseInt(this.items.length / 15)
        this.scope.gap =
          gap - parseInt(this.items.length / 15) > 0
            ? gapInteger + 1
            : gapInteger
        if (this.scope.gap > 5) {
          this.scope.gap = 5
        }
        this.search()
        this.loading = false
        this.scope.$applyAsync()
      } catch (error) {
        this.notification.showErrorToast("Error loading reports.")
      }
    }
  }
  app.controller("reportingCtrl", Reporting)
})
