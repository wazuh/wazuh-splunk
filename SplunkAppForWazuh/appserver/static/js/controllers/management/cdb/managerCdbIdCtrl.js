define([
  '../../module',
  '../rules/ruleset',
  '../../../directives/wz-table/lib/pagination',
  '../../../directives/wz-table/lib/check-gap',
], function (controllers, Ruleset, pagination, checkGap) {
  'use strict'
  class CdbListId extends Ruleset {
    /**
     * Class CdbList-ID
     * @param {*} $scope
     * @param {*} $sce
     * @param {*} $notificationService
     * @param {*} $state
     * @param {*} $currentDataService
     * @param {*} $tableFilterService
     * @param {*} $csvRequestService
     * @param {*} $cdbEditor
     * @param {*} cdbInfo
     * @param {*} $restartService
     * @param {*} $security_service
     */
    constructor(
      $scope,
      $sce,
      $notificationService,
      $state,
      $currentDataService,
      $tableFilterService,
      $csvRequestService,
      $cdbEditor,
      cdbInfo,
      $restartService,
      $security_service
    ) {
      super(
        $scope,
        $sce,
        $notificationService,
        'cdb',
        $currentDataService,
        $tableFilterService,
        $csvRequestService,
        $restartService
      )
      this.state = $state
      this.cdbEditor = $cdbEditor
      this.cdbInfo = cdbInfo
      this.notification = $notificationService
      this.pagination = pagination
      this.checkGap = checkGap
      this.restartService = $restartService
      this.scope.canUpdateList = $security_service.isAllowed('LISTS_UPDATE', [
        'LIST_FILE',
      ])
      try {
        this.filters = JSON.parse(window.localStorage.cdb) || []
      } catch (err) {
        this.filters = []
      }
    }

    /**
     * On controller load
     */
    $onInit() {
      // Data validation
      this.scope.keyValidationRegex = '(?:^"([\\w\\-:]+?)"|^[^:"\\s]+$)'
      this.scope.valueValidationRegex = '(?:^"([\\w\\-:]*?)"$|^[^:"]*$)'

      try {
        this.scope.downloadCsv = (path, name) => this.downloadCsv(path, name)
        this.scope.addDetailFilter = (name, value) =>
          this.addDetailFilter(name, value)

        //Scope methods
        this.scope.addEntry = (key, value) => this.addEntry(key, value)
        this.scope.setEditingKey = (key, value) =>
          this.setEditingKey(key, value)
        this.scope.cancelEditingKey = () => this.cancelEditingKey()
        this.scope.showConfirmRemoveEntry = (ev, key) =>
          this.showConfirmRemoveEntry(ev, key)
        this.scope.editKey = (key, value) => this.editKey(key, value)
        this.scope.cancelRemoveEntry = () => this.cancelRemoveEntry()
        this.scope.confirmRemoveEntry = (key) => this.confirmRemoveEntry(key)
        this.scope.firstPage = () => this.firstPage()

        // Edit cdb lists
        this.scope.currentList = {
          details: {
            file: this.cdbInfo.file,
            path: this.cdbInfo.path,
          },
        }
        this.cdbInfo.content = this.stringToObj(this.cdbInfo.content)

        this.scope.currentList.list = this.cdbInfo.content
        this.scope.saveList = () => this.saveList()

        /**
         * Pagination variables and functions
         */
        this.scope.items = this.cdbToArr()
        this.contentToFilter = this.scope.items
        this.scope.totalItems = this.scope.items.length
        this.scope.itemsPerPage = 10
        this.scope.pagedItems = []
        this.scope.currentPage = 0
        this.scope.gap = 0
        this.scope.searchTable = () =>
          this.pagination.searchTable(this.scope, this.scope.items)
        this.scope.groupToPages = () => this.pagination.groupToPages(this.scope)
        this.initPagination()
        this.scope.range = (size, start, end) =>
          this.pagination.range(size, start, end, this.scope.gap)
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

        this.scope.restart = () => this.restart()
        this.scope.closeRestartConfirmation = () =>
          this.closeRestartConfirmation()
      } catch (error) {
        this.notification.showErrorToast('Error editing CDB list')
      }
    }

    async fetchFile(fileName, path) {
      try {
        const result = await this.cdbEditor.getConfiguration(fileName, path)
        return result
      } catch (error) {
        return Promise.reject(error)
      }
    }

    /**
     * Validates the Key and Value of a new CDB List entry.
     *
     * @param {String} key the new key
     * @param {String} value the new value
     * @returns {Boolean} true if both the key and the value are valid.
     */
    validateCdbEntry(key, value) {
      let isValid = true
      const errorMessage = (type, regex) =>
        `The ${type} must match this regular expression ${regex}`

      const keyRegex = new RegExp(this.scope.keyValidationRegex)
      const valRegex = new RegExp(this.scope.valueValidationRegex)

      if (!keyRegex.test(key)) {
        this.notification.showWarningToast(
          errorMessage('Key', this.scope.keyValidationRegex)
        )
        isValid = false
      }
      if (!valRegex.test(value)) {
        this.notification.showWarningToast(
          errorMessage('Value', this.scope.valueValidationRegex)
        )
        isValid = false
      }

      return isValid
    }

    /**
     * Adds new entry field
     * @param {String} key
     * @param {String} value
     */
    async addEntry(key, value) {
      try {
        if (this.validateCdbEntry(key, value)) {
          if (!this.scope.currentList.list[key]) {
            value = value ? value : ''
            this.scope.currentList.list[key] = value
            this.scope.newKey = ''
            this.scope.newValue = ''
            this.refreshCdbList()
          } else {
            this.notification.showErrorToast(
              'Error adding new entry, the key exists.'
            )
          }
        }
      } catch (error) {
        this.notification.showErrorToast(
          `Error adding entry: ${error.message || error}`
        )
      }
    }

    firstPage() {
      this.scope.setPage(1)
      this.scope.prevPage()
    }

    /**
     * Enable edition for a given key
     * @param {String} key Entry key
     */
    setEditingKey(key, value) {
      this.scope.editingKey = key
      this.scope.editingNewValue = value
    }

    /**
     * Cancel edition of an entry
     */
    cancelEditingKey() {
      this.scope.editingKey = false
      this.scope.editingNewValue = ''
    }

    showConfirmRemoveEntry(ev, key) {
      this.scope.removingEntry = key
    }

    async editKey(key, newValue) {
      try {
        this.scope.currentList.list[key] = newValue
        this.cancelEditingKey()
        this.refreshCdbList()
      } catch (error) {
        this.notification.showErrorToast('Error editing value.')
      }
    }

    cancelRemoveEntry() {
      this.scope.removingEntry = false
    }

    async confirmRemoveEntry(key) {
      try {
        let currentPage = this.scope.currentPage
        delete this.scope.currentList.list[key]
        this.scope.removingEntry = false
        this.refreshCdbList()
        currentPage =
          this.scope.pagedItems.length - 1 >= currentPage
            ? currentPage
            : currentPage - 1
        this.scope.setPage(currentPage)
      } catch (error) {
        this.notification.showErrorToast('Error deleting entry.')
      }
    }

    refreshCdbList() {
      this.scope.items = this.cdbToArr()
      this.initPagination()
      this.scope.$applyAsync()
    }

    async saveList() {
      try {
        this.scope.saveIncomplete = true
        const fileName = this.scope.currentList.details.file
        const path = this.scope.currentList.details.path
        const content = this.objToString(this.scope.currentList.list)
        await this.cdbEditor.sendConfiguration(fileName, path, content, true)
        const cdbUpdated = await this.fetchFile(fileName, path)
        this.scope.currentList.list = this.stringToObj(cdbUpdated)
        // Re-init pagination
        this.scope.items = this.cdbToArr()
        this.contentToFilter = this.scope.items
        this.initPagination()
        this.notification.showSuccessToast('File saved successfully.')
        this.scope.saveIncomplete = false
        this.scope.$applyAsync()
      } catch (error) {
        this.scope.saveIncomplete = false
        this.notification.showErrorToast(error || `Cannot send this file.`)
      }
    }

    stringToObj(string) {
      let result = {}
      const splitted = string.split('\n')
      splitted.forEach((element) => {
        const keyValue = element.split(':')
        if (keyValue[0]) result[keyValue[0]] = keyValue[1]
      })
      return result
    }

    objToString(obj) {
      let raw = ''
      for (var key in obj) {
        raw = raw.concat(`${key}:${obj[key]}\n`)
      }
      return raw
    }

    cdbToArr() {
      const obj = this.scope.currentList.list
      let items = []
      for (var property in obj) {
        let o = [property, obj[property]]
        items.push(o)
      }
      return items
    }

    initPagination() {
      this.scope.totalItems = this.scope.items.length
      this.checkGap(this.scope, this.scope.items)
      this.scope.searchTable()
    }
  }
  controllers.controller('managerCdbIdCtrl', CdbListId)
})
