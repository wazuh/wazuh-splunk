define(['../../module', './ruleset'], function (controllers, Ruleset) {
  'use strict'

  class Rules extends Ruleset {
    /**
     * Class rules
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
      $restartService,
      isAdmin
    ) {
      super(
        $scope,
        $sce,
        $notificationService,
        'ruleset',
        $currentDataService,
        $tableFilterService,
        $csvRequestService,
        $restartService
      )
      this.isAdmin = isAdmin
    }

    /**
     * On controller load
     */
    $onInit() {
      this.scope.adminMode = this.isAdmin
      this.scope.localFilter = false
      this.scope.downloadCsv = (path, name) => this.downloadCsv(path, name)
      this.scope.$broadcast('wazuhSearch', { term: '', removeFilters: true })
      this.scope.addNewFile = () => this.addNewFile()
      this.scope.saveRuleConfig = (fileName, dir, overwrite) => this.saveRuleConfig(fileName, dir, overwrite)
      this.scope.closeEditingFile = () => this.closeEditingFile()
      this.scope.xmlIsValid = valid => this.xmlIsValid(valid)

      this.scope.selectedNavTab = 'rules'

      this.scope.$on('loadedTable', () => {
        try {
          if (window.localStorage.ruleset) {
            const parsedFilter = JSON.parse(window.localStorage.ruleset)
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
     * Open the editor for a new file
     */
    addNewFile() {
      this.scope.overwrite = false
      this.scope.addingNewFile = true
      this.scope.editingFile = {
        file: ``,
        dir: `rules`
      }
      this.scope.addingNewFile = true
      this.scope.fetchedXML = `<!-- Configure your local rules here -->`
    }

    /**
     * Edit rules and decoders functions
     */
    closeEditingFile() {
      this.scope.editingFile = false
      this.scope.addingNewFile = false
      this.scope.fetchedXML = ''
    }

    /**
     * Check if XML is valid
     * @param {Boolean} valid 
     */
    xmlIsValid(valid) {
      this.scope.xmlHasErrors = valid
      this.scope.$applyAsync()
    }

    /**
     * Save the new content
     * @param {String} fileName 
     * @param {String} dir 
     */
    saveRuleConfig(fileName, dir, overwrite=false) {
      try {
        const containsBlanks = /.* .*/
        fileName = this.scope.editingFile.file
        fileName = fileName.endsWith('.xml') ? fileName : `${fileName}.xml`
        if (containsBlanks.test(fileName)) {
          this.toast('Error creating a new file. The filename can not contain white spaces.')
        } else {
          if (fileName !== '.xml') {
            this.scope.saveIncomplete = true
            this.scope.$broadcast('saveXmlFile', {
              file: fileName,
              dir: dir,
              overwrite
            })
          } else {
            throw new Error('The name cannot be ".xml"')
          }
        }
      } catch (error) {
        this.toast('Please set a valid name')
      }
    }

  }
  controllers.controller('managerRulesetCtrl', Rules)
  return Rules
})
