define(['../../module'], function (controllers) {
  'use strict'

  class SettingsApi {
    /**
     * Class settings API
     * @param {*} $scope
     * @param {*} $currentDataService
     * @param {*} apiList
     * @param {*} $notificationService
     */
    constructor($scope, $currentDataService, apiList, isSplunkAdmin, $notificationService) {
      this.scope = $scope
      this.scope.addManagerContainer = false
      this.scope.isEditing = false
      this.scope.showForm = apiList.length === 0 ? true : false
      this.scope.entry = {}
      this.scope.currentEntryKey = ''
      this.userRegEx = new RegExp(/^.{3,100}$/)
      this.passRegEx = new RegExp(/^.{3,100}$/)
      this.aliasRegEx = new RegExp(/^.{3,100}$/)
      this.urlRegEx = new RegExp(/^https?:\/\/[a-zA-Z0-9-.]{1,300}$/)
      this.urlRegExIP = new RegExp(
        /^https?:\/\/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/
      )
      this.portRegEx = new RegExp(/^[0-9]{2,5}$/)
      this.apiList = apiList
      this.currentDataService = $currentDataService
      this.notification = $notificationService
      this.savingApi = false
      this.scope.runAs = false;
      this.scope.isSplunkAdmin = isSplunkAdmin
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
      this.scope.updateEntry = (user, pass, url, port, alias, runAs) =>
        this.updateEntry(user, pass, url, port, alias, runAs)
      this.scope.selectManager = mg => this.selectManager(mg)
      this.scope.submitApiForm = (user, api, url, port, alias, runAs) =>
        this.submitApiForm(user, api, url, port, alias, runAs)
      this.scope.getIconAndTooltip = entry => this.getIconAndTooltip(entry)
      this.init()

      // Init form values
      this.clearForm();

      // Listens for changes in the selected API
      this.scope.$on('APIChanged', (event, key) => {
        this.setYellowStar(key)
        this.scope.$applyAsync()
      })
    }

    /**
     * Initializes functions
     */
    async init() {
      try {
        const kvStoreError = ((this.apiList || {}).messages || [])[0] || {}
        if (kvStoreError.text) {
          this.scope.kvStoreInitializing = true
          throw new Error(kvStoreError.text)
        } else {
          this.scope.kvStoreInitializing = false
          // If no API, then remove cookie
          if (Array.isArray(this.apiList) && this.apiList.length === 0) {
            this.currentDataService.removeCurrentApi()
            this.scope.$emit('updatedAPI', () => { })
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
        }
      } catch (err) {
        this.notification.showErrorToast(
          `Error loading the data: ${err.message || err}`
        )
      }
    }

    /**
     * Removes an API from the list
     * @param {Object} entry
     */
    async removeManager(entry) {
      try {
        this.scope.loadingVizz = true
        const index = this.scope.apiList.indexOf(entry)
        if (index > -1) {
          await this.currentDataService.remove(entry)
          const usedApi = this.currentDataService.getApi()
          if (entry && usedApi && entry._key === usedApi._key) {
            this.currentDataService.removeCurrentApi()
          }
          this.scope.apiList.splice(index, 1)
          this.scope.loadingVizz = false
          this.notification.showSuccessToast('Manager was removed')
          this.scope.$emit('updatedAPI', () => { })

          // Turn off the isEditing mode
          this.scope.edit = false
          this.scope.showForm = false
        }
        this.currentDataService.removeExtensionsById(entry['_key'])
      } catch (err) {
        this.scope.loadingVizz = false
        this.notification.showErrorToast(
          `Cannot remove the API: ${err.message || err}`
        )
      }
    }

    /**
     * Check API connectivity
     * @param {Object} entry
     */
    async checkManager(entry) {
      try {
        this.scope.loadingVizz = true
        const connectionData = await this.currentDataService.checkApiConnection(
          entry._key
        )
        for (let i = 0; i < this.scope.apiList.length; i++) {
          if (this.scope.apiList[i]._key === entry._key) {
            this.scope.apiList[i] = connectionData
            // Check if the API was selected, if it was, set the yellow star
            this.scope.apiList[i].selected = entry.selected
            break
          }
        }
        this.scope.loadingVizz = false
        this.notification.showSuccessToast('Connection established')
        this.scope.$applyAsync()
      } catch (err) {
        this.scope.loadingVizz = false
        this.notification.showErrorToast(
          `Unreachable API: ${err.message || err}`
        )
      }
    }

    /**
     * Set form visible
     */
    addNewApiClick() {
      this.clearForm()
      this.scope.showForm = !this.scope.showForm
      this.scope.edit = false
      this.scope.currentEntryKey = false
    }

    /**
     * Shows form for editting an API entry
     * @param {Object} entry
     */
    editEntry(entry) {
      try {
        this.scope.edit =
          this.scope.currentEntryKey === entry['_key'] ? !this.scope.edit : true
        this.scope.showForm = false
        this.scope.currentEntryKey = entry['_key']
        this.scope.alias = entry.alias
        this.scope.url = entry.url
        this.scope.pass = entry.pass
        this.scope.port = entry.portapi
        this.scope.runAs = entry.runAs;
        this.scope.user = entry.userapi
        this.scope.managerName = entry.managerName
        this.scope.filterType = entry.filterType
        this.scope.filterName = entry.filterName
        this.scope.entry.url = entry
      } catch (err) {
        this.notification.showErrorToast(
          `Could not open the API form: ${err.message || err}`
        )
      }
    }

    /**
     * Edits an entry
     * @param {Object} entry
     */
    async updateEntry(user, pass, url, port, alias, runAs = false) {
      try {
        this.scope.loadingVizz = true
        if (this.savingApi) {
          this.notification.showWarningToast('Please, wait for success message')
          return
        }
        this.scope.validatingError = []
        this.validateFormInput(user, pass, url, port, alias)
        this.savingApi = true
        this.scope.edit = !this.scope.edit
        this.scope.showForm = false
        this.scope.entry.url = url
        this.scope.entry.portapi = port
        this.scope.entry.userapi = user
        this.scope.entry.passapi = pass
        this.scope.entry.alias = alias
        this.scope.entry.runAs = runAs
        this.scope.entry.filterType = this.scope.filterType
        this.scope.entry.filterName = this.scope.filterName
        this.scope.entry.managerName = this.scope.managerName
        this.scope.entry['_key'] = this.scope.currentEntryKey

        delete this.scope.entry['$$hashKey']
        await this.currentDataService.checkRawConnection(this.scope.entry)

        // Update API
        let res = await this.currentDataService.update(this.scope.entry)
        // Handle errors
        if ('data' in res && 'messages' in res.data) {
          // messages in an array of {type, text} objects
          res.data.messages.forEach(item => {
            if ('type' in item && item.type === "ERROR") {
              throw new Error(item.text)
            }
          })
        }

        // Notify observers (modal)
        this.scope.$emit('updatedAPI', {})

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
          this.selectManager(updatedApi['_key'], false)
        }

        this.scope.edit = false
        this.scope.loadingVizz = false
        this.notification.showSuccessToast('API updated')
      } catch (err) {
        this.scope.loadingVizz = false

        this.notification.showErrorToast(
          `Cannot update the API: ${err.message || err}`
        )
      }
      this.savingApi = false
    }

    /**
     * Select an API as the default one
     * @param {String} key
     */
    async selectManager(key, showToast = true) {
      try {
        this.scope.loadingVizz = true
        // checking if the api is up
        await this.currentDataService.checkApiConnection(key)
        // Selecting API
        await this.currentDataService.chose(key)
        this.setYellowStar(key)
        this.scope.loadingVizz = false
        if (showToast)
          this.notification.showSuccessToast('API selected')
        this.scope.$emit('updatedAPI', () => { })
        this.scope.$applyAsync()
      } catch (err) {
        this.scope.loadingVizz = false
        this.notification.showErrorToast(
          `Could not select manager: ${err.message || err}`
        )
      }
    }

    /**
     * If values are not valid then throw an error
     * @param {*} user
     * @param {*} pass
     * @param {*} url
     * @param {*} port
     * @param {*} alias
     */
    validateFormInput(user, pass, url, port, alias) {
      if (
        !this.validPassword(pass) ||
        !this.validPort(port) ||
        !this.validUrl(url) ||
        !this.validUsername(user) ||
        !this.validAlias(alias)
      ) {
        this.scope.$applyAsync()
        throw new Error('Invalid format. Please check the fields again')
      }
    }

    /**
     * Adds a new API
     */
    async submitApiForm(user, pass, url, port, alias, runAs = false) {
      try {
        this.scope.loadingVizz = true
        this.scope.validatingError = []
        if (this.savingApi) {
          this.notification.showWarningToast('Please, wait for success message')
          return
        }
        this.savingApi = true

        this.validateFormInput(user, pass, url, port, alias)
        // When the Submit button is clicked, get all the form
        // fields by accessing to the input values
        const form_url = url
        const form_apiport = port
        const form_apiuser = user
        const form_apipass = pass
        const form_alias = alias

        // Create an object to store the field names and values
        const record = {
          url: form_url,
          portapi: form_apiport,
          userapi: form_apiuser,
          passapi: form_apipass,
          alias: form_alias,
          runAs: runAs
        }

        // If connected to the API then continue
        const api = await this.currentDataService.addApi(record)

        // Empties the form fields
        this.clearForm()

        // Push to te API list
        this.scope.apiList.push(api)

        // Check and refresh data
        this.checkManager(api)

        // If the only one API in the list, then try to select it
        if (this.scope.apiList.length === 1) {
          this.selectManager(api['_key'], false)
        }

        this.scope.showForm = false
        this.scope.$applyAsync()
        this.notification.showSuccessToast('New API was added')
        this.scope.loadingVizz = false
        this.scope.$emit('updatedAPI', () => { })
      } catch (err) {
        this.scope.loadingVizz = false
        if (
          typeof err === 'string' &&
          err.startsWith('Unexpected Wazuh version')
        ) {
          this.scope.validatingError.push(err)
          this.scope.$applyAsync()
        } else {
          this.notification.showErrorToast(
            `Cannot save the API: ${err.message || err}`
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
      if (url && (this.urlRegEx.test(url) || this.urlRegExIP.test(url))) {
        return true
      } else {
        this.scope.validatingError.push('Invalid URL format')
        return false
      }
    }

    /**
     * Check if a port is valid or not
     * @param {String} port
     */
    validPort(port) {
      if (port && this.portRegEx.test(port)) {
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
      if (user && this.userRegEx.test(user)) {
        return true
      } else {
        this.scope.validatingError.push(
          'Invalid username format, it must have a length between 3 and 100 characters.'
        )
        return false
      }
    }
    /**
     * Check if an user is valid or not
     * @param {String} user
     */
    validAlias(alias) {
      if (alias && this.aliasRegEx.test(alias)) {
        return true
      } else {
        this.scope.validatingError.push(
          'Invalid API alias format, it must have a length between 3 and 100 characters.'
        )
        return false
      }
    }
    /**
     * Check if a password is valid or not
     * @param {String} pass
     */
    validPassword(pass) {
      if (pass && this.passRegEx.test(pass)) {
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
      this.scope.alias = ''
      this.scope.runAs = false
    }

    setYellowStar(key) {
      this.apiList.map(api => {
        api['_key'] === key ? (api.selected = true) : (api.selected = false)
      })
    }


    /**
     * Evaluates the class and tooltip text for the given API 
     * object depending on the `run_as` value.
     * 
     * If the `run_as` field is true, a check icon is shown. If it is false,
     * a cross icon is shown instead. Respectively, the tooltip text takes 
     * 'enabled' or 'disable'.
     * 
     * @param {Object} entry API object to evaluate.
     * @returns Object with the CSS class for the icon and string text 
     * for the tooltip.
     */
    getIconAndTooltip(entry) {
      // Cast to boolean
      const runAs = (entry.runAs === "true") || (entry.runAs === true)
      return {
        class: runAs ? 'fa fa-check' : 'fa fa-times',
        tooltip: runAs ? 'enabled' : 'disabled'
      }
    }

  }
  controllers.controller('settingsApiCtrl', SettingsApi)
})
