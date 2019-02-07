define(['../../module'], function (controllers) {
  'use strict'

  class Edition {
    /**
     * Class Status
     * @param {*} $scope
     * @param {Array} clusterInfo
     * @param {Boolean} isAdmin
     */
    constructor($scope, isAdmin, $notificationService, clusterInfo, $fileEditor) {
      this.scope = $scope
      this.clusterInfo = clusterInfo
      this.isAdmin = isAdmin
      this.toast = $notificationService.showSimpleToast
      this.clusterInfo = clusterInfo
      this.fileEditor = $fileEditor
    }
    /**
     * On controller loads
     */
    $onInit() {
      try {
        this.scope.editingNode = false
        this.scope.editNode = (nodeName) => this.editNode(nodeName)
        this.scope.cancelEditNode = () => this.cancelEditNode()
        this.scope.saveOssecConfig = () => this.saveOssecConfig()
        this.scope.xmlIsValid = (valid) => this.xmlIsValid(valid)
        this.scope.changeNode = (node) => this.changeNode(node)

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

  }

  controllers.controller('editionCtrl', Edition)
})
