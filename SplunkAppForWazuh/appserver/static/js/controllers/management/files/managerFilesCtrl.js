define([
  '../../module',
], function (
  controllers,
  ) {
    'use strict'
    class Files {
      /**
       * Class Files
       * @param {*} $scope
       * @param {*} $notificationService
       * @param {*} $currentDataService
       * @param {*} isAdmin
       * @param {*} localRules
       * @param {*} localDecoders
       * @param {*} cdbLists
       * @param {*} $fileEditor
       */
      constructor(
        $scope,
        $notificationService,
        $currentDataService,
        isAdmin,
        $restartService,
        $fileEditor,
      ) {
        this.scope = $scope
        this.notification = $notificationService
        this.currentDataService = $currentDataService
        this.isAdmin = isAdmin
        this.restartService = $restartService
        this.fileEditor = $fileEditor
      }

      /**
       * On controller load
       */
      $onInit() {
        this.scope.$broadcast('wazuhSearch', { term: '', removeFilters: true })
        this.scope.selectedNavTab = 'files'
        this.scope.selectedSubNavTab = 'rules'
        this.scope.adminMode = this.isAdmin

        this.scope.switchSubTab = (tab) => this.switchSubTab(tab)
        this.scope.search = term => this.search(term)

        this.scope.$on('editFile', (ev, params) => {
          this.editFile(params.file, params.path)
        })

        this.scope.$on('configSavedSuccessfully', () => {
          this.scope.restartAndApply = true
        })

        this.scope.$on('saveComplete', () => {
          this.scope.saveIncomplete = false
        })

        this.scope.closeEditingFile = () => this.closeEditingFile()
        this.scope.xmlIsValid = valid => this.xmlIsValid(valid)
        this.scope.saveFile = file => this.saveFile(file)
        this.scope.closeRestartConfirmation = () => this.closeRestartConfirmation()
        this.scope.restart = () => this.restart()

      }

      /**
       * Open xml editior box
       * @param {String} file
       */
      async editFile(file, path) {
        this.scope.$broadcast('fetchedFile', { data: this.scope.fetchedXML })
        try {
          this.scope.editingFile = {
            file,
            path: `${path}/${file}`
          }
          this.scope.fetchedXML = await this.fetchFileContent(`${path}/${file}`)
          this.scope.$broadcast('fetchedFile', { data: this.scope.fetchedXML })
        } catch (error) {
          this.scope.fetchedXML = null
          this.notification.showErrorToast(error.message || error)
        }
        this.scope.$applyAsync()
        return
      }

      /**
       * Close the editing xml box
       */
      closeEditingFile() {
        this.scope.saveIncomplete = false
        this.scope.editingFile = false
        this.scope.$applyAsync()
      }

      /**
       * Checks if xml content is valid
       * @param {Boolean} valid 
       */
      xmlIsValid(valid) {
        this.scope.xmlHasErrors = valid
        this.scope.$applyAsync()
      }

      /**
       * Saves the file content
       * @param {String} file 
       */
      saveFile(file) {
        this.scope.saveIncomplete = true
        this.scope.$broadcast('saveXmlFile', {
          file,
          overwrite: true
        })
      }

      /**
       * Closes the confirm of restart message
       */
      closeRestartConfirmation() {
        this.scope.restartAndApply = false
      }

      /**
       * Fetchs file content
       * @param {String} file 
       */
      async fetchFileContent(file) {
        try {
          const result = await this.fileEditor.getConfiguration(file)
          return result
        } catch (error) {
          return Promise.reject(error)
        }
      }

      /**
       * Switch between subtabs
       * @param {String} tab 
       */
      switchSubTab(tab) {
        this.scope.selectedSubNavTab = tab
      }

      /**
       * Searches a rule
       * @param {String} term
       */
      search(term) {
        if (!term) term = ''
        this.scope.$broadcast('wazuhSearch', { term, removeFilters: false })
        return
      }

      /**
       * Restarts the manager or cluster
       */
      async restart() {
        try {
          const result = await this.restartService.restart()
          this.notification.showSimpleToast(result)
        } catch (error) {
          this.notification.showErrorToast(error)
        }
      }

    }
    controllers.controller('managerFilesCtrl', Files)
    return Files
  })
