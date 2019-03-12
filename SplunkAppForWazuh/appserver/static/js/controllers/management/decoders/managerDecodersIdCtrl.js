define(['../../module', '../rules/ruleset'], function (controllers, Ruleset) {
  'use strict'

  class DecodersId extends Ruleset {
    /**
     * Class Decoders-ID
     * @param {*} $scope
     * @param {*} $sce
     * @param {*} $notificationService
     * @param {*} $state
     * @param {Object} currentDecoder
     * @param {*} $currentDataService
     * @param {*} $tableFilterService
     * @param {*} $csvRequestService
     */
    constructor(
      $scope,
      $sce,
      $notificationService,
      $state,
      currentDecoder,
      $currentDataService,
      $tableFilterService,
      $csvRequestService,
      extensions,
      $fileEditor,
      $restartService,
      $requestService
    ) {
      super(
        $scope,
        $sce,
        $notificationService,
        'decoders',
        $currentDataService,
        $tableFilterService,
        $csvRequestService,
        $restartService
      )
      this.state = $state
      this.extensions = extensions
      this.fileEditor = $fileEditor
      this.restartService = $restartService
      this.requestService = $requestService
      this.currentDecoder = currentDecoder
    }

    /**
     * On controller load
     */
    $onInit() {
      try {
        try {
          this.filters = JSON.parse(window.localStorage.decoders) || []
        } catch (error) {
          this.filters = []
        }
        this.scope.currentDecoder = this.currentDecoder.data.data.items[0]
        this.scope.downloadCsv = (path, name) => this.downloadCsv(path, name)
        this.scope.addDetailFilter = (name, value) =>
          this.addDetailFilter(name, value)
        this.scope.adminMode = this.extensions['admin'] === 'true'
        this.scope.isLocal = this.scope.currentDecoder.path === 'etc/decoders'
        this.scope.saveDecoderConfig = fileName => this.saveDecoderConfig(fileName)
        this.scope.closeEditingFile = () => this.closeEditingFile()
        this.scope.editDecoder = fileName => this.editDecoder(fileName)

        this.scope.restart = () => this.restart()
        this.scope.closeRestartConfirmation = () => this.closeRestartConfirmation()
      } catch (error) {
        this.state.go('mg-decoders')
      } 
    }

    /**
     * Adds a filter
     * @param {String} name
     * @param {String} value
     */
    addDetailFilter(name, value) {
      try {
        const filter = { name: name, value: value }
        this.filters.push(filter)
        window.localStorage.setItem('decoders', JSON.stringify(this.filters))
        this.state.go('mg-decoders')
      } catch (err) {
        this.notification.showErrorToast(err.message || err)
      }
    }

    async closeEditingFile() {
      try {
        this.scope.restartAndApply = false
        //Refresh decoder info
        const result = await this.requestService.apiReq(`/decoders/${this.scope.currentDecoder.name}`)
        if (result.data.data.totalItems === 0) {
          this.state.go('mg-decoders')
        } else {
        }
        this.scope.currentDecoder = result.data.data.items[0]
      } catch (error) {
        this.state.go('mg-decoders')
      }
      this.scope.editingFile = false
      this.scope.$applyAsync()
    }

    saveDecoderConfig(fileName) {
      this.scope.saveIncomplete = true
      this.scope.$broadcast('saveXmlFile', {
        file: fileName,
        dir: 'decoders',
        overwrite: true
      })
    }

    async editDecoder(fileName) {
      try {
        this.scope.editingFile = true
        this.scope.fetchedXML = await this.fetchFileContent(fileName)
        this.scope.$broadcast('fetchedFile', { data: this.scope.fetchedXML })
      } catch (error) {
        this.scope.fetchedXML = null
        this.notification.showErrorToast(error.message || error)
      }
      if (!this.scope.$$phase) this.scope.$digest()
      return
    }

    async fetchFileContent(fileName) {
      try {
        const result = await this.fileEditor.getConfiguration(fileName, 'decoders')
        return result
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
  controllers.controller('managerDecodersIdCtrl', DecodersId)
})
