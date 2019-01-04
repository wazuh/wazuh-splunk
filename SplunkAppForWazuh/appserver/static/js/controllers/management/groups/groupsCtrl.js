define(['../../module', 'FileSaver'], function (controllers) {
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
      $timeout
    ) {
      this.scope = $scope
      this.state = $state
      this.beautifier = $beautifierJson
      this.stateParams = $stateParams
      this.api = $currentDataService.getApi()
      this.timeout = $timeout
      this.csvReq = $csvRequestService
      this.wzTableFilter = $tableFilterService
      this.apiReq = $requestService.apiReq
      this.toast = $notificationService.showSimpleToast
      this.mainGroup = ''
      this.scope.lookingGroup = false
      this.scope.loadingRing = false
      this.scope.$watch('lookingGroup', value => {
        this.scope.availableAgents = { 'loaded': false, 'data': [], 'offset': 0, 'loadedAll': false }
        this.scope.selectedAgents = { 'loaded': false, 'data': [], 'offset': 0, 'loadedAll': false }
        this.scope.addMultipleAgents(false)
        this.scope.$broadcast('closeEditXmlFile', {})
        if (!value) {
          this.scope.file = false
          this.scope.filename = false
        }
      })

      this.scope.$on('groupsIsReloaded', () => {
        this.scope.currentGroup = false
        this.scope.lookingGroup = false
        this.scope.addingAgents = false
        if (!this.scope.$$phase) this.scope.$digest()
      })

      this.scope.$on('wazuhShowGroup', (event, parameters) => {
        return this.loadGroup(parameters.group)
      })

      this.scope.$on('wazuhShowGroupFile', (event, parameters) => {
        return this.showFile(parameters.groupName, parameters.fileName)
      })

      this.scope.$on('updateGroupInformation', async (event, parameters) => {
        try {
          const result = await this.apiReq(
            `/agents/groups/${parameters.group}`,
            { limit: 1 },
          )
          this.scope.currentGroup.count = result.data.data.totalItems
        } catch (error) {
          this.toast(error)
        }
        if (!this.scope.$$phase) this.scope.$digest()
        return
      })
    }

    /**
     * On controller load
     */
    $onInit() {
      this.scope.search = term => {
        this.scope.$broadcast('wazuhSearch', { term })
      }
      this.scope.loadGroup = (group, firstLoad) =>
        this.loadGroup(group, firstLoad)
      this.scope.toggle = () => (this.scope.lookingGroup = true)
      this.scope.goBackToAgents = () => this.goBackToAgents()
      this.scope.reload = () => this.reload()
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


      this.scope.reload = async (element, searchTerm, addOffset, start) => {
        if (element === 'left') {
          if (!this.scope.availableAgents.loadedAll) {
            this.scope.multipleSelectorLoading = true
            if (start) {
              this.scope.selectedAgents.offset = 0
            } else {
              this.scope.availableAgents.offset += addOffset + 1
            }
            await this.scope.loadAllAgents(searchTerm, start)
          }
        } else {
          if (!this.scope.selectedAgents.loadedAll) {
            this.scope.multipleSelectorLoading = true
            this.scope.selectedAgents.offset += addOffset + 1
            await this.scope.loadSelectedAgents(searchTerm)
          }
        }
        this.timeout(() => {
          this.scope.multipleSelectorLoading = false
        }, 100)
      }

      this.scope.loadSelectedAgents = async (searchTerm) => {
        try {
          let params = { 'offset': !searchTerm ? this.scope.selectedAgents.offset : 0, 'select': ["id", "name"] }
          if (searchTerm) {
            params.search = searchTerm
          }
          const result = await this.apiReq(`/agents/groups/${this.scope.currentGroup.name}`,
            params)
          this.scope.totalSelectedAgents = result.data.data.totalItems
          const mapped = result.data.data.items.map((item) => {
            return { 'key': item.id, 'value': item.name }
          })
          if (searchTerm) {
            this.scope.selectedAgents.data = mapped
            this.scope.selectedAgents.loadedAll = true
          } else {
            this.scope.selectedAgents.data = this.scope.selectedAgents.data.concat(mapped)
          }
          if (this.scope.selectedAgents.data.length === 0 || this.scope.selectedAgents.data.length < 500 || this.scope.selectedAgents.offset >= this.scope.totalSelectedAgents) {
            this.scope.selectedAgents.loadedAll = true
          }
        } catch (error) {
          this.toast(error.message || error)
        }
        this.scope.selectedAgents.loaded = true
      }

      this.scope.loadAllAgents = async (searchTerm, start) => {
        try {
          const params = {
            q: 'id!=000',
            offset: !searchTerm ? this.scope.availableAgents.offset : 0,
            select: ["id", "name"]
          }
          if (searchTerm) {
            params.search = searchTerm
            this.scope.availableAgents.offset = 0
          }
          const req = await this.apiReq('/agents/', params)
          this.scope.totalAgents = req.data.data.totalItems
          const mapped = req.data.data.items.filter((item) => {
            return this.scope.selectedAgents.data.filter((selected) => {
              return selected.key == item.id
            }).length == 0 && item.id !== '000'
          }).map((item) => {
            return { 'key': item.id, 'value': item.name }
          })
          if (searchTerm || start) {
            this.scope.availableAgents.data = mapped
          } else {
            this.scope.availableAgents.data = this.scope.availableAgents.data.concat(mapped)
          }
          if (this.scope.availableAgents.data.length === 0 && !searchTerm) {
            if (this.scope.availableAgents.offset >= this.scope.totalAgents) {
              this.scope.availableAgents.loadedAll = true
            }
            if (!this.scope.availableAgents.loadedAll) {
              this.scope.availableAgents.offset += 499
              await this.scope.loadAllAgents()
            }
          }
        } catch (error) {
          this.toast(error.message || error)
        }
      }

      this.scope.addMultipleAgents = async (toggle) => {
        try {
          this.scope.addingAgents = toggle
          if (toggle && !this.scope.availableAgents.loaded) {
            this.scope.availableAgents = { 'loaded': false, 'data': [], 'offset': 0, 'loadedAll': false }
            this.scope.selectedAgents = { 'loaded': false, 'data': [], 'offset': 0, 'loadedAll': false }
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
          this.toast('Error adding agents.')
        }
        if (!this.scope.$$phase) this.scope.$digest()
        return
      }

      this.scope.getItemsToSave = () => {
        const original = this.scope.firstSelectedList
        const modified = this.scope.selectedAgents.data
        this.scope.deletedAgents = []
        this.scope.addedAgents = []

        modified.forEach(mod => {
          if (original.filter(e => e.key === mod.key).length === 0) {
            this.scope.addedAgents.push(mod)
          }
        })

        original.forEach((orig) => {
          if (modified.filter(e => e.key === orig.key).length === 0) {
            this.scope.deletedAgents.push(orig)
          }
        })

        return {
          addedIds: [...new Set(this.scope.addedAgents.map(x => x.key))],
          deletedIds: [...new Set(this.scope.deletedAgents.map(x => x.key))]
        }
      }

      this.scope.saveAddAgents = async () => {
        const itemsToSave = this.scope.getItemsToSave()
        const failedIds = []
        try {
          this.scope.multipleSelectorLoading = true
          if (itemsToSave.addedIds.length) {
            const addResponse = await this.apiReq(
              `/agents/group/${this.scope.currentGroup.name}`,
              { ids: itemsToSave.addedIds },
              'POST'
            )
            if (addResponse.data.data.failed_ids) {
              failedIds.push(...addResponse.data.data.failed_ids)
            }
          }
          if (itemsToSave.deletedIds.length) {
            const deleteResponse = await this.apiReq(
              `/agents/group/${this.scope.currentGroup.name}`,
              { ids: itemsToSave.deletedIds },
              'DELETE'
            )
            if (deleteResponse.data.data.failed_ids) {
              failedIds.push(...deleteResponse.data.data.failed_ids)
            }
          }

          if (failedIds.length) {
            this.toast(
              `Warning. Group has been updated but an error has occurred with the following agents ${failedIds}`
            )
          } else {
            this.toast('Success. Group has been updated')
          }
          this.scope.addMultipleAgents(false)
        } catch (err) {
          this.toast('Error applying changes')
        }
        this.timeout(() => {
          this.scope.multipleSelectorLoading = false
          this.scope.$emit('updateGroupInformation', {
            group: this.scope.currentGroup.name
          })
        }, 100)
      }

      this.scope.checkLimit = () => {
        if (this.scope.firstSelectedList) {
          const itemsToSave = this.scope.getItemsToSave()
          this.scope.currentAdding = itemsToSave.addedIds.length
          this.scope.currentDeleting = itemsToSave.deletedIds.length
          this.scope.moreThan1000 =
            this.scope.currentAdding > 1000 || this.scope.currentDeleting > 1000
        }
      }

      if (!this.scope.$$phase) this.scope.$digest()
    }

    editGroupAgentConfig(group) {
      this.scope.$broadcast('editXmlFile', { 'target': group })
    }

    /**
     * Exports the table in CSV format
     */
    async downloadCsv(path, name) {
      try {
        this.toast('Your download should begin automatically...')
        const currentApi = this.api.id
        const output = await this.csvReq.fetch(
          path,
          currentApi,
          this.wzTableFilter.get()
        )
        const blob = new Blob([output], { type: 'text/csv' }) // eslint-disable-line
        saveAs(blob, name) // eslint-disable-line 
        return
      } catch (error) {
        this.toast('Error downloading CSV')
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
        this.toast('Cannot load group data')
      }
      return
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
      this.scope.groupsSelectedTab = 'files'
      this.scope.addingAgents = false
      this.scope.file = false
      this.scope.filename = false
      this.scope.fileViewer = false
      if (!this.scope.$$phase) this.scope.$digest()
    }

    /**
     * Navigates to groups
     */
    goBackGroups() {
      this.scope.currentGroup = false
      this.scope.lookingGroup = false
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
        this.toast('Error showing file ')
      }
      return
    }
  }
  controllers.controller('groupsCtrl', Groups)
})
