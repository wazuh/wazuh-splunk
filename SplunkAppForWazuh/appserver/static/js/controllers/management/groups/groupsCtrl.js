define(['../../module', 'FileSaver'], function(controllers) {
  'use strict'
  class Groups {
    /**
     * Class Groups
     * @param {*} $scope
     * @param {*} $tableFilterService
     * @param {*} $csvRequestService
     * @param {*} $currentDataService
     * @param {*} $state
     * @param {*} $stateParams
     * @param {*} $requestService
     * @param {*} $beautifierJson
     * @param {*} $notificationService
     * @param {*} $reportingService
     * @param {*} $groupHandler
     * @param {*} extensions
     * @param {*} $security_service
     */
    constructor(
      $scope,
      $tableFilterService,
      $csvRequestService,
      $currentDataService,
      $state,
      $stateParams,
      $requestService,
      $beautifierJson,
      $notificationService,
      $reportingService,
      $groupHandler,
      extensions,
      $security_service
    ) {
      this.scope = $scope
      this.state = $state
      this.reportingService = $reportingService
      this.beautifier = $beautifierJson
      this.stateParams = $stateParams
      this.api = $currentDataService.getApi()
      this.groupHandler = $groupHandler
      this.csvReq = $csvRequestService
      this.wzTableFilter = $tableFilterService
      this.apiReq = $requestService.apiReq
      this.notification = $notificationService
      this.mainGroup = ''
      this.scope.lookingGroup = false
      this.scope.editingFile = false
      this.scope.loadingRing = false
      this.scope.exportConfig = false
      this.scope.userHasPermissions = $security_service.userHasPermissions.bind($security_service)
      this.scope.selectedOptions = {
        groupConf: true,
        agentsList: true
      }
      this.scope.showModulesToExport = () => this.showModulesToExport()
      this.scope.keyEquivalences = key => this.keyEquivalences(key)
      this.scope.selectAll = value => this.selectAll(value)
      this.scope.checkAllDisabled = () => this.checkAllDisabled()
      this.scope.$watch('lookingGroup', value => {
        this.scope.availableAgents = {
          loaded: false,
          data: [],
          offset: 0,
          loadedAll: false
        }
        this.scope.selectedAgents = {
          loaded: false,
          data: [],
          offset: 0,
          loadedAll: false
        }
        this.addMultipleAgents(false)
        if (!value) {
          this.scope.file = false
          this.scope.filename = false
        }
      })
      this.extensions = extensions
      this.scope.addingGroup = false
      this.scope.addingAgents = false
      this.scope.$on('groupsIsReloaded', () => {
        this.scope.groupsSelectedTab = false
        this.scope.currentGroup = false
        this.scope.lookingGroup = false
        this.scope.editingFile = false
        this.scope.$applyAsync()
      })

      // Come from the pencil icon on the groups table
      this.scope.$on('openGroupFromList', (ev, parameters) => {
        ev.stopPropagation()
        this.scope.editingFile = true
        this.scope.groupsSelectedTab = 'files'
        return this.scope
          .loadGroup(parameters.group)
          .then(() => this.scope.editGroupAgentConfig())
      })

      this.scope.$on('loadingReporting', (event, data) => {
        this.scope.loadingReporting = data.status
      })

      this.scope.$on('wazuhShowGroup', (event, parameters) => {
        event.stopPropagation()
        this.goBackToAgents()
        return this.loadGroup(parameters.group)
      })

      this.scope.$on('configurationSuccess', () => {
        this.scope.editingFile = false
        this.scope.$applyAsync()
      })

      this.scope.$on('wazuhShowGroupFile', (event, parameters) => {
        event.stopPropagation()
        if (
          ((parameters || {}).fileName || '').includes('agent.conf')
        ) {
          return this.scope.editGroupAgentConfig()
        }
        return this.showFile(parameters.groupName, parameters.fileName)
      })

      this.scope.$on('updateGroupInformation', async (event, parameters) => {
        try {
          event.stopPropagation()
          if (this.scope.currentGroup) {
            const result = await Promise.all([
              await this.apiReq(`/groups?groups_list=${parameters.group}`, {
                limit: 1
              }),
              await this.apiReq(`/groups`, {
                search: parameters.group
              })
            ])

            const [count, sums] = result.map(
              item => ((item || {}).data || {}).data || false
            )
            const updatedGroup = ((sums || {}).affected_items || []).find(
              item => item.name === parameters.group
            )
            this.scope.currentGroup.count = (count || {}).total_affected_items || 0
            if (updatedGroup) {
              this.scope.currentGroup.configSum = updatedGroup.configSum
              this.scope.currentGroup.mergedSum = updatedGroup.mergedSum
            }
          }
        } catch (error) {
          this.notification.showErrorToast(error.message || error)
        }
        this.scope.$applyAsync()
        return
      })

      this.scope.$on('openGroupFromList', (ev, parameters) => {
        ev.stopPropagation()
        this.scope.editingFile = true
        this.scope.groupsSelectedTab = 'files'
        return this.scope
          .loadGroup(parameters.group)
          .then(() => this.scope.editGroupAgentConfig())
      })

      this.scope.$on('saveComplete', event => {
        event.stopPropagation()
        this.scope.saveIncomplete = false
      })
    }

    /**
     * On controller load
     */
    $onInit() {
      try {
        this.scope.search = term => {
          this.scope.$broadcast('wazuhSearch', { term })
        }

        this.scope.switchAddingGroup = () => {
          this.scope.addingGroup = !this.scope.addingGroup
        }

        this.scope.createGroup = async name => {
          try {
            this.scope.addingGroup = false
            await this.groupHandler.createGroup(name)
            this.notification.showSuccessToast(
              `Success. Group ${name} has been created`
            )
            // refresh the table when a new group is created
            this.scope.search = term => {
              this.scope.$broadcast('wazuhSearch', { term })
            }
          } catch (error) {
            this.notification.showErrorToast(`${error.message || error}`)
          }
          this.scope.$broadcast('wazuhSearch', {})
        }

        this.scope.loadGroup = (group, firstLoad) =>
          this.loadGroup(group, firstLoad)
        this.scope.toggle = () => (this.scope.lookingGroup = true)
        this.scope.goBackToAgents = () => this.goBackToAgents()
        this.scope.initReportConfig = () => this.initReportConfig()
        this.scope.goBackFiles = () => this.goBackFiles()
        this.scope.goBackGroups = () => this.goBackGroups()
        this.scope.downloadCsv = (path, name) => this.downloadCsv(path, name)

        this.scope.showFile = (groupName, fileName) =>
          this.showFile(groupName, fileName)
        if (this.stateParams.group) {
          if (
            this.stateParams &&
            this.stateParams.group &&
            typeof this.stateParams.group === 'object'
          ) {
            this.mainGroup = this.stateParams.group
            this.loadGroup(this.mainGroup)
            this.goBackFiles()
          }
        }

        this.scope.reload = (element, searchTerm, addOffset, start) =>
          this.reloadScope(element, searchTerm, addOffset, start)

        this.scope.loadSelectedAgents = searchTerm =>
          this.loadSelectedAgents(searchTerm)

        this.scope.loadAllAgents = (searchTerm, start) =>
          this.loadAllAgents(searchTerm, start)

        this.scope.addMultipleAgents = toggle => this.addMultipleAgents(toggle)

        this.scope.getItemsToSave = () => this.getItemsToSave()

        this.scope.saveAddAgents = () => this.saveAddAgents()

        this.scope.checkLimit = () => this.checkLimit()

        this.scope.editGroupAgentConfig = group =>
          this.editGroupAgentConfig(group)

        this.scope.closeEditingFile = () => this.closeEditingFile()

        this.scope.xmlIsValid = valid => this.xmlIsValid(valid)

        this.scope.doSaveGroupAgentConfig = () => this.doSaveGroupAgentConfig()

        this.scope.saveGroupAgentConfig = content =>
          this.saveGroupAgentConfig(content)

        this.scope.$applyAsync()
      } catch (err) {
        console.error('err ', err)
        this.notification.showErrorToast('Error loading groups information')
      }
    }

    /**
     * Exports the table in CSV format
     */
    async downloadCsv(path, name) {
      try {
        this.notification.showSimpleToast(
          'Your download should begin automatically...'
        )
        const currentApi = this.api['_key']
        const output = await this.csvReq.fetch(
          path,
          currentApi,
          this.wzTableFilter.get()
        )
        const blob = new Blob([output], { type: 'text/csv' }) // eslint-disable-line
        saveAs(blob, name) // eslint-disable-line
        return
      } catch (error) {
        this.notification.showErrorToast('Error downloading CSV')
      }
      return
    }

    /**
     * Shows the popover to select the modules
     */
    showModulesToExport() {
      this.scope.exportConfig = !this.scope.exportConfig
      this.scope.$applyAsync()
    }

    /**
     * Selects all the modules to export the configuration
     */
    selectAll(value) {
      try {
        Object.keys(this.scope.selectedOptions).forEach(key => {
          this.scope.selectedOptions[key] = value
        })
      } catch (error) {
        this.$notificationService.showErrorToast('Cannot select the modules')
      }
    }

    checkAllDisabled() {
      try {
        let result = false
        Object.keys(this.scope.selectedOptions).forEach(key => {
          if (this.scope.selectedOptions[key]) {
            result = true
          }
        })
        return !result
      } catch (error) {
        this.$notificationService.showErrorToast(
          'Error checking selected options'
        )
      }
    }

    /**
     * @param {Object} group
     * @param {Boolean} firstLoad
     */
    async loadGroup(group, firstLoad) {
      this.scope.load = true
      try {
        if (!firstLoad) this.scope.lookingGroup = true
        const count = await this.apiReq(`/groups/${group.name}/files`, {
          limit: 1
        })
        this.scope.totalFiles = count.data.data.total_affected_items
        this.scope.fileViewer = false
        this.scope.currentGroup = group
        this.mainGroup = group
        this.scope.$applyAsync()
      } catch (error) {
        this.notification.showErrorToast('Cannot load group data')
      }
      this.scope.load = false
      return
    }

    async fetchFile() {
      try {
        const data = await this.apiReq(
          `/groups/${this.scope.currentGroup.name}/files/agent.conf/xml`,
          {origin:"xmlreader"}
          )
        const xml = (data || {}).data || {} || false
        if (!xml.data && xml.error !== 0) {
          throw new Error('Could not fetch agent.conf file')
        }else if(!xml.data){
          xml.data = " " // Force to print the XML editor
        }
        return xml.data
      } catch (error) {
        return Promise.reject(error)
      }
    }

    async reloadScope(element, searchTerm, addOffset, start) {
      try {
        if (element === 'left') {
          if (!this.scope.availableAgents.loadedAll) {
            this.scope.multipleSelectorLoading = true
            if (start) {
              this.scope.selectedAgents.offset = 0
            } else {
              this.scope.availableAgents.offset += addOffset + 1
            }
            await this.loadAllAgents(searchTerm, start)
          }
        } else {
          if (!this.scope.selectedAgents.loadedAll) {
            this.scope.multipleSelectorLoading = true
            this.scope.selectedAgents.offset += addOffset + 1
            await this.scope.loadSelectedAgents(searchTerm)
          }
        }
        this.scope.multipleSelectorLoading = false
        this.scope.$applyAsync()
      } catch (error) {
        this.notification.showErrorToast(error.message || error)
      }
    }

    async loadSelectedAgents(searchTerm) {
      try {
        let params = {
          offset: !searchTerm ? this.scope.selectedAgents.offset : 0,
          select: ['id', 'name']
        }
        if (searchTerm) {
          params.search = searchTerm
        }
        const result = await this.apiReq(
          `/groups/${this.scope.currentGroup.name}/agents`
          )
        this.scope.totalSelectedAgents = result.data.data.total_affected_items
        const mapped = result.data.data.affected_items.map(item => {
          return { key: item.id, value: item.name }
        })
        if (searchTerm) {
          this.scope.selectedAgents.data = mapped
          this.scope.selectedAgents.loadedAll = true
        } else {
          this.scope.selectedAgents.data = this.scope.selectedAgents.data.concat(
            mapped
          )
        }
        if (
          this.scope.selectedAgents.data.length === 0 ||
          this.scope.selectedAgents.data.length < 500 ||
          this.scope.selectedAgents.offset >= this.scope.totalSelectedAgents
        ) {
          this.scope.selectedAgents.loadedAll = true
        }
      } catch (error) {
        this.notification.showErrorToast(error.message || error)
      }
      this.scope.selectedAgents.loaded = true
    }

    async loadAllAgents(searchTerm, start) {
      try {
        const params = {
          limit: 500,
          offset: !searchTerm ? this.scope.availableAgents.offset : 0,
          select: "id,name"
        }
        if (searchTerm) {
          params.search = searchTerm
          this.scope.availableAgents.offset = 0
        }
        const req = await this.apiReq('/agents/', params)
        this.scope.totalAgents = req.data.data.total_affected_items
        const mapped = req.data.data.affected_items
          .filter(item => {
            return (
              this.scope.selectedAgents.data.filter(selected => {
                return selected.key == item.id
              }).length == 0 && item.id !== '000'
            )
          })
          .map(item => {
            return { key: item.id, value: item.name }
          })
        if (searchTerm || start) {
          this.scope.availableAgents.data = mapped
        } else {
          this.scope.availableAgents.data = this.scope.availableAgents.data.concat(
            mapped
          )
        }
        if (this.scope.availableAgents.data.length < 10 && !searchTerm) {
          if (this.scope.availableAgents.offset >= this.scope.totalAgents) {
            this.scope.availableAgents.loadedAll = true
          }
          if (!this.scope.availableAgents.loadedAll) {
            this.scope.availableAgents.offset += 499
            await this.loadAllAgents()
          }
        }
      } catch (error) {
        this.notification.showErrorToast(error.message || error)
      }
    }

    async addMultipleAgents(toggle) {
      try {
        if (toggle) this.scope.errorsEditingGroup = false
        this.scope.addingAgents = toggle
        if (toggle && !this.scope.availableAgents.loaded) {
          this.scope.availableAgents = {
            loaded: false,
            data: [],
            offset: 0,
            loadedAll: false
          }
          this.scope.selectedAgents = {
            loaded: false,
            data: [],
            offset: 0,
            loadedAll: false
          }
          this.scope.multipleSelectorLoading = true
          while (!this.scope.selectedAgents.loadedAll) {
            await this.scope.loadSelectedAgents()
            this.scope.selectedAgents.offset += 499
          }
          this.scope.firstSelectedList = angular.copy(
            this.scope.selectedAgents.data
          )
          await this.scope.loadAllAgents()
          this.scope.multipleSelectorLoading = false
        }
      } catch (err) {
        this.notification.showErrorToast('Error adding agents.')
      }
      this.scope.$applyAsync()
      return
    }

    async updateGroupInformation(event, parameters) {
      try {
        if (this.scope.currentGroup) {
          const result = await Promise.all([
            await this.apiReq(`/groups?groups_list=${parameters.group}`, {
              limit: 1
            }),
            await this.apiReq(`/groups`, {
              search: parameters.group
            })
          ])

          const [count, sums] = result.map(
            item => ((item || {}).data || {}).data || false
          )
          const updatedGroup = ((sums || {}).affected_items || []).find(
            item => item.name === parameters.group
          )

          this.scope.currentGroup.count = (count || {}).total_affected_items || 0
          if (updatedGroup) {
            this.scope.currentGroup.configSum = updatedGroup.configSum
            this.scope.currentGroup.mergedSum = updatedGroup.mergedSum
          }
        }
      } catch (error) {
        this.notification.showErrorToast(error.message || error, 'Groups')
      }
      this.scope.$applyAsync()
      return
    }

    async saveAddAgents() {
      this.scope.errorsEditingGroup = false
      const itemsToSave = this.getItemsToSave()
      const failedIds = []
      let response

      try {
        this.scope.multipleSelectorLoading = true
        // Adds agents to a group
        if (itemsToSave.addedIds.length) {
          response = await this.apiReq(
            `/agents/group`,
            { 
              agents_list: itemsToSave.addedIds.join(),
              group_id: this.scope.currentGroup.name
            },
            'PUT'
          )
          if (response.data.error !== 0) {
            // in this new api exist failed_items, each have error message
            response.data.data.failed_items.map(item => {
              throw new Error(item.error.message)
            })
          }
          if (response.data.data.failed_items) {
            response.data.data.failed_items.forEach(x => {
              failedIds.push(x)
            })
          }
        }
        // Delete agents from a group
        if (itemsToSave.deletedIds.length) {
          response = await this.apiReq(
            `/agents/group?group_id=${this.scope.currentGroup.name}&agents_list=${itemsToSave.deletedIds}`,
            {},
            'DELETE'
          )
          if (response.data.error !== 0) {
            // in this new api exist failed_items, each have error message
            throw new Error(response.data.message)
          }
          if (response.data.data.failed_ids) {
            response.data.data.failed_ids.forEach(x => {
              failedIds.push(x)
            })
          }
        }

        if (failedIds.length) {
          const failedErrors = failedIds.map(item => ({
            id: (item || {}).id,
            message: ((item || {}).error || {}).message
          }))
          const groupedFailedIds =
            this.groupBy(failedErrors, 'message') || false
          this.scope.errorsEditingGroup = groupedFailedIds
          this.notification.showWarningToast(
            `Group has been updated but an error has occurred with ${failedIds.length} agents`
          )
        } else {
          const responseMsg = ((response || {}).data).message
          if (responseMsg) {
            this.notification.showSuccessToast(
              responseMsg || 'Success. Group has been updated'
            )
          } else {
            this.notification.showWarningToast(
              'No agents were added or removed'
            )
          }
        }
        this.scope.addMultipleAgents(false)
        this.scope.multipleSelectorLoading = false
        await this.updateGroupInformation(null, {
          group: this.scope.currentGroup.name
        })
      } catch (err) {
        this.scope.multipleSelectorLoading = false
        this.notification.showErrorToast(
          err.message || err,
          'Error applying changes'
        )
      }
      this.scope.$applyAsync()
      return
    }

    /*
     * Get the key equivalences
     */
    keyEquivalences(key) {
      const options = {
        groupConf: 'Configurations',
        agentsList: 'Agents in group'
      }
      return options[key] || key
    }

    async editGroupAgentConfig() {
      try {
        this.scope.editingFile = true
        this.scope.fetchedXML = await this.fetchFile()
        this.scope.$broadcast('fetchedFile', { data: this.scope.fetchedXML })
      } catch (error) {
        this.scope.fetchedXML = null
        this.notification.showErrorToast(error.message || error)
      }
      this.scope.$applyAsync()
      return
    }

    async saveGroupAgentConfig(content) {
      try {
        const result = await this.apiReq.request(
          'POST',
          `/groups/${this.scope.currentGroup.name}/configuration`,
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
        this.notification.showErrorToast(error.message || error)
      }
      return
    }

    getItemsToSave() {
      try {
        const original = this.scope.firstSelectedList
        const modified = this.scope.selectedAgents.data
        this.scope.deletedAgents = []
        this.scope.addedAgents = []

        modified.forEach(mod => {
          if (original.filter(e => e.key === mod.key).length === 0) {
            this.scope.addedAgents.push(mod)
          }
        })

        original.forEach(orig => {
          if (modified.filter(e => e.key === orig.key).length === 0) {
            this.scope.deletedAgents.push(orig)
          }
        })
        const addedSet = new Set(this.scope.addedAgents.map(x => x.key))
        const addedIds = Array.from(addedSet)
        const deletedSet = new Set(this.scope.deletedAgents.map(x => x.key))
        const deletedIds = Array.from(deletedSet)
        return { addedIds, deletedIds }
      } catch (error) {
        throw new Error(error.message || error)
      }
    }

    checkLimit() {
      if (this.scope.firstSelectedList) {
        const itemsToSave = this.getItemsToSave()
        this.scope.currentAdding = itemsToSave.addedIds.length
        this.scope.currentDeleting = itemsToSave.deletedIds.length
        this.scope.moreThan500 =
          this.scope.currentAdding > 500 || this.scope.currentDeleting > 500
      }
    }

    getCheckLimit() {
      if (this.scope.firstSelectedList) {
        const itemsToSave = this.getItemsToSave()
        this.scope.currentAdding = itemsToSave.addedIds.length
        this.scope.currentDeleting = itemsToSave.deletedIds.length
        this.scope.moreThan500 =
          this.scope.currentAdding > 500 || this.scope.currentDeleting > 500
      }
    }

    closeEditingFile() {
      this.scope.editingFile = false
      this.scope.$applyAsync()
    }

    xmlIsValid(valid) {
      this.scope.xmlHasErrors = valid
      this.scope.$applyAsync()
    }

    doSaveGroupAgentConfig() {
      this.scope.saveIncomplete = true
      this.scope.$broadcast('saveXmlFile', {
        group: this.scope.currentGroup.name
      })
    }
    /**
     * Navigates to agents
     */
    goBackToAgents() {
      this.scope.groupsSelectedTab = 'agents'
      this.scope.file = false
      this.scope.filename = false
      this.scope.$applyAsync()
    }

    /**
     * Reloads the state
     */
    reload() {
      if (
        this.stateParams &&
        this.stateParams.group &&
        typeof this.stateParams.group === 'object'
      )
        this.state.go('.', { group: undefined })
      else this.state.reload()
    }

    /**
     * Navigates to files
     */
    goBackFiles() {
      this.scope.errorsEditingGroup = false
      this.scope.groupsSelectedTab = 'files'
      this.scope.addingAgents = false
      this.scope.editingAgents = false
      this.scope.file = false
      this.scope.filename = false
      this.scope.fileViewer = false
      this.scope.editingFile = false
      this.scope.$applyAsync()
    }

    /**
     * Navigates to groups
     */
    goBackGroups() {
      this.scope.errorsEditingGroup = false
      this.scope.currentGroup = false
      this.scope.lookingGroup = false
      this.scope.editingFile = false
      this.scope.$applyAsync()
    }

    /**
     *
     * @param {String} groupName
     * @param {String} fileName
     */
    async showFile(groupName, fileName) {
      try {
        if (this.scope.filename) this.scope.filename = ''
        if (fileName === '../ar.conf') fileName = 'ar.conf'
        this.scope.fileViewer = true
        const tmpName = `/groups/${groupName}/files/${fileName}`
        const data = await this.apiReq(tmpName)
        this.scope.file = this.beautifier.prettyPrint(data.data.data)
        this.scope.filename = fileName
        this.scope.$applyAsync()
      } catch (error) {
        this.notification.showErrorToast('Error showing file ')
      }
      return
    }

    async initReportConfig() {
      const data = {
        configurations: [
          this.scope.selectedOptions.groupConf
            ? {
                title: 'Main group configurations',
                sections: [
                  {
                    desc: 'agent.conf',
                    groupConfig: true,
                    labels: {}
                  }
                ]
              }
            : false,
          this.scope.selectedOptions.agentsList
            ? {
                title: 'Agents ',
                sections: [
                  {
                    desc: 'agents',
                    agentList: true,
                    labels: {}
                  }
                ]
              }
            : false
        ]
      }

      if (!this.scope.loadingReporting)
        this.reportingService.reportGroupConfiguration(
          this.scope.currentGroup,
          data,
          this.api
        )
    }

    /**
     * Group by any key
     * @param {Obj} collection
     * @param {String} property
     */
    groupBy(collection, property) {
      try {
        const values = []
        const result = []
        for (const item of collection) {
          const index = values.indexOf(item[property])
          if (index > -1) result[index].push(item)
          else {
            values.push(item[property])
            result.push([item])
          }
        }
        return result.length ? result : false
      } catch (error) {
        return false
      }
    }
  }
  controllers.controller('groupsCtrl', Groups)
})
