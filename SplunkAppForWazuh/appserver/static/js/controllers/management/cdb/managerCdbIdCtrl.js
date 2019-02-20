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
      $filter, 
      $mdDialog
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
      this.mdDialog = $mdDialog
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

    showConfirmRemoveEntry(ev, key) {
      this.scope.removingEntry = key
    }

    async editKey(key, newValue) {
      try {
        this.scope.currentList.list[key] = newValue
        this.cancelEditingKey()
        this.refreshCdbList()
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
        this.refreshCdbList()
      } catch (error) {
        this.toast("Error deleting entry.")
      }

    }

    refreshCdbList() {
      this.scope.items = this.cdbToArr()
      this.initPagination()
      if (!this.scope.$$phase) this.scope.$digest()
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
        await this.showRestartDialog('CDB list updated')
        if (!this.scope.$$phase) this.scope.$digest()
      } catch (error) {
        this.toast(error)
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

    async showRestartDialog(msg) {
      const confirm = this.mdDialog.confirm({
        controller: function ($scope, scope, $notificationService, $mdDialog, $restartService) {
          $scope.closeDialog = () => {
            $mdDialog.hide();
            $('body').removeClass('md-dialog-body');
          };
          $scope.confirmDialog = () => {
            $mdDialog.hide();
            scope.$broadcast('restartResponseReceived', {})
            $restartService.restart()
              .then(data => {
                $('body').removeClass('md-dialog-body');
                $notificationService.showSimpleToast(data);
                scope.$broadcast('restartResponseReceived', {})
                scope.$applyAsync();
              })
              .catch(error => {
                  $notificationService.showSimpleToast(error.message || error, 'Error restarting.')
              })     
          }
        },
        template:
          '<md-dialog class="modalTheme euiToast euiToast--success euiGlobalToastListItem">' +
          '<md-dialog-content>' +
          '<div class="euiToastHeader">' +
          '<i class="fa fa-check"></i>' +
          '<span class="euiToastHeader__title">' +
          `${msg}` +
          `. Do you want to restart now?` +
          '</span>' +
          '</div>' +
          '</md-dialog-content>' +
          '<md-dialog-actions>' +
          '<button class="md-primary md-cancel-button md-button ng-scope md-default-theme md-ink-ripple" type="button" ng-click="closeDialog()">I will do it later</button>' +
          '<button class="md-primary md-confirm-button md-button md-ink-ripple md-default-theme" type="button" ng-click="confirmDialog()">Restart</button>' +
          '</md-dialog-actions>' +
          '</md-dialog>',
        hasBackdrop: false,
        clickOutsideToClose: true,
        disableParentScroll: true,
        locals: {
          scope: this.scope,
        }
      });
      $('body').addClass('md-dialog-body');
      this.mdDialog.show(confirm);
    }

  }
  controllers.controller('managerCdbIdCtrl', CdbListId)
})
