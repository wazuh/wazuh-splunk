define(['../../module'], function (controllers) {
  'use strict'

  class Edition {
    /**
     * Class Status
     * @param {*} $scope
     * @param {Array} clusterInfo
     * @param {Boolean} isAdmin
     */
    constructor($scope, isAdmin, $notificationService, clusterInfo, $ossecEditor) {
      this.scope = $scope
      this.clusterInfo = clusterInfo
      this.isAdmin = isAdmin
      this.toast = $notificationService.showSimpleToast
      this.clusterInfo = clusterInfo
      this.ossecEditor = $ossecEditor
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

        if ( this.clusterInfo && this.clusterInfo.clusterEnabled ) {
          this.scope.clusterEnabled = this.clusterInfo.clusterEnabled
          if (this.clusterInfo.clusterEnabled) {
            this.scope.nodes = this.clusterInfo.nodes.data.data.items
          }
        } else {
          console.log("cluster disabled")
        }

        this.scope.isAdmin = this.isAdmin
      } catch (error) {
        console.error(error)
      }
    }

    async editNode(nodeName) {
      try {
        //const content = this.clusterInfo.clusterEnabled ? await this.ossecEditor.getNodeConfiguration('ossec.conf') : await this.ossecEditor.getManagerConfiguration('ossec.conf') 
        const content = this.clusterInfo.clusterEnabled ? await this.ossecEditor.getManagerConfiguration('ossec.conf') : await this.ossecEditor.getManagerConfiguration('ossec.conf') 
        this.scope.editingNode = nodeName
        this.scope.fetchedXML = content
        if (!this.scope.$$phase) this.scope.$digest()
      } catch (error) {
        console.error("error editNode ", error)
      }

    }

    cancelEditNode() {
      this.scope.editingNode = false
      this.scope.$broadcast('closeEditXmlFile', {})
    }

    saveOssecConfig() {
      this.scope.editingNode = false
      /*this.scope.$broadcast('saveXmlFile', {
        ruleset: fileName,
        dir: 'rules'
      })*/
      this.toast("Manager configuration saved.")
    }

    xmlIsValid(valid) {
      this.scope.xmlHasErrors = valid
      if (!this.scope.$$phase) this.scope.$digest()
    }

  }

  controllers.controller('editionCtrl', Edition)
})
