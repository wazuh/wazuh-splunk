define([
  '../../module',
  '../rules/ruleset',
  '../../../directives/wz-table/lib/pagination',
  '../../../directives/wz-table/lib/check-gap',
], function (controllers, Ruleset, pagination, checkGap) {
  'use strict'
  class CDBList extends Ruleset {
    /**
     * Class cdb
     * @param {*} $scope
     * @param {*} $sce
     * @param {*} $notificationService
     * @param {*} $currentDataService
     * @param {*} $tableFilterService
     * @param {*} $csvRequestService
     * @param {*} $cdbEditor
     * @param {*} $restartService
     * @param {*} $security_service
     */
    constructor(
      $scope,
      $sce,
      $notificationService,
      $currentDataService,
      $tableFilterService,
      $csvRequestService,
      $cdbEditor,
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
      this.pagination = pagination
      this.checkGap = checkGap
      this.cdbEditor = $cdbEditor
      this.restartService = $restartService

      /* RBAC flags */
      this.scope.canReadLists = $security_service.isAllowed(
        'LISTS_READ',
        ['LIST_FILE'],
        ['*']
      )
      this.scope.canUpdateLists = $security_service.isAllowed('LISTS_UPDATE', [
        'RESOURCELESS',
      ])
    }

    /**
     * On controller load
     */
    $onInit() {
      // Data validation
      this.scope.nameValidationRegex = '^[\\w\\-]+$'
      this.scope.keyValidationRegex = '(?:^"([\\w\\-:]+?)"|^[^:"\\s]+$)'
      this.scope.valueValidationRegex = '(?:^"([\\w\\-:]*?)"$|^[^:"]*$)'

      this.scope.overwrite = false
      this.scope.downloadCsv = (path, name) => this.downloadCsv(path, name)
      this.scope.$broadcast('wazuhSearch', { term: '', removeFilters: true })
      this.scope.selectedNavTab = 'cdbList'

      /**
       * Functions to edit a CDB lists binded to the scope
       */
      this.scope.addEntry = (key, value) => this.addEntry(key, value)
      this.scope.setEditingKey = (key, value) => this.setEditingKey(key, value)
      this.scope.cancelEditingKey = () => this.cancelEditingKey()
      this.scope.showConfirmRemoveEntry = (ev, key) =>
        this.showConfirmRemoveEntry(ev, key)
      this.scope.editKey = (key, value) => this.editKey(key, value)
      this.scope.cancelRemoveEntry = () => this.cancelRemoveEntry()
      this.scope.confirmRemoveEntry = (key) => this.confirmRemoveEntry(key)
      this.scope.cancelCdbListEdition = () => this.cancelCdbListEdition()
      this.scope.addNewFile = () => this.addNewFile()
      this.scope.saveList = () => this.saveList()
      this.scope.enableSave = () => this.enableSave()

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
      //this.initPagination()
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
      this.scope.filterContent = (filter) => this.filterContent(filter)

      this.scope.restart = () => this.restart()
      this.scope.closeRestartConfirmation = () =>
        this.closeRestartConfirmation()

      this.scope.$on('loadedTable', (event) => {
        event.stopPropagation()
        try {
          if (window.localStorage.cdb) {
            const parsedFilter = JSON.parse(window.localStorage.cdb)
            this.scope.appliedFilters = parsedFilter
            if (this.filter.length > 0) {
              this.scope.$broadcast('wazuhFilter', { filter: this.filter })
            }
          }
        } catch (err) {
          this.notification.showErrorToast('Error applying filter')
        }
      })
    }

    /**
     * Filters the content of CDB lists
     * @param {*} filter
     */
    async filterContent(filter) {
      this.scope.items = this.filter('filter')(this.contentToFilter, filter)
      this.initPagination()
    }

    /**
     * Validate the given name for the new CDB list.
     *
     * @param {String} name given name
     * @returns {Boolean}
     */
    isValidName = (name) => {
      return new RegExp(this.scope.nameValidationRegex).test(name)
    }

    /**
     * Adds new CDB list file
     */
    addNewFile() {
      try {
        this.scope.overwrite = false
        this.scope.addingNewFile = true
        this.scope.currentList = {
          list: {},
          details: {
            file: '',
            path: 'etc/lists',
          },
        }
      } catch (error) {
        this.notification.showErrorToast('Cannot add new CDB list file.')
      }
    }

    /**
     * Cancels CDB list edition
     */
    cancelCdbListEdition() {
      this.scope.currentList = false
      this.scope.addingNewFile = false
      this.scope.items = null
      this.scope.totalItems = null
      this.scope.pagedItems = null
      this.scope.currentPage = 0
      this.scope.gap = 0
      this.cancelEditingKey()
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

    /**
     * Shows confirmation to remove a field
     * @param {*} ev
     * @param {String} key
     */
    showConfirmRemoveEntry(ev, key) {
      this.scope.removingEntry = key
    }

    /**
     * Sets a new value for a field
     * @param {String} key
     * @param {String} newValue
     */
    async editKey(key, newValue) {
      try {
        this.scope.currentList.list[key] = newValue
        this.cancelEditingKey()
        this.refreshCdbList()
      } catch (error) {
        this.notification.showErrorToast('Error editing value.')
      }
    }

    /**
     * Cancels the removing of a entry
     */
    cancelRemoveEntry() {
      this.scope.removingEntry = false
    }

    /**
     * Confirms if wants to remove a entry
     * @param {String} key
     */
    async confirmRemoveEntry(key) {
      try {
        delete this.scope.currentList.list[key]
        this.scope.removingEntry = false
        this.refreshCdbList()
      } catch (error) {
        this.notification.showErrorToast('Error deleting entry.')
      }
    }

    /**
     * Refreshs CDB list fields
     */
    refreshCdbList() {
      this.scope.items = this.cdbToArr()
      this.initPagination()
      this.scope.$applyAsync()
    }

    /**
     * Saves the CDB list content
     */
    async saveList() {
      try {
        const fileName = this.scope.currentList.details.file

        if (!this.isValidName(fileName)) {
          this.notification.showErrorToast(
            `List's name must match this regular expresion: ${this.scope.nameValidationRegex}`
          )
        } else {
          this.scope.saveIncomplete = true
          const path = this.scope.currentList.details.path
          const content = this.objToString(this.scope.currentList.list)
          const result = await this.cdbEditor.sendConfiguration(
            fileName,
            path,
            content
          )
          if (result && result.data && result.data.error === 0) {
            this.notification.showSuccessToast('File saved successfully.')
            this.scope.saveIncomplete = false
            this.scope.$applyAsync()
          } else if (result.data.error === 1905) {
            this.notification.showWarningToast(
              result.data.message || 'File already exists.'
            )
            this.scope.overwrite = true
            this.scope.saveIncomplete = false
            this.scope.$applyAsync()
          } else {
            throw new Error(result.data.message || 'Cannot send this file.')
          }
        }
      } catch (error) {
        this.scope.saveIncomplete = false
        this.notification.showErrorToast(error)
      }
    }

    /**
     * Enables save button
     */
    enableSave() {
      this.scope.overwrite = false
    }

    /**
     * Converts string to object
     * @param {String} string
     */
    stringToObj(string) {
      let result = {}
      const splitted = string.split('\n')
      splitted.forEach((element) => {
        const keyValue = element.split(':')
        if (keyValue[0]) result[keyValue[0]] = keyValue[1]
      })
      return result
    }

    /**
     * Converts object to string
     * @param {Object} obj
     */
    objToString(obj) {
      let raw = ''
      for (var key in obj) {
        raw = raw.concat(`${key}:${obj[key]}\n`)
      }
      return raw
    }

    /**
     * Converts objecto to array
     */
    cdbToArr() {
      try {
        const obj = this.scope.currentList.list
        let items = []
        for (var property in obj) {
          let o = [property, obj[property]]
          items.push(o)
        }
        return items
      } catch (error) {
        return []
      }
    }

    /**
     * Init the table pagination
     */
    initPagination() {
      this.scope.totalItems = this.scope.items.length
      this.checkGap(this.scope, this.scope.items)
      this.scope.searchTable()
    }
  }
  controllers.controller('managerCdbCtrl', CDBList)
  return CDBList
})
