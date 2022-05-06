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
     * @param {*} extensions
     * @param {*} $fileEditor
     * @param {*} $restartService
     * @param {*} $requestService
     * @param {*} $security_service
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
      $requestService,
      $security_service
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
      this.scope.canUpdateDecoderFile = (filename) =>
        $security_service.isAllowed(
          'DECODERS_UPDATE',
          ['DECODER_FILE'],
          [filename]
        )
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
        this.scope.currentDecoder =
          this.currentDecoder.data.data.affected_items[0]
        this.scope.downloadCsv = (path, name) => this.downloadCsv(path, name)
        this.scope.addDetailFilter = (name, value) =>
          this.addDetailFilter(name, value)
        this.scope.isLocal =
          this.scope.currentDecoder.relative_dirname === 'etc/decoders'
        this.scope.saveDecoderConfig = (fileName) =>
          this.saveDecoderConfig(fileName)
        this.scope.closeEditingFile = () => this.closeEditingFile()
        this.scope.editDecoder = (fileName) => this.editDecoder(fileName)

        this.scope.restart = () => this.restart()
        this.scope.closeRestartConfirmation = () =>
          this.closeRestartConfirmation()
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
        //Refresh decoder info
        const result = await this.requestService.apiReq(
          `/decoders?decoder_names=${this.scope.currentDecoder.name}`
        )
        if (result.data.data.totalItems === 0) {
          this.state.go('mg-decoders')
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
        dir: 'etc/decoders',
        overwrite: true,
      })
    }

    async editDecoder(fileName) {
      try {
        const readOnly = !(
          this.scope.currentDecoder.relative_dirname === 'etc/decoders'
        )
        await this.fetchFileContent(
          fileName,
          this.scope.currentDecoder.relative_dirname,
          readOnly
        )
      } catch (error) {
        this.notification.showErrorToast(error.message || error)
      }
      return
    }

    /**
     * Fetches file content
     * @param {String} file
     */
    async fetchFileContent(file, path, readOnly = false) {
      try {
        this.scope.editingFile = true
        this.scope.readOnly = readOnly
        if (readOnly) {
          if (!file.startsWith('ruleset/decoders')) {
            this.scope.fileName = file
            this.scope.XMLContent = await this.fileEditor.getConfiguration(
              file,
              path,
              null,
              readOnly
            )
            this.scope.$broadcast('XMLContentReady', {
              data: this.scope.XMLContent,
            })
          } else {
            this.scope.XMLContent = await this.fileEditor.getConfiguration(
              file,
              path,
              null,
              readOnly
            )
            return this.scope.XMLContent
          }
        } else {
          if (file.startsWith('etc/decoders/')) {
            this.scope.fetchedXML = await this.fileEditor.getConfiguration(
              file,
              path,
              null,
              readOnly
            )
            return this.scope.fetchedXML
          } else {
            this.scope.fetchedXML = await this.fileEditor.getConfiguration(
              file,
              path,
              null,
              readOnly
            )
            this.scope.$broadcast('fetchedFile', {
              data: this.scope.fetchedXML,
            })
          }
        }
      } catch (error) {
        this.scope.fetchedXML = null
        this.notification.showErrorToast(error.message || error)
        return Promise.reject(error)
      }
      this.scope.$applyAsync()
      return
    }
  }
  controllers.controller('managerDecodersIdCtrl', DecodersId)
})
