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
  "splunkjs/mvc/utils",
  "splunkjs/mvc/tokenutils",
  "underscore",
  "jquery",
  "splunkjs/mvc/simplexml",
  "splunkjs/mvc/layoutview",
  "splunkjs/mvc/simplexml/element/table",
  "splunkjs/mvc/simpleform/formutils",
  "splunkjs/mvc/simpleform/input/text",
  "splunkjs/mvc/simpleform/input/submit",
  "splunkjs/mvc/searchmanager",
  "splunkjs/mvc/simplexml/urltokenmodel",
  "/static/app/wazuh/js/utilLib/promisedReq.js",
  "/static/app/wazuh/js/utilLib/services.js",
  "/static/app/wazuh/js/customViews/toaster.js"

  // Add comma-separated libraries and modules manually here, for example:
  // ..."splunkjs/mvc/simplexml/urltokenmodel",
  // "splunkjs/mvc/tokenforwarder"
],
  function (
    mvc,
    utils,
    TokenUtils,
    _,
    $,
    DashboardController,
    LayoutView,
    TableElement,
    FormUtils,
    TextInput,
    SubmitButton,
    SearchManager,
    UrlTokenModel,
    asyncReq,
    services,
    Toast

    // Add comma-separated parameter names here, for example: 
    // ...UrlTokenModel, 
    // TokenForwarder
  ) {

    let pageLoading = true
    // 
    // TOKENS
    //
    // Create token namespaces
    const urlTokenModel = new UrlTokenModel()
    mvc.Components.registerInstance('url', urlTokenModel)
    const defaultTokenModel = mvc.Components.getInstance('default', { create: true })
    const submittedTokenModel = mvc.Components.getInstance('submitted', { create: true })
    const service = new services()
    $('li > a').removeAttr('data-selected')
    $('li > a').attr('myattr')

    urlTokenModel.on('url:navigate', () => {
      defaultTokenModel.set(urlTokenModel.toJSON())
      if (!_.isEmpty(urlTokenModel.toJSON()) && !_.all(urlTokenModel.toJSON(), _.isUndefined)) {
        submitTokens()
      } else {
        submittedTokenModel.clear()
      }
    })

    // Initialize tokens
    defaultTokenModel.set(urlTokenModel.toJSON())

    const submitTokens = () => {
      // Copy the contents of the defaultTokenModel to the submittedTokenModel and urlTokenModel
      FormUtils.submitForm({ replaceState: pageLoading })
    }

    const setToken = (name, value) => {
      defaultTokenModel.set(name, value)
      submittedTokenModel.set(name, value)
    }

    const unsetToken = (name) => {
      defaultTokenModel.unset(name)
      submittedTokenModel.unset(name)
    }

    // Validation RegEx
    const userRegEx = new RegExp(/^.{3,100}$/)
    const passRegEx = new RegExp(/^.{3,100}$/)
    const urlRegEx = new RegExp(/^https?:\/\/[a-zA-Z0-9-.]{1,300}$/)
    const urlRegExIP = new RegExp(/^https?:\/\/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/)
    const portRegEx = new RegExp(/^[0-9]{2,5}$/)

    // Toast definition
    const errorConnectionToast = new Toast('error', 'toast-bottom-right', 'Connection error', 1000, 250, 250)
    const errorWhenDeletingRow = new Toast('error', 'toast-bottom-right', 'Error when deleting API', 1000, 250, 250)
    const successToast = new Toast('success', 'toast-bottom-right', 'Connection successful', 1000, 250, 250)
    const invalidFormatInputToast = new Toast('error', 'toast-bottom-right', 'Invalid format. Please, check your inputs again', 1000, 250, 250)


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
     * Set a status (green/red) light for API connecting
     * @param {object} jsonData 
     */
    const showStatusConnectionToast = async () => {
      try {
        await service.checkConnection()
        successToast.show()
      } catch (err) {
        errorConnectionToast.show()
      }
    }

    /**
     * Check if connection is OK at starting view
     */
    const firstLoad = async () => {
      try {
        const data = await service.get("storage/collections/data/credentials/")
        await showStatusConnectionToast()
      } catch (err) {
        console.error('error at loading data', err.message || err)
      }
    }
    /**
     * On document ready
     */
    $(document).ready(() => firstLoad())

    /**
     * Searches and draws for already stored credentials
     */
    const search1 = new SearchManager({
      "id": "search1",
      "status_buckets": 0,
      "sample_ratio": null,
      "search": "| inputlookup kvstore_lookup | eval  KeyID = _key | table url,portapi,userapi | rename url as URL, portapi as Port, userapi as Username",
      "latest_time": "now",
      "earliest_time": "-24h@h",
      "cancelOnUnload": true,
      "app": utils.getCurrentApp(),
      "auto_cancel": 90,
      "preview": true,
      "tokenDependencies": {
      },
      "runWhenTimeIsUndefined": false
    }, { tokens: true })

    $('header').remove()
    new LayoutView({ "hideSplunkBar": false, "hideFooter": false, "hideChrome": false, "hideAppBar": false })
      .render()
      .getContainerElement()
      .appendChild($('.dashboard-body')[0])

    //
    // DASHBOARD EDITOR
    //

    new Dashboard({
      id: 'dashboard',
      el: $('.dashboard-body'),
      showTitle: true,
      editable: true
    }, { tokens: true }).render()

    //
    // VIEWS: VISUALIZATION ELEMENTS
    //

    const element1 = new TableElement({
      "id": "element1",
      "drilldown": "none",
      "managerid": "search1",
      "el": $('#element1')
    }, { tokens: true, tokenNamespace: "submitted" }).render()

    //
    // VIEWS: FORM INPUTS
    //

    const input3 = new TextInput({
      "id": "input3",
      "value": "$form.url$",
      "el": $('#input3')
    }, { tokens: true }).render()

    input3.on("change", (newValue) => {
      FormUtils.handleValueChange(input3)
    })

    const input4 = new TextInput({
      "id": "input4",
      "value": "$form.apiport$",
      "el": $('#input4')
    }, { tokens: true }).render()

    input4.on("change", (newValue) => {
      FormUtils.handleValueChange(input4)
    })

    const input5 = new TextInput({
      "id": "input5",
      "value": "$form.apiuser$",
      "el": $('#input5')
    }, { tokens: true }).render()

    input5.on("change", (newValue) => {
      FormUtils.handleValueChange(input5)
    })

    const input6 = new TextInput({
      "id": "input6",
      "value": "$form.apipass$",
      "el": $('#input6')
    }, { tokens: true }).render()

    input6.on("change", (newValue) => {
      FormUtils.handleValueChange(input6)
    })


    /**
     * Reject a promise error
     * @param {object} err 
     */
    const errorHandleDeleting = async (err) => {
      errorWhenDeletingRow.show()
    }

    /**
     * Delete a record
     */
    const deleteRecord = async () => {
      try {
        // Get the value of the key ID field
        const tokens = mvc.Components.get("default")
        // Delete the record that corresponds to the key ID using
        // the del method to send a DELETE request
        // to the storage/collections/data/{collection}/ endpoint
        await service.delete("storage/collections/data/credentials/")
        // Run the search again to update the table
        search1.startSearch()
      } catch (err) {
        return Promise.reject(err)
      }
    }

    // Call this function when the Delete Record button is clicked
    $("#deleteRecord").click(() => deleteRecord().catch( (err) => errorHandleDeleting()))
    // 
    // SERVICE OBJECT
    //

    // Create a service object using the Splunk SDK for JavaScript
    // to send REST requests

    const submit = new SubmitButton({
      id: 'submit',
      el: $('#search_btn')
    }, { tokens: true }).render()

    /**
     * Check connection when click on button
     */
    $('#checkConnection').click(() => showStatusConnectionToast())

    /**
     *  Click on submit button
     */
    submit.on("submit", async () => {
      try {
        // When the Submit button is clicked, get all the form fields by accessing token values
        const tokens = mvc.Components.get("default")
        const form_url = tokens.get("url")
        const form_apiport = tokens.get("apiport")
        const form_apiuser = tokens.get("apiuser")
        const form_apipass = tokens.get("apipass")

        if (validPassword(form_apipass) && validPort(form_apiport) && validUrl(form_url) && validUsername(form_apiuser)) {
          await service.delete("storage/collections/data/credentials/")

          // Create a dictionary to store the field names and values
          const record = {
            "url": form_url,
            "portapi": form_apiport,
            "userapi": form_apiuser,
            "passapi": form_apipass
          }
          // Use the request method to send a REST POST request
          // to the storage/collections/data/{collection}/ endpoint
          await service.post("storage/collections/data/credentials/", record)
          // Run the search again to update the table
          const data = await service.get("storage/collections/data/credentials/")
          await showStatusConnectionToast(data.data)
          search1.startSearch()
          // Clear the form fields 
          $("#formCustomerInfo input[type=text]").val("")
        } else {
          invalidFormatInputToast.show()
        }
      } catch (err) {
        console.error('error at submit ', err)
      }
    })

    // Initialize time tokens to default
    if (!defaultTokenModel.has('earliest') && !defaultTokenModel.has('latest')) {
      defaultTokenModel.set({ earliest: '0', latest: '' })
    }

    if (!_.isEmpty(urlTokenModel.toJSON())) {
      submitTokens()
    }

    //
    // DASHBOARD READY
    //

    DashboardController.ready()
    pageLoading = false

  }
)