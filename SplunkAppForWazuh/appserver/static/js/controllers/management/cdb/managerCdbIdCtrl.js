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
      $cdbEditor
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

        //Remove static values
        this.scope.currentList = {
          details: {
            file: 'audit-keys',
            path: '/etc/lists'
          }
        }

        this.fetchFile().then((result) => {
          this.scope.currentList.list = result.data.data
          if (!this.scope.$$phase) this.scope.$digest()
        }).catch((error) => {
          throw new Error(error)
        })

        this.scope.adminMode = this.extensions['admin'] === 'true'
      } catch (error) {
        this.toast("Error fetching CDB list")
        console.error("Error fetching CDB list ", error)
      }

    }

    //Set this API call in the resolve
    async fetchFile() {
      // MISSING API CALL TO DO THIS
      try {
        const result = await this.cdbEditor.getConfiguration('audit-keys')
        return result
      } catch (error) {
        console.error(error)
        this.toast("Error fetching CDB list configuration")
      }
    }

    addEntry(key, value) {
      if (!this.scope.currentList.list[key]) {
        this.scope.currentList.list[key] = value
        this.scope.newKey = ''
        this.scope.newValue = ''
        this.saveList()
      } else {
        this.toast("Error adding new entry, the key exists.")
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

    editKey(key, newValue) {
      this.scope.currentList.list[key] = newValue
      this.cancelEditingKey()
      this.saveList()
    }

    cancelRemoveEntry() {
      this.scope.removingEntry = false
    }

    confirmRemoveEntry(key) {
      delete this.scope.currentList.list[key]
      this.scope.removingEntry = false
      this.saveList()
    }

    saveList() {
      this.toast("CDB List saved")
    }
  }
  controllers.controller('managerCdbIdCtrl', CdbListId)
})
