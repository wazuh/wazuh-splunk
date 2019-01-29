define(['../../module', '../rules/ruleset'], function (controllers, Ruleset) {
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
      cdbInfo
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
      } catch (error) {
        this.toast("Error editing CDB list")
      }

    }

    async fetchFile(fileName) {
      try {
        const result = await this.cdbEditor.getConfiguration(fileName)
        return result
      } catch (error) {
        return Promise.reject(error)
      }
    }

    async addEntry(key, value) {
      try {
        if (!this.scope.currentList.list[key]) {
          this.scope.currentList.list[key] = value
          this.scope.newKey = ''
          this.scope.newValue = ''
          await this.saveList()
        } else {
          this.toast("Error adding new entry, the key exists.")
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
        const check = await this.cdbEditor.sendConfiguration(fileName, this.scope.currentList.list)
        const cbdUpdated = await this.fetchFile(fileName)
        this.scope.currentList.list = cbdUpdated
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

  }
  controllers.controller('managerCdbIdCtrl', CdbListId)
})
