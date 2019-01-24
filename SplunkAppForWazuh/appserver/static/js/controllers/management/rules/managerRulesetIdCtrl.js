define(['../../module', './ruleset'], function(controllers, Ruleset) {
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
     * @param {*} $rulesetEditor
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
      $rulesetEditor
    ) {
      super(
        $scope,
        $sce,
        $notificationService,
        'ruleset',
        $currentDataService,
        $tableFilterService,
        $csvRequestService
      )
      this.state = $state
      this.extensions = extensions
      this.rulesetEditor = $rulesetEditor
      try {
        this.filters = JSON.parse(window.localStorage.ruleset) || []
      } catch (err) {
        this.filters = []
      }
      
      this.scope.ruleInfo = ruleInfo.data.data.items[0]
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
      this.scope.isObject = item => typeof item === 'object'
      this.scope.downloadCsv = (path, name) => this.downloadCsv(path, name)
      this.scope.addDetailFilter = (name, value) => this.addDetailFilter(name, value)
      this.scope.adminMode = this.extensions['admin'] === 'true'    
      this.scope.isLocal = this.scope.ruleInfo.path === '/var/ossec/etc/rules' ? true : false
      this.scope.saveRuleConfig = () => this.saveRuleConfig()
      this.scope.closeEditingFile = () => this.closeEditingFile()
      this.scope.xmlIsValid = valid => this.xmlIsValid(valid)
      this.scope.editRule = fileName => this.editRule(fileName)
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
        this.toast(err.message || err)
      }
    }

    closeEditingFile() {
      this.scope.editingFile = false
      this.scope.$broadcast('closeEditXmlFile', {})
    }

    xmlIsValid(valid) {
      this.scope.xmlHasErrors = valid
      if (!this.scope.$$phase) this.scope.$digest()
    }

    saveRuleConfig() {
      this.scope.editingFile = false
      /*this.scope.$broadcast('saveXmlFile', {
        ruleFile: this.scope.ruleInfo.file
      })*/
      this.toast("Rule configuration saved")
    }

    async editRule(fileName) {
      try {
        this.scope.editingFile = true
        this.scope.fetchedXML = await this.fetchFileContent(fileName)
        this.scope.$broadcast('fetchedFile', { data: this.scope.fetchedXML })
      } catch (error) {
        this.scope.fetchedXML = null
        this.toast(error.message || error)
      }
      if (!this.scope.$$phase) this.scope.$digest()
      return
    }

    async fetchFileContent(fileName){
      try {
        const result = await this.rulesetEditor.getConfiguration(fileName)
        return result
      } catch (error) {
        return Promise.reject(error)
      }
    } 
  }
  controllers.controller('managerRulesetIdCtrl', RulesetId)
})
