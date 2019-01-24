define(['../../module'], function (controllers) {
  'use strict'

  class Edition {
    /**
     * Class Status
     * @param {*} $scope
     * @param {Array} nodes
     * @param {Boolean} isAdmin
     */
    constructor($scope, nodes, isAdmin, $notificationService) {
      this.scope = $scope
      this.nodes = nodes
      this.isAdmin = isAdmin
      this.toast = $notificationService.showSimpleToast
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

        if (
          this.nodes &&
          this.nodes.data &&
          this.nodes.data.data
        ) {
          this.scope.nodes = this.nodes.data.data.items
        }

        this.scope.isAdmin = this.isAdmin
      } catch (error) {
        console.error(error)
      }
    }

    editNode(nodeName) {
      this.scope.editingNode = nodeName
      //replace for the api call
      this.scope.fetchedXML = '<ossec_config>  <global>    <jsonout_output>yes</jsonout_output>    <alerts_log>yes</alerts_log>    <logall>no</logall>    <logall_json>no</logall_json>    <email_notification>no</email_notification>    <smtp_server>smtp.example.wazuh.com</smtp_server>    <email_from>ossecm@example.wazuh.com</email_from>    <email_to>recipient@example.wazuh.com</email_to>    <email_maxperhour>12</email_maxperhour>    <email_log_source>alerts.log</email_log_source>    <queue_size>131072</queue_size>  </global></ossec_config>'
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

  }

  controllers.controller('editionCtrl', Edition)
})
