define(['../../../module'], function (controllers) {
  'use strict'

  class EditRulesetCtrl {
    constructor($scope, $notificationService, isAdmin, $fileEditor) {
      this.scope = $scope
      this.toast = $notificationService.showSimpleToast
      this.isAdmin = isAdmin
      this.fileEditor = $fileEditor
    }

    $onInit() {
      try {
        this.scope.adminMode = this.isAdmin
        this.scope.editionType = 'rules'
        this.scope.subTabName = 'rules'

        this.scope.search = term => this.search(term)
        this.scope.switchSubTab = subTabName => this.switchSubTab(subTabName)

        this.scope.saveRuleConfig = (fileName, dir) => this.saveRuleConfig(fileName, dir)
        this.scope.closeEditingFile = () => this.closeEditingFile()
        this.scope.xmlIsValid = valid => this.xmlIsValid(valid)
        this.scope.editRule = (fileName, dir) => this.editRule(fileName, dir)

      } catch (error) {
        console.error("error ", error)
      }

      this.scope.$on("quickRuleEdit", (event, data) => {
        this.editRule(data.item.file, 'rules')
      })

      this.scope.$on("quickDecoderEdit", (event, data) => {
        this.editRule(data.item.file, 'decoders')
      })

    }

    search(term) {
      this.scope.$broadcast('wazuhSearch', { term, removeFilters: false })
      return
    }

    switchSubTab(subTabName) {
      this.scope.subTabName = subTabName
      this.scope.editionType = subTabName
    }

    // Edit functions
    closeEditingFile() {
      this.scope.editingFile = false
      this.scope.$broadcast('closeEditXmlFile', {})
    }

    xmlIsValid(valid) {
      this.scope.xmlHasErrors = valid
      if (!this.scope.$$phase) this.scope.$digest()
    }

    saveRuleConfig(fileName, dir) {
      this.scope.editingFile = false
      this.scope.$broadcast('saveXmlFile', {
        file: fileName,
        dir: dir
      })
      this.search('')
    }

    async editRule(fileName, dir) {
      try {
        this.scope.editingFile = {
          file: fileName,
          dir: dir
        }
        this.scope.fetchedXML = await this.fetchFileContent(fileName, dir)
        this.scope.$broadcast('fetchedFile', { data: this.scope.fetchedXML })
      } catch (error) {
        this.scope.fetchedXML = null
        this.toast(error.message || error)
      }
      if (!this.scope.$$phase) this.scope.$digest()
      return
    }

    async fetchFileContent(fileName, dir){
      try {
        const result = await this.fileEditor.getConfiguration(fileName, dir)
        return result
      } catch (error) {
        return Promise.reject(error)
      }
    } 

  }
  controllers.controller('editRulesetCtrl', EditRulesetCtrl)
})
