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

        if (this.clusterInfo && this.clusterInfo.clusterEnabled) {
          this.scope.clusterEnabled = this.clusterInfo.clusterEnabled
          if (this.clusterInfo.clusterEnabled) {
            this.scope.nodes = this.clusterInfo.nodes.data.data.items
          }
        } else {
          this.editNode()
        }
        this.scope.isAdmin = this.isAdmin
      } catch (error) {
        console.error(error)
      }
    }

    async editNode(nodeName = 'manager') {
      try {
        const file = 'ossec.conf'
        const dir = false
        const content = !this.clusterInfo.clusterEnabled ? await this.fileEditor.getConfiguration(file, dir) : await this.fileEditor.getConfiguration(file, dir) //Change when Node configuration be avalaible
        this.scope.editingNode = nodeName
        this.scope.fetchedXML = content
        if (!this.scope.$$phase) this.scope.$digest()
      } catch (error) {
        return Promise.reject(error)
      }
    }

    cancelEditNode() {
      this.scope.editingNode = false
      this.scope.$broadcast('closeEditXmlFile', {})
    }

    saveOssecConfig() {
      //Needs to add check if the cluster is enabled to save the node configuration(pending API)
      this.scope.$broadcast('saveXmlFile', {
        file: 'ossec.conf',
        dir: false
      })
      this.scope.editingNode = this.clusterInfo.clusterEnabled ? false : 'manager'
    }

    xmlIsValid(valid) {
      this.scope.xmlHasErrors = valid
      if (!this.scope.$$phase) this.scope.$digest()
    }

  }

  controllers.controller('editionCtrl', Edition)
})
