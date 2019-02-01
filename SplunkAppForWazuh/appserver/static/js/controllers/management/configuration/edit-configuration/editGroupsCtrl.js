define(['../../../module'], function (controllers) {
  'use strict'

  class EditGroupsCtrl {
    /**
     * Class Status
     * @param {*} $scope
     * @param {Array} groups
     * @param {Boolean} isAdmin
     */
    constructor($scope, $notificationService, $fileEditor, isAdmin, groups, $requestService, $groupHandler) {
      this.scope = $scope
      this.isAdmin = isAdmin
      this.groups = groups
      this.toast = $notificationService.showSimpleToast
      this.fileEditor = $fileEditor
      this.apiReq = $requestService.apiReq
      this.groupHandler = $groupHandler
    }
    /**
     * On controller loads
     */
    $onInit() {
      try {
        this.scope.editingGroup = false

        this.scope.editGroupAgentConfig = group => this.editGroupAgentConfig(group)
        this.scope.closeEditingFile = () => this.closeEditingFile()
        this.scope.xmlIsValid = valid => this.xmlIsValid(valid)
        this.scope.doSaveGroupAgentConfig = () => this.doSaveGroupAgentConfig()
        this.scope.saveGroupAgentConfig = content => this.saveGroupAgentConfig(content)

        this.scope.groups = this.groups.data.data.items
        this.scope.adminMode = this.isAdmin

        //Add groups
        this.scope.switchAddingGroup = () => {
          this.scope.addingGroup = !this.scope.addingGroup
        }
        this.scope.createGroup = async name => {
          try {
            this.scope.addingGroup = false
            await this.groupHandler.createGroup(name)
            this.toast(`Success. Group ${name} has been created`)
          } catch (error) {
            this.toast(`${error.message || error}`)
          }
          this.scope.$broadcast('wazuhSearch', {})
        }

        //Search for a group
        this.scope.search = term => {
          this.scope.$broadcast('wazuhSearch', { term })
        }

        //Edit groups
        this.scope.$on('openGroupFromList',(ev,parameters) => {
          const groupName = parameters.group.name
          this.scope.editingFile = true;
          this.scope.groupsSelectedTab = 'files';
          this.editGroupAgentConfig(groupName)
        })
      } catch (error) {
        console.error(error)
      }
    }


    //Groups
    async editGroupAgentConfig(groupName) {
      try {
        this.scope.editingFile = true
        this.scope.fetchedXML = await this.fetchFile(groupName)
        this.scope.$broadcast('fetchedFile', { data: this.scope.fetchedXML })
      } catch (error) {
        this.scope.fetchedXML = null
        this.toast(error.message || error)
      }
      if (!this.scope.$$phase) this.scope.$digest()
      return
    }

    async saveGroupAgentConfig(content) {
      try {
        const result = await this.apiReq.request(
          'POST',
          `/agents/groups/${this.scope.currentGroup.name}/configuration`,
          { content, origin: 'xmleditor' }
        )
        if (
          !result ||
          !result.data ||
          !result.data.data ||
          result.data.data.error !== 0
        ) {
          throw new Error('Error sending file.')
        }
        this.scope.$emit('updateGroupInformation', {
          group: this.scope.currentGroup.name
        })
      } catch (error) {
        this.toast(error.message || error)
      }
      this.scope.editingFile = false
      if (!this.scope.$$phase) this.scope.$digest()
      return
    }

    async fetchFile(groupName) {
      try {
        this.scope.currentGroup = { name: groupName }
        const data = await this.apiReq(
          `/agents/groups/${groupName}/files/agent.conf`,
          { format: 'xml' }
        )
        const xml = ((data || {}).data || {}).data || false
        if (!xml) {
          throw new Error('Could not fetch agent.conf file')
        }
        return xml
      } catch (error) {
        return Promise.reject(error)
      }
    }
    closeEditingFile() {
      this.scope.editingFile = false
      this.scope.currentGroup = false
      this.scope.$broadcast('closeEditXmlFile', {})
    }

    xmlIsValid(valid) {
      this.scope.xmlHasErrors = valid
      if (!this.scope.$$phase) this.scope.$digest()
    }

    doSaveGroupAgentConfig() {
      this.scope.$broadcast('saveXmlFile', {
        group: this.scope.currentGroup.name
      })
    }

  }

  controllers.controller('editGroupsCtrl', EditGroupsCtrl)
})
