/*
 * Wazuh app - API configuration view controller
 * Copyright (C) 2018 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
require([
  "splunkjs/mvc",
  "underscore",
  "jquery",
  "splunkjs/mvc/layoutview",
  "splunkjs/mvc/simplexml/dashboardview",
  "/static/app/SplunkAppForWazuh/js/utilLib/promisedReq.js",
  "/static/app/SplunkAppForWazuh/js/utilLib/credentialService.js",
  "/static/app/SplunkAppForWazuh/js/customViews/toaster.js"
],
  function (
    mvc,
    _,
    $,
    LayoutView,
    Dashboard,
    asyncReq,
    services,
    Toast

  ) {
    const service = new services()
    // Validation RegEx
    const userRegEx = new RegExp(/^.{3,100}$/)
    const passRegEx = new RegExp(/^.{3,100}$/)
    const urlRegEx = new RegExp(/^https?:\/\/[a-zA-Z0-9-.]{1,300}$/)
    const urlRegExIP = new RegExp(/^https?:\/\/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/)
    const portRegEx = new RegExp(/^[0-9]{2,5}$/)

    // Toast definition
    const errorConnectionToast = new Toast('error', 'toast-bottom-right', 'Connection error', 1000, 250, 250)
    const errorWhenDeletingRowToast = new Toast('error', 'toast-bottom-right', 'Error when deleting API', 1000, 250, 250)
    const successConnectionToast = new Toast('success', 'toast-bottom-right', 'Connection successful', 1000, 250, 250)
    const invalidFormatInputToast = new Toast('error', 'toast-bottom-right', 'Invalid format. Please, check your inputs again', 1000, 250, 250)
    const selectedApiErrorToast = new Toast('error', 'toast-bottom-right', 'No working API was selected.', 1000, 250, 250)

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
     * Deletes a manager by id
     * @param {String} key 
     */
    const removeManager = async (key) => {
      try {
        await service.remove(key)
        await drawApiList()
      } catch (err) {
        errorWhenDeletingRowToast.show()
      }
    }

    /**
     * Checks connection with a manager API
     * @param {String} key 
     */
    const checkManagerConnection = async (key) => {
      try {
        await service.checkApiConnection(key)
        successConnectionToast.show()
      } catch (err) {
        errorConnectionToast.show()
      }
    }

    /**
     * Clears the API table
     */
    const clearTable = () => {
      $('#apiList').empty()
    }

    /**
     * Draws the API list
     * @param {Array} apis 
     */
    const drawApiList = async apis => {
      try {
        const { apiList } = await service.loadCredentialData()
        if (apiList && apiList.length > 0) {
          clearTable()
          $('#apiList').html(
            '<table class="highlight"> ' +
            '  <thead> ' +
            '    <tr> ' +
            '        <th>URL</th> ' +
            '        <th>Port</th> ' +
            '        <th>Username</th> ' +
            '        <th>Actions</th> ' +
            '        <th>Selected</th> ' +
            '    </tr> ' +
            '  </thead> ' +
            '  <tbody id="tableBody"> ' +
            '  </tbody> ' +
            '</table> '
          )
          for (const api of apiList) {
            $('#tableBody').append(
              '    <tr> ' +
              '      <td>' + api.url + '</td> ' +
              '      <td>' + api.portapi + '</td> ' +
              '      <td>' + api.userapi + '</td> ' +
              '      <td><i id="' + api._key + '" tooltip="Set as default Manager" class="fa fa-star font-size-18 wz-cursor-pointer" aria-hidden="true"></i>' +
              ' <i id="' + api._key + '" class="fa fa-trash wz-margin-left-7 wz-cursor-pointer" aria-hidden="true"></i>' +
              ' <i id="' + api._key + '" class="fa fa-refresh wz-margin-left-7 wz-cursor-pointer" aria-hidden="true"></i></td> ' +
              ' <td>' + (api.selected === false ? '' : 'yes') + '</td> ' +
              ' </tr> '
            )
          }
        } else {
          clearTable()
          $('#apiList').html('<h4>Any API was inserted. You must have at least one API for using Splunk app for Wazuh.</h4>')
        }
      } catch (err) {
        Promise.reject(err)
      }
    }

    /**
     * Edits a manager connection
     * @param {String} key 
     */
    const selectManager = async (key) => {
      try {
        await service.checkApiConnection(key)
        await service.chose(key)
        await drawApiList()
      } catch (err) {
        errorConnectionToast.show()
      }
    }

    /**
     * Click on delete manager
     */
    $('#apiList').on("click", "#tableBody tr td i.fa-trash", function (e) {
      removeManager(this.id)
    })

    /**
     * Click on select manager
     */
    $('#apiList').on("click", "#tableBody tr td i.fa-star", function (e) {
      selectManager(this.id)
    })

    /**
     * Click on check manager
     */
    $('#apiList').on("click", "#tableBody tr td i.fa-refresh", function (e) {
      checkManagerConnection(this.id)
    })

    /**
     * Intercepts an HTTP requests before it's sended
     * @param {Object} xhr 
     */
    const httpInterceptor = async (xhr) => {
      try {
        await service.checkSelectedApiConnection()
      } catch (err) {
        errorConnectionToast.show()
        xhr.abort()
      }
    }

    /**
     * Check if connection is OK at starting view
     */
    const firstLoad = async () => {
      try {
        await service.checkSelectedApiConnection()
        await drawApiList()
        successConnectionToast.show()
      } catch (err) {
        console.error('error at loading data', err.message || err)
        await service.deselectAllApis()
        await drawApiList()
        selectedApiErrorToast.show()
      }
    }

    /**
     * On document ready
     */
    $(document).ready(() => firstLoad())

    $('header').remove()
    new LayoutView({ "hideSplunkBar": false, "hideFooter": false, "hideChrome": false, "hideAppBar": false })
      .render()
      .getContainerElement()
      .appendChild($('.dashboard-body')[0])

    new Dashboard({
      id: 'dashboard',
      el: $('.dashboard-body'),
      showTitle: true,
      editable: false
    }, { tokens: false }).render()

    /**
     * Reject a promise error
     * @param {object} err 
     */
    const errorHandleDeleting = async (err) => {
      errorWhenDeletingRowToast.show()
    }

    /**
     * Delete a record
     */
    const deleteAllRecords = async () => {
      try {
        // Delete the record that corresponds to the key ID using
        // the del method to send a DELETE request
        // to the storage/collections/data/{collection}/ endpoint
        await service.delete("storage/collections/data/credentials/")
        clearTable()
        // Run the search again to update the table
      } catch (err) {
        return Promise.reject(err)
      }
    }

    // Call this function when the Delete Record button is clicked
    $("#deleteRecord").click(() => deleteAllRecords().catch((err) => errorHandleDeleting()))

    /**
     * Clears the data inputs
     */
    const clearForm = () => {
      $('#credentialPortInput').val('')
      $('#credentialUserInput').val('')
      $('#credentialUrlInput').val('')
      $('#credentialPassInput').val('')
    }
    /**
     * Actions when submit
     */
    const clickOnSubmit = async () => {
      try {
        // When the Submit button is clicked, get all the form fields by accessing input values
        const form_url = $('#credentialUrlInput').val()
        const form_apiport = $('#credentialPortInput').val()
        const form_apiuser = $('#credentialUserInput').val()
        const form_apipass = $('#credentialPassInput').val()

        // If values are valid, register them
        if (validPassword(form_apipass) && validPort(form_apiport) && validUrl(form_url) && validUsername(form_apiuser)) {

          // Create an object to store the field names and values
          const record = {
            "url": form_url,
            "portapi": form_apiport,
            "userapi": form_apiuser,
            "passapi": form_apipass,
            "selected": false
          }
          // Use the request method to send and insert a new record
          // to the storage/collections/data/{collection}/ endpoint
          await service.insert(record)
          // Run the search again to update the table
          //search1.startSearch()
          // Clear the form fields 
          clearForm()
          await drawApiList()
        } else {
          invalidFormatInputToast.show()
        }
      } catch (err) {
        console.error('error at submit ', err)
      }
    }

    /**
     * On submit click
     */
    $('#submitApiForm').on("click", async () => clickOnSubmit())

  }
)