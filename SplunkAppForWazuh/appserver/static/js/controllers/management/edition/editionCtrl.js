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
        }
        this.scope.isAdmin = this.isAdmin
      } catch (error) {
        console.error(error)
      }
    }

    async editNode(nodeName) {
      try {
        let content
        if (nodeName === 'manager' && !this.clusterInfo.clusterEnabled) {
          content = this.clusterInfo.clusterEnabled ? await this.ossecEditor.getManagerConfiguration() : await this.ossecEditor.getManagerConfiguration()  
        } else {
          //content = this.clusterInfo.clusterEnabled ? await this.ossecEditor.getNodeConfiguration() : await this.ossecEditor.getManagerConfiguration() 
          content = this.clusterInfo.clusterEnabled ? await this.ossecEditor.getManagerConfiguration() : await this.ossecEditor.getManagerConfiguration()
        }
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
      console.log("saveOssecConfig executed")
      if (!this.clusterInfo.clusterEnabled) {
        this.scope.$broadcast('saveXmlFile', {
          ossecConf: true,
          manager: true
        })
      } else {
        this.scope.$broadcast('saveXmlFile', {
          ossecConf: true,
          manager: false
        })
      }
      this.scope.editingNode = false
    }

    xmlIsValid(valid) {
      this.scope.xmlHasErrors = valid
      if (!this.scope.$$phase) this.scope.$digest()
    }

  }

  controllers.controller('editionCtrl', Edition)
})
