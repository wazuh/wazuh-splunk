define(['../../module'], function(controllers) {
  'use strict'

  class SettingsApi {
    /**
     * Class settings API
     * @param {*} $scope
     * @param {*} $currentDataService
     * @param {*} apiList
     * @param {*} $notificationService
     */
    constructor($scope, $currentDataService, apiList, $notificationService) {
      this.scope = $scope
      this.scope.addManagerContainer = false
      this.scope.isEditing = false
      this.scope.showForm = apiList.length === 0 ? true : false
      this.scope.entry = {}
      this.scope.currentEntryKey = ''
      this.userRegEx = new RegExp(/^.{3,100}$/)
      this.passRegEx = new RegExp(/^.{3,100}$/)
      this.urlRegEx = new RegExp(/^https?:\/\/[a-zA-Z0-9-.]{1,300}$/)
      this.urlRegExIP = new RegExp(
        /^https?:\/\/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/
      )
      this.portRegEx = new RegExp(/^[0-9]{2,5}$/)
      this.apiList = apiList
      this.currentDataService = $currentDataService
      this.notification = $notificationService
      this.savingApi = false
    }

    /**
     * On controller loads
     */
    $onInit() {
      this.scope.init = () => this.init()
      this.scope.addNewApiClick = () => this.addNewApiClick()
      this.scope.checkManager = entry => this.checkManager(entry)
      this.scope.editEntry = entry => this.editEntry(entry)
      this.scope.removeManager = entry => this.removeManager(entry)
      this.scope.updateEntry = () => this.updateEntry()
      this.scope.selectManager = mg => this.selectManager(mg)
      this.scope.submitApiForm = () => this.submitApiForm()
      this.init()
    }

    /**
     * Initializes functions
     */
    async init() {
      try {
        // If no API, then remove cookie
        if (Array.isArray(this.apiList) && this.apiList.length === 0) {
          this.currentDataService.removeCurrentApi()
          this.scope.$emit('updatedAPI', () => {})
        }
        // Get the current selected API
        let currentApi = this.currentDataService.getApi()
        // If there is API, then show it as selected
        if (currentApi) {
          this.setYellowStar(currentApi['_key'])
        }
        this.scope.apiList = this.apiList
        if (!currentApi && Array.isArray(this.scope.apiList)) {
          for (const apiEntry of this.scope.apiList) {
            try {
              await this.selectManager(apiEntry['_key'])
              // Set API
              currentApi = this.currentDataService.getApi()
              break
            } catch (error) {
              continue
            }
          }
        }
      } catch (err) {
        this.notification.showErrorToast('Error loading data')
      }
    }

    /**
     * Removes an API from the list
     * @param {Object} entry
     */
    async removeManager(entry) {
      try {
        const index = this.scope.apiList.indexOf(entry)
        if (index > -1) {
          await this.currentDataService.remove(entry)
          const usedApi = this.currentDataService.getApi()
          if (entry._key === usedApi._key) {
            this.currentDataService.removeCurrentApi()
          }
          this.scope.apiList.splice(index, 1)
          this.notification.showSuccessToast('Manager was removed')
          this.scope.$emit('updatedAPI', () => {})
        }
      } catch (err) {
        this.notification.showErrorToast(
          `Cannot remove API: ${err.message || err}`
        )
      }
    }

    /**
     * Check API connectivity
     * @param {Object} entry
     */
    async checkManager(entry) {
      try {
        const connectionData = await this.currentDataService.checkApiConnection(
          entry._key
        )
        for (let i = 0; i < this.scope.apiList.length; i++) {
          if (this.scope.apiList[i]._key === entry._key) {
            this.scope.apiList[i] = connectionData
            this.scope.apiList[i].selected = entry.selected // Check if the API was selected, if it was, set the yellow star
            break
          }
        }
        this.notification.showSuccessToast('Connection established')
        this.scope.$applyAsync()
      } catch (err) {
        this.notification.showErrorToast(err || 'Unreachable API')
      }
    }

    /**
     * Set form visible
     */
    addNewApiClick() {
      this.scope.showForm = !this.scope.showForm
      this.scope.edit = false
    }

    /**
     * Shows form for editting an API entry
     * @param {Object} entry
     */
    editEntry(entry) {
      try {
        this.scope.edit = !this.scope.edit
        this.scope.showForm = false
        this.scope.currentEntryKey = entry['_key']
        this.scope.url = entry.url
        this.scope.pass = entry.pass
        this.scope.port = entry.portapi
        this.scope.user = entry.userapi
        this.scope.managerName = entry.managerName
        this.scope.filterType = entry.filterType
        this.scope.filterName = entry.filterName
        this.scope.entry.url = entry
      } catch (err) {
        this.notification.showErrorToast('Could not open API form')
      }
    }

    /**
     * Edits an entry
     * @param {Object} entry
     */
    async updateEntry() {
      try {
        if (this.savingApi) {
          this.notification.showWarningToast('Please, wait for success message')
          return
        }
        this.savingApi = true
        this.scope.edit = !this.scope.edit
        this.scope.showForm = false
        this.scope.entry.url = this.scope.url
        this.scope.entry.portapi = this.scope.port
        this.scope.entry.userapi = this.scope.user
        this.scope.entry.passapi = this.scope.pass
        this.scope.entry.filterType = this.scope.filterType
        this.scope.entry.filterName = this.scope.filterName
        this.scope.entry.managerName = this.scope.managerName
        this.scope.entry['_key'] = this.scope.currentEntryKey

        delete this.scope.entry['$$hashKey']
        await this.currentDataService.checkRawConnection(this.scope.entry)
        await this.currentDataService.update(this.scope.entry)
        const updatedApi = await this.currentDataService.checkApiConnection(
          this.scope.entry['_key']
        )

        for (let i = 0; i < this.scope.apiList.length; i++) {
          if (this.scope.apiList[i]['_key'] === updatedApi['_key']) {
            this.scope.apiList[i] = updatedApi
          }
        }
        this.scope.$applyAsync()

        if (
          this.currentDataService.getApi() &&
          this.currentDataService.getApi()['_key'] === this.scope.entry['_key']
        ) {
          this.selectManager(updatedApi['_key'])
        }

        this.scope.edit = false
        this.notification.showSuccessToast('Updated API')
      } catch (err) {
        this.notification.showErrorToast(err || 'Cannot update API')
      }
      this.savingApi = false
    }

    /**
     * Select an API as the default one
     * @param {String} key
     */
    async selectManager(key) {
      try {
        // checking if the api is up
        await this.currentDataService.checkApiConnection(key)
        // Selecting API
        await this.currentDataService.chose(key)
        this.setYellowStar(key)
        this.notification.showSuccessToast('API selected')
        this.scope.$emit('updatedAPI', () => {})
        this.scope.$applyAsync()
      } catch (err) {
        this.notification.showErrorToast(err || 'Could not select manager')
      }
    }

    /**
     * Adds a new API
     */
    async submitApiForm() {
      try {
        this.scope.validatingError = []
        if (this.savingApi) {
          this.notification.showWarningToast('Please, wait for success message')
          return
        }
        this.savingApi = true

        // When the Submit button is clicked, get all the form fields by accessing to the input values
        const form_url = this.scope.url
        const form_apiport = this.scope.port
        const form_apiuser = this.scope.user
        const form_apipass = this.scope.pass

        // If values are not valid then throw an error
        if (
          !this.validPassword(form_apipass) ||
          !this.validPort(form_apiport) ||
          !this.validUrl(form_url) ||
          !this.validUsername(form_apiuser)
        ) {
          throw new Error('Invalid format. Please check the fields again')
        }

        // Create an object to store the field names and values
        const record = {
          url: form_url,
          portapi: form_apiport,
          userapi: form_apiuser,
          passapi: form_apipass
        }

        // If connected to the API then continue
        const api = await this.currentDataService.addApi(record)

        // Empties the form fields
        this.clearForm()

        // Push to te API list
        this.scope.apiList.push(api)

        // If the only one API in the list, then try to select it
        if (this.scope.apiList.length === 1) {
          this.selectManager(api['_key'])
        }

        this.scope.showForm = false
        this.scope.$applyAsync()
        this.notification.showSuccessToast('New API was added')
      } catch (err) {
        if (
          typeof err === 'string' &&
          err.startsWith('Unexpected Wazuh version')
        ) {
          this.scope.validatingError.push(err)
        } else {
          this.notification.showErrorToast(
            err.message || err || 'Cannot save the API.'
          )
        }
      }
      this.savingApi = false
    }

    /**
     * Check if an URL is valid or not
     * @param {String} url
     */
    validUrl(url) {
      if (this.urlRegEx.test(url) || this.urlRegExIP.test(url)) {
        return true
      } else {
        this.scope.validatingError.push('Invalid url format')
        return false
      }
    }

    /**
     * Check if a port is valid or not
     * @param {String} port
     */
    validPort(port) {
      if (this.portRegEx.test(port)) {
        return true
      } else {
        this.scope.validatingError.push('Invalid port format')
        return false
      }
    }

    /**
     * Check if an user is valid or not
     * @param {String} user
     */
    validUsername(user) {
      if (this.userRegEx.test(user)) {
        return true
      } else {
        this.scope.validatingError.push(
          'Invalid username format, it must have a length between 3 and 100 characters.'
        )
        return false
      }
    }

    /**
     * Check if a password is valid or not
     * @param {String} pass
     */
    validPassword(pass) {
      if (this.passRegEx.test(pass)) {
        return true
      } else {
        this.scope.validatingError.push(
          'Invalid password format, it must have a length between 3 and 100 characters.'
        )
        return false
      }
    }

    /**
     * Empties the form fields
     */
    clearForm() {
      this.scope.url = ''
      this.scope.port = ''
      this.scope.user = ''
      this.scope.pass = ''
    }

    setYellowStar(key) {
      this.apiList.map(api => {
        api['_key'] === key ? (api.selected = true) : (api.selected = false)
      })
    }
  }
  controllers.controller('settingsApiCtrl', SettingsApi)
})
