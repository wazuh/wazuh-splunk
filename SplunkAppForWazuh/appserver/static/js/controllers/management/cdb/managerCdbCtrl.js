define([
  '../../module',
  '../rules/ruleset',
  '../../../directives/wz-table/lib/pagination',
  '../../../directives/wz-table/lib/check-gap'
], function (
  controllers,
  Ruleset,
  pagination,
  checkGap
) {
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
       */
      constructor(
        $scope,
        $sce,
        $notificationService,
        $currentDataService,
        $tableFilterService,
        $csvRequestService,
        isAdmin,
        $cdbEditor,
        $restartService
      ) {
        super(
          $scope,
          $sce,
          $notificationService,
          'cbd',
          $currentDataService,
          $tableFilterService,
          $csvRequestService,
          $restartService
        )
        this.pagination = pagination
        this.checkGap = checkGap
        this.isAdmin = isAdmin
        this.cdbEditor = $cdbEditor
        this.restartService = $restartService
      }

      /**
       * On controller load
       */
      $onInit() {
        this.scope.downloadCsv = (path, name) => this.downloadCsv(path, name)
        this.scope.$broadcast('wazuhSearch', { term: '', removeFilters: true })
        this.scope.selectedNavTab = 'cdbList'
        this.scope.adminMode = this.isAdmin

        /**
         * Functions to edit a CDB lists binded to the scope
         */
        this.scope.addEntry = (key, value) => this.addEntry(key, value)
        this.scope.setEditingKey = (key, value) => this.setEditingKey(key, value)
        this.scope.cancelEditingKey = () => this.cancelEditingKey()
        this.scope.showConfirmRemoveEntry = (ev, key) => this.showConfirmRemoveEntry(ev, key)
        this.scope.editKey = (key, value) => this.editKey(key, value)
        this.scope.cancelRemoveEntry = () => this.cancelRemoveEntry()
        this.scope.confirmRemoveEntry = (key) => this.confirmRemoveEntry(key)
        this.scope.cancelCdbListEdition = () => this.cancelCdbListEdition()
        this.scope.addNewFile = () => this.addNewFile()
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
        this.scope.searchTable = () => this.pagination.searchTable(this.scope, this.scope.items)
        this.scope.groupToPages = () => this.pagination.groupToPages(this.scope)
        //this.initPagination()
        this.scope.range = (size, start, end) => this.pagination.range(size, start, end, this.scope.gap)
        this.scope.prevPage = () => this.pagination.prevPage(this.scope)
        this.scope.nextPage = async currentPage => this.pagination.nextPage(currentPage, this.scope, this.notificationService, null)
        this.scope.setPage = (n) => {
          this.scope.currentPage = n
          this.scope.nextPage(n)
        }
        this.scope.filterContent = (filter) => this.filterContent(filter)

        this.scope.restart = () => this.restart()
        this.scope.closeRestartConfirmation = () => this.closeRestartConfirmation()

        this.scope.$on('loadedTable', () => {
          try {
            if (window.localStorage.cdb) {
              const parsedFilter = JSON.parse(window.localStorage.cdb)
              this.scope.appliedFilters = parsedFilter
              if (this.filter.length > 0) {
                this.scope.$broadcast('wazuhFilter', { filter: this.filter })
              }
            }
          } catch (err) {
            this.toast('Error applying filter')
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
       * Adds new CDB list file
       */
      addNewFile() {
        try {
          this.scope.addingNewFile = true
          this.scope.currentList = {
            list: {},
            details:
            {
              file: '',
              path: 'etc/lists'
            }
          }
        } catch (error) {
          this.toast("Cannot add new CDB list file.")
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
       * Adds new entry field
       * @param {String} key 
       * @param {String} value 
       */
      async addEntry(key, value) {
        try {
          if (!key) {
            this.toast("Cannot send empty fields.")
          } else {
            if (!this.scope.currentList.list[key]) {
              value = value ? value : ''
              this.scope.currentList.list[key] = value
              this.scope.newKey = ''
              this.scope.newValue = ''
              this.refreshCdbList()
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
          this.toast("Error editing value.")
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
          this.toast("Error deleting entry.")
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
          const constainsBlanks = /.* .*/
          const fileName = this.scope.currentList.details.file
          if (fileName) {
            if (constainsBlanks.test(fileName)) {
              this.toast('Error creating a new file. The filename can not contain white spaces.')
            } else {
              this.scope.saveIncomplete = true
              const path = this.scope.currentList.details.path
              const content = this.objToString(this.scope.currentList.list)
              const result = await this.cdbEditor.sendConfiguration(fileName, path, content)
              if (
                result &&
                result.data &&
                result.data.error === 0
              ) {
                this.toast("File saved successfully.")
                this.scope.restartAndApply = true
                this.scope.saveIncomplete = false
                this.scope.$applyAsync()
              } else {
                throw new Error(`Error creating new CDB list `, result)
              }
            }
          } else {
            this.toast('Please set a name for the new CDB list.')
          }
        } catch (error) {
          this.scope.saveIncomplete = false
          this.toast(`Cannot created ${fileName}`)
        }
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
          if (keyValue[0])
            result[keyValue[0]] = keyValue[1]
        })
        return result
      }

      /**
       * Converts object to string
       * @param {Object} obj 
       */
      objToString(obj) {
        let raw = '';
        for (var key in obj) {
          raw = raw.concat(`${key}:${obj[key]}\n`);
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
