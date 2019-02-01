define([
  '../../../module',
  '../../../../directives/wz-table/lib/pagination',
  '../../../../directives/wz-table/lib/check-gap'
], function (
    controllers,
    pagination,
    checkGap
    ) {
  'use strict'

  class EditRulesetCtrl {
    constructor($scope, $notificationService, isAdmin, $fileEditor, $cdbEditor, $filter) {
      this.scope = $scope
      this.notificationService = $notificationService
      this.toast = this.notificationService.showSimpleToast
      this.isAdmin = isAdmin
      this.fileEditor = $fileEditor
      this.cdbEditor = $cdbEditor
      this.pagination = pagination
      this.checkGap = checkGap
      this.filter = $filter
    }

    $onInit() {
      try {
        this.scope.adminMode = this.isAdmin
        this.scope.editionType = 'rules'
        this.scope.subTabName = 'rules'
        this.scope.editing = 'local rules'

        this.scope.search = term => this.search(term)
        this.scope.switchSubTab = subTabName => this.switchSubTab(subTabName)

        //Edit rules and decoders
        this.scope.saveRuleConfig = (fileName, dir) => this.saveRuleConfig(fileName, dir)
        this.scope.closeEditingFile = () => this.closeEditingFile()
        this.scope.xmlIsValid = valid => this.xmlIsValid(valid)
        this.scope.editRule = (fileName, dir) => this.editRule(fileName, dir)

        //Add new rules or decoders file
        this.scope.addNewRulesetFile = type => this.addNewRulesetFile(type)
        this.scope.closeAddingFile = () => this.closeAddingFile()

        //Edit cdb lists
        this.scope.addEntry = (key, value) => this.addEntry(key, value)
        this.scope.setEditingKey = (key, value) => this.setEditingKey(key, value)
        this.scope.cancelEditingKey = () => this.cancelEditingKey()
        this.scope.showConfirmRemoveEntry = (ev, key) => this.showConfirmRemoveEntry(ev, key)
        this.scope.editKey = (key, value) => this.editKey(key, value)
        this.scope.cancelRemoveEntry = () => this.cancelRemoveEntry()
        this.scope.confirmRemoveEntry = (key) => this.confirmRemoveEntry(key)
        this.scope.cancelCdbListEdition = () => this.cancelCdbListEdition()
        this.scope.$on("quickRuleEdit", (event, data) => {
          this.editRule(data.item.file, 'rules')
        })
  
        this.scope.$on("quickDecoderEdit", (event, data) => {
          this.editRule(data.item.file, 'decoders')
        })
  
        this.scope.$on("quickCdbListEdit", async (event, data) => {
          try {
            this.scope.currentList = {
              details:
              {
                file: data.item.name,
                path: data.item.path
              }
            }
            const currentList = await this.cdbEditor.getConfiguration(data.item.name, data.item.path)
            this.scope.currentList.list = this.stringToObj(currentList)
            /**
             * Pagination variables and functions (CDB lists)
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
            if (!this.scope.$$phase) this.scope.$digest()
          } catch (error) {
            this.switchSubTab('cdbLists')
            this.toast(error)
          }
        })
      } catch (error) {
        this.toast(error)
      }

    }

    search(term) {
      this.scope.$broadcast('wazuhSearch', { term, removeFilters: false })
      return
    }

    switchSubTab(subTabName) {
      this.closeEditingFile()
      this.cancelEditingKey()
      this.scope.currentList = false
      this.scope.subTabName = subTabName
      this.scope.editionType = subTabName
      switch (subTabName) {
        case 'rules':
          this.scope.editing = 'local rules'
          break
        case 'decoders':
          this.scope.editing = 'local decoders'
          break
        case 'cdbLists':
          this.scope.editing = 'CDB lists'
          break
      }
      if (!this.scope.$$phase) this.scope.$digest()
    }

    // Add new rules or decoders file functions
    addNewRulesetFile(type){
      this.scope.addingNewFile = true
      this.scope.editingFile = {
        file: `new file`,
        dir: type
      }
      this.scope.addingNewFile = true
      this.scope.fetchedXML = `<!-- Configure your local ${type} here -->`
    }

    // Edit rules and decoders functions
    closeEditingFile() {
      this.scope.editingFile = false
      this.scope.addingNewFile = false
      this.scope.fetchedXML = ''
      this.scope.newFileName = ''
      this.search('')
    }

    xmlIsValid(valid) {
      this.scope.xmlHasErrors = valid
      if (!this.scope.$$phase) this.scope.$digest()
    }

    saveRuleConfig(fileName, dir) {
      if (this.scope.addingNewFile) {
        fileName = this.scope.newFileName
        fileName = fileName.includes('.xml') ? fileName : `${fileName}.xml`
      }
      if (fileName !== '.xml') {
        this.scope.$broadcast('saveXmlFile', {
          file: fileName,
          dir: dir
        })
      } else {
        this.toast('Please set a valid name.')
      }
    }

    async editRule(fileName, dir) {
      try {
        this.scope.editingFile = {
          file: fileName,
          dir: dir
        }
        this.scope.fetchedXML = await this.fetchFileContent(fileName, dir)
        this.scope.$broadcast('fetchedFile', { data: this.scope.fetchedXML })
      } catch (error) {
        this.scope.fetchedXML = null
        this.toast(error.message || error)
      }
      if (!this.scope.$$phase) this.scope.$digest()
      return
    }

    async fetchFileContent(fileName, dir) {
      try {
        const result = await this.fileEditor.getConfiguration(fileName, dir)
        return result
      } catch (error) {
        return Promise.reject(error)
      }
    }

    // Edit CDB Lists functions

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
        console.error(error)
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
        console.error(error)
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
      splitted.forEach(function (element) {
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

    cancelCdbListEdition() {
      this.cancelEditingKey()
      this.scope.currentList = false
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
  controllers.controller('editRulesetCtrl', EditRulesetCtrl)
})
