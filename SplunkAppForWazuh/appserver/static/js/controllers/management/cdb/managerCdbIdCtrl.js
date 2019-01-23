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
      extensions
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

      //Remove static values
      this.scope.currentList = {
        details: {
          file: 'audit-keys',
          path: '/etc/lists'
        }
      }

      // Edit cdb lists
      //Remove when fetchFile() works, only for a example
      this.currentList = this.fetchFile()
      this.scope.currentList.list = this.currentList
      this.scope.adminMode = this.extensions['admin'] === 'true'
    }

    //Change to async
    fetchFile() {
      // MISSING API CALL TO DO THIS
      return { "audit-wazuh-a": "attribute", "audit-wazuh-x": "execute", "audit-wazuh-c": "command", "audit-wazuh-r": "read", "audit-wazuh-w": "write" }
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
