define(['../../module', './ruleset'], function (controllers, Ruleset) {
  'use strict'

  class RulesetId extends Ruleset {
    /**
     * Class Ruleset-id
     * @param {*} $scope
     * @param {*} $sce
     * @param {*} $notificationService
     * @param {*} $state
     * @param {Object} ruleInfo
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
      ruleInfo,
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
        'ruleset',
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
      this.scope.canUpdateRulesetFile = (filename) =>
        $security_service.isAllowed('RULES_UPDATE', ['RULE_FILE'], [filename])
      try {
        this.filters = JSON.parse(window.localStorage.ruleset) || []
      } catch (err) {
        this.filters = []
      }

      //Check if the rule is overwritted
      const response =
        (((ruleInfo || {}).data || {}).data || {}).affected_items || []
      if (response.length) {
        const result = response.filter((rule) => rule.details.overwrite)
        this.scope.ruleInfo = result.length ? result[0] : response[0]
      } else {
        this.scope.ruleInfo = false
      }
      if (
        !(Object.keys((this.scope.ruleInfo || {}).details || {}) || []).length
      ) {
        this.scope.ruleInfo.details = false
      }
    }

    /**
     * On controller loads
     */
    $onInit() {
      this.scope.isObject = (item) => typeof item === 'object'
      this.scope.downloadCsv = (path, name) => this.downloadCsv(path, name)
      this.scope.addDetailFilter = (name, value) =>
        this.addDetailFilter(name, value)
      this.scope.isLocal = this.scope.ruleInfo.relative_dirname === 'etc/rules'
      this.scope.saveRuleConfig = (fileName) => this.saveRuleConfig(fileName)
      this.scope.closeEditingFile = () => this.closeEditingFile()
      this.scope.editRule = (fileName) => this.editRule(fileName)
      this.scope.restart = () => this.restart()
      this.scope.closeRestartConfirmation = () =>
        this.closeRestartConfirmation()
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
        window.localStorage.setItem('ruleset', JSON.stringify(this.filters))
        this.state.go('mg-rules')
      } catch (err) {
        this.notification.showErrorToast(err.message || err)
      }
    }

    async closeEditingFile() {
      try {
        //Refresh rule info
        const ruleReloaded = await this.requestService.apiReq(
          `/rules/${this.scope.ruleInfo.id}`
        )
        if (ruleReloaded.data.data.totalItems === 0) {
          this.state.go('mg-rules')
        }
        //Check if the rule is overwritted
        const response =
          (((ruleReloaded || {}).data || {}).data || {}).items || []
        if (response.length) {
          const result = response.filter((rule) => rule.details.overwrite)
          this.scope.ruleInfo = result.length ? result[0] : response[0]
        } else {
          this.scope.ruleInfo = false
        }
      } catch (error) {
        this.state.go('mg-rules')
      }
      this.scope.editingFile = false
      this.scope.$applyAsync()
    }

    saveRuleConfig(fileName) {
      this.scope.saveIncomplete = true
      this.scope.$broadcast('saveXmlFile', {
        file: fileName,
        dir: 'etc/rules',
        overwrite: true,
      })
    }

    async editRule(fileName) {
      try {
        const readOnly = !(this.scope.ruleInfo.relative_dirname === 'etc/rules')
        await this.fetchFileContent(
          fileName,
          this.scope.ruleInfo.relative_dirname,
          readOnly
        )
      } catch (error) {
        this.notification.showErrorToast(error.message || error)
      }
      return
    }

    async fetchFileContent(file, path, readOnly = false) {
      try {
        this.scope.editingFile = true
        this.scope.readOnly = readOnly
        if (readOnly) {
          if (!file.startsWith('ruleset/rules')) {
            this.scope.fileName = file
            this.scope.XMLContent = await this.fileEditor.getConfiguration(
              file,
              path,
              null,
              readOnly
            )
            this.scope.$broadcast('RuleIdContentReady', {
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
          if (file.startsWith('etc/rules/')) {
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
    }
  }
  controllers.controller('managerRulesetIdCtrl', RulesetId)
})
