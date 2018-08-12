define([
  '../module',
], function (
  controllers
) {
    'use strict'
    controllers.controller('settingsApiCtrl', function ($scope, $currentDataService, apiList, toaster) {
      const vm = this
      vm.addManagerContainer = false
      vm.isEditing = false
      vm.showForm = (apiList.length === 0) ? true : false
      vm.entry = {}
      vm.currentEntryKey = ''
      const epoch = (new Date).getTime()
      // Validation RegEx
      const userRegEx = new RegExp(/^.{3,100}$/)
      const passRegEx = new RegExp(/^.{3,100}$/)
      const urlRegEx = new RegExp(/^https?:\/\/[a-zA-Z0-9-.]{1,300}$/)
      const urlRegExIP = new RegExp(/^https?:\/\/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/)
      const portRegEx = new RegExp(/^[0-9]{2,5}$/)

      /**
       * Initializes the controller
       */
      vm.init = function () {
        vm.selected = []
        vm.apiList = apiList
        vm.selectedApi = []
        vm.saveOrUpdate = 'Add'
      }

      /**
       * Removes an API from the list
       * @param {Object} entry 
       */
      vm.removeManager = async (entry) => {
        try {
          const index = vm.apiList.indexOf(entry)
          if (index > -1) {
            vm.apiList.splice(index, 1)
            await $currentDataService.remove(entry._key)
          }
          toaster.success({title:'Success',body:'Manager was removed.'})
        } catch (err) {
          console.error(err)
        }
      }

      /**
       * Check API connectivity
       * @param {Object} entry 
       */
      vm.checkManager = async (entry) => {
        try {
          await $currentDataService.checkApiConnection(entry._key)
          toaster.success({title:'Success',body:'Established connection.'})

        } catch (err) {
          toaster.error('Cannot connect with API', 'Error')
        }
      }

      /**
       * Set form visible
       */
      vm.addNewApiClick = () => {
        vm.showForm = !vm.showForm
        vm.edit = false
      }

      /**
       * Shows form for editting an API entry
       * @param {Object} entry 
       */
      vm.editEntry = (entry) => {
        try {
          vm.edit = !vm.edit
          vm.showForm = false
          vm.currentEntryKey = entry._key
          vm.url = entry.url
          vm.port = entry.portapi
          vm.user = entry.userapi
          vm.entry = entry
        } catch (err) {
          toaster.error('Could not open API form', 'Error')
        }
      }

      /**
       * Edits an entry
       * @param {Object} entry 
       */
      vm.updateEntry = async () => {
        try {
          vm.entry.url = vm.url
          vm.entry.portapi = vm.port
          vm.entry.passapi = vm.pass
          vm.entry.userapi = vm.user
          await currentDataService.checkRawConnection(vm.entry)
          delete vm.entry['$$hashKey']
          delete vm.entry._user
          const updatedEntry = await $currentDataService.update(vm.currentEntryKey, vm.entry)
          vm.currentEntryKey = updatedEntry.data._key
          vm.edit = false
          if (!$scope.$$phase) $scope.$digest()
          toaster.success({title:'Success',body:'Updated API.'})
        } catch (err) {
          toaster.error({title:'Error',body:'Could not update API'})
        }
      }
      /**
       * Check if an URL is valid or not
       * @param {String} url 
       */
      const validUrl = url => {
        return urlRegEx.test(url) || urlRegExIP.test(url)
      }

      /**
       * Check if a port is valid or not
       * @param {String} port 
       */
      const validPort = port => {
        return portRegEx.test(port)
      }

      /**
       * Check if an user is valid or not
       * @param {String} user 
       */
      const validUsername = user => {
        return userRegEx.test(user)
      }

      /**
       * Check if a password is valid or not
       * @param {String} pass 
       */
      const validPassword = pass => {
        return passRegEx.test(pass)
      }

      /**
       * Empties the form fields
       */
      const clearForm = () => {
        vm.url = ''
        vm.port = ''
        vm.user = ''
        vm.pass = ''
      }

      /**
       * Select an API as the default one
       * @param {Object} entry 
       */
      vm.selectManager = async (entry) => {
        try {
          await $currentDataService.checkApiConnection(entry._key)
          await $currentDataService.chose(entry._key)
          for (let item of vm.apiList) {
            if (item._key === entry._key) {
              vm.apiList.map(api => api.selected = false)
              item.selected = true
            }
          }
          entry.selected = true
          toaster.success('Selected API', 'Success')
          if (!$scope.$$phase) $scope.$digest()
          $scope.$emit('updatedAPI', () => { })

        } catch (err) {
          console.error('Error',`[selectManager]:${err}`)
          toaster.error('Error','Could not select manager')
        }
      }

      /**
       * Adds a new API
       */
      vm.submitApiForm = async () => {
        try {
          // When the Submit button is clicked, get all the form fields by accessing input values
          toaster.pop('wait','Please wait','Adding new API.')
          const form_url = vm.url
          const form_apiport = vm.port
          const form_apiuser = vm.user
          const form_apipass = vm.pass

          // If values are valid, register them
          if (validPassword(form_apipass) && validPort(form_apiport) && validUrl(form_url) && validUsername(form_apiuser)) {
            // Create an object to store the field names and values
            const record = {
              "url": form_url,
              "portapi": form_apiport,
              "userapi": form_apiuser,
              "passapi": form_apipass,
              "cluster": false,
              "managerName": false
            }
            // Use the request method to send and insert a new record
            const result = await $currentDataService.insert(record)
            try {
              const resultConnection = await $currentDataService.checkApiConnection(result.data._key)
              clearForm()
              const apiList = await $currentDataService.getApiList()
              record._key = result.data._key
              vm.apiList.push(record)
              if (apiList && apiList.length === 1) {
                await vm.selectManager(result.data)
              }
              vm.showForm = false
              if (!$scope.$$phase) $scope.$digest()
              toaster.success('Added new API', 'Success')

            } catch (err) {
              console.error('err!',err)
              await $currentDataService.remove(result.data._key)
              toaster.error('Error at adding new API', 'Error')

            }
          } else {
            toaster.error('Invalid format', 'Error')
          }
        } catch (err) {
          toaster.error('Error at adding new API', 'Error')
        }
      }



      vm.init()
    })
  })

