define(['../../module'], function (controllers) {
  'use strict'

  class Edition {
    /**
     * Class Status
     * @param {*} $scope
     * @param {Array} clusterInfo
     * @param {Boolean} isAdmin
     */
    constructor($scope, isAdmin, $notificationService, clusterInfo, $fileEditor, $restartService) {
      this.scope = $scope
      this.clusterInfo = clusterInfo
      this.isAdmin = isAdmin
      this.toast = $notificationService.showSimpleToast
      this.clusterInfo = clusterInfo
      this.fileEditor = $fileEditor
      this.restartService = $restartService
    }
    /**
     * On controller loads
     */
    $onInit() {
      try {
        this.scope.restartAndApply = false
        this.scope.restartInProgress = false
        this.scope.editingConfig = true //Hides edit config button from parent abstract state
        this.scope.editingNode = false
        this.scope.editNode = (nodeName) => this.editNode(nodeName)
        this.scope.cancelEditNode = () => this.cancelEditNode()
        this.scope.saveOssecConfig = () => this.saveOssecConfig()
        this.scope.xmlIsValid = (valid) => this.xmlIsValid(valid)
        this.scope.changeNode = (node) => this.changeNode(node)
        this.scope.restart = (node) => this.restart(node)
        this.scope.switchRestart = () => this.switchRestart()
        this.scope.closeRestartConfirmation = () => this.closeRestartConfirmation()

        if (this.clusterInfo && this.clusterInfo.clusterEnabled) {
          this.scope.clusterEnabled = this.clusterInfo.clusterEnabled
          if (this.clusterInfo.clusterEnabled) {
            this.scope.selectedNode = this.clusterInfo.nodes.data.data.items[0].name
            this.scope.nodes = this.clusterInfo.nodes.data.data.items
          }
          this.editNode(this.scope.selectedNode)
        } else {
          this.editNode()
        }
        this.scope.isAdmin = this.isAdmin

        this.scope.$on('configSavedSuccessfully', () => {
          this.scope.restartAndApply = true
        })

      } catch (error) {
        this.toast(error)
      }
    }

    async editNode(nodeName = 'manager') {
      try {
        const file = 'ossec.conf'
        const dir = false
        const content = !this.clusterInfo.clusterEnabled ? await this.fileEditor.getConfiguration(file, dir) : await this.fileEditor.getConfiguration(file, dir, nodeName)
        this.scope.editingNode = nodeName
        this.scope.fetchedXML = content
        this.scope.$broadcast('fetchedFile', {data: content})
        if (!this.scope.$$phase) this.scope.$digest()
      } catch (error) {
        this.toast(`Error editing node: ${error}`)
      }
    }

    changeNode(node){
      this.editNode(node)
    }

    saveOssecConfig() {
      const node = this.scope.editingNode === 'manager' ? false : this.scope.editingNode
      this.scope.$broadcast('saveXmlFile', {
        file: 'ossec.conf',
        dir: false,
        node: node
      })
    }

    xmlIsValid(valid) {
      this.scope.xmlHasErrors = valid
      if (!this.scope.$$phase) this.scope.$digest()
    }

    async restart(node = false) {
      try {
        this.scope.restartInProgress = true
        let result = ''
        if (this.clusterInfo.clusterEnabled && node) {
          result = await this.restartService.restartNode(node)
        } else {
          result = await this.restartService.restart()
        }
        this.toast(result)
        this.scope.restartInProgress = false
      } catch (error) {
        this.toast(error)
        this.scope.restartInProgress = false
      }
    }

    switchRestart() {
      this.scope.confirmingRestart = !this.scope.confirmingRestart
      this.scope.$applyAsync()
    }

    closeRestartConfirmation() { 
      this.scope.restartAndApply = false
    }

  }

  controllers.controller('editionCtrl', Edition)
})
