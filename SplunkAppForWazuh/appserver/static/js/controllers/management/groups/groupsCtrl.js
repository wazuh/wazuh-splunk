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
      $groupHandler,
      extensions
    ) {
      this.scope = $scope
      this.state = $state
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
        this.scope.addMultipleAgents(false)
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
        if (!this.scope.$$phase) this.scope.$digest()
      })

      // Come from the pencil icon on the groups table
      this.scope.$on('openGroupFromList', (ev, parameters) => {
        this.scope.editingFile = true
        this.scope.groupsSelectedTab = 'files'
        return this.scope
          .loadGroup(parameters.group)
          .then(() => this.scope.editGroupAgentConfig())
      })

      this.scope.$on('wazuhShowGroup', (event, parameters) => {
        this.goBackToAgents()
        return this.loadGroup(parameters.group)
      })

      this.scope.$on('configurationSuccess', () => {
        this.scope.editingFile = false
        if (!this.scope.$$phase) this.scope.$digest()
      })

      this.scope.$on('wazuhShowGroupFile', (event, parameters) => {
        if (
          ((parameters || {}).fileName || '').includes('agent.conf') &&
          this.scope.adminMode
        ) {
          return this.scope.editGroupAgentConfig()
        }
        return this.showFile(parameters.groupName, parameters.fileName)
      })

      this.scope.$on('updateGroupInformation', async (event, parameters) => {
        try {
          if (this.scope.currentGroup) {
            const result = await Promise.all([
              await this.apiReq(`/agents/groups/${parameters.group}`, {
                limit: 1
              }),
              await this.apiReq(`/agents/groups`, {
                search: parameters.group
              })
            ])

            const [count, sums] = result.map(
              item => ((item || {}).data || {}).data || false
            )
            const updatedGroup = ((sums || {}).items || []).find(
              item => item.name === parameters.group
            )
            this.scope.currentGroup.count = (count || {}).totalItems || 0
            if (updatedGroup) {
              this.scope.currentGroup.configSum = updatedGroup.configSum
              this.scope.currentGroup.mergedSum = updatedGroup.mergedSum
            }
          }
        } catch (error) {
          this.notification.showErrorToast(error.message || error)
        }
        if (!this.scope.$$phase) this.scope.$digest()
        return
      })

      this.scope.$on('openGroupFromList', (ev, parameters) => {
        this.scope.editingFile = true
        this.scope.groupsSelectedTab = 'files'
        return this.scope
          .loadGroup(parameters.group)
          .then(() => this.scope.editGroupAgentConfig())
      })

      this.scope.$on('saveComplete', () => {
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

        this.scope.adminMode = this.extensions['admin'] === 'true'

        if (!this.scope.$$phase) this.scope.$digest()
      } catch (err) {
        console.error('err ', err)
        this.scope.adminMode = true
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
     * @param {Object} group
     * @param {Boolean} firstLoad
     */
    async loadGroup(group, firstLoad) {
      try {
        if (!firstLoad) this.scope.lookingGroup = true
        const count = await this.apiReq(`/agents/groups/${group.name}/files`, {
          limit: 1
        })
        this.scope.totalFiles = count.data.data.totalItems
        this.scope.fileViewer = false
        this.scope.currentGroup = group
        this.mainGroup = group
        if (!this.scope.$$phase) this.scope.$digest()
      } catch (error) {
        this.notification.showErrorToast('Cannot load group data')
      }
      return
    }

    async fetchFile() {
      try {
        const data = await this.apiReq(
          `/agents/groups/${this.scope.currentGroup.name}/files/agent.conf`,
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
        if (!this.scope.$$phase) this.scope.$digest()
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
          `/agents/groups/${this.scope.currentGroup.name}`,
          params
        )
        this.scope.totalSelectedAgents = result.data.data.totalItems
        const mapped = result.data.data.items.map(item => {
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
          select: ['id', 'name']
        }
        if (searchTerm) {
          params.search = searchTerm
          this.scope.availableAgents.offset = 0
        }
        const req = await this.apiReq('/agents/', params)
        this.scope.totalAgents = req.data.data.totalItems
        const mapped = req.data.data.items
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
          this.scope.firstSelectedList = [...this.scope.selectedAgents.data]
          await this.scope.loadAllAgents()
          this.scope.multipleSelectorLoading = false
        }
      } catch (err) {
        this.notification.showErrorToast('Error adding agents.')
      }
      if (!this.scope.$$phase) this.scope.$digest()
      return
    }

    async updateGroupInformation(event, parameters) {
      try {
        if (this.scope.currentGroup) {
          const result = await Promise.all([
            await this.apiReq(`/agents/groups/${parameters.group}`, {
              limit: 1
            }),
            await this.apiReq(`/agents/groups`, {
              search: parameters.group
            })
          ])

          const [count, sums] = result.map(
            item => ((item || {}).data || {}).data || false
          )
          const updatedGroup = ((sums || {}).items || []).find(
            item => item.name === parameters.group
          )

          this.scope.currentGroup.count = (count || {}).totalItems || 0
          if (updatedGroup) {
            this.scope.currentGroup.configSum = updatedGroup.configSum
            this.scope.currentGroup.mergedSum = updatedGroup.mergedSum
          }
        }
      } catch (error) {
        this.notification.showErrorToast(error.message || error, 'Groups')
      }
      if (!this.scope.$$phase) this.scope.$digest()
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
            `/agents/group/${this.scope.currentGroup.name}`,
            { ids: itemsToSave.addedIds },
            'POST'
          )
          if (response.data.error !== 0) {
            throw new Error(response.data.error)
          }
          if (response.data.data.failed_ids) {
            failedIds.push(...response.data.data.failed_ids)
          }
        }
        // Delete agents from a group
        if (itemsToSave.deletedIds.length) {
          response = await this.apiReq(
            `/agents/group/${this.scope.currentGroup.name}`,
            { ids: itemsToSave.deletedIds },
            'DELETE'
          )
          if (response.data.error !== 0) {
            throw new Error(response.data.error)
          }
          if (response.data.data.failed_ids) {
            failedIds.push(...response.data.data.failed_ids)
          }
        }

        if (failedIds.length) {
          this.scope.errorsEditingGroup = failedIds
          this.notification.showWarningToast(
            `Warning. Group has been updated but an error has occurred.`
          )
        } else {
          this.notification.showSuccessToast(response.data.data.msg ||'Success. Group has been updated')
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
      if (!this.scope.$$phase) this.scope.$digest()
      return
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

        const addedIds = [...new Set(this.scope.addedAgents.map(x => x.key))]
        const deletedIds = [
          ...new Set(this.scope.deletedAgents.map(x => x.key))
        ]
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
      if (!this.scope.$$phase) this.scope.$digest()
    }

    xmlIsValid(valid) {
      this.scope.xmlHasErrors = valid
      if (!this.scope.$$phase) this.scope.$digest()
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
      if (!this.scope.$$phase) this.scope.$digest()
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
      if (!this.scope.$$phase) this.scope.$digest()
    }

    /**
     * Navigates to groups
     */
    goBackGroups() {
      this.scope.errorsEditingGroup = false
      this.scope.currentGroup = false
      this.scope.lookingGroup = false
      this.scope.editingFile = false
      if (!this.scope.$$phase) this.scope.$digest()
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
        const tmpName = `/agents/groups/${groupName}/files/${fileName}`
        const data = await this.apiReq(tmpName)
        this.scope.file = this.beautifier.prettyPrint(data.data.data)
        this.scope.filename = fileName
        if (!this.scope.$$phase) this.scope.$digest()
      } catch (error) {
        this.notification.showErrorToast('Error showing file ')
      }
      return
    }
  }
  controllers.controller('groupsCtrl', Groups)
})
