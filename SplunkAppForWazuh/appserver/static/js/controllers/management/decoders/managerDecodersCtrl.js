define(['../../module', '../rules/ruleset'], function(controllers, Ruleset) {
  'use strict'

  class Decoders extends Ruleset {
    /**
     * Class Decoders
     * @param {*} $scope
     * @param {*} $sce
     * @param {*} $notificationService
     * @param {*} $currentDataService
     * @param {*} $tableFilterService
     * @param {*} $csvRequestService
     * @param {*} $restartService
     * @param {*} $fileEditor
     * @param {*} $security_service
     */
    constructor(
      $scope,
      $sce,
      $notificationService,
      $currentDataService,
      $tableFilterService,
      $csvRequestService,
      $restartService,
      $fileEditor,
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
        $restartService,
        $fileEditor
      )
      this.scope.typeFilter = 'all'
      this.restartService = $restartService

      /* RBAC flags */
      this.scope.canReadDecoders = $security_service.isAllowed(
        "DECODERS_READ",
        ["DECODER_FILE"],
        ["*"]
      )
      this.scope.canUpdateDecoders = $security_service.isAllowed("DECODERS_UPDATE", [
        "RESOURCELESS",
      ])
      this.scope.canUpdateDecoderFile = (filename) =>
        $security_service.isAllowed("DECODERS_UPDATE", ["DECODER_FILE"], [filename])
    }

    /**
     * On controller load
     */
    $onInit() {
      this.scope.localFilter = false
      // Reloading event listener
      this.scope.$broadcast('wazuhSearch', { term: '', removeFilters: true })
      this.scope.downloadCsv = (path, name) => this.downloadCsv(path, name)
      this.scope.onlyParents = typeFilter => this.onlyParents(typeFilter)
      this.scope.addNewFile = () => this.addNewFile()
      this.scope.saveRuleConfig = (fileName, dir, overwrite) =>
        this.saveRuleConfig(fileName, dir, overwrite)

      this.scope.selectedNavTab = 'decoders'

      this.scope.restart = () => this.restart()
      this.scope.closeRestartConfirmation = () =>
        this.closeRestartConfirmation()

      this.scope.$on('loadedTable', event => {
        event.stopPropagation()
        try {
          if (window.localStorage.decoders) {
            const parsedFilter = JSON.parse(window.localStorage.decoders)
            this.scope.appliedFilters = parsedFilter
            if (this.filter.length > 0)
              this.scope.$broadcast('wazuhFilter', { filter: this.filter })
          }
        } catch (err) {
          this.notification.showErrorToast('Error applying filter')
        }
      })
    }

    /**
     * Cleans filters
     * @param {String} typeFilter
     */
    onlyParents(typeFilter) {
      this.scope.appliedFilters = []
      if (window.localStorage.decoders) {
        delete window.localStorage.decoders
      }
      if (typeFilter === 'all') {
        this.scope.onlyParentDecoders = false
        this.scope.$broadcast('wazuhUpdateInstancePath', { path: '/decoders' })
      } else {
        this.scope.onlyParentDecoders = true
        this.scope.$broadcast('wazuhUpdateInstancePath', {
          path: '/decoders/parents'
        })
      }
    }

    /**
     * Open the editor for a new file
     */
    addNewFile() {
      this.scope.overwrite = false
      this.scope.addingNewFile = true
      this.scope.editingFile = {
        file: ``,
        dir: `decoders`
      }
      this.scope.fetchedXML = `<!-- Configure your local decoders here -->`
    }

    /**
     * Save the new content
     * @param {String} fileName
     * @param {String} dir
     */
    saveRuleConfig(fileName, dir, overwrite = false) {
      try {
        const containsBlanks = /.* .*/
        fileName = this.scope.editingFile.file
        fileName = fileName.endsWith('.xml') ? fileName : `${fileName}.xml`
        if (containsBlanks.test(fileName)) {
          this.notification.showErrorToast(
            'Error creating a new file. The filename can not contain white spaces.'
          )
        } else {
          if (fileName !== '.xml') {
            this.scope.saveIncomplete = true
            this.scope.$broadcast('saveXmlFile', {
              file: fileName,
              dir,
              overwrite
            })
          } else {
            throw new Error('The name cannot be ".xml"')
          }
        }
      } catch (error) {
        this.notification.showWarningToast('Please set a valid name')
      }
    }
  }
  controllers.controller('managerDecodersCtrl', Decoders)
  return Decoders
})
