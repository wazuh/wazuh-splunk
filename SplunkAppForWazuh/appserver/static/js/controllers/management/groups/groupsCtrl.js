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
      $notificationService
    ) {
      this.scope = $scope
      this.state = $state
      this.beautifier = $beautifierJson
      this.stateParams = $stateParams
      this.api = $currentDataService.getApi()

      this.csvReq = $csvRequestService

      this.wzTableFilter = $tableFilterService

      this.apiReq = $requestService.apiReq
      this.toast = $notificationService.showSimpleToast
      this.mainGroup = ''
      this.scope.lookingGroup = false
      this.scope.loadingRing = false

      this.scope.$watch('lookingGroup', value => {
        if (!value) {
          this.scope.file = false
          this.scope.filename = false
        }
      })

      this.scope.$on('groupsIsReloaded', () => {
        this.scope.currentGroup = false
        this.scope.lookingGroup = false
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
        } catch(error) {
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
      if (!this.scope.$$phase) this.scope.$digest()
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
