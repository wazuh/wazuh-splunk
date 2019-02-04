define([
  '../../module', '../rules/ruleset',
  '../../../directives/wz-table/lib/pagination',
  '../../../directives/wz-table/lib/check-gap'],
  function (
    controllers,
    Ruleset,
    pagination,
    checkGap) {
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
     */
    constructor(
      $scope,
      $sce,
      $notificationService,
      $state,
      $currentDataService,
      $tableFilterService,
      $csvRequestService,
      extensions,
      $cdbEditor,
      cdbInfo,
      $filter
    ) {
      super(
        $scope,
        $sce,
        $notificationService,
        'cdb',
        $currentDataService,
        $tableFilterService,
        $csvRequestService
      )
      this.state = $state
      this.extensions = extensions
      this.cdbEditor = $cdbEditor
      this.cdbInfo = cdbInfo
      this.notificationService = $notificationService
      this.pagination = pagination
      this.checkGap = checkGap
      this.filter = $filter
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
      try {
        this.scope.downloadCsv = (path, name) => this.downloadCsv(path, name)
        this.scope.addDetailFilter = (name, value) =>
          this.addDetailFilter(name, value)

        //Scope methods
        this.scope.addEntry = (key, value) => this.addEntry(key, value)
        this.scope.setEditingKey = (key, value) => this.setEditingKey(key, value)
        this.scope.cancelEditingKey = () => this.cancelEditingKey()
        this.scope.showConfirmRemoveEntry = (ev, key) => this.showConfirmRemoveEntry(ev, key)
        this.scope.editKey = (key, value) => this.editKey(key, value)
        this.scope.cancelRemoveEntry = () => this.cancelRemoveEntry()
        this.scope.confirmRemoveEntry = (key) => this.confirmRemoveEntry(key)

        // Edit cdb lists
        this.scope.currentList = {
          details: {
            file: this.cdbInfo.file,
            path: this.cdbInfo.path
          }
        }
        this.cdbInfo.content = this.stringToObj(this.cdbInfo.content)

        this.scope.currentList.list = this.cdbInfo.content
        this.scope.adminMode = this.extensions['admin'] === 'true'

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
        this.scope.searchTable = () => this.pagination.searchTable(this.scope, this.scope.items)
        this.scope.groupToPages = () => this.pagination.groupToPages(this.scope) 
        this.initPagination()
        this.scope.range = (size, start, end) => this.pagination.range(size, start, end, this.scope.gap)
        this.scope.prevPage = () => this.pagination.prevPage(this.scope)
        this.scope.nextPage = async currentPage => this.pagination.nextPage(currentPage, this.scope, this.notificationService, null)
        this.scope.setPage = (n) => {
          this.scope.currentPage = n
          this.scope.nextPage(n)
        }
        this.scope.filterContent = (filter) => this.filterContent(filter)
        
      } catch (error) {
        console.error(error)
        this.toast("Error editing CDB list")
      }

    }

    async filterContent(filter) {
      this.scope.items = this.filter('filter')(this.contentToFilter, filter)
      this.initPagination()
    }

    async fetchFile(fileName, path) {
      try {
        const result = await this.cdbEditor.getConfiguration(fileName, path)
        return result
      } catch (error) {
        return Promise.reject(error)
      }
    }

    async addEntry(key, value) {
      try {
        if (!key || !value) {
          this.toast("Cannot send empty fields.")
        } else {
          if (!this.scope.currentList.list[key]) {
            this.scope.currentList.list[key] = value
            this.scope.newKey = ''
            this.scope.newValue = ''
            await this.saveList()
          } else {
            this.toast("Error adding new entry, the key exists.")
          }
        }
      } catch (error) {
        this.toast("Error adding entry.")
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

    showConfirmRemoveEntry(ev, key) {
      this.scope.removingEntry = key
    }

    async editKey(key, newValue) {
      try {
        this.scope.currentList.list[key] = newValue
        this.cancelEditingKey()
        await this.saveList()
      } catch (error) {
        this.toast("Error editing value.")
      }
    }

    cancelRemoveEntry() {
      this.scope.removingEntry = false
    }

    async confirmRemoveEntry(key) {
      try {
        delete this.scope.currentList.list[key]
        this.scope.removingEntry = false
        await this.saveList()
      } catch (error) {
        this.toast("Error deleting entry.")
      }

    }

    async saveList() {
      try {
        const fileName = this.scope.currentList.details.file
        const path = this.scope.currentList.details.path
        const content = this.objToString(this.scope.currentList.list)
        const check = await this.cdbEditor.sendConfiguration(fileName, path, content)
        const cdbUpdated = await this.fetchFile(fileName, path)
        this.scope.currentList.list = this.stringToObj(cdbUpdated)
        // Re-init pagination
        this.scope.items = this.cdbToArr()
        this.contentToFilter = this.scope.items
        this.initPagination()
        this.toast("CDB list updated.")
        if (!this.scope.$$phase) this.scope.$digest()
      } catch (error) {
        return Promise.reject(error)
      }
    }

    stringToObj(string) {
      let result = {}
      const splitted = string.split('\n')
      splitted.forEach((element) => {
        const keyValue = element.split(':')
        if (keyValue[0])
          result[keyValue[0]] = keyValue[1]
      })
      return result
    }

    objToString(obj) {
      let raw = '';
      for (var key in obj) {
        raw = raw.concat(`${key}:${obj[key]}\n`);
      }
      return raw
    }
    
    cdbToArr(){
      const obj = this.scope.currentList.list
      let items = []
      for (var property in obj) {
        let o = [property, obj[property]]
        items.push(o)
      }
      return items
    }

    initPagination(){
      this.scope.totalItems = this.scope.items.length
      this.checkGap(this.scope, this.scope.items)
      this.scope.searchTable()      
    }

  }
  controllers.controller('managerCdbIdCtrl', CdbListId)
})
