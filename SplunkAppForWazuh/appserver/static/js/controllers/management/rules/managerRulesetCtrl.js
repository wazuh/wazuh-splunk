
define([
  '../../module', 
  './ruleset'
], function(controllers, Ruleset) {
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
        'ruleset',
        $currentDataService,
        $tableFilterService,
        $csvRequestService,
        $restartService,
        $fileEditor
      )

      /* RBAC flags */
      this.scope.canReadRules = $security_service.isAllowed(
        "RULES_READ",
        ["RULE_FILE"],
        ["*"]
      )
      this.scope.canUpdateRules = $security_service.isAllowed("RULES_UPDATE", [
        "RESOURCELESS",
      ])
      this.scope.canUpdateRulesetFile = (filename) =>
        $security_service.isAllowed("RULES_UPDATE", ["RULE_FILE"], [filename])
    }

    /**
     * On controller load
     */
    $onInit() {
      this.scope.localFilter = false
      this.scope.downloadCsv = (path, name) => this.downloadCsv(path, name)
      this.scope.$broadcast('wazuhSearch', { term: '', removeFilters: true })
      this.scope.addNewFile = () => this.addNewFile()
      this.scope.saveRuleConfig = (fileName, dir, overwrite) =>
        this.saveRuleConfig(fileName, dir, overwrite)

      this.scope.selectedNavTab = 'rules'

      this.scope.$on('loadedTable', event => {
        event.stopPropagation()
        try {
          if (window.localStorage.ruleset) {
            const parsedFilter = JSON.parse(window.localStorage.ruleset)
            this.scope.appliedFilters = parsedFilter
            if (this.filter.length > 0) {
              this.scope.$broadcast('wazuhFilter', { filter: this.filter })
            }
          }
        } catch (err) {
          this.notification.showErrorToast('Error applying filter')
        }
      })
    }

    /**
     * Open the editor for a new file
     */
    addNewFile() {
      this.scope.overwrite = false
      this.scope.editingFile = {
        file: ``,
        dir: `rules`
      }
      this.scope.addingNewFile = true
      this.scope.fetchedXML = `<!-- Configure your local rules here -->`
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
  controllers.controller('managerRulesetCtrl', Rules)
  return Rules
})
